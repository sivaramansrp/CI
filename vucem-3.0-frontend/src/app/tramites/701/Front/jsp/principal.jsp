<%@ include file="/WEB-INF/support/common/taglibs.jsp"%>

<style>
            .invisible{ visibility: hidden; display: none;}
        </style>
<div id="atender_req_div" style="display: none">
<h1 > Atender requerimiento </h1>
</div>
<script type="text/javascript">
	
	$(document).ready(function(){

		var isVisible = $("#tituloTramite").is(":visible");

		if(!isVisible){
			$("#atender_req_div").css("display", "");
		}
    });
</script>