<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>
<%@ taglib uri="/stk-web" prefix="stk-web"%>
 <s:hidden name="solicitud.solicitante.domicilio.pais.clave" />
 <s:hidden name="solicitud.solicitante.domicilio.entidadFederativa.clave" />
 <s:hidden name="solicitud.solicitante.domicilio.delegacionMunicipio.clave" />
 <s:hidden name="solicitud.solicitante.domicilio.colonia.clave" />
 <s:hidden name="solicitud.solicitante.domicilio.localidad.clave" />
 <s:hidden name="solicitud.cveRolCapturista" id="rolCapturista"/>
 <s:hidden name="solicitud.cveUsuarioCapturista" />
 <s:hidden name="solicitud.solicitante.cveUsuario" />
 <s:hidden name="puedeCapturarRepresentanteLegalCG" id="puedeCapturarRepresentanteCG" />
   
<div class="row">
	<div class="col col-md-12">
	 	<h3>
	 	<fmt:message key="solicitud.titulo.datosSolicitante" />
	 	</h3>
	 	<hr class="red"/>
	</div>
</div>    

        
   
<c:choose>
	<c:when test="${actionBean.solicitud.solicitante.razonSocial != null}">
		<div class="row">
			<c:if test="${actionBean.solicitud.solicitante.rfc != null}">    						
			  <div class="col-md-4">
				  	<div class="form-group">
						<label for="solicitud.persona.rfc">
							<fmt:message key="solicitud.persona.rfc" />
							<fmt:message key="puntos" />
							<span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Registro Federal de Contribuyente"></span>
						</label>	
						<s:text class="form-control" name="solicitud.solicitante.rfc" size="30" readonly="true" id='rfcSolicitante' />	  
					</div>
			</div>
			</c:if>
	
			<div class="col-md-8">
				<div class="form-group">
					<s:label for="solicitud.persona.razonSocial" />
					<s:label for="puntos" />
					<s:text class="form-control"  style="cursor:not-allowed" name="solicitud.solicitante.razonSocial" readonly="true" id="razonSocialSolicitante"/>
				
				 </div>
			</div>  
		</div>          
	         
	 	<c:choose>
	        <c:when test="${actionBean.solicitud.solicitante.rfc != null}">
	       		<div class="row">
	            	<div class="col-md-12">
	                   <div class="form-group">
	                       <s:label for="solicitud.actividadEconomicaPreponderante" />
	                       <s:label for="puntos" />
	                       <s:text class="form-control"   style="cursor:not-allowed" name="solicitud.solicitante.descripcionGiro" size="120" readonly="true" />
	                   </div>
	                </div>
				</div>
				<div class="row">
					<div class="col-md-4">
					  	<div class="form-group">
							<s:label for="solicitud.persona.correoElectronico"/>
							<s:label for="puntos" />
							<s:text class="form-control"  style="cursor:not-allowed" name="solicitud.solicitante.correoElectronico" size="30" readonly="true" />
						</div>
					</div>
				</div>				
			</c:when>
	        <c:otherwise>
	        	<div class="row">
			  		<div class="col-md-8">
					  	<div class="form-group">
					  		<s:label for="solicitud.actividadEconomicaPreponderante" />
					  		<s:label for="puntos" />
							<s:text name="solicitud.solicitante.descripcionGiro" size="120" readonly="true" />
						</div>			  
			  		</div>
			  		<div class="col-md-4">
						<s:label for="solicitud.solicitante.codigoPostal" />
						<s:label for="puntos" />
						<s:text name="solicitante.domicilio.codigoPostal" size="30" readonly="true"  />
					</div>
			 	</div>
			 
				<div class="row">
				 	<div class="col-md-4">
					  	<div class="form-group">
							<s:label for="solicitud.solicitante.pais" />
							<s:label for="puntos" />
							<s:text class="form-control" name="solicitante.domicilio.pais.nombre" size="30" readonly="true" />	
						</div>		  
				  	</div>
				  	<div class="col-md-4">
						<div class="form-group">	 				
							<s:label for="solicitud.solicitante.calle" />
							<s:label for="puntos" />
							<s:text class="form-control" name="solicitante.domicilio.calle" readonly="true" />
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<s:label for="solicitud.solicitante.numExterior" />
							<s:label for="puntos" />						
							<s:text class="form-control" name="solicitante.domicilio.numeroExterior" size="30" readonly="true" />
						</div>
					</div>		
				 </div>
				
				 <div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<s:label for="solicitud.solicitante.numInterior" />
							<s:label for="puntos" />
							<s:text class="form-control" name="solicitante.domicilio.numeroInterior" size="30" readonly="true" />
						</div>
					</div>
					<div class="col-md-4">
					 	<div class="form-group">
							<s:label for="persona.domicilio.informacionExtra" />
							<s:label for="puntos" />
							<s:text class="form-control" name="solicitante.domicilio.informacionExtra" size="30" readonly="true"  />
						</div>
					</div>
				</div>
	        </c:otherwise>
	     </c:choose>
	</c:when>
    <c:otherwise>
		<!---PERSONA FISICA-->
		<!--INICIO DE CURPS-->
		<c:choose>
	        <c:when test="${actionBean.solicitud.solicitante.rfc != null}">
	        	<div class="row">
					<div class="col-md-4">
				  	<div class="form-group">
						<label for="gobmx.solicitud.persona.curp">
							<fmt:message key="gobmx.solicitud.persona.curp" />
							<fmt:message key="puntos" />
							<span class="glyphicon glyphicon-question-sign" title="Clave &Uacute;nica de Registro de Poblaci&oacute;n" data-toggle="tooltip" data-placement="top" />
						</label>
						<s:text class="form-control" name="solicitud.solicitante.curp" size="30" readonly="true" id='curpolicitante' />
					</div>
				  </div>
				  <div class="col-md-4">
				  	<div class="form-group">
						<label for="solicitud.persona.rfc">
							<fmt:message key="solicitud.persona.rfc" />
							<fmt:message key="puntos" />
							<span class="glyphicon glyphicon-question-sign" data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Registro Federal de Contribuyente"></span>
						</label>	
						<s:text class="form-control" name="solicitud.solicitante.rfc" size="30" readonly="true" id='rfcSolicitante' />	  
					</div>
				  </div>
			</div>
			<div class="row">
				  <div class="col-md-4">
						<div class="form-group">
							<label for="solicitud.persona.nombre">
								<fmt:message key="solicitud.persona.nombre" />
								<fmt:message key="puntos" />
							</label>	  
							<s:text class="form-control" name="solicitud.solicitante.nombre" size="40" readonly="true" />
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="solicitud.persona.apellidoPaterno">
								<fmt:message key="solicitud.persona.apellidoPaterno" />
								<fmt:message key="puntos" />
							</label>						
							<s:text class="form-control" name="solicitud.solicitante.apellidoPaterno" size="30" readonly="true" />
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="solicitud.persona.apellidoMaterno">
								<fmt:message key="solicitud.persona.apellidoMaterno" />
								<fmt:message key="puntos" />
							</label>
							<s:text class="form-control" name="solicitud.solicitante.apellidoMaterno" size="30" readonly="true" />
						</div>
					</div>
					<div class="col-md-8">
						<div class="form-group">
							<label for="solicitud.actividadEconomicaPreponderante">
								<fmt:message key="solicitud.actividadEconomicaPreponderante" />
								<fmt:message key="puntos" />
							</label>
							<s:text class="form-control" name="solicitud.solicitante.descripcionGiro" size="120" readonly="true" />
		               </div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="solicitud.persona.correoElectronico">
								<fmt:message key="solicitud.persona.correoElectronico" />
								<fmt:message key="puntos" />
							</label>
							<s:text class="form-control" name="solicitud.solicitante.correoElectronico" size="30" readonly="true" />
						</div>
					</div>
				</div>
            </c:when>
			<c:otherwise>
        	<c:choose>
            	<c:when test="${actionBean.solicitud.solicitante.curp != null}">
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label for="gobmx.solicitud.persona.curp">
									<fmt:message key="gobmx.solicitud.persona.curp" />
									<fmt:message key="puntos" />
									<span class="glyphicon glyphicon-question-sign" title="Clave &Uacute;nica de Registro de Poblaci&oacute;n" data-toggle="tooltip" data-placement="top" />
								</label>
								<s:text class="form-control" name="solicitud.solicitante.curp" size="30" readonly="true" id='curpolicitante' />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.persona.correoElectronico" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitud.solicitante.correoElectronico" size="30" readonly="true" />
							</div>
						</div>
					</div>
				</c:when>
                <c:otherwise>
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<label for="solicitud.solicitante.numeroIdentificacionFiscal">
									N&uacute;mero de identificaci&oacute;n fiscal en el pa&iacute;s de residencia:
								</label>
								<s:text class="form-control" name="solicitud.solicitante.numeroIdentificacionFiscal" size="30" readonly="true"/>			  
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<label for="solicitud.solicitante.nss">
									N&uacute;mero de seguro social:
								</label>
								<s:text class="form-control" name="solicitud.solicitante.nss" size="30" readonly="true" />
							</div>							  	
						</div>
					</div>
					<div class="row">
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.solicitante.pais" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.pais.nombre" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.solicitante.codigoPostal" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.codigoPostal" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="persona.domicilio.informacionExtra" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.informacionExtra" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-8">
							<div class="form-group">
								<s:label for="solicitud.solicitante.calle" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.calle" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.solicitante.numExterior" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.numeroExterior" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.solicitante.numInterior" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitante.domicilio.numeroInterior" size="30" readonly="true" />
							</div>
						</div>
						<div class="col-md-4">
							<div class="form-group">
								<s:label for="solicitud.persona.correoElectronico" />
								<s:label for="puntos" />
								<s:text class="form-control" name="solicitud.solicitante.correoElectronico" size="30" readonly="true" />
							</div>
						</div>
					</div>
				</c:otherwise>
			</c:choose>
				<div class="row">
				<div class="col-md-4">
						<div class="form-group">
							<label for="solicitud.persona.nombre">
								<fmt:message key="solicitud.persona.nombre" />
								<fmt:message key="puntos" />
							</label>	  
							<s:text class="form-control" name="solicitud.solicitante.nombre" size="40" readonly="true" />
						</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="solicitud.persona.apellidoPaterno">
							<fmt:message key="solicitud.persona.apellidoPaterno" />
							<fmt:message key="puntos" />
						</label>						
						<s:text class="form-control" name="solicitud.solicitante.apellidoPaterno" size="30" readonly="true" />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="solicitud.persona.apellidoMaterno">
							<fmt:message key="solicitud.persona.apellidoMaterno" />
							<fmt:message key="puntos" />
						</label>
						<s:text class="form-control" name="solicitud.solicitante.apellidoMaterno" size="30" readonly="true" />
					</div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="solicitud.actividadEconomicaPreponderante">
							<fmt:message key="solicitud.actividadEconomicaPreponderante" />
							<fmt:message key="puntos" />
						</label>
						<s:text class="form-control" name="solicitud.solicitante.descripcionGiro" size="120" readonly="true" />
				   </div>
				</div>
				<div class="col-md-4">
					<div class="form-group">
						<label for="solicitud.persona.correoElectronico">
							<fmt:message key="solicitud.persona.correoElectronico" />
							<fmt:message key="puntos" />
						</label>
						<s:text class="form-control" name="solicitud.solicitante.correoElectronico" size="30" readonly="true" />
					</div>
				</div>
			</div>
         </c:otherwise>
        </c:choose>
		<!--FIN DE CURPS -->
    </c:otherwise>
