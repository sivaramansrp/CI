/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de tratamientos especiales 260207.
 */

import { Injectable } from '@angular/core';
import { Tramite260207State } from '../estados/tramite260207Store.store';


@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260207 {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  static toFormPayload(state: Tramite260207State): unknown {
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
          "discriminatorValue": 260207,
          "declaracionesSeleccionadas": state.datosSolicitudFormState.manifesto || '',
          "regimen": state.datosSolicitudFormState.regimen,
          "aduanaAIFA": "ALTAMIRA",
          "informacionConfidencial": state.datosSolicitudFormState.publico === 'si' ? true : false
      },
      "establecimiento": {
          "rfcResponsableSanitario": state.datosSolicitudFormState.rfcSanitario,
          "razonSocial": state.datosSolicitudFormState.denominacionRazon,
          "correoElectronico": state.datosSolicitudFormState.correoElectronico,
          "domicilio": {
              "codigoPostal": state.datosSolicitudFormState.codigoPostal,
              "entidadFederativa": {
                  "clave": "09"
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
              "descripcion": datos.descripcion
          }
      }),
      "mercancias": (state.tablaMercanciasConfigDatos ?? []).map((mercancia) => {
        return {
              "idMercancia": "",
              "idClasificacionProducto": "",
              "nombreClasificacionProducto": mercancia.clasificacionProducto,
              "ideSubClasificacionProducto": "",
              "nombreSubClasificacionProducto": mercancia.especificarClasificacionProducto,
              "descDenominacionEspecifica": mercancia.denominacionEspecificaProducto,
              "descDenominacionDistintiva": mercancia.denominacionDistintiva,
              "descripcionMercancia": "",
              "formaFarmaceuticaDescripcionOtros": mercancia.formaFarmaceutica,
              "estadoFisicoDescripcionOtros": mercancia.estadoFisico,
              "fraccionArancelaria": {
                  "clave": mercancia.fraccionArancelaria,
                  "descripcion": ""
              },
              "unidadMedidaComercial": {
                  "descripcion": mercancia.unidadMedidaComercializacion || ""
              },
              "cantidadUMCConComas": mercancia.cantidadUMC,
              "unidadMedidaTarifa": {
                  "descripcion": mercancia.cantidadUMT
              },
              "cantidadUMTConComas": mercancia.cantidadUmtValor,
              "presentacion": mercancia.presentacion,
              "registroSanitarioConComas": mercancia.numeroRegistroSanitario,
              "valorEnDolaresCIF": "",
              "valorEnPesosMexicanosCIF": "",
              "paisOrigen": {
                  "clave": mercancia.paisOrigen || "",
                  "descripcion": ""
              },
              "paisProcedencia": {
                  "clave": mercancia.paisProcedencia || "",
                  "descripcion": ""
              },
              "incoterm": {
                  "clave": "",
                  "descripcion": ""
              },
              "principioActivo": "",
              "observaciones": "",
              "marcaComercial": "",
              "modelo": ""
          }
      }),
      "tercerosRelacionados": {
          "destinatarioFinal": state.destinatarioFinalTablaDatos.map((destinatario) => {
              return {
                  "rfc": destinatario.rfc,
                  "nombre": destinatario.nombres || "",
                  "correoElectronico": destinatario.correoElectronico,
                  "domicilio": {
                      "codigoPostal": destinatario.codigoPostal,
                      "entidadFederativa": {
                          "clave": "09"
                      },
                      "descripcionMunicipio": destinatario.municipioAlcaldia,
                      "informacionExtra": destinatario.localidad,
                      "descripcionColonia": destinatario.colonia,
                      "calle": destinatario.calle,
                      "lada": destinatario.lada,
                      "telefono": destinatario.telefono
                  }
              }
          }),
          "facturador": state.facturadorTablaDatos.map((facturador) => {
              return {
                  "nombre": facturador.nombres || "",
                  "correoElectronico": facturador.correoElectronico,
                  "domicilio": {
                      "pais": facturador.pais,
                      "codigoPostal": facturador.codigoPostal,
                      "estado": facturador.entidadFederativa,
                      "descripcionMunicipio": facturador.municipioAlcaldia,
                      "informacionExtra": facturador.localidad,
                      "descripcionColonia": facturador.colonia,
                      "calle": facturador.calle,
                      "lada": facturador.lada,
                      "telefono": facturador.telefono
                  },
                  "taxId": ""
              }
          }),
          "proveedor": state.proveedorTablaDatos.map((proveedor) => {
              return {
                  "nombre": proveedor.nombres || "",
                  "correoElectronico": proveedor.correoElectronico,
                  "domicilio": {
                      "pais": proveedor.pais,
                      "codigoPostal": proveedor.codigoPostal,
                      "estado": proveedor.entidadFederativa,
                      "descripcionMunicipio": proveedor.municipioAlcaldia,
                      "informacionExtra": proveedor.localidad,
                      "descripcionColonia": proveedor.colonia,
                      "calle": proveedor.calle,
                      "lada": proveedor.lada,
                      "telefono": proveedor.telefono
                  },
                  "taxId": ""
              }
          }),
          "fabricante": state.fabricanteTablaDatos.map((fabricante) => {
              return {
                  "nombre": fabricante.nombres || "",
                  "correoElectronico": fabricante.correoElectronico,
                  "domicilio": {
                      "pais": fabricante.pais,
                      "codigoPostal": fabricante.codigoPostal,
                      "estado": fabricante.entidadFederativa,
                      "descripcionMunicipio": fabricante.municipioAlcaldia,
                      "informacionExtra": fabricante.localidad,
                      "descripcionColonia": fabricante.colonia,
                      "calle": fabricante.calle,
                      "lada": fabricante.lada,
                      "telefono": fabricante.telefono
                  },
                  "taxId": ""
              }
          })
      },
      "pagoDerechos": {
          "formaPago": state.pagoDerechos.claveReferencia,
          "cantidadPagar": state.pagoDerechos.importePago,
          "lineaCaptura": state.pagoDerechos.llavePago,
          "fechaPago": state.pagoDerechos.fechaPago
      }
    };
  }
}