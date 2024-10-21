
// Script para habilitar el botón Classic Game si JavaScript está habilitado
document.addEventListener('DOMContentLoaded', function() {
    var classicGameBtn = document.getElementById('classicGameBtn');
    classicGameBtn.classList.remove('disabled'); // Elimina la clase disabled
    classicGameBtn.removeAttribute('disabled'); // Quita el atributo disabled
    classicGameBtn.onclick = function() {
        window.location.href = 'game.php'; // Redirige al hacer clic
    };
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
    const button = document.querySelector('#buttonName'); // Usa el ID específico

    if (input && button) {
        input.style.display = 'none'; // Ocultar el input
        button.style.display = 'none'; // Ocultar el botón
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

/* *********************** */
/* Logica juego Tutorial   */
/* *********************** */

function applyEasterEggTutorial () {
    // Variables para el Easter Egg (Tienes que pulsar la casilla C4)
    let clickCounterC4 = 0; // Contador de clics para "C4"
    const originalTitle = "Binary Battleship"; // Título original

    return function() {
        clickCounterC4++; // Incrementar el contador

        if (clickCounterC4 === 5) {

            // Deshabilita el clic
            disableClick();

            const gameTitleElement = document.getElementById("gameTitle");
            
            // Cambiar el título a vacío para ocultar el texto original
            gameTitleElement.innerText = "";

            // Aplicar la clase
            gameTitleElement.classList.add("glitchTitle");

            // Cambiar el título a lo que deseas mostrar durante la animación
            setTimeout(() => {
                gameTitleElement.innerText = "Incompliment de la seguretat: accés total concedit!!";

            }, 0); // Mostrar el texto del Easter Egg inmediatamente

            setTimeout(() => {
                gameTitleElement.innerText = originalTitle; // Restaurar el título original
                // Eliminar la clase
                gameTitleElement.classList.remove("glitchTitle");  
                // Habilita el clic
                allowClick();
            }, 5000); // Eliminar después de 5 segundos

            clickCounterC4 = 0; // Reiniciar el contador

            // Para el timer
            clearInterval(cronometro);
            mostrarMensaje("Has guanyat la partida!");
            partidaActiva = false; // Desactivar la partida
            calcularBonificacionPorTiempo(); // Llama a la bonificación final
            mostrarNombre();
            mostrarBotones();
        }
    };
}



// Crear una instancia de la función de Easter Egg
const activateEasterEggTutorial = applyEasterEggTutorial();

let debeVaciarMensajes = false;

function changeDataCellTutorial(td) {
    if (!partidaActiva) return; // Si la partida no está activa, no hacer nada

    if (debeVaciarMensajes) {
        vaciarMensajePuntos();
        debeVaciarMensajes = false; // Resetear la bandera
    }

    // Obtener el atributo 'name' de la celda (nombre del barco o vacío)
    let name = td.getAttribute('name'); 

    // Verificar si es la casilla "C4"
    let row = td.parentElement.rowIndex; // Obtener índice de fila
    let col = td.cellIndex; // Obtener índice de columna

    if (row === 3 && col === 4) { // C4 corresponde a la fila 3 y columna 4
        activateEasterEggTutorial(); // Llamar a la función para manejar el título
    }

    // Comprobar si el clic corresponde a una casilla con un barco
    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");
        
        // Incrementa el número total de turnos
        turnosTotales++; 

        if (name === " ") {
            // Casilla vacía (agua)
            td.innerHTML = "~"; 
            mostrarMensaje("¡Has fallat!");
            turnosAguaSeguidos++; // Incrementa la cantidad de turnos sin tocar un barco

            // Si hay 5 turnos de agua seguidos, restar 50 puntos
            if (turnosAguaSeguidos >= 5) {
                puntos -= 50;
                actualizarPuntos();
                mostrarMensajePuntos("¡Has perdut 50 punts!");
                turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua seguidos
            }

            // Rompe la cadena de hundir sin fallar
            hundidoSinFallar = false; 
        } else {
            // Impacto en un barco7
            hundidoSinFallar = true; 
            for (let barco of barcos) {
                if (barco.tipo === name) {
                    let row = td.parentElement.rowIndex; // Obtener índice de fila
                    let col = td.cellIndex; // Obtener índice de columna

                    for (let coord of barco.coordenadas) {
                        if (coord[0] === row && coord[1] === col) {
                            // Reducir la vida del barco
                            barco.vida -= 1; 
                            td.innerHTML = "X"; // Indicar que el barco ha sido tocado
                            // mostrarMensaje(`¡Has tocat ${barco.tipo}!`);
                            mostrarMensaje(`¡Has tocat una xarxa!`);
                            puntos += 50; // Sumar 50 puntos por tocar un barco
                            mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                            actualizarPuntos();

                            turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua

                            // Verificar si el barco ha sido hundido
                            if (barco.vida === 0) {
                                barcosHundidos++; // Incrementar barcos hundidos
                                // mostrarMensaje(`Has enfonsat ${barco.tipo}!`);
                                mostrarMensaje(`¡Tens el control de la xarxa amb ${barco.tamaño} servidors`);
                                debeVaciarMensajes = true;

                                // **Multiplicador si hundes sin fallar**
                                if (hundidoSinFallar) {
                                    let multiplicador = barco.tamaño;

                                    // Guardamos los puntos antes de aplicar el multiplicador
                                    let puntosAntesMultiplicador = puntos; 

                                    // Aplicar el multiplicador correctamente
                                    puntos += puntosAntesMultiplicador * (multiplicador - 1); 
                                    mostrarMensajePuntos("+" + (puntos - puntosAntesMultiplicador) + " per destruir una xarxa");
                                    actualizarPuntos();
                                    // mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop ${barco.tipo}!`);
                                    mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop una xarxa de ${barco.tamaño} servidors!`);

                                }

                                // **Multiplicador especial para Fragata**
                                if (barco.tamaño == "4") {
                                    if (turnosTotales <= 4) {
                                        /*puntos += 3000; // Bonus por hundir la Fragata en 2 turnos
                                        puntos *= 2; // Multiplicador adicional*/
                                        puntos += 6000;
                                        actualizarPuntos();
                                        mostrarMensajePuntos("¡Bonus de punts per enfonsar un Servidor en 4 torns!");
                                        mostrarMensajePuntos("+6000 per destruir la Servidor més gran a la primera");                                        
                                    }
                                }


                                hundidoSinFallar = true;

                                if (todosBarcosDestruidos()) {
                                    /*mostrarMensaje("Has guanyat la partida!");
                                    partidaActiva = false; // Desactivar la partida
                                    mostrarBotones();
                                    mostrarNombre();
                                    calcularBonificacionPorTiempo(); // Llama a la bonificación final*/
                                    
                                    // Deshabilita el clic
                                    disableClick();

                                    const gameTitleElement = document.getElementById("gameTitle");
                                    
                                    // Cambiar el título a vacío para ocultar el texto original
                                    gameTitleElement.innerText = "";

                                    // Aplicar la clase
                                    gameTitleElement.classList.add("glitchTitle");

                                    // Cambiar el título a lo que deseas mostrar durante la animación
                                    setTimeout(() => {
                                        gameTitleElement.innerText = "Tots els servidors hackejats!!";

                                    }, 0); // Mostrar el texto del Easter Egg inmediatamente

                                    setTimeout(() => {
                                        gameTitleElement.classList.remove("glitchTitle");  
                                        // Habilita el clic
                                        allowClick();
                                    }, 5000); // Eliminar después de 5 segundos

                                    clickCounterC4 = 0; // Reiniciar el contador

                                    // Para el timer
                                    clearInterval(cronometro);
                                    mostrarMensaje("Has guanyat la partida!");
                                    partidaActiva = false; // Desactivar la partida
                                    calcularBonificacionPorTiempo(); // Llama a la bonificación final
                                    mostrarNombre();
                                    mostrarBotones();
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

/* ******************* */
/* Logica juego Game   */
/* ******************* */

function applyEasterEggGame() {
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
            /*mostrarMensaje("Has guanyat la partida!");
            calcularBonificacionPorTiempo(); // Llama a la bonificación final
            mostrarNombre();
            mostrarBotones();*/
            clearInterval(cronometro); // Para el timer
            partidaActiva = false; // Desactivar la partida
            window.location.href = 'win.php'; // Redirige a win.php
        }
    };
}

// Crear una instancia de la función de Easter Egg
const activateEasterEggGame = applyEasterEggGame();

function changeDataCellGame(td) {
    if (!partidaActiva) return; // Si la partida no está activa, no hacer nada

    if (debeVaciarMensajes) {
        vaciarMensajePuntos();
        debeVaciarMensajes = false; // Resetear la bandera
    }

    // Obtener el atributo 'name' de la celda (nombre del barco o vacío)
    let name = td.getAttribute('name'); 

    // Verificar si es la casilla "C4"
    let row = td.parentElement.rowIndex; // Obtener índice de fila
    let col = td.cellIndex; // Obtener índice de columna

    if (row === 3 && col === 4) { // C4 corresponde a la fila 3 y columna 4
        activateEasterEggGame(); // Llamar a la función para manejar el título
    }

    // Comprobar si el clic corresponde a una casilla con un barco
    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");
        
        // Incrementa el número total de turnos
        turnosTotales++; 

        if (name === " ") {
            // Casilla vacía (agua)
            td.innerHTML = "~"; 
            mostrarMensaje("¡Has fallat!");
            turnosAguaSeguidos++; // Incrementa la cantidad de turnos sin tocar un barco

            // Si hay 5 turnos de agua seguidos, restar 50 puntos
            if (turnosAguaSeguidos >= 5) {
                puntos -= 50;
                actualizarPuntos();
                mostrarMensajePuntos("¡Has perdut 50 punts!");
                turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua seguidos
            }

            // Rompe la cadena de hundir sin fallar
            hundidoSinFallar = false; 
        } else {
            // Impacto en un barco7
            hundidoSinFallar = true; 
            for (let barco of barcos) {
                if (barco.tipo === name) {
                    let row = td.parentElement.rowIndex; // Obtener índice de fila
                    let col = td.cellIndex; // Obtener índice de columna

                    for (let coord of barco.coordenadas) {
                        if (coord[0] === row && coord[1] === col) {
                            // Reducir la vida del barco
                            barco.vida -= 1; 
                            td.innerHTML = "X"; // Indicar que el barco ha sido tocado
                            // mostrarMensaje(`¡Has tocat ${barco.tipo}!`);
                            mostrarMensaje(`¡Has tocat una xarxa de ${barco.tamaño}!`);
                            puntos += 50; // Sumar 50 puntos por tocar un barco
                            mostrarMensajePuntos("+50 punts per atacar un servidor\n");
                            actualizarPuntos();

                            turnosAguaSeguidos = 0; // Reinicia el contador de turnos de agua

                            // Verificar si el barco ha sido hundido
                            if (barco.vida === 0) {
                                barcosHundidos++; // Incrementar barcos hundidos
                                // mostrarMensaje(`Has enfonsat ${barco.tipo}!`);
                                mostrarMensaje(`¡Tens el control de la xarxa amb ${barco.tamaño} servidors`);
                                debeVaciarMensajes = true;

                                // **Multiplicador si hundes sin fallar**
                                if (hundidoSinFallar) {
                                    let multiplicador = barco.tamaño;

                                    // Guardamos los puntos antes de aplicar el multiplicador
                                    let puntosAntesMultiplicador = puntos; 

                                    // Aplicar el multiplicador correctamente
                                    puntos += puntosAntesMultiplicador * (multiplicador - 1); 
                                    mostrarMensajePuntos("+" + (puntos - puntosAntesMultiplicador) + " per destruir una xarxa");
                                    actualizarPuntos();
                                    // mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop ${barco.tipo}!`);
                                    mostrarMensajePuntos(`¡Punts multiplicats per ${multiplicador} en enfonsar de cop una xarxa de ${barco.tamaño} servidors!`);

                                }

                                // **Multiplicador especial para Fragata**
                                if (barco.tamaño == "4") {
                                    if (turnosTotales <= 4) {
                                        /*puntos += 3000; // Bonus por hundir la Fragata en 2 turnos
                                        puntos *= 2; // Multiplicador adicional*/
                                        puntos += 6000;
                                        actualizarPuntos();
                                        mostrarMensajePuntos("¡Bonus de punts per enfonsar un Servidor en 4 torns!");
                                        mostrarMensajePuntos("+6000 per destruir la Servidor més gran a la primera");                                        
                                    }
                                }


                                hundidoSinFallar = true;

                                /*if (todosBarcosDestruidos()) {
                                    mostrarMensaje("Has guanyat la partida!");
                                    partidaActiva = false; // Desactivar la partida
                                    mostrarBotones();
                                    mostrarNombre();
                                    calcularBonificacionPorTiempo(); // Llama a la bonificación final
                                }*/
                               
                                if (todosBarcosDestruidos()) {
                                    clearInterval(cronometro); // Para el timer
                                    partidaActiva = false; // Desactivar la partida
                                    window.location.href = 'win.php'; // Redirige a win.php
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


// Guardar Nombre, Puntos y Fecha en ranking.txt

function saveScore() {
    var playerName = document.getElementById("name").value;
    var points = document.querySelector(".points").textContent.split(": ")[1];  // Obtener puntos
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

    if (playerName.length < 3) {
        errorMessage.style.display = 'block'; // Mostrar mensaje de error
        return; // No continuar si el nombre es demasiado corto
    } else {
        errorMessage.style.display = 'none'; // Ocultar mensaje si es válido
    }

    if (playerName !== "") {
        // Crear un objeto con los datos del jugador
        var playerData = {
            name: playerName,
            score: points,
            date: formattedDate // Usar la fecha formateada
        };  

        // Enviar los datos al archivo PHP mediante POST
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "lose.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                mostrarMensaje("Felicitats " + playerData.name + "! Revisa el ranking per veure la teva posició.");
                ocultarNombre();
            }
        };

        xhr.send(JSON.stringify(playerData));
    } else {
        alert("Por favor, ingresa tu nombre.");
    }
}



//Para que se escuche la musica de fondo
document.addEventListener('DOMContentLoaded', () => {
    const bodyId = document.body.id;
    let audioSrc;

    switch (bodyId) {
        case 'index':
            audioSrc = 'sounds/backgroundSoundIndex.mp3';
            break;
        case 'bodyRanking':
            audioSrc = 'sounds/backgroundSoundRanking.mp3';
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

    /*// Aplicar el estado guardado del audio
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

// Notificaciones CSS
function showNotification(message, type) {
    var notification = document.createElement('div');
    notification.className = 'CSSnotification ' + type; // Usa la nueva clase
    notification.textContent = message;

    document.getElementById('CSSnotificationContainer').appendChild(notification);

    // Desvanecer la notificación después de 3 segundos
    setTimeout(function() {
        notification.style.opacity = '0';
        setTimeout(function() {
            notification.remove();
        }, 500); // Esperar a que se desvanezca antes de eliminar
    }, 3000);
}

// Ejemplo de uso
showNotification('¡Success!', 'CSSsuccess');
showNotification('Info.', 'CSSinfo');
showNotification('Error', 'CSSerror');
showNotification('Warning', 'CSSwarning');


/*Permitir y no permitir click*/

function disableClick() {
    document.getElementById('notTouch').classList.add('no-clickeable');
}

function allowClick() {
    document.getElementById('notTouch').classList.remove('no-clickeable');
}