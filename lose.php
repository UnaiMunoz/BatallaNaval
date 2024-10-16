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