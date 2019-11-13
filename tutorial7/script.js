// An array of roads (represented as strings connecting points) 
// in Meadowfield. There are 11 different points (vertices)
// and 14 roads (edges)
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

// This function takes the array of roads (edges) and returns 
// a JavaScript object that makes key value pairs for any
// vertices connected by an edge. The key represents the "from"
// point and the value for each key will be an array that holds
// all the "to" points from the "from" point
function buildGraph(edges) {
    //Create a new empty Object 
    let graph = Object.create(null);
    //Declaring a function that will add edges to our graph object
    function addEdge(from, to) {
    //If we haven't added this "from" point to our graph yet
    //initialize its key and store a new array holding this 
    //key's first "to" point as the property for the key
      if (graph[from] == null) {
        graph[from] = [to];
    //Else, if the key already exists, just add the new "to"
    //point to the existing array 
      } else {
        graph[from].push(to);
      }
    }
    //This FOR loop iterates over every element (every element is itself an array of 2 elements)
    //of an array that is built using the array split method. The string array of roads is split
    //over "-" so each element of the new array (returned by r.split("-")) is an array that holds 
    //two vertices that a path exists between, identified by "from" and "to" (a path FROM this vertex
    //TO this vertex). The addEdge function declared above is called twice for each pair of vertices connected
    //by a path. This is because this graph is symmetric -> if a path exists from point a to point b, a path exists
    //from point b to point a.
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    return graph;
  }
  
//Building a new graph to represent the village of Meadowfield using our buildGraph Function 
const roadGraph = buildGraph(roads);

