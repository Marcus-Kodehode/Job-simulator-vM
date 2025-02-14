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

// Variabler for spillets tilstand:
let csButtonClick = 0; // Teller antall ganger valg-knapper har blitt trykket
let days = 0; // Teller dager
let week = 1; // Teller uker
let month = 1; // Teller måneder
let numberArray = []; // Array for å lagre skade-/gevinstverdier
let multiplier = 0; // Multiplier som justerer skade-/gevinstverdiene
let variable = 0; // (Ubrukt variabel for øyeblikket)
let risk = 10; // Startverdi for risiko
let gameState = ""; // Holder styr på spillets tilstand ("play" eller "end")

// Funksjon for å starte spilleren
function player() {
  gameState = "play"; // Setter spillets tilstand til "play"
  let playerName = csName.value; // Henter brukerens navn fra input
  playerName
    ? (playerName = `Hello ${playerName[0].toUpperCase()}${playerName.slice(1)}! You start out with 50$ from the Goverment`) // Formaterer navnet med stor forbokstav hvis det er skrevet inn
    : (playerName = `Hello! You start out with 10$ from you're friendly Goverment.`); // Standard melding hvis ingen navn er skrevet inn

  let playerClass = csClass.value; // Henter brukerens hobo-type fra input
  playerClass
    ? (playerClass = `I see you are a ${playerClass[0].toUpperCase()}${playerClass.slice(1)}. START HOBO-ING!`) // Formaterer hobo-type hvis den er skrevet inn
    : (playerClass = `You lack a hobo-class...anyway: Live you're life!`); // Standard melding hvis tomt
  console.log(`${playerName} ${playerClass}`); // Skriver ut meldingen i konsollen
  csResult.textContent = `${playerName} ${playerClass}`; // Viser meldingen i csResult-elementet
}

// Eventlistener for start-knappen
csStartButton.addEventListener(
  "click",
  () => {
    workField.style.cssText = "display: flex;"; // Viser arbeidsfeltet
    csStartButton.style.cssText = "display: none;"; // Skjuler start-knappen
    csName.style.cssText = "display: none;"; // Skjuler navn-inputfeltet
    csClass.style.cssText = "display: none;"; // Skjuler hobo-type inputfeltet
    csResult.style.cssText = `padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;`; // Setter styling for csResult
    player(); // Kjører player()-funksjonen for å starte spillet
  }
);

// Eventlistener for restart-knappen
csRestartButton.addEventListener(
  "click",
  () => {
    workField.style.cssText = "display: none;"; // Skjuler arbeidsfeltet
    csResultField.style.cssText = "display: none;"; // Skjuler resultatfeltet
    csStartButton.style.cssText = "display: inline;"; // Viser start-knappen
    csName.style.cssText = "display: inline;"; // Viser navn-inputfeltet
    csClass.style.cssText = "display: inline;"; // Viser hobo-type inputfeltet
    csRestartButton.style.cssText = "display: none;"; // Skjuler restart-knappen
    dateWindow.innerHTML = "Day: 1 <br> Week: 1 <br> Month: 1"; // Tilbakestiller dato-visningen
  }
);

// Eventlistener for eventClose-knappen (lukker event-vinduet)
eventCloseBtn.addEventListener("click", () => {
  eventWindow.style.cssText = "display: none;"; // Skjuler hele event-vinduet
  eventCloseBtn.style.cssText = "display: none;"; // Skjuler lukk-knappen
  eventResult.innerHTML = ""; // Tømmer event-resultatet
});

//todo setTimeOut
// Oppdaterte eventlisteners for de tre valgknappene:

// Beg-knappen – trygt valg med lavere gevinst og lavere risiko
csButton.addEventListener("click", () => {
  multiplier = 0.5; // Lav multiplier gir mindre gevinst
  risk = risk * 0.8; // Reduserer risikoen med 20%
  combatSystem(); // Kjører kampfunksjonen
});

// Walk the streets-knappen – middels risiko og gevinst
csButton2.addEventListener("click", () => {
  multiplier = 1; // Standard multiplier
  // La risikoen være uendret for dette valget
  combatSystem(); // Kjører kampfunksjonen
});

