// Write your JavaScript code here!

window.addEventListener("load", function() {


    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
      listedPlanets = result;
      //console.log(listedPlanets);
    }).then(function() {
  
      //console.log(listedPlanets);
      
      let planet = pickPlanet(listedPlanets);
      console.log(planet.name);
      //let moonsString;
      if(planet.moons > 0) {
        console.log("Planet has moons");
          //moonsString = "Ghomrassen, Guermessa and Chenini; OR Belior and Timor; OR Phobos and Deimos"
      } 
      /*else {
          moonsString = "null";
      }*/
  
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
  
      let div = document.getElementById("missionTarget");
      let star = planet.star;
      let ourPlanetString = addDestinationInfo(document, planet.name, planet.diameter, star, 
                    planet.distance, planet.moons, planet.image);
      div.innerHTML = ourPlanetString;
    }) 



    let theLaunchForm = document.querySelector("form");
    //let submitButton = document.getElementById("formSubmit");
    let faultyList = document.getElementById("faultyItems");
    faultyList.style.visibility = "hidden";
    //Can be made visible with faultyList.style.visibility = "visible";

    //let isValidated = false;
    theLaunchForm.addEventListener("submit", function(event) {
            console.log("Form submitted");
            event.preventDefault();
            // We are preventing form from doing GET or POST even if inputs are valid

            let pilotNameField = document.querySelector("input[name=pilotName]");
            let pilotNameInput = pilotNameField.value;
            let copilotNameField = document.querySelector("input[name=copilotName]");
            let copilotNameInput = copilotNameField.value;
            let fuelLevelField = document.querySelector("input[name=fuelLevel]");
            let fuelLevelInput = fuelLevelField.value;
            let cargoMassField = document.querySelector("input[name=cargoMass]");
            let cargoMassInput = cargoMassField.value;

            console.log("Fuel level input:", fuelLevelInput);

            formSubmission(document, faultyList, pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput);

    });
   
});