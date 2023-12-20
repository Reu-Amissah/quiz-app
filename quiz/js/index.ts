interface QuestionType {
  quizzes: Array<{
    title: string;
    icon: string;
    questions: Array<{
      question: string;
      options: Array<string>;
      answer: string;
    }>;
  }>;
}

let Questions: QuestionType = { quizzes: [] };

// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
  let darkMode = document.getElementById("dark-mode");
  darkMode?.addEventListener("click", setDarkMode);

  let darkModeIcon = document.getElementById("dark-icon-container");
  let sunIcon = document.getElementById("sun");
  let moonIcon = document.getElementById("moon");

  // local storage variables called here
  let currentMode: string = localStorage.getItem("mode") || "light";
  let currentCategory: string | null = localStorage.getItem("selectedCategory");

  let imageUrl = "./assets/images/pattern-background-desktop-dark.svg";
  let sun = "./assets/images/icon-sun-light.svg";
  let moon = "./assets/images/icon-moon-light.svg";
  toggleDarkMode(currentMode);

  function setDarkMode() {
    const systemMode = localStorage.getItem("mode") || "light";
    const newMode = systemMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", newMode);
    toggleDarkMode(newMode);
  }

  function toggleDarkMode(mode: string) {
    if (mode === "light") {
      darkModeIcon!.style.justifyContent = "flex-end";
      document.body.classList.add("dark-theme");
      document.body.style.backgroundImage = `url(${imageUrl})`;
      sunIcon!.style.backgroundImage = `url(${sun})`;
      moonIcon!.style.backgroundImage = `url(${moon})`;
    } else {
      darkModeIcon!.style.justifyContent = "flex-start";
      document.body.classList.remove("dark-theme");
      document.body.style.backgroundImage = "";
      sunIcon!.style.backgroundImage = "";
      moonIcon!.style.backgroundImage = "";
    }
  }

  darkMode?.addEventListener("click", setDarkMode);

  //header or title goes here
  const categoryTitleElement = document.querySelector(".categories-title");
  if (currentCategory !== null && categoryTitleElement) {
    categoryTitleElement.innerHTML =
      currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
  }

  const questionHeaderIcon = document.getElementById(
    "question-header-icon"
  ) as HTMLImageElement;

  // handle icon and icon color here
  if (localStorage.getItem("selectedCategory") === "html") {
    questionHeaderIcon?.classList.add("orange");
    questionHeaderIcon.src = "./assets/images/icon-html.svg";
  } else if (localStorage.getItem("selectedCategory") === "css") {
    questionHeaderIcon?.classList.add("green");
    questionHeaderIcon.src = "./assets/images/icon-css.svg";
  } else if (localStorage.getItem("selectedCategory") === "javascript") {
    questionHeaderIcon?.classList.add("blue");
    questionHeaderIcon.src = "./assets/images/icon-js.svg";
  } else if (localStorage.getItem("selectedCategory") === "accessibility") {
    questionHeaderIcon?.classList.add("purple");
    questionHeaderIcon.src = "./assets/images/icon-accessibility.svg";
  }
});
// dark mode logic ENDS here

// when selectedCategory;
document.querySelectorAll(".category-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    const categoryTarget = event.currentTarget as HTMLAnchorElement;
    const categoryTitle = categoryTarget
      .querySelector(".categories-titles")
      ?.textContent?.toLowerCase();

    if (categoryTitle) {
      categoryTarget.href = `./questions.html?category=${categoryTitle}`;
    }

    switch (categoryTitle) {
      case "html":
        localStorage.setItem("selectedCategory", "html");

        break;
      case "css":
        localStorage.setItem("selectedCategory", "css");
        break;
      case "javascript":
        localStorage.setItem("selectedCategory", "javascript");
        break;
      case "accessibility":
        localStorage.setItem("selectedCategory", "accessibility");
        break;
      default:
        localStorage.setItem("selectedCategory", "unknown");
    }
  });
});

// localStorage.setItem("currentIndexQuestion", "0");
// let currentIndexQuestion: string | number | null =
//   localStorage.getItem("currentIndexQuestion") | 0;

