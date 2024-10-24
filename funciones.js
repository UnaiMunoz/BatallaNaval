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

    // Mostrar opciones avanzadas sin recargar la página
    extraOptionsBtn.onclick = function(event) {
        event.preventDefault();
        extraOptions.style.display = extraOptions.style.display === 'none' ? 'block' : 'none';
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
window.onload = iniciarCronometro;

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

function showCheckbox() {
    var extraOptions = document.getElementById('extraOptions');
    var btn = document.getElementById('extraOptionsBtn');
    var optionsForm = document.getElementById('optionsForm');
    
    // Usamos getComputedStyle para obtener el estilo actual
    var display = window.getComputedStyle(extraOptions).display;

    if (display === 'none') {
        extraOptions.style.display = 'block'; // Muestra las opciones
    } else {
        extraOptions.style.display = 'none'; // Oculta las opciones
    }
}

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

            if (mode == 'practice') {
                clearInterval(cronometro);
                pageWin();
            } else{
                // Para el timer
                clearInterval(cronometro);
                //mostrarMensaje("Has guanyat la partida!");
                partidaActiva = false; // Desactivar la partida
                calcularBonificacionPorTiempo(); // Llama a la bonificación final
                mostrarNombre();
                mostrarBotones();
            }
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
    
    if (playerHits > iaHits) {
        mostrarMensaje("¡Has ganado la partida por tener más aciertos!", "green");
        pageWin();
    } else if (iaHits > playerHits) {
        mostrarMensaje("La IA ha ganado la partida por tener más aciertos.", "red");
        pageLose();
    } else {
        mostrarMensaje("La IA ha ganado por empate.", "blue");
        pageLose();
    }
    
    mostrarBotones();
    mostrarNombre();
    calcularBonificacionPorTiempo();
}


