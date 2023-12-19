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
    });
}
fetchData();
// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
    let darkMode = document.getElementById("dark-mode");
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
    let darkModeIcon = document.getElementById("dark-icon-container");
    let lightMode = true;
    let imageUrl = "./assets/images/pattern-background-desktop-dark.svg";
    function setDarkMode() {
        lightMode = !lightMode;
        toggleDarkMode();
    }
    function toggleDarkMode() {
        if (!lightMode) {
            darkModeIcon.style.justifyContent = "flex-end";
            document.body.classList.add("dark-theme");
            document.body.style.backgroundImage = `url(${imageUrl})`;
        }
        else {
            darkModeIcon.style.justifyContent = "flex-start";
            document.body.classList.remove("dark-theme");
            document.body.style.backgroundImage = "";
        }
    }
    darkMode === null || darkMode === void 0 ? void 0 : darkMode.addEventListener("click", setDarkMode);
});
