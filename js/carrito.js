
let datos = JSON.parse(localStorage.getItem("CARRITO")); //carga datos almacenados en el carrito

if(!datos) 
{
  myCarrito = new Carrito([]);
}
else
{
  myCarrito = new Carrito(datos);
}

fetch('../json/data.json')
.then((r)=>r.json())
.then((data)=>{productos=data});


function iniciarCarrito(){

  mostrarCarrito();

}

function mostrarCarrito()
{

  const nodoCarrito = document.querySelector("#carritoWrapper");
  nodoCarrito.innerHTML="";
  

  let total=0;

  const product = myCarrito.productos;
  
  product.forEach((el)=> {
    let cadena="";
    let subTotal = el.producto.precio*el.cantidad
    cadena+=`<div class="row carritoItem">
              <div class="col-3 p-1">
                <img src="${el.producto.img}" alt="${el.producto.nombre}" class="img-thumbnail">    
              </div>
              <div class="col-6 d-flex flex-column text-left align-items-start">
                  <p>${el.producto.nombre}</p>
                  <p>${el.producto.precio}</p>
              </div>
              <div class="container col-3"> 
                <div class="row align-items-center align-middle">
                  <button class="eliminarBtn btn btn-outline-dark col" onclick="myCarrito.removerItem(${el.producto.id});"><i class="fa-solid fa-minus"></i></button>
                  <p class="cantidadCarrito col text-center">${el.cantidad}</p>         
                  <button class="agregarBtn col" onclick="myCarrito.agregar(${el.producto.id});notificarCarrito();"><i class="fa-solid fa-plus"></i></i></button>
                </div>
              </div>
            </div>`;  
    nodoCarrito.innerHTML+=cadena;
    total+=subTotal;
    });

  const nodoTotal = document.createElement("h4");
  nodoTotal.setAttribute("id", "totalCarrito");
  nodoTotal.innerHTML=`Total: $${total}`;
  nodoCarrito.appendChild(nodoTotal);
 
}


function agregarCarrito(productoId)
{ 

  let idProductos = productos.map(el=>el.id);
  let i = idProductos.findIndex(el=>el===productoId);
  let producto = productos[i]; //objeto
  myCarrito.agregar(producto); 
  myCarrito.guardar();
  
}

function pagar()
{
  // guardar en el localStorage 

}


