function asyncOperation() {
    return new Promise(function(resolve, reject) {
        // Simulate an asynchronous operation using setTimeout
        setTimeout(function() {
            let success = true; // Change this to false to simulate a failure
            if (success) {
                resolve("Operation completed successfully!");
            } else {
                reject("Operation failed.");
            }
        }, 2000);
    });
}

asyncOperation().then(function(message) {
    console.log("Success: " + message);
}).catch(function(error) {
    console.log("Error: " + error);
}).finally(function() {
    console.log("Promise has been settled (either resolved or rejected).");
});
// This code creates a Promise that simulates an asynchronous operation.
// It resolves successfully after 2 seconds, but you can change the 'success' variable to false to test rejection handling.
