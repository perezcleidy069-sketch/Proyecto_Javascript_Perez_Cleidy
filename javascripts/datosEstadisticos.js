let datos=document.getElementById("datos")
const boton=document.getElementById("boton")

function estadoDeDatos(){
    const datitos=JSON.parse(localStorage.getItem("gananciasTotales")) || [];
    const regis=JSON.parse(localStorage.getItem("registroVehiculos")) || [];


    let carros=0, motos=0, bicis=0;
    datitos.forEach(v=>{
        let tipo=v.tipoNombre.toLowerCase();
        if(tipo.includes(carros)) carros ++;
        else if(tipo.includes(motos)) motos ++;
        else if(tipo.includes(bicis)) bicis ++;
        const cards=document.createElement("div")
        tipo.innerHTML=`
        <div class="datos" style=" border: 1px solid white: background-color: lightblue">
            <span class="datosCarros">Ganancias de los carros: ${cards.carros}</span>
        </div>
        <div class="datos" style=" border: 1px solid white: background-color: lightblue">
            <span class="datosCarros">Ganancias de las motos: ${cards.motos}</span>
        </div>
        <div class="datos" style=" border: 1px solid white: background-color: lightblue">
            <span class="datosCarros">Ganancias de las bicicletas: ${cards.bicis}</span>
        </div>
        `
        datitos.appendChild(div)

    })
    const hoy= new Date().toISOString.split('T')[0];
    let gananciasDeHoy=0;
    
    regis.forEach(g=>{
        if(g.fechaPago===hoy){
            gananciasDeHoy +=g.totalPagado;
        }
    })


}
    boton.addEventListener("submit", (e)=>{
        e.preventDefault()
    
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
        

    
        document.addEventListener("DOMContentLoaded"), ()=>{
        estadoDeDatos();
        const busque=document.getElementById("buscarPorFecha")
        const busqueFinal=document.getElementById("fecha-final")
            if(busque && busqueFinal){
                busque.addEventListener("input", (e)=>{
                    const fechaBusca= new Date().toISOString('T')[0]
                    const fechaFinal= new Date().toISOString('T')[0]
                    const tarji=datos.querySelectorAll(".vehiculo-car");
        
                    tarji.forEach(h=>{
                        const elementoFecha=h.querySelector(".fecha");
                        if (elementoFecha){
                            const fechasSeleccionada=elementoFecha;
                            if(fechasSeleccionada.includes(fechaBusca, fechaFinal)){
                                h.style.display="";
                            }else{
                                h.style.display="none";
                            }
                        }
                    })
                })
            }
        }
    });
