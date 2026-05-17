// ==========================================
// 1. LOGIN (Múltiples Usuarios)
// ==========================================
const mensaje = document.getElementById("mensajeError");
const form = document.getElementById("login");

function validarDatos(e) {
    e.preventDefault();
    const nombreVal = document.getElementById("nombre").value.trim();
    const correoVal = document.getElementById("correo").value.trim();
    const contraVal = document.getElementById("password").value.trim();

    // Traemos la lista de usuarios, si no existe, será un array vacío []
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscamos si existe algún usuario que coincida con TODOS los datos del login
    const usuarioEncontrado = listaUsuarios.find(user => 
        user.usuario === nombreVal && 
        user.correo === correoVal && 
        user.password === contraVal
    );

    if (usuarioEncontrado) {
        alert(`¡Inicio exitoso! Bienvenido ${usuarioEncontrado.usuario}`);
        // Opcional: Guardar temporalmente quién inició sesión para usar su nombre en home.html
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
        window.location.href = "./home.html";
    } else {
        mensaje.textContent = "Datos incorrectos o usuario no registrado.";
    }
}

if (form) {
    form.addEventListener('submit', validarDatos);
}


// ==========================================
// 2. REGISTRO (Múltiples Usuarios)
// ==========================================
// ==========================================
// 2. REGISTRO (Múltiples Usuarios)
// ==========================================
const form2 = document.getElementById("login-registro");

const registro = (e) => {
    e.preventDefault();
    
    // Capturamos los elementos asegurando que existan en el HTML
    const inputNombre = document.getElementById("nombre1");
    const inputCorreo = document.getElementById("correo1");
    const inputPassword = document.getElementById("password1");

    // Si por alguna razón falta un campo, detenemos la función para que no rompa la consola
    if (!inputNombre || !inputCorreo || !inputPassword) {
        console.error("Error: No se encontraron todos los campos del formulario en el HTML.");
        return;
    }

    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const contra = inputPassword.value.trim();
    
    // 1. Obtener la lista de usuarios que ya existen (o crear una vacía)
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 2. Validar que el correo no esté registrado ya por otra persona
    const existeCorreo = listaUsuarios.some(user => user.correo === correo);
    if (existeCorreo) {
        alert("Este correo ya está registrado. Intenta iniciar sesión.");
        return; 
    }

    // 3. Crear el nuevo usuario (usamos la palabra estándar password)
    const nuevosDatos = {
        usuario: nombre,
        correo: correo,
        password: contra
    };
    
    // 4. Agregar el nuevo usuario a la lista
    listaUsuarios.push(nuevosDatos);
    
    // 5. Guardar la lista actualizada en LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
    
    alert("Usuario registrado con éxito. ¡Ya puedes iniciar sesión!");
    form2.reset(); 
};

if (form2) {
    form2.addEventListener('submit', registro);
}