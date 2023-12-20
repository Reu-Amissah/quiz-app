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
        }
        else {
            darkModeIcon.style.justifyContent = "flex-start";
            document.body.classList.remove("dark-theme");
            document.body.style.backgroundImage = "";
            sunIcon.style.backgroundImage = "";
            moonIcon.style.backgroundImage = "";
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
let score = 0;
let currentIndexQuestion = 0;
let filteredCategoryQuestions;
// localStorage.setItem("currentIndexQuestion", "0");
// let currentIndexQuestion: string | number | null =
//   localStorage.getItem("currentIndexQuestion") | 0;
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./js/data.json");
        const data = yield response.json();
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
    });
}
fetchData().then(() => {
    console.log(filteredCategoryQuestions);
    function startQuiz() {
        currentIndexQuestion = 0;
        score = 0;
        showQuestion(filteredCategoryQuestions);
        console.log("success");
    }
    function showQuestion(questions) {
        questionBody.innerHTML = questions.questions[0].question;
        console.log(questionBody === null || questionBody === void 0 ? void 0 : questionBody.innerHTML);
    }
    let questionsCategorySelector = document.getElementById("category-selector");
    questionsCategorySelector === null || questionsCategorySelector === void 0 ? void 0 : questionsCategorySelector.addEventListener("click", startQuiz);
});
let questionBody = document.getElementById("question");
document.addEventListener("DOMContentLoaded", () => {
    console.log("hi");
    let button = document.getElementById("button");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", showNextQuestion);
    function showNextQuestion() {
        currentIndexQuestion = currentIndexQuestion + 1;
    }
    // let levelNum = 100;
    // levelNum += 20;
    // let levelWidth: string = levelNum + "%";
    // (document.querySelector(".level-indicator") as HTMLElement).style.width =
    //   levelWidth;
});
