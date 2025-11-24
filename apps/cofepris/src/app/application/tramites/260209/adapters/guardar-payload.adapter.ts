import { Injectable } from '@angular/core';
import { TablaScianConfig } from '../../../shared/models/datos-solicitud.model';
import { Tramite260209State } from '../estados/tramite260209Store.store';


@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260209 {
  static toFormPayload(state: Tramite260209State): unknown {
    return {
      solicitante: {
        rfc: state.datosSolicitudFormState.rfcSanitario,
        nombre: state.datosSolicitudFormState.denominacionRazon,
        actividadEconomica: "",
        correoElectronico: state.datosSolicitudFormState.correoElectronico,
        domicilio: {
          pais: 'México',
          codigoPostal: state.datosSolicitudFormState.codigoPostal,
          estado: state.datosSolicitudFormState.estado,
          municipioAlcaldia: state.datosSolicitudFormState.municipioAlcaldia,
          localidad: state.datosSolicitudFormState.localidad,
          colonia: state.datosSolicitudFormState.colonia,
          calle: state.datosSolicitudFormState.calle,
          lada: state.datosSolicitudFormState.lada,
          telefono: state.datosSolicitudFormState.telefono
        }
      },
      solicitud: {
        discriminatorValue: 260209,
        regimen: state.datosSolicitudFormState.regimen,
        informacionConfidencial: state.datosSolicitudFormState.publico === 'si',
        aduanaAIFA: state.datosSolicitudFormState.adunasDeEntradas || '',
        declaracionesSeleccionadas: state.datosSolicitudFormState.manifesto || ''
      },
      establecimiento: {
        rfcResponsableSanitario: state.datosSolicitudFormState.rfcSanitario,
        razonSocial: state.datosSolicitudFormState.denominacionRazon,
        correoElectronico: state.datosSolicitudFormState.correoElectronico,
        domicilio: {
          codigoPostal: state.datosSolicitudFormState.codigoPostal,
          entidadFederativa: { clave: '' },
          descripcionMunicipio: state.datosSolicitudFormState.municipioAlcaldia,
          informacionExtra: state.datosSolicitudFormState.localidad,
          descripcionColonia: state.datosSolicitudFormState.colonia,
          calle: state.datosSolicitudFormState.calle,
          lada: state.datosSolicitudFormState.lada,
          telefono: state.datosSolicitudFormState.telefono
        },
        original: '',
        avisoFuncionamiento: state.datosSolicitudFormState.aviso,
        numeroLicencia: state.datosSolicitudFormState.licenciaSanitaria,
        aduanas: state.datosSolicitudFormState.adunasDeEntradas
      },
  datosSCIAN: (state.scianConfigDatos ?? []).map((datos: TablaScianConfig) => ({
        cveScian: datos.clave,
        descripcion: datos.descripcion
      })),
  mercancias: (state.tablaMercanciasConfigDatos ?? []).map((mercancia) => ({
        idMercancia: '',
        idClasificacionProducto: '',
        nombreClasificacionProducto: mercancia.clasificacionProducto,
        ideSubClasificacionProducto: '',
        nombreSubClasificacionProducto: mercancia.especificarClasificacionProducto,
        descDenominacionEspecifica: mercancia.denominacionEspecificaProducto,
        descDenominacionDistintiva: mercancia.denominacionDistintiva,
        descripcionMercancia: '',
        formaFarmaceuticaDescripcionOtros: mercancia.formaFarmaceutica,
        estadoFisicoDescripcionOtros: mercancia.estadoFisico,
        fraccionArancelaria: {
          clave: mercancia.fraccionArancelaria,
          descripcion: mercancia.descripcionFraccion || ''  
        },
        unidadMedidaComercial: {
          descripcion: mercancia.unidadMedidaComercializacion
        },
        cantidadUMCConComas: mercancia.cantidadUMC,
        unidadMedidaTarifa: {
          descripcion: mercancia.unidadMedidaTarifa
        },
        cantidadUMTConComas: mercancia.cantidadUMT,
        presentacion: mercancia.presentacion,
        registroSanitarioConComas: mercancia.numeroRegistroSanitario,
          nombreCortoPaisOrigen: mercancia.paisOrigenDatosClave,
          nombreCortoPaisProcedencia: mercancia.paisProcedenciaDatosClave,
          nombreCortoUsoEspecifico: mercancia.usoEspecificoDatosClave,
        tipoProductoDescripcionOtros: mercancia.tipoProducto,
        fechaCaducidadStr: mercancia.fechaCaducidad
      })),
      representanteLegal: {
        rfc: "AAL0409235E6", // Hardcoded RFC as in 260201
        resultadoIDC: '',
        nombre: state.datosSolicitudFormState.representanteNombre,
        apellidoPaterno: state.datosSolicitudFormState.apellidoPaterno,
        apellidoMaterno: state.datosSolicitudFormState.apellidoMaterno
      },
      gridTerceros_TIPERS_FAB: state.fabricanteTablaDatos.map((fabricante) => {
        return {
          idPersonaSolicitud: "",
          ideTipoTercero: "",
          personaMoral: fabricante.tipoPersona === "Moral" ? "1" : "0",
          booleanExtranjero: fabricante.nacionalidad === 'Extranjero' ? "1" : "0",
          booleanFisicaNoContribuyente: "0",
          denominacion: fabricante.tipoPersona === "Moral"
            ? fabricante.razonSocial
            : `${fabricante.nombres} ${fabricante.primerApellido} ${fabricante.segundoApellido}`,
          razonSocial: fabricante.razonSocial,
          rfc: fabricante.rfc,
          curp: fabricante.curp,
          nombre: fabricante.nombres,
          apellidoPaterno: fabricante.primerApellido,
          apellidoMaterno: fabricante.segundoApellido,
          telefono: fabricante.telefono,
          correoElectronico: fabricante.correoElectronico,
          actividadProductiva: "",
          actividadProductivaDesc: "",
          descripcionGiro: "",
          numeroRegistro: "",
          domicilio: {
            calle: fabricante.calle,
            numeroExterior: fabricante.numeroExterior,
            numeroInterior: fabricante.numeroInterior,
            pais: {
              clave: fabricante.paisObj?.clave,
              nombre: fabricante.paisObj?.descripcion
            },
            colonia: {
              clave: fabricante.coloniaObj?.clave,
              nombre: fabricante.coloniaObj?.descripcion
            },
            delegacionMunicipio: {
              clave: fabricante.municipioAlcaldiaObj?.clave,
              nombre: fabricante.municipioAlcaldiaObj?.descripcion
            },
            localidad: {
              clave: fabricante.localidadObj?.clave,
              nombre: fabricante.localidadObj?.descripcion
            },
            entidadFederativa: {
              clave: fabricante.entidadFederativaObj?.clave,
              nombre: fabricante.entidadFederativaObj?.descripcion
            },
            informacionExtra: "",
            codigoPostal: fabricante.codigoPostal,
            descripcionColonia: fabricante.colonia
          },
          idSolicitud: "0"
        }
      }),
      gridTerceros_TIPERS_DES: state.destinatarioFinalTablaDatos.map((destinatario) => {
        return {
          idPersonaSolicitud: "",
          ideTipoTercero: "TIPERS.FAB",
          personaMoral: destinatario.tipoPersona === "Moral" ? "1" : "0",
          booleanExtranjero: "",
          booleanFisicaNoContribuyente: "0",
          denominacion: "LABORATORIOS PISA S.A. DE C.V.",
          razonSocial: destinatario.razonSocial,
          rfc: destinatario.rfc,
          curp: destinatario.curp,
          nombre: destinatario.nombres,
          apellidoPaterno: destinatario.primerApellido,
          apellidoMaterno: destinatario.segundoApellido,
          telefono: destinatario.telefono,
          correoElectronico: destinatario.correoElectronico,
          actividadProductiva: "",
          actividadProductivaDesc: "",
          descripcionGiro: "",
          numeroRegistro: "",
          domicilio: {
            calle: destinatario.calle,
            numeroExterior: destinatario.numeroExterior,
            numeroInterior: destinatario.numeroInterior,
            pais: {
              clave: destinatario.paisObj?.clave,
              nombre: destinatario.paisObj?.descripcion
            },
            colonia: {
              clave: destinatario.coloniaObj?.clave,
              nombre: destinatario.coloniaObj?.descripcion
            },
            delegacionMunicipio: {
              clave: destinatario.municipioObj?.clave,
              nombre: destinatario.municipioObj?.descripcion
            },
            localidad: {
              clave: destinatario.localidadObj?.clave,
              nombre: destinatario.localidadObj?.descripcion
            },
            entidadFederativa: {
              clave: "",
              nombre: ""
            },
            informacionExtra: "",
            codigoPostal: destinatario.codigoPostal,
            descripcionColonia: destinatario.colonia
          },
          idSolicitud: "0"
        }
      }),
      gridTerceros_TIPERS_PVD: state.proveedorTablaDatos.map((proveedor) => {
        return {
          idPersonaSolicitud: "",
          ideTipoTercero: "",
          personaMoral: proveedor.tipoPersona === "Moral" ? "1" : "0",
          booleanExtranjero: "",
          booleanFisicaNoContribuyente: "",
          denominacion: proveedor.razonSocial,
          razonSocial: proveedor.razonSocial,
          rfc: proveedor.rfc,
          curp: proveedor.curp,
          nombre: proveedor.nombres,
          apellidoPaterno: proveedor.primerApellido,
          apellidoMaterno: proveedor.segundoApellido,
          telefono: proveedor.telefono,
          correoElectronico: proveedor.correoElectronico,
          actividadProductiva: "",
          actividadProductivaDesc: "",
          descripcionGiro: "",
          numeroRegistro: "",
          domicilio: {
            calle: proveedor.calle,
            numeroExterior: proveedor.numeroExterior,
            numeroInterior: proveedor.numeroInterior,
            pais: {
              clave: proveedor.paisObj?.clave,
              nombre: proveedor.paisObj?.descripcion
            },
            colonia: {
              clave: "",
              nombre: ""
            },
            delegacionMunicipio: {
              clave: "",
              nombre: ""
            },
            localidad: {
              clave: "",
              nombre: ""
            },
            entidadFederativa: {
              clave: "",
              nombre: ""
            },
            informacionExtra: "",
            codigoPostal: proveedor.codigoPostal,
            descripcionColonia: proveedor.colonia
          },
          idSolicitud: "0"
        }
      }),
      gridTerceros_TIPERS_FAC: state.facturadorTablaDatos.map((facturador) => {
        return {
          idPersonaSolicitud: "",
          ideTipoTercero: "",
          personaMoral: facturador.tipoPersona === "Moral" ? "1" : "0",
          booleanExtranjero: "",
          booleanFisicaNoContribuyente: "",
          denominacion: facturador.razonSocial,
          razonSocial: facturador.razonSocial,
          rfc: facturador.rfc,
          curp: facturador.curp,
          nombre: facturador.nombres,
          apellidoPaterno: facturador.primerApellido,
          apellidoMaterno: facturador.segundoApellido,
          telefono: facturador.telefono,
          correoElectronico: facturador.correoElectronico,
          actividadProductiva: "",
          actividadProductivaDesc: "",
          descripcionGiro: "",
          numeroRegistro: "",
          domicilio: {
            calle: facturador.calle,
            numeroExterior: facturador.numeroExterior,
            numeroInterior: facturador.numeroInterior,
            pais: {
              clave: facturador.paisObj?.clave,
              nombre: facturador.paisObj?.descripcion
            },
            colonia: {
              clave: "",
              nombre: ""
            },
            delegacionMunicipio: {
              clave: "",
              nombre: ""
            },
            localidad: {
              clave: "",
              nombre: ""
            },
            entidadFederativa: {
              clave: "",
              nombre: ""
            },
            informacionExtra: "",
            codigoPostal: facturador.codigoPostal,
            descripcionColonia: facturador.colonia
          },
          idSolicitud: "0"
        }
      }),
      pagoDeDerechos: {
        claveDeReferencia: state.pagoDerechos.claveReferencia,
        cadenaPagoDependencia: state.pagoDerechos.cadenaDependencia,
        banco: {
          clave: state.pagoDerechos.banco,
          descripcion: ''
        },
        llaveDePago: state.pagoDerechos.llavePago,
        fecPago: state.pagoDerechos.fechaPago,
        impPago: state.pagoDerechos.importePago
      }
    };
  }
}
