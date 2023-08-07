// Create Letters
let letters = "abcdefghijklmnopqrstuvwxyz";

// Create Array from letters

let lettersArray = Array.from(letters);

// Generate Letters in page
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");

  // Create Text Node for Span

  let theLetter = document.createTextNode(letter);

  // Append textNode in Span

  span.appendChild(theLetter);

  // Add class to span

  span.className = "letter-box";

  // Append Span in LetterContainer

  lettersContainer.appendChild(span);
});

// Object of Words And Categories

const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
    "perl",
    "c",
    "java",
    "bash",
  ],
  movies: [
    "Prestige",
    "inception",
    "parasite",
    "interstellar",
    "whiplash",
    "momento",
    "coco",
    "up",
    "dead pool",
    "max payne",
    "it",
  ],
  people: [
    "Albert Einstien",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: [
    "Syria",
    "Palestine",
    "Yemen",
    "Egypt",
    "Bahrain",
    "Qatar",
    "kuwait",
    "saudi arabia",
  ],
};

// Random Number
let categoriesKeys = Object.keys(words);
let randomCategoryIndex = generateRandomNumber(categoriesKeys.length);
let selectedCategory = categoriesKeys[randomCategoryIndex]; // movies
let selectedCategoryList = words[categoriesKeys[randomCategoryIndex]]; // [alphetcio,maxpayne,...]

let randomWordIndex = generateRandomNumber(selectedCategoryList.length);

let selectedWord = selectedCategoryList[randomWordIndex]; // maxpayne

let selectedWordList = Array.from(selectedWord.toLowerCase());

let wordSpans = document.querySelectorAll(".letters .letter-box");

let categoryWord = document.querySelector(".category span");

categoryWord.innerHTML = selectedCategory;

let lettersGuessContainer = document.querySelector(".letters-guess");

let wrongSound = document.getElementById("wrong");
let successSound = document.getElementById("correct");
let beforeEnd = document.getElementById("before-end");
let gameOverSound = document.getElementById("gameover");
let endGameSound = document.getElementById("gameover-end");
//
selectedWordList.forEach((word) => {
  let emptySpan = document.createElement("span");
  // IF is Space
  if (word === " ") {
    // Add Class To The Span
    emptySpan.className = "with-space";
  }

  // Append Span To the Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

//Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// The Draw
let theDraw = document.querySelector(".the-draw");
// Wrong Tries
let wrongTries = 0;
// On Click Event
document.addEventListener("click", (e) => {
  let theStatus = false;
  if (e.target.className === "letter-box") {
    // Add Clicked Class

    e.target.classList.add("clicked");

    // Get Clicked Letter

    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // Chosen Word
    selectedWordList.forEach((letter, Wordindex) => {
      //
      if (theClickedLetter == letter.toLowerCase()) {
        // This One
        successSound.play();
        //
        theStatus = true;
        guessSpans.forEach((guessSpan, index) => {
          //
          if (Wordindex === index) {
            //
            guessSpan.innerHTML = theClickedLetter;
            //
            if (Array.from(guessSpans).every((span) => span.innerHTML !== "")) {
              showResult("you win", "green");
            }
          }
          //
        });
        //
      }
      //
    });
    //OutSide The Loop

    if (theStatus !== true) {
      if (wrongTries === 9) {
        showResult("game over");
        playSound(endGameSound);
      }
      if (wrongTries === 7) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
        playSound(gameOverSound);
      }
      if (wrongTries === 4) {
        playSound(beforeEnd);
      }
      playSound(wrongSound);
      wrongTries++;
      theDraw.classList.add(`wrong-${wrongTries}`);
    }
  }
  //
});

// Play Sound function
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

// Random Number Generator
function generateRandomNumber(length) {
  return Math.floor(Math.random() * length);
}

// Game Over Pop Up
function showResult(title, color) {
  // Create Game Over Div
  let div = document.createElement("div");
  div.className = "game-over";
  div.innerHTML = title;
  document.body.appendChild(div);
  div.style.color = color;
  // Create Retry Btn
  let retryBtn = document.createElement("button");
  retryBtn.classList.add("retry");
  retryBtn.innerHTML = "Retry!";
  div.appendChild(retryBtn);
  retryBtn.addEventListener("click", (e) => {
    location.reload();
  });
  // Create Overlay
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
}
