// Me conecto al documento HTML para modificar su contenido desde JS. Esta variable es un objeto. 
// Luego modifico el Header h1 modificando la variable con el m[etodo innerHTML
// Esta funcion le da versatilidad al codigo, al momento de modificar el HTML para poder reutilizar esa varible
// Es buena practica poner "return al final de la sintaxis de una funcion as[i no retorne nada"

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento (elemento, texto) {
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto;
    return;
}

// Los eventos en JS se denotan por el 'on', estos hacen referencia a la experiencia de usuario, como hacer doble click en un boton, etc. 
// Ahora declaramos la funcion que introducimos en el documento HTML: intentoDeUsuario
// En JS la declaramos y definimmos y en HTML la funcion se ejecuta
// getElementById es una funcion interna de JS para recuperar un input por su id. 
// el triple =, ===, sirve para comparar tanto valor como tipo de dato.

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`)
        document.getElementById('reiniciar').removeAttribute('disabled'); //aqui activamos el boton de nuevo juego cada que el jugador finaliza una ronda
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++; 
        limpiarCaja();
    }
    return;
}

// Aqui creamos una funcion para generar un numero aletorio

function generarNumeroSecreto() {
     let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

     console.log(numeroGenerado);
     console.log(listaNumerosSorteados);

     // Si ya sorteamos todos los numeros:
     if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');

     } else {

        // Si el numero generado esta en la lista (usamos el metodo includes que barre la lista):
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(); 

        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }

    }
    
}

// Creamos funcion para limpiar la caja de texto

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    
}

//Aqui creamos funcion para las condiciones iniciales del juego
function condicionesIniciales() {
    // Aqui ejecutamos la funcion con parametros dados
    asignarTextoElemento ('h1', 'Juego del número secreto');

    // Ahora voy a manipular el parrafo p
    asignarTextoElemento ('p', `Indica un número del 1 al ${numeroMaximo}`);

    numeroSecreto = generarNumeroSecreto();
    console.log(numeroSecreto);
    intentos = 1;
}

// Aqui creamos la funcion de reiniciar juego para activar el boton Nuevo Juego
function reiniciarJuego() {
    //Limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de numeros
    // Generar nuevo numero secreto
    //Inicializar el numero de intentos
    condicionesIniciales();
    //Deshabilitar el boton de Nuevo Juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); //El #se refiere al ID del boton en doc HTML
}

condicionesIniciales()