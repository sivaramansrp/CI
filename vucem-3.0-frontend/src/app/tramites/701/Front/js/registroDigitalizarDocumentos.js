var controller = "/aga/registroDigitalizarDocumentosController.action";

$(function() {
		var lastSelection;
		$('#jqgridDoctosEspecificos').jqGrid(
				{
					datatype : 'local',
					xmlReader : {
						root : 'rows',
						row : 'row',
						page : 'reader>page',
						total : 'reader>total',
						records : 'reader>records',
						repeatitems : false
					},
					height : 'auto',
					colNames : [ 'idDocumentoSolicitud', 'Id Documento',
							'Tipo de Documento', 'RFC Para Consulta',
							'Nombre o Raz\u00F3n social', 'Id Persona' ],
					colModel : [ {
						name : 'idDocumentoSolicitud',
						index : 'idDocumentoSolicitud',
						xmlmap : 'idDocumentoSolicitud',
						hidden : true
					}, {
						name : 'idTipoDocumento',
						index : 'idTipoDocumento',
						key : false,
						hidden : true
					}, {
						name : 'nombre',
						xmlmap : 'nombre',
						sorttype : 'string',
						sortable : false
					}, {
						name : 'seleccionar',
						align : 'left',
						formatter : textFormatter,
						unformatter : textUnformatter
					}, {
						name : 'nombreCompleto',
						xmlmap : 'nombreCompleto',
						sorttype : 'string',
						sortable : false
					}, {
						name : 'cvePersona',
						xmlmap : 'cvePersona',
						sorttype : 'string',
						hidden : true
					} ],

					loadError : function(xhr, st, err) {
						alert("ERROR: " + xhr.responseText);
					},
					rownumbers : true,
					rowNum : 2000,
					viewrecords : true,
					multiselect : true,
					autowidth : false,
					width : 1150,
					ajaxGridOptions : {
						cache : false
					},
					loadonce : false
				});

	});
	/**
	 * END
	 */
	function textFormatter(cellValue, options, rowObject, index) {
		return ('<input type="text" name="seleccionar" id="idRFC'
				+ options.rowId + '" onblur="javascript:asignarRFC('
				+ options.rowId + ')"/>');
	}

	function textUnformatter(cellValue, options, cellObject) {
		return cellValue;
	}

	function asignarRFC(idrow) {
		var rfc = $('#idRFC' + idrow).val().toUpperCase();
		$('#idRFC' + idrow).val(rfc);
		if (rfc != '') {
			//Generamos una ventana modal antes de que se invoque la llamada ajax
			var configModal = {
				closeOnEscape : false,
				title : "",
				modal : true,
				height : 150,
				width : 200,
				resizable : false,
				autoOpen : false
			};

			crearModalProcesando(configModal, "Procesando...", null);

			var action = contextPath
					+ '/aga/registroDigitalizarDocumentosController.action?buscarUsuarioIDCVU=';
			var params = {
				'solicitud.rfc' : escape(rfc)
			};
			var xhr = $.post(action, params, function(data) {
				var error = xhr.getResponseHeader('msgError');
				if (error != '' && error != null) {
					//$('#errorAjax').html(error);
					//Cerramos la ventana modal
					cerrarModal();
					jqAlert("<p class='titulo' align='center'>" + error
							+ "</p>");
					$('#idRFC' + idrow).val('');
				} else {
					if (data) {
						data = eval(data);
						if(data instanceof Array){
							var row;
							$.each(data, function(index, item) {
								if (item != null) {
									row = {
										'nombreCompleto' : item.nombreCompleto,
										'cvePersona' : item.cvePersona
									};
								}
							});
						} else {
							cerrarModal();
							row = {
								'nombreCompleto' : '',
								'cvePersona' : ''
							};
							jqAlert("<p class='titulo' align='center'>" + data
									+ "</p>");
							
							$('#idRFC' + idrow).val('');
						}
						
						//Cerramos la ventana modal
						cerrarModal();
						$('#jqgridDoctosEspecificos').jqGrid('setRowData',
								idrow, row);
					}
				}
			});

		} else {

			row = {
				'nombreCompleto' : '',
				'cvePersona' : ''
			};

			$('#jqgridDoctosEspecificos').jqGrid('setRowData', idrow, row);
		}
	}

	function cargarDoctosEspecificos(urlParcial) {
		$.ajax({
			url : contextPath + urlParcial + '?filtrarArchivosEspecificos=',
			data : {
				'solicitud.idSolicitud' : $('#idSol').val(),
				'solicitud.esNuevo' : $('#idEsNuevo').val()

			},

			async : false,
			cache : false,
			success : function(data) {

				if (data) {
					data = eval(data);
					$('#jqgridDoctosEspecificos').jqGrid('clearGridData');
					var row;
					$.each(data, function(index, item) {
						index++;
						console.log(item);
						row = {

							'nombre' : item.nombre,
							'idTipoDocumento' : item.idTipoDocumento,
							'idDocumentoSolicitud' : item.idDocumentoSolicitud,
							'seleccionar' : item.cvePersonaStr,
							'nombreCompleto' : item.nombreCompleto,
							'cvePersona' : item.cvePersona
						};
						$('#jqgridDoctosEspecificos').jqGrid('addRowData', index, row);
					});

					$.each(data, function(index, item) {
						index++;
						//$("#jqgridDoctosEspecificos").jqGrid('setCell', index, 'idRFC', item.cvePersonaStr);
						console.log(item.cvePersonaStr);
						$('#idRFC' + index).val(item.cvePersonaStr);
					});
				}
			},
			error : function(error) {

			}
		});

	}

	function cargarComboDoctosEspecificos(urlParcial) {
		$
				.ajax({
					url : contextPath + urlParcial
							+ '?comboArchivosEspecificos=',
					data : {
						'solicitud.idSolicitud' : $('#idSol').val(),
						'solicitud.esNuevo' : $('#idEsNuevo').val()
					},
					async : false,
					cache : false,
					success : function(data) {
						if (data) {
							data = eval(data);
							$("#selectDoctosEspecificos").addClass('form-control');
							var options = '<option value="-1">Seleccione un tipo de documento</option>';
							var opcionesIniciales = false;
							$.each(data, function (i, item) {
								if (opcionesIniciales == false) {
									$("#selectDoctosEspecificos").append(
										'<option value="-1">Seleccione un tipo de documento</option>'
											+ '<option value=' + item.idTipoDocumento + '>' + item.nombre + '</option>');
									opcionesIniciales = true;
								} else {
									$('#selectDoctosEspecificos').append($('<option>', {value: item.idTipoDocumento, text : item.nombre}));
								}
							});
							
						}
					},
					error : function(error) {
						alert("Error: " + error.responseText);

					}
				});

	}

	function addDoctoEspecifico() {
		console.log($('#selectDoctosEspecificos').val());
		if($('#selectDoctosEspecificos').val() != '-1'){
			$("#alertsDocumentos").css("display", "none");
			$("#alertsDocumentos").removeClass("alert alert-danger");
			var row = {
				'nombre' : $('#selectDoctosEspecificos option:selected').text(),
				'idTipoDocumento' : $('#selectDoctosEspecificos option:selected')
						.val()
			};
			var ids = jQuery('#jqgridDoctosEspecificos').getDataIDs();
			var idMax = 0;
			for ( var i = ids.length - 1; i >= 0; i--) {
				if (parseInt(idMax) < parseInt(ids[i])) {
					idMax = ids[i];
				}
			}
			var index = parseInt(idMax) + parseInt(1);
			if ($('#selectDoctosEspecificos option:selected').val() != "-1")
				jQuery("#jqgridDoctosEspecificos").jqGrid('addRowData', index, row,
						"last");
			$('#selectDoctosEspecificos').val('-1')
		}else{
			$("#alertsDocumentos").css("display", "block");
			$('#parrafoError').html('<b>Error!</b> Debe seleccionar un documento.');
			$("#alertsDocumentos").addClass("alert alert-danger");
			return;
		}
		

	}

	

	function guardarTipoDoctos(url) {
		var ids = jQuery('#jqgridDoctosEspecificos').getDataIDs();
		if(ids == '' || ids.length == 0){
			$("#alertsDocumentos").css("display", "block");
			$('#parrafoError').html('<b>Error!</b> Debe registrar un documento.');
			$("#alertsDocumentos").addClass("alert alert-danger");
			return;
		}else{
			var urlFinal = url + '?cargarListDoctosEspecificos=';
			sendGridEncoding('jqgridDoctosEspecificos', urlFinal,
					'listDoctosEspecificos');

			document.tipoDocumentosForm.action = contextPath + url
					+ '?guardarTipoDoctosPorTramite=';
			document.tipoDocumentosForm.submit();
		}
		
	}

	$(document).ready(function() {
		cargarDoctosEspecificos(controller);
		cargarComboDoctosEspecificos(controller);
		//$('#selectDoctosEspecificos').selectbox();
		
		$("#deleteButton").click(function() {
			var ids = $('#jqgridDoctosEspecificos').getGridParam('selarrrow');
			for ( var i = ids.length - 1; i >= 0; i--) {
				$('#jqgridDoctosEspecificos').delRowData(ids[i]);
			}
		});
	});