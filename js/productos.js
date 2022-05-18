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




// Ejecución del simulador 
function iniciarProductos() {
  
  fetch('../json/productosData.json')
  .then((r)=>r.json())
  .then((data)=> {productos=data;
  mostrarProductos(0);});

  mostrarBotones();
  mostrarFiltro();
  myCarrito.cantidadCarrito();

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
                          <button class="agregarBtn btn btn-outline-dark d-inline-block m-0" onclick="agregarCarrito(${el.id});notificarCarrito();"><i class="fa-solid fa-plus"></i>Agregar</button>   
                        </div>`;
    nodoProductos.appendChild(nodoItem);

    });
}

function agregarCarrito(productoId)
{ 
  let idProductos = productos.map(el=>el.id);
  let i = idProductos.findIndex(el=>el===productoId);
  let producto = productos[i]; //objeto
  myCarrito.agregar(producto); 
  myCarrito.guardar();
  
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
  console.log(productos);
  console.log(productosFiltrados);
  let cadena ='';
  productosFiltrados.forEach((el)=>{
    cadena+=`<div class="col-3 p-1">
              <img src="${el.img}" alt="${el.nombre}" class="img-thumbnail">    
            </div>
            <div class="col-6">
                <p>${el.nombre}</p>
                <p>${el.precio}</p>
            </div>
            <div class="col-3 text-center"> 
              <button class="agregarBtn btn btn-outline-dark d-inline-block m-0" onclick="agregarCarrito(${el.id});notificarCarrito();"><img src="../imgs/productos/masicon.png" class="masBtn"/>Agregar</button>   
            </div>`;            

    const nodoProductos = document.querySelector("#productosWrapper");
    nodoProductos.innerHTML=cadena;

  });

}
    














