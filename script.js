import fs from 'fs';
import path from 'path';
import express from 'express';
import asciidoctor from 'asciidoctor';

// FIXME: For now hardcoded the master.adoc path.
const MASTER_ADOC_FILE = './rosa-install-classic/master.adoc'
const app = express();
const adoc = asciidoctor();

/**
 * Parses an Asciidoctor file to fetch all included references.
 * 
 * @param {string} filePath - The path to the Asciidoctor file to parse.
 * @param {string} leveloffsetValue - Leveloffset string value.
 * @returns {string[]} - An array of included file references.
 */
const parseAdocFile = (filePath, leveloffsetValue) => {
    // Read the content of the Asciidoctor file
    const content = fs.readFileSync(filePath, 'utf8');
    const doc = adoc.load(content);
  
    const title = doc.getTitle();

    // Fetch section details
    const sections = doc.getSections().map(section => ({
        title: section.getTitle(),
        level: section.getLevel(),
        id: section.getId(),
        content: section.getContent(),
    }));

    // WORKAROUND: to get leveloffset value
    if (leveloffsetValue) {
        leveloffsetValue = leveloffsetValue.replace('leveloffset=', '')
    }
  
    return { title, sections, leveloffset: leveloffsetValue };
};

/**
 * Parse master file to fetch all included references.
 * 
 * @param {string} masterFilePath - The path to the master Asciidoctor file to parse.
 */
const parseMasterAdoc = (masterFilePath) => {
    const masterContent = fs.readFileSync(masterFilePath, 'utf8');

    // Regular expression to match `include::` directives
    const includePattern = /include::([^\[]+?)\[(.*?)\]/g;

    // Fetch all the include references in matches.
    const matches = masterContent.matchAll(includePattern);

    // TopicMap to push all details.
    const topicMap = [];

    for (const match of matches) {
        if (!match[1].endsWith(".adoc")) return

        const filePath = path.resolve(path.dirname(masterFilePath), match[1]);

        // Read and Parse referenced adoc file to fetch section details.
        const sectionData = parseAdocFile(filePath, match[2]);

        // Push sectionData per adoc file to topicMap.
        topicMap.push(sectionData);
    }
  

    const jsonString = JSON.stringify(topicMap)

    // WORKAROUND: Writing map to json file temporarily.
    try {
        fs.writeFileSync('./map.json', jsonString);
        console.log('File has been written successfully.');
    } catch (err) {
        console.error('Error writing file:', err);
    }
};

app.listen(4000, () => {
    console.log('Running a GraphQL API server at http://localhost:4000/');
    // Specify master.adoc path
    parseMasterAdoc(MASTER_ADOC_FILE)
});