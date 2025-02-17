<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>
<s:layout-render name="/WEB-INF/support/gobmx/layout/main.jsp">
	<s:layout-component name="workingArea">
		<jsp:include page="/WEB-INF/support/patterns/registroSolicitud/principal.jsp" />
			<script type="text/javascript" language="javascript" src="${contextPath}/js/modulos/aga/digitalizarDocumentos.js"></script>
		<s:form action="${actionBean.actionForm}" focus="" name="solicitud" id="formId">
			<s:hidden name="solicitud.idSolicitud" id="idSolicitud"/>
			<jsp:include page="/WEB-INF/jsp/gobmx/common/registroSolicitud/encabezadoWizardCaptura.jsp" />
			<div id="tabs">
				<ul>
					<li><a href="#tabs-1"><s:label for="captura.tab.solicitante" /></a></li>					
				</ul>	
				<div id="tabs-1" class="tab-content">
					<jsp:include page="/WEB-INF/jsp/gobmx/common/solicitud/solicitante.jsp"/>
				</div>		
			</div>
			<jsp:include page="/WEB-INF/jsp/gobmx/common/registroSolicitud/pieWizardCaptura.jsp" />
			<jsp:include page="/WEB-INF/jsp/gobmx/common/registroSolicitud/avisoPrivacidad.jsp" />
			<s:field-metadata  var="fieldMetadata">
    			$(function(){$.fn.stripesValidation('${fieldMetadata.formId}', ${fieldMetadata});});
            </s:field-metadata>
        </s:form>

<script type="text/javascript">
	var validator = $("#formSolicitud").validate({
	  invalidHandler: function(form, validator) {
		var errors = validator.numberOfInvalids();

		if (errors) {
		  var invalidPanels = $(validator.invalidElements()).closest(".ui-tabs-panel", form);
		  if (invalidPanels.size() > 0) {
			$.each($.unique(invalidPanels.get()), function(){
			  $(this).siblings(".ui-tabs-nav")
				.find("a[href='#" + this.id + "']").parent().not(".ui-tabs-selected")
				  .addClass("ui-state-error")
				  .show("pulsate",{times: 2});
			});
		  }
		}
	  },
	  unhighlight: function(element, errorClass, validClass) {
		$(element).removeClass(errorClass);
		$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
		var $panel = $(element).closest(".ui-tabs-panel", element.form);
		if ($panel.size() > 0) {
		  if ($panel.find("." + errorClass + ":visible").size() == 0) {
			$panel.siblings(".ui-tabs-nav").find("a[href='#" + $panel[0].id + "']")
			  .parent().removeClass("ui-state-error");
		  }
		}
	  }
					});


        </script>
    </s:layout-component>
</s:layout-render>
