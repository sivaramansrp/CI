<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>
<c:set var="idTramite" value="${actionBean.solicitud.discriminatorValue}" scope="session"/>
<fmt:message key="registro.solicitud.titulo.archivo" var="title" scope="session" />
<s:layout-render name="/WEB-INF/support/gobmx/layout/main.jsp">
	<s:layout-component name="workingArea">
		<s:form action="${actionBean.actionForm}" name="tipoDocumentosForm">
			<script type="text/javascript" language="javascript" src="${contextPath}/js/modulos/aga/common/modales.js"></script>
			<script type="text/javascript" language="javascript" src="${contextPath}/js/modulos/aga/digitalizarDocumentos/registroDigitalizarDocumentos.js"></script>
			<s:hidden name="solicitud.idSolicitud" id="idSol"></s:hidden>
			<s:hidden name="solicitud.esNuevo" id="idEsNuevo"></s:hidden>
			<div id="alertsDocumentos" style="display: none;" class="row; col col-md-12;">
				<div>
					<p id="parrafoError"></p>
				</div>
			</div>
			<jsp:include page="/WEB-INF/jsp/gobmx/common/registroSolicitud/encabezadoWizardCaptura.jsp" />
			<div id="divDoctosEspecificos" class="row">
				<div class="col-md-12">
					<h3><s:label name="Especificos"/></h3>
					<hr class="red">
					<s:label name="Si usted necesita anexar más de un documento del mismo tipo seleccionelo de la lista y presione &quot;Agregar nuevo&quot; "/></br>
					<s:label name="Tipo de Documento:"/> </br>
				</div>
				<div class="col-md-6">
					<s:select name="" class="form-control" id="selectDoctosEspecificos" />
				</div>
				<div class="col-md-2">
					<s:button name="" class="btn btn-primary" onclick="javascript:addDoctoEspecifico();"> Agregar nuevo</s:button>
				</div>
				<div class="innercontainer col-md-12" style="margin-top:5%;">
					<table id="tablaDatosGenerales" width="100%" align="center">			
						<tr> 
							<td>
								<table id="jqgridDoctosEspecificos" align="center" width="100%"></table>
							</td>
						</tr> 		
					</table>
				</div>
				<div class="col-md-2">
					<s:button name="" class="btn btn-danger" id="deleteButton">Eliminar</s:button>
				</div>
				<div class="col-md-12">
					<s:button name="Continuar" class="btn btn-primary pull-right" onclick="javascript:guardarTipoDoctos('${actionBean.actionForm}');">Continuar</s:button>
					<s:submit name="${actionBean.elementoWizard.anteriorTmp}" value="Anterior" class="btn btn-default pull-right" /> 
					<s:hidden name="elementoWizard.anteriorTmp" /> 
						
				</div>
			</div>
		</s:form>

	</s:layout-component>
</s:layout-render>


