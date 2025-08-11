

const { writeFileSync, mkdirSync } = require ('fs')

//Install ENV with SCRIPT
//npm i -D dotenv
//npm run set-envs "modify package.json" to add "set-envs": "node ./scripts/set-envs.js"

//read env variables from .env file
require('dotenv').config();

//define the target path for the environment files
const targetPath = './src/environments/environment.ts';
const targetPathDevelopment = './src/environments/environment.development.ts';

//read the Mapbox key from the environment variables
const mapboxKey= process.env['MAPBOX_KEY'];

//if not defined, throw an error
if( !mapboxKey ) {
    throw new Error('MAPBOX_KEY is not defined in .env file');
}

//file content to be written to the environment files
const envFileContent = `
export const environment = {
    mapboxKey: "${ mapboxKey }"
};
`;

//create the environments in the target path
mkdirSync('./src/environments', { recursive: true});

writeFileSync( targetPath, envFileContent );
writeFileSync( targetPathDevelopment, envFileContent )