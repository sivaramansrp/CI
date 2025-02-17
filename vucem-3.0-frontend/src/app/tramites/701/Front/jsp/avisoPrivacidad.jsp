<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>

<br>
<div id="avisoDePrivacidad" style="display:block">
	<!--s:hidden name="solicitud.idSolicitud" id="idSolicitud" /-->
	<!--s:hidden name="solicitud.tramite.numFolioTramite" id="estaEnSolicitud" /-->
		<br>
		<div class="col-md-12; alert alert-info">
			<p>
				${actionBean.parametroAvisoPrivacidad}
			</p>
		</div>
</div>

<!--script type="text/javascript">
	$(document).ready(function(){
		if($("#estaEnSolicitud").val() != ''){
			$("#avisoDePrivacidad").css("display", "none");
		}else{
			$("#avisoDePrivacidad").css("display", "block");
		}
	});
</script-->