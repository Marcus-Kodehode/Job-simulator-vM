//////////////////////////////////////////////////////////////
// The Hobo-Lator //
//////////////////////////////////////////////////////////////

//*/ Henter elementene for simulatoren:
const csName = document.getElementById("csName"); // Henter inputfelt for navn
const csClass = document.getElementById("csClass"); // Henter inputfelt for hobo-type
const csStartButton = document.getElementById("csStartButton"); // Henter start-knappen
const csRestartButton = document.getElementById("csRestartButton"); // Henter restart-knappen
const workField = document.getElementById("workField"); // Henter containeren for arbeidsfeltet
const csButton = document.getElementById("csButton"); // Henter knappen for "Beg"
const csButton2 = document.getElementById("csButton2"); // Henter knappen for "Walk the streets"
const csButton3 = document.getElementById("csButton3"); // Henter knappen for "Crime"
const csResult = document.getElementById("csResult"); // Henter elementet for hovedresultat
const csResult2 = document.getElementById("csResult2"); // Henter elementet for resultat del 2
const csResult3 = document.getElementById("csResult3"); // Henter elementet for tilleggsinformasjon
const csResult4 = document.getElementById("csResult4"); // Henter elementet for total score
const moneyCounter = document.getElementById("moneyCounter"); // Henter elementet for pengeteller
const csResultField = document.getElementById("csResultField"); // Henter containeren for resultatfeltet
const image = document.getElementById("image_result"); // Henter div'en for bilde-resultatet
const dateWindow = document.getElementById("date_window"); // Henter div'en for datovisning

//*/ Henter elementene fra event-vinduet:
const eventWindow = document.getElementById("random_event"); // Henter hele event-vinduet
const eventCloseBtn = document.getElementById("event_close_btn"); // Henter knappen for å lukke event-vinduet
const eventHeader = document.getElementById("event_header"); // Henter headeren for event-vinduet
let eventButton1 = document.getElementById("event_btn1"); // Henter første valg-knapp i event
let eventButton2 = document.getElementById("event_btn2"); // Henter andre valg-knapp i event
const eventResult = document.getElementById("event_result"); // Henter elementet for å vise event-resultat

//*/ Henter lydene for simulatoren:
const gainSound = new Audio("./sounds/cha-ching.wav"); // Lyd ved gevinst
const loseSound = new Audio("./sounds/aaww.wav"); // Lyd ved tap
const gameOverSound = new Audio("./sounds/game-over.wav"); // Lyd ved game over
const luckyBreakSound = new Audio("./sounds/phew.wav"); // Lyd ved lucky break

//*/ Funksjon for Gang Attack game over screen – kalles ved fatal utgang i Gang Attack-eventen
function gangAttackGameOverScreen(totalScore, daysSurvived) {
  // Sett opp en dedikert game over-skjerm for Gang Attack
  eventHeader.innerHTML = `<h1>Game Over - Gang Attack</h1>
    <p>The vicious gang has overpowered you.</p>`;
  eventResult.innerHTML = `<p>Your journey ends here. Final score: ${totalScore.toFixed(2)}$. You survived for ${daysSurvived} days.</p>`;
  // Sett opp restart-knapp direkte i eventvinduet:
  eventButton1.style.cssText = "display: inline-block;";
  eventButton1.textContent = "Restart";
  eventButton1.addEventListener("click", () => {
    csRestartButton.click();
  });
  eventButton2.style.cssText = "display: none;";
  eventWindow.style.cssText = "display: inline;"; // Vis game over-skjermen
  workField.style.cssText = "display: none;"; // Skjul spillfeltet
  csRestartButton.style.cssText = "display: inline;"; // Vis den globale restart-knappen også
  gameOverSound.play();
  gameState = "end";
}