// Crime-knappen – høy risiko med høy gevinst
csButton3.addEventListener("click", () => {
  multiplier = 3; // Høy multiplier gir mye gevinst ved suksess
  risk = risk * 1.5 + 2; // Øker risikoen betydelig
  combatSystem(); // Kjører kampfunksjonen
});

// Hovedfunksjon for kamp-systemet
function combatSystem() {
  csResultField.style.cssText = "display: inline;"; // Viser resultatfeltet

  csButtonClick += 1; // Øker antall klikk
  days += 1; // Øker dagsteller

  console.log("multiplier is: " + multiplier); // Logger multiplier i konsollen
  console.log("risk is: " + risk); // Logger risiko i konsollen

  dateWindow.style.cssText = "display: inline;"; // Viser datovinduet
  dateWindow.innerHTML = `Day: ${days} <br> Week: ${week} <br> Month: ${month}`; // Oppdaterer dato-visningen

  let randomNumber = Math.floor(Math.random() * 100); // Genererer et tilfeldig tall mellom 0 og 99
  let randomNumber2 = Math.floor(Math.random() * 100); // Genererer et annet tilfeldig tall mellom 0 og 99
  let randomNumber3 = Math.floor(Math.random() * 10); // Genererer et tilfeldig tall mellom 0 og 9

  let luckStat = 10; // Setter lykke-statistikk til 10
  let luck = Math.floor(Math.random() * luckStat); // Genererer en tilfeldig lykke-verdi

  console.log("randomNumber is " + randomNumber); // Logger randomNumber
  console.log("randomNumber2 is " + randomNumber2); // Logger randomNumber2
  console.log("luck is:" + luck); // Logger lykke

  let hitOrMiss = ""; // Variabel for å lagre resultatbeskjeden

  // Bruker switch for å bestemme hva som skjer basert på randomNumber:
  switch (true) {
    case randomNumber < 20:
      hitOrMiss = "You completly fucked up man!"; // Ingen suksess, full fiasko
      break;
    case randomNumber < 60:
      hitOrMiss = "You manage to find some valuables in the trash"; // Finner noe verdifullt i søpla
      break;
    case randomNumber < 80:
      hitOrMiss = "Some old lady felt sorry for you!"; // Får hjelp fra en gammel dame
      break;
    case randomNumber < 101:
      hitOrMiss = "You tried to rob a old lady outside a store, she fought you of and called the police, you got caught!"; // Mislykket ran – blir tatt av politiet
      break;
  }

  let dmgNumber = Math.floor(Math.random() * 200); // Genererer en grunnverdi for skade/gevinst
  let dmgResult = ""; // Variabel for å lagre beskjed om skade/gevinst
  let promotion = ""; // Variabel for ekstra melding

  //* Legger til multiplier på dmgNumber:
  dmgNumber = dmgNumber * multiplier; // Justerer skade-/gevinstverdien basert på multiplier
  dmgNumber = dmgNumber * 0.5; // <-- Reduserer beløpet/gevinsten med 50%

  // Bruker switch for å bestemme resultatet basert på hitOrMiss:
  switch (hitOrMiss) {
    case "You completly fucked up man!":
      loseSound.play(); // Spill tap-lyd
      dmgResult = "You got nothing but a bottlecap"; // Setter resultatmelding for tap
      dmgNumber = 0; // Ingen gevinst
      promotion = "The city goverment dont take kind to begging"; // Ekstra melding for tap
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1626301688449-1fa324d15bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);
        display: inline;
      `; // Setter bakgrunnsbilde for denne situasjonen
      break;
    case "You manage to find some valuables in the trash":
      gainSound.play(); // Spill gevinst-lyd
      dmgResult = `You sold it and got ${dmgNumber}$.`; // Setter resultatmelding med gevinstbeløp
      promotion = "You can now afford food today, congratulations!"; // Ekstra positiv melding
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1579227114347-15d08fc37cae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
        display: inline;
      `; // Setter bakgrunnsbilde for søppel-suksess
      break;
    case "Some old lady felt sorry for you!":
      gainSound.play(); // Spill gevinst-lyd
      dmgResult = `She gave you ${dmgNumber * 15}$ for food and shelter!`; // Setter melding med stor gevinst
      dmgNumber = dmgNumber * 15; // Øker gevinstverdien
      promotion = "A liberal couple let's you stay in their shed in the backyard for the night, what a lovely couple!"; // Ekstra melding
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1610375461246-83df859d849d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);  
        display: inline;
      `; // Setter bakgrunnsbilde for denne situasjonen
      break;
    case "You tried to rob a old lady outside a store, she fought you of and called the police, you got caught!":
      gameOverSound.play(); // Spill game over-lyd
      dmgResult = `You lost ${dmgNumber * 4}$ in the court trial. Fucking hell man.`; // Setter melding for tap
      dmgNumber = -dmgNumber * 4; // Regner negativ verdi for tap
      promotion = "You are sent to jail!"; // Ekstra melding for game over
      image.style.cssText = `
        background-image: url(https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80);  
        display: inline;
      `; // Setter bakgrunnsbilde for game over-situasjonen
      break;
  }

  numberArray.push(dmgNumber); // Legger den beregnede verdien til i arrayet
  let total = 50; // Starter total score på 50 (oppdatert)
  for (let dmg of numberArray) { // Løkke for å summere alle verdier i arrayet
    total += dmg; // Legger til hver verdi i totalen
  }

  console.log(numberArray); // Logger arrayet med skade-/gevinstverdier
  console.log(total); // Logger total score

  csResult2.textContent = `${hitOrMiss} ${dmgResult}`; // Viser hovedresultatmelding
  csResult3.textContent = `${promotion}`; // Viser tilleggs-/promomelding
  csResult4.textContent = `${total.toFixed(2)}$`; // Viser total score med to desimaler

  //*/ Sjekker om spilleren får en "lucky break" og ender spillet om nødvendig:
  if (randomNumber2 > risk && randomNumber >= 80) {
    luckyBreakSound.play(); // Spill lucky break-lyd
    csResult3.textContent = "You you got lucky this time. You live to see another day."; // Oppdaterer melding
    csResult4.textContent = `${(total + 50).toFixed(2)}$`; // Øker total score med 50 (oppdatert bonus)
  } else if (randomNumber2 < risk && randomNumber >= 80) {
    gameOverSound.play(); // Spill game over-lyd
    csResult4.textContent = `Final score: ${(total + 50).toFixed(2)}$. You manage to stay alive for ${csButtonClick} days`; // Viser sluttresultatet med oppdatert bonus
    //*/ Tilbakestiller spillet:
    gameState = "end"; // Setter spillets tilstand til "end"
    days = 0; // Nullstiller dager
    week = 1; // Nullstiller uker
    month = 1; // Nullstiller måneder
    csButtonClick = 0; // Nullstiller klikk-teller
    numberArray = []; // Tømmer arrayet med skadeverdier
    risk = 10; // Tilbakestiller risiko
    csRestartButton.style.cssText = "display: inline;"; // Viser restart-knappen
    workField.style.cssText = "display: none;"; // Skjuler arbeidsfeltet
  }

  if (days === 7) { // Hver 7. dag:
    days = 0; // Nullstiller dagsteller
    week += 1; // Øker uke-telleren
  }
  if (week === 4) { // Hver 4. uke:
    week = 1; // Nullstiller uke-telleren
    month += 1; // Øker månedsteller
  }
  console.log("day:" + days); // Logger antall dager
  console.log("week:" + week); // Logger antall uker
  console.log("month:" + month); // Logger antall måneder

  //*/ Viser resultatfeltene når combatSystem kjøres:
  if (csButtonClick > 0) {
    csResult.style.cssText = `padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;`; // Setter styling for csResult
    csResult2.style.cssText = `padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;`; // Setter styling for csResult2
    csResult3.style.cssText = `padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;`; // Setter styling for csResult3
    csResult4.style.cssText = `padding: 10px; border: 1px solid #8ab100; box-shadow: 0 0 20px #c8ff00;`; // Setter styling for csResult4
  }

  //*/ Viser de ekstra knappene når combatSystem kjøres:
  if (csButtonClick > 0) {
    csButton2.style.cssText = "display: block;"; // Viser csButton2
    csButton3.style.cssText = "display: block;"; // Viser csButton3
  }
  moneyCounter.textContent = "$$$"; // Oppdaterer pengetelleren

  //*/ Tømmer csResult-feltet for å fjerne tidligere tekst:
  if (csButtonClick > 0) {
    csResult.textContent = ""; // Fjerner tekst i csResult
    csResult.style.cssText = "padding: 0; border: none; box-shadow: none;"; // Fjerner styling fra csResult
  }

  //*/ Random events:
  const randomEvent1 = () => { // Funksjon for å vise et random event
    eventHeader.innerHTML = `<h1>A police officer appers</h1>
        <p>Becouse of city policy, begging is not allowed in the public</p>
        <p>What will you do?</p>`; // Setter overskrift og tekst for eventet
    eventButton1.style.cssText = "display: inline-block;"; // Viser første valg-knapp i event
    eventButton1.textContent = "Follow the police officer outside of city center"; // Setter tekst for første valg
    eventButton2.style.cssText = "display: inline-block;"; // Viser andre valg-knapp i event
    eventButton2.textContent = "Keep begging"; // Setter tekst for andre valg
  };

  // Funksjon for resultat når spiller velger første alternativ i eventet
  function event1Result1() {
    if (luck < 5) {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>You follow the police officer and lose ${(total * 0.1).toFixed(2)}$</p>`; // Hvis lykken er lav, taper spilleren 10% av totalen
      total -= total * 0.1; // Trekker 10% fra totalen
    } else {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police officer feels sorry for you, and gives you 10$ for food and shelter</p>`; // Hvis lykken er høy, får spilleren 10$
      total += 10; // Legger til 10 i totalen
    }
    eventCloseBtn.style.cssText = "display: inline;"; // Viser knappen for å lukke eventet
    csResult4.textContent = `${total.toFixed(2)}$`; // Oppdaterer total score
    eventButton1.style.cssText = "display: none;"; // Skjuler event-knappen for første valg
    eventButton2.style.cssText = "display: none;"; // Skjuler event-knappen for andre valg
  }

  // Funksjon for resultat når spiller velger andre alternativ i eventet
  function event1Result2() {
    if (luck > 5) {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police officer is nice and lets you keep begging, even giving you ${(total * 0.05).toFixed()}$ for food and shelter!</p>`; // Hvis lykken er høy, får spilleren 5% økning
      total *= 1.05; // Øker totalen med 5%
    } else {
      eventResult.innerHTML = `<h2>Result:</h2>
        <p>The police is angry with you, and gives you an additional fee of 100$ 
        for being homeless AND begging in the city center</p>`; // Hvis lykken er lav, trekkes 100$
      total -= 100; // Trekker 100 fra totalen
    }
    eventCloseBtn.style.cssText = "display: inline;"; // Viser knappen for å lukke eventet
    csResult4.textContent = `${total.toFixed(2)}$`; // Oppdaterer total score
    eventButton1.style.cssText = "display: none;"; // Skjuler event-knappen for første valg
    eventButton2.style.cssText = "display: none;"; // Skjuler event-knappen for andre valg
  }

  // Bestemmer om et random event skal vises
  let randomEventCriteria = randomNumber3 >= 7 && gameState !== "end" && days > 2; // Setter kriterier for visning av event

  if (randomEventCriteria) { // Hvis kriteriene er oppfylt:
    eventWindow.style.cssText = "display: inline;"; // Viser event-vinduet
    randomEvent1(); // Kjør funksjonen som setter opp eventet

    // Fjern tidligere eventListeners ved å klone knappene
    let newEventButton1 = eventButton1.cloneNode(true); // Kloner eventButton1
    eventButton1.parentNode.replaceChild(newEventButton1, eventButton1); // Erstatter originalen med klonen
    eventButton1 = newEventButton1; // Oppdaterer referansen til eventButton1

    let newEventButton2 = eventButton2.cloneNode(true); // Kloner eventButton2
    eventButton2.parentNode.replaceChild(newEventButton2, eventButton2); // Erstatter originalen med klonen
    eventButton2 = newEventButton2; // Oppdaterer referansen til eventButton2

    eventButton1.addEventListener("click", event1Result1); // Legger til eventlistener for første valg
    eventButton2.addEventListener("click", event1Result2); // Legger til eventlistener for andre valg
  }

  //* Weekly event
  if (days === 1 && week > 1)
    console.log(csButtonClick); // Logger antall klikk (her kan du legge til ukentlig event-logikk)
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
