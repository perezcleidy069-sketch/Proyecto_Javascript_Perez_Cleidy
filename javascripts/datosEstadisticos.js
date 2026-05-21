let datos=document.getElementById("datos")

function estadoDeDatos(){
    const datitos=JSON.parse(localStorage.getItem("gananciasTotales")) || [];

    datitos.innerHTML="";
    if(datitos.length===0){
        datitos.innerHTML=`<p stylye="color lightblue; font-style: italic; text-align:center width:90%">No hay vehìculos registrados en esa fecha</p>`
        rerurn;
    }
    datitos.forEach(vehiculo=>{
        const tar=document.createElement("div");
        tar.classList.add("vehiculo-card");
        tar.innerHTML=`
            <div class="card-header">
                <span class="lugar-badge">Lugar: ${vehiculo.lugar|| 'N/A' }
            </div>
            <div class="card-body">
                <p><strong>Vehiculo:</strong>${vehiculo.tipoNombre}</p>
                <p><strong>Tiempo:</strong>${vehiculo.hora}</p>
                <p><strong>Fecha:</strong>${vehiculo.fecha}</p>
                <p><strong>Total del pago:</strong>$${Number(vehiculo.totalPago).toFixed(2)}</p>
                `;
        datos.appendChild(datitos);

    });
}

document.addEventListener("DOMContentLoaded", ()=>{
    estadoDeDatos();
    const busque=document.getElementById("buscarPorFecha")
    const busqueFinal=document-getElementById("fecha-final")
    if(busque && busqueFinal){
        busque.addEventListener("input", (e)=>{
            const fechaBusca=e.target.value
            const fechaFinal=e.target.value
            const tarji=datos.querySelectorAll(".vehiculo-car");

            tarji.forEach(h=>{
                const elementoFecha=h.querySelector(".fecha");
                if (elementoFecha){
                    const fechasSeleccionada=elementoFecha;
                    if(fechasSeleccionada.includes(fechaBusca)){
                        h.style.display="";
                    }else{
                        h.style.display="none";
                    }
                }
            })
        })
    }
})