//-------------------------------------------------------
// Variabler for spillets tilstand:
let csButtonClick = 0; // Teller antall ganger hovedvalg er trykket
let days = 0;         // Teller dager
let week = 1;         // Teller uker
let month = 1;        // Teller måneder
let numberArray = []; // Array for å lagre skade-/gevinstverdier
let multiplier = 0;   // Multiplikator for gevinst/tap
let variable = 0;     // (Ubrukt variabel)
let risk = 10;        // Startverdi for risiko
let gameState = "";   // Spillets tilstand ("play" eller "end")

//-------------------------------------------------------
// Funksjon for å starte spilleren:
function player() {
  gameState = "play"; // Sett spillets tilstand til "play"
  let playerName = csName.value; // Hent spillerens navn
  // Oppdatert melding: Spilleren får nå 50$ ved start
  playerName
    ? (playerName = `Hello ${playerName[0].toUpperCase()}${playerName.slice(1)}! You start out with 50$ from the Goverment`)
    : (playerName = `Hello! You start out with 50$ from you're friendly Goverment.`);
  let playerClass = csClass.value; // Hent spillerens hobo-type
  playerClass
    ? (playerClass = `I see you are a ${playerClass[0].toUpperCase()}${playerClass.slice(1)}. START HOBO-ING!`)
    : (playerClass = `You lack a hobo-class...anyway: Live you're life!`);
  console.log(`${playerName} ${playerClass}`); // Logg velkomstmeldingen
  csResult.textContent = `${playerName} ${playerClass}`; // Vis velkomstmeldingen
}

//-------------------------------------------------------
// Eventlistener for start-knappen:
csStartButton.addEventListener("click", () => {
  workField.style.cssText = "display: flex;"; // Vis spillfeltet
  csStartButton.style.cssText = "display: none;"; // Skjul start-knappen
  csName.style.cssText = "display: none;"; // Skjul navn-inputfeltet
  csClass.style.cssText = "display: none;"; // Skjul hobo-type input
  csResult.style.cssText = "padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;"; // Sett styling
  player(); // Start spilleren
});

//-------------------------------------------------------
// Eventlistener for restart-knappen:
csRestartButton.addEventListener("click", () => {
  workField.style.cssText = "display: none;";
  csResultField.style.cssText = "display: none;";
  csStartButton.style.cssText = "display: inline;";
  csName.style.cssText = "display: inline;";
  csClass.style.cssText = "display: inline;";
  csRestartButton.style.cssText = "display: none;";
  dateWindow.innerHTML = "Day: 1 <br> Week: 1 <br> Month: 1";
});

//-------------------------------------------------------
// Eventlistener for å lukke event-vinduet:
eventCloseBtn.addEventListener("click", () => {
  eventWindow.style.cssText = "display: none;";
  eventCloseBtn.style.cssText = "display: none;";
  eventResult.innerHTML = "";
});

//-------------------------------------------------------
// Hovedvalg for spillet:

// Beg – trygt valg: lav risiko og lav gevinst
csButton.addEventListener("click", () => {
  multiplier = 0.5;
  risk = risk * 0.8; // Reduserer risiko med 20%
  combatSystem();
});
// Walk the streets – middels risiko og gevinst
csButton2.addEventListener("click", () => {
  multiplier = 1;
  combatSystem();
});
// Crime – høy risiko: høy gevinst, men økt risiko
csButton3.addEventListener("click", () => {
  multiplier = 3;
  risk = risk * 1.5 + 2;
  combatSystem();
});

