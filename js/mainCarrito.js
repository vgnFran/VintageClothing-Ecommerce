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

const bodyCarrito= document.querySelector(".body-ecomercce")
const bodyCard= document.querySelector(".container-card")
const cerrar= document.querySelector("#close")

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
        <img src=../${element.imagen} alt="">
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


//cuando decidimos comprar los productos, se nos habilita la compra con tarjeta   
comprar.onclick=()=>{
    
    if(productosCarro.length >= 1){
        bodyCarrito.style.display="none"
        bodyCard.style.display="flex"
    }
  
}





// completando datos de tarjeta y validando los inputs
const nombreTarjeta= document.querySelector("#name")
const pTarjeta= document.querySelector("#p-tarjeta")
let validacionNombre= false 
nombreTarjeta.oninput=()=>{
    if(nombreTarjeta.value =="" || nombreTarjeta.value.length <2 || nombreTarjeta.value.match( /[0123456789!"#$%&/()?¡@/*-+.]/ )){
        nombreTarjeta.style.border="1px solid red"
        pTarjeta.innerText="Nombre Incorrecto"
    }else{
        pTarjeta.innerText = nombreTarjeta.value
        nombreTarjeta.style.border="1px solid green"
        validacionNombre=true
    }
    
} 


const apellidoTarjeta= document.querySelector("#surname")
const pApellido=document.querySelector("#p-apellido")
let validacionApellido= false
apellidoTarjeta.oninput=()=>{
    if(apellidoTarjeta.value =="" || apellidoTarjeta.value.length <2 || apellidoTarjeta.value.match( /[0123456789!"#$%&/()?¡@/*-+.]/ )){
        apellidoTarjeta.style.border="1px solid red"
        pApellido.innerText="Nombre Incorrecto"
    }else{
        pApellido.innerText = apellidoTarjeta.value
        apellidoTarjeta.style.border="1px solid green"
        validacionApellido=true
    }
  
} 


const numeroTarjeta= document.querySelector("#numero-tarjeta")
const pNumero= document.querySelector("#p-numero")
let validacionNumero= false
numeroTarjeta.oninput=()=>{
    if(numeroTarjeta.value=="" || numeroTarjeta.value.length >16){
        numeroTarjeta.style.border="1px solid red"
        pNumero.innerText="Numero Incorrecto"
    }else{
        pNumero.innerText=espaciar()
        numeroTarjeta.style.border="1px solid green"
        validacionNumero=true
    }   
}
const espaciar=()=>{
    const espaciado=[...numeroTarjeta.value]
    espaciado.splice(4,0," ")
    espaciado.splice(9,0," ")
    espaciado.splice(14,0," ")
    const resultado= espaciado.join("")
    return resultado
}


const numeroVencimiento= document.querySelector("#vencimiento")
const pVencimiento= document.querySelector("#p-vencimiento")
let validacionVencimiento=false

//validacion mes y año, para poder validar el input fecha de vencimiento
const anioActual = String (new Date().getFullYear())
const anio= anioActual.slice(2)
let mesActual= String (new Date().getMonth())

numeroVencimiento.oninput=()=>{
    if(numeroVencimiento.value.slice(0,2) < mesActual || numeroVencimiento.value.slice(0,2) >12){
        pVencimiento.innerText="Fecha incorrecta"       
    } else if(numeroVencimiento.value.slice(2) < anio){
        pVencimiento.textContent="Fecha incorrecta"
    }else{
        pVencimiento.innerText=agregarBarra()
        validacionVencimiento=true
    }
}
const agregarBarra= ()=>{
    const separado=[...numeroVencimiento.value]
    separado.splice(2,0,"/")
    const resultado= separado.join("")
    return resultado
}


const codigoSeguridad= document.querySelector("#cvv")
const pCodigoSeguridad= document.querySelector("#p-cvv")
let validacionCvv= false
codigoSeguridad.oninput=()=>{
    if(codigoSeguridad.value.length <3 || codigoSeguridad.value.length >3){
        pCodigoSeguridad.textContent="CVV Incorrecto"
    }else{
        pCodigoSeguridad.innerText=codigoSeguridad.value
        validacionCvv=true
    }
}


// si todos los datos son correctos, realizamos la compra correctamente, borrando y modificando todos los articulos que anteriormente se encontraban en el carrito
const compraRealizada= document.querySelector("#compra-realizada")
compraRealizada.onclick=()=>{
    datosCorrectos()  
}

const datosCorrectos=()=>{
    if(validacionNombre==true && validacionApellido==true && validacionNumero==true && validacionVencimiento==true && validacionVencimiento==true){
        Swal.fire({
        title: '¡Compra realizada!',
        text: 'Nos contactaremos a la brevedad para enviar su factura, Gracias.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
        })
        cuantosProductos.innerText="0"
        bodyCarrito.style.display="block"
        bodyCard.style.display="none"
        registrarLocalStorage("carro",[])
        contenedorJs.innerHTML=""
        localStorage.setItem("cuantos",0)
        sinProductos()
    }
}
























cerrar.onclick=()=>{
    bodyCarrito.style.display="block"
    bodyCard.style.display="none"
}

const comprobar = ()=>{
    cuantosProductos.innerText=comprobarLocalStorage("cuantos")
}
comprobar()