// Turno de la IA
function turnoIA() {
    if (partidaActiva && !playerTurn) {
        if (practiceAmmoEnabled && practiceEnemyAmmo === 0 && practicePlayerAmmo === 0) {
            setTimeout(determinarGanadorPorAciertos, 2000);
            return;
        } else if (practiceAmmoEnabled && practiceEnemyAmmo === 0) {
            setTimeout(() => {
                showNotificationIA("La IA no tiene más munición. Turno de Player.");
                //mostrarMensaje("La IA no tiene más munición. Turno de Player.", "yellow");
                playerTurn = true;
                cambiarTurno(playerTurn);
            }, 2000);
            return;
        }

        let row, col;
        let hit = false;
        let barcoHundido = false;

        do {
            row = Math.floor(Math.random() * 10) + 1;
            col = Math.floor(Math.random() * 10) + 1;
        } while (attackedPositions.some(pos => pos.row === row && pos.col === col));

        const td = document.querySelector(`tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
        
        if (td) {
            let name = td.getAttribute('name');

            // Almacenar posición atacada
            attackedPositions.push({ row: row, col: col }); // Guardar la posición en attackedPositions
            
            //Suena la musica de espera
            iaSound();

            showNotificationIA("Torn de IA, pensant moviment...");

            // Esperar 2 segundos antes de mostrar el resultado del ataque de la IA
            setTimeout(() => {
                //mostrarMensaje("Torn de IA, pensant moviment...", "yellow");
            }, 2000);

            setTimeout(() => {
                if (practiceAmmoEnabled) {
                    if (practiceEnemyAmmo === 0 && practicePlayerAmmo === 0) {
                        setTimeout(determinarGanadorPorAciertos, 2000);
                        return;
                    }

                    practiceEnemyAmmo--;
                    document.getElementById('practiceEnemyAmmo').textContent = practiceEnemyAmmo + "/40";
                }

                if (name === " ") {
                    td.innerHTML = "~"; 
                    td.style.backgroundColor = "blue";
                    showNotificationIAGame("La IA ha fallat");
                    //mostrarMensaje("La IA ha fallat", "yellow");
                    waterSoundIA();
                    if (practiceAmmoEnabled && practicePlayerAmmo === 0) {
                        setTimeout(() => {
                            showNotificationIA("Player no tiene más munición. Sigue el turno de la IA.");
                            //mostrarMensaje("Player no tiene más munición. Sigue el turno de la IA.", "yellow");
                        }, 2000);
                        playerTurn = false;
                        //Suena la musica de espera
                        iaSound();
                        setTimeout(turnoIA, 2000);
                    } else {
                        setTimeout(() => {
                            showNotificationPlayer("Turno de Player.");
                            //mostrarMensaje("Turno de Player.", "yellow");
                            playerTurn = true;
                            cambiarTurno(playerTurn);
                        }, 2000);
                    }
                } else {
                    attackSoundIA();
                    for (let barco of barcos) {
                        if (barco.tipo === name) {
                            barco.vida -= 1;
                            td.innerHTML = "X"; 
                            td.style.backgroundColor = "red";
                            //mostrarMensaje(`¡La IA ha tocado una xarxa de ${barco.tamaño}!`, "yellow");
                            iaHits++;  // Incrementar aciertos de la IA

                            if (barco.vida === 0) {
                                barcoHundido = true;
                                setTimeout(() => showNotificationIAGame(`¡La IA ha hundido una xarxa amb ${barco.tamaño} servidors!`), 2000);
                                //setTimeout(() => mostrarMensaje(`¡La IA ha hundido una xarxa amb ${barco.tamaño} servidors!`, "red"), 2000);
                            }else{
                                showNotificationIAGame("¡La IA ha tocado una xarxa!");
                            }

                            hit = true;
                            break;
                        }
                    }

                    if (hit && barcoHundido) {
                        setTimeout(() => {
                            //showNotificationIAGame(`¡La IA ha hundido una xarxa amb ${barco.tamaño} servidors!`)
                            //Suena la musica de espera
                            iaSound();
                            setTimeout(turnoIA, 2000);
                        }, 200);
                    } else if (hit) {
                        //showNotificationIAGame("¡La IA ha tocado una xarxa!");
                        //Suena la musica de espera
                        iaSound();
                        setTimeout(turnoIA, 2000);
                    }
                }
            }, 2000);
        }
    }
}

function oscurecerTablero(tablero) {
    tablero.classList.add('tablero-oculto');
}

function habilitarTablero(tablero) {
    tablero.classList.remove('tablero-oculto');
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

function changeDataCell(td, gameMode = 'IA') {
    if (!partidaActiva) return; // Si la partida no está activa, no hacer nada

    if (debeVaciarMensajes) {
        vaciarMensajePuntos();
        debeVaciarMensajes = false; // Resetear la bandera
    }

    let name = td.getAttribute('name'); 
    let row = td.parentElement.rowIndex; 
    let col = td.cellIndex; 

    if (row === 3 && col === 4) { 
        activateEasterEgg(); 
    }

    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");
        
        turnosTotales++;

        if (practiceAmmoEnabled == true) {
            practicePlayerAmmo--;
            var ammoPlayerElement = document.getElementById('practicePlayerAmmo');
            ammoPlayerElement.textContent = practicePlayerAmmo + "/40";

            if (practicePlayerAmmo == 0 && practiceEnemyAmmo > 0) {
                showNotificationPlayerGame("No tienes más munición. Turno de la IA.");
                //mostrarMensaje("No tienes más munición. Turno de la IA.", "yellow");
                cambiarTurno();
                playerTurn = false;
                setTimeout(turnoIA, 2000); 
                return;
            }
        }

        if (name === " ") {
            td.innerHTML = "~"; 
            showNotificationPlayerGame("¡Has fallat!");

            if (practiceAmmoEnabled === true && practiceEnemyAmmo > 0) {
                cambiarTurno(); 
                playerTurn = false;
                setTimeout(turnoIA, 2000);
            } else if (practiceAmmoEnabled === true && practiceEnemyAmmo === 0) {
                showNotificationPlayer("La IA no tiene más munición. Sigue tu turno.");
                //mostrarMensaje("La IA no tiene más munición. Sigue tu turno.", "yellow");
                playerTurn = true;
            } else if (practiceAmmoEnabled === false) {
                cambiarTurno();
                playerTurn = false;
                setTimeout(turnoIA, 2000);
            }

            turnosAguaSeguidos++;
            if (turnosAguaSeguidos >= 5) {
                puntos -= 50;
                actualizarPuntos();
                mostrarMensajePuntos("¡Has perdut 50 punts!");
                turnosAguaSeguidos = 0;
            }

            hundidoSinFallar = false; 

        } else {
            hundidoSinFallar = true; 
            for (let barco of barcos) {
                if (barco.tipo === name) {
                    let row = td.parentElement.rowIndex;
                    let col = td.cellIndex;

                    for (let coord of barco.coordenadas) {
                        if (coord[0] === row && coord[1] === col) {
                            barco.vida -= 1; 
                            td.innerHTML = "X"; 
                            showNotificationPlayerGame("Has tocat una xarxa!");
                            //mostrarMensaje(`¡Has tocat una xarxa de ${barco.tamaño}!`);
                            puntos += 50; 
                            playerHits++;  // Incrementar aciertos del jugador
                            mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                            actualizarPuntos();

                            turnosAguaSeguidos = 0;

                            if (barco.vida === 0) {
                                barcosHundidos++; 
                                showNotificationPlayerGame(`¡Tens el control de la xarxa amb ${barco.tamaño} servidors`);
                                //mostrarMensaje(`¡Tens el control de la xarxa amb ${barco.tamaño} servidors`);
                                debeVaciarMensajes = true;

                                if (hundidoSinFallar) {
                                    let multiplicador = barco.tamaño;
                                    let puntosAntesMultiplicador = puntos; 
                                    puntos += puntosAntesMultiplicador * (multiplicador - 1); 
                                    mostrarMensajePuntos("+" + (puntos - puntosAntesMultiplicador) + " per destruir una xarxa");
                                    actualizarPuntos();
                                    mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop una xarxa de ${barco.tamaño} servidors!`);
                                }

                                if (barco.tamaño == "4" && turnosTotales <= 4) {
                                    puntos += 6000; 
                                    actualizarPuntos();
                                    mostrarMensajePuntos("+6000 per destruir la xarxa més petita a la primera");
                                }

                                hundidoSinFallar = true;

                                if (todosBarcosDestruidos()) {
                                    if (gameMode = 'IA') {
                                        calcularBonificacionPorTiempo();
                                        partidaActiva = false;
                                        pageWin();
                                    } else{
                                        calcularBonificacionPorTiempo();
                                        partidaActiva = false;
                                        pageWin();
                                        // getbackground();
                                        // getText();
                                        // changeMusic();
                                        // const gameTitleElement = document.getElementById("gameTitle");
                                        // gameTitleElement.innerText = "Felicitats has hackejat tots els servidors!!";
                                        // mostrarBotones();
                                        // mostrarNombre();
                                        // calcularBonificacionPorTiempo();
                                        // partidaActiva = false; // Desactivar la partida
                                    }
                                }
                            }
                            return;
                        }
                    }
                }
            }
        }

        if (practiceAmmoEnabled === true && practiceEnemyAmmo == 0 && practicePlayerAmmo == 0) {
            determinarGanadorPorAciertos();  // Llamada para determinar el ganador
            return;
        }
    }
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
                        successMessage.textContent = "Tu puntuación ha sido guardada!";
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
                    successMessage.textContent = "Tu puntuación ha sido guardada!";
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
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.attackSound');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sound = new Audio('sounds/attackSound.mp3');
            sound.play().catch(error => {
                console.error('Error al reproducir el sonido:', error);
            });
        });
    });
});

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

