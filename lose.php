<?php
session_start();

if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
    // Si no prové de 'game.php', retornar error 403
    header('HTTP/1.0 403 Forbidden', true, 403);
    echo "<!DOCTYPE html>
            <html lang='ca'>
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
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binary Battleship</title>
    <link rel="stylesheet" href="style.css">
    <script src="funciones.js"></script>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
</head>
<body id="bodyLose">
    <header>
        <div>
            <h1 class="animacion-text-lose" id="gameTitle">Has perdut!</h1>
        </div>
    </header>

    <div id="audioContainer"></div>

    <?php
        // Obtener los parámetros de la URL
        $playerName = isset($_GET['playerName']) ? htmlspecialchars($_GET['playerName']) : 'Desconocido';
        $puntos = isset($_GET['puntos']) ? htmlspecialchars($_GET['puntos']) : 0;

        // Lógica para determinar la página del último registro
        $registrosPorPagina = 25; // El mismo número que utilizas en ranking.php

        // Leer el archivo y almacenar los registros en un array
        $archivo = 'ranking.txt';
        $registros = [];

        if (file_exists($archivo)) {
            $file = fopen($archivo, 'r');
            while (($linea = fgets($file)) !== false) {
                // Separa los datos por el delimitador ";"
                $datos = explode(';', trim($linea));
                if (count($datos) == 4) { // Asegúrate de que tenga 4 elementos
                    $registros[] = [
                        'name' => trim($datos[0]),
                        'points' => (int) trim($datos[1]),
                        'date' => trim($datos[2]),
                        'status' => trim($datos[3]), // Agregamos el estado
                    ];
                }
            }
            fclose($file);
        }

        // Añadir el nuevo registro
        $nuevoRegistro = [
            'name' => $playerName,
            'points' => (int) $puntos,
            'date' => date('Y-m-d H:i:s'), // O la fecha que quieras
            'status' => 'L', // Establecer estado como Lose
        ];
        $registros[] = $nuevoRegistro;

        // Ordenar los registros por puntuación y fecha
        usort($registros, function ($a, $b) {
            if ($a['points'] === $b['points']) {
                return strcmp($a['date'], $b['date']); // Orden ascendente por fecha
            }
            return $b['points'] <=> $a['points']; // Orden descendente por puntuación
        });

        // Encontrar la posición del nuevo registro
        $posicionNuevoRegistro = count($registros) - 1; // Último registro es el nuevo

        // Calcular en qué página se encuentra
        $paginaUltimoRegistro = ceil(($posicionNuevoRegistro + 1) / $registrosPorPagina); // +1 porque las posiciones son 0-indexadas

        echo '<div class="section">';

        // Mostrar puntos
        echo "<p class='points'>Punts: $puntos</p>"; // Cambiar a la variable $puntos

        // Escribir nombre                
        echo '<div id="loseSection">';
        echo '<div id="nombreWin">';
        echo "<input type='text' id='inputNameWinLose' placeholder='Escriu el teu nom' required maxlength='30' value='$playerName'>";
        echo '</div>';
        echo '<button id="nameButton" class="keySound" onclick="saveScore(\'L\')">Envia</button>';
        echo '</div>';
        echo '<div id="successMessageContainer"></div>'; // Contenedor para el mensaje de éxito

        echo '<p id="errorMessage" style="display:none;">El nom ha de tenir almenys 3 caràcters.</p>'; // Ocultar inicialmente el mensaje de error

        // Botones
        echo '<div id="buttonLose">';
        echo '<a href="index.php"><button id="buttonsLose" class="keySound">Inici</button></a>';
        echo '<a href="ranking.php?pagina=' . $paginaUltimoRegistro . '"><button id="buttonsLose" class="keySound">Hall of Fame</button></a>'; // Corregido el enlace
        echo '</div>';

        echo '</div>';
    ?>
</body>
</html>
