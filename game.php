<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Binary Battleship</title>
    <link rel="stylesheet" href="style.css">
    <script src="funciones.js"></script>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
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

    <div id="notTouch">
    <header>
        <div class="contentEasterEgg">
            <h1 class="text" id="gameTitle">Binary Battleship</h1>
        </div>
    </header>


    
    <a href="index.php" id="goBackButton"><button id="goBack" class="keySound">Inici</button></a>

    


    <!-- Mensaje que aparece si JavaScript no está habilitado -->
    <noscript>
        <div class="js-warning">
            Advertència: JavaScript està deshabilitat al teu navegador. 
            <br>Per jugar a aquest joc necessites habilitar JavaScript.<br>
            <a href="https://www.enable-javascript.com/es/" target="_blank">Fes clic aquí per saber com habilitar JavaScript</a>
        </div>
    </noscript>
    

    <?php

        // Variables de configuración
        $limitedAmmo = isset($_POST['limitedAmmo']) ? 'true' : 'false';
        // $armoredShips = isset($_POST['armoredShips']) ? 'true' : 'false';
        // $specialAttacks = isset($_POST['specialAttacks']) ? 'true' : 'false';

        echo "Limited Ammo: " . $limitedAmmo . "<br>";




        if (isset($_GET['mode'])) {
            $mode = $_GET['mode'];
            if ($mode == 'classic') {
                $playerName = $_POST['playerName'];
                // Cargar contenido específico para el modo Classic
                echo '<div id="game_Container">';
                    echo '<div class="section board">';

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
                                new Barco("Barca", 1),
                                new Barco("Barca", 1),
                                new Barco("Barca", 1),
                                new Barco("Barca", 1),
                                new Barco("Fragata", 2),
                                new Barco("Fragata", 2),
                                new Barco("Fragata", 2),
                                new Barco("Submarino", 3),
                                new Barco("Submarino", 3),
                                new Barco("Destructor", 4),
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
                            echo "<table class='gameTable'>";
                            for ($i = 0; $i < $numero + 1; $i++) {
                                echo "<tr>";
                                for ($j = 0; $j < $numero + 1; $j++) {
                                    if ($i==0 || $j==0){
                                        echo "<td>" . $tabla[$i][$j] . "</td>";
                                    }
                                    else{
                                        if($tabla[$i][$j] == "F"){
                                            echo "<td name='Fragata' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
                                        } elseif($tabla[$i][$j] == "B"){
                                            echo "<td name='Barca' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
                                        }elseif($tabla[$i][$j] == "S"){
                                            echo "<td name='Submarino' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
                                        }elseif($tabla[$i][$j] == "D"){
                                            echo "<td name='Destructor' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
                                        }elseif($tabla[$i][$j] == "P"){
                                            echo "<td name='Portaaviones' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
                                        }else{
                                            echo "<td name=' ' class='codeName attackSound' onclick='changeDataCell(this, \"classic\")'>" . $tabla[$i][$j] . "</td>";
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
            
                            if ($limitedAmmo == 'true') {
                                echo "<p id='practicePlayerAmmo'>40/40</p>";
                                $playerAmmo = 40;

                                echo "<script>
                                    var practicePlayerAmmo = " . json_encode($playerAmmo) . ";
                                    var practiceAmmoEnabled = " . json_encode(true) . ";
                                </script>";
                            } else {
                                echo "<script>
                                        var practiceAmmoEnabled = " . json_encode(false) . ";
                                    </script>";
                            }
                            
                            

                            echo    "<script>
                                        var barcos = " . json_encode($barcos) . ";
                                    </script>";
            
            
                            // echo "Número de barcos creados: " . count($barcos) . "<br>";
            
                    echo '</div>';
        
                    echo '<div class="section info">';
                    
                        // Timer
                        echo '<p class="timer">00:00:00</p>';
                    
                        // Puntos
                        echo '<p class="points">Punts: 0</p>';
                    
                        // Notificación puntos
                        echo '<p class="points-info"></p>';
                    
                        // Notificaciones del juego
                        echo '<p class="notification"></p>';
                    
                        // Escribir nombre                
                        echo '<div class="input-group">';
                            echo '<div id="divNameGame">';
                            echo "<input type='text' id='name' placeholder='Escriu el teu nom' required class='hidden' maxlength='30' value='$playerName'>";
                            
                            echo '</div>';
                            echo '<button id="buttonName" class="keySound" onclick="saveScore()">Envia</button>';
                        echo '</div>';
                    
                        echo '<p id="errorMessage">El nom ha de tenir almenys 3 caràcters.</p>';
                    
                        // Botones
                        echo '<div class="buttons">';
                            echo '<a href="index.php"><button class="keySound">Inici</button></a>';
                            echo '<a href="ranking.php"><button class="keySound">Hall of Fame</button></a>';
                        echo '</div>';
                    
                    echo '</div>';
                
        
                echo '</div>';

                
            } elseif ($mode == 'practice') {
                $playerName = $_POST['playerName'];
                echo "<script>
                        document.addEventListener('DOMContentLoaded', function() {
                        mostrarMensaje('Turno de Player'); // Muestra el mensaje al cargar la página en modo practice
                        setTimeout(turnoIA, 1000); // Llama a la IA automáticamente después de un breve retraso
                        });
                    </script>";

                // Cargar contenido específico para el modo de práctica
                echo '<div id="game_Container">';
                echo '<div id="practicePlayerBoard" class="section board">';

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
                        $practicePlayerBoats = [
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Fragata", 2),
                            new Barco("Fragata", 2),
                            new Barco("Fragata", 2),
                            new Barco("Submarino", 3),
                            new Barco("Submarino", 3),
                            new Barco("Destructor", 4),
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
                        foreach ($practicePlayerBoats as $barco) {
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
                            $StringBarcos .= "\n[{$barco->tipo}] -> [{$coordenadasStr}]";

                        }
        
                        // Imprimir la matriz 
        
                        # Mostrar tabla jugador       
                        echo '<p>Tablero de ' . $playerName . '</p>';
                        echo "<table id='practicePlayergameTable' class='gameTable'>";
                        for ($i = 0; $i < $numero + 1; $i++) {
                            echo "<tr>";
                            for ($j = 0; $j < $numero + 1; $j++) {
                                if ($i==0 || $j==0){
                                    echo "<td>" . $tabla[$i][$j] . "</td>";
                                }
                                else{
                                    if($tabla[$i][$j] == "F"){
                                        echo "<td name='Fragata'>" . $tabla[$i][$j] . "</td>";
                                    } elseif($tabla[$i][$j] == "B"){
                                        echo "<td name='Barca'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "S"){
                                        echo "<td name='Submarino'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "D"){
                                        echo "<td name='Destructor'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "P"){
                                        echo "<td name='Portaaviones'>" . $tabla[$i][$j] . "</td>";
                                    }else{
                                        echo "<td name=' '>" . $tabla[$i][$j] . "</td>";
                                    }
                                    
                                }
                            }
                            echo "</tr>";
                        }
                        echo "</table>";

                        if ($limitedAmmo == 'true') {
                            echo "<p id='practicePlayerAmmo'>40/40</p>";
                            $playerAmmo = 5;

                            echo "<script>
                                var practicePlayerAmmo = " . json_encode($playerAmmo) . ";
                                var practiceAmmoEnabled = " . json_encode(true) . ";
                            </script>";
                        } else {
                            echo "<script>
                                var practiceAmmoEnabled = " . json_encode(false) . ";
                            </script>";
                        }

                        
                        // Imprimir en la consola del navegador
                        echo "<script>console.log('Player Board: ". json_encode($StringBarcos) . "');</script>";
        
                        // Enviar barcos a JavaScript
                        echo    "<script>
                                    var practicePlayerBoats = " . json_encode($practicePlayerBoats) . ";
                                    var practicePlayerBoard = " . json_encode($tabla) . ";
                                </script>";
        
                echo '</div>';
    
                // Notificaciones
                echo '<div class="section info">';
                
                    // Timer
                    echo '<p class="timer">00:00:00</p>';
                
                    // Puntos
                    echo '<p class="points">Punts: 0</p>';
                
                    // Notificación puntos
                    echo '<p class="points-info"></p>';
                
                    // Notificaciones del juego
                    echo '<p class="notification"></p>';
                
                    // Escribir nombre
                    echo '<div class="input-group">';
                        echo '<div id="divNameGame">';
                            echo "<input type='text' id='name' placeholder='Escriu el teu nom' required class='hidden' maxlength='30' value='$playerName;'>";
                        echo '</div>';
                        echo '<button id="buttonName" class="keySound" onclick="saveScore()">Envia</button>';
                    echo '</div>';
                
                    echo '<p id="errorMessage">El nom ha de tenir almenys 3 caràcters.</p>';
                
                    // Botones
                    echo '<div class="buttons">';
                        echo '<a href="index.php"><button class="keySound">Inici</button></a>';
                        echo '<a href="ranking.php"><button class="keySound">Hall of Fame</button></a>';
                    echo '</div>';
                
                echo '</div>';


                // Tablero enemigo
                echo '<div id="practiceEnemyBoard" class="section board">';

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

                        // Array de barcos [nombre, tamaño]
                        $practiceEnemyBoats = [
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Barca", 1),
                            new Barco("Fragata", 2),
                            new Barco("Fragata", 2),
                            new Barco("Fragata", 2),
                            new Barco("Submarino", 3),
                            new Barco("Submarino", 3),
                            new Barco("Destructor", 4),
                        ];
        
                        // String para saber las coordenadas de cada barcos
                        $StringBarcos = "";
        
                        // Iterar por cada objeto barco
                        foreach ($practiceEnemyBoats as $barco) {
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
                            $StringBarcos .= "\n[{$barco->tipo}] -> [{$coordenadasStr}]";
                            
                            
                            // echo "<br><br>";
                        }
        
                        // Imprimir la matriz 
        
                        # Mostrar tabla IA
                        echo '<p>Tablero de IA</p>';
                        echo "<table id='practiceEnemygameTable' class='gameTable'>";
                        for ($i = 0; $i < $numero + 1; $i++) {
                            echo "<tr>";
                            for ($j = 0; $j < $numero + 1; $j++) {
                                if ($i==0 || $j==0){
                                    echo "<td>" . $tabla[$i][$j] . "</td>";
                                }
                                else{
                                    if($tabla[$i][$j] == "F"){
                                        echo "<td name='Fragata' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    } elseif($tabla[$i][$j] == "B"){
                                        echo "<td name='Barca' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "S"){
                                        echo "<td name='Submarino' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "D"){
                                        echo "<td name='Destructor' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    }elseif($tabla[$i][$j] == "P"){
                                        echo "<td name='Portaaviones' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    }else{
                                        echo "<td name=' ' class='codeName attackSound' onclick='changeDataCell(this, \"IA\")'>" . $tabla[$i][$j] . "</td>";
                                    }
                                    
                                }
                            }
                            echo "</tr>";
                        }
                        echo "</table>";

                        if ($limitedAmmo == 'true') {
                            echo "<p id='practiceEnemyAmmo'>40/40</p>";
                            $enemyAmmo = 1;
                            echo "<script>
                            var practiceEnemyAmmo = " . json_encode($enemyAmmo) . ";
                            </script>";
                        }
                        
                        // Imprimir en la consola del navegador
                        echo "<script>console.log('IA Board: ". json_encode($StringBarcos) . "');</script>";
        
                        echo    "<script>
                                    var barcos = " . json_encode($practiceEnemyBoats) . ";
                                    var practiceEnemyBoard = " . json_encode($tabla) . ";
                                </script>";

                echo '</div>';
            echo '</div>';
            }

        } else {
            echo "No se ha seleccionado ningún modo de juego.";
        }
    ?>

    </div>

    <div id="CSSnotificationContainer"></div>

</body>
</html>