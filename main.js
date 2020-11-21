var lista = document.querySelector("#listar");

class Producto {
  constructor(codigo, nombre, descripcion, cantidad, costo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.costo = costo;
    this.siguiente = null;
    this.anterior = null;
  }

  valorTotalM() {
    let cantidad = this.cantidad;
    let costo = this.costo;
    let valor = cantidad * costo;
    return valor;
  }

  articleToHtml() {
    let productString = '<li class="list-group-item">';
    for (let key in this) {
      productString += `<br><strong>${key}:</strong> ${this[key]}`;
    }
    let valor_string = `<br><strong>Valor total mercancia:</strong> ${this.valorTotalM()}`;
    return productString + valor_string + "</li>";
  }
}
  
class Inventario{
    constructor(){
        this.inicio = null;
        this.final = null;
        this.tamaño = 0;
    }

    agregarProduct(nuevo) {
        if(!this.inicio){
            this.inicio = nuevo;
            this.final = nuevo;
            document.getElementById("form1").reset();
            this.listar();
            return nuevo;
        }else
        if(nuevo.codigo < this.inicio.codigo){
            let aux = this.inicio;
            this.inicio = nuevo;
            this.inicio.siguiente = aux;
            aux.anterior = this.inicio;
            this.final = aux;
            document.getElementById("form1").reset();
            this.listar()
        }else{
            let aux = this.inicio;
            let bandera = false;
            while(!bandera){
                if(nuevo.codigo < aux.codigo){
                    nuevo.siguiente = aux;
                    nuevo.anterior = aux.anterior;
                    aux.anterior = nuevo;
                    nuevo.anterior.siguiente = nuevo;
                    if(aux.codigo === this.inicio.codigo){
                        nuevo.anterior = nuevo;
                        this.inicio = nuevo;
                    }
                    bandera = true;
                }else
                if(!aux.siguiente){
                    aux.siguiente = nuevo;
                    nuevo.anterior = aux;
                    this.final = nuevo;
                    bandera = true;
                }else{
                    aux = aux.siguiente;
                }
            }
            document.getElementById("form1").reset();
            this.listar();
        }
    }
        
    
    borrarInicio(){
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
        this.listar();
        return aux;
    }
  
    borrarProduct(codigo) {
        let aux = this.inicio;
        let temp = null;
        while(aux != null){
            if(aux.codigo == codigo){
                if(!temp){
                    this.inicio = aux.siguiente;
                }else{
                    temp.siguiente = aux.siguiente
                }
                this.else--;
                document.getElementById("form2").reset();
                this.listar();
                return aux.codigo
            }
            temp = aux;
            aux = aux.siguiente;
        }
        return null;
    }
  
    buscarProduct(codigo) {
        lista.innerHTML = "";
        if(this.inicio !== null){
            let aux = this.inicio;
            while(aux !== null){
                if(aux.codigo == codigo){
                    lista.innerHTML += aux.articleToHtml();
                }
                aux = aux.siguiente;
            }
        }
    }
  
    listar() {
        lista.innerHTML = "";
        let aux = this.inicio;
        while(aux){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }
  
    listarInvertido() {
        lista.innerHTML = "";
        let aux = this.final;
        while(aux !== null){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.anterior;
        }
    }
}

let inventario = new Inventario();

var botonAgregar = document.querySelector('#botonAgregar');
botonAgregar.addEventListener("click", () => {
    let codigo = document.querySelector('#codigoP');
    let nombre = document.querySelector('#nombreP');
    let descripcion = document.querySelector('#descripcionP');
    let cantidad = document.querySelector('#cantidadP');
    let costo = document.querySelector('#costoP');
    let newProduct = new Producto (Number(codigo.value), nombre.value, descripcion.value, cantidad.value, costo.value);
    inventario.agregarProduct(newProduct);
});

var botonPri = document.querySelector('#eliminarPrimero');
botonPri.addEventListener("click", () => {
    inventario.borrarInicio();
})

var botonBorrar = document.querySelector('#botonBorrar');
botonBorrar.addEventListener("click", () => {
    let borrarProducto = document.querySelector("#borrarProducto");
    inventario.borrarProduct(borrarProducto.value);
    
});
  
var botonBuscar = document.querySelector('#botonBuscar');
botonBuscar.addEventListener("click", () => {
    var buscarProducto = document.querySelector("#buscarProducto");
    inventario.buscarProduct(buscarProducto.value); 
});
  
var botonListar = document.querySelector('#botonListar');
botonListar.addEventListener("click", () => {
    inventario.listar();
});
  
var botonListarIn = document.querySelector('#botonListarIn');
botonListarIn.addEventListener("click", () => {
    inventario.listarInvertido();
});