/*
// Ejecución del simulador 
function iniciar() {
    
    menu();

}

function menu() {
  
  const nodoMenu = document.createElement("div");
  nodoMenu.setAttribute("id", "menu");
  document.body.appendChild(nodoMenu);

  categoriasMenu.forEach((el)=> {

      const myBtn = document.createElement("button");
      myBtn.setAttribute("class", "menuBtn")
      myBtn.innerHTML=el.nombre;
      document.querySelector("#menu").appendChild(myBtn);
      myBtn.addEventListener("click", ()=>{
        
        subMenu(el.nombre);
        seccion(el.seccion);
        mostrar(el.nombre);
        
      });

  });
  
}

//BOTONES SUBMENU
function subMenu(idBoton)
{
  let nodoSub = document.getElementById("subMenu"); 
  if(nodoSub===null)
  {
    const nodoSub = document.createElement("div");
    nodoSub.setAttribute("id", "subMenu");
    document.body.appendChild(nodoSub);
  }
  else 
  {
    nodoSub.innerHTML="";
  }

  const subArray = categoriaSub.filter(el=>el.categoria===idBoton); 
  subArray.forEach((el)=> {

      const mySub = document.createElement("button");
      mySub.setAttribute("class", "subBtn");
      mySub.innerHTML=el.nombre;
      document.querySelector("#subMenu").appendChild(mySub);
      mySub.addEventListener("click", ()=> {
        
        switch(el.id)
        {
          case 1: 
          buscar();
          break;

          case 2:
          ordenar();
          break;

          case 3:
          myCarrito.vaciar();
          break;

          case 4:
          myCarrito.remover();
          break;

          case 5:
          
          mySub.addEventListener("click", ()=>{
            if(myCarrito.producto!==0)
            {
            Swal.fire({
              title: `Desea finalizar la compra?`, 
              icon: 'info',    
              showCancelButton: true,  
            }).then((result)=>{
              if(result.isConfirmed)
              {
                  Swal.fire({
                  title: `Redireccionando al sitio de pago.`,
                  icon: 'success',
                });
                  
              }
              else{
                  Swal.fire(`Cancelado`);
              }         
            })
          }});
          break;
        }
      });

  });
}

let sum = 0;
function ordenar()
{
  
  if((sum % 2)===0)
  {
    const products = [...productos]
    products.sort((a,b)=> a.precio - b.precio);
    mostrarProductos(products);
    sum+=1
  }
  else {

    const products = [...productos]
    products.sort((a,b)=> b.precio - a.precio);
    mostrarProductos(products);
    sum+=1

  }
}

function buscar() 
{
  let nodoBuscar = document.querySelector("#formDiv");
  if(nodoBuscar===null)
  {
    const inputDiv = document.createElement("div");
    inputDiv.setAttribute("id", "formDiv");
    document.querySelector("#subMenu").appendChild(inputDiv);
  }
  else {
    
    nodoBuscar.innerHTML="";

  }
  
  let busc = document.querySelector("#formDiv");
  busc.innerHTML=`<form id="myForm">
                    <input type="text" id="myInput">
                    <input type="submit" value="Buscar" id="myInputBtn">
                  </form>`;
  nodoFormulario = document.querySelector("#myForm");
  nodoFormulario.addEventListener("submit", (event)=>filtrarProducto());

}

//SECCION
function seccion(idSeccion)
{

  let nodoSeccion = document.getElementById("seccion");
  if(nodoSeccion===null)
  {

    nodoSeccion = document.createElement("div");
    nodoSeccion.setAttribute("id", "seccion");
    document.body.appendChild(nodoSeccion);
    
  }
  else{

    nodoSeccion.innerHTML="";

  }

  
  const titulo = document.createElement("h3");
  titulo.innerHTML= idSeccion;
  nodoSeccion.appendChild(titulo);

}

//MOSTRAR
function mostrar(idMostrar)
{

  let nodoMostrar = document.getElementById("mostrar");
  if(nodoMostrar===null)
  {
    const nodoMostrar = document.createElement("div");
    nodoMostrar.setAttribute("id", "mostrar");
    document.body.appendChild(nodoMostrar);
  }
  else 
  {
    nodoMostrar.innerHTML="";
  }

  if(idMostrar==="PRODUCTOS")
  {
    mostrarProductos(productos);
  }
  else if(idMostrar==="CARRITO")
  {
    mostrarCarrito();
  }
}

//////MOSTRAR PRODUCTOS
function mostrarProductos (op)
{
  const nodoMostrar = document.querySelector("#mostrar");
  nodoMostrar.innerHTML="";
  /* if(nodoProductos.length==0)
  { 
  op.forEach((el)=> {

    let cadena="";
    if(el.stock>0)
    {
    cadena+=info(el);  
    nodoMostrar.innerHTML+=cadena;
    }
  
  });
  
  
}

function info(producto) 
{

  return `<div class="infoProducto">
            <ul>
              <img src="${producto.image}">
              <li>Producto: ${producto.categoria}</li>
              <li>Precio: $${producto.precio}</li>
              <li>Tamaño: ${producto.tamaño}ml</li>
              <button class="agregarBtn" onclick="agregarCarrito(${producto.id})">Agregar al carrito</button>
            </ul>
          </div>`

}

function agregarCarrito(productoId)
{ 
  console.log("Hola");
  let idProductos = productos.map(el=>el.id);
  let i = idProductos.findIndex(el=>el===productoId);
  let producto = productos[i]; //objeto
  myCarrito.agregar(producto); 
  myCarrito.guardar();
  Toastify({
      text: `${producto.categoria} agregado con exito!`,
      duration: 2000,
      gravity: 'bottom',
      position: 'right',
  }).showToast();


}

//////MOSTRAR CARRITO
function mostrarCarrito()
{

  const nodoMostrar = document.querySelector("#mostrar");
  nodoMostrar.innerHTML="";
  

  let total=0;

  const product = myCarrito.productos;
  
  product.forEach((prod)=> {
    let cadena="";
    let subTotal = prod.producto.precio*prod.cantidad
    cadena+=`<div class="infoProducto">
              <ul class="prodCarrito">
                <img src="${prod.producto.image}">
                <li>Producto: ${prod.producto.categoria}</li>
                <li>Volumen: ${prod.producto.tamaño}</li>
                <li>Unidades: ${prod.cantidad}</li>
                <li>Sub Total: $ ${subTotal}</li>
              </ul>
              <div>
                <button onclick="myCarrito.removerItem(${prod.producto.id})">Remover ítem</button>
              </div>`;  
    nodoMostrar.innerHTML+=cadena;
    total+=subTotal;
    });

  const nodoTotal = document.createElement("h4");
  nodoTotal.setAttribute("id", "totalCarrito");
  nodoTotal.innerHTML=`Total: $${total}`;
  nodoMostrar.appendChild(nodoTotal);
 
}

///
function filtrarProducto()
{
  event.preventDefault();
  // Filtrar los productos de la categoria
  // Mostrar los productos
  let inp = document.querySelector("#myInput").value.toUpperCase();
  const productosFiltrados = productos.filter(producto=>producto.categoria.includes(inp));
  
  let cadena ='';
  productosFiltrados.forEach((element)=>{
    cadena+=`<div class="infoProducto">
              <ul class="prodCarrito">
                <img src="${element.image}">
                <li>Nombre Producto: ${element.categoria}</li>
                <li>Precio Producto: ${element.precio}</li>
                <button onclick="agregarCarrito(${element.id})">Agregar al carrito</button>
              </ul>
            </div>`

    document.querySelector("#mostrar").innerHTML=cadena;
  });

}
*/
//---------------------
