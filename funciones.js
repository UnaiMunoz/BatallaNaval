/* ******************************* */
/* MARK: JavaScript habilitado*/
/* ******************************* */

// Script para habilitar el botón Classic Game si JavaScript está habilitado
document.addEventListener('DOMContentLoaded', function() {
    var classicGameBtn = document.getElementById('classicGameBtn');
    var practiceGameBtn = document.getElementById('practiceGameBtn');
    var indexNameInput = document.getElementById('indexName');
    var nameError = document.getElementById('nameError');
    var extraOptionsBtn = document.getElementById('extraOptionsBtn');
    var extraOptions = document.getElementById('extraOptions');

    // Inicialmente, el mensaje estará visible
    nameError.textContent = 'El nom ha de tenir mínim 3 caràcters.';

    // Habilitar botones solo cuando el nombre tiene entre 3 y 30 caracteres
    indexNameInput.addEventListener('input', function() {
        var nameLength = indexNameInput.value.length;
        if (nameLength >= 3 && nameLength <= 30) {
            classicGameBtn.classList.remove('disabled');
            classicGameBtn.removeAttribute('disabled');
            practiceGameBtn.classList.remove('disabled');
            practiceGameBtn.removeAttribute('disabled');
            nameError.style.color = 'transparent'; // Hacer el texto transparente
        } else {
            classicGameBtn.classList.add('disabled');
            classicGameBtn.setAttribute('disabled', true);
            practiceGameBtn.classList.add('disabled');
            practiceGameBtn.setAttribute('disabled', true);
            nameError.style.color = 'red'; // Mostrar mensaje de error
        }
    });

    var mode = "<?php echo $mode; ?>";

    // Configuración de botones de juego
    classicGameBtn.onclick = function() {
        document.getElementById('gameForm').action = 'game.php?mode=classic';
        document.getElementById('gameForm').submit();
    };

    practiceGameBtn.onclick = function() {
        document.getElementById('gameForm').action = 'game.php?mode=practice';
        document.getElementById('gameForm').submit();
    };

});

/* ******************************* */
/* MARK: Mostrar celdas encriptadas*/
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
// document.addEventListener("DOMContentLoaded", function() {
//      // Seleccionar todos los elementos td con la clase "codeName"
//      const nameElements = document.querySelectorAll("td.codeName");

//      // Establecer un intervalo para actualizar solo los elementos que no tienen "codeName"
//      setInterval(() => {
//          if (partidaActiva) { // Solo actualizar si la partida está activa
//              nameElements.forEach(element => {
//                  if (element.classList.contains("codeName")) {
//                      getRandomCodeNumber(element);
//                  }
//              });
//          }
//      }, 100);
// });

/* ****************** */
/* MARK: Timer        */
/* ****************** */

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
window.onload = function() {
    if (window.location.pathname.endsWith("game.php")) {
        iniciarCronometro();
    }
};

// Funciones actualización puntos

// Variables para manejar los puntos
let puntos = 0;
let turnosAguaSeguidos = 0; 
let barcosHundidos = 0; 
let turnosTotales = 0; 
let hundidoSinFallar = true; 
let puntosAntesDeHundir = 0; 

/* ****************** */
/* MARK: Funciones    */
/* ****************** */

// Función para mostrar los botones
function mostrarBotones() {
    const buttons = document.querySelector('.buttons');
    if (buttons) {
        buttons.style.display = 'block'; // Asegúrate de que los botones se muestren
    }
}

function mostrarNombre() {
    const input = document.querySelector('#name');
    const divNameGame = document.querySelector('#divNameGame');
    const button = document.querySelector('#buttonName');

    if (input && button) {
        input.style.display = 'block'; // Mostrar el input
        divNameGame.style.display = 'contents';; // Mostrar corchetes
        button.style.display = 'block'; // Mostrar el botón
    }
}

function ocultarNombre() {
    const input = document.querySelector('#name'); // Usa el ID específico
    const divNameGame = document.querySelector('#divNameGame');
    const button = document.querySelector('#buttonName'); // Usa el ID específico

    if (input && button) {
        input.style.display = 'none'; // Ocultar el input
        divNameGame.style.display = 'none';; // Mostrar corchetes
        button.style.display = 'none'; // Ocultar el botón
    }
}

// Función para mostrar los mensajes en el <div> con clase "info"
function mostrarMensaje(mensaje, color = 'white') {
    const notificationP = document.querySelector('.info .notification'); // Seleccionar el <p> con la clase 'notification'
    
    if (notificationP) {
        // Si la etiqueta <p> con clase 'notification' existe, actualizar su contenido y color
        notificationP.textContent = mensaje;
        notificationP.style.color = color; // Cambiar el color del texto
    } else {
        // Si no existe, crearla (aunque debería existir por el HTML inicial)
        const mensajeP = document.createElement('p');
        mensajeP.classList.add('notification');
        mensajeP.textContent = mensaje;
        mensajeP.style.color = color; // Asignar el color inicial del texto
        document.querySelector('.info').appendChild(mensajeP); // Añadir al contenedor de info
    }
}

// Función para mostrar el mesaje de points-info
function mostrarMensajePuntos(mensaje) {
    const notificationP = document.querySelector('.info .points-info');
    
    // Convertir los saltos de línea en <br> para HTML
    const mensajeHTML = mensaje.replace(/\n/g, '<br>');

    if (notificationP) {
        // Dividir el contenido actual en mensajes individuales
        let mensajes = notificationP.innerHTML.split('<br>').filter(m => m.trim() !== '');
        
        // Añadir el nuevo mensaje
        mensajes.push(mensajeHTML);
        
        // Mantener solo los últimos 3 mensajes
        if (mensajes.length > 8) {
            mensajes = mensajes.slice(-8);
        }
        
        // Unir los mensajes con <br> y actualizar el contenido
        notificationP.innerHTML = mensajes.join('<br>');
    } else {
        const mensajeP = document.createElement('p');
        mensajeP.classList.add('points-info');
        mensajeP.innerHTML = mensajeHTML;
        document.querySelector('.info').appendChild(mensajeP);
    }
}

function vaciarMensajePuntos() {
    const notificationP = document.querySelector('.info .points-info');
    if (notificationP) {
        notificationP.textContent = '';
    }
}

function applyEasterEgg() {
    // Variables para el Easter Egg (Tienes que pulsar la casilla C4)
    let clickCounterC4 = 0; // Contador de clics para "C4"
    const originalTitle = "Binary Battleship"; // Título original

    return function() {
        clickCounterC4++; // Incrementar el contador

        if (clickCounterC4 === 5) {

            const gameTitleElement = document.getElementById("gameTitle");
            
            // Cambiar el título a vacío para ocultar el texto original
            gameTitleElement.innerText = "";

            // Aplicar la clase
            gameTitleElement.classList.add("glitchTitle");

            // Cambiar el título a lo que deseas mostrar durante la animación
            setTimeout(() => {
                gameTitleElement.innerText = "¡Security Breach: Full Access Granted!!";
            }, 0); // Mostrar el texto del Easter Egg inmediatamente

            setTimeout(() => {
                gameTitleElement.innerText = originalTitle; // Restaurar el título original
                // Eliminar la clase
                gameTitleElement.classList.remove("glitchTitle");
            }, 5000); // Eliminar después de 5 segundos

            clickCounterC4 = 0; // Reiniciar el contador

            // Para el timer
            clearInterval(cronometro);
            //mostrarMensaje("Has guanyat la partida!");
            partidaActiva = false; // Desactivar la partida
            calcularBonificacionPorTiempo(); // Llama a la bonificación final
            pageWin();
            console.log("Easter Egg activado");
            
        }
    };
}

