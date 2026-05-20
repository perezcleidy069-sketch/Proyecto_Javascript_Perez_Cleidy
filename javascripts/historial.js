let card = document.getElementById("card")

function renderHistorial() {
    const registro = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
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
            </div>
            <div class="card-footer">
                <p><strong>Total Pago:</strong> $${Number(vehiculo.totalBase).toFixed(2)}</p>
            </div>
        `;
        card.appendChild(tarjeta);
    });
}
document.addEventListener("DOMContentLoaded", renderHistorial);
