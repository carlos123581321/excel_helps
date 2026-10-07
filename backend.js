const express = require('express')
const xlsx = require('xlsx');
const alasql = require('alasql')

const app = express();
app.use(express.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-type')
    res.header('Access-Control-Allow-Methods', 'POST')
    next()
})


app.post('/excel/comparar/post', (req, res) => {
    const recibido = req.body;
    
        const archivoFacturas = recibido.facturas
        const archivoAcuses = recibido.acuses

        const FacturasArchivo = xlsx.readFile(archivoFacturas);
        const AcusesArchivo = xlsx.readFile(archivoAcuses);
    
        function ObtenerDatos(archivo){
            try{
                const datos = xlsx.utils.sheet_to_json(archivo.Sheets[archivo.SheetNames[0]]);
                console.log("Datos obtenidos con éxito")
                console.log(datos)
                return datos;
            }catch(err){
                console.log("Error al obtener los datos", err)
            }
        }
    
        const ObtencionFacturas = ObtenerDatos(FacturasArchivo)
        const ObtencionAcuses = ObtenerDatos(AcusesArchivo)
    
        const Facturas = ObtencionFacturas.map(columnas => columnas.Facturas)
        const Acuses = ObtencionAcuses.map(columnas => columnas.FACTURAS)
    
        let listaDiferencia = []
        Facturas.forEach(element => {
            if(!Acuses.includes(element)){
                listaDiferencia.push(element)
            }
                
    });
    
    if(listaDiferencia.length == 0){
        console.log("Todas las facturas tienen acuses")
        res.json({message:"Todas las facturas tienen acuses"})
        return;
    }else{
        console.log(listaDiferencia)
        res.json(listaDiferencia)
    }
    
    
    })


app.listen(3000, () => {
    console.log("servidor iniciado en el puerto 3000")
})