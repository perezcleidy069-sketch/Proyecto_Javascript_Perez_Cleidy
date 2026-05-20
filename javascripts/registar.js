const inputFijo=document.getElementById("placaFija")
const tipoVehiculo=document.getElementById("car");
let editando = null;



tipoVehiculo.addEventListener("change", (e)=>{
const seleccionOpcion=e.target.selectedOptions[0]
const prefix=seleccionOpcion.getAttribute("data-prefix");
console.log("cambiando el prefijo a: ", prefix)

if(inputFijo){
inputFijo.textContent=prefix || "---";
}
});


document.addEventListener("DOMContentLoaded", () => {
    const inputLugar = document.getElementById("lugar");
    const botones = document.querySelectorAll(".slot");
    const spanVacios = document.getElementById("vacios");
    const spanOcupados = document.getElementById("ocupados");
    const formulario = document.querySelector("form");

    const propietario = document.getElementById("propetario"); 
    const inputPlaca = document.getElementById("place");
    const tipoVehiculo = document.getElementById("car");
    const fechaIngreso=document.getElementById("fecha");
    fechaIngreso.value = new Date().toISOString().split('T')[0];
    fechaIngreso.readOnly=true;

    const horaIngreso = document.getElementById("hora")
    horaIngreso.value= new Date().toLocaleTimeString('it-IT')
    horaIngreso.readOnly=true;

    const inputFijo = document.getElementById("placaFija");

    function actualizarConteo() {
        let ocupados = 0;
        botones.forEach(boton => {
            if (boton.classList.contains("ocupado")) {
                ocupados++;
            }
        });
        spanOcupados.innerText = ocupados;
        spanVacios.innerText = botones.length - ocupados;
    }

    inputLugar.addEventListener("input", () => {
        const valor = parseInt(inputLugar.value) - 1;
        botones.forEach(b => b.style.border = "1px solid #ccc");
        if (botones[valor]) {
            botones[valor].style.border = "3px solid blue";
        }
    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const valorLugar = inputLugar.value;
        const indice = parseInt(valorLugar) - 1;

        if (botones[indice]) {
            // --- 1. CAPTURAR LOS DATOS ---
            const nuevoRegistro = {
                id: Date.now(), // ID único para poder eliminarlo después
                lugar: valorLugar,
                nombrePro: propietario.value,
                tipoNombre: tipoVehiculo.options[tipoVehiculo.selectedIndex].text,
                placa: (inputFijo ? inputFijo.textContent : "") + inputPlaca.value,
                fecha: fechaIngreso.value,
                hora: horaIngreso.value,
                totalBase: 0 // Puedes cambiar esto por un cálculo de precio
            };

            // --- 2. GUARDAR EN LOCALSTORAGE ---
            // Traemos lo que ya existe o creamos un array vacío si es el primero
            const registros = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
            
            // Agregamos el nuevo registro al array
            registros.push(nuevoRegistro);
            
            // Guardamos el array actualizado de vuelta en LocalStorage
            localStorage.setItem("registroVehiculos", JSON.stringify(registros));

            // --- 3. EFECTO VISUAL ---
            botones[indice].classList.add("ocupado");
            botones[indice].style.backgroundColor = "#ff7675";
            botones[indice].style.border = "1px solid red";
            
            actualizarConteo();
            alert("Vehículo registrado con éxito en el lugar " + valorLugar);
            
            // Opcional: Limpiar el formulario para el siguiente registro
            formulario.reset();
            if(inputFijo) inputFijo.textContent = "---"; 
            
        } else {
            alert("Selecciona un número de lugar válido (1-30)");
        }
    });
});
