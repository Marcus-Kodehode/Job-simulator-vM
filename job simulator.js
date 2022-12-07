//////////////////////////////////////////////////////////////*/
/ Job simulator /;
//////////////////////////////////////////////////////////////*/

const csName = document.getElementById("csName");
const csClass = document.getElementById("csClass");
const csButton = document.getElementById("csButton");
const csResult = document.getElementById("csResult");
const csResult2 = document.getElementById("csResult2");
const csResult3 = document.getElementById("csResult3");
const csResult4 = document.getElementById("csResult4");
const moneyCounter = document.getElementById("moneyCounter");
const csResultField = document.getElementById("csResultField");
const image = document.getElementById("image_result");
// const csResultOutput = document.querySelectorAll("csResultField p");

csButton.addEventListener("click", combatSystem);

let csButtonClick = 0;
let numberArray = [];

// image.style.backgroundImage = `https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80;
//     `;

function combatSystem() {
  csButtonClick += 1;
  // image.style.cssText = `
  // display: inline;
  // `;

  // function playGainSound() {
  //   const gainSound = new Audio(
  //     'https://cdn.freesound.org/previews/351/351304_96253-lq.mp3 title="mp3 file'
  //   );
  //   gainSound.playGainSound();
  // }

  const gainSound = new Audio("/Job simulator/sounds/cha-ching.wav");
  const loseSound = new Audio("/Job simulator/sounds/aaww.wav");
  const gameOverSound = new Audio("/Job simulator/sounds/game-over.wav");
  const luckyBreakSound = new Audio("/Job simulator/sounds/phew.wav");

  let playerName = csName.value;
  playerName
    ? (playerName = `Hello ${playerName[0].toUpperCase()}${playerName.slice(
        1
      )}! You start out with 1000$ on your coding career`)
    : (playerName = `Hello! You start out with 1000$ on your coding career.`);

  let playerClass = csClass.value;
  playerClass
    ? (playerClass = `I see you are a ${playerClass[0].toUpperCase()}${playerClass.slice(
        1
      )}. START CODING!`)
    : (playerClass = `You lack a developer-class...anyway: Code away!`);

  let randomNumber = Math.floor(Math.random() * 100);
  let randomNumber2 = Math.floor(Math.random() * 3);

  console.log("randomNumber2 is " + randomNumber2);

  let hitOrMiss = "";

  switch (true) {
    case randomNumber < 20:
      hitOrMiss = "You completly fucked up the code.";
      break;
    case randomNumber < 60:
      hitOrMiss = "You managed to finish an average code.";
      break;
    case randomNumber < 80:
      hitOrMiss = "You coded some next level shit!";
      break;
    case randomNumber < 101:
      hitOrMiss =
        "You `accidently` stole some code from a well known company and got caught!";
      break;
  }

  console.log(randomNumber);
  console.log(hitOrMiss);

  let dmgNumber = Math.floor(Math.random() * 200);
  let dmgResult = "";
  let promotion = "";

  switch (hitOrMiss) {
    case "You completly fucked up the code.":
      loseSound.play();
      dmgResult = "You didnt earn any money....";
      dmgNumber = 0;
      promotion = "Your client didnt like you wasting his time!";
      csButton.textContent = "Try again";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
      display: inline;`;
      // image.style.backgroundImage = `url(https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
      // `;
      break;
    case "You managed to finish an average code.":
      gainSound.play();
      dmgResult = `You sold it and got ${dmgNumber}$.`;
      dmgNumber = dmgNumber;
      promotion = "Your client is satisfied with your work. Good job!";
      csButton.textContent = "Keep working";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1629721671030-a83edbb11211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80);  
      display: inline;`;
      break;
    case "You coded some next level shit!":
      dmgResult = `You got an amazing deal for you code and got ${
        dmgNumber * 15
      }$ for it!`;
      gainSound.play();
      dmgNumber = dmgNumber * 15;
      promotion =
        "Your client is ecstatic over your amazing work. He is recommending you for an multi-million dollar company!";
      csButton.textContent = "Continue coding!";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
      display: inline;`;
      break;
    case "You `accidently` stole some code from a well known company and got caught!":
      dmgResult = `You lost ${
        dmgNumber * 4
      }$ in the copyright trial. Fucking hell man`;
      dmgNumber = -dmgNumber * 4;
      promotion =
        "Your career as a coder is ended. Nobody wants to ever work with you again.";
      csButton.textContent = "Restart";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);  
      display: inline;`;
  }

  numberArray.push(dmgNumber);
  let total = 0;
  for (dmgNumber of numberArray) {
    total += dmgNumber;
  }

  console.log(numberArray);
  console.log(1000 + total);

  //*/ Gives the result fields visability when combatsystem is initiated. (Should find a way to append the elements instead?)
  if (csButtonClick > 0) {
    csResult.style.cssText = `
  padding: 10px;
  border: 1px solid #9bb6ff;
  box-shadow: 0 0 20px #9bb6ff;`;
    csResult2.style.cssText = `
    padding: 10px;
    border: 1px solid #9bb6ff;
    box-shadow: 0 0 20px #9bb6ff;`;
    csResult3.style.cssText = `
    padding: 10px;
    border: 1px solid #9bb6ff;
    box-shadow: 0 0 20px #9bb6ff;`;
    csResult4.style.cssText = `
    padding: 10px;
    border: 1px solid #9bb6ff;
    box-shadow: 0 0 20px #9bb6ff;`;
    moneyCounter.style.cssText = `
    padding: 10px;
    border: 1px solid #9bb6ff;
    box-shadow: 0 0 20px #9bb6ff;`;
  }

  moneyCounter.textContent = "$$$";

  //*/ Fills the result fields with text when combatsystem is initiated. (Should find a way to append the elements instead?)
  csResult.textContent = `${playerName} ${playerClass}`;
  if (csButtonClick > 2) {
    csResult.textContent = "";
    csResult.style.cssText = `
    padding: 0;
    border: none;
    box-shadow: none`;
  }
  csResult2.textContent = `${hitOrMiss} ${dmgResult}`;
  csResult3.textContent = `${promotion}`;

  //*/ checks if the player get a lucky break or not:
  if (randomNumber2 > 0 && randomNumber >= 80) {
    luckyBreakSound.play();
    csResult3.textContent =
      "You you got lucky this time. You live to code another day.";
    csResult4.textContent = `${total + 1000}$`;
  } else if (csButton.textContent === "Restart") {
    gameOverSound.play();
    csResult4.textContent = `Final score: ${total + 1000}$`;
    csButtonClick = 1;
    numberArray = [];
  } else {
    csResult4.textContent = `${total + 1000}$`;
  }

  console.log(csButtonClick);
  // console.log("csResultOutput is" + [csResultOutput]);
}

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

//////////////////////////////////////////////////////////////*/
/ Sum of digits (not completed) /;
//////////////////////////////////////////////////////////////*/

// const inputDigits = document.getElementById("inputDigits");
// const digitsButton = document.getElementById("digitsButton");
// const digitsResult = document.getElementById("digitsResult");

// digitsButton.addEventListener("click", sumOfDigits);

// function sumOfDigits() {
//   let i = 0;
//   i < inputDigits.length;
//   i++;
// if (inputDigits.value % 2) {
//   digitsResult.textContent = `${inputDigits.value} is an odd number`;
// } else {
//   digitsResult.textContent = `${inputDigits.value} is an even number`;
// }

//! What to do next: object in this function above. pick out from Arrays. API (information you get from the internet (fetch from server)) */
// }