</c:choose>
<br/>
<c:choose>
	<c:when test="${actionBean.solicitud.solicitante.razonSocial != null}">
		<c:choose>
			<c:when test="${actionBean.solicitud.solicitante.rfc != null}">
			    <div class="row">
					<div class="col-md-12">
							<h3><fmt:message key="solicitud.titulo.domicilioFiscalSolicitante" /></h3>
							<hr class="red"/>
					</div>
			    </div> 
			</c:when>
			<c:otherwise>
			    <div class="row">
				<div class="col-md-12">
			        	<h3><s:label for="registro.solicitud.oirRecNot.domicilio" /></h3>
			        	<hr class="red"/>
				</div>
			    </div>
			</c:otherwise>
		</c:choose>
	</c:when>
	<c:otherwise>
		<c:choose>
		    <c:when test="${actionBean.solicitud.solicitante.rfc != null}">
		        <div class="row">
					<div class="col-md-12">
		            <h3><fmt:message key="solicitud.titulo.domicilioFiscalSolicitante" /></h3>
		            <hr class="red" />
					</div>
		        </div>
		    </c:when>
		    <c:otherwise>
		        <c:choose>
		            <c:when test="${actionBean.solicitud.solicitante.curp != null}">
		                <div class="row">
					<div class="col-md-12">
		              		<h3><s:label for="registro.solicitud.oirRecNot.domicilio" /></h3>
		              		<hr class="red"/>
		          		</div>	
					</div>	
		            </c:when>
		            <c:otherwise>
		                <div class="row">
							<div class="col-md-12">
								<h3><s:label for="registro.solicitud.oirRecNot.domicilio" /></h3>
								<hr class="red"/>
							</div>
		                </div>
		            </c:otherwise>
		        </c:choose>
		    </c:otherwise>
		</c:choose>
	</c:otherwise>
