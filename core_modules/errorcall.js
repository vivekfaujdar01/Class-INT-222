function getData (callback) {
    let error = null; 
    // let data = "Here is your data!";
    let data = null;
    //simulating an error condition
    if(!data) {
        error = "No data found!";
    }
    callback(error, data);
}

getData(function(err, result) {
    if(err) {
        console.error("Error:", err);
    } else {
        console.log("Success:", result);
    }
});