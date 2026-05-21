const inputFijo = document.getElementById("placaFija")
const tipoVehiculo = document.getElementById("car");
let editando = null;



tipoVehiculo.addEventListener("change", (e) => {
    const seleccionOpcion = e.target.selectedOptions[0]
    const prefix = seleccionOpcion.getAttribute("data-prefix");
    console.log("cambiando el prefijo a: ", prefix)

    if (inputFijo) {
        inputFijo.textContent = prefix || "---";
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
    const fechaIngreso = document.getElementById("fecha");
    fechaIngreso.value = new Date().toISOString().split('T')[0];
    fechaIngreso.readOnly = true;

    const horaIngreso = document.getElementById("hora")
    horaIngreso.value = new Date().toLocaleTimeString('it-IT')
    horaIngreso.readOnly = true;

    const inputFijo = document.getElementById("placaFija");

    //validar la placa
    function validarPlaca() {
        const valide = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
        const placaIngresada = (inputFijo ? inputFijo.textContent : "") + inputPlaca.value;

        const placaDuplicada = valide.some(v => v.placa === placaIngresada);
        if (placaDuplicada) {
            alert("Esta placa ya existe ingrese otra");
            return
        }
        return true;
    }

    //Validar si el lugar donde se parque no esta ocupado

    function LugarAValidar() {
        const valor = parseInt(inputLugar.value) - 1;
        if (botones[valor]) {
            if (botones[valor].classList.contains("ocupado")) {
                alert("Este lugar ya esta ocupado, por favor elije otra opción")
                inputLugar.value = "";
                botones[valor].style.border = "1px solid #ccc";
                return false;
            }
        }
        return true;
    }

    function actualizarConteo() {
        let ocupados = 0;
        botones.forEach(boton => {
            if (boton.classList.contains("ocupado")) {
                ocupados++;
            }
        });
        if (spanOcupados) spanOcupados.innerText = ocupados;
        if (spanVacios) spanVacios.innerText = botones.length - ocupados;
    }

    // --- 3. EFECTO VISUAL ---
    const registrosActuales = JSON.parse(localStorage.getItem("registroVehiculos")) || [];
    registrosActuales.forEach(vehiculo => {
        const indice = parseInt(vehiculo.lugar) - 1;
        if (botones[indice]) {
            botones[indice].classList.add("ocupado");
            botones[indice].style.backgroundColor = "#ff7675";
            botones[indice].style.border = "1px solid red";
        }
    });


    const idParaEditar = localStorage.getItem("idParaEditar");
    if (idParaEditar) {
        const regis = JSON.parse(localStorage.getItem("registroVehiculos"))
        const vehiculoEditar = regis.find(v => v.id == idParaEditar)

        if (vehiculoEditar) {
            propietario.value = vehiculoEditar.nombrePro;
            inputLugar.value = vehiculoEditar.lugar;
            inputPlaca.value = vehiculoEditar.placa.replace("---", "")
            const botonSubmit = document.querySelector("form button[type='submit']")
            if (botonSubmit) botonSubmit.textContent = "Actualizar Resgitro";
        }
    }

    inputLugar.addEventListener("input", () => {
        const valor = parseInt(inputLugar.value) - 1;
        botones.forEach(b => {
            if (b.classList.contains("ocupado")) {
                b.style.border = "1px solid red";

            } else {
                b.style.border = "1px solid #ccc";
            }
        });
        if (botones[valor] && !botones[valor].classList.contains("ocupado")) {
            botones[valor].style.border = "3px solid blue";
        }
    });
    inputLugar.addEventListener("change", () => {
        LugarAValidar();
    })

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        //Es el momento cuando se edita y actuliza
        if (idParaEditar) {
            let registerList = JSON.parse(localStorage.getItem("registroVehiculos")) || [];

            registerList = registerList.map(v => {
                if (v.id == idParaEditar) {
                    return {
                        ...v,
                        nombrePro: propietario.value,
                        lugar: inputLugar.value,
                        placa: (inputFijo ? inputFijo.textContent : "") + inputPlaca.value,
                        tipoNombre: tipoVehiculo.options[tipoVehiculo.selectedIndex].text
                    }
                }
                return v;
            });
            localStorage.setItem("registroVehiculos", JSON.stringify(registerList));
            localStorage.removeItem("idParaEditar");
            alert("Datos modificados con éxito");
            window.location.href = "./mostrarRegistro.html";
            return;

        }

        if (!LugarAValidar() || !validarPlaca()) {

            return;
        }


        const valorLugar = inputLugar.value;
        const indice = parseInt(valorLugar) - 1;

        if (botones[indice]) {
            fechaIngreso.value = new Date().toISOString().split('T')[0];
            horaIngreso.value = new Date().toLocaleTimeString('it-IT')
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
            if (inputFijo) inputFijo.textContent = "---";

            fechaIngreso.value = new Date().toISOString().split('T')[0];
            horaIngreso.value = new Date().toLocaleTimeString('it-IT');

        } else {
            alert("Selecciona un número de lugar válido (1-30)");
        }
    });
    actualizarConteo();
});


