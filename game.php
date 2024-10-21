<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Binary Battleship</title>
    <link rel="stylesheet" href="style.css">
    <script src="funciones.js"></script>
    <link rel="icon" href="img/favicon.ico" type="image/x-icon">
</head>

<body id="game">

<!--
Este codigo genera un tablero desde una matriz y coloca barcos de diferentes tamaños en el tablero.
Los barcos son creados mediante la clase Barco y se guardan en un array.
Se verifica si hay espacio disponible para colocar el barco en una posición aleatoria.
Se establecen las coordenadas del barco y se guardan en el objeto Barco.
Finalmente, se muestra el tablero con los barcos colocados.

Notas:
- El tablero es de 10x10.
- Los barcos son: Fragata (2), Submarino (3), Destructor (4) y Portaaviones (5).
-->

    <div id="audioContainer"></div>

    <header>
        <div class="contentEasterEgg">
            <h1 class="text" id="gameTitle">Binary Battleship</h1>
        </div>
    </header>

    <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Sanitizar el nombre del jugador
            $playerName = htmlspecialchars(trim($_POST['playerName']));

            // Verificar si el nombre está vacío
            if (empty($playerName)) {
                header("Location: index.php?error=emptyname");
                exit;
            }

            // Verificar si el nombre tiene entre 3 y 30 caracteres
            if (strlen($playerName) < 3 || strlen($playerName) > 30) {
                // Si el nombre no es válido, redirigir al formulario con un mensaje de error
                header("Location: index.php?error=invalidname");
                exit;
            }

        } else {
            // Si no hay datos POST, redirigir a index.php
            header("Location: index.php");
            exit;
        }
    ?>

    <?php
        session_start();
        // Establir una variable de sessió que confirmi l'accés permès
        $_SESSION['acceso_permitido'] = true;
    ?>


    <h2 id="namePlayerGame">Bienvenido al juego, <?php echo $playerName; ?>!</h2>
    <a href="index.php" id="goBackButton"><button id="goBack" class="keySound">Inici</button></a>


    <!-- Mensaje que aparece si JavaScript no está habilitado -->
    <noscript>
        <div class="js-warning">
            Advertència: JavaScript està deshabilitat al teu navegador. 
            <br>Per jugar a aquest joc, necessites habilitar JavaScript.<br>
            <a href="https://www.enable-javascript.com/es/" target="_blank">Fes clic aquí per saber com habilitar JavaScript</a>
        </div>
    </noscript>

    <div id="game_Container">
        <div class="section board">
            <?php
                # Longitud matriz
                $numero = 10;

                # Inicializar matriz 
                $tabla = array();

                // Generar matriz
                for ($i = 0; $i <= $numero; $i++) {
                    for ($j = 0; $j <= $numero; $j++) {
                        if ($i == 0 && $j == 0) {
                            $tabla[$i][$j] = " ";
                        } elseif ($j == 0) {
                            $ascii = chr($i + 64);
                            $tabla[$i][$j] = $ascii;
                        } elseif ($i == 0) {
                            $tabla[$i][$j] = $j;
                        } else {
                            $tabla[$i][$j] = " ";
                        }
                    }
                }

                // Pasar el tablero a JS
                $jsonTable = json_encode($tabla);

                // Clase Barco
                class Barco {
                    public $tipo;
                    public $tamaño;
                    public $coordenadas = [];
                    public $vida;

                    public function __construct($tipo, $tamaño) {
                        $this->tipo = $tipo;
                        $this->tamaño = $tamaño;
                        $this->vida = $tamaño;
                    }

                    public function establecerCoordenadas($coordenadas) {
                        $this->coordenadas = $coordenadas;
                    }
                }

                // Array de barcos [nombre, tamaño]
                $barcos = [
                    new Barco("Fragata", 2),
                    new Barco("Submarino", 3),
                    new Barco("Destructor", 4),
                    new Barco("Portaaviones", 5)
                ];

                // String para saber las coordenadas de cada barcos
                $StringBarcos = "";

                // Función para verificar si hay espacio disponible
                function hayEspacioDisponible($tabla, $altura, $posicion, $tamañoBarco, $sentido) {
                    // Veirificar celdas del alrededor
                    $deltas = $sentido == 0 ? [0] : range(0, $tamañoBarco - 1);
                    for ($i = 0; $i < $tamañoBarco; $i++) {
                        // Horizontal
                        if ($sentido == 0) { 
                            if ($tabla[$altura][$posicion + $i] != " " || 
                                ($posicion + $i > 1 && $tabla[$altura][$posicion + $i - 1] != " ") || 
                                ($posicion + $i < count($tabla) - 1 && $tabla[$altura][$posicion + $i + 1] != " ") || 
                                ($altura > 1 && $tabla[$altura - 1][$posicion + $i] != " ") || 
                                ($altura < count($tabla) - 1 && $tabla[$altura + 1][$posicion + $i] != " ")) {
                                return false;
                            }
                        // Vertical
                        } else { 
                            if ($tabla[$altura + $i][$posicion] != " " || 
                                ($altura + $i > 1 && $tabla[$altura + $i - 1][$posicion] != " ") || 
                                ($altura + $i < count($tabla) - 1 && $tabla[$altura + $i + 1][$posicion] != " ") || 
                                ($posicion > 1 && $tabla[$altura + $i][$posicion - 1] != " ") || 
                                ($posicion < count($tabla) - 1 && $tabla[$altura + $i][$posicion + 1] != " ")) {
                                return false;
                            }
                        }
                    }
                    return true;
                }

                // Iterar por cada objeto barco
                foreach ($barcos as $barco) {
                    // echo "<br>Tipo de barco: {$barco->tipo}<br>";

                    $tamañoBarco = $barco->tamaño;
                    // echo "Tamaño: $tamañoBarco<br>";

                    // 0 = horizontal // 1 = vertical
                    $sentido = rand(0, 1); 
                    $coordenadas = [];

                    $colocado = false;
                    while (!$colocado) {
                        $posicion = rand(1, $numero);
                        $altura = rand(1, $numero);

                        if ($sentido == 0) { // Horizontal
                            // Limite horizontal = Tablero - tamaño del barco
                            if ($posicion <= $numero - $tamañoBarco + 1) {
                                if (hayEspacioDisponible($tabla, $altura, $posicion, $tamañoBarco, $sentido)) {
                                    // Colocar el barco en la matriz
                                    for ($j = 0; $j < $tamañoBarco; $j++) {
                                        // Inicializa con la letra del barco
                                        $tabla[$altura][$posicion + $j] = substr($barco->tipo, 0, 1); //Printea los barcos horizontal
                                        // Guarda las coordenadas
                                        $coordenadas[] = [$altura, $posicion + $j]; 
                                    }
                                    $colocado = true;
                                }
                            }
                        } else { // Vertical
                            // Limite horizontal = Tablero - tamaño del barco
                            if ($altura <= $numero - $tamañoBarco + 1) {
                                if (hayEspacioDisponible($tabla, $altura, $posicion, $tamañoBarco, $sentido)) {
                                    // Colocar el barco en la matriz
                                    for ($i = 0; $i < $tamañoBarco; $i++) {
                                        // Inicializa con la letra del barco
                                        $tabla[$altura + $i][$posicion] = substr($barco->tipo, 0, 1); //Printea los barcos vertical
                                        // Guarda las coordenadas
                                        $coordenadas[] = [$altura + $i, $posicion]; 
                                    }
                                    $colocado = true;
                                }
                            }
                        }
                    }

                    // Guardar coordenadas en el objeto barco
                    $barco->establecerCoordenadas($coordenadas);

                    // Formatear las coordenadas para el string
                    $coordenadasStr = implode(", ", array_map(function($coord) {
                        return chr($coord[0] + 64) . $coord[1]; // Convierte las coordenadas en formato A1, B2, etc.
                    }, $coordenadas));

                    // Agregar al string de barcos
                    $StringBarcos .= "[{$barco->tipo}] -> [{$coordenadasStr}]<br>";
                    
                    
                    // echo "<br><br>";
                }

                // Imprimir la matriz 

                # Mostrar la tabla
                echo "<table id='gameTable'>";
                for ($i = 0; $i < $numero + 1; $i++) {
                    echo "<tr>";
                    for ($j = 0; $j < $numero + 1; $j++) {
                        if ($i==0 || $j==0){
                            echo "<td>" . $tabla[$i][$j] . "</td>";
                        }
                        else{
                            if($tabla[$i][$j] == "F"){
                                echo "<td name='Fragata' class='codeName attackSound' onclick='changeDataCell(this)'>" . $tabla[$i][$j] . "</td>";
                            } elseif($tabla[$i][$j] == "S"){
                                echo "<td name='Submarino' class='codeName attackSound' onclick='changeDataCell(this)'>" . $tabla[$i][$j] . "</td>";
                            }elseif($tabla[$i][$j] == "D"){
                                echo "<td name='Destructor' class='codeName attackSound' onclick='changeDataCell(this)'>" . $tabla[$i][$j] . "</td>";
                            }elseif($tabla[$i][$j] == "P"){
                                echo "<td name='Portaaviones' class='codeName attackSound' onclick='changeDataCell(this)'>" . $tabla[$i][$j] . "</td>";
                            }else{
                                echo "<td name=' ' class='codeName attackSound' onclick='changeDataCell(this)'>" . $tabla[$i][$j] . "</td>";
                            }
                            
                        }
                    }
                    echo "</tr>";
                }
                echo "</table>";

                // Imprimir el string de barcos
                // echo "<div id='ShipCoords'>$StringBarcos</div>";

                // Imprimir en la consola del navegador
                echo "<script>console.log('Secret Locations: ". json_encode($StringBarcos) . "');</script>";

                echo    "<script>
                            var barcos = " . json_encode($barcos) . ";
                        </script>";


                // echo "Número de barcos creados: " . count($barcos) . "<br>";


            ?>

        </div>

        <div class="section info">

            <!-- Timer -->
             <p class="timer">00:00:00</p>

            <!-- Puntos -->
             <p class="points">Punts: 0</p>

            <!-- Notificación puntos -->
            <p class="points-info"></p>
            
            <!-- Notificaciones del juego -->
            <p class="notification"></p>

            <!-- Escribir nombre -->
             
            <div class="input-group">
                <input type="text" id="name" placeholder="Escriu el teu nom" required class="hidden" maxlength="20" value="<?php echo $playerName; ?>">
                <button id="buttonName" class="keySound" onclick="saveScore()">Envia</button>
            </div>
            <p id="errorMessage">El nom ha de tenir almenys 3 caràcters.</p>

            <!-- Botones -->
            <div class="buttons">
                <a href="win.php"><button class="keySound">Inici</button></a>
                <a href="ranking.php"><button class="keySound">Hall of Fame</button></a>
            </div>

        </div>

    </div>

    <div id="CSSnotificationContainer"></div>

</body>
</html>