</c:choose>    
<div class="row">
   	<div class="col-md-4">
		<div class="form-group">
			<s:label for="solicitud.domicilio.pais" />
			<s:label for="puntos" />
			<s:text class="form-control" style="cursor:not-allowed" name="solicitud.solicitante.domicilio.pais.nombre" readonly="true" />
		</div>
	</div>
	<div class="col-md-4">
		<div class="form-group">		
			<s:label for="solicitud.solicitante.domicilio.codigoPostal" />
			<s:label for="puntos" />
			<s:text class="form-control" style="cursor:not-allowed" name="solicitud.solicitante.domicilio.codigoPostal" size="10" readonly="true" />
		</div>
	</div> 
	<div class="col-md-4">
		<div class="form-group">
		 	<s:label for="solictud.solicitante.estado" />
		 	<s:label for="puntos" />
			<s:text class="form-control" name="solicitud.solicitante.domicilio.entidadFederativa.nombre" readonly="true"/>
		 </div>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
		<div class="form-group">
		 	<s:label for="solicitud.domicilio.delegacionMunicipio.clave1" />
		 	<s:label for="puntos" />
			<s:text class="form-control" name="solicitud.solicitante.domicilio.delegacionMunicipio.nombre" readonly="true" />
	 	</div>
	</div>
	<div class="col-md-4">
		<div class="form-group">
			<s:label for="solicitud.domicilio.localidad" />
			<s:label for="puntos" />
			<s:text class="form-control" name="solicitud.solicitante.domicilio.localidad.nombre" size="68" readonly="true"/>
		</div>
	</div>
	<div class="col-md-4">
		<div class="form-group">
		 	<s:label for="solicitud.domicilio.coloniaLocalidad" />
		 	<s:label for="puntos" />
			<s:text class="form-control" style="cursor:not-allowed" name="solicitud.solicitante.domicilio.colonia.nombre" size="68" readonly="true" />
		</div>
	</div>
