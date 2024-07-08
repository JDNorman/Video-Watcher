import { exec } from 'child_process';

// Launch the terminal and run index.js inside of it
exec('node index.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`Output: ${stdout}`);
    console.error(`Error: ${stderr}`);
})