// Crear una instancia de la función de Easter Egg
const activateEasterEgg = applyEasterEgg();


// Función que actualiza los puntos en el HTML
function actualizarPuntos() {
    document.querySelector('.points').textContent = `Punts: ${puntos}`;
}

// Función para calcular la bonificación por tiempo
function calcularBonificacionPorTiempo() {
    clearInterval(cronometro); // Detener el cronómetro

    let totalSegundos = horas * 3600 + minutos * 60 + segundos;
    let bonificacion;

    if (totalSegundos <= 300) { // Si tardas menos de 5 minutos
        bonificacion = 1000;
        mostrarMensajePuntos("+" + bonificacion + " punts per fer-te amb el control en menys de 5 minuts");

    } else if (totalSegundos <= 600) { // Entre 5 y 10 minutos
        bonificacion = 500;
        mostrarMensajePuntos("+" + bonificacion + " punts per fer-te amb el control entre 5 i 10 minuts");

    } else {
        bonificacion = 100; // Más de 10 minutos
        mostrarMensajePuntos("+" + bonificacion + " punts per fer-te amb el control en més de 10 minuts");

    }

    puntos += bonificacion;
    // mostrarMensajePuntos(`¡Bonificación de ${bonificacion} puntos por el tiempo!`);
    actualizarPuntos();
}

function getbackground() {
    var elemento = document.getElementById('game');
    elemento.style.backgroundImage = `url(images/calaveraTormenta.jpg)`;
    elemento.classList.remove('animacion-fondo'); // Remove the class to restart the animation
    void elemento.offsetWidth; // Trigger reflow to restart the animation
    elemento.classList.add('animacion-fondo');
}

function getText() {
    var elemento = document.getElementById('gameTitle');
    elemento.classList.remove('animacion-text');
    elemento.classList.add('animacion-text');
}

// Booleandos
let partidaActiva = true;
let debeVaciarMensajes = false;

/* ******************************** */
/* MARK: PRACTICE GAME --> Turno de la IA */
/* ******************************** */

// Variables para Practice Tool
// practicePlayerBoats 
// practicePlayerBoard
// practiceEnemyBoats 
// practiceEnemyBoard

let playerTurn = true;
const attackedPositions = [];

let playerHits = 0;  // Aciertos del jugador
let iaHits = 0;      // Aciertos de la IA

function determinarGanadorPorAciertos() {
    clearInterval(cronometro);
    partidaActiva = false;

    console.log("Player Hits: " + playerHits);
    console.log("IA Hits: " + iaHits);
    
    if (playerHits > iaHits) {
        mostrarMensaje("¡Has ganado la partida por tener más aciertos!", "green");
        setTimeout(() => {
            pageWin();
        }, 5000);
    } else if (iaHits > playerHits) {
        mostrarMensaje("La IA ha ganado la partida por tener más aciertos.", "red");
        setTimeout(() => {
            pageLose();
        }, 5000);    
    } else {
        mostrarMensaje("La IA ha ganado por empate.", "red");
        setTimeout(() => {
            pageLose();
        }, 5000);    
    }

    calcularBonificacionPorTiempo();
}




function oscurecerTablero(tablero) {
    tablero.classList.add('tablero-oculto');
}

function habilitarTablero(tablero) {
    tablero.classList.remove('tablero-oculto');
}



//cambiar pantalla 
function pageWin() {
    const playerName = encodeURIComponent(practicePlayerName); // Codifica el nombre para la URL

    // Redirigir a win.php con los parámetros playerName y puntos
    window.location.href = `win.php?playerName=${playerName}&puntos=${puntos}`;
}



function pageLose() {
    const playerName = encodeURIComponent(practicePlayerName); // Codifica el nombre para la URL
    // Redirigir a win.php con los parámetros playerName y puntos
    window.location.href = `lose.php?playerName=${playerName}&puntos=${puntos}`;

}


/* ********************************** */
/* MARK: CLASSIC GAME -> Destruir barcos*/
/* ********************************** */

// Función para comprobar si todos los barcos han sido destruidos
function todosBarcosDestruidos(arrayBarcos) {

    for (let barco of arrayBarcos) {
        if (barco.vida > 0) {
            // Si algún barco tiene vida restante, la partida no ha terminado
            return false;
        }
    }
    // Si todos los barcos tienen vida 0, la partida está ganada
    return true;
}

function cambiarTurno(playerTurn) {
    if (playerTurn) {
        // Oscurecer la tabla del jugador y habilitar la tabla de la IA
        oscurecerTablero(document.getElementById('practicePlayergameTable')); // Reemplaza con el ID real de tu tabla
        habilitarTablero(document.getElementById('practiceEnemygameTable')); // Reemplaza con el ID real de tu tabla
    } else {
        // Oscurecer la tabla de la IA y habilitar la tabla del jugador
        oscurecerTablero(document.getElementById('practiceEnemygameTable')); // Reemplaza con el ID real de tu tabla
        habilitarTablero(document.getElementById('practicePlayergameTable')); // Reemplaza con el ID real de tu tabla
    }
}

function comprobarMunicionTerminada() {
    if (practicePlayerAmmo === 0 && practiceEnemyAmmo === 0) {
        return true; // Ambos tienen 0 de munición
    } else {
        return false; // Alguno o ambos aún tienen munición
    }
    
}

let firstHit = { row: null, col: null };
let secondHit = { row: null, col: null };
let direccionEncontrada = false;
let cambioSentido = false;
let celdasAtacadas = [];
let celdaAcorazada = { row: null, col: null };
let celdaAcorazadaEncontrada = false;

