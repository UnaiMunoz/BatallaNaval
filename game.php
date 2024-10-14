<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f9f9f9;
            color: #333;
        }

        #timer {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 10px;
        }

        #points {
            margin-top: 10px;
            font-size: 1.5em;
        }

        .button {
            margin-top: 10px;
            padding: 10px 20px;
            font-size: 1.2em;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        #recordForm {
            display: none;
            margin-top: 20px;
        }

        #errorMessage {
            color: red;
        }

    </style>
</head>
<body>
    <h1>Juego</h1>
    <div id="timer">00:00:00</div>
    <div id="points">Puntos del jugador: 0</div>
    <button id="addPointsButton" class="button">Sumar puntos</button>
    <button id="subtractPointsButton" class="button">Restar puntos</button>

    <!-- Formulario para ingresar el nombre del jugador -->
    <form id="recordForm" method="GET">
        <h2>¡Has llegado a 500 puntos! Ingresa tu nombre:</h2>
        <label for="playerName">Tu nombre:</label>
        <input type="text" name="playerName" id="playerName" placeholder="Tu nombre" required>
        <button type="submit" id="submitNameButton" class="button">Enviar</button>
        <div id="errorMessage"></div>
    </form>

    <!-- Enlace al archivo JavaScript externo -->
    <script src="game.js" defer></script>
</body>
</html>
