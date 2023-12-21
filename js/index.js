"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Questions = { quizzes: [] };
// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
    let darkMode = document.getElementById("dark-mode");
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
    let darkModeIcon = document.getElementById("dark-icon-container");
    let sunIcon = document.getElementById("sun");
    let moonIcon = document.getElementById("moon");
    // local storage variables called here
    let currentMode = localStorage.getItem("mode") || "light";
    let currentCategory = localStorage.getItem("selectedCategory");
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
    function toggleDarkMode(mode) {
        if (mode === "light") {
            darkModeIcon.style.justifyContent = "flex-end";
            document.body.classList.add("dark-theme");
            document.body.style.backgroundImage = `url(${imageUrl})`;
            sunIcon.style.backgroundImage = `url(${sun})`;
            moonIcon.style.backgroundImage = `url(${moon})`;
            levelContainer.style.backgroundColor = "#3b4d66";
        }
        else {
            darkModeIcon.style.justifyContent = "flex-start";
            document.body.classList.remove("dark-theme");
            document.body.style.backgroundImage = "";
            sunIcon.style.backgroundImage = "";
            moonIcon.style.backgroundImage = "";
            levelContainer.style.backgroundColor = "#fff";
        }
    }
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
    //header or title goes here
    const categoryTitleElement = document.querySelector(".categories-title");
    if (currentCategory !== null && categoryTitleElement) {
        categoryTitleElement.innerHTML =
            currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    }
    const questionHeaderIcon = document.getElementById("question-header-icon");
    // handle icon and icon color here
    if (localStorage.getItem("selectedCategory") === "html") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("orange");
        questionHeaderIcon.src = "./assets/images/icon-html.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "css") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("green");
        questionHeaderIcon.src = "./assets/images/icon-css.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "javascript") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("blue");
        questionHeaderIcon.src = "./assets/images/icon-js.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "accessibility") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("purple");
        questionHeaderIcon.src = "./assets/images/icon-accessibility.svg";
    }
});
// dark mode logic ENDS here
// when selectedCategory;
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        var _a, _b;
        const categoryTarget = event.currentTarget;
        const categoryTitle = (_b = (_a = categoryTarget
            .querySelector(".categories-titles")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
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
let filteredCategoryQuestions;
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./js/data.json");
        const data = yield response.json();
        Questions = data;
        const category = localStorage.getItem("selectedCategory");
        switch (category) {
            case "html":
                filteredCategoryQuestions = Questions.quizzes[0];
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
                console.log("unknown category");
        }
        return filteredCategoryQuestions;
    });
}
let score = 0;
let currentIndexQuestion = 0;
let button = document.getElementById("main-button");
let questionBody = document.getElementById("question");
let questionNum = document.getElementById("question-num");
let questionOptns = document.getElementById("optn");
let level = document.getElementById("level");
let width = 1;
let isAnswerSelect = false;
function showNextQuestion() {
    if (!isAnswerSelect) {
        const questionP = document.createElement("p");
        questionP.innerHTML = "Please select an answer";
        questionBody === null || questionBody === void 0 ? void 0 : questionBody.appendChild(questionP);
        return;
    }
    width++;
    level.style.width = width + "0%";
    currentIndexQuestion = currentIndexQuestion + 1;
    if (currentIndexQuestion < filteredCategoryQuestions.questions.length) {
        showQuestion(filteredCategoryQuestions);
        isAnswerSelect = false;
    }
    else {
        console.log(score);
        showScore();
    }
}
let header = document.getElementById("question-num");
let headerScore = document.getElementById("question");
let promptSection = document.getElementById("quiz-prompt");
let levelContainer = document.getElementById("level-span");
function showScore() {
    resetQuestionSection();
    resetState();
    const questionHeaderIcon = document.getElementById("question-header-icon");
    // handle icon and icon color here
    if (localStorage.getItem("selectedCategory") === "html") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("orange");
        questionHeaderIcon.src = "./assets/images/icon-html.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "css") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("green");
        questionHeaderIcon.src = "./assets/images/icon-css.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "javascript") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("blue");
        questionHeaderIcon.src = "./assets/images/icon-js.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "accessibility") {
        questionHeaderIcon === null || questionHeaderIcon === void 0 ? void 0 : questionHeaderIcon.classList.add("purple");
        questionHeaderIcon.src = "./assets/images/icon-accessibility.svg";
    }
    const quizStatus = document.createElement("p");
    quizStatus.className = "quiz-status";
    quizStatus.textContent = "Quiz Completed";
    const quizSecondStatus = document.createElement("p");
    quizSecondStatus.className = "quiz-second-status";
    quizSecondStatus.textContent = "You scored...";
    // Append new elements to the promptSection
    promptSection.appendChild(quizStatus);
    promptSection.appendChild(quizSecondStatus);
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    const title = document.createElement("div");
    title.classList.add("questions-category-header");
    const logo = document.createElement("img");
    logo.classList.add("landings-icons");
    logo.classList.add();
    if (localStorage.getItem("selectedCategory") === "html") {
        logo === null || logo === void 0 ? void 0 : logo.classList.add("orange");
        logo.src = "./assets/images/icon-html.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "css") {
        logo === null || logo === void 0 ? void 0 : logo.classList.add("green");
        logo.src = "./assets/images/icon-css.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "javascript") {
        logo === null || logo === void 0 ? void 0 : logo.classList.add("blue");
        logo.src = "./assets/images/icon-js.svg";
    }
    else if (localStorage.getItem("selectedCategory") === "accessibility") {
        logo === null || logo === void 0 ? void 0 : logo.classList.add("purple");
        logo.src = "./assets/images/icon-accessibility.svg";
    }
    title.appendChild(logo);
    const logoTitle = document.createElement("p");
    logoTitle.classList.add("categories-title");
    logoTitle.innerHTML = localStorage.getItem("selectedCategory") || "NoTitle";
    title.appendChild(logoTitle);
    resultContainer.appendChild(title);
    const result = document.createElement("p");
    result.classList.add("big-result-num");
    result.innerHTML = `${score}`;
    resultContainer.appendChild(result);
    const expectedScore = document.createElement("p");
    expectedScore.classList.add("small-result-num");
    expectedScore.innerHTML = "out of 10";
    resultContainer.appendChild(expectedScore);
    questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.appendChild(resultContainer);
    let submitButton = document.getElementById("main-button");
    if (!submitButton) {
        submitButton = document.createElement("div");
        submitButton.id = "main-button";
        submitButton.textContent = "Play Again";
        submitButton.addEventListener("click", startQuiz);
        questionOptns.appendChild(submitButton);
    }
}
function resetQuestionSection() {
    while (promptSection === null || promptSection === void 0 ? void 0 : promptSection.firstChild) {
        promptSection === null || promptSection === void 0 ? void 0 : promptSection.removeChild(promptSection.firstChild);
    }
    levelContainer.style.width = "0";
    levelContainer.style.backgroundColor = "transparent";
}
function resetState() {
    while (questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.firstChild) {
        questionOptns.removeChild(questionOptns.firstChild);
    }
}
function showQuestion(questions) {
    resetQuestionSection();
    console.log(score);
    resetState();
    isAnswerSelect = false;
    let currentQuestion = questions.questions[currentIndexQuestion];
    let quest = document.createElement("p");
    quest.classList.add("question-body");
    let questNum = document.createElement("p");
    questNum.classList.add("question-number");
    promptSection === null || promptSection === void 0 ? void 0 : promptSection.appendChild(questNum);
    promptSection === null || promptSection === void 0 ? void 0 : promptSection.appendChild(quest);
    let currentMode = localStorage.getItem("mode") || "light";
    console.log("currentmode: ", currentMode);
    levelContainer.style.width = "100%";
    if (currentMode === "light") {
        levelContainer.style.backgroundColor = "#fff";
    }
    else {
        levelContainer.style.backgroundColor = "#3b4d66";
    }
    quest.innerHTML = currentQuestion.question;
    questNum.innerHTML = `Question ${currentIndexQuestion + 1} of 10`;
    let letterindex = 0;
    currentQuestion.options.forEach((option) => {
        const correctAnswer = currentQuestion.answer;
        const correctState = correctAnswer == option;
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("question-content");
        const letterSpan = document.createElement("span");
        letterSpan.classList.add("letter-options");
        letterSpan.textContent = String.fromCharCode(65 + letterindex);
        categoryDiv.appendChild(letterSpan);
        letterindex++;
        const questionP = document.createElement("p");
        questionP.classList.add("question-options");
        questionP.textContent = option;
        categoryDiv.appendChild(questionP);
        questionOptns.appendChild(categoryDiv);
        // submitButton.addEventListener("click", handleSubmit);
        if (correctState) {
            categoryDiv.dataset.correct = "true";
        }
        else {
            categoryDiv.dataset.correct = "false";
        }
        categoryDiv.addEventListener("click", selectAnswer);
    });
    let submitButton = document.getElementById("main-button");
    if (!submitButton) {
        submitButton = document.createElement("div");
        submitButton.id = "main-button";
        submitButton.textContent = "Submit";
        questionOptns.appendChild(submitButton);
    }
    submitButton.textContent = "Submit";
    submitButton.removeEventListener("click", showNextQuestion);
    submitButton.addEventListener("click", handleSubmit);
}
function handleSubmit() {
    if (!isAnswerSelect) {
        alert("Please select an option before submitting.");
        return;
    }
    Array.from(questionOptns.children).forEach((option) => {
        if (option instanceof HTMLElement) {
            option.removeEventListener("click", selectAnswer);
            if (option.dataset.correct === "true") {
                option.style.border = "3px solid #26d782";
            }
            else if (option.dataset.select === "true" &&
                option.dataset.correct === "false") {
                option.style.border = "3px solid #ee5454";
            }
        }
    });
    const submitButton = document.getElementById("main-button");
    submitButton.textContent = "Next Question";
    submitButton.removeEventListener("click", handleSubmit);
    submitButton.addEventListener("click", showNextQuestion);
}
function selectAnswer(e) {
    isAnswerSelect = true;
    const selectedButton = e.target.closest(".question-content");
    Array.from(questionOptns.children).forEach((option) => {
        if (option instanceof HTMLElement) {
            option.style.border = "3px solid transparent";
        }
        option.removeEventListener("click", selectAnswer);
    });
    if (selectedButton.dataset.correct === "true") {
        score++;
    }
    if (selectedButton) {
        selectedButton.style.border = "3px solid #a729f5";
        selectedButton.dataset.select = "true";
    }
}
function startQuiz() {
    currentIndexQuestion = 0;
    score = 0;
    width = 1;
    showQuestion(filteredCategoryQuestions);
}
fetchData().then(() => {
    startQuiz();
    button === null || button === void 0 ? void 0 : button.addEventListener("click", showNextQuestion);
});
