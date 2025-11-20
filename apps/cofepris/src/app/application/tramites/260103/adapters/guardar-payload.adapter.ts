/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Tramite260103State } from '../estados/tramite260103Store.store';



@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260103 {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Tramite260103State): unknown {
    return {
  "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "ACEROS ALVARADO S.A. DE C.V.",
        "actividadEconomica": "Fabricación de productos de hierro y acero",
        "correoElectronico": "contacto@acerosalvarado.com",
        "domicilio": {
            "pais": "México",
            "codigoPostal": "06700",
            "estado": "Ciudad de México",
            "municipioAlcaldia": "Cuauhtémoc",
            "localidad": "Centro",
            "colonia": "Roma Norte",
            "calle": "Av. Insurgentes Sur",
            "numeroExterior": "123",
            "numeroInterior": "Piso 5, Oficina A",
            "lada": "",
            "telefono": "123456"
        },
      },

      establecimiento: {
        rfcResponsableSanitario: state.datosSolicitudFormState.rfcSanitario,
        razonSocial: state.datosSolicitudFormState.denominacionRazon,
        correoElectronico: state.datosSolicitudFormState.correoElectronico,

        domicilio: {
          codigoPostal: state.datosSolicitudFormState.codigoPostal,
          entidadFederativa: {
            clave: state.datosSolicitudFormState.estado
          },
          descripcionMunicipio: state.datosSolicitudFormState.municipioAlcaldia,
          informacionExtra: state.datosSolicitudFormState.localidad,
          descripcionColonia: state.datosSolicitudFormState.colonia,
          calle: state.datosSolicitudFormState.calle,
          lada: state.datosSolicitudFormState.lada,
          telefono: state.datosSolicitudFormState.telefono
        },

        original: "",
        avisoFuncionamiento: state.datosSolicitudFormState.aviso,
        numeroLicencia: state.datosSolicitudFormState.licenciaSanitaria,
        aduanas:""
      },

      datosSCIAN: state.scianConfigDatos.map(item => ({
        cveScian: item.clave,
        descripcion: item.descripcion,
      })),

      mercancias: (state.tablaMercanciasConfigDatos ?? []).map(merc => ({
        idMercancia: merc.id || "",
        idClasificacionProducto: merc.claveClasificacionProductoObj?.clave,
        nombreClasificacionProducto: merc.claveClasificacionProductoObj?.descripcion,

        ideSubClasificacionProducto: merc.especificarClasificacionObj?.clave,
        nombreSubClasificacionProducto: merc.especificarClasificacionObj?.descripcion,

        descDenominacionEspecifica: merc.denominacionEspecificaProducto,
        descDenominacionDistintiva: merc.denominacionDistintiva,
        descripcionMercancia: "",

        formaFarmaceuticaDescripcionOtros: merc.especifiqueForma,
        estadoFisicoDescripcionOtros: merc.especifiqueEstado,

        fraccionArancelaria: {
          clave: merc.fraccionArancelaria,
          descripcion: merc.descripcionFraccion
        },

        unidadMedidaComercial: {
          descripcion: merc.cantidadUMCObj?.descripcion
        },

        cantidadUMCConComas: merc.cantidadUMC,
        unidadMedidaTarifa: {
          descripcion: merc.cantidadUMT
        },
        cantidadUMTConComas: merc.cantidadUmtValor,

        presentacion: merc.presentacion,
        registroSanitarioConComas: merc.numeroRegistroSanitario,

        nombreCortoPaisOrigen: merc.paisDeOriginDatos?.toString(),
        nombreCortoPaisProcedencia: merc.paisDeProcedenciaDatos?.toString(),

        tipoProductoDescripcionOtros: merc.especifique,
        nombreCortoUsoEspecifico: merc.usoEspecifico?.toString(),

        fechaCaducidadStr: merc.fechaCaducidad,
        
        // NumeroLotes: merc?.c?.map(l => ({
        //   numeroLote: l.numeroLote,
        //   fechaElaboracionStr: l.fechaElaboracion,
        //   fechaCaducidadStr: l.fechaCaducidad
        // })) ?? []
      })),

      representanteLegal: {
        rfc: state.datosSolicitudFormState.representanteRfc,
        resultadoIDC: "",
        nombre: state.datosSolicitudFormState.representanteNombre,
        apellidoPaterno: state.datosSolicitudFormState.apellidoPaterno,
        apellidoMaterno: state.datosSolicitudFormState.apellidoMaterno
      },

      gridTerceros_TIPERS_FAB: state.fabricanteTablaDatos.map(f => ({
        idPersonaSolicitud: "",
        ideTipoTercero: "TIPERS.FAB",
        personaMoral: f.tipoPersona === "Moral" ? "1" : "0",
        booleanExtranjero: f.nacionalidad === 'Extranjero' ? "1" : "0",
        booleanFisicaNoContribuyente: "0",

        denominacion:
          f.tipoPersona === "Moral"
            ? f.razonSocial
            : `${f.nombres} ${f.primerApellido} ${f.segundoApellido}`,

        razonSocial: f.razonSocial,
        rfc: f.rfc,
        curp: f.curp,

        nombre: f.nombres,
        apellidoPaterno: f.primerApellido,
        apellidoMaterno: f.segundoApellido,

        telefono: f.telefono,
        correoElectronico: f.correoElectronico,

        actividadProductiva: "",
        actividadProductivaDesc: "",
        descripcionGiro: "",
        numeroRegistro: "",

        domicilio: {
          calle: "",
          numeroExterior: f.numeroExterior,
          numeroInterior: f.numeroInterior,

          pais: {
            clave: f.paisObj?.clave,
            nombre: f.paisObj?.descripcion
          },

          colonia: {
            clave: f.coloniaObj?.clave,
            nombre: f.coloniaObj?.descripcion
          },

          delegacionMunicipio: {
            clave: f.municipioAlcaldiaObj?.clave,
            nombre: f.municipioAlcaldiaObj?.descripcion
          },

          localidad: {
            clave: f.localidadObj?.clave,
            nombre: f.localidadObj?.descripcion
          },

          entidadFederativa: {
            clave: f.entidadFederativaObj?.clave,
            nombre: f.entidadFederativaObj?.descripcion
          },

          informacionExtra: "",
          codigoPostal: f.codigoPostal,
          descripcionColonia: f.colonia
        },

        idSolicitud: "",
      })),

      gridTerceros_TIPERS_DES:[
    {
        "idPersonaSolicitud": 1,
        "ideTipoTercero": "TIPERS.FAB",
        "personaMoral": "0",
        "booleanExtranjero": "0",
        "booleanFisicaNoContribuyente": "0",
        "denominacion": "",
        "razonSocial": "",
        "rfc": "test",
        "curp": "",
        "nombre": "test",
        "apellidoPaterno": "tesst",
        "apellidoMaterno": "test",
        "telefono": "",
        "correoElectronico": "",
        "actividadProductiva": "",
        "actividadProductivaDesc": "",
        "descripcionGiro": "",
        "numeroRegistro": "",
        "domicilio": {
            "calle": "test",
            "numeroExterior": "test",
            "numeroInterior": "",
            "pais": {
                "clave": "DEU",
                "nombre": "ALEMANIA (REPUBLICA FEDERAL DE)"
            },
            "colonia": {
                "clave": "02261311999",
                "nombre": "OTRA NO ESPECIFICADA EN EL CATALOGO"
            },
            "delegacionMunicipio": {
                "clave": "16022",
                "nombre": "CHARO"
            },
            "localidad": {
                "clave": "02261312001",
                "nombre": "JARIPEO - CP 61312"
            },
            "entidadFederativa": {
                "clave": "",
                "nombre": ""
            },
            "informacionExtra": "",
            "codigoPostal": "",
            "descripcionColonia": "OTRA NO ESPECIFICADA EN EL CATALOGO"
        },
        "idSolicitud": ""
    }
],
      

      pagoDeDerechos: {
        claveDeReferencia: state.pagoDerechos.claveReferencia,
        cadenaPagoDependencia: state.pagoDerechos.cadenaDependencia,

        banco: {
          clave: state.pagoDerechos.bancoObject?.clave,
          descripcion: state.pagoDerechos.bancoObject?.descripcion
        },

        llaveDePago: state.pagoDerechos.llavePago,
        fecPago: state.pagoDerechos.fechaPago,
        impPago: state.pagoDerechos.importePago
      },
        solicitud: {
          discriminatorValue: 260103,
          declaracionesSeleccionadas: true,
          aduanaAIFA: "",
          informacionConfidencial:true
      }

    };
  }
}