const nombreUser = document.querySelector("#nombre-user")
const cantidadProductos= document.querySelector("#cantidad")
const precioIndividual= document.querySelector("#precio-individual")
const comprar= document.querySelector(".comprar")
const cuantosProductos= document.querySelector(".span-carrito")

const totalFinal= document.querySelectorAll("#total")
const interruptor= document.querySelector(".interruptor")
const productosTitulo=document.querySelector("#todos-productos")
const aside=document.querySelector(".aside");
const main=document.querySelector(".main")
const body=document.querySelector("body");
const modoCheckbox= document.querySelector("#toggle")
const contenedorJs= document.querySelector("#container-js")
const vaciar= document.querySelector(".vaciar")
const precioTotal = document.querySelector("#total-final")


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

productosCarro= JSON.parse(localStorage.getItem("carro"))



let precioFinal=[] // variable para sumar el precio final sumando el precio de todos los productos

function agregar(arr){
    
    arr.forEach(element => {      
        const contenedor= document.createElement("div")
        contenedor.className="productos-carrito"
        contenedor.innerHTML=`
        <div class="izq">
        <i class="bi bi-x-circle boton-eliminar" id="boton-${element.id}"></i>
        <img src=/${element.imagen} alt="">
        </div>
        <h2>${element.nombre}</h2>
        <div class="precio">
            <p>Precio: $</p>
            <p id="precio-individual">${element.precio}</p>
        </div>
        `
        contenedorJs.appendChild(contenedor)
        precioFinal.push(element.precio)
    });
}
agregar(productosCarro || [])

function borrarDelCarrito (array) {
    const botonBorrar = document.querySelectorAll(".boton-eliminar")    
    botonBorrar.forEach( boton => {
        boton.onclick = () => {
            contenedorJs.innerHTML=""
            const id = boton.id.slice(6)            
            const filtrarProducto = array.filter((elemento, i) => {
                return elemento.id != Number(id)
            })
            productosCarro = filtrarProducto            
            localStorage.setItem("carro", JSON.stringify(productosCarro))   
            agregar(productosCarro)
            borrarDelCarrito(productosCarro)          
            registrarLocalStorage("cuantos",productosCarro.length)
            sinProductos()
            //para obtener el precio final del carrito
            total= productosCarro.map(e=>{
                const nada= 0
                return nada + e.precio
            })
            let precioFinal = total.reduce((a, b) => a + b, 0);
            precioTotal.innerText="Total: $"+precioFinal
            comprobar()
        }
        
    })
}




borrarDelCarrito(productosCarro)


//eliminando todos los productos del carrito y del ls
vaciar.onclick=()=>{
    registrarLocalStorage("carro",[])
    contenedorJs.innerHTML=""
    localStorage.setItem("cuantos",0)
    sinProductos()
}



const sinProductos=()=>{
    if (comprobarLocalStorage("carro").length==0  ){
        const contenedor= document.createElement("div")
        contenedor.className="productos-vacios"
        contenedor.innerHTML=`
        <p>El carrito de compras se encuentra vacio. <i class="bi bi-cart"></i>
        </p>
        `
        contenedorJs.appendChild(contenedor)
        precioTotal.innerText="Total: $"+0
    }
}
sinProductos()


// para que el precio final del carrito este cargado siempre que entremos sin modificar productos
let precioAPagar=0

    const cuantoPago=()=>{
        precioFinal.forEach(e=>{
            precioAPagar+= e
        })
        precioTotal.innerText="Total: $"+precioAPagar

    }
    cuantoPago()


//cuando compramos los productos:    
comprar.onclick=()=>{
    
    if(productosCarro.length >= 1){
        registrarLocalStorage("carro",[])
        contenedorJs.innerHTML=""
        localStorage.setItem("cuantos",0)
        sinProductos()
        Swal.fire({
        title: '¡Compra realizada!',
        text: 'Nos contactaremos a la brevedad para concretar el pago, Gracias.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
        })
        
    }
  
}

const comprobar = ()=>{
    cuantosProductos.innerText=comprobarLocalStorage("cuantos")
}
comprobar()


