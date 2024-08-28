let word = "";
let scrambledWord = "";
let tries = 0;
let mistakes = [];

//random y reset: random genera otra palabra y reset resetea el juego para la misma. Entonces random usa reset para inicializar el juego. reset deberia recibir la palabra y el scramble, sino al resetear el scramble seria distinto

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
    console.log(word, scrambledWord);
  } catch (error) {
    alert("Oops, something failed");
  }
};

const drawNewTry = () => {
  const inputsContainer =
    document.getElementsByClassName("inputs-container")[0];
  word.forEach((letter, index) => {
    console.log(letter);
  });
};

const resetGame = () => {};

generateNewWord();
drawNewTry();
