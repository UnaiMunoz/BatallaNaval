<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hack The Server</title>
    <link rel="stylesheet" href="style.css">
    
</head>
<body>

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

    <h1>Hack the server</h1>

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

                // Clase Barco
                class Barco {
                    public $tipo;
                    public $tamaño;
                    public $coordenadas = [];

                    public function __construct($tipo, $tamaño) {
                        $this->tipo = $tipo;
                        $this->tamaño = $tamaño;
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

                        // Ajustar el rango según la dirección del barco
                        if ($sentido == 0) { // Horizontal
                            // Limite horizontal = Tablero - tamaño del barco
                            if ($posicion <= $numero - $tamañoBarco + 1) {
                                if (hayEspacioDisponible($tabla, $altura, $posicion, $tamañoBarco, $sentido)) {
                                    // Colocar el barco en la matriz
                                    for ($j = 0; $j < $tamañoBarco; $j++) {
                                        // Inicializa con la letra del barco
                                        // $tabla[$altura][$posicion + $j] = substr($barco->tipo, 0, 1);
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
                                        // $tabla[$altura + $i][$posicion] = substr($barco->tipo, 0, 1);
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

                    // Mostrar todas las coordenadas
                    foreach ($coordenadas as $coord) {
                        // echo chr($coord[0] + 64) . $coord[1] . " ";
                    }
                    // echo "<br><br>";
                }

                // Imprimir la matriz 
                echo "
                        <style>
                            table {
                                border-collapse: collapse; 
                            }
                            td {
                                border: 1px solid black;
                                padding: 7px;
                                text-align: center;
                            }
                        </style>
                    ";

                # Mostrar la tabla
                echo "<table>";
                for ($i = 0; $i < $numero + 1; $i++) {
                    echo "<tr>";
                    for ($j = 0; $j < $numero + 1; $j++) {
                        echo "<td>" . $tabla[$i][$j] . "</td>";
                    }
                    echo "</tr>";
                }
                echo "</table>";

                // echo "Número de barcos creados: " . count($barcos) . "<br>";

            ?>
        </div>

        <div class="section info">

        </div>
        
    </div>


</body>
</html>