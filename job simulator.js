//////////////////////////////////////////////////////////////
// Job simulator //
//////////////////////////////////////////////////////////////

//*/ get the elements for the simulator:
const csName = document.getElementById("csName");
const csClass = document.getElementById("csClass");
const csStartButton = document.getElementById("csStartButton");
const csRestartButton = document.getElementById("csRestartButton");
const workField = document.getElementById("workField");
const csButton = document.getElementById("csButton");
const csButton2 = document.getElementById("csButton2");
const csButton3 = document.getElementById("csButton3");
const csResult = document.getElementById("csResult");
const csResult2 = document.getElementById("csResult2");
const csResult3 = document.getElementById("csResult3");
const csResult4 = document.getElementById("csResult4");
const moneyCounter = document.getElementById("moneyCounter");
const csResultField = document.getElementById("csResultField");
const image = document.getElementById("image_result");
const dateWindow = document.getElementById("date_window");
//*/ elements from eventWindow:
const eventWindow = document.getElementById("random_event");
const eventCloseBtn = document.getElementById("event_close_btn");
const eventHeader = document.getElementById("event_header");
let eventButton1 = document.getElementById("event_btn1");
let eventButton2 = document.getElementById("event_btn2");
const eventResult = document.getElementById("event_result");

// image.style.backgroundImage = `https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80;
//     `;

//*/ get the sounds for the simulator:
const gainSound = new Audio("./sounds/cha-ching.wav");
const loseSound = new Audio("./sounds/aaww.wav");
const gameOverSound = new Audio("./sounds/game-over.wav");
const luckyBreakSound = new Audio("./sounds/phew.wav");

let csButtonClick = 0;
let days = 0;
let week = 1;
let month = 1;
let numberArray = [];
let multiplier = 0;
let variable = 0;
let risk = 10;
let gameState = "";

function player() {
  gameState = "play";
  let playerName = csName.value;
  playerName
    ? (playerName = `Hello ${playerName[0].toUpperCase()}${playerName.slice(
        1
      )}! You start out with 10$ from the Goverment`)
    : (playerName = `Hello! You start out with 10$ from you're friendly Goverment.`);

  let playerClass = csClass.value;
  playerClass
    ? (playerClass = `I see you are a ${playerClass[0].toUpperCase()}${playerClass.slice(
        1
      )}. START HOBO-ING!`)
    : (playerClass = `You lack a hobo-class...anyway: Live you're life!`);
  console.log(`${playerName} ${playerClass}`);
  csResult.textContent = `${playerName} ${playerClass}`;
}

csStartButton.addEventListener(
  "click",
  () => {
    workField.style.cssText = "display: flex;";
    csStartButton.style.cssText = "display: none;";
    csName.style.cssText = "display: none;";
    csClass.style.cssText = "display: none;";
    csResult.style.cssText = `
      padding: 10px;
      border: 1px solid #8ab100;
      box-shadow: 0 0 20px #c8ff00;
    `;
    player();
  }
);

csRestartButton.addEventListener(
  "click",
  () => {
    workField.style.cssText = "display: none;";
    csResultField.style.cssText = "display: none;";
    csStartButton.style.cssText = "display: inline;";
    csName.style.cssText = "display: inline;";
    csClass.style.cssText = "display: inline;";
    csRestartButton.style.cssText = "display: none;";
    dateWindow.innerHTML = "Day: 1 <br> Week: 1 <br> Month: 1";
  }
);

eventCloseBtn.addEventListener("click", () => {
  eventCloseBtn.style.cssText = "display: none;";
  eventResult.innerHTML = "";
});

//todo setTimeOut
csButton.addEventListener(
  "click",
  () => {
    multiplier = 0.75;
    risk = risk * 0.9;
    combatSystem();
  }
);
csButton2.addEventListener(
  "click",
  () => {
    multiplier = 1;
    risk = risk * 1 - 0.5;
    combatSystem();
  }
);
csButton3.addEventListener(
  "click",
  () => {
    multiplier = 2;
    risk = risk * 1.2 + 1;
    combatSystem();
  }
);

