const form= document.querySelector("#form-contacto")
const inputNombre= document.querySelector("#nombre-input")
const inputApellido= document.querySelector("#apellido-input")
const inputEmail= document.querySelector("#email-input")
const inputTelefono= document.querySelector("#telefono-input")
const inputDudas= document.querySelector("#dudas-input")



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