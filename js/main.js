document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector("#btn-menu");

  btnMenu.addEventListener("click", (e) => {
    const menu = document.querySelector("#menu");
    menu.classList.toggle("close");
  });

  function getFilterFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("filter");
  }

  function showFilteredProducts(filter) {
    const products = document.querySelectorAll(".product");
    products.forEach((product) => {
      const category = product.dataset.category;
      if (!filter || category === filter) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  }
  // Comprobamos que la url tiene filtro
  const params = new URLSearchParams(window.location.search);
  // Si tiene filtro, lo usamos
  if (params.has("filter")) {
    const filter = getFilterFromURL();
    document.getElementById(filter).classList.toggle("active");
    showFilteredProducts(filter);
  }
});
