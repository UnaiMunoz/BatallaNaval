
// Script para habilitar el botón Classic Game si JavaScript está habilitado
document.addEventListener('DOMContentLoaded', function() {
    var classicGameBtn = document.getElementById('classicGameBtn');
    classicGameBtn.classList.remove('disabled'); // Elimina la clase disabled
    classicGameBtn.removeAttribute('disabled'); // Quita el atributo disabled
});

// Booleando para comprobar si la partida ha terminado
let partidaActiva = true;

/* ******************************* */
/* Mostrar celdas encriptadas      */
/* ******************************* */

// Función que genera un número random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Crea los nombres aleatorios de los td
function getRandomCodeNumber(element) {
    // Genera una letra random
    let character = String.fromCharCode(getRandomNumber(65, 90));
    // Genera un número random
    let number = String(getRandomNumber(0, 9));
    // Une la letra y el número
    let nameCode = character + number;

    // Mostrar el resultado en el elemento correspondiente
    element.innerText = nameCode;
}

// Asegura que el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los elementos td con la clase "codeName"
    const nameElements = document.querySelectorAll("td.codeName");

    // Establecer un intervalo para actualizar solo los elementos que no tienen "codeName"
    setInterval(() => {
        if (partidaActiva) { // Solo actualizar si la partida está activa
            nameElements.forEach(element => {
                if (element.classList.contains("codeName")) {
                    getRandomCodeNumber(element);
                }
            });
        }
    }, 100);
});

/* ****************** */
/* Destruir barcos    */
/* ****************** */


// Función para mostrar los botones
function mostrarBotones() {
    const buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'block'; // Asegúrate de que los botones se muestren
    }
}

// Función para mostrar los botones
function mostrarBotones() {
    const buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'block'; // Asegúrate de que los botones se muestren
    }
}

// Función para comprobar si todos los barcos han sido destruidos
function todosBarcosDestruidos() {
    for (let barco of barcos) {
        if (barco.vida > 0) {
            // Si algún barco tiene vida restante, la partida no ha terminado
            return false;
        }
    }
    // Si todos los barcos tienen vida 0, la partida está ganada
    return true;
}

// Función para mostrar los mensajes en el <div> con clase "info"
function mostrarMensaje(mensaje) {
    const notificationP = document.querySelector('.info .notification'); // Seleccionar el <p> con la clase 'notification'
    
    if (notificationP) {
        // Si la etiqueta <p> con clase 'notification' existe, actualizar su contenido
        notificationP.textContent = mensaje;
    } else {
        // Si no existe, crearla (aunque debería existir por el HTML inicial)
        const mensajeP = document.createElement('p');
        mensajeP.classList.add('notification');
        mensajeP.textContent = mensaje;
        document.querySelector('.info').appendChild(mensajeP); // Añadir al contenedor de info
    }
}

// Funciones Timer

let segundos = 0;
let minutos = 0;
let horas = 0;
let cronometro;

function iniciarCronometro() {
    cronometro = setInterval(actualizarCronometro, 1000); // Se ejecuta cada 1 segundo
}

function actualizarCronometro() {
    segundos++;

    if (segundos >= 60) {
        segundos = 0;
        minutos++;
    }

    if (minutos >= 60) {
        minutos = 0;
        horas++;
    }

    // Mostrar el tiempo en el formato HH:MM:SS
    document.querySelector('.timer').textContent = (horas < 10 ? "0" + horas : horas) + ":" +
        (minutos < 10 ? "0" + minutos : minutos) + ":" +
        (segundos < 10 ? "0" + segundos : segundos);
}

// Iniciar el cronómetro cuando se carga la página
window.onload = iniciarCronometro;


// Funciones actualización puntos

// Variables para manejar los puntos
let puntos = 0;
let turnosAguaSeguidos = 0; 
let barcosHundidos = 0; 
let turnosTotales = 0; 
let hundidoSinFallar = true; 
let puntosAntesDeHundir = 0; 

