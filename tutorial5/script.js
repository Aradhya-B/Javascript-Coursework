/*******************************************************Task 1***************************************************************/

//This program creates complex number objects using both a prototype object and the javscript new keyword. The prototype
//object has real and imaginary keys thats values are initialized to null (will be initialized when a new object is created
//using the prototype) and a print function that prints the complex number in the format "{real}+{im}i". The
//createComplexNumber function makes a new object using the ComplexNumberPrototype and initializes the real and imaginary
//values of the new complex number object, and then returns the newly initialized object.

let ComplexNumberPrototype = {
  real: null,
  im: null,
  print(){
    console.log(`${this.real}+${this.im}i`);
  }
};

const createComplexNumber = (real, im) => {
  let complexNum = Object.create(ComplexNumberPrototype);
  complexNum.real = real;
  complexNum.im = im;
  return complexNum;
}

//Test case
const myComp = createComplexNumber(4, 6);
myComp.print();

//This program creates a constructor function for a complex number that takes a real and imaginary component of the complex
//number to be created as arguments. The constructor function is to be used with the "new" keyword, therefore we use the
//"this" keyword to set the real and imaginary compnents of the object to be created using the "new" keyword.
function ComplexNumber(real, im) {
  this.real = real;
  this.im = im;
  this.print = () => {
    console.log(`${this.real}+${this.im}i`);
  }
}

//Test case
const myCompNew = new ComplexNumber(4, 6);
myCompNew.print();

/**************************************************Task2******************************************************************/

//This program creates a new constructor function for a complex number that in addition the functionality of the constructor
//from Task 1, gives the complex number object an add, subtract, divide, and multiply method.
function ComplexNumber2(real, im) {
  this.real = real;
  this.im = im;
  this.print = () => {
    console.log(`${this.real}+${this.im}i`);
  }
  //The add method destructures the real and imaginary component from the passed complex number object into variables real and
  //im. Then the destructured variables are simply added to the real and imaginary compoenents of the complex number the
  //method was called on.
  this.add = (complexTwo) => {
    let {real, im} = complexTwo;
    let newReal = this.real + real;
    let newIm = this.im + im;
    return new ComplexNumber2(newReal, newIm);
  }
  //Subtract works the same way as add but simply subtracts the destructured variables instad of adding them to the real and
  //imaginary components of the the complex number the method was called on.
  this.subtract = (complexTwo) => {
    let {real, im} = complexTwo;
    let newReal = this.real - real;
    let newIm = this.im - im;
    return new ComplexNumber2(newReal, newIm);
  }
  //Divide works by multiplying the numerator and the denominator (the object and the argument respectively) by the complex
  //conjugate of the denominator. This removes the imaginary part from the denominator and allows the complex number to be
  //written in the format "{real}+{im}i".
  this.divide = (complexTwo) => {
    let {real, im} = complexTwo;
    let denominator = Math.pow(real, 2) + Math.pow(im, 2);
    let currentReal = this.real;
    let currentIm = this.im;
    let newReal = ((currentReal * real) + (currentIm * im)) / denominator;
    let newIm = ((currentReal * im) - (currentIm * real)) / denominator;
    return new ComplexNumber2(newReal, newIm);
  }
  //Multiply works by implementing FOIL multiplication of the real and imaginary components. Ex. (3+2i)(1+4i) = 3*1 + 3*4i +
  //2i*1 + 2i*4i = (3-8) + (12 + 2)i = -5 + 14i.
  this.multiply = (complexTwo) => {
    let {real, im} = complexTwo;
    let currentReal = this.real;
    let currentIm = this.im;
    let newReal = (currentReal * real) - (currentIm * im);
    let newIm = (currentReal * im) + (currentIm * real);
    return new ComplexNumber2(newReal, newIm);
  }
}

//Test Cases
let c1 = new ComplexNumber2(4, 2);
let c2 = new ComplexNumber2(1, 4);
let sum = c1.add(c2);
sum.print()
let product = c1.multiply(c2);
product.print()
let difference = c1.subtract(c2);
difference.print();
let quotient = c1.divide(c2);
quotient.print();
