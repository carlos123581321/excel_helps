const formulario = document.getElementById('form')
const diferencia = document.getElementById('diferencia')


async function comparar(archivos) {
    try{
        const respuesta = await fetch('http://localhost:3000/excel/comparar/post',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:archivos
    })
    const respuestaObjeto = await respuesta.json();
    diferencia.innerHTML = ''

    if(respuestaObjeto.message){
        diferencia.innerHTML += `<p>Todas las facturas tienen acuses</p>`  
    }else{
        respuestaObjeto.forEach(element => {
            diferencia.innerHTML += `<p>${element} no está en acuses</p>`
        });
    }

    }catch(err){
        console.log(err)
    } 
}
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formulario)
    const data = Object.fromEntries(formData)
    const json = JSON.stringify(data)

    comparar(json)
    
    
})