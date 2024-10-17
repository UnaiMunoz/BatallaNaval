<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Ship Battle</title>
    <script src="funciones.js" defer></script>
</head>
<body id="index">
    <header>
        <button id="audioControlButton">Mute</button>
        <h1>Ship Battle</h1>
    </header>

    <div id="audioContainer"></div>

    <!-- Mensaje que aparece si JavaScript no está habilitado -->
    <noscript>
        <div class="js-warning">
            Advertencia: JavaScript está deshabilitado en tu navegador. 
            <br>Para jugar a este juego, necesitas habilitar JavaScript.<br>
            <a href="https://www.enable-javascript.com/es/" target="_blank">Haz clic aquí para saber cómo habilitar JavaScript</a>
        </div>
    </noscript>

    <main id="indexMain">
    <div id="indexButton">
        <button id="classicGameBtn" class="indexGame keySound disabled" disabled>Classic Game</button>
        <a href="ranking.php">
            <button class="indexHallOfFame keySound">Hall of Fame</button>
        </a>
    </div>
    <div id="indexText">
        <p>Welcome, XXXXX</p>
        <p>You have a mission. Your objective is to infiltrate highly protected 
            servers and execute precise attacks without leaving a trace. Use your 
            hacker skills to overcome firewalls, crack codes and evade advanced 
            security systems.</p>
        <p>Each compromised server brings us closer to our ultimate goal. Discretion 
            and efficiency are key. The faster and more efficient you are, the more 
            cryptocurrencies you will earn for this job. Are you ready to take the 
            plunge?</p>
    </div>
    </main>


</body>
</html>
