"use strict";
// import { globalMain } from "./global_variables";
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
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("./js/data.json");
        const data = yield response.json();
        Questions = data;
        const category = localStorage.getItem("selectedCategory");
        switch (category) {
            case "html":
                console.log(Questions.quizzes[0]);
                break;
            case "css":
                console.log(Questions.quizzes[1]);
                break;
            case "javascript":
                console.log(Questions.quizzes[2]);
                break;
            case "accessibility":
                console.log(Questions.quizzes[3]);
                break;
            default:
                console.log("unknown");
        }
    });
}
fetchData();
// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
    let darkMode = document.getElementById("dark-mode");
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
    let darkModeIcon = document.getElementById("dark-icon-container");
    let sunIcon = document.getElementById("sun");
    let moonIcon = document.getElementById("moon");
    let currentMode = localStorage.getItem("mode") || "light";
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
});
// dark mode logic ENDS here
// let selectedCategory;
document.querySelectorAll(".category-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        var _a, _b;
        const categoryTarget = event.currentTarget;
        const categoryTitle = (_b = (_a = categoryTarget
            .querySelector(".categories-titles")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.toLowerCase();
        // categoryTitle.href
        // this.href = `./questions.html?category=${categoryTitle}`;
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
        // You can do more actions here based on the selected category
    });
});
console.log(localStorage.getItem("selectedCategory"));
