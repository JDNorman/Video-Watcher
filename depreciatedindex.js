import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import Jimp from 'jimp';
import Speaker from 'speaker';
import readlineSync from 'readline-sync';
import { createRequire } from 'module'; // To use require in ES modules
const require = createRequire(import.meta.url); // To use require in ES modules

/*

// HOW DOES THIS ALL WORK?

1st: Gets every folder inside of the directory that you want to get your mp3 and mp4 files from
2nd: Creates a terminal displaying every choice from that one directory you chose


*/

// function to open a new terminal and run the VideoPlayer.js script
function openNewTerminal(scriptPath, directoryPath) {
    const command = process.platform === 'win32' 
        ? `start cmd /K node "${scriptPath}" "${directoryPath}"`
        : `gnome-terminal -- node "${scriptPath}" "${directoryPath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening a new terminal: ${error}`);
            return;
        }
        console.log(`Output: ${stdout}`);
        console.error(`Error: ${stderr}`);
    });
}

// create a prompt using inquirer
inquirer.prompt([
    {
        type: 'list',
        name: 'selectedFolder',
        message: chalk.blue.bold('Select a folder to use:'),
        choices: folderChoices,
    },
])
.then(answers => {
    const selectedFolder = answers.selectedFolder;

    //find mp3 and mp4 files in the selected folder
    const { mp3File, mp4File } = findMediaFiles(selectedFolder);

    if (!mp3File || !mp4File) {
        console.error(`Could not find both MP3 and MP4 files intthe folder: ${selectedFolder}`);
        process.exit(1);
    }

    // open a new terminal and run the ascii video player script
    openNewTerminal(path.join(process.cwd(), 'VideoPlayer.js'), selectedFolder);
})
.catch(error => {
    console.error('Error:', error);
    process.exit(1);
});