//-------------------------------------------------------
// Hovedfunksjonen for kamp-systemet:
function combatSystem() {
  csResultField.style.cssText = "display: inline;"; // Vis resultatfeltet
  csButtonClick += 1; // Øk antall ganger hovedvalg er trykket
  days += 1; // Øk dagsteller

  console.log("multiplier is: " + multiplier);
  console.log("risk is: " + risk);

  dateWindow.style.cssText = "display: inline;";
  dateWindow.innerHTML = `Day: ${days} <br> Week: ${week} <br> Month: ${month}`;

  // Generer tilfeldige tall for utfall:
  let randomNumber = Math.floor(Math.random() * 100); // Brukes for å bestemme hit/miss
  let randomNumber2 = Math.floor(Math.random() * 100); // Brukes for lucky break/game over
  let eventRollBase = Math.floor(Math.random() * 10); // Bestemmer hvilket event som utløses

  let luckStat = 10;
  let luck = Math.floor(Math.random() * luckStat);
  
  console.log("randomNumber is " + randomNumber);
  console.log("randomNumber2 is " + randomNumber2);
  console.log("luck is:" + luck);

  let hitOrMiss = "";
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

  let dmgNumber = Math.floor(Math.random() * 200); // Grunnverdi for gevinst/tap
  let dmgResult = "";
  let promotion = "";

  // Beregn gevinst/tap med multiplier og reduser med 50%
  dmgNumber = dmgNumber * multiplier;
  dmgNumber = dmgNumber * 0.5;

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
      promotion = "A liberal couple let's you stay in their shed in the backyard for the night, what a lovely couple!";
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
  let total = 50; // Starter total score på 50
  for (let dmg of numberArray) {
    total += dmg;
  }

  console.log(numberArray);
  console.log(total);

  csResult2.textContent = `${hitOrMiss} ${dmgResult}`;
  csResult3.textContent = `${promotion}`;
  csResult4.textContent = `${total.toFixed(2)}$`;

  // Lucky break / game over sjekk:
  if (randomNumber2 > risk && randomNumber >= 80) {
    luckyBreakSound.play();
    csResult3.textContent = "You you got lucky this time. You live to see another day.";
    csResult4.textContent = `${(total + 50).toFixed(2)}$`;
  } else if (randomNumber2 < risk && randomNumber >= 80) {
    gameOverSound.play();
    csResult4.textContent = `Final score: ${(total + 50).toFixed(2)}$. You manage to stay alive for ${csButtonClick} days`;
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

  csResult.style.cssText = "padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;";
  csResult2.style.cssText = "padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;";
  csResult3.style.cssText = "padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;";
  csResult4.style.cssText = "padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;";

  csButton2.style.cssText = "display: block;";
  csButton3.style.cssText = "display: block;";
  moneyCounter.textContent = "$$$";
  csResult.textContent = "";
  csResult.style.cssText = "padding: 0; border: none; box-shadow: none;";

  //------------------------------------------------------
  // RANDOM EVENTS: Kun ett event per runde med lav sjanse.
  // Vi gir en ekstra 30% sjanse før vi bestemmer om et event skal utløses.
  if (gameState !== "end" && days > 2 && Math.random() < 0.3) {
    let eventRoll = Math.floor(Math.random() * 10); // Verdi 0-9 for å bestemme event

    if (eventRoll === 0) {
      // VENNLIG HUND EVENT
      eventHeader.innerHTML = `<h1>A friendly dog approaches!</h1>
          <p>You notice a stray dog wagging its tail, looking hopeful and friendly.</p>
          <p>What do you do?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Feed the dog";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Ignore the dog";

      function eventDogResult1() {
        if (luck < 5) {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>You feed the dog, but it eats hungrily and then runs off. You lose $5.</p>`;
          total -= 5;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>You feed the dog, and it stays by your side, calming you down. Your risk is reduced!</p>`;
          risk *= 0.9;
        }
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventDogResult2() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>You ignore the dog, and it wanders away. Nothing changes.</p>`;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventDogResult1);
      eventButton2.addEventListener("click", eventDogResult2);
      eventWindow.style.cssText = "display: inline;";
    } else if (eventRoll === 1) {
      // VELDEDIGHETSBESØK EVENT – OPPDATERET
      eventHeader.innerHTML = `<h1>A charity volunteer stops by!</h1>
          <p>A kind volunteer offers you a donation to help you out.</p>
          <p>Do you accept the donation or try to rob the volunteer?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Accept donation";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Rob the volunteer";
      
      function eventCharityResult1() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>You accept the donation and receive an extra $5!</p>`;
        total += 5;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventCharityResult2() {
        if (luck < 4) {
          // Mislykket røveriforsøk – game over med restart-knapp i eventvinduet
          eventResult.innerHTML = `<h2>Result:</h2>
          <p>You attempt to rob the volunteer, but get caught – the police arrive immediately. Game Over!</p>
          <p>Click Restart to try again.</p>`;
          gameOverSound.play();
          gameState = "end";
          csResult4.textContent = `Final score: ${total.toFixed(2)}$. You survived for ${csButtonClick} days.`;
          // Bruk eventButton1 som restart-knapp i eventvinduet
          eventButton1.style.cssText = "display: inline-block;";
          eventButton1.textContent = "Restart";
          eventButton1.addEventListener("click", () => {
            csRestartButton.click();
          });
          eventButton2.style.cssText = "display: none;";
          return;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
          <p>You successfully rob the volunteer and gain an extra $10!</p>`;
          total += 10;
          eventCloseBtn.style.cssText = "display: inline;";
          csResult4.textContent = `${total.toFixed(2)}$`;
        }
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventCharityResult1);
      eventButton2.addEventListener("click", eventCharityResult2);
      eventWindow.style.cssText = "display: inline;";
    } else if (eventRoll === 2) {
      // COLD NIGHT, NO SHELTER EVENT
      eventHeader.innerHTML = `<h1>A bitter cold night descends!</h1>
          <p>You find yourself exposed to a freezing night without shelter.</p>
          <p>What do you do?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Pay for emergency shelter (-$5)";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Brave the cold (-$10)";
      
      function eventColdNightResult1() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>You pay for a cheap shelter and lose $5, but you stay safe.</p>`;
        total -= 5;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventColdNightResult2() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>You decide to brave the cold. The harsh weather takes its toll, and you lose $10.</p>`;
        total -= 10;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventColdNightResult1);
      eventButton2.addEventListener("click", eventColdNightResult2);
      eventWindow.style.cssText = "display: inline;";
    } else if (eventRoll === 3) {
      // CON ARTIST EVENT
      eventHeader.innerHTML = `<h1>A slick con artist approaches!</h1>
          <p>A persuasive scammer tells you about a miracle cure that requires a small investment.</p>
          <p>What do you do?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Invest in the cure (-$10)";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Politely decline (-$3)";
      
      function eventConArtistResult1() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>The con artist swindles you out of $10. You lose your money!</p>`;
        total -= 10;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventConArtistResult2() {
        eventResult.innerHTML = `<h2>Result:</h2>
          <p>You politely decline, but the con artist insults you and you lose $3.</p>`;
        total -= 3;
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventConArtistResult1);
      eventButton2.addEventListener("click", eventConArtistResult2);
      eventWindow.style.cssText = "display: inline;";
    } else if (eventRoll === 4) {
      // POLICE OFFICER EVENT (original)
      eventHeader.innerHTML = `<h1>A police officer appears!</h1>
          <p>Because of city policy, begging is not allowed in public.</p>
          <p>What will you do?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Follow the officer outside the city center";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Keep begging";
      
      function eventPoliceResult1() {
        if (luck < 5) {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>You follow the officer and lose ${(total * 0.1).toFixed(2)}$</p>`;
          total -= total * 0.1;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>The officer feels sorry for you and gives you $10 for food and shelter</p>`;
          total += 10;
        }
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventPoliceResult2() {
        if (luck > 5) {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>The officer is lenient and gives you ${(total * 0.05).toFixed()}$ for food and shelter!</p>`;
          total *= 1.05;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>The police are angry and fine you $100 for begging in public.</p>`;
          total -= 100;
        }
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventPoliceResult1);
      eventButton2.addEventListener("click", eventPoliceResult2);
      eventWindow.style.cssText = "display: inline;";
    } else if (eventRoll === 9) {
      // GANG ATTACK EVENT – sjeldent med mulighet for umiddelbar game over
      eventHeader.innerHTML = `<h1>A gang attack strikes!</h1>
          <p>A hostile gang suddenly surrounds you on the street.</p>
          <p>What will you do?</p>`;
      eventButton1.style.cssText = "display: inline-block;";
      eventButton1.textContent = "Try to run away";
      eventButton2.style.cssText = "display: inline-block;";
      eventButton2.textContent = "Stand your ground";
      
      function eventGangAttackResult1() {
        if (luck < 4) {
          // Fatal utgang – kall game over-skjermfunksjonen og returner umiddelbart
          gangAttackGameOverScreen(total, csButtonClick);
          return;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>You manage to run away, but in the chaos you lose $15.</p>`;
          total -= 15;
        }
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      function eventGangAttackResult2() {
        if (luck < 6) {
          gangAttackGameOverScreen(total, csButtonClick);
          return;
        } else {
          eventResult.innerHTML = `<h2>Result:</h2>
            <p>You fight back and fend off the attackers, but suffer injuries that cost you $10.</p>`;
          total -= 10;
        }
        eventCloseBtn.style.cssText = "display: inline;";
        csResult4.textContent = `${total.toFixed(2)}$`;
        eventButton1.style.cssText = "display: none;";
        eventButton2.style.cssText = "display: none;";
      }
      let newEB1 = eventButton1.cloneNode(true);
      eventButton1.parentNode.replaceChild(newEB1, eventButton1);
      eventButton1 = newEB1;
      let newEB2 = eventButton2.cloneNode(true);
      eventButton2.parentNode.replaceChild(newEB2, eventButton2);
      eventButton2 = newEB2;
      eventButton1.addEventListener("click", eventGangAttackResult1);
      eventButton2.addEventListener("click", eventGangAttackResult2);
      eventWindow.style.cssText = "display: inline;";
    }
  }
}

