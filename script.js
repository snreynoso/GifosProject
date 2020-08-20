//const darkSelector = document.getElementById("darkSelector");

const darkSelector = document.querySelector("#darkSelector");

darkSelector.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
