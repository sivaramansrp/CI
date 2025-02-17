<%-- JSTL --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%-- Stripes --%>
<%@ taglib prefix="s" uri="http://stripes.sourceforge.net/stripes.tld" %>

<%-- Stripes Encrypted --%>
<%@ taglib prefix="se" uri="/stripes-encrypted"%>

<%-- OSCache --%>
<%@ taglib prefix="cache" uri="http://www.opensymphony.com/oscache" %>

<%-- Softtek Catalog --%>
<%@ taglib prefix="stk-web" uri="/stk-web" %>

<%-- Menu --%>
<%@ taglib prefix="menu-vu" uri="/WEB-INF/tld/menu-vu.tld" %>

<%-- Menu GobMx --%>
<%@ taglib prefix="menugobmx-vu" uri="/WEB-INF/tld/menuGobMx-vu.tld" %>

<%-- Security --%>
<%@ taglib prefix="authorization" uri="/WEB-INF/tld/authorization.tld" %>

<%-- Consultas --%>
<%@ taglib prefix="consulta" uri="/consulta"%>

<%-- Permisos Perfilador --%>
<%@ taglib prefix="permisoPerfilador" uri="/permisoPerfilador"%>

<%-- AuthenticationSSO --%>
<%@ taglib prefix="authenticationSSO" uri="/authenticationSSO"%>

<%-- Gubernamentales 2 --%>

<%-- CrossList --%>
<%--@ taglib prefix="crossList" uri="/crossList" --%>

<%-- Grid Mercancias --%>
<%--@ taglib prefix="mercancia" uri="/mercanciaGubernamental" --%>

<%-- Fin de Gubernamentales 2 --%>


<%-- Global variables --%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<c:set var="language" value="${pageContext.request.locale.language}" />

