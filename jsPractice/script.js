let rabbit = {};
rabbit.speak = line => {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");

const speak =  function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type:"white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " + "how late it's getting!");


function normalize()  {
  console.log(this.coords.map(n => n / this.length));
}

normalize.call({coords: [0, 2, 3], length: 5});
