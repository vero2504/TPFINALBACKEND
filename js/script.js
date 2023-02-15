const CONTENEDOR = document.querySelector(".container");
const BOTONES = document.querySelector(".game-buttons");
BOTONES.style.display = "none";
const POP_UP = document.querySelector(".popup-container");
const INPUT = document.querySelector("#new-word");
const GANASTE = document.querySelector("#ganaste");
const PERDISTE = document.querySelector("#perdiste");
let inputOculto = document.querySelector("#input-oculto"); 
let p =  document.querySelector("#p-palabra");
const CANVAS_CONTAINER = document.querySelector("#canvas");
CANVAS_CONTAINER.style.display = "none";
let tablero = document.querySelector("#ahorcado");
let pincel = tablero.getContext("2d");
tablero.style.display = "none";

let palabras = ["ALURA", "JAVASCRIPT", "ONE", "ORACLE", "HTML", "CSS"];
let palabraSecreta = "";
let cantErrores = 0;
let contador = 0;

function sortearPalabra() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabraSecreta = palabra;
    console.log(palabraSecreta);
}

function dibujarCanvas() {
    pincel.lineWidth = 6;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.fillStyle = "transparent";
    pincel.strokeStyle = "#0A3871";
    pincel.fillRect(0, 0, 700, 400);
    pincel.beginPath();
    pincel.moveTo(300, 280);
    pincel.lineTo(450, 280);
    pincel.moveTo(330, 280);
    pincel.lineTo(330, 10);
    pincel.lineTo(440, 10);
    pincel.lineTo(440, 50);
    pincel.stroke();
    pincel.closePath();
}


function dibujarGuiones() {

    pincel.lineWidth = 4;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    pincel.fillStyle = "transparent";
    pincel.strokeStyle = "#0A3871";
    pincel.beginPath();

    let ancho = 450 / palabraSecreta.length;

    for (let i = 0; i < palabraSecreta.length; i++) {
        pincel.moveTo(155 + (ancho * i), 350);
        pincel.lineTo(205 + (ancho * i), 350);
    }

    pincel.stroke();
    pincel.closePath();
}

//Inicia el juego sorteando una palabra del array

function iniciarJuego() {
    CONTENEDOR.style.display = "none";
    CANVAS_CONTAINER.style.display = "block";
    BOTONES.style.display = "block";
    tablero.style.display = "block";
    inputOculto.focus();
    sortearPalabra();
    dibujarCanvas();
    dibujarGuiones();
    colocarLetras();
}

function reiniciarJuego() {
    location.reload();
}

//Esta parte es para agregrar una nueva palabra y jugar con ella
function desplegarPopUp() {
    POP_UP.style.visibility = "visible";
}

function cerrarPopUp() {
    POP_UP.style.visibility = "hidden";
}

function agregarPalabra() {
    let nuevaPalabra = INPUT.value;

    if (/[A-Z]/g.test(nuevaPalabra) && nuevaPalabra.length <= 8 && nuevaPalabra.length > 2) {
        palabraSecreta = nuevaPalabra;
        INPUT.value = "";
        console.log(palabraSecreta);
        jugarNuevaPalabra();
    } else {
        alert("Debe utilizar entre 3 y 8 letras MAYÚSCULAS");
        INPUT.value = "";
    }

    if (!palabras.includes(nuevaPalabra)){
        palabras.push(nuevaPalabra);
        console.log(palabras);
    }
}
//Esta funcion utiliza la palabra ingresada para jugar con la palabra elegida min-3 y max-8 caracteres
function jugarNuevaPalabra() {
    CONTENEDOR.style.display = "none";
    CANVAS_CONTAINER.style.display = "block";
    BOTONES.style.display = "block";
    tablero.style.display = "block";
    inputOculto.focus();
    dibujarCanvas();
    dibujarGuiones();
    colocarLetras();
}
//Esta funcion captura y comprueba las letras y las coloca en su lugar si corresponde
function colocarLetras() {
    document.addEventListener("keydown", function (event) {
        let letra = event.key.toUpperCase();
        let code = event.keyCode;
        let error = true;
        for (let i = 0; i < palabraSecreta.length; i++) {
            let largo = 450 / palabraSecreta.length;
            if (letra === palabraSecreta[i]) {
                pincel.fillStyle = "#0A3871";
                pincel.strokeStyle = "#0A3871";
                pincel.lineWidth = 6;
                pincel.font = "bold 25px sans-serif";
                pincel.textAlign = "center";
                pincel.textBaseline = "alphabetic";
                pincel.fillText(letra, 180 + (largo * i), 345, 450);
                error = false;
                contador ++;
                console.log(contador);
            } 
        }
        
        desplegarGanaste();

        let ancho = 350 / 6;
        if (error === true && code >= 65 && code <= 90) {
            cantErrores++;
            pincel.fillStyle = "#FF5533";
            pincel.strokeStyle = "#0A3871";
            pincel.lineWidth = 6;
            pincel.font = "bold 25px sans-serif";
            pincel.textAlign = "center";
            pincel.textBaseline = "alphabetic";
            pincel.fillText(letra, 150 + (ancho * cantErrores), 390, 350);
            dibujarPersona();
        }
        
    });
    
}

function desplegarGanaste(){
    if (contador === palabraSecreta.length){
        GANASTE.style.visibility = "visible";
    }
}

GANASTE.onclick = function(){
    GANASTE.style.visibility = "hidden";
}


function dibujarPersona(){
    
    if(cantErrores === 1){
        //cabeza
        pincel.beginPath();
        pincel.arc(440, 89, 35, 0, 2*Math.PI);
        pincel.stroke();
        pincel.closePath();
    } else if (cantErrores === 2) {
        //cuerpo
        pincel.beginPath();
        pincel.moveTo(440, 128);
        pincel.lineTo(440, 230);
        pincel.stroke();
        pincel.closePath();
    }else if (cantErrores === 3){
        //brazo izq
        pincel.beginPath();
        pincel.moveTo(440, 138);
        pincel.lineTo(390, 170);
        pincel.stroke();
        pincel.closePath();
    } else if (cantErrores === 4){
        //brazo der
        pincel.beginPath();
        pincel.moveTo(440, 138);
        pincel.lineTo(490, 170);
        pincel.stroke();
        pincel.closePath();
    } else if (cantErrores === 5) {
        //pierna izq
        pincel.beginPath();
        pincel.moveTo(440, 230);
        pincel.lineTo(400, 270);
        pincel.stroke();
        pincel.closePath();
    } else if (cantErrores === 6) {
        //pierna der
        pincel.beginPath();
        pincel.moveTo(440, 230);
        pincel.lineTo(480, 270);
        pincel.stroke();
        pincel.closePath();
    } else  if (cantErrores > 6){
        PERDISTE.style.visibility = "visible";
        p.innerHTML = "La palabra era: " + palabraSecreta;
    }
}

PERDISTE.onclick = function(){
    PERDISTE.style.visibility = "hidden";
}



