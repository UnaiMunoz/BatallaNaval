<?php
    session_start();

    if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
            // Si no prové de 'game.php', retornar error 403
            header('HTTP/1.0 403 Forbidden', true, 403);
            echo "<!DOCTYPE html>
                <html lang='es'>
                <html>
                        <head>
                                <meta charset='utf-8'>
                                <title>Lose</title>
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
<html lang="en">
<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <script src="funciones.js"></script>
        <title>Lose</title>
</head>
<body id="bodyLose">
    <header>
            <div>
                    <h1 class="animacion-text-lose" id="gameTitle">Has perdut!</h1>
            </div>
    </header>
    <?php
                // Obtener los parámetros de la URL
                $playerName = isset($_GET['playerName']) ? htmlspecialchars($_GET['playerName']) : 'Desconocido';
                $puntos = isset($_GET['puntos']) ? htmlspecialchars($_GET['puntos']) : 0;

                echo '</div>';
                echo '<div class="section">';

                // Mostrar puntos
                echo "<p class='points'>Punts: $puntos</p>"; // Cambiar a la variable $puntos

                // Escribir nombre                
                echo '<div id="winSection">';
                echo '<div id="nombreWin">';
                echo "<input type='text' id='inputNameWinLose' placeholder='Escriu el teu nom' required maxlength='30' value='$playerName'>";
                echo '</div>';
                echo '<button id="nameButton" class="keySound" onclick="saveScore()">Envia</button>';
                echo '</div>';
                echo '<div id="successMessageContainer"></div>'; // Contenedor para el mensaje de éxito


                echo '<p id="errorMessage" style="display:none;">El nom ha de tenir almenys 3 caràcters.</p>'; // Ocultar inicialmente el mensaje de error

                // Botones
                echo '<div id="buttonWin">';
                echo '<a href="index.php"><button id="buttonsWin" class="keySound">Inici</button></a>';
                echo '<a href="ranking.php"><button id="buttonsWin" class="keySound">Hall of Fame</button></a>';
                echo '</div>';

                echo '</div>';
        ?>
</body>
</html>