let filteredCategoryQuestions: Quiz;
async function fetchData() {
  const response = await fetch("./js/data.json");
  const data = await response.json();
  Questions = data;

  const category = localStorage.getItem("selectedCategory");
  switch (category) {
    case "html":
      filteredCategoryQuestions = Questions.quizzes[0];
      console.log(filteredCategoryQuestions);
      break;
    case "css":
      filteredCategoryQuestions = Questions.quizzes[1];
      break;
    case "javascript":
      filteredCategoryQuestions = Questions.quizzes[2];
      break;
    case "accessibility":
      filteredCategoryQuestions = Questions.quizzes[3];
      break;
    default:
      console.log("unknown");
  }

  return filteredCategoryQuestions;
}

let score = 0;
let currentIndexQuestion = 0;
let button = document.getElementById("main-button");

let questionBody = document.getElementById("question");
let questionNum = document.getElementById("question-num");
let questionOptns = document.getElementById("optn");

let isAnswerSelect = false;

function showNextQuestion() {
  if (!isAnswerSelect) {
    const questionP = document.createElement("p");
    questionP.innerHTML = "Please select an answer";
    questionBody?.appendChild(questionP);
    return;
  }

  currentIndexQuestion = currentIndexQuestion + 1;

  if (currentIndexQuestion < filteredCategoryQuestions.questions.length) {
    showQuestion(filteredCategoryQuestions);
    isAnswerSelect = false;
  } else {
    console.log(score);
  }
}

function resetState() {
  while (questionOptns?.firstChild) {
    questionOptns.removeChild(questionOptns.firstChild);
  }
}

function showQuestion(questions: Quiz) {
  resetState();
  let currentQuestion = questions.questions[currentIndexQuestion];
  questionBody!.innerHTML = currentQuestion.question;
  questionNum!.innerHTML = `Question ${currentIndexQuestion + 1} of 10`;

  currentQuestion.options.forEach((option) => {
    const correctAnswer = currentQuestion.answer;
    const correctState: boolean = correctAnswer == option;
    console.log(correctAnswer, option, correctState);

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("question-content");

    const letterSpan = document.createElement("span");
    letterSpan.classList.add("letter-options");
    letterSpan.textContent = String.fromCharCode(65 + currentIndexQuestion); // ASCII 65 is 'A'
    categoryDiv.appendChild(letterSpan);

    const questionP = document.createElement("p");
    questionP.classList.add("question-options");
    questionP.textContent = option;
    categoryDiv.appendChild(questionP);

    questionOptns!.appendChild(categoryDiv);

    if (correctState) {
      categoryDiv.dataset.correct = "true";
    }
    categoryDiv.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e: Event) {
  isAnswerSelect = true;
  const selectedButton = (e.target as HTMLElement).closest(
    ".question-content"
  ) as HTMLElement;
  console.log(selectedButton);

  const isCorrect = selectedButton!.dataset.correct === "true";
  console.log(isCorrect);

  if (isCorrect) {
    // selectedButton!.classList.add("correct");
    selectedButton.style.border = "3px solid #26d782";
    score = score + 1;
    console.log(score);
  } else {
    selectedButton.style.border = "3px solid #ee5454";
  }

  Array.from(questionOptns!.children).forEach((option) => {
    if (option instanceof HTMLElement && option.dataset.correct === "true") {
      option.style.border = "3px solid #26d782";
    }
    option.removeEventListener("click", selectAnswer);
  });
}

function startQuiz() {
  currentIndexQuestion = 0;
  score = 0;
  showQuestion(filteredCategoryQuestions);
  console.log("success");
}

fetchData().then(() => {
  console.log(filteredCategoryQuestions);
  startQuiz();
  button?.addEventListener("click", showNextQuestion);
});
// question loading function going on above

interface Quiz {
  title: string;
  icon: string;
  questions: Array<{
    question: string;
    options: Array<string>; // Note that you have 'option' in QuestionType, but 'options' seems more appropriate
    answer: string;
  }>;
}