// Sonido cunado le da al agua la IA
function waterSoundIA() {
    var sonido = document.getElementById('waterSoundIA');
    sonido.play();
}

/* **************** */
/* MARK: Notificaciones*/
/* **************** */

// Notificaciones CSS

// Notifica el turno del jugador
function showNotificationPlayer(message) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.classList.add('notificationGame');

    notification.classList.add('notificationPlayer');
    notification.innerText = message;

    container.appendChild(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

// Notifica Si le ha dado al barco o no
function showNotificationPlayerGame(message) {
    const container = document.getElementById('notificationContainerGame');
    const notification = document.createElement('div');
    notification.classList.add('notificationGame');

    notification.classList.add('notificationPlayerGame');
    notification.innerText = message;

    container.appendChild(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

// Notifica el turno de la IA
function showNotificationIA(message) {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.classList.add('notificationGame');
    
    notification.classList.add('notificationIA');
    notification.innerText = message;

    container.appendChild(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

// Notifica si la IA le ha dado al barco o no
function showNotificationIAGame(message) {
    const container = document.getElementById('notificationContainerGame');
    const notification = document.createElement('div');
    notification.classList.add('notificationGame');
    
    notification.classList.add('notificationIAGame');
    notification.innerText = message;

    container.appendChild(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, 3000);
}

/* Permitir y no permitir click */

function disableClick() {
    document.getElementById('notTouch').classList.add('no-clickeable');
}

function allowClick() {
    document.getElementById('notTouch').classList.remove('no-clickeable');
}

// Mostrar / Ocultar opciones adicionales

function showCheckbox() {
    var extraOptions = document.getElementById('extraOptions');
    var btn = document.getElementById('extraOptionsBtn');
    var optionsForm = document.getElementById('optionsForm');
    
    // Usamos getComputedStyle para obtener el estilo actual
    var display = window.getComputedStyle(extraOptions).display;

    if (display === 'none') {
        extraOptions.style.display = 'block'; // Muestra las opciones
    } else {
        extraOptions.style.display = 'none'; // Oculta las opciones
    }
}