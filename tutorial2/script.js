// TASK 1

const printHello = (name) => {
  let message = "Hello";
  console.log(message + " " + name);
};

printHello("Aradhya");
const printGreeting = printHello;
printGreeting("John");

// TASK 2

const printVertical = (str) => {
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
};

printVertical("Awesome");

const printWithSpaces = (str) => {
  let strWithSpaces = ""
  for (let i = 0; i < str.length; i++) {
    strWithSpaces += str[i] + " ";
  }
  console.log(strWithSpaces);
};

printWithSpaces("I love programming!");

const printInReverse = (str) => {
  // Split the given string into an array of characters
  // seperated by nothing, then reverse the array using
  // built in function, then join the character array
  console.log(str.split("").reverse().join(""));
};

printInReverse("This string is in reverse!");

const genericPrinter = (str, func) => {
  return func(str);
};

genericPrinter("Great", printVertical);
genericPrinter("Hello World!", printWithSpaces);
genericPrinter("Another string in reverse!", printInReverse);

// TASK 3

const calenderName = (str) => {
  // Created JSON Objects to hold enumerations
  // for the months of the year and the days of the week
  const monthName = (mon) => {
    const months = {
      1:"January",
      2:"February",
      3:"March",
      4:"April",
      5:"May",
      6:"June",
      7:"July",
      8:"August",
      9:"September",
      10:"October",
      11:"November",
      12:"December"
    };
    // Check to make sure the passed number is a valid "month" according to our
    // JSON Object
    if (months[mon]) {
      return months[mon] + "_m";
    } else {
      return "Unknown";
    }
  };

  const dayName = (day) => {
    const weekdays = {
      1:"Monday",
      2:"Tuesday",
      3:"Wednesday",
      4:"Thursday",
      5:"Friday",
      6:"Saturday",
      7:"Sunday"
    };
    // Check to make sure the passed number is a valid "weekday" according to our
    // JSON Object
    if (weekdays[day]) {
      return weekdays[day] + "_d";
    } else {
      return "Unknown";
    }
  };

  if (str === "m") {
    return monthName;
  }

  if (str === "d") {
    return dayName;
  }
};

const findNameOfTheMonth = calenderName("m");
console.log(findNameOfTheMonth(4));

const findNameOfTheDay = calenderName("d");
console.log(findNameOfTheDay(6));

// TASK 4

const powerOf = (power) => {
  const raiseToPower = (number) => {
    let powered = 1
    for(let i = 0; i < power; i++) {
      powered = powered * number;
    }
    return powered
  };
  return raiseToPower;
};

const p2 = powerOf(2);
const p3 = powerOf(3);
const p4 = powerOf(4);

console.log(p2(5));
console.log(p3(5));
console.log(p4(5));
