const dark = document.getElementById("dark");
const light = document.getElementById("light");
const body = document.querySelector("body");

const post = () => {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      dark.checked = true;
      body.classList = "dark";
    } else {
      light.checked = true;

      body.classList = "light";
    }
  }
};
const check = () => {
  if (matchMedia("(prefers-color-scheme: dark)").matches) {
    dark.checked = true;

    body.classList = "dark";
  } else {
    light.checked = true;

    body.classList = "light";
  }
};
check();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", check);
matchMedia("(prefers-color-scheme: light)").addEventListener("change", check);
const change = () => {
  if (dark.checked) {
    body.classList = "dark";
  } else {
    body.classList = "light";
  }
  localStorage.setItem("theme", dark.checked ? "dark" : "light");
};
dark.addEventListener("click", change);
light.addEventListener("click", change);
onload = post;
