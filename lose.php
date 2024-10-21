<?php
        session_start();

        // Comprovar si la pàgina ha estat accedida des de 'game.php'
        if (!isset($_SERVER['HTTP_REFERER']) || strpos($_SERVER['HTTP_REFERER'], 'game.php') === false) {
                // Si no prové de 'game.php', retornar error 403
                header("HTTP/1.1 403 Forbidden");
                exit("No tens permís per a accedir a aquesta pàgina");
        }

?>