// Turno de la IA
function turnoIA() {

    // ArmoredShip encontrado
    if (celdaAcorazada.row !== null && celdaAcorazada.col !== null) {
        row = celdaAcorazada.row;
        col = celdaAcorazada.col;

    }

    // Cambiar sentido de ataque
    else if (direccionEncontrada && cambioSentido) {
        // Determinar si la dirección es horizontal o vertical
        const direccionHorizontal = firstHit.row === secondHit.row;
        let siguienteMovimiento;
    
        // Si la dirección es horizontal, cambia al lado opuesto
        if (direccionHorizontal) {
            if (secondHit.col > firstHit.col) {
                // La IA estaba atacando hacia la derecha, ahora cambia a la izquierda de firstHit
                siguienteMovimiento = { row: firstHit.row, col: firstHit.col - 1 };
            } else {
                // La IA estaba atacando hacia la izquierda, ahora cambia a la derecha de firstHit
                siguienteMovimiento = { row: firstHit.row, col: firstHit.col + 1 };
            }
        } else {
            // Si la dirección es vertical, cambia al lado opuesto
            if (secondHit.row > firstHit.row) {
                // La IA estaba atacando hacia abajo, ahora cambia a la celda arriba de firstHit
                siguienteMovimiento = { row: firstHit.row - 1, col: firstHit.col };
            } else {
                // La IA estaba atacando hacia arriba, ahora cambia a la celda abajo de firstHit
                siguienteMovimiento = { row: firstHit.row + 1, col: firstHit.col };
            }
        }
    
        // Verificar si el movimiento está dentro del tablero y no ha sido atacado
        if (siguienteMovimiento.row >= 1 && siguienteMovimiento.row < practicePlayerBoard.length &&
            siguienteMovimiento.col >= 1 && siguienteMovimiento.col < practicePlayerBoard[0].length &&
            !celdasAtacadas.some(celda => celda.row === siguienteMovimiento.row && celda.col === siguienteMovimiento.col) &&
            practicePlayerBoard[siguienteMovimiento.row][siguienteMovimiento.col] !== "X" &&
            practicePlayerBoard[siguienteMovimiento.row][siguienteMovimiento.col] !== "~") {

            // Establecer el próximo ataque en la celda opuesta
            row = siguienteMovimiento.row;
            col = siguienteMovimiento.col;
        } else {
            // Si el movimiento no es válido, selecciona un movimiento aleatorio
            do {
                row = Math.floor(Math.random() * (practicePlayerBoard.length - 1)) + 1;
                col = Math.floor(Math.random() * (practicePlayerBoard[0].length - 1)) + 1;
            } while (practicePlayerBoard[row][col] === "X" || practicePlayerBoard[row][col] === "~" ||
                     celdasAtacadas.some(celda => celda.row === row && celda.col === col));
        }
    
        // Reiniciar cambioSentido para evitar alternar continuamente
        cambioSentido = false;
    }
    
    // IA ha encontrado la direccion de un barco
    else if (direccionEncontrada && cambioSentido === false) {



        // Determinar si la dirección es horizontal o vertical
        const direccionHorizontal = firstHit.row === secondHit.row;
        let posiblesMovimientos = [];
    
        // Si es horizontal, verifica izquierda y derecha
        if (direccionHorizontal) {
            if (secondHit.col > 1 && !celdasAtacadas.some(celda => celda.row === secondHit.row && celda.col === secondHit.col - 1) &&
                practicePlayerBoard[secondHit.row][secondHit.col - 1] !== "X" && practicePlayerBoard[secondHit.row][secondHit.col - 1] !== "~") {
                posiblesMovimientos.push({ row: secondHit.row, col: secondHit.col - 1 }); // Izquierda
            }
            if (secondHit.col < practicePlayerBoard[0].length - 1 && !celdasAtacadas.some(celda => celda.row === secondHit.row && celda.col === secondHit.col + 1) &&
                practicePlayerBoard[secondHit.row][secondHit.col + 1] !== "X" && practicePlayerBoard[secondHit.row][secondHit.col + 1] !== "~") {
                posiblesMovimientos.push({ row: secondHit.row, col: secondHit.col + 1 }); // Derecha
            }
        } else {
            // Si es vertical, verifica arriba y abajo
            if (secondHit.row > 1 && !celdasAtacadas.some(celda => celda.row === secondHit.row - 1 && celda.col === secondHit.col) &&
                practicePlayerBoard[secondHit.row - 1][secondHit.col] !== "X" && practicePlayerBoard[secondHit.row - 1][secondHit.col] !== "~") {
                posiblesMovimientos.push({ row: secondHit.row - 1, col: secondHit.col }); // Arriba
            }
            if (secondHit.row < practicePlayerBoard.length - 1 && !celdasAtacadas.some(celda => celda.row === secondHit.row + 1 && celda.col === secondHit.col) &&
                practicePlayerBoard[secondHit.row + 1][secondHit.col] !== "X" && practicePlayerBoard[secondHit.row + 1][secondHit.col] !== "~") {
                posiblesMovimientos.push({ row: secondHit.row + 1, col: secondHit.col }); // Abajo
            }
        }
    
        // Escoge la celda en línea recta si hay opciones
        if (posiblesMovimientos.length > 0) {
            const siguienteMovimiento = posiblesMovimientos[Math.floor(Math.random() * posiblesMovimientos.length)];
            row = siguienteMovimiento.row;
            col = siguienteMovimiento.col;
        } else {
            // Si no hay movimientos válidos en línea, seleccionar aleatorio
            do {
                row = Math.floor(Math.random() * (practicePlayerBoard.length - 1)) + 1;
                col = Math.floor(Math.random() * (practicePlayerBoard[0].length - 1)) + 1;
            } while (practicePlayerBoard[row][col] === "X" || practicePlayerBoard[row][col] === "~" ||
                     celdasAtacadas.some(celda => celda.row === row && celda.col === col));
        }
    } 
    

    // Calcular patrón de tirada
    else if (firstHit.row !== null && firstHit.col !== null) {
        // IA Inteligente: intenta atacar cerca de la coordenada de firstHit
        let posiblesMovimientos = [];

        // Verificar y agregar las celdas alrededor de firstHit si están dentro del tablero y no han sido atacadas
        if (firstHit.row > 1 && !celdasAtacadas.some(celda => celda.row === firstHit.row - 1 && celda.col === firstHit.col) &&
            practicePlayerBoard[firstHit.row - 1][firstHit.col] !== "X" && practicePlayerBoard[firstHit.row - 1][firstHit.col] !== "~") {
            posiblesMovimientos.push({ row: firstHit.row - 1, col: firstHit.col }); // Celda arriba
        }
        if (firstHit.row < practicePlayerBoard.length - 1 && !celdasAtacadas.some(celda => celda.row === firstHit.row + 1 && celda.col === firstHit.col) &&
            practicePlayerBoard[firstHit.row + 1][firstHit.col] !== "X" && practicePlayerBoard[firstHit.row + 1][firstHit.col] !== "~") {
            posiblesMovimientos.push({ row: firstHit.row + 1, col: firstHit.col }); // Celda abajo
        }
        if (firstHit.col > 1 && !celdasAtacadas.some(celda => celda.row === firstHit.row && celda.col === firstHit.col - 1) &&
            practicePlayerBoard[firstHit.row][firstHit.col - 1] !== "X" && practicePlayerBoard[firstHit.row][firstHit.col - 1] !== "~") {
            posiblesMovimientos.push({ row: firstHit.row, col: firstHit.col - 1 }); // Celda izquierda
        }
        if (firstHit.col < practicePlayerBoard[0].length - 1 && !celdasAtacadas.some(celda => celda.row === firstHit.row && celda.col === firstHit.col + 1) &&
            practicePlayerBoard[firstHit.row][firstHit.col + 1] !== "X" && practicePlayerBoard[firstHit.row][firstHit.col + 1] !== "~") {
            posiblesMovimientos.push({ row: firstHit.row, col: firstHit.col + 1 }); // Celda derecha
        }

        // Seleccionar una celda aleatoria de los posibles movimientos
        if (posiblesMovimientos.length > 0) {
            const siguienteMovimiento = posiblesMovimientos[Math.floor(Math.random() * posiblesMovimientos.length)];
            row = siguienteMovimiento.row;
            col = siguienteMovimiento.col;
        } else {
            // Si no hay movimientos válidos, selecciona una celda aleatoria
            do {
                row = Math.floor(Math.random() * (practicePlayerBoard.length - 1)) + 1;
                col = Math.floor(Math.random() * (practicePlayerBoard[0].length - 1)) + 1;
            } while (practicePlayerBoard[row][col] === "X" || 
                     practicePlayerBoard[row][col] === "~" || 
                     celdasAtacadas.some(celda => celda.row === row && celda.col === col));
        }

    } 

    // Tiro aleatorio
    else {
        // Selección aleatoria de coordenadas cuando no hay un primer impacto
        do {
            row = Math.floor(Math.random() * (practicePlayerBoard.length - 1)) + 1;
            col = Math.floor(Math.random() * (practicePlayerBoard[0].length - 1)) + 1;
        } while (practicePlayerBoard[row][col] === "X" || 
                practicePlayerBoard[row][col] === "~" || 
                celdasAtacadas.some(celda => celda.row === row && celda.col === col));
    }


    // Obtener el valor de la celda seleccionada
    let targetCell = practicePlayerBoard[row][col];
    
    // Simular que la IA ataca la celda
    let cellElement = document.querySelector(`#practicePlayergameTable tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);


    showNotification("Torn de IA, pensant moviment...","Right","yellow");

    // Lanzar tirada despues de 2 segundos
    setTimeout(() => {

        // Municion limitada
        if (practiceAmmoEnabled) {
            // Restar municion a IA
            if (practiceEnemyAmmo > 0) {
                practiceEnemyAmmo--;
                var ammoEnemyElement = document.getElementById('practiceEnemyAmmo');
                ammoEnemyElement.textContent = practiceEnemyAmmo + "/40";
                if (comprobarMunicionTerminada()) {
                    mostrarMensaje("Ambos jugadores se han quedado sin munición", "yellow");
                    setTimeout(() => {
                        determinarGanadorPorAciertos();
                    }, 3000);
                    return;
                }
                
            }
        }

        // Agua
        if (targetCell === " ") {

            // Marcar la celda como atacada
            celdasAtacadas.push({ row: row, col: col });
            // Agua
            cellElement.innerHTML = "~"; // Marcar el agua
            cellElement.classList.add("agua"); // Puedes añadir una clase CSS para el agua
            cellElement.style.backgroundColor = "blue"; // Cambia el color a tu preferencia

            showNotificationGame("La IA no ha trobat connexió","Right","yellow");
            waterSoundIA();

            // Cambiar el sentido si toca agua
            if (direccionEncontrada) {
                cambioSentido = true; 
                console.log("Cambio de sentido");
            }

            // Pasar turno al Player
            if (practiceAmmoEnabled && practicePlayerAmmo === 0) {
                setTimeout(() => {
                    playerTurn = true;
                    cambiarTurno(playerTurn);
                    showNotification(`${practicePlayerName} no te RAM. IA ataca de nou`,"Left","#3700ff");
                    playerTurn = false;
                    cambiarTurno(playerTurn);
                }, 2000);
                setTimeout(() => {
                    setTimeout(() => {
                        turnoIA();
                    }, 2000);
                }, 2000);
            }
            else {
                setTimeout(() => {
                    showNotification(`Torn de ${practicePlayerName}`,"Left", "#3700ff");
                    playerTurn = true;
                    cambiarTurno(playerTurn)
                }, 3000);
            }
            


        } 

        // Acierto
        else {
            
            // Marcar la celda como atacada
            celdasAtacadas.push({ row: row, col: col });

            // Acierto de la IA
            iaHits++; 

            // Modo ArmoredShips
            if (practiceArmoredShips) {
                // ArmoredShips --> ?
                if (practiceArmoredShips === true && celdaAcorazadaEncontrada === false) {
                    cellElement.innerHTML = "?"; 
                    hitArmoredShip();
                    cellElement.classList.add("playerCellArmored"); 
                    cellElement.style.backgroundColor = "orange"; 
                    showNotificationGame("La IA a trencat a l'antivirus","Right","yellow");
                    celdaAcorazada = { row: row, col: col };
                    celdaAcorazadaEncontrada = true;
                    setTimeout(() => {
                        showNotification(`Torn de ${practicePlayerName}`,"Left","#3700ff");
                        playerTurn = true;
                        cambiarTurno(playerTurn)
                    }, 3000);
                    return;
                } 
    
                else if (practiceArmoredShips === true && celdaAcorazadaEncontrada === true) {
    
    
                    // Atacar la celda marcada con "?"
                    row = celdaAcorazada.row;
                    col = celdaAcorazada.col;

                
                    // Lógica para atacar la celda y manejar el resultado
                    cellElement.innerHTML = "X"; 
                    cellElement.style.backgroundColor = "red"; 
                    showNotificationGame(`La IA ha trobat un punt d'accés`,"Right","yellow");
                    attackSoundIA();
                
                    // Reiniciar el estado de la celda acorazada
                    celdaAcorazadaEncontrada = false;
                    celdaAcorazada = { row: null, col: null };
                } 

            }
           
            // Guardar la primera coordenada de impacto
            if (firstHit.row === null && firstHit.col === null) {
                firstHit.row = row;
                firstHit.col = col;
                console.log("Primer impacto");
            } else {
                direccionEncontrada = true;
                secondHit.row = row;
                secondHit.col = col;
                console.log("Segundo impacto");
                console.log("Direccion encontrada");
            }

            // Modo normal
            if (!practiceArmoredShips) {
                cellElement.innerHTML = "X"; 
                cellElement.style.backgroundColor = "red"; 
                showNotificationGame(`La IA ha trobat un punt d'accés`,"Right","yellow");
                attackSoundIA();
                if (firstHit.row === null && firstHit.col === null) {
                    firstHit.row = row;
                    firstHit.col = col;
                    console.log("Primer impacto");
                }
            }
            


            // Comprobar si hunde el barco
            let barcoImpactado = practicePlayerBoats.find(barco => 
                barco.tipo[0] === targetCell && 
                barco.coordenadas.some(coord => coord[0] === row && coord[1] === col)
            );            

            if (barcoImpactado) {

                barcoImpactado.vida -= 1;

                if (todosBarcosDestruidos(practicePlayerBoats)) {
                    partidaActiva = false;
                    pageLose();
                }


                if (barcoImpactado.vida === 0) {
                    showNotificationGame(`La IA ha destruït el un Servidor`,"Right","yellow"); //cambiar

                    // Resetear coordenadas de primer impacto
                    firstHit.row = null;
                    firstHit.col = null;
                    secondHit.row = null;
                    secondHit.col = null;

                    // Resetear direccion inteligente
                    direccionEncontrada = false;
                    cambioSentido = false;

                    // Resetear el modo ArmoredShips
                    celdaAcorazadaEncontrada = false;
                    celdaAcorazada = { row: null, col: null };

                    console.log("Reset")

                }
            }

            // Si se habilita la munición limitada y la IA se queda sin tiradas
            if (practiceAmmoEnabled && practiceEnemyAmmo === 0) {
                showNotification(`IA no te més RAM, torn de ${practicePlayerName}`,"Left","#3700ff");
                setTimeout(() => {
                    showNotification(`Torn de ${practicePlayerName}`,"Left","#3700ff");
                    playerTurn = true;
                    cambiarTurno(playerTurn)
                }, 3000);
                return;
            }

            // Si ha acertado, vuelve a tirar después de un pequeño retraso
            setTimeout(() => {
                iaSound();
                turnoIA();
            }, 2000);
        }

    } , 3000);
}


