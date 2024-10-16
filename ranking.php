<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ranking</title>
    <link rel="stylesheet" href="style.css">
</head>

<!-- 
Este archivo muestra un ranking de los jugadores que han jugado al juego de Batalla Naval.
Los datos se leen de un archivo de texto llamado "ranking.txt" que contiene los datos de los jugadores en el siguiente formato:
nombre;puntuación;fecha
Se ordenan los registros por puntuación en orden descendente y por fecha en orden ascendente.
(En caso de que dos jugadores tengan la misma puntuación, se ordenan por fecha en orden ascendente).
Se muestra una tabla con los datos de los jugadores y un paginador para navegar entre las páginas.
El paginador se muestra si hay más de 25 registros.
-->


<body id="bodyRanking">
    <header>
        <h1>Ranking</h1>
    </header>
    <main>

    <div id="table-container">
    <?php
        $registrosPorPagina = 25;

        // Verificar el número de página actual. Si no está definido, empieza por la página 1
        $paginaActual = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
        if ($paginaActual < 1) {
            $paginaActual = 1;
        }
        // Calcular el registro inicial
        $registroInicial = ($paginaActual - 1) * $registrosPorPagina;

        // Abrimos el fichero ranking.txt
        $archivo = 'ranking.txt';
        $file = fopen($archivo, 'r');

        // Verificar que el archivo existe
        if ($file) {
            // Leer todo el archivo y almacenar los registros en un array
            $registros = [];
            while (($linea = fgets($file)) !== false) {
                // Separa los datos por el delimitador ";"
                $datos = explode(';', trim($linea));
                
                // Verificar que la línea tenga los 3 elementos esperados
                if (count($datos) == 3) {
                    $registros[] = [
                        'name' => trim($datos[0]),
                        'points' => (int) trim($datos[1]), // Convierte puntuación a entero
                        'date' => trim($datos[2]),
                    ];
                }
            }

            // Cerrar el archivo
            fclose($file);

            // usort => Ordena los registros por puntuación en orden descendente y por date en orden ascendente
            usort($registros, function ($a, $b) {
                if ($a['points'] === $b['points']) {
                    // Si las pointses son iguales, comparar por date
                    return strcmp($a['date'], $b['date']); // Orden ascendente por date
                }
                return $b['points'] <=> $a['points']; // Orden descendente por puntuación
            });

            // Contar cuántos registros hay en total
            $totalRegistros = count($registros);

            // Calcular el total de páginas
            $totalPaginas = ceil($totalRegistros / $registrosPorPagina);

            // Crear una tabla HTML
            echo "<table id='rankingTable'>";
            echo "<tr><th>Position</th><th>Name</th><th>Points</th><th>Date</th></tr>";

            // Mostrar los registros de la página actual
            $registroFinal = min($registroInicial + $registrosPorPagina, $totalRegistros);
            
            // Calcular la posición basada en el registro inicial
            $posicion = $registroInicial + 1; // Inicia en el registro inicial + 1

            for ($i = $registroInicial; $i < $registroFinal; $i++) {
                // Obtener los datos ordenados
                $name = $registros[$i]['name'];
                $points = $registros[$i]['points'];
                $date = $registros[$i]['date'];

                // Mostrar fila
                echo "<tr>";
                echo "<td class='selecRanking'>$posicion</td>";
                echo "<td>$name</td>";
                echo "<td>$points</td>";
                echo "<td>$date</td>";
                echo "</tr>";

                $posicion++; // Incrementar la posición
            }

            echo "</table>";
            echo "</div>";

            // Crear el paginador si hay más de una página
            if ($totalPaginas > 1) {
                echo "<div id='paginador'>";

                // Botón de "Anterior"
                if ($paginaActual > 1) {
                    $anterior = $paginaActual - 1;
                    echo "<a href='?pagina=$anterior'> <= </a> ";
                }

                // Botones de las páginas
                for ($i = 1; $i <= $totalPaginas; $i++) {
                    if ($i == $paginaActual) {
                        echo "<strong>$i</strong> "; // Página actual en negrita
                    } else {
                        echo "<a href='?pagina=$i'>$i</a> ";
                    }
                }

                // Botón de "Siguiente"
                if ($paginaActual < $totalPaginas) {
                    $siguiente = $paginaActual + 1;
                    echo "<a href='?pagina=$siguiente'> => </a>";
                }

                echo "</div>";
            }

            echo '<a href="index.php"><button id="goBackRanking">Go Home</button></a>';
            
        } else {
            echo "No se encuentra el archivo ranking.txt";
        }
    ?>

    <?php
        // Lee los datos enviados desde el JavaScript
        $inputData = file_get_contents("php://input");
        $data = json_decode($inputData, true);

        // Extraer nombre, puntuación y fecha
        $name = $data['name'];
        $score = $data['score'];
        $date = $data['date'];

        // Formatear la línea a escribir
        $linea = "$name;$score;$date\n";

        // Escribir en el archivo ranking.txt
        $file = fopen("ranking.txt", "a"); // Abrir archivo en modo añadir
        fwrite($file, $linea);
        fclose($file);

        // Enviar una respuesta
    ?>
    


    </main>

</body>
</html>