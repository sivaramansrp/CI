// Adapter for mapping frontend form data to backend payload for procedure 260513
export class GuardarMappingAdapter260513 {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toFormPayload(formData: any): any {
    // Map the formData to the required payload structure
    return {
      solicitante: {
        rfc: formData.solicitante?.rfc,
        nombre: formData.solicitante?.nombre,
        actividadEconomica: formData.solicitante?.actividadEconomica,
        correoElectronico: formData.solicitante?.correoElectronico,
        domicilio: {
          pais: formData.solicitante?.domicilio?.pais,
          codigoPostal: formData.solicitante?.domicilio?.codigoPostal,
          estado: formData.solicitante?.domicilio?.estado,
          municipioAlcaldia: formData.solicitante?.domicilio?.municipioAlcaldia,
          localidad: formData.solicitante?.domicilio?.localidad,
          colonia: formData.solicitante?.domicilio?.colonia,
          calle: formData.solicitante?.domicilio?.calle,
          numeroExterior: formData.solicitante?.domicilio?.numeroExterior,
          numeroInterior: formData.solicitante?.domicilio?.numeroInterior,
          lada: formData.solicitante?.domicilio?.lada,
          telefono: formData.solicitante?.domicilio?.telefono,
        },
      },
      solicitud: {
        discriminatorValue: 260513,
        declaracionesSeleccionadas: formData.solicitud?.declaracionesSeleccionadas,
        regimen: formData.solicitud?.regimen,
        aduanaAIFA: formData.solicitud?.aduanaAIFA,
        informacionConfidencial: formData.solicitud?.informacionConfidencial,
      },
      establecimiento: {
        rfcResponsableSanitario: formData.establecimiento?.rfcResponsableSanitario,
        razonSocial: formData.establecimiento?.razonSocial,
        correoElectronico: formData.establecimiento?.correoElectronico,
        domicilio: {
          codigoPostal: formData.establecimiento?.domicilio?.codigoPostal,
          entidadFederativa: {
            clave: formData.establecimiento?.domicilio?.entidadFederativa?.clave,
          },
          descripcionMunicipio: formData.establecimiento?.domicilio?.descripcionMunicipio,
          informacionExtra: formData.establecimiento?.domicilio?.informacionExtra,
          descripcionColonia: formData.establecimiento?.domicilio?.descripcionColonia,
          calle: formData.establecimiento?.domicilio?.calle,
          lada: formData.establecimiento?.domicilio?.lada,
          telefono: formData.establecimiento?.domicilio?.telefono,
        },
        original: formData.establecimiento?.original,
        avisoFuncionamiento: formData.establecimiento?.avisoFuncionamiento,
        numeroLicencia: formData.establecimiento?.numeroLicencia,
        aduanas: formData.establecimiento?.aduanas,
      },
      datosSCIAN: Array.isArray(formData.datosSCIAN)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? formData.datosSCIAN.map((item: any) => ({
            cveScian: item.cveScian,
            descripcion: item.descripcion,
            selected: item.selected,
          }))
        : [],
      mercancias: Array.isArray(formData.mercancias)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? formData.mercancias.map((item: any) => ({
            objetoImportacionEnum: item.objetoImportacionEnum,
            objetoImportacionDesc: item.objetoImportacionDesc,
            descOtroObjetoImportacion: item.descOtroObjetoImportacion,
            clasificacionToxicologica: {
              idClasificacionToxicologicaTipoTramite:
                item.clasificacionToxicologica?.idClasificacionToxicologicaTipoTramite,
              clasificacionToxicologica:
                item.clasificacionToxicologica?.clasificacionToxicologica,
            },
            numeroCAS: item.numeroCAS,
            porcentajeConcentracion: item.porcentajeConcentracion,
            nombreComercial: item.nombreComercial,
            nombreComun: item.nombreComun,
            nombreCientifico: item.nombreCientifico,
            estadoFisicoDescripcionOtros: item.estadoFisicoDescripcionOtros,
            idMercancia: item.idMercancia,
            idClasificacionProducto: item.idClasificacionProducto,
            nombreClasificacionProducto: item.nombreClasificacionProducto,
            ideSubClasificacionProducto: item.ideSubClasificacionProducto,
            nombreSubClasificacionProducto: item.nombreSubClasificacionProducto,
            descDenominacionEspecifica: item.descDenominacionEspecifica,
            descDenominacionDistintiva: item.descDenominacionDistintiva,
            descripcionMercancia: item.descripcionMercancia,
            formaFarmaceuticaDescripcionOtros: item.formaFarmaceuticaDescripcionOtros,
            fraccionArancelaria: {
              clave: item.fraccionArancelaria?.clave,
              descripcion: item.fraccionArancelaria?.descripcion,
            },
            unidadMedidaComercial: {
              descripcion: item.unidadMedidaComercial?.descripcion,
            },
            cantidadUMCConComas: item.cantidadUMCConComas,
            unidadMedidaTarifa: {
              descripcion: item.unidadMedidaTarifa?.descripcion,
            },
            cantidadUMTConComas: item.cantidadUMTConComas,
            presentacion: item.presentacion,
            registroSanitarioConComas: item.registroSanitarioConComas,
            nombreCortoPaisOrigen: item.nombreCortoPaisOrigen,
            nombreCortoPaisProcedencia: item.nombreCortoPaisProcedencia,
            tipoProductoDescripcionOtros: item.tipoProductoDescripcionOtros,
            nombreCortoUsoEspecifico: item.nombreCortoUsoEspecifico,
            fechaCaducidadStr: item.fechaCaducidadStr,
          }))
        : [],
      representanteLegal: {
        rfc: formData.representanteLegal?.rfc,
        resultadoIDC: formData.representanteLegal?.resultadoIDC,
        nombre: formData.representanteLegal?.nombre,
        apellidoPaterno: formData.representanteLegal?.apellidoPaterno,
        apellidoMaterno: formData.representanteLegal?.apellidoMaterno,
      },
      pagoDeDerechos: {
        claveDeReferencia: formData.pagoDeDerechos?.claveDeReferencia,
        cadenaPagoDependencia: formData.pagoDeDerechos?.cadenaPagoDependencia,
        banco: {
          clave: formData.pagoDeDerechos?.banco?.clave,
          descripcion: formData.pagoDeDerechos?.banco?.descripcion,
        },
        llaveDePago: formData.pagoDeDerechos?.llaveDePago,
        fecPago: formData.pagoDeDerechos?.fecPago,
        impPago: formData.pagoDeDerechos?.impPago,
      },
    };
  }
}
