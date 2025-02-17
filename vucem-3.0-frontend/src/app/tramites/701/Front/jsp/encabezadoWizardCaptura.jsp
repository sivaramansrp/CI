<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>
	<div class="row">
		<div class="col-sm-12 col-md-12">
			<ul class="wizard-steps">
			
				<c:forEach items="${actionBean.elementosWizard}" var="elem" varStatus="loop">
					<c:set var="classCompleted" scope="page" value=""/>			
					<c:if test="${elem.estado == 'active_'}">
						<c:set var="classCompleted" scope="page" value="class=\"completed\""/>
					</c:if>
					<li ${classCompleted}>
						<h5>
							<fmt:message key="pasos.descripcion.paso" />&nbsp;${elem.posicionTmp}
						</h5>
						<span>
							<fmt:message key="${elem.text}" />
						</span>
					</li>
				 </c:forEach>
				 <c:set var="total" scope="session" value="${fn:length(actionBean.elementosWizard)}"/>
				 <c:if test="${total == 5}">
					<li style="width:208px;">
				 </c:if>
				 <c:if test="${total == 4}">
					<li style="width:208px;"> 
				 </c:if>
				 <c:if test="${total == 2}">
						<li style="width:648px;">
				 </c:if> 
            		<i class="glyphicon glyphicon-ok-circle"></i>
        		</li>
				
			</ul>
		</div>
	</div>

<%--table border="0" width="100%" align="center">
    <tr>
        <td align="right">
        	<c:if test="${actionBean.requiereGuardadoParcial}">
        		<s:submit name="guardarParcial"  id="guardarSolicitudParcial" value="Guardar" class="mid, btn btn-primary"/>
        	</c:if>
		    <s:submit name="guardar"  id="guardarSolicitud" value="Siguiente" class="mid, btn btn-primary"/>
    		<s:hidden name="solicitud.idSolicitud" id="idSolicitud" />
		</td>
	</tr>
</table>
<br/--%>
