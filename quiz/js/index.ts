// import { globalMain } from "./global_variables";

interface QuestionType {
  quizzes: Array<{
    title: string;
    icon: string;
    questions: Array<{
      question: string;
      option: Array<string>;
      answer: string;
    }>;
  }>;
}

let Questions: QuestionType = { quizzes: [] };

async function fetchData() {
  const response = await fetch("./js/data.json");
  const data = await response.json();
  Questions = data;
}
fetchData();

// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
  let darkMode = document.getElementById("dark-mode");
  darkMode?.addEventListener("click", setDarkMode);

  let darkModeIcon = document.getElementById("dark-icon-container");
  let lightMode: boolean = true;
  let imageUrl = "./assets/images/pattern-background-desktop-dark.svg";

  function setDarkMode() {
    lightMode = !lightMode;
    toggleDarkMode();
  }

  function toggleDarkMode() {
    if (!lightMode) {
      darkModeIcon!.style.justifyContent = "flex-end";
      document.body.classList.add("dark-theme");
      document.body.style.backgroundImage = `url(${imageUrl})`;
    } else {
      darkModeIcon!.style.justifyContent = "flex-start";
      document.body.classList.remove("dark-theme");
      document.body.style.backgroundImage = "";
    }
  }

  darkMode?.addEventListener("click", setDarkMode);
});
