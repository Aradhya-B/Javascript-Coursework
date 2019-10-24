//Task 1
//This program creates a general purpose "Shape" class that takes an x and a y coordinate as arguments in its constructor.
//Using the passed arguments (when the object is created with the new keyword), a Shape object with private x and y data
//members can be created. The Shape class provides all instances with a "get" and a "set" function to get and set the x and
//y values (to implement encapsulation) and a "showPoint() function that logs the x and y coordinate.

//Task 2
//In this task, the Shape class is extended to a Square and a Triangle class that both have an additional data member (length
//and height respectively). In both classes, the constructor for the super class (the parent class, Shape) is called with the
//passed x and y coordinates (during instantiation) and new get and set functions are added for the new respective private
//data members to implement encapsulation

//Task 3
//In this task, the original Shape class is changed by adding additional "createHorizontalOffset" and "draw" methods.
//The "createHorizontalOffset" method returns a string of spaces the length of a passed parameter "off", built using a
//for loop. The draw method in the shape class simply implements the offset in the y direction based on the shape objects
//y coordinate. The Square and Triangle class are also changed by adding their own implementations of the draw method to
//override the draw method in the Shape class. The Square is drawn by first calling the super implementation of draw
//(to add the vertical offset) and then printing "len" (length) number of lines that are built by appending a string built
//using the createHorizontalOffset method with a "len" (length) number of "*". The Triangle is drawn by also first calling
//the super implementation of the draw method to add the vertical offset and then creating a single "triangle" string to
//be printed at once by adding lines that depend on the current line number and offset to the single "triangle" string.


/**************************************************************Task 1******************************************************/
class Shape {
  constructor(x, y) {
    let _x;
    let _y;
    this.setX = (x) => {
      if (x >= 0) {
        _x = x;
      } else {
        _x = 0;
      }
    }
    this.setY = (y) => {
      if (y >= 0) {
        _y = y;
      } else {
        _y = 0;
      }
    }
    this.getX = () => _x;
    this.getY = () => _y;
    this.setX(x);
    this.setY(y);
    this.showPoint = () => {
      console.log(`${_x},${_y}`);
    }
  }
  createHorizontalOffset(off) {
    let offSet = "";
    for (let i = 0; i < (off >= 0? off : this.getX()); i++) {
      offSet += " ";
    }
    return offSet;
  }
  draw() {
    for (let i = 0; i < this.getY(); i++) {
      console.log(" ");
    }
  }
}

/************************************************Task 2********************************************************************/

class Square extends Shape {
  constructor(x, y, len) {
    super(x, y);
    let _len;
    this.setLen = (len) => {
      if (len <= 0) {
        _len = 1;
      } else {
        _len = len;
      }
    }
    this.getLen = () => _len;
    this.setLen(len);
    this.draw = () => {
      super.draw();
      let line = this.createHorizontalOffset();
      for (let i = 0; i < len; i++) {
        line += "*";
      }
      for (let i = 0; i < len; i++) {
        console.log(line);
      }
    }
  }
}

class Triangle extends Shape {
  constructor(x, y, h) {
    super(x, y);
    let _h;
    this.setH = (h) => {
      if (h <= 0) {
        h = 1;
      } else {
        _h = h;
      }
    }
    this.getH = () => _h;
    this.setH(h);
    this.draw = () => {
      super.draw();
      let triangle = "";
      for (let i = 1; i <= _h; i++) {
        let line = this.createHorizontalOffset(this.getX()) + this.createHorizontalOffset(_h - i);
        for (let j = 0; j < ((i * 2) - 1); j++) {
          line += "*";
        }
        line += "\n";
        triangle += line;
      }
      console.log(triangle);
    }
  }
}

/*****************************************************Task 3**************************************************/
//Changes were made to the Shape, Square, and Triangle class to complete Task 3

//Test Cases to draw a square and a triangle
let square = new Square(6, 13, 11);
let triangle = new Triangle(10,6,7);
square.draw();
triangle.draw();
