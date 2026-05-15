//Función para ingresar en en loggin 
const nombreIn = document.getElementById("nombre");
const correoIn = document.getElementById("correo");
const contraseñaIn = document.getElementById("contraseña");
const boton = document.getElementById("boton");
const mensaje = document.getElementById("mensajeError");

// 1. Corregimos la obtención de datos
const obtenerUsuarios = () => {
    const data = localStorage.getItem("users");
    if (!data) {
        const inicial = [{ nombre: "admin", correo: "admin@campusparking.com", contraseña: "1234" }];
        localStorage.setItem("users", JSON.stringify(inicial));
        return inicial;
    }
    return JSON.parse(data);
}

boton.addEventListener("click", (e) => {
    e.preventDefault();
    
    const nombre = nombreIn.value.trim();
    const correo = correoIn.value.trim();
    const contraseña = contraseñaIn.value.trim();

    // 2. Llamamos a la función para tener la lista real de usuarios
    const listaUsuarios = obtenerUsuarios();

    mensaje.textContent = "";

    if (nombre === "" || correo === "" || contraseña === "") {
        mensaje.textContent = "⚠️ Por favor ingrese los datos solicitados";
        mensaje.style.color = "black";   
        return; 
    }

    // 3. CAMBIO CLAVE: Usamos 'listaUsuarios' (que es el array) para buscar
    const usuarioEncontrado = listaUsuarios.find(u => 
        u.nombre === nombre && 
        u.correo === correo && 
        u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
        // Guardamos quién entró para poder editarlo luego
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        
        mensaje.textContent = "✅ Accediendo...";
        mensaje.style.color = "green";

        // Redirección
        window.location.href = "home.html";
    } else {
        mensaje.textContent = "❌ Los datos ingresados son incorrectos";
        mensaje.style.color = "red"; // Cambiado a rojo para que se lea mejor que el rosa
    }
});

// 4. Limpiar campos al refrescar (opcional, para evitar que se queden pegados)
window.onload = () => {
    nombreIn.value = "";
    correoIn.value = "";
    contraseñaIn.value = "";
};





