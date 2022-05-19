class Carrito {
    constructor (productos)
    {
        this.productos=productos;
    
    }
    
    agregar(producto)
    {

         //buscarProducto
        let mapped= this.productos.map(element=>element.producto); //mapped = [{prd1}, {prd2}, {prd3}]
        let enCarrito = mapped.find(element=>element.id===producto.id); //enCarrito = {objeto}
        if(!enCarrito){
            
            this.productos.push({cantidad:1, producto}); //si el objeto no existe, pushea 1un de producto a myCarrito
        }  
        else{

            let indexed = mapped.map(element=>element.id);
            let index = indexed.indexOf(producto.id);
            this.productos[index].cantidad+=1;

            const btn = event.target
            if(btn.classList.contains("desdeCarrito"))
            {
                mostrarCarrito();
            }

        } 
    }

    guardar()
    {
        localStorage.setItem("CARRITO",JSON.stringify(this.productos));
    }

    vaciar()
    {

        localStorage.clear();
        this.productos=[];
        mostrarCarrito();

    }

    remover(prd)
    {
        const idProductos = this.productos.map(el=>el.producto.id);
        const index = idProductos.indexOf(prd);
        this.productos.splice(index,1);
        this.guardar();
        mostrarCarrito();
    }

    removerItem(producto)
    {
        const idProductos = this.productos.map(el=>el.producto.id);
        const index = idProductos.indexOf(producto);
        this.productos[index].cantidad-=1;
        if(this.productos[index].cantidad<1)
        {
            this.productos.splice(index,1); 
        }
        this.guardar();
        iniciarCarrito();        
    }

    
    cantidadCarrito()
    {
        const cantidadProductos = this.productos.reduce((acc, el) => acc + el.cantidad, 0);
        const iconoCarrito = document.querySelector("#carritoNumero");
        iconoCarrito.innerHTML=cantidadProductos;
    }

}