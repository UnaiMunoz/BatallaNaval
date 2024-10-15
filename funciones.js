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


function changeDataCell(td) {
    if (!partidaActiva) return; // Si la partida no está activa, no hacer nada

    // Obtener el atributo 'name' de la celda (nombre del barco o vacío)
    let name = td.getAttribute('name'); 

    // Comprobar si el clic corresponde a una casilla con un barco
    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");

        if (name === " ") {
            // Casilla vacía, marcarla como fallida
            td.innerHTML = "X"; 
            mostrarMensaje("¡Fallaste!");
        } else {
            // Impacto en un barco, buscar el barco por su tipo
            for (let barco of barcos) {
                if (barco.tipo === name) {
                    // Obtener las coordenadas de la casilla clicada
                    let row = td.parentElement.rowIndex;  // Índice de la fila
                    let col = td.cellIndex;  // Índice de la columna

                    // Verificar si las coordenadas coinciden con alguna del barco
                    for (let coord of barco.coordenadas) {
                        if (coord[0] === row && coord[1] === col) {
                            // Reducir la vida del barco
                            barco.vida -= 1;
                            td.innerHTML = "·"; // Indicar que el barco ha sido tocado
                            mostrarMensaje(`¡Has tocado ${barco.tipo}!`);

                            // Comprobar si el barco ha sido destruido
                            if (barco.vida === 0) {
                                mostrarMensaje(`¡Has tocado y hundido el ${barco.tipo}!`);
                            }

                            // Comprobar si todos los barcos están destruidos
                            if (todosBarcosDestruidos()) {
                                mostrarMensaje("¡Has ganado la partida!");
                                partidaActiva = false; // Desactivar la partida
                                mostrarBotones(); // Mostrar botones al ganar la partida
                            }

                            return;
                        }
                    }
                }
            }
        }
    }
}

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



