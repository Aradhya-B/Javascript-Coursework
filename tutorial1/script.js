//DRAW SQUARE
// Using the binding notation, create a function named drawSquare that takes
// two parameters
// a. The offset that represent the offset from the left edge of the screen
// where the square will appear on the screen
// b. The length that represent the length of the square
// 2. Inside the drawSquare function create an inner function with the binding
// name “createOffset” that takes one parameter that represent the length of the
// offset
// a. The createOffset function use a for loop to create a string of spaces of
// the length sent to the function and returns it to the caller.
// 3. The drawSquare draws the square in the following manner
// a. Creates a binding that would hold the square shape in the form of a
// string
// b. Uses a for loop to create one line in each iteration as follows:
// i. The line starts in a new (“\n”) and the empty space created by
// calling createOffset.
// ii. An inner loop that adds one ‘*’ for every length unit to draw
// the shape of a line
// iii. The newly created line is concatenated to the square
// c. The drawSquare function terminate by returning the square to its
// caller.
// 4. To test it, call the function and use console.log to display the returned square
// (it may look more like a rectangle because of the line spaces but it’s close enough)
const _createOffset = (lenOff) => {
  let offset = "";
  for (let i = 0; i < lenOff; i++) {
    offset += " ";
  }
  return offset;
}

const drawSquare = (off, len) => {
  let square = "";
  for (let i = 0; i < len; i++) {
    let line = "\n" + _createOffset(off);
    for (let j = 0; j < len; j++) {
      line += '*';
    }
    square += line;
  }

  return square;
}

// DRAW TRIANGLE
// Using the binding notation, create a function named drawTriangle that takes
// two parameters
// a. The offset that represent the offset from the left edge of the screen
// where the square will appear on the screen
// b. The height that represent the height of the square
// 2. Since we would like to create empty spaces for offset we would need to
// access the createOffset function but this wouldn’t be possible unless we take
// the definition outside of the local scope of drawSquare
// a. Make sure it’s still accessible inside drawSquare as well
// 3. To draw the triangle
// a. Create a loop to create one line in each iteration as follows:
// i. The line starts with a new line (“\n”) and an offset that’s
// reduced by an amount equals to the line number
// 1. e.g. offset – 0 for first line , offset - 1 for second line, …
// etc.
// ii. Create an inner loop to concatenate a number of starts that is
// equal to ((line-number*2) -1)
// 1. e.g. ((0 * 2) -1) = 1 star for first line, ((1 * 2) -1) = 3 stars
// for second line, … etc.
// iii. Concatenate the newly created line to the triangle
// b. The function terminates by returning the triangle.
// 4. To test it, call the function and use console.log to display the returned
// triangle

const drawTriangle = (off, h) => {
  let triangle = "";
  for (let i = 0; i < h; i++) {
    let line = '\n' + _createOffset(off - i);
    for (let j = 0; j < ((i*2) - 1); j++) {
      line += "*";
    }
    triangle += line;
  }
  return triangle;
}
