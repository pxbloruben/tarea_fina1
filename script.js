// Obtener los elementos del DOM
let agregar_button = document.getElementById("agregar_button");

// Obtener los valores de los inputs del DOM usando su ID
// En este caso es de los comentarios y el nombre del usuario
let entry_input = document.getElementById("entry_input");
let name_input = document.getElementById("name_input");

// Paso 3.2 Obtener el elemento del contenedor del DOM
let contenedor = document.getElementById("contenedor");

// variable para guardar las entradas
let entries = { contents: [] };

// Sacar los entries de localStorage
if (localStorage.getItem("entries")) { // se verifican que si existan entradas para no agregar un comentario vacio 
    // Pasar el JSON de entries a objeto literal
    let entries_JSON = localStorage.getItem("entries");
    entries = JSON.parse(entries_JSON);

    // Mostrar los comentarios almacenados al cargar la página
    for (let i = 0; i < entries.contents.length; i++) {
        agregar_entry_a_la_interfaz(entries.contents[i]);
    }
}

// Función para agregar un comentario a la interfaz
function agregar_entry_a_la_interfaz(entry) {
    // se crea un elemento div y se agrega el contenido del comentario
    let element = document.createElement("div");
    element.classList.add("comentario");

    // se muestra el nombre y el comentario del usuario
    let date = new Date(entry.timestamp);
    let formattedDate = date.toLocaleString(); // obtiene la fecha y hora en formato local
    element.innerHTML = `<p><strong>${entry.name}:</strong> ${entry.text}</p> 
                         <small>${formattedDate}</small>`;
    // boton para eliminar el comentario 
    let delete_button = document.createElement("button");
    delete_button.innerHTML = "Eliminar";
    delete_button.classList.add("delete-btn");

    // Evento para eliminar comentario con confirmación
    delete_button.addEventListener("click", function () {
        if (confirm("¿Seguro que deseas eliminar este comentario?")) {
            contenedor.removeChild(element);

            // Eliminar comentario del array y actualizar localStorage
            entries.contents = entries.contents.filter(c => c.timestamp !== entry.timestamp);
            let entries_JSON = JSON.stringify(entries);
            localStorage.setItem("entries", entries_JSON);
        }
    });

    element.appendChild(delete_button);
    contenedor.appendChild(element);
}

// Evento de clic para agregar comentario
agregar_button.addEventListener("click", function () {
    console.log("Botón presionado!");

    // Obtener los valores de los inputs
    let comentario = entry_input.value.trim();
    let nombre = name_input.value.trim();

    console.log("Comentario:", comentario);
    console.log("Nombre:", nombre);

    // Validar los campos
    if (!comentario || !nombre) {
        alert("Por favor, ingresa tu nombre y un comentario.");
        return;
    }

    // Crear una nueva entrada
    let newEntry = { name: nombre, text: comentario, timestamp: Date.now() };

    // Agregar la entrada a la interfaz
    agregar_entry_a_la_interfaz(newEntry);

    //  Agregar la nueva entrada al array de entries
    entries.contents.push(newEntry);

    // Convertir a JSON
    let entries_JSON = JSON.stringify(entries);

    // Guardar en localStorage
    localStorage.setItem("entries", entries_JSON);

    // Limpiar los campos de entrada
    entry_input.value = "";
    name_input.value = "";
});
