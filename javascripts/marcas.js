const api="https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/440?format=json"
const seleccionar=document.getElementById("seleccionar")

async function marcarDeCarros() {
    try{
        const respuesta= await fetch(api);
        const datos= await respuesta.json();
        const personajes=datos.Results;
        const opciones=personajes.map(a=>`
            <option value="${a.Model_Id}">${a.Model_Name} </option>`

    ).join('');
    almacen.innerHTML=resultado;`
        <option value="">-- Selecciona un modelo --</option>
            ${opciones}`;
}
    catch (error){
        console.log(error)
    }   
}
marcarDeCarros();