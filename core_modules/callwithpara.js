function calculate(a, b, callback) {
  let res = a + b;
  callback(res);
}
calculate(5, 3, function(result) {
  console.log("Result:", result);
});