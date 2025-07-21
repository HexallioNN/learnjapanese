// List of Kana characters
const kanaList = [
  { hiragana: "あ", katakana: "ア", romanized: "a" },
  { hiragana: "い", katakana: "イ", romanized: "i" },
  { hiragana: "う", katakana: "ウ", romanized: "u" },
  { hiragana: "え", katakana: "エ", romanized: "e" },
  { hiragana: "お", katakana: "オ", romanized: "o" },
  { hiragana: "か", katakana: "カ", romanized: "ka" },
  { hiragana: "き", katakana: "キ", romanized: "ki" },
  { hiragana: "く", katakana: "ク", romanized: "ku" },
  { hiragana: "け", katakana: "ケ", romanized: "ke" },
  { hiragana: "こ", katakana: "コ", romanized: "ko" },
  { hiragana: "さ", katakana: "サ", romanized: "sa" },
  { hiragana: "し", katakana: "シ", romanized: "shi" },
  { hiragana: "す", katakana: "ス", romanized: "su" },
  { hiragana: "せ", katakana: "セ", romanized: "se" },
  { hiragana: "そ", katakana: "ソ", romanized: "so" },
  { hiragana: "た", katakana: "タ", romanized: "ta" },
  { hiragana: "ち", katakana: "チ", romanized: "chi" },
  { hiragana: "つ", katakana: "ツ", romanized: "tsu" },
  { hiragana: "て", katakana: "テ", romanized: "te" },
  { hiragana: "と", katakana: "ト", romanized: "to" },
  { hiragana: "な", katakana: "ナ", romanized: "na" },
  { hiragana: "に", katakana: "ニ", romanized: "ni" },
  { hiragana: "ぬ", katakana: "ヌ", romanized: "nu" },
  { hiragana: "ね", katakana: "ネ", romanized: "ne" },
  { hiragana: "の", katakana: "ノ", romanized: "no" },
  { hiragana: "は", katakana: "ハ", romanized: "ha" },
  { hiragana: "ひ", katakana: "ヒ", romanized: "hi" },
  { hiragana: "ふ", katakana: "フ", romanized: "fu" }
];


let shuffledKanaList = [];
let currentIndex = -1;
let selectedMode = "";
let selectedLanguage = "";

// Shuffle an array (Fisher-Yates algorithm)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Set the selected language and show instructions
function setLanguage(language) {
  selectedLanguage = language;

  const header = document.getElementById("header");
  const instructions = document.getElementById("languageSelection");
  const modeSelection = document.getElementById("modeSelection");

  if (language === "Tr") {
    header.textContent = "Hiragana ve Katakana Quiz'ine Hoş Geldiniz!";
    instructions.classList.add("hidden");
    modeSelection.classList.remove("hidden");
  } else {
    header.textContent = "Welcome to the Hiragana & Katakana Quiz!";
    instructions.classList.add("hidden");
    modeSelection.classList.remove("hidden");
  }
}

// Set the quiz mode and start the quiz
function setMode(mode) {
  selectedMode = mode;
  shuffledKanaList = [...kanaList];
  shuffle(shuffledKanaList);
  currentIndex = 0;

  document.getElementById("modeSelection").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");

  askQuestion();
}

// Display the current question
function askQuestion() {
  const questionElement = document.getElementById("question");
  const currentKana = shuffledKanaList[currentIndex];

  if (selectedMode === "H") {
    questionElement.textContent =
      selectedLanguage === "Tr"
        ? `'${currentKana.hiragana}' (Hiragana) karakterinin romanize edilmiş hali nedir?`
        : `What is the romanized version of '${currentKana.hiragana}' (Hiragana)?`;
  } else if (selectedMode === "K") {
    questionElement.textContent =
      selectedLanguage === "Tr"
        ? `'${currentKana.katakana}' (Katakana) karakterinin romanize edilmiş hali nedir?`
        : `What is the romanized version of '${currentKana.katakana}' (Katakana)?`;
  } else if (selectedMode === "B") {
    questionElement.textContent =
      selectedLanguage === "Tr"
        ? `'${currentKana.hiragana}' (Hiragana) ve '${currentKana.katakana}' (Katakana) karakterlerinin romanize edilmiş hali nedir?`
        : `What is the romanized version of '${currentKana.hiragana}' (Hiragana) and '${currentKana.katakana}' (Katakana)?`;
  }

  document.getElementById("userAnswer").value = "";
}

// Check the user's answer
function checkAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
  const resultElement = document.getElementById("result");
  const currentKana = shuffledKanaList[currentIndex];

  if (userAnswer === currentKana.romanized) {
    resultElement.textContent =
      selectedLanguage === "Tr" ? "Doğru!" : "Correct!";
    resultElement.style.color = "#28a745";

    currentIndex++;
    if (currentIndex < shuffledKanaList.length) {
      setTimeout(() => {
        resultElement.textContent = "";
        askQuestion();
      }, 1000);
    } else {
      setTimeout(() => {
        resultElement.textContent =
          selectedLanguage === "Tr"
            ? "Tebrikler! Quiz'i tamamladınız!"
            : "Congratulations! You've completed the quiz!";
        resultElement.style.color = "#333";
        document.getElementById("quizContainer").classList.add("hidden");
      }, 1000);
    }
  } else if (userAnswer === "") {
    resultElement.textContent =
      selectedLanguage === "Tr"
        ? `Doğru cevap: ${currentKana.romanized}`
        : `The correct answer is: ${currentKana.romanized}`;
    resultElement.style.color = "#dc3545";

    currentIndex++;
    if (currentIndex < shuffledKanaList.length) {
      setTimeout(() => {
        resultElement.textContent = "";
        askQuestion();
      }, 2000);
    } else {
      setTimeout(() => {
        resultElement.textContent =
          selectedLanguage === "Tr"
            ? "Tebrikler! Quiz'i tamamladınız!"
            : "Congratulations! You've completed the quiz!";
        resultElement.style.color = "#333";
        document.getElementById("quizContainer").classList.add("hidden");
      }, 2000);
    }
  } else {
    resultElement.textContent =
      selectedLanguage === "Tr"
        ? "Yanlış! Tekrar deneyin."
        : "Wrong! Try again.";
    resultElement.style.color = "#dc3545";

    setTimeout(() => {
      resultElement.textContent = "";
    }, 1500);
  }
}

// Restart the quiz
function restartQuiz() {
  // Reset all variables and UI elements
  shuffledKanaList = [];
  currentIndex = -1;

  document.getElementById("quizContainer").classList.add("hidden");

  const headerText =
    selectedLanguage === "Tr"
      ? "Hiragana ve Katakana Quiz'ine Hoş Geldiniz!"
      : "Welcome to the Hiragana & Katakana Quiz!";

  document.getElementById("header").textContent = headerText;

  document.getElementById("languageSelection").classList.remove("hidden");
}
