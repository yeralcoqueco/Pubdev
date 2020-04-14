
const ModeloCrearEventos = function (datos, db){ 
    this.db=db.database()
    this.datos = datos
}
ModeloCrearEventos.prototype.consultarEvento = async function(){
    return new Promise (resolver => {
        this.db.ref("Eventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).on("value", (data)=>
        {
            this.db.ref("Eventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).off()
            console.log(data)
            if(data == undefined){
                resolver(false)
            }else{
                resolver(true)
            }
        })
    })
}
ModeloCrearEventos.prototype.crearEvento = function(){
    var query  = this.datos
    query.img = null
    this.db.ref("Eventos/"+this.datos.tipoEvento+"/"+this.datos.nombre).set(query)
}

module.exports = ModeloCrearEventos