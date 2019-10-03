/*******************************************************************************************************************/
// TASK 1: Convert a number from decimal representation to binary representation

const binaryWithLoop = n => {   // Binding arrow function to name binaryWithLoop that uses a loop to convert decimal to binary
  if (n == 0) {                 // If the number 0 is passed, return a single digit binary representation
    return '0';
  }
  let binaryString = '';        // Initializing an empty string to hold the binary string to return
  while (n > 0) {               // Keep dividing the number by 2 until the number is 0
    binaryString = n % 2 + binaryString;      // Append to my binary string the current number mod 2
    n = Math.floor(n / 2);      // Divide the number by 2
  }
  return binaryString;          // Return the string after the loop is complete
}

// Binding arrow function to name binaryWithRecursion that uses a helper recursive function
// to return the binary representation of a passed decimal integer.
// The helper function is called with the passed integer number and an empty string.
const binaryWithRecursion = n => {
  if (n == 0) {                 // If the number 0 is passed, return a single digit binary representation
    return '0';
  }
  let binaryString = ''
  return _binaryWithRecursion(n, binaryString);
}

// Helper function for binaryWithRecursion method.
const _binaryWithRecursion = (n, s) => {
  if (n == 0) {                 // Base case for recursive call. If passed integer is 0, we've reached the end.
    return s                    // If we've reached the end, return the passed string
  }
// If we haven't reached the end, return the same function called with the original number
// divided by 2, and the binary string appended with the number mod 2
  return _binaryWithRecursion(Math.floor(n / 2), s = n % 2 + s);
}

// Test Cases
for (let i = 0; i <= 20; i++) {
  console.log(`Input: ${i} Output (Loop):`, binaryWithLoop(i));
  console.log(`Input: ${i} Output (Recursion):`, binaryWithRecursion(i))
}

/*******************************************************************************************************************/
// TASK 2: Simple Parser

// Binding a function that takes a JSONObject as it's input to the name simpleParser
const simpleParser = JSONObject => {
  // Initialzing an empty JavaScript object
  let jsObject = {};
  // If the JSONObject is not well formatted, print an error and return out of the function
  if (JSONObject[0] != '{' && JSONObject[JSONObject.length - 1] != '}') {
    console.log("Error: Object is not well formatted");
    return
  }
  // Slicing the valid JSONObject to remove the curly braces at both ends
  let parsedJSONObject = JSONObject.slice(1, JSONObject.length - 1);
  // Splitting the parsed JSON Object into the seperated key, value pairs
  let arr = parsedJSONObject.split(',');
  // Splitting each key, value pair into an array, making JSONArray a nested array
  let JSONArray = arr.map(kvPair => kvPair.split(':'));
  // For each array in the JSONArray (that holds a key and corresponding value),
  // set the jsObject at a given key equal to its corresponding value
  JSONArray.forEach(a => {
    // The property name is the name in the array with the 2 end quotes removed
    let propName = a[0].slice(1, a[0].length - 1);
    // Initialize the property value
    let propValue = a[1];
    if (!Object.is(Number(propValue), NaN)) {   // If the property value is a number, convert from string into a number
      propValue = Number(propValue);
    } else if (propValue == "true") {           // If the property value is a boolean, convert from string to a boolean
      propValue = true;
    } else if (propValue == "false") {          // If the property value is a boolean, convert from string to a boolean
      propValue = false;
    } else {                                    // Else the property value must be a string, so remove the 2 end quotes
      propValue = a[1].slice(1, a[1].length - 1);
    }
    jsObject[propName] = propValue;             // Set the jsObject at the propName equal to the corresponding propValue
  });
  // After the loop is finished, return the JavaScript object
  return jsObject;
}

// Test Cases
dog = simpleParser("{'type':'dog','age':6}");
console.log(dog);
console.log("type:", dog.type);
console.log("age:", dog.age);

human = simpleParser("{'type':'human','name':'Aradhya','age':19}");
console.log(human);
console.log("type:", human.type);
console.log("name:", human.name);
console.log("age:", human.age);

cat = simpleParser("{'type':'cat','name':'Garfield','age':14,'weight':150}");
console.log(cat);
console.log("type:", cat.type);
console.log("name:", cat.name);
console.log("age:", cat.age);
console.log("weight (lbs):", cat.weight);

/*******************************************************************************************************************/
// TASK 3: Return the array that which all the elements meet the threshold

const thresholdArray = (t, ...arrays) => {
  for (arr of arrays) {                       // Repeat this loop for each array (arr) in the rest variable "arrays"
    let meetsT = true;                        // Assume that the current array meets the threshold
    for (num of arr) {                        // Repeat this loop for each number in the current array
      if (num < t) {                          // If any number in the current array is less than the threshold, do this
        meetsT = false;                       // This array no longer meets the threshold
        break;                                // If the array did not meet the threshold, break out of the loop
      }
      if (meetsT == true) {                   // If each element of the array met the threshold, return the array
        return arr;
      }
    }
  }
}

// Test Cases
const arr1 = [1,2,3,4,5,6,7];
const arr2 = [5,5,6];
const arr3 = [3,4,2,7];
const t = 5

console.log(thresholdArray(t, arr1, arr2, arr3));
console.log(thresholdArray(t, arr2, arr1, arr3));
console.log(thresholdArray(t, arr3, arr1, arr2));

// Test with rest operator
let arr4 = thresholdArray(t, arr3, arr1, arr2);
console.log(arr4);
console.log(...arr4);
