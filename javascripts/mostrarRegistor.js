let cuerpoTabla = document.getElementById("cuerpoTabla");

function renderMostrar() {
    // 1. Obtener datos de LocalStorage
    const registros = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
    
    // 2. Limpiar la tabla antes de renderizar
    cuerpoTabla.innerHTML = "";

    // 3. Recorrer los datos y crear filas (tr)
    registros.forEach(reg => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${reg.lugar || 'N/A'}</td>
            <td>${reg.nombrePro}</td>
            <td>${reg.tipoNombre}</td>
            <td>${reg.placa}</td>
            <td>${reg.fecha}</td>
            <td>${reg.hora}</td>
            <td>$${reg.totalBase.toFixed(2)}</td>
            <td>
                <button onclick="prepararEdicion(${reg.id})" style="background:#f1c40f; color:black">Editar</button>
                <button onclick="eliminar(${reg.id})">Eliminar</button>
                <button onclick="finalizar(${reg.id})" style="background:green; color:white">Pagar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Función global para eliminar (necesita estar en window para el onclick del HTML)
window.eliminar = (id) => {
    if(confirm("¿Estás seguro de eliminar este registro?")) {
        let registros = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
        registros = registros.filter(r => r.id !== id);
        localStorage.setItem("registroVehiculos", JSON.stringify(registros));
        renderMostrar(); // Refrescar la tabla
    }
};

window.finalizar = (id) => {
    alert("Procesando pago... ¡Vuelva pronto!");
    window.eliminar(id);
};

document.addEventListener("DOMContentLoaded", () => {
    cuerpoTabla = document.getElementById("cuerpoTabla"); // Ahora sí te dejará guardarlo aquí sin romper nada
    renderMostrar();
});


// ... (Tus funciones de renderHistorial, eliminar y finalizar se quedan exactamente igual arriba)

document.addEventListener("DOMContentLoaded", () => {
    // 1. Asignamos el cuerpo de la tabla
    cuerpoTabla = document.getElementById("cuerpoTabla");
    renderMostrar();

    // 2. SECCIÓN DEL BUSCADOR: Seleccionamos el input por su ID
    const buscador = document.getElementById("buscadorPlaca");

    if (buscador) {
        // Escuchamos el evento 'input' (se activa cada vez que el usuario escribe o borra una letra)
        buscador.addEventListener("input", (e) => {
            // Convertimos el texto introducido a MAYÚSCULAS para evitar problemas con "abc" vs "ABC"
            const textoBusqueda = e.target.value.toUpperCase().trim();
            
            // Obtenemos todas las filas (tr) que se encuentran actualmente en el cuerpo de la tabla
            const filas = cuerpoTabla.querySelectorAll("tr");

            filas.forEach(fila => {
                // Obtenemos la celda de la Placa. En tu HTML, la placa es la CUARTA columna.
                // En programación empezamos a contar desde 0, así que la cuarta es el índice 3.
                const celdaPlaca = fila.children[3];

                if (celdaPlaca) {
                    const textoPlaca = celdaPlaca.textContent.toUpperCase();

                    // Si la placa de la fila contiene el texto buscado, la dejamos visible.
                    // Si no lo contiene, ocultamos la fila por completo.
                    if (textoPlaca.includes(textoBusqueda)) {
                        fila.style.display = ""; // Muestra la fila (vuelve a su estado original)
                    } else {
                        fila.style.display = "none"; // Oculta la fila
                    }
                }
            });
        });
    }
});
window.prepararEdicion = (id) => {
    // Guardamos en el localStorage el ID del vehículo que queremos editar
    localStorage.setItem("idParaEditar", id);
    // Redirigimos al usuario de vuelta al formulario (asumiendo que se llama home.html)
    window.location.href = "./registrar";
};
