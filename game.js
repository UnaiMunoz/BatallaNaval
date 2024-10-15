let playerPoints = 0;
let timerInterval;
let elapsedTime = 0;
let startTime;
let clickCounter = 0; 
let addPointsClickCount = 0; 
let streakCounter = 0;
let pointReductionPercentage = 25; 
let reductionApplied = false;

// Función para iniciar el cronómetro
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    startPointReductionTimer(); // Iniciar el temporizador para reducir puntos cada 30 segundos
}

// Función para actualizar el cronómetro
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("timer").textContent =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

// Función para actualizar la visualización de los puntos
function updatePointsDisplay() {
    document.getElementById("points").textContent = "Puntos del jugador: " + playerPoints;
}

// Función para terminar el juego y mostrar solo el formulario
function endGame() {
    clearInterval(timerInterval); 
    clearInterval(pointReductionInterval); 

    document.getElementById("timer").style.display = "none";
    document.getElementById("points").style.display = "none";
    document.getElementById("addPointsButton").style.display = "none";
    document.getElementById("subtractPointsButton").style.display = "none";

    document.getElementById("recordForm").style.display = "block";
}

// Función para validar y enviar el nombre del jugador
function submitName(event) {
    const playerName = document.getElementById("playerName").value.trim();

    if (playerName === "" || playerName.length < 3) {
        event.preventDefault(); // Evita que el formulario se envíe
        document.getElementById("errorMessage").textContent = "El nombre debe tener al menos 3 caracteres.";
    } else {
        document.getElementById("errorMessage").textContent = "";
    }
}

// Función para sumar puntos con incremento
function addPoints() {
    playerPoints += 50; 
    clickCounter = 0;
    streakCounter += 1
    addPointsClickCount++; 
    updatePointsDisplay();

    // Si se ha presionado "Sumar puntos" dos veces y el reductionApplied sigue en false, reducir el porcentaje de reducción a 0%
    if (addPointsClickCount === 2 && !reductionApplied) {
        playerPoints += 3000
        reductionApplied = true; 
    }

    if (playerPoints >= 500) {
        endGame(); 
    }
}

// Función para restar 50 puntos después de 5 clics en el botón "Restar puntos"
function subtractPointsAfterClicks() {
    clickCounter++; 
    reductionApplied = true; 
    if (clickCounter === 5) {
        playerPoints -= 50; 
        updatePointsDisplay(); 
        clickCounter = 0; 
    }
}

// Función para reducir un porcentaje de los puntos cada 30 segundos
let pointReductionInterval;
function startPointReductionTimer() {
    pointReductionInterval = setInterval(() => {
        playerPoints = Math.floor(playerPoints * (1 - pointReductionPercentage / 100)); // Restar porcentaje
        updatePointsDisplay();
    }, 30000); // 30000 ms = 30 segundos
}

// Añadir eventos a los botones
document.getElementById("addPointsButton").addEventListener("click", addPoints);
document.getElementById("subtractPointsButton").addEventListener("click", subtractPointsAfterClicks);

// Evento para validar el nombre antes de enviar el formulario
document.getElementById("submitNameButton").addEventListener("click", submitName);

// Iniciar el cronómetro al cargar la página
window.onload = startTimer; 