const nombreUser = document.querySelector("#nombre-user")
const cantidadProductos= document.querySelector("#cantidad")
const precioIndividual= document.querySelector("#precio-individual")
const totalProductos= document.querySelector(".total-producto")
const totalFinal= document.querySelectorAll("#total")
const interruptor= document.querySelector(".interruptor")
const productosTitulo=document.querySelector("#todos-productos")
const aside=document.querySelector(".aside");
const main=document.querySelector(".main")
const body=document.querySelector("body");
const modoCheckbox= document.querySelector("#toggle")
const contenedorJs= document.querySelector("#container-js")


const registrarLocalStorage = (clave,valor) =>{
    localStorage.setItem(clave,JSON.stringify(valor))
}


const comprobarLocalStorage = ( clave ) => {
    return JSON.parse(localStorage.getItem(clave))
}



//validar nombre de usuario que inicio sesion
const cargarCarrito=()=>{
    document.body.onload=()=>{
        const nombre= comprobarLocalStorage("nombre")      
        nombreUser.textContent= nombre
    }
}
cargarCarrito()


// cantidadProductos.onclick=()=>{

//     let nuevoprecio= parseInt(precioIndividual.textContent)
//     totalProductos.textContent=nuevoprecio*cantidadProductos.value
// }

// modo oscuro
interruptor.onclick= ()=>{
    productosTitulo.classList.toggle("modo-oscuro")
    aside.classList.toggle("modo-oscuro")
    main.classList.toggle("modo-oscuro-main")
    body.classList.toggle("modo-oscuro")
    registrarLocalStorage("modo","oscuro")
    if(modoCheckbox.checked==true){
        localStorage.removeItem("modo")
    }
}

// validacion modo oscuro

function validarModoOscuro(clave){
    if  (clave=="oscuro"){
        productosTitulo.classList.add("modo-oscuro")
        aside.classList.add("modo-oscuro")
        main.classList.add("modo-oscuro-main")
        body.classList.add("modo-oscuro")
        modoCheckbox.checked=true

    }else {
        productosTitulo.classList.remove("modo-oscuro")
        aside.classList.remove("modo-oscuro")
        main.classList.remove("modo-oscuro-main")
        body.classList.remove("modo-oscuro")
        modoCheckbox.checked=false
    }


}

validarModoOscuro(comprobarLocalStorage("modo"))

//trayendo los productos del carrito subidos al ls

const productosCarrito= JSON.parse(localStorage.getItem("carro"))


function delLsAlDom(){
    productosCarrito.forEach(prod=>{
        const contenedorCarrito= document.createElement("div")
        contenedorCarrito.classList.add("productos-carrito")
        contenedorCarrito.innerHTML=`
        <div class="close">
            <i class="bi bi-x-circle"></i>
        </div>

        <img src=/${prod.imagen} alt="${prod.nombre}">
        <h2>${prod.nombre}</h2>
        <div class="precio">
            <p>Precio: $</p>
            <p id="precio-individual">${prod.precio}</p>
        </div>
        <div class="cantidad">
            <p>Cantidad</p>
            <input type="number" id="cantidad">
        </div>
        <div class="total">
            <p>Total:$</p>
            <p class="total-producto" id="total">12000</p>
        </div>
        `
        contenedorJs.appendChild(contenedorCarrito)
    })
}

delLsAlDom()

