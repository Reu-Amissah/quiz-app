var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Questions = { quizzes: [] };
// dark mode settings here
document.addEventListener("DOMContentLoaded", function () {
    var darkMode = document.getElementById("dark-mode");
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
    var darkModeIcon = document.getElementById("dark-icon-container");
    var sunIcon = document.getElementById("sun");
    var moonIcon = document.getElementById("moon");
    // local storage variables called here
    var currentMode = localStorage.getItem("mode") || "light";
    var currentCategory = localStorage.getItem("selectedCategory");
    var imageUrl = "./assets/images/pattern-background-desktop-dark.svg";
    var sun = "./assets/images/icon-sun-light.svg";
    var moon = "./assets/images/icon-moon-light.svg";
    toggleDarkMode(currentMode);
    function setDarkMode() {
        var systemMode = localStorage.getItem("mode") || "light";
        var newMode = systemMode === "light" ? "dark" : "light";
        localStorage.setItem("mode", newMode);
        toggleDarkMode(newMode);
    }
    function toggleDarkMode(mode) {
        if (mode === "light") {
            darkModeIcon.style.justifyContent = "flex-end";
            document.body.classList.add("dark-theme");
            document.body.style.backgroundImage = "url(".concat(imageUrl, ")");
            sunIcon.style.backgroundImage = "url(".concat(sun, ")");
            moonIcon.style.backgroundImage = "url(".concat(moon, ")");
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
    var categoryTitleElement = document.querySelector(".categories-title");
    if (currentCategory !== null && categoryTitleElement) {
        categoryTitleElement.innerHTML =
            currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    }
    var questionHeaderIcon = document.getElementById("question-header-icon");
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
document.querySelectorAll(".category-link").forEach(function (link) {
    link.addEventListener("click", navigateCategory);
});
document.querySelectorAll(".category-link").forEach(function (link) {
    link.addEventListener("keydown", function (event) {
        navigateCategory(event);
    });
});
function navigateCategory(event) {
    var _a, _b;
    var categoryTarget = event.currentTarget;
    var categoryTitle = (_b = (_a = categoryTarget
        .querySelector(".categories-titles")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (categoryTitle) {
        categoryTarget.href = "./questions.html?category=".concat(categoryTitle);
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
}
// function getRandomQuestions(): Quiz[] {
//   let questionsCopy = [...filteredCategoryQuestions.questions];
//   let randomQuestions: qu[] = [];
//   for (let i = 0; i < 5; i++) {
//     let index = Math.floor(Math.random() * questionsCopy.length);
//     randomQuestions.push(questionsCopy[index]);
//     questionsCopy.splice(index, 1);
//   }
//   return randomQuestions;
// }
var filteredCategoryQuestions;
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("./js/data.json")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    Questions = data;
                    category = localStorage.getItem("selectedCategory");
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
                    return [2 /*return*/, filteredCategoryQuestions];
            }
        });
    });
}
var score = 0;
var currentIndexQuestion = 0;
var button = document.getElementById("main-button");
var questionBody = document.getElementById("question");
var questionNum = document.getElementById("question-num");
var questionOptns = document.getElementById("optn");
var level = document.getElementById("level");
var width = 1;
var isAnswerSelect = false;
function showNextQuestion() {
    if (!isAnswerSelect) {
        var questionP = document.createElement("p");
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
        showScore();
    }
}
var header = document.getElementById("question-num");
var headerScore = document.getElementById("question");
var promptSection = document.getElementById("quiz-prompt");
var levelContainer = document.getElementById("level-span");
function showScore() {
    resetQuestionSection();
    resetState();
    var questionHeaderIcon = document.getElementById("question-header-icon");
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
    var quizStatus = document.createElement("p");
    quizStatus.className = "quiz-status";
    quizStatus.textContent = "Quiz Completed";
    var quizSecondStatus = document.createElement("p");
    quizSecondStatus.className = "quiz-second-status";
    quizSecondStatus.textContent = "You scored...";
    // Append new elements to the promptSection
    promptSection.appendChild(quizStatus);
    promptSection.appendChild(quizSecondStatus);
    var resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    var title = document.createElement("div");
    title.classList.add("questions-category-header");
    var logo = document.createElement("img");
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
    var logoTitle = document.createElement("p");
    logoTitle.classList.add("categories-title");
    var category = localStorage.getItem("selectedCategory") || "NoTitle";
    logoTitle.innerHTML = category.charAt(0).toUpperCase() + category.slice(1);
    title.appendChild(logoTitle);
    resultContainer.appendChild(title);
    var result = document.createElement("p");
    result.classList.add("big-result-num");
    result.innerHTML = "".concat(score);
    resultContainer.appendChild(result);
    var expectedScore = document.createElement("p");
    expectedScore.classList.add("small-result-num");
    expectedScore.innerHTML = "out of 10";
    resultContainer.appendChild(expectedScore);
    questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.appendChild(resultContainer);
    var submitButton = document.getElementById("main-button");
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
}
function resetState() {
    while (questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.firstChild) {
        questionOptns.removeChild(questionOptns.firstChild);
    }
}
function showQuestion(questions) {
    resetQuestionSection();
    resetState();
    isAnswerSelect = false;
    var currentQuestion = questions.questions[currentIndexQuestion];
    var quest = document.createElement("p");
    quest.classList.add("question-body");
    var questNum = document.createElement("p");
    questNum.classList.add("question-number");
    promptSection === null || promptSection === void 0 ? void 0 : promptSection.appendChild(questNum);
    promptSection === null || promptSection === void 0 ? void 0 : promptSection.appendChild(quest);
    levelContainer.style.width = "100%";
    quest.innerHTML = currentQuestion.question;
    questNum.innerHTML = "Question ".concat(currentIndexQuestion + 1, " of 10");
    var letterindex = 0;
    currentQuestion.options.forEach(function (option) {
        var correctAnswer = currentQuestion.answer;
        var correctState = correctAnswer == option;
        var categoryDiv = document.createElement("div");
        categoryDiv.classList.add("question-content");
        categoryDiv.tabIndex = 0;
        var letterSpan = document.createElement("span");
        letterSpan.classList.add("letter-options");
        letterSpan.textContent = String.fromCharCode(65 + letterindex);
        categoryDiv.appendChild(letterSpan);
        letterindex++;
        var questionP = document.createElement("p");
        questionP.classList.add("question-options");
        questionP.textContent = option;
        categoryDiv.appendChild(questionP);
        questionOptns.appendChild(categoryDiv);
        if (correctState) {
            categoryDiv.dataset.correct = "true";
        }
        else {
            categoryDiv.dataset.correct = "false";
        }
        categoryDiv.addEventListener("click", selectAnswer);
        // so when we click an option, it should select and remove click event
    });
    var submitButton = document.getElementById("main-button");
    if (!submitButton) {
        submitButton = document.createElement("div");
        submitButton.id = "main-button";
        submitButton.textContent = "Submit";
        questionOptns.appendChild(submitButton);
    }
    submitButton.textContent = "Submit";
    submitButton.tabIndex = 0;
    submitButton.removeEventListener("click", showNextQuestion);
    submitButton.addEventListener("click", handleSubmit);
    var errorContainer = document.createElement("div");
    errorContainer.classList.add("error-message-container");
    var errorIcon = document.createElement("img");
    errorIcon.src = "./assets/images/icon-error.svg";
    errorIcon.style.height = "40px";
    errorIcon.style.width = "40px";
    var errorMsg = document.createElement("p");
    errorMsg.innerHTML = "Please select an answer";
    errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorIcon);
    errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorMsg);
    errorContainer.style.visibility = "hidden";
    questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.appendChild(errorContainer);
}
function handleSubmit() {
    if (!isAnswerSelect && !document.querySelector(".error-message-container")) {
        var errorContainer = document.createElement("div");
        errorContainer.classList.add("error-message-container");
        var errorIcon = document.createElement("img");
        errorIcon.src = "./assets/images/icon-error.svg";
        errorIcon.style.height = "40px";
        errorIcon.style.width = "40px";
        var errorMsg = document.createElement("p");
        errorMsg.innerHTML = "Please select an answer";
        errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorIcon);
        errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorMsg);
        questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.appendChild(errorContainer);
        return;
    }
    else if (!isAnswerSelect &&
        document.querySelector(".error-message-container")) {
        if (questionOptns && questionOptns.lastChild) {
            questionOptns.removeChild(questionOptns.lastChild);
        }
        var errorContainer = document.createElement("div");
        errorContainer.classList.add("error-message-container");
        var errorIcon = document.createElement("img");
        errorIcon.src = "./assets/images/icon-error.svg";
        errorIcon.style.height = "40px";
        errorIcon.style.width = "40px";
        var errorMsg = document.createElement("p");
        errorMsg.innerHTML = "Please select an answer";
        errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorIcon);
        errorContainer === null || errorContainer === void 0 ? void 0 : errorContainer.appendChild(errorMsg);
        questionOptns === null || questionOptns === void 0 ? void 0 : questionOptns.appendChild(errorContainer);
        return;
    }
    var correctImg = document.createElement("img");
    correctImg.src = "./assets/images/icon-correct.svg";
    correctImg.style.marginLeft = "auto";
    var incorrectImg = document.createElement("img");
    incorrectImg.src = "./assets/images/icon-incorrect.svg";
    incorrectImg.style.marginLeft = "auto";
    Array.from(questionOptns.children).forEach(function (option) {
        if (option instanceof HTMLElement) {
            option.removeEventListener("click", selectAnswer);
            if (option.dataset.correct === "true") {
                option.style.border = "3px solid #26d782";
                var letter = option.querySelector(".letter-options");
                letter.style.backgroundColor = "#26d782";
                letter.style.color = "#fff";
                option.appendChild(correctImg);
            }
            else if (option.dataset.select === "true" &&
                option.dataset.correct === "false") {
                option.style.border = "3px solid #ee5454";
                var letter = option.querySelector(".letter-options");
                letter.style.backgroundColor = "#ee5454";
                letter.style.color = "#fff";
                option.appendChild(incorrectImg);
            }
            else if (option.dataset.select === "true" &&
                option.dataset.correct === "true") {
                option.style.border = "3px solid #26d782";
                var letter = option.querySelector(".letter-options");
                letter.style.backgroundColor = "#26d782";
                letter.style.color = "#fff";
                option.appendChild(correctImg);
            }
        }
    });
    var submitButton = document.getElementById("main-button");
    submitButton.textContent = "Next Question";
    submitButton.removeEventListener("click", handleSubmit);
    submitButton.addEventListener("click", showNextQuestion);
}
function resetSelection() {
    Array.from(questionOptns.children).forEach(function (option) {
        if (option instanceof HTMLElement) {
            option.dataset.select = "false";
            option.style.border = "3px solid transparent";
        }
    });
    var letters = document.querySelectorAll(".letter-options");
    console.log(letters);
    letters.forEach(function (letter) {
        letter.style.background = "#f4f6fa";
        letter.style.color = "#626c7f";
    });
}
function selectAnswer(e) {
    resetSelection();
    isAnswerSelect = true;
    var selectedButton = e.target.closest(".question-content");
    if (selectedButton.dataset.correct === "true") {
        score++;
    }
    console.log(selectedButton);
    selectedButton.style.border = "3px solid #a729f5";
    selectedButton.dataset.select = "true";
    var letter = selectedButton.querySelector(".letter-options");
    letter.style.backgroundColor = "#a729f5";
    letter.style.color = "#fff";
    selectedButton.addEventListener("click", selectAnswer);
    // if (selectedButton) {
    // }
}
function startQuiz() {
    currentIndexQuestion = 0;
    score = 0;
    width = 1;
    level.style.width = "10%";
    showQuestion(filteredCategoryQuestions);
}
fetchData().then(function () {
    startQuiz();
    button === null || button === void 0 ? void 0 : button.addEventListener("click", showNextQuestion);
});
// question loading function going on above