//This class represents the "state" of our village that can be called for any given point of time in the robot's
//"mission" to deliver each parcel to its addressed location. Every time the robot makes a new move, we won't update
//the state of the village that may already be an existing object, rather, we will create a brand new VillageState
//object based on the core parameters that define at what point our robot is in its mission; its current location
//and an array that represents which parcels still need to be delivered  
class VillageState {
    //Class constructor 
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }
  
    //This function is called to simulate moving the robot from one location to another. 
    move(destination) {
    //Is this destination valid? We answer this question by checking if the passed destination is actually in 
    //the adjacency list of the Robot's current place (we built this adjacency list above when we called buildGraph(roads)).
    //If this destination is NOT valid, just return "this".
      if (!roadGraph[this.place].includes(destination)) {
        return this;
    //If the destination is valid, we need to do two operations to update our list of parcels. First, we need to move all of 
    //the parcels at the robot's current place with the robot to the destination. Then, we need to remove from the list of 
    //parcels all the parcels that the robot is actually delivering at the destination. We will be left with an array of parcels
    //that the robot carried with it from the last place (relative to the destination) that were NOT supposed to be delivered 
    //at the place after the robot's move. 
      } else {
        //The operation of moving each parcel is done using the map function, however, only the parcels that are actually at the 
        //same place as the robot need to be updated. Therefore, if the place of some parcel is not the same as the robot's current place
        //(this.place), then we just return the parcel as it is (we'll get to that parcel eventually). If a given parcel in our list of 
        //parcels is actually in the same place as our robot, then we will update that parcel's location to the destination so it moves with 
        //the robot. 
        let parcels = this.parcels.map(p => {
          if (p.place != this.place) return p;
          return {place: destination, address: p.address};
        //The operation of delivering parcels that have reached their address is taken care of using the filter function. 
        //If the place of any given parcel in our list of parcels is now the same as the parcel's address, we filter it out 
        //of our list to simulate that it has been delivered and is no longer a parcel our robot must concern itself with. 
        }).filter(p => p.place != p.address);
        //We return the updated VillageState (by creating a NEW instance of the VillageState class, not ACTUALLY updating the previous state)
        //after the robot's move
        return new VillageState(destination, parcels);
      }
    }
  }

  /**************************************************SIMULATION**********************************************************************/

  //This function simulates a robot deciding which direction it wants
  //to move next by analyzing the world around it (passing in a VillageState
  //object), a "robot" function that basically will define the criteria
  //a robot will use to decide its next direction (is this a random robot,
  //a routing robot, or a path finding robot?). Some robots will have to use a 
  //"memory" to provide more optimized path finding.
  function runRobot(state, robot, memory) {
    //Start a counter for the number of turns a robot will take
    //to deliver all the parcels. Only break out of the FOR loop
    //when all the parcels have been delivered (when the list of 
    //parcels still yet to be delivered has become empty)
    for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      //Decide the course of action the robot will take by calling
      //the passed "robot" function (random, routing, path finding, etc.)
      let action = robot(state, memory);
      //Set the new state of Village by moving the robot to 
      //the destination it determined best to move to
      state = state.move(action.direction);
      //Store the memory of the action taken
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
  }

  //This function picks a random element of a  passed array
  //using the Math.random() function (to pick a random number / array index)
  //and returns the value of the random element
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
  }
  //This is our "random robot" that picks the next destination randomly by calling the "randomPick" function
  //on the array of possible destinations from the current place. This robot does not need to remember anything
  //because each decision is random so it omits the memory property from the object it returns.
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }

  //Here we are adding a new function called "random" to the constructor for our Village State. We always have 
  //5 parcels to deliver and we're always starting at the Post Office.
  VillageState.random = function(parcelCount = 5) {
    //Create an empty array that will be populated with parcels
    let parcels = [];
    //Populating the parcels array
    for (let i = 0; i < parcelCount; i++) {
      //Calling the randomPick() function to randomly set the parcel's destination address
      let address = randomPick(Object.keys(roadGraph));
      let place;
      //We will keep picking a new random location for our parcel to begin at as long as the randomly picked location 
      //is the SAME as the address. We do this because we don't want any parcel to START where it's supposed to end up. 
      //This is all done using a do while loop (because we must pick the parcel's starting location AT LEAST once)
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    //We return the inital state of the Village starting at the Post Office and with the 5 Parcels randomly scattered around the village
    return new VillageState("Post Office", parcels);
  };

  //MAIL ROUTE 
  
  //A route that passes all the places in the village. If the robot 
  //runs through this route twice, it is guaranteed to have delivered
  //all the parcels. You can almost think about this as the first time
  //the robot runs through the route it picks every parcel up, and the 
  //second time it delivers every parcel. 
  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

  //Function that implements the mail route robot. The mail
  //route robot actually uses memory unlike the random robot.
  //If there is no memory, initialize the memory with the 
  //optimized mail route (see above). After the initialization,
  //the robot will simply follow the optimized mail route by 
  //returning the first element in the memory array and then 
  //removing the first element using the slice method (as to 
  //update the first element for the next time the robot has
  //to pick a direction)
  function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
  }

  //Path Finding 

  //This is a function that implements a path finding algorithm
  //to determine the SHORTEST route the robot could take to 
  //deliver all the parcels. 
  //Although the number of possible routes through a graph is infinite,
  //when searching for routes from A to B, we are only interested
  //in the ones that start at A. So what we do, is we "grow" the routes
  //from the starting point (A) exploring every reachable place that hasn't
  //been visited yet (this is a Breadth First Search), until a route reaches
  //the goal. This way, we find the shortest route. 
  function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }

  //This is a function to implement a goalOrientedRobot that uses
  //our path finding algorithm to determine the shortest path. 
  //The robot uses its memory value as a list of directions to move in
  //, just like the route-following robot. It only has to figure out
  //what to do next when that list is empty. Taking the first undelivered
  //parcel in the set, the robot begins "growing" paths from the starting point
  //to the parcel's destination address to determine the shortest path.
  function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else {
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
  }


//Test Cases for the 3 Different Robots

 console.log("Off Goes the Random Robot!!!!!")
 runRobot(VillageState.random(), randomRobot);

 console.log("Off Goes the Route Robot!!!!!")
 runRobot(VillageState.random(), routeRobot, []);

 console.log("Off Goes the Goal Oriented Robot!!!!!")
 runRobot(VillageState.random(), goalOrientedRobot, []);
