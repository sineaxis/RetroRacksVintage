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

  //Funcionalidad carrito
  const cartButton = document.getElementById("cart-button");
  const cartCount = document.getElementById("cart-count");
  const addButtons = document.querySelectorAll(".product button");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Actualizamos el contador del carrito
  const updateCartCount = () => {
    cartCount.textContent = cart.length;
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Cambiar texto del botón de Comprar
  const changeButtonToAdded = (button) => {
    button.textContent = "Añadido";
    button.classList.add("added-to-cart");
    setTimeout(() => {
      button.textContent = "Comprar";
      button.classList.remove("added-to-cart");
    }, 2500); // Reseteamos el texto después de 2,5 seg.
  };

  // Función para manejar la animación de volar al carrito
  const animateProduct = (productElement) => {
    const productImage = productElement.querySelector("img");
    const productRect = productImage.getBoundingClientRect();

    // Creamos clon de la imagen del producto comprado
    const clone = productImage.cloneNode();
    clone.classList.add("product-added-animation");
    document.body.appendChild(clone);

    // Obtenemos la posición del botón del carrito
    const cartRect = cartButton.getBoundingClientRect();

    // Posición actual del producto clonado
    clone.style.left = `${productRect.left + window.scrollX}px`;
    clone.style.top = `${productRect.top + window.scrollY}px`;
    clone.style.width = `${productRect.width}px`;
    clone.style.height = `${productRect.height}px`;

    // Calcular la distancia a moverse del clone del carrito
    const deltaX =
      cartRect.left +
      cartRect.width / 2 -
      (productRect.left + productRect.width / 2);
    const deltaY =
      cartRect.top +
      cartRect.height / 2 -
      (productRect.top + productRect.height / 2);

    // Aplicar animación de movimiento al clon para el carrito
    clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.5)`;
    clone.style.opacity = "1";

    // Quitar el clon después de que se complete la animación
    setTimeout(() => {
      document.body.removeChild(clone);
    }, 1000); // Quitamos el clon después de un seg.
  };

  // Añadiro producto al carrito
  const addToCart = (product) => {
    cart.push(product);
    updateCartCount();
  };

  // Añadir evento al botón de comprar
  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const productElement = e.target.closest(".product");

      // Animamos la imagen del producto volando al carrito
      animateProduct(productElement);

      // Cambiamos el texto del botón del carrito
      changeButtonToAdded(e.target);

      // Añadimos producto al carrito
      const product = {
        name: productElement.querySelector(".card-text p:nth-child(2)")
          .textContent,
        price: productElement.querySelector(".card-text p:nth-child(1)")
          .textContent,
        image: productElement.querySelector("img").src,
        category: productElement.getAttribute("data-category"),
      };
      addToCart(product);
    });
  });
  if (document.getElementById("products")) {
    updateCartCount();
  }
});
