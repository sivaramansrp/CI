/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */
import { Injectable, OnInit } from '@angular/core';
import { AvisocalidadQuery } from '../../../shared/estados/queries/aviso-calidad.query';
import { DatosDomicilioLegalQuery } from '../../../shared/estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalState } from '../../../shared/estados/stores/datos-domicilio-legal.store';
import { PagoDerechosQuery } from '../../../shared/estados/queries/pago-derechos.query';
import { PagoDerechosState } from '../../../shared/estados/stores/pago-de-derechos.store';
import { SolicitudState } from '../../../shared/estados/stores/aviso-calidad.store';



@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260516 {
  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param state El estado actual de Akita
   * @returns Payload formateado para la API
   */
  establecimientDatos: SolicitudState = {} as SolicitudState;
  solicitudDatos: DatosDomicilioLegalState = {} as DatosDomicilioLegalState;
  pagoDerechosDatos: PagoDerechosState ={} as PagoDerechosState;
  
  constructor(private establecimientQuery:AvisocalidadQuery, 
    private solicitudQuery: DatosDomicilioLegalQuery,
    private pagoDrenchosQuery:PagoDerechosQuery) {

    this.establecimientQuery.allStoreData$.subscribe(data => {
      this.establecimientDatos = data;
    });
    this.solicitudQuery.allStoreData$.subscribe(data => {
      this.solicitudDatos = data;
    });
    this.pagoDrenchosQuery.selectSolicitud$.subscribe(data => {
      this.pagoDerechosDatos = data;
    });
  }

  public toFormPayload(): unknown {
    return {
      "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "María Fernanda Torres",
        "actividadEconomica": "Comercio al por mayor de productos farmacéuticos",
        "correoElectronico": "mfernanda.torres@example.com",
        "domicilio": {
            "pais": "México",
            "codigoPostal": "03100",
            "estado": "Ciudad de México",
            "municipioAlcaldia": "Benito Juárez",
            "localidad": "Narvarte",
            "colonia": "Colonia Narvarte Poniente",
            "calle": "Av. Universidad 300",
            "numeroExterior": "300",
            "numeroInterior": "12",
            "lada": "55",
            "telefono": "5556789012"
        },
      },
      "establecimiento": {
          "rfcResponsableSanitario": null,
          "razonSocial":null,
          "correoElectronico": this.establecimientDatos?.correoElectronico ? this.establecimientDatos.correoElectronico : "",
          "domicilio": {
              "codigoPostal": this.solicitudDatos.codigoPostal,
              "entidadFederativa": {
                  "clave": "09"
              },
              "descripcionMunicipio": this.solicitudDatos.muncipio,
              "informacionExtra": this.solicitudDatos.localidad,
              "descripcionColonia": this.solicitudDatos.colonia,
              "calle": this.solicitudDatos.calle,
              "lada": this.solicitudDatos.lada,
              "telefono": this.solicitudDatos.telefono
          },
          "original": "",
          "numeroLicencia": this.solicitudDatos.licenciaSanitaria,
      },
      "pagoDeDerechos": {
          "claveDeReferencia": this.pagoDerechosDatos.claveReferencia,
          "cadenaPagoDependencia": this.pagoDerechosDatos.cadenaDependencia,
          "banco": {
              "clave": this.pagoDerechosDatos.banco,
              "descripcion": ""
          },
          "llaveDePago": this.pagoDerechosDatos.llavePago,
          "fecPago": this.pagoDerechosDatos.fechaPago,
          "impPago": this.pagoDerechosDatos.importePago
      }
      
    }
  }
}