import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import chalk from 'chalk';
import playSound from 'play-sound';
import open from 'open'

// CONSTANTS
// Directories are in here
const videoPath = "C:/Users/JohnDavidNorman/Desktop/Video Watcher/VideoFolder";

// Current script directory
const scriptPath = process.cwd();



// FUNCTIONS

// For every frame, turn that frame into an image
async function imageToAscii(imagePath) {
    const image = await Jimp.read(imagePath);
    const { width, height } = image.bitmap;
    let ascii = '\n';

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const { r, g, b } = Jimp.intToRGBA(image.getPixelColor(x, y));
            const brightness = r + g + b;
            if (brightness > 480) {
                ascii += '###';
            } else if (brightness < 90) {
                ascii += '   ';
            } else if (brightness < 220) {
                ascii += ' . ';
            } else if (brightness < 320) {
                ascii += ' - ';
            } else if (brightness < 390) {
                ascii += ' : ';
            } else {
                ascii += ' /|/';
            }
        }
        ascii += '\n';
    }

    return ascii;
}

// Get every folder inside of a directory (exclude everything else)
async function listFolders(dirPath) {
    const folders = fs.readdirSync(dirPath)
        .filter(file => fs.statSync(path.join(dirPath, file)).isDirectory());
    return folders;
}

// Open a new terminal and ask for an input

async function openNewTerminal(scriptPath) {
    // First get every folder from the Video Folder
    const folderOptions = listFolders(videoPath);

    // Make sure there are actual items inside of the array
    if ((await folderOptions).length === 0) {
        console.error('No folders found in the current directory');
        process.exit(1);
    }


    // Once the terminal is open, create a prompt and send it in that terminal
    
}



async function main() {

    // Use precompiled list to ask the user which 


}





















// async function main() {
//     // Prompt user to select a folder
//     const { folderPath } = await inquirer.prompt([
//         {
//             type: 'input',
//             name: 'folderPath',
//             message: 'Please enter the path to the directory:',
//         },
//     ]);

//     try {
//         // Read the directory and find MP3 and MP4 files
//         const files = await fs.readdir(folderPath);
//         const mp3Files = files.filter(file => file.endsWith('.mp3'));
//         const mp4Files = files.filter(file => file.endsWith('.mp4'));

//         if (mp3Files.length > 0 && mp4Files.length > 0) {
//             console.log('Found both MP3 and MP4 files.');

//             // Assuming the first MP3 and MP4 files can be played together
//             const mp3FilePath = `${folderPath}/${mp3Files[0]}`;
//             const mp4FilePath = `${folderPath}/${mp4Files[0]}`;

//             // Play MP3 file
//             playSound(mp3FilePath);

//             // Open the MP4 file in a new terminal window
//             open(`mplayer ${mp4FilePath}`);
//         } else {
//             console.log('Either no MP3 or no MP4 files found.');
//         }
//     } catch (error) {
//         console.error('Error reading the directory:', error);
//     }
// }

// function play(filePath) {
//     return new Promise((resolve, reject) => {
//         playSound(filePath, (err) => {
//             if (err) throw err;
//             resolve();
//         });
//     });
// }

// main().catch(console.error);