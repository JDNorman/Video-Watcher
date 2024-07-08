
// function to play audio
function playAudio(filePath) {
    // init speaker instance
    const speaker = new Speaker({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100,
    });

    // read the mp3 file stream
    const stream = fs.createReadStream(filePath);

    // pipe the mp3 stream to the speaker
    stream.pipe(speaker);

    // handle errors
    stream.on('error', (err) => {
        console.error('Error reading mp3 file:', err);
    });

    speaker.on('error', (err) => {
        console.error('Error playing audio:', err);
    });
}

// get the directory path from the arguments;
const directoryPath = process.argv[2];
if (!directoryPath) {
    console.error('Please provide a directory path');
    process.exit(1);
}

// find the first mp3 and mp4 files in the directory
const files = fs.readdirSync(directoryPath);
const mp3File = files.find(file => file.endsWith('.mp3'));
const mp4File = files.find(file => file.endsWith('.mp4'));

if (!mp3File || !mp4File) {
    console.error('MP or MP4 file not found in the directory');
    process.exit(1);
}

// play the audio
playAudio(path.join(directoryPath, mp3File));

// wait for a bit to sync audio and video
setTimeout(() => {
    const frameFiles = files.filter(file => !file.endsWith('.mp3') && !file.endsWith('.mp4')).sort();

    frameFiles.forEach((frameFile, index) => {
        const startTime = Date.now();
        const framePath = path.join(directoryPath, frameFile);

        imageToAscii(framePath).then(ascii => {
            console.clear();
            console.log(ascii);
    
            const endTime = Date.now();
            const frameDuration = 1000 / 24; // assuming 24 fps
            const sleepTime = frameDuration - (endTime - startTime);
            if (sleepTime > 0) {
                readlineSync.keyInTimeout('', sleepTime);
            }
        });
    });
}, 500); //adjust the delay to sync with the audio