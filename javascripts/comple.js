// ==========================================
// 1. LOGIN (Múltiples Usuarios)
// ==========================================
const form = document.getElementById("login");

function validarDatos(e) {
    e.preventDefault(); // Detiene cualquier recarga extraña
    
    const nombreInput = document.getElementById("nombre");
    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const mensaje = document.getElementById("mensajeError");

    // Validamos que los campos existan en la página antes de leer su valor
    if (!nombreInput || !correoInput || !passwordInput) {
        console.error("No se encontraron los campos del formulario de login en el HTML.");
        return;
    }

    const nombreVal = nombreInput.value.trim();
    const correoVal = correoInput.value.trim();
    const contraVal = passwordInput.value.trim();

    // 1. Forzar la base de datos local si está vacía
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (listaUsuarios.length === 0) {
        listaUsuarios = [{
            usuario: "admin",
            correo: "perezcleidy069@gmail.com",
            password: "123",
        }];
        localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    }

    // 2. Buscar coincidencia exacta
    const usuarioEncontrado = listaUsuarios.find(user => 
        user.usuario === nombreVal && 
        user.correo === correoVal && 
        (user.password === contraVal || user.contrasea === contraVal)
    );

    if (usuarioEncontrado) {
        alert(`¡Inicio exitoso! Bienvenido ${usuarioEncontrado.usuario}`);
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        window.location.href = "./home.html";
    } else {
        if (mensaje) {
            mensaje.textContent = "Datos incorrectos o usuario no registrado.";
        } else {
            alert("Datos incorrectos o usuario no registrado<a href>olvido pass</a>.");
        }
    }
}

// ⚠️ ¡ESTO TE FALTABA! Conectar la función al formulario de login
if (form) {
    form.addEventListener('submit', validarDatos);
    console.log("Formulario de login detectado y conectado correctamente.");
}


// ==========================================
// 2. REGISTRO (Múltiples Usuarios)
// ==========================================
const form2 = document.getElementById("login-registro");

const registro = (e) => {
    e.preventDefault();
    
    const inputNombre = document.getElementById("nombre1");
    const inputCorreo = document.getElementById("correo1");
    const inputPassword = document.getElementById("password1");

    if (!inputNombre || !inputCorreo || !inputPassword) {
        console.error("Error: No se encontraron todos los campos del formulario de registro en el HTML.");
        return;
    }

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const contra = inputPassword.value.trim();
    
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existeCorreo = listaUsuarios.some(user => user.correo === correo);
    if (existeCorreo) {
        alert("Este correo ya está registrado. Intenta iniciar sesión.");
        return; 
    }

    const nuevosDatos = {
        usuario: nombre,
        correo: correo,
        password: contra
    };
    
    listaUsuarios.push(nuevosDatos);
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    
    alert("Usuario registrado con éxito. ¡Ya puedes iniciar sesión!");
    form2.reset(); 
};

if (form2) {
    form2.addEventListener('submit', registro);
    console.log("Formulario de registro detectado y conectado correctamente.");
}