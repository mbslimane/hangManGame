// import wordList from "./word-list"
const hangmanImage = document.querySelector(".hangman-box img")
const keyBoardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".word-display");
let currentWord, correctLetters, wrongGessesCounter;
const maxGuesses = 6
const guessesText = document.querySelector(".guesses-text b")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

const resetGame = () => {
    correctLetters = [];
    wrongGessesCounter = 0;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"><b></b></li>`).join('')
    gameModal.classList.remove("show")
    keyBoardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false)
    hangmanImage.src = `./images/hangman-${wrongGessesCounter}.svg`;
    guessesText.innerHTML = `${wrongGessesCounter} / ${maxGuesses}` 
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length )]
    document.querySelector(".hint-text b").innerText = hint
    currentWord = word;
    resetGame();
}

const gameOver = (isVictory) =>{
    setTimeout(() => {
        const modalText = isVictory ? "You found the word:" : "The correct word is:";
        gameModal.querySelector("h4").innerText = isVictory ? "congrats!" : "Game Over";
        gameModal.querySelector("img").src = `./images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add("show")
    },300)
}

const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) =>{
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        wrongGessesCounter++;
        hangmanImage.src = `./images/hangman-${wrongGessesCounter}.svg`;
    }
    if (wrongGessesCounter === maxGuesses) return gameOver(false) ;
    if (correctLetters.length === currentWord.length) return gameOver(true) ;
    button.disabled = true
    guessesText.innerHTML = `${wrongGessesCounter} / ${maxGuesses}` 
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyBoardDiv.appendChild(button)   
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener('click', getRandomWord)