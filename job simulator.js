//////////////////////////////////////////////////////////////*/
/ Job simulator /;
//////////////////////////////////////////////////////////////*/

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
const eventButtons = document.getElementById("event_btn");
const eventButton1 = document.getElementById("event_btn1");
const eventButton2 = document.getElementById("event_btn2");
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
      )}! You start out with 1000$ on your coding career`)
    : (playerName = `Hello! You start out with 1000$ on your coding career.`);

  let playerClass = csClass.value;
  playerClass
    ? (playerClass = `I see you are a ${playerClass[0].toUpperCase()}${playerClass.slice(
        1
      )}. START CODING!`)
    : (playerClass = `You lack a developer-class...anyway: Code away!`);
  console.log(`${playerName} ${playerClass}`);
  csResult.textContent = `${playerName} ${playerClass}`;
}

csStartButton.addEventListener(
  "click",
  () => (
    ((workField.style.cssText = `
  display: flex;`),
    (csStartButton.style.cssText = `
  display: none;`),
    (csName.style.cssText = `
  display: none;`),
    (csClass.style.cssText = `
  display: none;`),
    (csResult.style.cssText = `
  padding: 10px;
  border: 1px solid #8ab100;
  box-shadow: 0 0 20px #c8ff00;`)),
    player()
  )
);

csRestartButton.addEventListener(
  "click",
  () => (
    (workField.style.cssText = `
  display: none;`),
    (csResultField.style.cssText = `
  display: none;`),
    (csStartButton.style.cssText = `
  display: inline;`),
    (csName.style.cssText = `
  display: inline;`),
    (csClass.style.cssText = `
  display: inline;`),
    (csRestartButton.style.cssText = `
    display: none`),
    (dateWindow.innerHTML = `Day: 1 <br> Week: 1 <br> Month: 1`)
  )
);

eventCloseBtn.addEventListener(
  "click",
  () =>
    (eventWindow.style.cssText = `
  display: none;`)
);

//todo setTimeOut
csButton.addEventListener(
  "click",
  () => (((multiplier = 0.75), (risk = risk * 0.9)), combatSystem())
);
csButton2.addEventListener(
  "click",
  () => (((multiplier = 1), (risk = risk * 1 - 0.5)), combatSystem())
);
csButton3.addEventListener(
  "click",
  () => (((multiplier = 2), (risk = risk * 1.2 + 1)), combatSystem())
);

