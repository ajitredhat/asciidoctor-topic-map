# asciidoctor-topic-map

This script reads master.adoc, extracts and parses all included references, and generates a detailed topic map.

## Installation
1. Clone the repository 

        git clone https://github.com/ajitredhat/asciidoctor-topic-map.git

2. Install node js and npm

    Install Node.js using Fedora package manager (LTS version)
    Update your system (If needed):

        sudo dnf update

    Install Node.js (v18.19.1) and npm:

        sudo dnf install -y nodejs npm

    Verify the installation:

        node -v
        npm -v

3. Run script

**Important** Currently the file path for the master.adoc is hardcoded. you will need to specify the file path in [script.js](https://github.com/ajitredhat/asciidoctor-topic-map/blob/main/script.js#L7)

        const MASTER_ADOC_FILE = <PATH-TO-MASTER-ADOC-FILE>

To run it, install the required packages and finally start it. Via command line, navigate to the folder where this repository was cloned to and use the following commands:

        npm install

Wait for it to finish all the package installation. Then run following command to run project.

        node script.js

This should execute the script and start the node server to parse input file.

# License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
Please see the [LICENSE](LICENSE) file for full details.

## Written by

Ajit Kenjale [@ajitredhat](https://github.com/ajitredhat).