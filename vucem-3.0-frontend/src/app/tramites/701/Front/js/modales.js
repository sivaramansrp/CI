/**
 * Este script permite crear una ventana modal.
 */

var modal = null;

/**
 * Crea un elemento div con el id="divMsgModal" y lo agrega al elemento body del documento.
 * Este div es necesario para contruir una ventana modal.
 */
function crearDivMsgModal() {
	var divModal = document.createElement("div");
	divModal.setAttribute("id", "divMsgModal");
	var bodyDocument = document.getElementsByTagName('body')[0];
	if(bodyDocument != null && bodyDocument != undefined
			&& divModal != null && divModal != undefined){
		
		bodyDocument.appendChild(divModal);
	}
}

function eliminarDivMsgModal() {
	var divModal = document.getElementById("divMsgModal");
	var bodyDocument = document.getElementsByTagName('body')[0];
	bodyDocument.removeChild(divModal);
}

/**
 * Permite crear una ventana modal para indicarle al usuario que alguna tarea se encuentra procesandose.
 * La tarea en ejecucion puede ser alguna llamada asincrona hacia un servicio.  
 * 
 * @param modalProperties son las propiedades de configuracion para la ventana modal. 
 * @param mensaje es el mensaje que sera mostrado en la centana modal.
 * @param divContainer la ventana modal se genera apartir de este div.
 */
function crearModalProcesando(modalProperties, mensaje, divContainerModal) {		
	var msgDialogProperties = null;
	if(modalProperties instanceof Array){
		msgDialogProperties = modalProperties;
	} else {
		msgDialogProperties = {
			closeOnEscape : false,
			title : "",
			modal : true,
			height : 150,
			width : 300,
			resizable : false,
			show: "fold", //blind
			hide: "scale", //explode
			autoOpen : false
		};
	}
	
	if(divContainerModal != null && divContainerModal != undefined){
		modal = $("#" + divContainerModal).html("<p class='titulo' align='center'>" + mensaje + "</p>");
	} else {
		crearDivMsgModal();
		modal = $("#divMsgModal").html("<p class='titulo' align='center'>" + mensaje + "</p>");
	}	
	
	modal.dialog(msgDialogProperties);
	$('a.ui-dialog-titlebar-close').remove();
	modal.dialog("open");
}

/**
 * Cierra la ventana modal.
 */
function cerrarModal(){
	if(modal != null){
		modal.dialog("close");
		modal = null;
	}
}