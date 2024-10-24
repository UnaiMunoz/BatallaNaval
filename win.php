<?php
        session_start();

        if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
                // Si no prové de 'game.php', retornar error 403
                header('HTTP/1.0 403 Forbidden', true, 403);
                echo "<!DOCTYPE html>
                        <html lang='ca'>
                        <html>
                                <head>
                                        <meta charset='utf-8'>
                                        <title>Win</title>
                                </head>
                                <body>
                                        <h1>403 Forbidden</h1>
                                        <p>No tens permisos per accedir a aquesta pàgina</p>
                                </body>
                        </html>";
                die;
        }
?>
<!DOCTYPE html>
<html lang="ca">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Win</title>
        <link rel="stylesheet" href="style.css">
        <script src="funciones.js"></script>
</head>
<body id="bodyWin">

        <header>
                <div>
                        <h1 class="animacion-text-win" id="gameTitle">Felicitats has hackejat els servidors!</h1>
                </div>
        </header>
        <?php

                echo '</div>';
                        
                echo '<div class="section">';

                // Puntos
                echo '<p class="points">Punts: 0</p>';
        
                // Escribir nombre                
                echo '<div id="winSection">';
                        echo '<div id="nombreWin">';
                        echo "<input type='text' id='inputNameWinLose' placeholder='Escriu el teu nom' required maxlength='30' value='$playerName'>";
                        echo '</div>';
                        echo '<button id="nameButton" class="keySound" onclick="saveScore2()">Envia</button>';
                echo '</div>';

                echo '<p id="errorMessage">El nom ha de tenir almenys 3 caràcters.</p>';

                // Botones
                echo '<div id="buttonWin">';
                        echo '<a href="index.php"><button id="buttonsWin" class="keySound">Inici</button></a>';
                        echo '<a href="ranking.php"><button id="buttonsWin" class="keySound">Hall of Fame</button></a>';
                echo '</div>';

                echo '</div>';

        ?>
</body>
</html>