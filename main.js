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
const userIncorrecto= document.querySelector("#incorrecto")


// datos de usuarios guardados en "base de datos en js"
let usuario1={
    usuario:"Franco",
    contrasenia:"123456"
}

const registrarLocalStorage = (clave,valor) =>{
    localStorage.setItem(clave,JSON.stringify(valor))
}


const comprobarLocalStorage = ( clave ) => {
    return JSON.parse(localStorage.getItem(clave))
}


// funcion para registrar usuario nuevo (guardado en localStorage)
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



// funcion que nos muestra un login para usuarios ya registrados (en nuestra base de datos o en localStorage)
aIniciar.onclick=(evento)=>{
    evento.preventDefault()
    registrarLogin.style.display="none";
    iniciarRegistrado.style.display="flex";

    
}


// funcion para iniciar sesion con usuarios ya registrados
iniciaSesion.onsubmit=(evento)=>{
    evento.preventDefault()
    if((comprobarLocalStorage(userRegistrado.value)==passRegistrado.value) || (userRegistrado.value == usuario1.usuario && passRegistrado.value ==usuario1.contrasenia ) ){
        iniciarRegistrado.style.display="none";
        bodyEcomercce.style.display="block";
        nombreUser.innerText=userRegistrado.value;

    }else if(comprobarLocalStorage(userRegistrado.value)!= passRegistrado.value ){
        userIncorrecto.style.display= "block"
        userRegistrado.style.border= "2px solid red";
        passRegistrado.style.border= "2px solid red";

    }
 }


// funcion para cerrar sesion 
 cierraSesion.onclick= (evento)=>{
    evento.preventDefault();
    bodyEcomercce.style.display="none";
    registrarLogin.style.display="block";
    userRegistrado.value="";
    passRegistrado.value="";
    inputUsuario.value="";
    inputPass.value="";
}