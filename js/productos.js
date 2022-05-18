/* let datos = JSON.parse(localStorage.getItem("CARRITO")); //carga datos almacenados en el carrito */

if(!datos) 
{
  myCarrito = new Carrito([]);
}
else
{
  myCarrito = new Carrito(datos);
}
let productos = "";

fetch('../json/productosData.json')
.then((r)=>r.json())
.then((data)=> {productos=data});

// Ejecución del simulador 
function iniciarProductos() {
    
  mostrarBotones();
  mostrarFiltro();

}

function mostrarBotones() {

  let nodoBotones = document.querySelector("#nodoBotones");
  if(nodoBotones===null) 
  {
    const nodoRow = document.querySelector("#tiendaWrapper");
    const nodoBotones = document.createElement("div");
    nodoBotones.setAttribute("class", "row");
    nodoBotones.setAttribute("id", "nodoBotones");
    nodoRow.appendChild(nodoBotones);
    categoriasMenu.forEach((el)=>{

      const myBtn = document.createElement("div");
      myBtn.setAttribute("class", "col-12 col-sm-6 col-lg-3 mt-4");
      myBtn.innerHTML=`<button type="button" class="btn btn-outline-light prd-links" onclick="mostrarProductos(${el.clase});">${el.nombre}</button>`;
      document.querySelector("#nodoBotones").appendChild(myBtn);
    });
  }                   
}

function mostrarFiltro() {
  
  const nodoSelect = document.getElementById("nodoSelect");
  if(nodoSelect===null)
  {
    const nodoContainer = document.querySelector("#filterWrapper");
    const nodoForm= document.createElement("form");
    nodoForm.setAttribute("id", "nodoForm");
    
    nodoForm.innerHTML=`<select class="form-select-sm form-select" id="nodoSelect" name="nodoSelect" onchange="ordenar();">
                          <option selected>Ordenar por</option>
                          <option value="1">Precio (mayor a menor)</option>
                          <option value="2">Precio (menor a mayor)</option>
                        </select>`;
    nodoContainer.appendChild(nodoForm);
  }
}

let claseElegida = "";
//////MOSTRAR PRODUCTOS
function mostrarProductos(clase) //clase del boton presionado
{
  claseElegida = clase;
  const nodoProductos = document.querySelector("#productosWrapper");
  nodoProductos.innerHTML="";
  let prod ="";
  if(clase===0)
  {
    prod = [...productos];
  }
  else {
    
    prod = productos.filter(el=>el.clase===clase);
  
  }

  prod.forEach((el)=> {

    const nodoItem = document.createElement("div");
    nodoItem.setAttribute("class", "col-lg-5 col-md-12 m-2 row align-items-center");
    nodoItem.innerHTML=`<div class="col-3 p-1">
                          <img src="${el.img}" alt="${el.nombre}" class="img-thumbnail">    
                        </div>
                        <div class="col-6">
                            <p>${el.nombre}</p>
                            <p>${el.precio}</p>
                        </div>
                        <div class="col-3 text-center"> 
                          <button class="agregarBtn btn btn-outline-dark d-inline-block m-0" onclick="agregarCarrito(${el.id});notificarCarrito();"><img src="../imgs/productos/masicon.png" class="masBtn"/>Agregar</button>   
                        </div>`;
    nodoProductos.appendChild(nodoItem);

    });
}

function notificarCarrito()
{
  myCarrito.cantidadCarrito();

  const iconoCarrito = document.querySelector("#carritoNumero").innerHTML;
  let nodoToast = document.querySelector(".toastMsj");
  if(nodoToast===null)
  {
    Toastify({
      text: `Ir a carrito de compra `,
      duration: -1,
      gravity: 'bottom',
      position: 'center',
      destination: "../carrito.html",
      className: 'toastMsj',
      style: {
        background: `white`,
        color: `black`
      },
    }).showToast();
   
  }
  else
  {
    const cantidadCarrito = document.querySelector("#toastCantidad");
    nodoToast.outerHTML="";

    Toastify({
      text: `${iconoCarrito} Ir a carrito de compra `,
      duration: -1,
      gravity: 'bottom',
      position: 'center',
      destination: "../carrito.html",
      className: 'toastMsj',
      style: {
        background: `white`,
        color: `black`
      },
    }).showToast();

  }

}

function ordenar()
{
  let e = document.getElementById("nodoSelect");
  let strUser = e.value;


  if(strUser==1)
  {
    productos.sort((a,b)=>  b.costo - a.costo);
    console.log(claseElegida);
    mostrarProductos(claseElegida);

  }
  else if(strUser==2)
  { 

    productos.sort((a,b)=> a.costo - b.costo);
    mostrarProductos(claseElegida);

  }
}

function buscar() 
{

  event.preventDefault();

  // Filtrar los productos de la categoria
  // Mostrar los productos
  let inp = document.querySelector("#myInput").value.toUpperCase();
  const productosFiltrados = productos.filter(producto=>producto.nombre.includes(inp));
  console.log(productosFiltrados);
  let cadena ='';
  productosFiltrados.forEach((el)=>{
    cadena+=` <div class="col-3 p-1">
                <img src="${el.img}" alt="${el.nombre}" class="img-thumbnail">    
              </div>
              <div class="col-6">
                <p>${el.nombre}</p>
                <p>${el.precio}</p>
              </div>
              <div class="col-3 d-inline align-middle"> 
                <button class="agregarBtn btn btn-outline-secondary" onclick="agregarCarrito(${el.id})"><img src="../imgs/productos/masicon.png" class="masBtn"/>Agregar</button>   
              </div>`;

    const nodoProductos = document.querySelector("#productosWrapper");
    nodoProductos.innerHTML=cadena;

  });

}
    
















////////////////////////////////////////////////////////////////////////////////////////////////777
//BOTONES SUBMENU
/*function subMenu(idBoton)
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



function agregarCarrito(productoId)
{ 

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

//---------------------
*/