/* Ataques especiales */
let specialAttackButton1 = false;
let specialAttackButton2 = false;
let specialAttackButtonWannaCry = false;
let casillasComprobadas = [];
let comprobandoCeldas = false;
let repiteTurno = false;
let foundShip = false;
let barcosEncontrados = 0;
let barcoOcultoEncontrado = false;
let ataqueBasicoArmoredSpecialAttack = true;


function attackAdjacentCells(td, buttonId) {
    let row = td.parentElement.rowIndex;
    let col = td.cellIndex;

    specialAttackSound();

    console.log("Ataque especial en celda: ", row, col);

    // Deshabilitar boton, excepto specialAttackButtonWannaCry
    if (buttonId !== 'specialAttackButtonWannaCry') {
        const button = document.getElementById(buttonId);
        if (button) {
            button.disabled = true; // Deshabilitar el botón
        }
    }

    

    // Definir el tamaño de la cuadrícula
    const maxRows = 10; // Cambia esto según el tamaño de tu cuadrícula
    const maxCols = 10; // Cambia esto según el tamaño de tu cuadrícula
    


    // Posiciones adyacentes
    let adyacentes = [
        { r: row - 1, c: col },     // Celda arriba
        { r: row + 1, c: col },     // Celda abajo
        { r: row, c: col - 1 },     // Celda izquierda
        { r: row, c: col + 1 },     // Celda derecha
        { r: row - 1, c: col - 1 }, // Esquina arriba izquierda
        { r: row - 1, c: col + 1 }, // Esquina arriba derecha
        { r: row + 1, c: col - 1 }, // Esquina abajo izquierda
        { r: row + 1, c: col + 1 }  // Esquina abajo derecha
    ];

    // Filtrar posiciones adyacentes válidas
    adyacentes = adyacentes.filter(pos => 
        pos.r >= 1 && pos.r <= maxRows && pos.c >= 1 && pos.c <= maxCols
    );

    if (practiceAmmoEnabled) {
        // Menos de 4 de munición
        if (practicePlayerAmmo < 4) {
            if (gameMode = 'IA'){
                showNotificationGame("No tens suficient RAM per lançar WannaCry","Left", "#3700ff");
            }else{
                showNotificationGame("No tens suficient RAM per lançar WannaCry","Right", "#3700ff");
            }
            document.getElementById('specialAttackButtonWannaCry').classList.remove('active');
            document.getElementById('specialAttackButtonWannaCry').classList.add('disabled');
            specialAttackButtonWannaCry = false; // Asignación correcta
            return; // Salimos de la función si no hay suficiente munición
        }
    
        // Menos de 6 de munición y no es un borde
        if (practicePlayerAmmo < 6) {
            const row = td.parentElement.rowIndex; // Asegúrate de que `td` es el elemento correcto
            const col = td.cellIndex;
    
            // Verificar si estamos en un borde
            const isInBorder = (row === 1 || row === 10 || col === 1 || col === 10);
    
            // Solo mostrar la notificación si no es un borde
            if (!isInBorder) {
                if (gameMode = 'IA'){
                    showNotificationGame("No tens suficient RAM per lançar WannaCry","Left", "#3700ff");
                }else{
                    showNotificationGame("No tens suficient RAM per lançar WannaCry","Right", "#3700ff");
                }
                return; // Salimos de la función si no hay suficiente munición
            }
        }
    
        // Menos de 9 de munición y es una celda central
        if (practicePlayerAmmo < 9) {
            const row = td.parentElement.rowIndex; // Asegúrate de que `td` es el elemento correcto
            const col = td.cellIndex;
    
            // Verificar si estamos en una celda central (no en la primera o última fila/columna)
            const isCentralCell = (row > 1 && row < 10 && col > 1 && col < 10);
    
            if (isCentralCell) {
                if (gameMode = 'IA'){
                    showNotificationGame("No tens suficient RAM per lançar WannaCry","Left", "#3700ff");
                }else{
                    showNotificationGame("No tens suficient RAM per lançar WannaCry","Right", "#3700ff");
                }
                return; // Salimos de la función
            }
        }
    }
    
    

    // Recorre cada posición adyacente y realiza el ataque
    adyacentes.forEach(pos => {
        // Verifica que la celda esté dentro de los límites
        if (pos.r >= 0 && pos.c >= 0) { // Cambiado a >= 0 para incluir la primera fila y columna
            let adjTd = document.querySelector(`table#practiceEnemygameTable tr:nth-child(${pos.r + 1}) td:nth-child(${pos.c + 1})`);

            // Verifica que la celda exista y no haya sido atacada antes
            if (adjTd && !casillasComprobadas.some(casilla => casilla.row === pos.r && casilla.col === pos.c)) {
                // Agrega la celda a las comprobadas para evitar ataques repetidos

                // No agregar barcos si estan reforzados y no tienen la clase "cellArmored"
                if (!practiceArmoredShips || adjTd.classList.contains("cellArmored")) {
                    casillasComprobadas.push({ row: pos.r, col: pos.c });
                }

                // Lógica de comprobación de barcos
                for (let barco of barcos) {
                    // Si el barco es del mismo tipo que el tocado
                        // Recorrer las coordenadas del barco iterado
                        for (let coord of barco.coordenadas) {
                            // Comprobar si el barco iterado coincide con las coordenadas tocadas
                            if (coord[0] === pos.r && coord[1] === pos.c) {
                                foundShip = true; // Se encontró un barco
                                barcosEncontrados ++;

                                // Verificar si la celda es "armored"
                                if (adjTd.classList.contains("cellArmored")) {
                                    barco.vida -= 1; 
                                    adjTd.innerHTML = "X";
                                    puntos += 50;
                                    playerHits++;
                                    barcoOcultoEncontrado = true;
                                    if (gameMode = 'IA'){
                                        showNotificationGame("Has trobat un punt d'accés","Left", "#3700ff");
                                    }else{
                                        showNotificationGame("Has trobat un punt d'accés","Right", "#3700ff");
                                    }
                                    mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                                    actualizarPuntos();
                                }

                                break; // Sale del bucle si se encuentra un barco
                            }
                        }
                    
                }

                // Realiza el ataque en la celda adyacente
                comprobandoCeldas = true;
                // console.log("Celda: ", adjTd);
                changeDataCell(adjTd, "IA");
            }
        }
    });

    // Pasar el turno a IA con Ataque Especial y Barco Reforzados
    if (practiceArmoredShips && practiceSpecialAttacks && !barcoOcultoEncontrado)   {
        playerTurn = false;
        cambiarTurno();

        setTimeout(() => {
            iaSound();
            turnoIA();
        }, 2000);
    }

    barcoOcultoEncontrado = false;

    if (practiceAmmoEnabled) {
        if (practicePlayerAmmo < 4) {
            if (gameMode = 'IA'){
                showNotificationGame("No tens suficient memòria RAM","Left", "#3700ff");
            }else{
                showNotificationGame("No tens suficient memòria RAM","Right", "#3700ff");
            }
            document.getElementById('specialAttackButtonWannaCry').classList.remove('active');
            document.getElementById('specialAttackButtonWannaCry').classList.add('disabled');
            specialAttackButtonWannaCry === false;
        }
    }

    // Si se encontró un barco en celdas adyacentes, se repite el turno
    if (foundShip) {
        repiteTurno = true;
        if (barcosEncontrados > 1) {
            if (gameMode = 'IA'){
                showNotificationGame("Has trobat un punt d'accés","Left", "#3700ff");
            }else{
                showNotificationGame("Has trobat un punt d'accés","Right", "#3700ff");
            }
        } else {
            if (gameMode = 'IA'){
                showNotificationGame("Has trobat un Servidor","Left", "#3700ff");
            }else{
                showNotificationGame("Has trobat un Servidor","Right", "#3700ff");
            }
        }
    } else {
        repiteTurno = false;
        if (gameMode = 'IA'){
            showNotificationGame("Connexió bloquejada","Left", "#3700ff");
        }else{
            showNotificationGame("Connexió bloquejada","Right", "#3700ff");
        }
    }
    foundShip = false;
    barcosEncontrados = 0;
}




