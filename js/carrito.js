
let datos = JSON.parse(localStorage.getItem("CARRITO")); //carga datos almacenados en el carrito

if(!datos) 
{
  myCarrito = new Carrito([]);
}
else
{
  myCarrito = new Carrito(datos);
}


function iniciarCarrito(){

  fetch('../json/productosData.json')
.then((r)=>r.json())
.then((data)=>{productos=data});

  mostrarCarrito();
  myCarrito.cantidadCarrito();

}

function mostrarCarrito()
{

  const nodoCarrito = document.querySelector("#carritoWrapper");
  nodoCarrito.innerHTML="";
  

  let total=0;

  const product = myCarrito.productos;
  
  product.forEach((el)=> {

    let cadena="";
    let subTotal = el.producto.costo*el.cantidad
    cadena+=`<div class="row carritoItem">
              <div class="col-3 p-1">
                <img src="${el.producto.img}" alt="${el.producto.nombre}" class="img-thumbnail">    
              </div>
              <div class="col-6 d-flex flex-column text-left align-items-start">
                  <p>${el.producto.nombre}</p>
                  <p>$ ${subTotal.toLocaleString()}</p>
              </div>
              <div class="container col-3"> 
                <div class="row align-items-center align-middle">
                  <button class="eliminarBtn btn btn-outline-dark col" onclick="myCarrito.removerItem(${el.producto.id});myCarrito.cantidadCarrito();"><i class="fa-solid fa-minus"></i></button>
                  <p class="cantidadCarrito col text-center">${el.cantidad}</p>         
                  <button class="agregarBtn col desdeCarrito" onclick="sumarUno(${el.producto.id});myCarrito.cantidadCarrito();"><i class="fa-solid fa-plus"></i></i></button>
                </div>
              </div>
            </div>`;  
    nodoCarrito.innerHTML+=cadena;
    total+=subTotal;
    });

  const nodoTotal = document.createElement("h4");
  nodoTotal.setAttribute("id", "totalCarrito");
  nodoTotal.innerHTML=`Total: $ ${total.toLocaleString()}`;
  nodoCarrito.appendChild(nodoTotal);
 
}


function sumarUno(item) 
{

  let idProductos = productos.map(el=>el.id);
  let i = idProductos.findIndex(el=>el===item);
  let producto = productos[i]; //objeto
  myCarrito.agregar(producto); 
  myCarrito.guardar();


}

function pagar()
{
  // guardar en el localStorage 

}
