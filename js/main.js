
// Inicializo el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



// Función para comprar en base a la id de la misma

function comprarPizza(pizzaId) {
  const pizzaIndex = carrito.findIndex((pizza) => pizza.id === pizzaId);

  if (pizzaIndex !== -1) {
    // Si la pizza ya está en el carrito, aumenta la cantidad en 1
    carrito[pizzaIndex].cantidad++;
    // Al añadir un producto al carrito, le aparece un alerta esteticamente buena. 
    Toastify({

      text: "Añadido al carrito",
      
      duration: 3000
      
      }).showToast();
  } else {
    // Si la pizza no está en el carrito, agrega con cantidad 1
    const pizza = prodPizzas.find((pizza) => pizza.id === pizzaId);
    carrito.push({
      id: pizza.id,
      nombre: pizza.nombre,
      precio: pizza.precio,
      ingredientes: pizza.ingredientes,
      cantidad: 1,
    });
  }

  console.log(carrito);
  //Lo guarda en el localstorage
  saveLocal();
}

// Le asigno un evento a cada boton de compra
document.getElementById("comprarMargarita").addEventListener("click", () => comprarPizza(1));
document.getElementById("comprarHawaiana").addEventListener("click", () => comprarPizza(2));
document.getElementById("comprarDiavola").addEventListener("click", () => comprarPizza(3));
document.getElementById("comprarPrimavera").addEventListener("click", () => comprarPizza(4));
document.getElementById("comprarFunghi").addEventListener("click", () => comprarPizza(5));
document.getElementById("comprarProsciutto").addEventListener("click", () => comprarPizza(6));
document.getElementById("comprarCalzone").addEventListener("click", () => comprarPizza(7));
document.getElementById("comprar4estaciones").addEventListener("click", () => comprarPizza(8));
document.getElementById("comprar4quesos").addEventListener("click", () => comprarPizza(9));






/* Boton carrito */
const modalContainer = document.getElementById("modal-container");
const botonCerrar = document.createElement("h1")

//------------------
let BtnCarrito = document.getElementById("BtnCarrito");
//------------------
//Le doy una funcionalidad al boton de carrito
const pintarCarrito = () =>{
  modalContainer.innerHTML = "";
  modalContainer.style.display = "inline-block";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
  <h1 class="modal-header-title">Carrito</h1>
  `;
  modalContainer.append(modalHeader);
//Boton de cerrar carrito
  const botonCerrar = document.createElement("h1")
  botonCerrar.innerText = "x";
  botonCerrar.className = "modal-header-button"

  botonCerrar.addEventListener("click", () => {
    modalContainer.style.display = "none";
    
  })

  modalHeader.append(botonCerrar);


  carrito.forEach((product, index) => {
    let carritoContent = document.createElement("div");
   carritoContent.className = "modal-container";
   carritoContent.innerHTML = `
     <h3>${product.nombre}</h3>
     <p>$${product.precio}</p>
     <p>Cantidad: ${product.cantidad}
     <p>Total: ${product.cantidad * product.precio}</p>
     `;

   modalContainer.append(carritoContent)

   
   let eliminarProd = document.createElement("button");
   eliminarProd.className = "button";
   eliminarProd.innerHTML = '<svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>';

   eliminarProd.setAttribute("data-id", index);
   carritoContent.appendChild(eliminarProd);
   
   eliminarProd.addEventListener("click", function(event) {
       const id = event.target.getAttribute("data-id");
       eliminarPizza(id);
   });
   
 })

//Muestra el pie del carrito donde se muestra el total de la compra
 const totalCompra = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
 const totalCompraContainer = document.createElement("div")
 totalCompraContainer.className = "total-content"
 totalCompraContainer.innerHTML =` <h6>TOTAL A PAGAR: </h6>${totalCompra} <br> <p></p> <button class="btnTotal" id="btnTotal">
 <span class="shadow"></span>
 <span class="edge"></span>
 <span class="front text"> Ordenar
 </span>
</button>`;
 modalContainer.append(totalCompraContainer)

  const btnTotal = document.querySelector('#btnTotal')
  btnTotal.addEventListener("click", () => {
    console.log("Botón de total presionado");
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Pedido exitosamente',
      showConfirmButton: false,
      timer: 1500
    });
  });
 
}
//------------------------------------------------------------------------------
// Boton del carrito, al presionarlo se muestra el mismo
BtnCarrito.addEventListener("click", pintarCarrito)

// Funcion para eliminar un producto segun la id, pintarCarrito actualiza el carrito mostrando los productos finales, y por ultimo lo guarda en el localStorage
const eliminarPizza = (id) => {
   carrito.splice(id, 1);
   pintarCarrito();
   saveLocal();
};

//-----------------------------------------------------------------------------

const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


//------------------------------------------------------------------------------

























let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
  const minPerSlide = 5
  let next = el.nextElementSibling
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0]
    }
    let cloneChild = next.cloneNode(true)
    el.appendChild(cloneChild.children[0])
    next = next.nextElementSibling
  }
})
