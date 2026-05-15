const formulario=document.getElementById("formulario");
const propetario=document.getElementById("propetario");
const inputPlaca=document.getElementById("place");
const inputLugar=document.getElementById("lugar");
const inputFijo=document.getElementById("placaFija")
const tipoVehiculo=document.getElementById("car");
const horaIngreso=document.getElementById("hora");
const fechaIngreso=document.getElementById("fecha");
const asignacion=document.getElementById("boton");
const tarjetaMarca=document.getElementById("tarjeta")
const linkAsignar=document.querySelector('a[href="./asignarLugar.html"]');

const spanLugar=document.getElementById("botons");
const spanMarca=document.getElementById("marca");

let editando = null;

tipoVehiculo.addEventListener("change", (e)=>{
    const seleccionOpcion=e.target.selectedOptions[0]
    const prefix=seleccionOpcion.getAttribute("data-prefix");

    console.log("cambiando el prefijo a: ", prefix)

    if(inputFijo){
        inputFijo.textContent=prefix || "---";
    }
});

//Funcion que seleciona un número de parque y luego se seleccione el espacio

document.addEventListener("DOMContentLoaded", () => {
    const inputLugar = document.getElementById("lugar");
    const botones = document.querySelectorAll(".slot"); // Seleccionamos todos por clase
    const spanVacios = document.getElementById("vacios");
    const spanOcupados = document.getElementById("ocupados");
    const formulario = document.querySelector("form");

    // Función para contar
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

    // 1. Resaltar el botón mientras escribes el número
    inputLugar.addEventListener("input", () => {
        const valor = parseInt(inputLugar.value) - 1;
        
        // Quitamos el resaltado previo de todos
        botones.forEach(b => b.style.border = "1px solid #ccc");

        // Resaltamos el actual (si existe)
        if (botones[valor]) {
            botones[valor].style.border = "3px solid blue";
        }
    });

    // 2. Al darle click a Guardar
    formulario.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        const valor = parseInt(inputLugar.value) - 1;

        if (botones[valor]) {
            // Marcamos como ocupado
            botones[valor].classList.add("ocupado");
            botones[valor].style.backgroundColor = "#ff7675"; // Color rojo/ocupado
            botones[valor].style.border = "1px solid red";
            
            actualizarConteo();
            alert("Lugar " + (valor + 1) + " asignado correctamente.");
        } else {
            alert("Por favor selecciona un número válido (1-30)");
        }
    });
});