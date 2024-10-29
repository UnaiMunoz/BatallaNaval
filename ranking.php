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

<body id="bodyRanking">
    
    <?php
        // Lee los datos enviados desde el JavaScript
        $inputData = file_get_contents("php://input");
        $data = json_decode($inputData, true);

        // Verifica que $data no sea null
        if ($data !== null) {
            // Extraer nombre, puntuación, fecha y estado si existen
            $name = isset($data['name']) ? $data['name'] : '';
            $score = isset($data['score']) ? $data['score'] : 0;
            $date = isset($data['date']) ? $data['date'] : '';
            $status = isset($data['status']) ? $data['status'] : ''; // Valor predeterminado 'W'

            // Verificar si el nombre no está vacío
            if (!empty($name)) {
                // Formatear la línea a escribir con el nuevo estado
                $linea = "$name;$score;$date;$status\n";

                // Escribir en el archivo ranking.txt
                $file = fopen("ranking.txt", "a"); // Abrir archivo en modo añadir
                fwrite($file, $linea);
                fclose($file);
            }
        } else {
            error_log("Error: No se recibieron datos JSON válidos.");
        }
    ?>

    <header>
        <h1>Hall of Fame</h1>
    </header>

    <div id="audioContainer"></div>

    <main>

    <div id="table-container">
    <?php
        $source2 = null;
        $registrosPorPagina = 25;
        $paginaActual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
        if ($paginaActual < 1) {
            $paginaActual = 1;
        }
        $registroInicial = ($paginaActual - 1) * $registrosPorPagina;

        // Abrimos el fichero ranking.txt
        $archivo = 'ranking.txt';
        $file = fopen($archivo, 'r');

        if ($file) {
            // Leer todo el archivo y almacenar los registros en un array
            $registros = [];
            $ultimoRegistro = null; // Variable para almacenar el último registro
            while (($linea = fgets($file)) !== false) {
                // Separa los datos por el delimitador ";"
                $datos = explode(';', trim($linea));
                
                // Verificar que la línea tenga los 4 elementos esperados
                if (count($datos) == 4) {
                    $registros[] = [
                        'name' => trim($datos[0]),
                        'points' => (int) trim($datos[1]),
                        'date' => trim($datos[2]),
                        'status' => trim($datos[3]), // Nuevo campo para el estado
                    ];
                    $ultimoRegistro = [
                        'name' => trim($datos[0]),
                        'points' => (int) trim($datos[1]),
                        'date' => trim($datos[2]),
                        'status' => trim($datos[3]), // Actualiza el último registro
                    ]; 
                }
            }

            fclose($file);

            // Ordenar los registros por puntuación y fecha
            usort($registros, function ($a, $b) {
                if ($a['points'] === $b['points']) {
                    return strcmp($a['date'], $b['date']); // Orden ascendente por fecha
                }
                return $b['points'] <=> $a['points']; // Orden descendente por puntuación
            });

            // Contar cuántos registros hay en total
            $totalRegistros = count($registros);
            $totalPaginas = ceil($totalRegistros / $registrosPorPagina);

            // Crear una tabla HTML
            echo "<table id='rankingTable'>";
            echo "<tr><th>Posició</th><th>Nom</th><th>Punts</th><th>Data</th></tr>";

            $registroFinal = min($registroInicial + $registrosPorPagina, $totalRegistros);
            $posicion = $registroInicial + 1; // Inicia en el registro inicial + 1

            for ($i = $registroInicial; $i < $registroFinal; $i++) {
                $name = $registros[$i]['name'];
                $points = $registros[$i]['points'];
                $date = $registros[$i]['date'];
                $status = $registros[$i]['status']; // Obtener estado del registro

                // Verificar si el registro es el último de ranking.txt
                $isLastRecord = ($name === $ultimoRegistro['name'] && 
                                $points === $ultimoRegistro['points'] && 
                                $date === $ultimoRegistro['date'] && 
                                $status === $ultimoRegistro['status']); // Considerar estado

                // Asignar la clase basada en el estado
                $extraClass = '';
                if ($isLastRecord) {
                    $extraClass = ($status === 'W') ? 'win' : 'lose'; // Clase 'win' o 'lose' según el estado
                }

                // Mostrar fila con la clase especial si es el último registro
                echo "<tr class='keySound $extraClass'>"; // Aplica la clase según el estado
                echo "<td class='selecRanking'>$posicion</td>";
                echo "<td>$name</td>";
                echo "<td>$points</td>";
                echo "<td>$date</td></tr>";

                $posicion++; // Incrementar la posición
            }

            echo "</table>";
            echo "</div>";

            // Crear el paginador si hay más de una página
            if ($totalPaginas > 1) {
                echo "<div id='paginador'>";

                if ($paginaActual > 1) {
                    $anterior = $paginaActual - 1;
                    echo "<a href='?pagina=$anterior'> <= </a> ";
                }

                for ($i = 1; $i <= $totalPaginas; $i++) {
                    if ($i == $paginaActual) {
                        echo "<strong class='keySound'>$i</strong> ";
                    } else {
                        echo "<a href='?pagina=$i' class='keySound'>$i</a> ";
                    }
                }

                if ($paginaActual < $totalPaginas) {
                    $siguiente = $paginaActual + 1;
                    echo "<a href='?pagina=$siguiente' class='keySound'> => </a>";
                }

                echo "</div>";
            }

            echo '<a href="index.php"><button id="goBackRanking" class="keySound">Inici</button></a>';
            
        } else {
            echo "No se encuentra el archivo ranking.txt";
        }
    ?>

    </main>

</body>
</html>
