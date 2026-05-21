let card = document.getElementById("card")

function renderHistorial() {
    const registro = JSON.parse(localStorage.getItem("gananciasTotales")) || [];
    card.innerHTML = "";

    if (registro.length === 0) {
        card.innerHTML = `<p style="color: #666; font-style: italic; text-align: center; width: 100%;">No hay vehículos registrados en el historial.</p>`;
        return;
    }

    registro.forEach(vehiculo => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("vehiculo-card");
        tarjeta.innerHTML = `
            <div class="card-header">
                <span class="lugar-badge">Lugar: ${vehiculo.lugar || 'N/A'}</span>
            </div>
            <div class="card-body">
                <p><strong>Propietario:</strong> ${vehiculo.nombrePro}</p>
                <p><strong>Vehículo:</strong> ${vehiculo.tipoNombre}</p>
                <p><strong>Placa:</strong> <span class="placa-texto">${vehiculo.placa}</span></p>
                <p><strong>Fecha:</strong> ${vehiculo.fecha}</p>
                <p><strong>Hora Ingreso:</strong> ${vehiculo.hora}</p>
                <p><strong>Fecha Pago:</strong> ${vehiculo.fechaPago || vehiculo.fecha}</p>
                <p><strong>Método de Pago:</strong> ${vehiculo.tipoPago || 'Efectivo'}</p>
            </div>
            <div class="card-footer">
                <p><strong>Total Pago:</strong> $${Number(vehiculo.totalPagado).toFixed(2)}</p>
            </div>
        `;
        card.appendChild(tarjeta);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    renderHistorial();

    // 2. SECCIÓN DEL BUSCADOR: Seleccionamos el input por su ID
    const buscador = document.getElementById("buscadorPlaca");

    if (buscador) {
        // Escuchamos el evento 'input' (se activa cada vez que el usuario escribe o borra una letra)
        buscador.addEventListener("input", (e) => {
            // Convertimos el texto introducido a MAYÚSCULAS para evitar problemas con "abc" vs "ABC"
            const textoBusqueda = e.target.value.toUpperCase().trim();

            // Obtenemos todas las filas (tr) que se encuentran actualmente en el cuerpo de la tabla
            const tarjetas = card.querySelectorAll(".vehiculo-card");

            tarjetas.forEach(tarjeta => {
                // Obtenemos la celda de la Placa. En tu HTML, la placa es la CUARTA columna.
                // En programación empezamos a contar desde 0, así que la cuarta es el índice 3.
                const elementoPlaca = tarjeta.querySelector(".placa-texto");

                if (elementoPlaca) {
                    const textoPlaca = elementoPlaca.textContent.toUpperCase();

                    // Si la placa de la fila contiene el texto buscado, la dejamos visible.
                    // Si no lo contiene, ocultamos la fila por completo.
                    if (textoPlaca.includes(textoBusqueda)) {
                        tarjeta.style.display = ""; // Muestra la fila (vuelve a su estado original)
                    } else {
                        tarjeta.style.display = "none"; // Oculta la fila
                    }
                }
            });
        });
    }
});
