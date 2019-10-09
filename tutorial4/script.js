/********************************************************** Task 1 ********************************************************/

let distances = [134, 6, 7, 83, 9, 1, 0, 9, 6, 17, 54, 16];

// This code creates a "test" function binded to the name "inRange" that checks whether or not a passed
// number variable is in the range (5, 10). This test function is then passed to the filter function using
// regular notation and using arrow notation. The filter function evaluates the test on each value of the
// distances array and returns a new array that holds all values that passed the test.
const inRange = function(dist) {
  return dist > 5 && dist < 10;
}

const distInRangeFunc = distances.filter(inRange);

const distInRangeArrow = distances.filter(dist => dist > 5 && dist < 10);

// This code create a "transform" function binded to the name toInches that transforms a passed parameter in meters
// to inches by multiplying by a constant. This transform function is then passed to the map function using
// regular notation and using arrow notation. The map function then performs the transformation on each value of
// the distances array and returns a new array that holds all the transformed values.
const toInches = function(dist) {
  return dist * 39.37;
}

const distToInchesFunc = distances.map(toInches);

const distToInchesArrow = distances.map(dist => dist * 39.37);

// This code create a "combine" function binded to the name combine that returns the minimum of two passed values.
// This combine function is then passed to the reduce function using regular notation and using arrow notation.
// The reduce function then returns the minimum of the distances array by comparing each value of the array to an
// "accumulator" value. If the current value is less than the accumulator, accumulator = current distance. At the end,
// the accumulator is returned as a single value.
const combine = function(currentMin, dist) {
  return Math.min(currentMin, dist);
};

const minDistFunc = distances.reduce(combine);

const minDistArrow = distances.reduce((lowest, dist) => Math.min(lowest, dist));

// This code uses all the functions created above and the filter, map, and reduce functions to first filter the distances
// array, then map each filitred value to inches, and then reducing the array of filtered inches to a single value
// representing the minimum of the array using the reduce function.
const minDistOneLine = distances.filter(inRange).map(toInches).reduce(combine);

console.log(minDistOneLine);

/********************************************************** Task 2 ********************************************************/

let points = [ {x:5, y:6}, {x:3, y:7}, {x:8, y:0}, {x:9, y:10}, {x:15, y:4}, {x:0, y:15} ];

// This code computes the maximum distance from the origin to one of the points in the points array using
// the filter, map, and reduce functions. First, the points array is filtered for all values that are not
// on either axis by making sure both the "x" and "y" value are not 0. After that, the filtered objects are transformed
// into single values representing their distances from the origin using distance = sqrt(x^2 + y^2). The max distance
// is then extracted using the reduce function which keeps assigning the accumulator variable to the max value as the
// transformed array is iterated over, eventually returning the accumulator when the end of the array is reached.

let maxDist = points.filter(point => {
  return point.x != 0 && point.y != 0;
}).map(point => {
  return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2))
}).reduce((acc, dist) => {
  return Math.max(acc, dist);
});

console.log(maxDist);
