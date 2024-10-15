/* ******************************* */
/* Funciones Game */
/* ******************************* */

// Función que genera un número random
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Crea los nombres aleatorios de los td
function getRandomCodeNumber(element) {
    // Genera una letra random
    let character = String.fromCharCode(getRandomNumber(65, 90));
    // Genera un número random
    let number = String(getRandomNumber(0, 9));
    // Une la letra y el número
    let nameCode = character + number;

    // Mostrar el resultado en el elemento correspondiente
    element.innerText = nameCode;
}

// Asegura que el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar todos los elementos td con la clase "codeName"
    const nameElements = document.querySelectorAll("td.codeName");

    // Establecer un intervalo para actualizar solo los elementos que no tienen "codeName"
    setInterval(() => {
        nameElements.forEach(element => {
            if (element.classList.contains("codeName")) {
                getRandomCodeNumber(element);
            }
        });
    }, 100);
});

function changeDataCell(td) {
    // Cambiar o eliminar la clase
    if (td.classList.contains("codeName")) {
        td.classList.remove("codeName");
        td.classList.add("dado");

        // Obtener el atributo 'name' de la celda
        let name = td.getAttribute('name'); 

        // Verificar que name tenga un valor válido
        if (name === "vacio") {
            // Cambiar el contenido del td
            td.innerHTML = "X"; 
        } else {
            td.innerHTML = "·"; 
        }
    }
}

/*document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.tagName.toLowerCase() === 'td') {
        console.log(target.id);
    }
});

var id = "Y2X3"; // Ejemplo de id
var numeros = id.match(/\d+/g); // Extrae los números
console.log(numeros); // ["2", "3"]*/
