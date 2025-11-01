// Create a Promise that simulates downloading a file using setTimeout.
// Use async/await to wait until the "download" is complete before logging a message.

function downloadFile() {
    return new Promise((resolve, reject) => {
        console.log("Starting file download...");
        setTimeout(() => {
            const success = true; // Change to false to simulate a download failure
            if (success) {
                resolve("File downloaded successfully!");
            } else {
                reject("File download failed.");
            }
        }, 3000); // Simulate a 3 second download time
    });
}

async function performDownload() {
    try {
        const message = await downloadFile();
        console.log(message);
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Download attempt finished.");
    }
}

performDownload();
// This code defines a function that simulates downloading a file.
// It uses async/await to handle the Promise returned by the downloadFile function.