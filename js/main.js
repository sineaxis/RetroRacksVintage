document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector("#btn-menu");

  btnMenu.addEventListener("click", (e) => {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("close");
  });
});