</div>
<div class="row">
	<div class="col-md-8">
		<div class="form-group">
		 	<s:label for="solicitud.solicitante.domicilio.calle" />
		 	<s:label for="puntos" />
			<s:text class="form-control" name="solicitud.solicitante.domicilio.calle" size="68" readonly="true" />
	 	</div>
	</div>
	<div class="col-md-4">
		<div class="form-group">
			<s:label for="solicitud.solicitante.domicilio.numeroExterior" />
			<s:label for="puntos" />
			<s:text class="form-control"  style="cursor:not-allowed" name="solicitud.solicitante.domicilio.numeroExterior" size="10" readonly="true" />
		</div>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
		<div class="form-group">
			<s:label for="solicitud.domicilio.numeroInterior" />
			<s:label for="puntos" />
			<s:text name="solicitud.solicitante.domicilio.numeroInterior" size="15" readonly="true" />
		</div>
	</div>
	<div class="col-md-1">
		<div class="form-group">
			<label>Lada:</label>
			<input type="text" readonly="true" style="cursor:not-allowed" class="form-control"  id="solicitud.solicitante.lada"/>
		</div>
	</div>
	<div class="col-md-3">
		<div class="form-group">
			<s:label for="solicitud.telefono" />
			<s:label for="puntos" />
			<s:text class="form-control"  style="cursor:not-allowed" name="solicitud.solicitante.telefono" size="15" readonly="true" id="solicitud.solicitante.telefono"/>
		</div>
	</div>
</div>
<c:if test="${actionBean.solicitud.numeroFolioTramiteOriginal != null}">

	<br/> 
   	<div>
         <h3><fmt:message key="solicitud.folio.original" /></h3>
         <hr class="red"/>
    </div>
    <div class="row">
    	<div class="col-md-8">
    		<div class="form-group">
    			<s:label for="solicitud.folio" />
        		<s:label for="puntos" />
          	  <s:text name="solicitud.numeroFolioTramiteOriginal" id="folioOriginalProrrogas" readonly="true" />
 			</div>
 		</div>
 	</div>
</c:if>
<jsp:include page="${actionBean.jspRepresentanteLegal}" />
<script type="text/javascript">
	$(document).ready(function() {
  		$('[data-toggle="tooltip"]').tooltip();
        var tempLada =$("#solicitud\\.solicitante\\.telefono").val();
        var num = tempLada.search("-");
        if(num != -1){
            $("#solicitud\\.solicitante\\.telefono").val(tempLada.slice(num+1));
            $("#solicitud\\.solicitante\\.lada").val(tempLada.slice(0,num));
        }
	});
</script>
    
    
    
    
    
    
   