function changeDataCell(td) {
    if (!partidaActiva) return; // Si la partida no está activa, no hacer nada

    // Obtener el atributo 'name' de la celda (nombre del barco o vacío)
    let name = td.getAttribute('name'); 

    // Comprobar si el clic corresponde a una casilla con un barco
    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");
        
        // Incrementa el número total de turnos
        turnosTotales++; 

        if (name === " ") {
            // Casilla vacía (agua)
            td.innerHTML = "~"; 
            mostrarMensaje("¡Fallaste!");
            turnosAguaSeguidos++; // Incrementa la cantidad de turnos sin tocar un barco

            // Si hay 5 turnos de agua seguidos, restar 50 puntos
            if (turnosAguaSeguidos >= 5) {
                puntos -= 50;
                actualizarPuntos();
                mostrarMensaje("¡Has perdido 50 puntos!");
                turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua seguidos
            }

            // Rompe la cadena de hundir sin fallar
            hundidoSinFallar = false; 
        } else {
            // Impacto en un barco
            for (let barco of barcos) {
                if (barco.tipo === name) {
                    let row = td.parentElement.rowIndex; // Obtener índice de fila
                    let col = td.cellIndex; // Obtener índice de columna

                    for (let coord of barco.coordenadas) {
                        if (coord[0] === row && coord[1] === col) {
                            // Reducir la vida del barco
                            barco.vida -= 1; 
                            td.innerHTML = "X"; // Indicar que el barco ha sido tocado
                            mostrarMensaje(`¡Has tocado ${barco.tipo}!`);
                            puntos += 50; // Sumar 50 puntos por tocar un barco
                            actualizarPuntos();

                            turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua

                            // Verificar si el barco ha sido hundido
                            if (barco.vida === 0) {
                                barcosHundidos++; // Incrementar barcos hundidos
                                mostrarMensaje(`¡Has hundido ${barco.tipo}!`);

                                // **Multiplicador si hundes sin fallar**
                                if (hundidoSinFallar) {
                                    let multiplicador = barco.tamaño;

                                    // Guardamos los puntos antes de aplicar el multiplicador
                                    let puntosAntesMultiplicador = puntos; 

                                    // Aplicar el multiplicador correctamente
                                    puntos += puntosAntesMultiplicador * (multiplicador - 1); 
                                    actualizarPuntos();
                                    mostrarMensaje(`¡Puntos multiplicados por ${multiplicador} al hundir ${barco.tipo}!`);
                                }

                                // **Multiplicador especial para Fragata**
                                if (barco.tipo === "Fragata") {
                                    if (turnosTotales <= 2) {
                                        puntos += 3000; // Bonus por hundir la Fragata en 2 turnos
                                        puntos *= 2; // Multiplicador adicional
                                        actualizarPuntos();
                                        mostrarMensaje("¡Bonus de puntos por hundir la Fragata en 2 turnos!");
                                    }
                                }

                                hundidoSinFallar = true; 

                                if (todosBarcosDestruidos()) {
                                    mostrarMensaje("¡Has ganado la partida!");
                                    partidaActiva = false; // Desactivar la partida
                                    mostrarBotones();
                                    calcularBonificacionPorTiempo(); // Llama a la bonificación final
                                    mostrarPopupNombre(); // Mostrar el popup para ingresar el nombre
                                }
                            }
                            return; // Salir del ciclo
                        }
                    }
                }
            }
        }
    }
}


// Función que actualiza los puntos en el HTML
function actualizarPuntos() {
    document.querySelector('.points').textContent = `Puntos: ${puntos}`;
}

// Función para calcular la bonificación por tiempo
function calcularBonificacionPorTiempo() {
    clearInterval(cronometro); // Detener el cronómetro

    let totalSegundos = horas * 3600 + minutos * 60 + segundos;
    let bonificacion;

    if (totalSegundos <= 300) { // Si tardas menos de 5 minutos
        bonificacion = 1000;
    } else if (totalSegundos <= 600) { // Entre 5 y 10 minutos
        bonificacion = 500;
    } else {
        bonificacion = 100; // Más de 10 minutos
    }

    puntos += bonificacion;
    mostrarMensaje(`¡Bonificación de ${bonificacion} puntos por el tiempo!`);
    actualizarPuntos();
}


