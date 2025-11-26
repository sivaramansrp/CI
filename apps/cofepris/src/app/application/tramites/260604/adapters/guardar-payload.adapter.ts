/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */

import { Injectable } from '@angular/core';
import { Tramite260604State } from '../estados/tramite260604Store.store';


@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260604 {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Tramite260604State): unknown {
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
      "solicitud": {
          "discriminatorValue": 260604,
          "declaracionesSeleccionadas": state.datosSolicitudFormState.manifesto,
          "regimen": state.datosSolicitudFormState.regimen,
          "aduanaAIFA": "", 
          "informacionConfidencial": state.datosSolicitudFormState.publico === 'Si' ? true : false
      },
      "establecimiento": {
          "rfcResponsableSanitario": state.datosSolicitudFormState.rfcSanitario,
          "razonSocial": state.datosSolicitudFormState.denominacionRazon,
          "correoElectronico": state.datosSolicitudFormState.correoElectronico,
          "domicilio": {
              "codigoPostal": state.datosSolicitudFormState.codigoPostal,
              "entidadFederativa": {
                  "clave": state.datosSolicitudFormState.estado
              },
              "descripcionMunicipio": state.datosSolicitudFormState.municipioAlcaldia,
              "informacionExtra": state.datosSolicitudFormState.localidad,
              "descripcionColonia": state.datosSolicitudFormState.colonia,
              "calle": state.datosSolicitudFormState.calle,
              "lada": state.datosSolicitudFormState.lada,
              "telefono": state.datosSolicitudFormState.telefono
          },
          "original": "",
          "avisoFuncionamiento": state.datosSolicitudFormState.aviso,
          "numeroLicencia": state.datosSolicitudFormState.licenciaSanitaria,
          "aduanas": state.datosSolicitudFormState.adunasDeEntradas
      },
      "datosSCIAN": state.scianConfigDatos.map((datos)=>{
        return {
              "cveScian": datos.clave,
              "descripcion": datos.descripcion,
              "selected": true
          }
      }),
      "mercancias": (state.tablaMercanciasConfigDatos ?? []).map((mercancia) => {
        return {
              "idMercancia": null,
              "idClasificacionProducto": mercancia.claveClasificacionProductoObj?.clave,
              "nombreClasificacionProducto": mercancia.claveClasificacionProductoObj?.descripcion,
              "ideSubClasificacionProducto": mercancia.especificarClasificacionObj?.clave,
              "nombreSubClasificacionProducto": mercancia.especificarClasificacionObj?.descripcion,
              "descDenominacionEspecifica": mercancia.denominacionEspecificaProducto,
              "descDenominacionDistintiva": mercancia.denominacionDistintiva,
              "descripcionMercancia": mercancia.denominacionComun,
              "idFormaFarmaceutica": mercancia.formaFarmaceutica,
              "formaFarmaceuticaDescripcionOtros": mercancia.especifiqueForma,
              "idEstadoFisico": mercancia.estadoFisico,
              "estadoFisicoDescripcionOtros": mercancia.especifiqueEstado,
              "fraccionArancelaria": {
                  "clave": mercancia.fraccionArancelaria,
                  "descripcion": mercancia.descripcionFraccion
              },
              "unidadMedidaComercial": {
                  "descripcion": mercancia.cantidadUMCObj?.descripcion
              },
              "cantidadUMCConComas": mercancia.valorComercial,
              "unidadMedidaTarifa": {
                  "descripcion": mercancia.cantidadUMT
              },
              "cantidadUMTConComas": mercancia.cantidadUmtValor,
              "presentacion": mercancia.presentacion,
              "registroSanitarioConComas": mercancia.numeroRegistroSanitario,
              "nombreCortoPaisOrigen": mercancia.paisDeOriginDatos?.toString(),
              "nombreCortoPaisProcedencia": mercancia.paisDeProcedenciaDatos?.toString(),
              "idTipoProductoTipoTramite": mercancia.tipoProducto,
              "tipoProductoDescripcionOtros": mercancia.especifique,
              "nombreCortoUsoEspecifico": mercancia.usoEspecifico?.toString(),
              "fechaCaducidadStr": mercancia.fechaDeMovimiento
          }
      }),
      "representanteLegal": {
          "rfc": state.datosSolicitudFormState.representanteRfc,
          "resultadoIDC": "",
          "nombre": state.datosSolicitudFormState.representanteNombre,
          "apellidoPaterno": state.datosSolicitudFormState.apellidoPaterno,
          "apellidoMaterno": state.datosSolicitudFormState.apellidoMaterno
      },
      "gridTerceros_TIPERS_FAC": state.facturadorTablaDatos.map((facturador) => { 
        return {
          "idPersonaSolicitud": "",
          "ideTipoTercero": "",
          "personaMoral": facturador.tipoPersona === "Moral" ? "1" : "0",
          "booleanExtranjero": "",
          "booleanFisicaNoContribuyente": "",
          "denominacion": facturador.razonSocial,
          "razonSocial": facturador.razonSocial,
          "rfc": facturador.rfc,
          "curp": facturador.curp,
          "nombre": facturador.nombres,
          "apellidoPaterno": facturador.primerApellido,
          "apellidoMaterno": facturador.segundoApellido,
          "telefono": facturador.telefono,
          "correoElectronico": facturador.correoElectronico,
          "actividadProductiva": "",
          "actividadProductivaDesc": "",
          "descripcionGiro": "",
          "numeroRegistro": "",
          "domicilio": {
              "calle": facturador.calle,
              "numeroExterior": facturador.numeroExterior,
              "numeroInterior": facturador.numeroInterior,
              "pais": {
                  "clave": facturador.paisObj?.clave,
                  "nombre": facturador.paisObj?.descripcion
              },
              "colonia": {
                  "clave": "",
                  "nombre": ""
              },
              "delegacionMunicipio": {
                  "clave": "",
                  "nombre": ""
              },
              "localidad": {
                  "clave": "",
                  "nombre": ""
              },
              "entidadFederativa": {
                  "clave": "",
                  "nombre": ""
              },
              "informacionExtra": "",
              "codigoPostal": facturador.codigoPostal,
              "descripcionColonia": facturador.colonia
          },
          "idSolicitud": state.idSolicitud || 0
        }
      }),
    }
  }
}