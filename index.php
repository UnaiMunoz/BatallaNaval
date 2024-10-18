<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Binary Battleship</title>
    <script src="funciones.js" defer></script>
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
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
            <br>Per jugar a aquest joc, necessites habilitar JavaScript.<br>
            <a href="https://www.enable-javascript.com/es/" target="_blank">Fes clic aquí per saber com habilitar JavaScript</a>
        </div>
    </noscript>


    <main id="indexMain">
    <!-- Formulario que envía el nombre a game.php -->
    <div id="indexButton">
        <form action="game.php" method="POST">
            <input id="indexName" name="playerName" placeholder="Escriu el teu nom" required maxlength="30">
            <?php if (isset($_GET['error']) && $_GET['error'] == 'invalidname'): ?>
                <p style="color: red !important; text-align:center; margin:15px">El nom ha de tenir entre 3 i 30 caràcters. Si us plau, intenta-ho de nou.</p>
            <?php endif; ?>
            <button type="submit" id="classicGameBtn" class="indexGame keySound">Partida Clàssica</button>
        </form>
        
        <a href="ranking.php">
            <button class="indexHallOfFame keySound">Hall of Fame</button>
        </a>
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
