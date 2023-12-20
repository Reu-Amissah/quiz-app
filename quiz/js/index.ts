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
}
fetchData();

// dark mode settings here
document.addEventListener("DOMContentLoaded", () => {
  let darkMode = document.getElementById("dark-mode");
  darkMode?.addEventListener("click", setDarkMode);

  let darkModeIcon = document.getElementById("dark-icon-container");
  let sunIcon = document.getElementById("sun");
  let moonIcon = document.getElementById("moon");

  let currentMode: string = localStorage.getItem("mode") || "light";
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
});
// dark mode logic ENDS here

// let selectedCategory;
document.querySelectorAll(".category-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    const categoryTarget = event.currentTarget as HTMLAnchorElement;
    const categoryTitle = categoryTarget
      .querySelector(".categories-titles")
      ?.textContent?.toLowerCase();
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
