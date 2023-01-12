// swiper carrousel 

const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

// js

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
const cierraSesion= document.querySelector("#cierra-sesion");
const userIncorrecto= document.querySelector("#incorrecto");
const containerProductos= document.querySelector(".productos");
const todosProductos= document.querySelector("#todos");
const buzos= document.querySelector("#buzos");
const camperas= document.querySelector("#camperas")
const remeras= document.querySelector("#remeras");
const pantalones= document.querySelector("#pantalones");
const carrito= document.querySelector("#carrito");
const contacto= document.querySelector("#contacto");
const interruptor= document.querySelector(".interruptor")
const main=document.querySelector(".main")
const productosTitulo=document.querySelector("#todos-productos")
const aside=document.querySelector(".aside");
const body=document.querySelector("body");
const modo=document.querySelector("#modo");
const modoCheckbox= document.querySelector("#toggle")
const ingreso=document.querySelector(".butonBody")
const ofertas= document.querySelector("#ofertas")
const swiperFondo= document.querySelector(".swiper")



ingreso.onclick=()=>{
    swiperFondo.style.display="none"
}

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
    if( (inputUsuario.value!="" && inputPass.value!="") && (inputUsuario.value.match(/[A-Z]/) && inputPass.value.match(/[A-Z]/)) ){
        registrarLocalStorage(inputUsuario.value,inputPass.value);
        registrarLogin.style.display="none";
        bodyEcomercce.style.display="block";
        nombreUser.innerText=inputUsuario.value;
        registrarLocalStorage("inicio",true);
        registrarLocalStorage("nombre",inputUsuario.value)
        todosProductos.classList.add("elegido")

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
        registrarLocalStorage("inicio",true);
        registrarLocalStorage("nombre",userRegistrado.value)
        todosProductos.classList.add("elegido")
    }else if(comprobarLocalStorage(userRegistrado.value)!= passRegistrado.value ){
        userIncorrecto.style.display= "flex"
        userRegistrado.style.border= "2px solid red";
        passRegistrado.style.border= "2px solid red";

    }
 }


// funcion para cerrar sesion 
 cierraSesion.onclick= (evento)=>{
    evento.preventDefault();
    bodyEcomercce.style.display="none";
    registrarLogin.style.display="flex";
    userRegistrado.value="";
    passRegistrado.value="";
    inputUsuario.value="";
    inputPass.value="";
    localStorage.removeItem("inicio");
    localStorage.removeItem("nombre");
    todosProductos.classList.remove("elegido");
    localStorage.removeItem("modo")
    validarModoOscuro(comprobarLocalStorage("modo"))
    
}

//funcion para validar si hay una sesion iniciada 

function validacion(clave){
    if(clave== true){
        registrarLogin.style.display="none";
        iniciarRegistrado.style.display="none";
        bodyEcomercce.style.display="block";
        nombreUser.innerText= comprobarLocalStorage("nombre")
        todosProductos.classList.add("elegido")
        swiperFondo.style.display="none"
    } else{
        registrarLogin.style.display="block"
        localStorage.removeItem("modo")
    }
}

validacion(comprobarLocalStorage("inicio"))


//trayendo elementos al dom desde un archivo.json

function productosHtml(func){
    containerProductos.innerHTML=""
    fetch(func)
        .then(resp => resp.json())
        .then(data =>{
            data.forEach(prod=>{
                const divContainer= document.createElement("div")
                divContainer.className="container-producto"
                divContainer.id=`producto-${prod.id}`
                divContainer.innerHTML=`
                <img src=${prod.imagen} alt=${prod.nombre}>
                <div id="body-producto">
                <h3>${prod.nombre}</h3>
                <h4>$${prod.precio}</h4>
                </div>
                <div class="cont-button">
                <button class="btn-agregar" id="button-${prod.id}">AGREGAR</button>
                </div>
                `
                containerProductos.appendChild(divContainer)
                
                alCarrito(data,carritoDeCompras)

            })
        })
    .catch((err) => console.log("err"))
}

productosHtml("/js/productos.json")


//agregando y sacando estilos segun que categoria este seleccionada

todosProductos.onclick=()=>{
    todosProductos.classList.add("elegido");
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")
    productosHtml("/js/productos.json")
    productosTitulo.innerText="Todos los Productos"
}

camperas.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.add("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")
    agregaSecciones("campera")
    productosTitulo.innerText="Camperas"
}

buzos.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.add("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")
    agregaSecciones("buzo")
    productosTitulo.innerText="Buzos"
      
}

remeras.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.add("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")
    agregaSecciones("remera")
    productosTitulo.innerText="Remeras"
}

pantalones.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.add("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")
    agregaSecciones("pantalon")
    productosTitulo.innerText="Pantalones"
}

carrito.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.add("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.remove("elegido")

}

contacto.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.add("elegido")
    ofertas.classList.remove("elegido")
}

ofertas.onclick= ()=>{
    todosProductos.classList.remove("elegido")
    camperas.classList.remove("elegido")
    buzos.classList.remove("elegido")
    remeras.classList.remove("elegido")
    pantalones.classList.remove("elegido")
    carrito.classList.remove("elegido")
    contacto.classList.remove("elegido")
    ofertas.classList.add("elegido")
    agregaSecciones(ofertas,true)
    productosTitulo.innerText="Productos con 50% de DESCUENTO"


}

//modo oscuro


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


// validacion modo oscuro (si modo oscuro fue activado, cuando recargamos la pagina seguira estando)

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


// agregamos los productos segun su seccion, si el producto tiene oferta true, entonces tendra un 50% de decuento en su precio

function agregaSecciones(tipo,esOferta){
    fetch("/js/productos.json")
    .then(resp => resp.json())
    .then(data =>{
        const retorno = data.filter(ele =>{
            return ele.categoria==tipo || ele.oferta==esOferta
        })
        containerProductos.innerHTML=""
        retorno.forEach(prod=>{
            prod.oferta==true? prod.precio = prod.precio/2 : prod.precio
            const divContainer= document.createElement("div")
                divContainer.className="container-producto"
                divContainer.id=`producto-${prod.id}`
                divContainer.innerHTML=`
                <img src=${prod.imagen} alt=${prod.nombre}>
                <div id="body-producto">
                <h3>${prod.nombre}</h3>
                <h4>$${prod.precio}</h4>
                </div>
                <div class="cont-button">
                <button class="btn-agregar" id="button-${prod.id}">AGREGAR</button>
                </div>
                `
                containerProductos.appendChild(divContainer)
                
                alCarrito(data,carritoDeCompras)
        })
    })
    .catch(err => console.log("errSecciones"))
}


// carrito 

let carritoDeCompras=[]


function alCarrito(data,carrito){
    const btnAlCarro= document.querySelectorAll(".btn-agregar")
    btnAlCarro.forEach(e =>{
        e.onclick=()=>{
            const recorte= e.id.slice(7)
            const filtro=(data).find(element =>{
                return element.id == recorte
            })
            carrito.push(filtro)
            console.log(carrito)
            localStorage.setItem("carro",JSON.stringify(carrito))
        }
    })
    
}

const carritoCargado=JSON.parse(localStorage.getItem("carro"))
carritoDeCompras=carritoCargado