/*
-----------------------------------------------------------
Sammendrag av løsningen:

1. **Initialisering og oppsett:**  
   - Alle nødvendige HTML-elementer hentes med getElementById.
   - Variabler (days, risk, multiplier, numberArray, gameState, osv.) initialiseres.
   - Spilleren får nå 50$ ved start (oppdatert melding i player()).

2. **Spilleroppsett og hovedvalg:**  
   - Start- og restart-knapper styrer visning av elementer og tilbakestiller spillet.
   - Tre hovedvalg ("Beg", "Walk the streets" og "Crime") har ulike multiplikatorer og risikojusteringer, som kalles i combatSystem().

3. **Kamp-logikk i combatSystem():**  
   - Oppdaterer dagsteller, genererer tilfeldige tall for utfall (hit/miss, lucky break) og beregner gevinst/tap med en 50% reduksjon.
   - Total score oppdateres med startverdi 50$, og en bonus på 50 gis ved lucky break.
   - Resultatene vises i de ulike resultatfeltene.

4. **Random events:**  
   - Med en ekstra 30% sjanse utløses et random event (basert på et tall 0–9) med følgende utfall:  
     • **0:** Vennlig hund – spilleren kan velge å mate hunden (som enten reduserer risiko eller koster $5) eller ignorere den.  
     • **1:** Veldedighetsbesøk – *Oppdatert:* Spilleren kan nå velge mellom å akseptere donasjonen (+$5 bonus) eller prøve å rane veldedighetsarbeideren. Ved røveriforsøket, hvis spilleren mislykkes (luck < 4), vises en game over-melding med en restart-knapp direkte i eventvinduet. Ellers får spilleren +$10.  
     • **2:** Cold Night – spilleren velger mellom å betale for nødly (–$5) eller å brave kulden (–$10).  
     • **3:** Con Artist – spilleren kan investere i en svindel (–$10) eller avslå (–$3).  
     • **4:** Politimanns-eventen – et originalt event med to valg som justerer score basert på lykke.  
     • **9:** Gang Attack – et sjeldent event med mulighet for umiddelbar game over hvis lykken er for lav (luck < 4 for å løpe, luck < 6 for å stå imot). Dersom fatal utgang inntreffer, kalles gangAttackGameOverScreen() som nå viser en dedikert game over-skjerm med en restart-knapp.
   - For alle eventene klones knappene før nye eventListeners legges til, for å unngå opphopning av lyttere.

-----------------------------------------------------------
*/



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
