

let cart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () =>{
    cart.classList.toggle('active');
}
window.onscroll = () =>{
    cart.classList.remove('active');
}




//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#carrito-jugador tbody');
const listaJugadores = document.querySelector('#lista-jugadores');

const goles = document.querySelector('#goles');
const nombre = document.querySelector('#nombre');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const posicion = document.querySelector('#posicion');
const camiseta = document.querySelector('#camisetas');
const formulario = document.querySelector("#formulario");

let carritoJugadores = [];
let i = 0;
const resultado = document.querySelector('#resultado')




/*====================================================================================*/

//objeto

const datosBusqueda = {
    nombre: '',
    camiseta: '',
    minimo: '',
    goles:'',
    maximo: '',
    posicion: ''

}

/*====================================================================================*/
//Eventos

document.addEventListener('DOMContentLoaded',()=> {
    
    mostrardatos(jugadores);
});
/*====================================================================================*/

//Listeners
cargarEventListener();

function cargarEventListener() {
    //dispara cuando se presiona 'agregar-carrito'
    listaJugadores.addEventListener('click', agregarJugador);

    //Eliminar jugador del carrito
    //eliminarJugador
    carrito.addEventListener('click', eliminarJugador);
}
console.log(cargarEventListener());
/*====================================================================================*/

//Funciones
function mostrardatos(jugadores) {
    i = 0;

    limpiarHTML();

    jugadores.forEach( jugador => {
        
        const datoHTML = document.createElement('p');
        const {nombre, imag, edad, posicion, camiseta, goles} = jugador
      
        datoHTML.innerHTML += `

    <div class="centrado">
                              
                                <div class="cuerpo">
                                  <div class=" additional">
                                    <div class="user-card">
                                      
                                        <h4 style="text-align: center;color: white;">${nombre}</h4>
                                     
                                      
                                        <p style="text-align: center;color: white;">${posicion}</p>
                                     
                                      
                              
                              
                              
                              
                                        <img src="${imag}" alt="" style="width: 150px;">
                              
                                      </svg>
                                    </div>
                                    <div class="more-info">
                                      <h1>Jane Doe</h1>
                                      <div class="coords">
                                        <span>Posicion: ${posicion}</span>
                              
                                      </div>
                                      <div class="coords">
                                        <span>Camiseta: ${camiseta}</span>
                              
                                      </div>
                                      <div class="stats">
                                        <div>
                                          <div class="title">Goles</div>
                                          <i class="fa fa-trophy"></i>
                                          <div class="value">${goles}</div>
                                        </div>
                                        <div>
                                          <div class="title">Edad</div>
                                          <i class="fa fa-gamepad"></i>
                                          <div class="value">${edad}</div>
                                        </div>
                                        <div class="title">
                                        <a class="btn-select" href="#" class="btn agregar-jugador" data-id="${i}">Agregar</a>
                                        </div>
                                      </div>
                    
                                    </div>
                                  </div>
                                <div class="general">
                                    <h1 class="name-escup">${nombre}</h1>
                                        <img class="escudo" src="./img/pngwing.com (2).png" alt="" width=100  margin-left = 40px>
                                        <span class="more">more info</span>
                                </div
                              
                                </div>
                              </div>
        `;
        //Insertar en el HTML
        resultado.appendChild(datoHTML);
    });
}

//////////////////------------------------------------------------------///////////////////

//Limpiar HTML 
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
//////////////////------------------------------------------------------///////////////////
//Función que filtra en base a la búsqueda
function filtrarJugador() {

    const resultado = jugadores.filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarCamiseta).filter(filtrarPosicion).filter(filtrarGoles);
    if(resultado.length) {
        mostrardatos(resultado);
    }else {
        noResultado();
    }

}
//////////////////------------------------------------------------------///////////////////
function noResultado() {

    limpiarHTML();

    const noResultado = document.createElement('div');
    // noResultado.classList.add('alerta', 'error');
    noResultado.innerHTML = `

    <div class="noResutado1">
    <h1 class="notext">No hay resultados, intenta con otros términos</h1>
    </div>
    
    
    `;
    resultado.appendChild(noResultado);
}
//////////////////------------------------------------------------------///////////////////

//Función que añade el jugador al carrito
function agregarJugador(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-jugador')) {
    
        const jugador = e.target.parentElement.parentElement;
        //Enviamos el jugador selecionado para tomar sus datos
        leerDatosjugador(jugador);
    }
   
}


//////////////////------------------------------------------------------///////////////////
//Lee los datos del jugador
function leerDatosjugador(jugador) {
    
    const infojugador = {
        imag: jugador.querySelector('img').src,
        nombre: jugador.querySelector('h4').textContent,
        posicion: jugador.querySelector('p').textContent,
        id: jugador.querySelector('a').getAttribute('data-id')
    };


    carritoHTML(infojugador);
}