function specialAttack(buttonId) {
    const button = document.getElementById(buttonId);

    if (buttonId === 'specialAttackButton1') {
        if (specialAttackButton1) {
            specialAttackButton1 = false;
            button.classList.remove('active'); // Quitar la clase activa
            comprobandoCeldas = false;
            ataqueBasicoArmoredSpecialAttack = false;
        } else {
            specialAttackButton1 = true;
            button.classList.add('active');
            comprobandoCeldas = true;
            ataqueBasicoArmoredSpecialAttack = true;

        }

    } else if (buttonId === 'specialAttackButton2') {
        if (specialAttackButton2) {
            specialAttackButton2 = false;
            button.classList.remove('active'); 
            comprobandoCeldas = false;
            ataqueBasicoArmoredSpecialAttack = false;

        } else {
            specialAttackButton2 = true;
            button.classList.add('active'); 
            comprobandoCeldas = true;
            ataqueBasicoArmoredSpecialAttack = true;

        }

    } else if (buttonId === 'specialAttackButtonWannaCry') {
        if (!specialAttackButtonWannaCry && practicePlayerAmmo > 3) {
            specialAttackButtonWannaCry = true;
            comprobandoCeldas = true;
            button.classList.add('active');
            ataqueBasicoArmoredSpecialAttack = false;
        } 
    }
 
}




