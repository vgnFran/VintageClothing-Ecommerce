const form= document.querySelector("#form-contacto")
const inputNombre= document.querySelector("#nombre-input")
const inputApellido= document.querySelector("#apellido-input")
const inputEmail= document.querySelector("#email-input")
const inputTelefono= document.querySelector("#telefono-input")
const inputDudas= document.querySelector("#dudas-input")

const nombreUser = document.querySelector("#nombre-user")
const cantidadProductos= document.querySelector("#cantidad")
const precioIndividual= document.querySelector("#precio-individual")
const cuantosProductos= document.querySelector(".span-carrito")

const totalFinal= document.querySelectorAll("#total")
const interruptor= document.querySelector(".interruptor")
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


form.onsubmit=(e)=>{
     e.preventDefault()
    validacionNames()
    validacionEmail()
    validacionTelefono()
    validacionDudas()
   if (validacionNames() && validacionEmail() && validacionTelefono() && validacionDudas()){
    Swal.fire({
        title: 'Gracias por enviarnos tus datos.',
        text: 'Nos contactaremos a la brevedad.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    inputNombre.value=""
    inputApellido.value=""
    inputEmail.value=""
    inputTelefono.value=""
    inputDudas.value=""
    inputNombre.style.border="1px solid lightgrey"
    inputApellido.style.border="1px solid lightgrey"
    inputEmail.style.border="1px solid lightgrey"
    inputTelefono.style.border="1px solid lightgrey"
    inputDudas.style.border="1px solid lightgrey"
   }
}

const validacionNames= ()=>{
    if (inputNombre.value==""){
        inputNombre.style.border="1px solid red"
    }else if( inputApellido.value ==""){
        inputApellido.style.border="1px solid red"
    }
    else {
        inputNombre.style.border="1px solid green"
        inputApellido.style.border="1px solid green"
        return true
    }
}

const validacionEmail=()=>{
    if(inputEmail.value.match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i)){
        inputEmail.style.border="1px solid green"   
        return true
    }else {
        inputEmail.style.border="1px solid red"
    }
}

const validacionTelefono=()=>{
    if( (inputTelefono.value.length>=8) && (inputTelefono.value.match( /^[0-9]+$/)) ){
        inputTelefono.style.border="1px solid green"
        return true
    }else {
        inputTelefono.style.border="1px solid red"
    }
}

const validacionDudas=()=>{
    if (inputDudas.value.length>=4){
        inputDudas.style.border="1px solid green"
        return true
    }else{
        inputDudas.style.border="1px solid red"
    }
}


// modo oscuro
interruptor.onclick= ()=>{
    // productosTitulo.classList.toggle("modo-oscuro")
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
        // productosTitulo.classList.add("modo-oscuro")
        aside.classList.add("modo-oscuro")
        main.classList.add("modo-oscuro-main")
        body.classList.add("modo-oscuro")
        modoCheckbox.checked=true

    }else {
        // productosTitulo.classList.remove("modo-oscuro")
        aside.classList.remove("modo-oscuro")
        main.classList.remove("modo-oscuro-main")
        body.classList.remove("modo-oscuro")
        modoCheckbox.checked=false
    }


}

validarModoOscuro(comprobarLocalStorage("modo"))


const comprobar = ()=>{
    cuantosProductos.innerText=comprobarLocalStorage("cuantos")
}
comprobar()