//////////////////------------------------------------------------------///////////////////
//Elimina el jugador del carrito en el DOM
function eliminarJugador(e) {
    e.preventDefault();

    let jugador, jugadorId;
    if(e.target.classList.contains('borrar-jugador')) {
    e.target.parentElement.parentElement.remove();
    jugador = e.target.parentElement.parentElement;
    jugadorId = jugador.querySelector('a').getAttribute('data-id');
}

}

//////////////////------------------------------------------------------///////////////////
//Muestra el jugador selecionado en el carrito
function carritoHTML(jugador) {
    const row = document.createElement('tr');
    row.innerHTML = `<td> 
                    <img src="${jugador.imag}" width=100> 
                    </td>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.posicion}</td>
                    <td>
                    <a href="#" class="borrar-jugador" data-id="${jugador.id}">X</a>
                    </td>`;
    contenedorCarrito.appendChild(row);

}
console.log(carritoHTML);
//////////////////------------------------------------------------------///////////////////

//Elimina los jugadors del carrito en el DOM
function vaciarCarrito(e){
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    return false;
}
//////////////////------------------------------------------------------///////////////////

/*====================================================================================*/
goles.addEventListener('change', e => {
    datosBusqueda.goles = parseInt(e.target.value);
    filtrarJugador();
});
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarJugador();
});
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarJugador();
});
posicion.addEventListener('change', e => {
    datosBusqueda.posicion = e.target.value;
    filtrarJugador();
});
camiseta.addEventListener('change', e => {
    datosBusqueda.camiseta = e.target.value;
    filtrarJugador();
});
//-------------------------FILTRACION DE LOS JUGADORES--------------------------//


function filtrarPosicion(jugador) {
    const {posicion} = datosBusqueda;
    if(posicion) {
        return jugador.posicion === posicion;
    } 
    return jugador; 
}

//////////////////------------------------------------------------------///////////////////


function filtrarMinimo(jugador) {
    const {minimo} = datosBusqueda;
    if(minimo){
        return jugador.edad >= minimo;
    }
    return jugador;
}

//////////////////------------------------------------------------------///////////////////

function filtrarMaximo(jugador) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return jugador.edad <= maximo;
    }
    return jugador;
}

//////////////////------------------------------------------------------///////////////////

function filtrarCamiseta(jugador) {
    const {camiseta} = datosBusqueda;
    if(camiseta) {
        return jugador.camiseta == camiseta;
    }
    return jugador;
}

//////////////////------------------------------------------------------///////////////////

function filtrarGoles(jugador) {
    const {goles} = datosBusqueda;
    if(goles) {
        return jugador.goles >= goles;
    }
    return jugador;
}

/*====================================================================================*/

//BUSQUEDA POR jugador INDEXOF
const filtrarNombre = () => {
    i=0;
    
    resultado.innerHTML = '';
    const texto = formulario.value.toLowerCase();

    for (let jugador of jugadores) {
        
        let nombre = jugador.nombre.toLowerCase();
        
        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `

            <div class="centrado">
                              
                                <div class="cuerpo">
                                  <div class=" additional">
                                    <div class="user-card">
                                      <div class="level ">
                                        ${jugador.nombre}
                                      </div>
                                      <div class="points ">
                                        ${jugador.posicion}
                                      </div>
                                      
                              
                              
                              
                              
                                        <img src="${jugador.imag}" alt="" style="width: 150px;">
                              
                                      </svg>
                                    </div>
                                    <div class="more-info">
                                      <h1>Jane Doe</h1>
                                      <div class="coords">
                                        <span>Posicion: ${jugador.posicion}</span>
                              
                                      </div>
                                      <div class="coords">
                                        <span>Camiseta: ${jugador.camiseta}</span>
                              
                                      </div>
                                      <div class="stats">
                                        <div>
                                          <div class="title">Goles</div>
                                          <i class="fa fa-trophy"></i>
                                          <div class="value">2</div>
                                        </div>
                                        <div>
                                          <div class="title">Edad</div>
                                          <i class="fa fa-gamepad"></i>
                                          <div class="value">27</div>
                                        </div>
                                        <div class="title">
                                        <a class="btn-select" href="#" class="agregar-jugador" data-id="${i}">Agregar</a>
                                        </div>
                                      </div>
                    
                                    </div>
                                  </div>
                                <div class="general">
                                    <h1 class="name-escup">${jugador.nombre}</h1>
                                        <img class="escudo" src="./img/pngwing.com (2).png" alt="" width=100  margin-left = 40px>
                                        <span class="more">mas info</span>
                                </div
                              
                                </div>
                              </div>
        
            `;
        }
    }

}
formulario.addEventListener('keyup', filtrarNombre)


