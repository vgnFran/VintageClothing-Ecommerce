// const todos= document.querySelector("#todos")

// todos.addEventListener("click",()=>{
//     alert("click")
// })


const registrarLogin = document.querySelector("#registro-login");
const bodyEcomercce = document.querySelector("#ecomercce-body");
const formLogin= document.querySelector("#registrar");
const inputUsuario= document.querySelector("#nombre-input");
const inputPass= document.querySelector("#pass-input");
const nombreUser= document.querySelector("#nombre-user")
const iniciaSesion= document.querySelector("#iniciar-sesion")
const userRegistrado= document.querySelector("#nombre-registrado");
const passRegistrado= document.querySelector("#pass-registrado");
const iniciarRegistrado= document.querySelector("#iniciar-registrado")
const aIniciar= document.querySelector("#aIniciar");
const cierraSesion= document.querySelector("#cierra-sesion")

let usuario1={
    usuario:"Franco",
    contrasenia:"123456"
}


const registrarLocalStorage = (clave,valor) =>{
    localStorage.setItem(clave,JSON.stringify(valor))
}

formLogin.onsubmit= (evento)=>{
    evento.preventDefault()
    if(inputUsuario.value!="" && inputPass.value!=""){
        registrarLocalStorage(inputUsuario.value,inputPass.value);
        registrarLogin.style.display="none";
        bodyEcomercce.style.display="block";
        nombreUser.innerText=inputUsuario.value;
    }else if(inputUsuario.value==""){
        inputUsuario.style.border= "2px solid red"
    }
    else if(inputPass.value==""){
        inputPass.style.border= "2px solid red"
    }
}


aIniciar.onclick=(evento)=>{
    evento.preventDefault()
    registrarLogin.style.display="none";
    iniciarRegistrado.style.display="flex"
    
}

cierraSesion.onclick= (evento)=>{

}

iniciaSesion.onsubmit=(evento)=>{
    evento.preventDefault()
    if(userRegistrado.value==usuario1.usuario && passRegistrado.value==usuario1.contrasenia){
        iniciarRegistrado.style.display="none"
        bodyEcomercce.style.display="block"
        nombreUser.innerText=userRegistrado.value
    }else if(userRegistrado.value!= usuario1.usuario){
        userRegistrado.style.border= "2px solid red"
    }else if(passRegistrado.value != usuario1.contrasenia){
        passRegistrado.style.border= "2px solid red"
    }
}
