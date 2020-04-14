const ModelRegistro = require("../model/modelRegistro");

var controllerRegistro={
	db:null
};
controllerRegistro.guardarDb = (db)=>{
	this.db=db
}

controllerRegistro.renderRegistroPage = (req, res) => {
    res.render("../../views/registro")
}
controllerRegistro.registrarUsuario = async (req, res) => {
	if(validarInformacion(req.body.nombre,req.body.correo,req.body.sobreNombre,req.body.contrasena1,req.body.contrasena2,req.body.BackEnd,req.body.FrontEnd)){
		const newModeloRegistro = new ModelRegistro(req.body,this.db)
		var datos =  (await newModeloRegistro.consultarCorreo()).datos
		if(datos == null){
			//newModeloRegistro.guardarImgFireStorage()
			newModeloRegistro.registrarEnFirebaseAuth()
			newModeloRegistro.ajustarJquey()
			newModeloRegistro.crearUsuario()
			res.json(true)
		}else{
			res.json(false)
		}
	}else{
		res.json("datos incorrectos")
	}
}


function validarInformacion(nombre, correo, sobreNombre, contrasena1, contrasena2, BackEnd, FrontEnd){
	return (nombre !== "" && validarEmail(correo) && sobreNombre !== "" &&  validarContrasena(contrasena1, contrasena2) && BackEnd !== "Back-end" && FrontEnd !== "Front-End") ? true : false;
	
}

function validarContrasena(pass1, pass2){
	if(pass1 !== "" && pass1 !== "" && (pass1 === pass2)){
		return true;
	}else{
		return false;
	}
}

function validarEmail(email){
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}



module.exports=controllerRegistro