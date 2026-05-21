let listaUsuario=JSON.parse(localStorage.getItem('usuarios')) || [];
console.log(listaUsuario)
let correoSesion=localStorage.getItem('usuarioActivo')
 let user=listaUsuario.find(u=> u.correo===correoSesion);


 if(user){
    document.getElementById("tex__nombre").innerText=user.nombre;
    document.getElementById("tex__correo").innerText=user.correo;
   
 }

 //Esta funcion para editar

 document.getElementById("btn-editar").addEventListener('click', ()=>{
    const vistaTexto = document.getElementById("container");
    const vistaEdit = document.getElementById("edit__container");
    const btnEditar = document.getElementById("btn-editar");

    vistaTexto.hidden = true;
    vistaEdit.hidden = false;
    vistaEdit.style.display = "block";
    btnEditar.hidden = true;

    document.getElementById("input__nombre").value = user.nombre;
    document.getElementById("input__correo").value = user.correo;
    document.getElementById("input__contraseña").value = user.contraseña || "";

});
//Para guardar los datos que se editatoron
document.getElementById("btn-guardar").addEventListener('click', ()=>{
    let user={}
    user.nombre=document.getElementById("input__nombre").value;
    user.correo=document.getElementById("input__correo").value;
    user.contraseña=document.getElementById("input__contraseña").value;
    console.log(user)
    localStorage.setItem('usuarios', JSON.stringify (listaUsuario));
    localStorage.setItem('correoActivo', user.correo);

    alert("Datos actualizados ✅");
    location.reload();
})