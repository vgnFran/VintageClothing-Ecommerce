const nombreUser = document.querySelector("#nombre-user")
const cantidadProductos= document.querySelector("#cantidad")
const precioIndividual= document.querySelector("#precio-individual")
const totalProductos= document.querySelector(".total-producto")
const totalFinal= document.querySelectorAll("#total")


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


cantidadProductos.onclick=()=>{

    let nuevoprecio= parseInt(precioIndividual.textContent)
    totalProductos.textContent=nuevoprecio*cantidadProductos.value
}

fetch("/productos.json")
    .then(resp => resp.json())
    .then(data =>{
        console.log(data)
        data.forEach(prod =>{
            console.log(prod)
        })
    })