function changeDataCell(td, gameMode = 'IA') {
 
    // Vaciar mensaje de puntos
    if (debeVaciarMensajes) {
        vaciarMensajePuntos();
        debeVaciarMensajes = false; // Resetear la bandera
    }

    // Obtener atributos de la celda
    let name = td.getAttribute('name');     // Tipo de barco
    let row = td.parentElement.rowIndex;    // Fila
    let col = td.cellIndex;                 // Columna

    // Aplicar Easter Egg
    if (row === 3 && col === 4) { 
        activateEasterEgg(); 
    }

    // Municion limitada
    if (practiceAmmoEnabled) {
        // Restar municion a player
        if (practicePlayerAmmo > 0) {
            if (!specialAttackButtonWannaCry){
                practicePlayerAmmo--;
            }
            var ammoPlayerElement = document.getElementById('practicePlayerAmmo');
            ammoPlayerElement.textContent = practicePlayerAmmo + "/40";
            if (comprobarMunicionTerminada()) {
                mostrarMensaje("Ambos jugadores se han quedado sin munición", "yellow");
                setTimeout(() => {
                    determinarGanadorPorAciertos();
                }, 3000);
                return;
            }
        }
    }

    // Ataque especial
    if (specialAttackButton1 === true) {
        specialAttackButton1 = false; 
        ataqueBasicoArmoredSpecialAttack = false;
        attackAdjacentCells(td, 'specialAttackButton1');
        ataqueBasicoArmoredSpecialAttack = true;
    }
    if (specialAttackButton2 === true) {
        specialAttackButton2 = false;
        ataqueBasicoArmoredSpecialAttack = false;
        attackAdjacentCells(td, 'specialAttackButton2');
        ataqueBasicoArmoredSpecialAttack = true;

    }
    if (specialAttackButtonWannaCry === true) {

        ataqueBasicoArmoredSpecialAttack = false;

            // Municion limitada
            if (practiceAmmoEnabled) {  
                if (practicePlayerAmmo > 3) {
                    practicePlayerAmmo --;
                    specialAttackButtonWannaCry = false;
                    document.getElementById('specialAttackButtonWannaCry').classList.remove('active');

                    console.log("Entro en specialAttackButtonWannaCry");
                    attackAdjacentCells(td, 'specialAttackButtonWannaCry');

                    specialAttackButtonWannaCry === true;

                } else {
                    showNotificationPlayerGame("No tens suficient munició");
                    document.getElementById('specialAttackButtonWannaCry').classList.remove('active');
                    document.getElementById('specialAttackButtonWannaCry').classList.add('disabled');
                    practicePlayerAmmo --;
                    var ammoPlayerElement = document.getElementById('practicePlayerAmmo');
                    ammoPlayerElement.textContent = practicePlayerAmmo + "/40";
                    specialAttackButtonWannaCry === false;
                    playerTurn = false;
                    cambiarTurno();
            
                    setTimeout(() => {
                        iaSound();
                        turnoIA();
                    }, 2000);
                }
            }
        ataqueBasicoArmoredSpecialAttack = true;
    }

    // Elimina glitch de la tabla
    if (td.classList.contains("codeName") || td.classList.contains("cellArmored")) {
        td.classList.remove("codeName");


        // Marcar celda como atacada
        td.classList.add("dado");
        
        // Numero de turnos
        turnosTotales++;

        // Si toca agua
        if (name === " ") {

            td.innerHTML = "~"; 

            waterSoundIA();
            
            if (comprobandoCeldas == false) {
                if (gameMode = 'IA'){
                    showNotificationGame("¡Connexió bloquejada!","Left","#3700ff");
                }else{
                    showNotificationGame("¡¡Connexió bloquejada!!","Right","#3700ff");
                }
            }

            casillasComprobadas.push({ row: row, col: col });

            // Quitar 50 puntos por tocar agua 5 veces
            turnosAguaSeguidos++;
            if (turnosAguaSeguidos == 5) {
                puntos -= 50;
                actualizarPuntos();
                mostrarMensajePuntos("¡Has perdut 50 punts!");
                turnosAguaSeguidos = 0;
            }

            // Si se juega con IA
            if (practiceAmmoEnabled && practiceEnemyAmmo === 0) {
                setTimeout(() => {
                    playerTurn = false;
                    cambiarTurno();
                    if (gameMode = 'IA'){
                        showNotification(`IA no te memòria RAM, ${practicePlayerName} tira de nou`,"Left","#3700ff");
                    }else{
                        showNotification(`IA no te memòria RAM, ${practicePlayerName} tira de nou`,"Right","#3700ff");
                    }
                    setTimeout(() => {
                        playerTurn = true;
                        cambiarTurno(playerTurn);
                    }, 2000);
                }, 2000);
            } 

            // Modo normal
            else if (gameMode == 'IA' && comprobandoCeldas === false && repiteTurno === false) {

                playerTurn = false;
                cambiarTurno();
        
                setTimeout(() => {
                    iaSound();
                    turnoIA();
                }, 2000);
                

            }
            repiteTurno = false;
            
            // Booleano si hunde un barco al primer intento
            hundidoSinFallar = false; 

        // Si toca un barco
        } else {

            

            td.classList.remove("attackSound");

            playerHits++; // Acierto del jugador

            // Recorrer los barcos de IA o de Tutorial
            for (let barco of barcos) {

                // Si el barco es del mismo tipo que el tocado
                if (barco.tipo === name) {
                    // Coordenadas del barco iterado
                    let row = td.parentElement.rowIndex;
                    let col = td.cellIndex;
                    
                    // Recorrer las coordenadas del barco iterado
                    for (let coord of barco.coordenadas) {

                        // Comprobar si el barco iterado coincide con las coordenadas tocadas
                        if (coord[0] === row && coord[1] === col) {
                            

                            // Modo ArmoredShips primer hit
                            if (practiceArmoredShips && !td.classList.contains("cellArmored") && !practiceSpecialAttacks)   {
                                
                                hitArmoredShip();
                                

                                if (gameMode = 'IA'){
                                    showNotificationGame("Antivirus trencat","Left", "#3700ff");
                                }else{
                                    showNotificationGame("Antivirus trencat","Right", "#3700ff");
                                }
                                td.classList.remove("dado");
                                td.innerHTML = "?";
                                td.classList.add("cellArmored");
                                playerTurn = false;
                                cambiarTurno();

                                console.log("Cambio de turno 111");

                                setTimeout(() => {
                                    iaSound();
                                    turnoIA();
                                }, 2000);
                            } 
                            // Modo ArmoredShips primer hit con Special Attack
                            else if (practiceArmoredShips && !td.classList.contains("cellArmored") && practiceSpecialAttacks)   {
                                if (gameMode = 'IA'){
                                    showNotificationGame("Antivirus trencat","Left", "#3700ff");
                                }else{
                                    showNotificationGame("Antivirus trencat","Right", "#3700ff");
                                }
                                td.classList.remove("dado");
                                td.innerHTML = "?";
                                td.classList.add("cellArmored");

                                // No pasa turno a IA porque se activa la Special Attack

                                if (ataqueBasicoArmoredSpecialAttack){
                                    playerTurn = false;
                                    cambiarTurno();
                                    console.log("Cambio de turno 222");
                                    setTimeout(() => {
                                        turnoIA();           
                                    }, 2000);

                                }





                            }
                            // Modo ArmoredShips segundo hit
                            else if (practiceArmoredShips && td.classList.contains("cellArmored")) {
                                barco.vida -= 1; 
                                td.innerHTML = "X";
                                attackSoundIA();
                                casillasComprobadas.push({ row: row, col: col });
                                puntos += 50;
                                playerHits++;
                                
                                if (gameMode = 'IA'){
                                    showNotificationGame("Infiltració completada","Left", "#3700ff");
                                }else{
                                    showNotificationGame("Infiltració completada","Right", "#3700ff");
                                }
                                mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                                actualizarPuntos();
                            }
                            // Modo normal
                            else if (!practiceArmoredShips){
                                barco.vida -= 1; 
                                td.innerHTML = "X";
                                casillasComprobadas.push({ row: row, col: col });
                                puntos += 50;
                                playerHits++;
                                attackSoundIA();
                                if (practiceSpecialAttacks == false){
                                    if (gameMode = 'IA'){
                                        showNotificationGame("Infiltració completada!","Left", "#3700ff");
                                    }else{
                                        showNotificationGame("Infiltració completada!","Right", "#3700ff");
                                    } 
                                }
                                mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                                actualizarPuntos();
                            }


                            // Reestablece condición de turnos de agua seguidos
                            turnosAguaSeguidos = 0;

                            // Si el barco se hunde en la tirada
                            if (barco.vida === 0) {
                                if (practiceSpecialAttacks == false){
                                    if (gameMode = 'IA'){
                                        showNotificationGame(`¡Has trobat un Servidor!`,"Left", "#3700ff");
                                    }else{
                                        showNotificationGame(`¡Has trobat un Servidor!`,"Right", "#3700ff");
                                    } 
                                }
                                debeVaciarMensajes = true;

                                // Puntos si hunde el barco sin fallar
                                if (hundidoSinFallar) {
                                    let multiplicador = barco.tamaño;
                                    let puntosAntesMultiplicador = puntos; 
                                    puntos += puntosAntesMultiplicador * (multiplicador - 1); 
                                    actualizarPuntos();
                                    mostrarMensajePuntos("+" + (puntos - puntosAntesMultiplicador) + " per destruir una xarxa");
                                    mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop una xarxa de ${barco.tamaño} servidors!`);
                                }

                                // Puntos si hunde el barco mas grande en el primer intento
                                if (barco.tamaño == "4" && turnosTotales <= 4) {
                                    puntos += 6000; 
                                    actualizarPuntos();
                                    mostrarMensajePuntos("+6000 per destruir la xarxa més petita a la primera");
                                }

                                hundidoSinFallar = true;

                                // Cuando hunda todos los barcos
                                if (todosBarcosDestruidos(barcos)) {

                                    // Modo IA
                                    if (gameMode == 'IA') {
                                        calcularBonificacionPorTiempo();
                                        partidaActiva = false;
                                        pageWin();
                                    } 

                                    // Modo Tutorial
                                    else
                                    {
                                        const gameTitleElement = document.getElementById("gameTitle");
                                        gameTitleElement.innerText = "Felicitats has hackejat tots els servidors!!";
                                        getbackground();
                                        getText();
                                        changeMusic();
                                        mostrarBotones();
                                        mostrarNombre();
                                        calcularBonificacionPorTiempo();
                                        partidaActiva = false;
                                    }
                                }

                            }
                            // Si se habilita la munición limitada y el jugador se queda sin tiradas
                            if (practiceAmmoEnabled && practicePlayerAmmo < 1) {
                                playerTurn = false;  
                                cambiarTurno();    
                                setTimeout(() => {
                                    if (gameMode = 'IA'){
                                        showNotification(`${practicePlayerName} no te més memòria RAM, torn de la IA`,"Left","#3700ff");
                                    }else{
                                        showNotification(`${practicePlayerName} no te més memòria RAM, torn de la IA`,"Right","#3700ff");
                                    }     
                                }, 2000);
                                setTimeout(() => {
                                    turnoIA();           
                                }, 4000);

                                return;
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
    comprobandoCeldas = false;
}

/* ********************************** */
/* MARK: Ganar Partida -> Guardar nombre*/
/* ********************************** */

// Guardar Nombre, Puntos y Fecha en ranking.txt
function saveScore() {
    var playerName = document.getElementById("inputNameWinLose").value; // Obtener el nombre del jugador
    var points = document.querySelector(".points").textContent.split(": ")[1];  // Obtener puntos

    // Formatear la fecha y la hora
    var options = { 
        timeZone: "Europe/Madrid", 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    };
    var now = new Date();
    var dateTimeFormat = new Intl.DateTimeFormat('es-ES', options);
    var formattedDate = dateTimeFormat.format(now).replace(/\//g, '-').replace(',', '');

    // Separar fecha y hora
    var [date, time] = formattedDate.split(' ');
    formattedDate = date + ' ' + time.split(':').join(':');

    const errorMessage = document.getElementById('errorMessage');
    const successMessageContainer = document.getElementById('successMessageContainer'); // Contenedor para el mensaje de éxito

    // Comprobar la longitud del nombre del jugador
    if (playerName.length < 3) {
        errorMessage.style.display = 'block'; // Mostrar mensaje de error
        return; // No continuar si el nombre es demasiado corto
    } else {
        errorMessage.style.display = 'none'; // Ocultar mensaje si es válido
    }

    // Crear un objeto con los datos del jugador
    var playerData = {
        name: playerName,
        score: points,
        date: formattedDate // Usar la fecha formateada
    };  

                        // Ocultar el botón
                        document.getElementById("nameButton").style.display = 'none'; 

                        // Crear un nuevo párrafo para el mensaje de éxito
                        var successMessage = document.createElement("p");
                        successMessage.textContent = "La teva puntuació ha estat guardada!";
                        successMessage.className = "successMessage"; // Puedes añadir una clase para estilizarlo
                        successMessageContainer.appendChild(successMessage); // Añadir el mensaje al contenedor
                        
                        ocultarNombre(); // Llama a la función para ocultar el nombre si es necesario
                    

    // Enviar los datos al archivo PHP mediante POST
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "ranking.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    // Ocultar el botón
                    document.getElementById("nameButton").style.display = 'none'; 

                    // Crear un nuevo párrafo para el mensaje de éxito
                    var successMessage = document.createElement("p");
                    successMessage.textContent = "La teva puntuació ha estat guardada!";
                    successMessage.className = "successMessage"; // Puedes añadir una clase para estilizarlo
                    successMessageContainer.appendChild(successMessage); // Añadir el mensaje al contenedor
                    
                    ocultarNombre(); // Llama a la función para ocultar el nombre si es necesario
                } else {
                    console.error("Error al guardar el registro: " + response.message);
                }
            } else {
                console.error("Error en la petición: " + xhr.status);
            }
        }
    };

    // Ocultar el botón antes de enviar la solicitud
    document.getElementById("nameButton").style.display = 'none'; 
    xhr.send(JSON.stringify(playerData));
}





/* ********* */
/* MARK: Sonidos*/
/* ********* */

//Para que se escuche la musica de fondo
document.addEventListener('DOMContentLoaded', () => {
    const bodyId = document.body.id;
    let audioSrc;

    switch (bodyId) {
        case 'index':
            audioSrc = 'sounds/backgroundSoundIndex.mp3';
            break;
        case 'bodyRanking':
            audioSrc = 'sounds/backgroundSoundIndex.mp3';
            break;
        case 'game':
            audioSrc = 'sounds/backgroundSoundGame.mp3';
            break;
        case 'bodyWin':
            audioSrc = 'sounds/winSound.mp3';
            break;
        case 'bodyLose':
            audioSrc = 'sounds/loseSound.mp3';
            break;
        default:
            console.error('No audio source found for this page.');
            return;
    }

    const audioContainer = document.getElementById('audioContainer');
    let audio = document.getElementById('backgroundSound');

    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'backgroundSound';
        audio.autoplay = true;
        audio.loop = true;
        audioContainer.appendChild(audio);
    }

    audio.src = audioSrc;

    /* Aplicar el estado guardado del audio
    if (localStorage.getItem('audioMuted') === 'true') {
        audio.muted = true;
        document.getElementById('audioControlButton').textContent = 'Unmute';
    } else {
        audio.muted = false;
        document.getElementById('audioControlButton').textContent = 'Mute';
    }

    // Control del botón de sonido
    const audioControlButton = document.getElementById('audioControlButton');
    if (audioControlButton) {
        audioControlButton.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                audioControlButton.textContent = 'Mute';
                localStorage.setItem('audioMuted', 'false');
            } else {
                audio.muted = true;
                audioControlButton.textContent = 'Unmute';
                localStorage.setItem('audioMuted', 'true');
            }
        });
    }*/
});

//Cambia la musica por la de win
function changeMusic(){
    const audio = document.getElementById('backgroundSound');
    if (audio) {
        audio.src = 'sounds/winSound.mp3';
        audio.play();
    } 
}

//Sonido botones
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.keySound');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            const sound = new Audio('sounds/KeySound1.mp3');
            sound.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
        });
    });
});

// Sonido de cuando le da a un barco 
// document.addEventListener("DOMContentLoaded", function() {
//     const buttons = document.querySelectorAll('.attackSound');
    
//     if (!practiceArmoredShips) {
//         buttons.forEach(button => {
//             button.addEventListener('click', function() {
//                 const sound = new Audio('sounds/attackSound.mp3');
//                 sound.play().catch(error => {
//                     console.error('Error al reproducir el sonido:', error);
//                 });
//             });
//         });
//     }
    
// });

// Sonido cunado le da al agua
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.waterSound');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sound = new Audio('sounds/waterSound.mp3');
            sound.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
        });
    });
});

//Funciones de click

// Sonido de la espera del ataque de la IA
function iaSound() {
    var sonido = document.getElementById('iaSound');
    sonido.play();
}

// Sonido de cuando le da a un barco la IA
function attackSoundIA() {
    var sonido = document.getElementById('attackSoundIA');
    sonido.play();
}

// Sonido ataque especial
function specialAttackSound() {
    var sonido = document.getElementById('specialAttackSound');
    sonido.play();
}

// Sonido barco acorazado encontrado
function hitArmoredShip() {
    var sonido = document.getElementById('hitArmoredShip');
    sonido.play();
}

// Sonido cunado le da al agua la IA
function waterSoundIA() {
    var sonido = document.getElementById('waterSoundIA');
    sonido.play();
}

/* **************** */
/* MARK: Notificaciones*/
/* **************** */

// Notificaciones CSS

// Notifica Turno, direcion de la notificacion y el color del borde
function showNotification(message, direction, color) {
    // Obtiene el contenedor donde se mostrarán las notificaciones
    const container = document.getElementById('notificationContainer');

    // Crea un nuevo elemento div para la notificación
    const notification = document.createElement('div');
    
    // Añade la clase CSS para el estilo de la notificación
    notification.classList.add('notificationGame');
    
    // Establece el texto de la notificación
    notification.innerText = message;

    // Determina la dirección de la notificación
    if (direction === "Left") {
        // Si la dirección es "Left", añade la clase correspondiente
        notification.classList.add('notificationLeft');
    } else {
        // Si no, se asume que la dirección es "Right" y se añade la clase correspondiente
        notification.classList.add('notificationRight');
    }

    // Aplica el color del borde que se pasa como argumento
    notification.style.borderColor = color;

    // Añade la notificación al contenedor
    container.appendChild(notification);

    // Configura un temporizador para eliminar la notificación después de 3 segundos
    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

// Notifica Si le ha dado al barco o no, direcion de la notificacion y el color del borde
function showNotificationGame(message, direction, color) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.classList.add('notificationGame');
    notification.innerText = message;

    if (direction === "Left") {
        notification.classList.add('notificationLeftGame');
    } else {
        notification.classList.add('notificationRightGame');
    }

    notification.style.borderColor = color; // Aplica el color para ambas direcciones si es necesario.

    container.appendChild(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

// Mostrar / Ocultar opciones adicionales

function showCheckboxAdvanced() {
    var extraOptions = document.getElementById('extraOptions');
    
    // Usamos getComputedStyle para obtener el estilo actual
    var display = window.getComputedStyle(extraOptions).display;

    if (display === 'none' || display === '') {
        // Aseguramos que las clases de animación estén removidas antes de comenzar
        extraOptions.classList.remove('extraOptionsOutputMove');
        extraOptions.style.display = 'block'; // Muestra las opciones
        // Añadimos la clase de animación de entrada
        extraOptions.classList.add('extraOptionsEntryMove');
    } else {
        // Añadimos la clase de animación de salida
        extraOptions.classList.add('extraOptionsOutputMove');
        
        // Usa setTimeout para esperar hasta que la animación termine
        setTimeout(function() {
            extraOptions.style.display = 'none'; // Oculta las opciones
            extraOptions.classList.remove('extraOptionsOutputMove'); // Remueve la clase después de ocultar
        }, 1000); // Ajusta el tiempo según la duración de tu animación
    }
}