function combatSystem() {
  csResultField.style.cssText = "display: inline;";

  csButtonClick += 1;
  days += 1;

  console.log("multiplier is: " + multiplier);
  console.log("risk is: " + risk);

  dateWindow.style.cssText = "display: inline;";
  dateWindow.innerHTML = `Day: ${days} <br> Week: ${week} <br> Month: ${month}`;

  let randomNumber = Math.floor(Math.random() * 100);
  let randomNumber2 = Math.floor(Math.random() * 100);
  let randomNumber3 = Math.floor(Math.random() * 10);

  let luckStat = 10;
  let luck = Math.floor(Math.random() * luckStat);

  console.log("randomNumber is " + randomNumber);
  console.log("randomNumber2 is " + randomNumber2);
  console.log("luck is:" + luck);

  let hitOrMiss = "";

  // Oppdatert switch med konsistente strenger:
  switch (true) {
    case randomNumber < 20:
      hitOrMiss = "You completly fucked up man!";
      break;
    case randomNumber < 60:
      hitOrMiss = "You manage to find some valuables in the trash";
      break;
    case randomNumber < 80:
      hitOrMiss = "Some old lady felt sorry for you!";
      break;
    case randomNumber < 101:
      hitOrMiss = "You tried to rob a old lady outside a store, she fought you of and called the police, you got caught!";
      break;
  }

  let dmgNumber = Math.floor(Math.random() * 200);
  let dmgResult = "";
  let promotion = "";

  //* add multiplier to dmgNumber
  dmgNumber = dmgNumber * multiplier;

  // Oppdatert switch med konsistente strenger:
  switch (hitOrMiss) {
    case "You completly fucked up man!":
      loseSound.play();
      dmgResult = "You got nothing but a bottlecap";
      dmgNumber = 0;
      promotion = "The city goverment dont take kind to begging";
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
        display: inline;
      `;
      break;
    case "You manage to find some valuables in the trash":
      gainSound.play();
      dmgResult = `You sold it and got ${dmgNumber}$.`;
      promotion = "You can now afford food today, congratulations!";
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
        display: inline;
      `;
      break;
    case "Some old lady felt sorry for you!":
      gainSound.play();
      dmgResult = `She gave you ${dmgNumber * 15}$ for food and shelter!`;
      dmgNumber = dmgNumber * 15;
      promotion = "A generous person let you stay in their shed for the night, what a lovely person";
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
        display: inline;
      `;
      break;
    case "You tried to rob a old lady outside a store, she fought you of and called the police, you got caught!":
      gameOverSound.play();
      dmgResult = `You lost ${dmgNumber * 4}$ in the court trial. Fucking hell man.`;
      dmgNumber = -dmgNumber * 4;
      promotion = "You are sent to jail!";
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);  
        display: inline;
      `;
      break;
  }

  numberArray.push(dmgNumber);
  let total = 1000;
  for (let dmg of numberArray) {
    total += dmg;
  }

  console.log(numberArray);
  console.log(total);

  csResult2.textContent = `${hitOrMiss} ${dmgResult}`;
  csResult3.textContent = `${promotion}`;
  csResult4.textContent = `${total.toFixed(2)}$`;

  //*/ Checks if the player gets a lucky break or not. Ends the game if not:
  if (randomNumber2 > risk && randomNumber >= 80) {
    luckyBreakSound.play();
    csResult3.textContent =
      "You you got lucky this time. You live to see another day.";
    csResult4.textContent = `${(total + 1000).toFixed(2)}$`;
  } else if (randomNumber2 < risk && randomNumber >= 80) {
    gameOverSound.play();
    csResult4.textContent = `Final score: ${(total + 1000).toFixed(2)}$. You manage to stay alive for ${csButtonClick} days`;
    //*/ Resets the game:
    gameState = "end";
    days = 0;
    week = 1;
    month = 1;
    csButtonClick = 0;
    numberArray = [];
    risk = 10;
    csRestartButton.style.cssText = "display: inline;";
    workField.style.cssText = "display: none;";
  }

  if (days === 7) {
    days = 0;
    week += 1;
  }
  if (week === 4) {
    week = 1;
    month += 1;
  }
  console.log("day:" + days);
  console.log("week:" + week);
  console.log("month:" + month);

  //*/ Gjør resultatsfeltene synlige når combatSystem kjøres:
  if (csButtonClick > 0) {
    csResult.style.cssText = `
      padding: 10px;
      border: 1px solid #8ab100;
      box-shadow: 0 0 20px #c8ff00;
    `;
    csResult2.style.cssText = `
      padding: 10px;
      border: 1px solid #8ab100;
      box-shadow: 0 0 20px #c8ff00;
    `;
    csResult3.style.cssText = `
      padding: 10px;
      border: 1px solid #8ab100;
      box-shadow: 0 0 20px #c8ff00;
    `;
    csResult4.style.cssText = `
      padding: 10px;
      border: 1px solid #8ab100;
      box-shadow: 0 0 20px #c8ff00;
    `;
  }

  //*/ Gjør knappene synlige når combatSystem kjøres:
  if (csButtonClick > 0) {
    csButton2.style.cssText = "display: block;";
    csButton3.style.cssText = "display: block;";
  }
  moneyCounter.textContent = "$$$";

  //*/ Tømmer csResult-feltet når combatSystem kjøres:
  if (csButtonClick > 0) {
    csResult.textContent = "";
    csResult.style.cssText = "padding: 0; border: none; box-shadow: none;";
  }

  //*/ Random events:
  const randomEvent1 = () => {
    eventHeader.innerHTML = `<h1>A police officer appers</h1>
        <p>Becouse of city policy, begging is not allowed in the public</p>
        <p>What will you do?</p>`;
    eventButton1.style.cssText = "display: inline-block;";
    eventButton1.textContent = "Follow the police officer outside of city center";
    eventButton2.style.cssText = "display: inline-block;";
    eventButton2.textContent = "Keep begging";
  };

  function event1Result1() {
    if (luck < 5) {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>You follow the police officer and lose ${(total * 0.1).toFixed(2)}$</p>`;
      total -= total * 0.1;
    } else {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police officer feels sorry for you, and gives you 10$ for food and shelter</p>`;
      total += 10;
    }
    eventCloseBtn.style.cssText = "display: inline;";
    csResult4.textContent = `${total.toFixed(2)}$`;
    eventButton1.style.cssText = "display: none;";
    eventButton2.style.cssText = "display: none;";
  }

  function event1Result2() {
    if (luck > 5) {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police officer is nice and lets you keep begging, even giving you ${(
          total * 0.05
        ).toFixed()}$ for food and shelter!</p>`;
      total *= 1.05;
    } else {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police is angry with you, and gives you an additional fee of 100$ 
        for being homeless AND begging in the city center</p>`;
      total -= 100;
    }
    eventCloseBtn.style.cssText = "display: inline;";
    csResult4.textContent = `${total.toFixed(2)}$`;
    eventButton1.style.cssText = "display: none;";
    eventButton2.style.cssText = "display: none;";
  }

  // Oppdatert deklarasjon med let:
  let randomEventCriteria = randomNumber3 >= 7 && gameState !== "end" && days > 2;

  if (randomEventCriteria) {
    eventWindow.style.cssText = "display: inline;";
    randomEvent1();

    // Fjern tidligere eventListeners ved å klone knappene
    let newEventButton1 = eventButton1.cloneNode(true);
    eventButton1.parentNode.replaceChild(newEventButton1, eventButton1);
    eventButton1 = newEventButton1;

    let newEventButton2 = eventButton2.cloneNode(true);
    eventButton2.parentNode.replaceChild(newEventButton2, eventButton2);
    eventButton2 = newEventButton2;

    eventButton1.addEventListener("click", event1Result1);
    eventButton2.addEventListener("click", event1Result2);
  }

  //* Weekly event
  if (days === 1 && week > 1) {
    console.log(csButtonClick);
    // Her kan du legge inn logikk for ukentlige eventer.
  }
}


  //* end of combatsystem code


