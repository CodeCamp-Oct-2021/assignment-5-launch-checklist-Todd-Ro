// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
    return `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
                /*Returns a string equal to 'null' if the input is empty, 'NaN' if the input 
                is not a number, or 'number' if the input is a number.*/
                if(testInput === '') {
                    return 'Empty';
                } else if (isNaN(Number(testInput))) {
                    return "Not a Number";
                } else {
                    return "Is a Number";
                }
}

function formSubmission(documentName, list, pilot, copilot, fuelLevel, cargoLevel) {
   if(validateInput(pilot)=="Empty" || validateInput(copilot) == "Empty" || validateInput(fuelLevel) == "Empty" 
                || validateInput(cargoLevel) == "Empty") {
        alert("Don't have empty inputs!");
    }
    else if(validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Pilot and copilot names should not be numbers.");
    }
    else if(validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel level and cargo mass should be numbers.");
    }

    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    //pilotStatus.innerHTML = "StupidString";
    pilotStatus.innerHTML = String(pilot);
    copilotStatus.innerHTML = String(copilot);
    let fuelStatus = document.getElementById("fuelStatus");
    let defaultFuelStatus = "Fuel level high enough for launch";
    let launchStatusProblemString = "Shuttle not ready for launch";
    let launchStatus = document.getElementById("launchStatus");

    let cargoStatus = document.getElementById("cargoStatus");

    let launchStatusProblemAlert = function() {
        launchStatus.innerHTML = launchStatusProblemString;
        launchStatus.style.color = "red";
        list.style.visibility = "visible";
    };

    if (validateInput(fuelLevel) === "Is a Number" && fuelLevel >= 10000 && 
                validateInput(cargoLevel) === "Is a Number" && cargoLevel <= 10000 && 
                validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number") {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    } else if (validateInput(pilot)!= "Not a Number" || validateInput(copilot)!= "Not a Number" ) {
        launchStatus.innerHTML = "Awaiting Information Before Launch";
        launchStatus.style.color = "black";
    }

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level must be 10,000 or higher to launch.";
        launchStatusProblemAlert();
    } else {
        fuelStatus.innerHTML = defaultFuelStatus;
    }

    let defaultCargoStatus = "Cargo mass low enough for launch";
    if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Maximum mass for takeoff is 10,000";
        launchStatusProblemAlert();
    } else {
        cargoStatus.innerHTML = defaultCargoStatus;
    }


}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json();
    });

    //Returns the array we got as a Promise
    return planetsReturned;
}

function pickPlanet(planets) {
    let planetCount = planets.length;
    let planetIndexBase = (Math.floor(Math.random()*planetCount));
    console.log("pickPlanet got number", planetIndexBase);
    return (planets[planetIndexBase]);
}

/*module.exports = {
    validateInput: validateInput
}*/

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