function combatSystem() {
  csResultField.style.cssText = `
  display: inline;`;

  csButtonClick += 1;
  days += 1;

  console.log("multiplier is: " + multiplier);
  console.log("risk is: " + risk);

  dateWindow.style.cssText = `
  display: inline;`;
  dateWindow.innerHTML = `Day: ${days} <br> Week: ${week} <br> Month: ${month}  `;

  let randomNumber = Math.floor(Math.random() * 100);
  let randomNumber2 = Math.floor(Math.random() * 100);
  let randomNumber3 = Math.floor(Math.random() * 10);

  let luckStat = 10;
  let luck = Math.floor(Math.random() * luckStat);

  console.log("randomNumber is " + randomNumber);
  console.log("randomNumber2 is " + randomNumber2);
  console.log("luck is:" + luck);

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

  // console.log("hitOrMiss is: " + hitOrMiss);

  let dmgNumber = Math.floor(Math.random() * 200);
  let dmgResult = "";
  let promotion = "";

  //* add multiplier to dmgNumber
  dmgNumber = dmgNumber * multiplier;

  switch (hitOrMiss) {
    case "You completly fucked up the code.":
      loseSound.play();
      dmgResult = "You didnt earn any money....";
      dmgNumber = 0;
      promotion = "Your client didnt like you wasting his time!";
      // csButton.textContent = "Try again";
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
      // csButton.textContent = "Keep working";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
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
      // csButton.textContent = "Continue coding!";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
      display: inline;`;
      break;
    case "You `accidently` stole some code from a well known company and got caught!":
      dmgResult = `You lost ${
        dmgNumber * 4
      }$ in the copyright trial. Fucking hell man.`;
      dmgNumber = -dmgNumber * 4;
      promotion =
        "Your career as a coder is ended. Nobody wants to ever work with you again.";
      image.style.cssText = `
      background-image: url(https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);  
      display: inline;`;
  }

  numberArray.push(dmgNumber);
  let total = 1000;
  for (dmgNumber of numberArray) {
    total += dmgNumber;
  }

  console.log(numberArray);
  console.log(total);

  csResult2.textContent = `${hitOrMiss} ${dmgResult}`;
  csResult3.textContent = `${promotion}`;
  csResult4.textContent = `${total.toFixed(2)}$`;

  //*/ checks if the player get a lucky break or not. Ends the game if not:
  if (randomNumber2 > risk && randomNumber >= 80) {
    luckyBreakSound.play();
    csResult3.textContent =
      "You you got lucky this time. You live to code another day.";
    csResult4.textContent = `${total + 1000}$`;
  } else if (randomNumber2 < risk && randomNumber >= 80) {
    // csButton.textContent = "Restart";
    gameOverSound.play();
    csResult4.textContent = `Final score: ${
      total + 1000
    }$. You managed to keep your job for ${csButtonClick} days`;
    //*/ resets the game:
    gameState = "end";
    days = 0;
    week = 1;
    month = 1;
    csButtonClick = 0;
    numberArray = [];
    risk = 10;
    csRestartButton.style.cssText = `
    display: inline;`;
    workField.style.cssText = `
    display: none;`;
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

  //*/ Gives the result fields visability when combatsystem is initiated. (Should find a way to append the elements instead?)
  if (csButtonClick > 0) {
    csResult.style.cssText = `
  padding: 10px;
  border: 1px solid #8ab100;
  box-shadow: 0 0 20px #c8ff00;`;
    csResult2.style.cssText = `
  padding: 10px;
  border: 1px solid #8ab100;
  box-shadow: 0 0 20px #c8ff00;`;
    csResult3.style.cssText = `
  padding: 10px;
  border: 1px solid #8ab100;
  box-shadow: 0 0 20px #c8ff00;`;
    csResult4.style.cssText = `
  padding: 10px;
  border: 1px solid #8ab100;
  box-shadow: 0 0 20px #c8ff00;`;
    //   moneyCounter.style.cssText = `
    // padding: 10px;
    // border: 1px solid #8ab100;
    // box-shadow: 0 0 20px #c8ff00;`;
  }

  //*/ Gives the buttons visability when combatsystem is initiated. (Should find a way to append the elements instead?)
  if (csButtonClick > 0) {
    csButton2.style.cssText = `
  display: block`;
    csButton3.style.cssText = `
  display: block`;
  }
  moneyCounter.textContent = "$$$";

  //*/ Fills the result fields with text when combatsystem is initiated. (Should find a way to append the elements instead?)
  if (csButtonClick > 0) {
    csResult.textContent = "";
    csResult.style.cssText = `
    padding: 0;
    border: none;
    box-shadow: none`;
  }

  //*/ random events. Working, but not complete:

  const randomEvent1 = () => {
    eventHeader.innerHTML = `<h1>A wild IRS-man appeared</h1>
        <p>Because of some mumbo jumbo you have to pay extra 
        tax for your work...</p>
        <p>What will you do?</p>`;
    eventButton1.style.cssText = `
    display: inline-block`;
    eventButton1.textContent = "Pay the man 10% of your total $";
    eventButton2.style.cssText = `
    display: inline-block`;
    eventButton2.textContent = "Do a backflip";
  };

  function event1Result1() {
    {
      luck < 5
        ? ((eventResult.innerHTML = `<h2>Result:</h2>
   <p>You pay the IRS ${(total * 0.1).toFixed(2)}$</p>`),
          (total -= total * 0.1))
        : ((eventResult.innerHTML = `<h2>Result:</h2>
   <p>After checking his books the IRS man discoveres he did a
   mistake and instead gives you 50$ for the trouble</p>
   `),
          (total += 50));
    }
    eventCloseBtn.style.cssText = `
    display: inline;`;
    csResult4.textContent = `${total.toFixed(2)}$`;
    (eventButton1.style.cssText = `
    display: none`),
      (eventButton2.style.cssText = `
    display: none`);
  }

  function event1Result2() {
    {
      luck > 5
        ? ((eventResult.innerHTML = `<h2>Result:</h2>
   <p>The man is so impressed by you he pays you ${(
     total * 0.05
   ).toFixed()}$ for the performance!</p>`),
          (total *= 1.05))
        : ((eventResult.innerHTML = `<h2>Result:</h2>
   <p>The IRS man is confused, forgets about the tax and instead
  issues you an additional fee of 100$ 
   for wasting his time </p>
   `),
          (total -= 100));
    }
    eventCloseBtn.style.cssText = `
    display: inline;`;
    csResult4.textContent = `${total.toFixed(2)}$`;
    (eventButton1.style.cssText = `
    display: none`),
      (eventButton2.style.cssText = `
    display: none`);
  }
  // const showEventCloseBtn = () =>
  //   (eventCloseBtn.style.cssText = `
  //   display: inline;`);

  randomEventCriteria = randomNumber3 >= 7 && gameState !== "end" && days > 2;

  if (randomEventCriteria) {
    eventWindow.style.cssText = `
    display: inline;`;
    randomEvent1();
    eventButton1.addEventListener("click", () => event1Result1());
    eventButton2.addEventListener("click", () => event1Result2());
    eventCloseBtn.addEventListener(
      "click",
      () =>
        (eventCloseBtn.style.cssText = `
    display: none;`),
      (eventResult.innerHTML = "")
    );
  }

  //* Weekly event
  if ((days = 1 && week > 1))
    //  dateWindow.innerHTML = `Day: 1 <br> Week: 1 <br> Month: 1`;

    // const eventWindow = document.getElementById("random_event");
    // const eventCloseBtn = document.getElementById("event_close_btn");
    // const eventHeader = document.getElementById("event_header");
    // const eventButton1 = document.getElementById("event_btn1");
    // const eventButton2 = document.getElementById("event_btn2");
    // const eventResult = document.getElementById("event_result");

    console.log(csButtonClick);

  //* end of combatsystem code
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
