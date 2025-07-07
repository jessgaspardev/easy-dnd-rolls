// selectors

const plusButton = document.getElementById("plus-button");
const modifier = document.querySelector(".modifier-counter");
const minusButton = document.getElementById("minus-button");

const adRollingResultInfo = document.querySelector(".roll-adv-or-dis-info");

const rollingButton = document.querySelector(".rolling-button");
const rollingResult = document.querySelector(".roll-result-text");
const rollingResultDiv = document.querySelector(".roll-result");
const rollingResultInfo = document.querySelector(".roll-result-info");

const clearLogButton = document.querySelector(".clear-log-button");
const rollingLogResults = document.querySelector(".rolling-log-results");


// incrementing and decrementing the modifier number

let modCounter = 0;
function updateModifier(){
  if (modCounter >= 0){
  modifier.textContent = `+ ${modCounter}`;
} else {
  modifier.textContent = `- ${Math.abs(modCounter)}`;
}
}

plusButton.addEventListener("click", function() {
  modCounter++;
  updateModifier();
});

minusButton.addEventListener("click", function() {
  modCounter--;
  updateModifier();
})


// clear the log 

clearLogButton.addEventListener("click", function() {

  // Remove all <li> elements from the log results <ul>
  while (rollingLogResults.firstChild) {
    rollingLogResults.removeChild(rollingLogResults.firstChild);
  }
})



// rolling the dice

rollingButton.addEventListener("click", function(){
  //function selectors
  const advantageSelected = document.querySelector(
    'input[id="advantage"]:checked'
  );
  const disadvantageSelected = document.querySelector(
    'input[id="disadvantage"]:checked'
  );

  const diceChecked = document.querySelector(
    'input[name="dice"]:checked'
  ).value;

  // Define a function to add a new log item to the dice log results
  const addLogItem = (text) => {
    const diceImg = document.createElement("img");
    diceImg.src = `/imgs/d${diceChecked}.png`;
    diceImg.alt = "Dice";
    rollingLogResults.appendChild(diceImg);
    const li = document.createElement("li");
    li.textContent = text;
    rollingLogResults.appendChild(li);
  };

  //randomize rolls and store them in variables
  const normalRoll = Math.floor(Math.random() * diceChecked) + 1;
  const firstRoll = Math.floor(Math.random() * diceChecked) + 1;
  const secondRoll = Math.floor(Math.random() * diceChecked) + 1;
  const advantageRoll = Math.max(firstRoll, secondRoll);
  const disadvantageRoll = Math.min(firstRoll, secondRoll);
  let finalRoll;

  //DOM functions
  const advOrDisInfo = () =>
    (adRollingResultInfo.textContent = `First Roll: ${firstRoll} | Second Roll: ${secondRoll}`);
  const clearAdvOrDisInfo = () => (adRollingResultInfo.textContent = "");
  const criticalFailure = () => (rollingResult.textContent = `Natural 1 💩`);
  const criticalSuccess = () => (rollingResult.textContent = `Natural 20 🔥`);
  const clearRollingResult = () => (rollingResult.textContent = "");

  //display error message if both advantage and disadvantage are selected
  if (advantageSelected && disadvantageSelected) {
    rollingResultInfo.textContent =
      "Can't roll with both advantage and disadvantage selected! Deselect one or both.";
    clearAdvOrDisInfo();
    clearRollingResult();

    // roll with advantage
  } else if (advantageSelected && diceChecked === "20") {
    finalRoll = advantageRoll + modCounter;
    rollingResult.textContent = `${finalRoll} (Adv.)`;
    rollingResultInfo.textContent = `Dice Roll: ${advantageRoll} + Modifier: ${modCounter} = ${finalRoll}`;
    addLogItem(rollingResultInfo.textContent);
    advOrDisInfo();

    //display critical failure and success results
    if (advantageRoll === 1 && diceChecked === "20") {
      criticalFailure();
    } else if (advantageRoll === 20 && diceChecked === "20") {
      criticalSuccess();
    }

    //roll with disadvantage
  } else if (disadvantageSelected && diceChecked === "20") {
    finalRoll = disadvantageRoll + modCounter;
    rollingResult.textContent = `${finalRoll} (Dis.)`;
    rollingResultInfo.textContent = `Dice Roll: ${disadvantageRoll} + Modifier: ${modCounter} = ${finalRoll}`;
    addLogItem(rollingResultInfo.textContent);
    advOrDisInfo();

    //display critical failure and success results
    if (disadvantageRoll === 1 && diceChecked === "20") {
      criticalFailure();
    } else if (disadvantageRoll === 20 && diceChecked === "20") {
      criticalSuccess();
    }

    //normal roll
  } else {
    finalRoll = normalRoll + modCounter;
    rollingResultInfo.textContent = `Dice Roll: ${normalRoll} + Modifier: ${modCounter} = ${finalRoll}`;
    addLogItem(rollingResultInfo.textContent);
    clearAdvOrDisInfo();
    rollingResult.textContent = `${finalRoll}`;
    //display critical failure and success results
    if (normalRoll === 1 && diceChecked === "20") {
      criticalFailure();
    } else if (normalRoll === 20 && diceChecked === "20") {
      criticalSuccess();
    }
  }

  modCounter = 0;
  updateModifier();
})