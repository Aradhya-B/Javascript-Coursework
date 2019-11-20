// Task 1
// •	Create an IIFE that contains the following
// o	An array of numbers that represent student’s grades
// o	An inner function that returns the average of those grades
// o	An inner function that returns the maximum of those grades
// o	A call to each of the inner function within console.log so that we can see the results
// •	Run the script to see the results

// All variables and functions that we create inside the IIFE are protected from the global scope, which resembles creating encapsulated object.

// In Task 1 I am creating an IIFE that calls inner functions from within the IIFE to compute
// a max and average of a number array (that represents student grades) using the reduce method
let gradeObj = (
    function () {
        let studentGrades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        function averageGrade() {
            return studentGrades.reduce((acc, b) => acc + b) / studentGrades.length;
        }
        function maxGrade() {
            return studentGrades.reduce((max, b) => Math.max(max,b));
        }
        console.log("Calls from inside IIFE:")
        console.log(`Average Grade: ${averageGrade()}`);
        console.log(`Max Grade: ${maxGrade()}`);
        return {averageGrade, maxGrade};
    }
)();

// Task 2
// In Task 2 I added a return statement to the IIFE I made in Task 1 that returned an object
// that holds bindings to the IIFE's inner functions. This object is binded to "gradeObj" and 
// below, the functions are called by accessing the object properties of gradeObj

console.log("Calls from outside IIFE:")
console.log(`Average Grade: ${gradeObj.averageGrade()}`);
console.log(`Max Grade: ${gradeObj.maxGrade()}`);

// Task 3
// In Task 3 I created a new IIFE similar to the one made in Task 1/2. The difference is that
// in this IIFE, there are additional inner functions to get and set the actual student grades
// being processed within the IIFEE. The returned object is the same as that in the IIFE of 
// Tasks 1 and 2, however, it also containes references to the newly added setGrades and getGrades
// functions. The returned object is binded to "gradeObjWithMutators" and then the functions are 
// called by accessing this objects properties. 

let gradeObjWithMutators = (
    function () {
        let studentGrades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        function averageGrade() {
            return studentGrades.reduce((acc, b) => acc + b) / studentGrades.length;
        }
        function maxGrade() {
            return studentGrades.reduce((max, b) => Math.max(max,b));
        }
        function getGrades() {
            return studentGrades;
        }
        function setGrades(newGrades) {
            studentGrades = newGrades;
        }
        return {averageGrade, maxGrade, getGrades, setGrades};
    }
)();

console.log(`Grades: ${gradeObjWithMutators.getGrades()}`)
let newGrades = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95];
gradeObjWithMutators.setGrades(newGrades);
console.log(`New Grades: ${gradeObjWithMutators.getGrades()}`)