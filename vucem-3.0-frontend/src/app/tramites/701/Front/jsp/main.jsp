<?xml version="1.0" encoding="iso-8859-1" ?>
<%@ include file="/WEB-INF/support/common/taglibs.jsp" %>
<c:set var="userProfile" value="${actionBean.context.userProfile}" />
<fmt:message key="app.log_out" var="logOut" />

<s:layout-definition>
    <!DOCTYPE html>
    <%--<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">--%>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <title><c:out value="${title}" default="VUCEM" /></title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta http-equiv="pragma" content="no-cache" />
            <meta http-equiv="cache-control" content="no-cache" />
            <meta http-equiv="expires" content="-1" />
            <script  type="text/javascript">
                <c:catch var ="catchExceptionDiscriminator">
                    <c:if test='${ actionBean.solicitud !=null && not empty actionBean.solicitud.discriminatorValue}'>
                        var discriminatorValueGlobal=${fn:escapeXml(actionBean.solicitud.discriminatorValue)};
                    </c:if>
                </c:catch>
                <c:catch var ="CatchNullPointerException">
                    <c:if test='${ actionBean.tramite.solicitud !=null && not empty actionBean.tramite.solicitud.discriminatorValue}'>
                        var discriminatorValueGlobal=${fn:escapeXml(actionBean.tramite.solicitud.discriminatorValue)};
                    </c:if>
                </c:catch>
                <c:catch var ="CatchNullPointerException">
                    <c:if test='${ actionBean.tramite.solicitud !=null && not empty actionBean.tramite.solicitud.claveModalidad}'>
                        var discriminatorValueGlobal=${fn:escapeXml(actionBean.tramite.solicitud.claveModalidad)};
                    </c:if>
                </c:catch>
            </script>
            <jsp:include page="/WEB-INF/support/gobmx/layout/scripts.jsp" />
        </head>
        <body>
            <!-- Begin Digital Analytix Tag 1.1302.13 -->
            <script type="text/javascript">
                function udm_(e) {
                    var t = "comScore=", n = document, r = n.cookie, i = "", s = "indexOf", o = "substring", u = "length", a = 2048, f, l = "&ns_", c = "&", h, p, d, v, m = window, g = m.encodeURIComponent || escape;
                    if (r[s](t) + 1)
                        for (d = 0, p = r.split(";"), v = p[u]; d < v; d++)
                            h = p[d][s](t), h + 1 && (i = c + unescape(p[d][o](h + t[u])));
                    e += l + "_t=" + +(new Date) + l + "c=" + (n.characterSet || n.defaultCharset || "") + "&c8=" + g(n.title) + i + "&c7=" + g(n.URL) + "&c9=" + g(n.referrer), e[u] > a && e[s](c) > 0 && (f = e[o](0, a - 8).lastIndexOf(c), e = (e[o](0, f) + l + "cut=" + g(e[o](f + 1)))[o](0, a)), n.images ? (h = new Image, m.ns_p || (ns_p = h), h.src = e) : n.write("<", "p", "><", 'img src="', e, '" height="1" width="1" alt="*"', "><", "/p", ">")
                }
                ;
                function uid_call(a, b) {
                    ui_c2 = 17183199; // your corporate c2 client value
                    ui_ns_site = 'gobmx'; // your sites identifier
                    window.b_ui_event = window.c_ui_event != null ? window.c_ui_event : "", window.c_ui_event = a;
                    var ui_pixel_url = 'https://b.scorecardresearch.com/p?c1=2&c2=' + ui_c2 + '&ns_site=' + ui_ns_site + '&name=' + a + '&ns_type=hidden&type=hidden&ns_ui_type=' + b;
                    var b = "comScore=", c = document, d = c.cookie, e = "", f = "indexOf", g = "substring", h = "length", i = 2048, j, k = "&ns_", l = "&", m, n, o, p, q = window, r = q.encodeURIComponent || escape;
                    if (d[f](b) + 1)
                        for (o = 0, n = d.split(";"), p = n[h]; o < p; o++)
                            m = n[o][f](b), m + 1 && (e = l + unescape(n[o][g](m + b[h])));
                    ui_pixel_url += k + "_t=" + +(new Date) + k + "c=" + (c.characterSet || c.defaultCharset || "") + "&c8=" + r(c.title) + e + "&c7=" + r(c.URL) + "&c9=" + r(c.referrer) + "&b_ui_event=" + b_ui_event + "&c_ui_event=" + c_ui_event, ui_pixel_url[h] > i && ui_pixel_url[f](l) > 0 && (j = ui_pixel_url[g](0, i - 8).lastIndexOf(l), ui_pixel_url = (ui_pixel_url[g](0, j) + k + "cut=" + r(ui_pixel_url[g](j + 1)))[g](0, i)), c.images ? (m = new Image, q.ns_p || (ns_p = m), m.src = ui_pixel_url) : c.write("<p><img src='", ui_pixel_url, "' height='1' width='1' alt='*'></p>");
                }
                udm_('https://b.scorecardresearch.com/b?c1=2&c2=17183199&ns_site=gobmx&name=VUCEM');
            </script>
            <noscript>
                <p>
                    <img
                        src="https://b.scorecardresearch.com/p?c1=2&amp;c2=17183199&amp;ns_site=gobmx&amp;name=VUCEM"
                        height="1" width="1" alt="*">
                </p>
            </noscript>
            <noscript>
                <div id="main">
                    <br />
                    <div id="noscript">
                        <div style="margin-left:9em; height:35px;"><h2>Atenci&oacute;n</h2></div>
                        <p>Para utilizar la Ventana &Uacute;nica de Comercio Exterior, la configuraci&oacute;n del explorador debe permitir la ejecuci&oacute;n de scripts. Para obtener informaci&oacute;n sobre c&oacute;mo permitir scripts, consulte el enlace siguiente. <br /><br />
                            <a href="http://www.google.com/support/bin/answer.py?answer=23852" target="_blank">http://www.google.com/support/bin/answer.py?answer=23852</a><br /><br />
                            Si el navegador no admite scripts, puede descargar una versi&oacute;n mas reciente del navegador de su elecci&oacute;n.</p>
                    </div>
                    <br/>
                </div>
            </noscript>

            <main class="page">
                <div class="container">
                    <%-- <c:if test="${not empty actionBean.context.messages || not empty actionBean.context.validationErrors}"> --%>
                    <jsp:include page="/WEB-INF/jsp/gobmx/common/breadcrumb/breadcrumbSolicitudes.jsp" />
                    <%-- 	       </c:if> --%>
                    
                    <%@ include file="/WEB-INF/support/gobmx/layout/header.jsp" %>
                    <%--s:layout-component name="menu">
                    <%@ include file="/WEB-INF/support/gobmx/layout/menu.jsp" %>
                    </s:layout-component--%>
                    <div id="content_tramite">
                        <div id="workingArea">
                            <c:if test="${not empty title}">
                                <div class="row" id="tituloTramite">
                                    <div class="col-md-8">
                                        <c:if  test="${fn:length(title) < 50}">
                                            <h1 id="h1_title" style="margin-bottom:0px">${title}</h1>
                                        </c:if>
                                        <c:if  test="${fn:length(title) >= 50 && fn:length(title) < 150}">
                                            <h2 id="h1_title" style="margin-bottom:0px">${title}</h2>
                                        </c:if>
                                        <c:if  test="${fn:length(title) >= 150}">
                                            <h3 id="h1_title" 0="margin-bottom:0px">${title}</h3>
                                        </c:if>
                                    </div>
                                </div>
                                <br />		                        
                            </c:if>

			    <div class="alert alert-warning" id="businessWarnings" style="display:none; margin-bottom:15px; margin-top:64px;"></div>
                            <div class="alert alert-danger" id="errorCampos" style="display:none; margin-bottom:15px; margin-top:64px;"></div>

                            <c:if test="${not empty actionBean.context.messages || not empty actionBean.context.validationErrors}">
                                <div class="row" style="margin-top:64px;">
                                    <div class="col-md-12 text-center" id="notification" style="margin-bottom:26px"><%@ include file="/WEB-INF/support/gobmx/layout/notification.jsp" %></div>
                                </div>
                            </c:if>
                            <s:layout-component name="workingArea" />
                        </div>
                    </div>
                    <div id="footer"><%@ include file="/WEB-INF/support/gobmx/layout/footer.jsp" %></div>
                </div>
            </main>
            <script type="text/javascript">
                $(document).ready(function () {
                    if ($('#breadcrumbTramiteSteps').is(":visible") || $('#breadcrumbTramite').is(":visible")) {
                        $('#breadcrumbTramite').hide();
                        $('#boxSolicitanteLargo').show()
                    } else {
                        $('#boxSolicitante').css('margin-top', '-116px');
                    }
                });
                reset('${language}');
            </script>
        </body>
    </html>
</s:layout-definition>