//   if (csButtonClick < 10) {
//     padded.append((csResult.textContent = `${playerName} ${playerClass}`));
//     padded.append((csResult2.textContent = `${hitOrMiss} ${dmgResult}`));
//     padded.append((csResult3.textContent = `${promotion}`));
//   }
//   if (csButtonClick < 10 && csButton.textContent !== "Restart") {
//     padded.append((csResult4.textContent = `${total + 1000}$`));
//   } else {
//     csResult.remove(csResult.textContent);
//     csResult2.remove();
//     csResult3.remove();
//     csResult4.remove();
//     csButtonClick = 1;
//     numberArray = [];
//   }
// }
//   if (csButtonClick > 1) {
//     csResult.textContent = "";
//   }
//   csResult3.textContent = `${promotion}`;
//   if (csButton.textContent === "Restart") {
//     csResult4.textContent = `Final score: ${total + 1000}$`;
//     csButtonClick = 1;
//     numberArray = [];
//   } else {
//     csResult4.textContent = `${total + 1000}$`;
//   }
// }

//! Working code from result above.
// csResult.textContent = `${playerName} ${playerClass}`;
// if (csButtonClick > 1) {
//   csResult.textContent = "";
// }
// csResult2.textContent = `${hitOrMiss} ${dmgResult}`;
// csResult3.textContent = `${promotion}`;
// if (csButton.textContent === "Restart") {
//   csResult4.textContent = `Final score: ${total + 1000}$`;
//   csButtonClick = 1;
//   numberArray = [];
// } else {
//   csResult4.textContent = `${total + 1000}$`;
// }

// if (csButtonClick > 1)
//   createElement("div", {
//     texContent: `${playerName} ${playerClass}`,
//     className: "csResult",
//   });
