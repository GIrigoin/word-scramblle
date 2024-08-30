let word = "";
let scrambledWord = "";
let tries = 0;
let mistakes = [];
let currentInputIndex = 0;
const MAX_TRIES = 5;

const scrambleWord = () => {
  let copyOfWord = word.split("");
  let scrambled = [];
  while (copyOfWord.length > 0) {
    let position = Math.floor(copyOfWord.length * Math.random());
    let letter = copyOfWord.splice(position, 1)[0];
    scrambled.push(letter);
  }
  scrambledWord = scrambled.join("");
};

const generateNewWord = async () => {
  const URL = "https://random-word-api.herokuapp.com/word?length=";
  try {
    const wordLength = 4 + Math.floor(4 * Math.random());
    const response = await fetch(`${URL}${wordLength}`);
    const data = await response.json();
    word = data[0];
    scrambleWord();
  } catch (error) {
    alert("Oops, something failed");
  }
};

const drawNewTry = () => {
  const inputsContainer =
    document.getElementsByClassName("inputs-container")[0];
  inputsContainer.replaceChildren();
  const letters = word.split("");

  letters.forEach((letter, index) => {
    const newInput = document.createElement("p");
    newInput.className = "inputs";
    if (index === 0) {
      newInput.className = "inputs input-active";
    }
    newInput.innerText = "_";
    newInput.id = index;
    inputsContainer.appendChild(newInput);
  });
};

const inputListener = async (event) => {
  const inputValidation = /^[a-zA-Z]$/;

  if (inputValidation.test(event.key)) {
    const currentInput = document.getElementById(currentInputIndex);
    currentInput.innerText = event.key;

    if (event.key.toUpperCase() !== word[currentInputIndex].toUpperCase()) {
      mistakes.push(event.key);
      const mistakesDisplay = document.getElementsByClassName("mistakes")[0];
      mistakesDisplay.innerText = mistakes.join(", ");
    }
    currentInputIndex++;

    if (currentInputIndex === word.length) {
      if (mistakes.length === 0) {
        await setTimeout(() => {
          alert("🎉 Success!");
          newGame();
        }, 500);

        return;
      }

      const triesDisplays = document.getElementsByClassName("try");
      triesDisplays[tries].classList.toggle("try-wasted");
      tries++;
      if (tries === MAX_TRIES) {
        await setTimeout(() => {
          resetGame();
          alert("Try again! 🚀🚀🚀");
        }, 500);
        return;
      }

      currentInputIndex = 0;
      mistakes = [];
      const triesLabel = document.getElementsByClassName("tries-label")[0];
      const mistakesDisplay = document.getElementsByClassName("mistakes")[0];
      await setTimeout(() => {
        triesLabel.innerText = `Tries (${tries}/5): `;
        mistakesDisplay.innerText = "";
        drawNewTry();
      }, 1000);
    }
    if (currentInputIndex > 0) {
      currentInput.classList.toggle("input-active");
      const nextInput = document.getElementById(currentInputIndex);
      nextInput.classList.toggle("input-active");
    }
  }
};

const resetGame = () => {
  tries = 0;
  mistakes = [];
  currentInputIndex = 0;
  const triesLabels = document.getElementsByClassName("tries-label")[0];
  triesLabels.innerText = "Tries (0/5): ";
  const triesDisplays = document.getElementsByClassName("tries")[0];
  triesDisplays.replaceChildren();
  for (let index = 0; index < MAX_TRIES; index++) {
    const element = document.createElement("div");
    element.className = "try";
    triesDisplays.appendChild(element);
  }

  const scrambled = document.getElementsByClassName("scrambled-word")[0];
  scrambled.innerText = scrambledWord;

  const mistakesDisplay = document.getElementsByClassName("mistakes")[0];
  mistakesDisplay.innerText = "";

  drawNewTry();
};

const newGame = async () => {
  await generateNewWord();

  resetGame();
};

newGame();

const randomButton = document.getElementById("random-button");
randomButton.addEventListener("click", newGame);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetGame);

document.addEventListener("keydown", inputListener);
