<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>

<c:catch var="exception">
	<div class="row" style="margin-top: 30px;">
		<div class="form-group">
			<div class="col-md-12">
				<div class="pull-left text-muted text-vertical-align-button" id="lblCamposObligatorios">
					<fmt:message key="nota.camposObligatorios" />
				</div><br><br>
				<div style="margin-top: -50px;">
					<c:if test="${actionBean.requiereGuardadoParcial}">
						<s:submit name="guardarParcial" onclick="tabSeleccionado();" id="guardarSolicitudParcial" value="Guardar" class="btn btn-default pull-right" />
					</c:if>
					<input type="submit" name="guardar" id="guardarSolicitud" value="Continuar" class="btn btn-primary pull-right"/>
					<s:hidden name="solicitud.idSolicitud" id="idSolicitud" />
				</div>
			</div>
		</div>
	</div>
</c:catch>

<script type="text/javascript">

	function tabSeleccionado(){
		localStorage.setItem("currentIdx", $('#tabs').tabs('option', 'active'));
	}

	var validator = $("#formSolicitud").validate({
	  errorPlacement  : function(error, element) {
			var name = $(element).attr('name');
			var type = $(element).prop("type");
			var label = $('label[for="' + name + '"]');
			if(type=="select-multiple"){
				$(element).parents("div.col-md-4").find("span").removeClass("require");
				$(element).parents("div.col-md-4").find("span").first().addClass("redRequire");
			}
			else{
				$(label).parent().find("span").removeClass("require");
				$(label).parent().find("span").first().addClass("redRequire"); 
			}            
			
			if(type=="checkbox" || type=="radio"){
				error.css('display', 'block').insertAfter(element.parent().parent());	
			}else{
				error.css('display', 'block').insertAfter(element);	
			}
			$(element).css("marginBottom","0px");
		},
	  invalidHandler: function(event, validator){
			var errors = validator.numberOfInvalids();
		 if (errors) {
		   var message = errors == 1
			 ? 'Faltan campos por capturar.'
			 : 'Faltan campos por capturar.';
		   $("#errorCampos").html(message);
		   $('.ui-state-error').hide();
		   $("#errorCampos").show();
		 } else {
		   $("#errorCampos").hide();
		 }
	  },
	  unhighlight: function(element, errorClass, validClass) {
			var name = $(element).attr('name');
		var type = $(element).prop("type");
			var label = $('label[for="' + name + '"]');
			if(type=="select-multiple"){
				$(element).parents("div.col-md-4").find("span").removeClass("redRequire");
				$(element).parents("div.col-md-4").find("span").addClass("require");
			}
			else{
				$(label).parent().find("span").removeClass("redRequire");
				$(label).parent().find("span").first().addClass("require");	
			}
			$(element).css("marginBottom","15px");
			
			$(element).removeClass(errorClass);
			$(element.form).find("label[for='" + element.id + "']").removeClass(errorClass);
			var $panel = $(element).closest(".ui-tabs-panel", element.form);
			if ($panel.size() > 0) {
			  if ($panel.find("." + errorClass + ":visible").size() == 0) {
				$panel.siblings(".ui-tabs-nav").find("a[href='#" + $panel[0].id + "']")
				  .parent().removeClass("ui-state-error");
			  }
			}
		},
		highlight: function(element) {
				$(element).addClass("error");
				var name = $(element).attr('name');
				var type = $(element).prop("type");
				var label = $('label[for="' + name + '"]');
				if ($(element).parent().attr('class')=='form-group datepicker-group'){
					$(element).closest('div.row').find("span[class='redRequire']:visible").removeClass('redRequire');
					$(element).closest('div.row').find("span[class='']:visible").addClass('require');
				}            
				if(type=="select-multiple"){
					$(element).parents("div.col-md-4").find("span").removeClass("require");
					$(element).parents("div.col-md-4").find("span").addClass("redRequire");
				}
				else{
					$(label).parent().find("span").removeClass("require");
					$(label).parent().find("span").first().addClass("redRequire"); 
				}            
			}
		});

</script>