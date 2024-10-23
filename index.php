<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Binary Battleship</title>
    <script src="funciones.js" defer></script>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</head>
<body id="index">
    <header>
        <h1>Binary Battleship</h1>
    </header>

    <div id="audioContainer"></div>

    <!-- Mensaje que aparece si JavaScript no está habilitado -->
    <noscript>
        <div class="js-warning">
            Advertència: JavaScript està deshabilitat al teu navegador. 
            <br>Per jugar a aquest joc necessites habilitar JavaScript.<br>
            <a href="https://www.enable-javascript.com/es/" target="_blank">Fes clic aquí per saber com habilitar JavaScript</a>
        </div>
    </noscript>

    

    <main id="indexMain">
        <div id="indexButton">
            <form id="gameForm" method="POST" autocomplete="off">
                <div id="divName">
                    <input id="indexName" name="playerName" placeholder="Escriu un nom per jugar" maxlength="30">
                </div>
                <p id="nameError" style="color: red !important; text-align:center; margin:15px;">El nom ha de tenir mínim 3 caràcters.</p>
                <button type="button" id="classicGameBtn" class="indexGame keySound disabled" disabled>Tutorial</button>
                <button type="button" id="practiceGameBtn" class="indexGame keySound disabled" disabled>Partida Clàssica</button>
                <input type="hidden" name="mode" id="modeInput" value="">

                <!-- Formulario para las opciones avanzadas -->
                <div id="extraOptions">
                    <label><input type="checkbox" id="limitedAmmo" name="limitedAmmo"> Munició limitada</label><br>
                    <label><input type="checkbox" disabled id="armoredShips" name="armoredShips"> Vaixells acorassats</label><br>
                    <label><input type="checkbox" disabled id="specialAttacks" name="specialAttacks"> Atacs especials</label>
                </div>

            </form>
                <a href="ranking.php">
                    <button class="indexHallOfFame keySound">Hall of Fame</button>
                </a>

                <!-- Nuevo botón para mostrar las opciones adicionales -->
                <button id="extraOptionsBtn" class="indexGame keySound" onclick="showCheckbox()">Opcions Avançades</button>

                
                
        </div>

        <div id="indexText">
            <p>Benvingut, XXXXX</p>
            <p>Tens una missió. El teu objectiu és infiltrar-te en servidors altament protegits 
                i executar atacs precisos sense deixar rastre. Utilitza les teves 
                habilitats de hacker per superar tallafocs, desxifrar codis i evadir sistemes 
                de seguretat avançats.</p>
            <p>Cada servidor compromès ens acosta més al nostre objectiu final. La discreció 
                i l'eficiència són clau. Com més ràpid i eficient siguis, més 
                criptomonedes guanyaràs per aquest treball. Estàs llest per fer el salt?
            </p>
        </div>
    </main>


</body>
</html>
