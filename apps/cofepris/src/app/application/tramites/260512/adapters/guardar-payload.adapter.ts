/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */
import { AvisocalidadQuery } from '../../../shared/estados/queries/aviso-calidad.query';
import { DatosDomicilioLegalQuery } from '../../../shared/estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalState } from '../../../shared/estados/stores/datos-domicilio-legal.store';
import { Injectable } from '@angular/core';
import { PagoDerechosQuery } from '../../../shared/estados/queries/pago-derechos.query';
import { PagoDerechosState } from '../../../shared/estados/stores/pago-de-derechos.store';
import { SolicitudState } from '../../../shared/estados/stores/aviso-calidad.store';



@Injectable({
  providedIn: 'root'
})
export class GuardarAdapter_260512 {
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
      "rfc": this.solicitudDatos.rfc ?? "",
      "nombre": this.solicitudDatos.nombre ?? "",
      "actividadEconomica": "",
      "correoElectronico": this.solicitudDatos.correo ?? "",
      "domicilio": {
        "pais": "México",
        "codigoPostal": this.solicitudDatos.codigoPostal,
        "estado": this.solicitudDatos.estado,
        "municipioAlcaldia": this.solicitudDatos.muncipio,
        "localidad": this.solicitudDatos.localidad,
        "colonia": this.solicitudDatos.colonia,
        "calle": this.solicitudDatos.calle,
        "numeroExterior": "300",
        "numeroInterior": "12",
        "lada": this.solicitudDatos.lada,
        "telefono": this.solicitudDatos.telefono
      }
    },
    "solicitud": {
      "discriminatorValue": 260512,
      "declaracionesSeleccionadas": this.solicitudDatos.mensaje,
      "regimen": "01",
      "aduanaAIFA": "140",
      "informacionConfidencial": typeof this.solicitudDatos['cumplimiento'] === 'string'
        ? this.solicitudDatos['cumplimiento'].toLowerCase() === 'si'
        : Boolean(this.solicitudDatos['cumplimiento'] ?? false)
    },
    "establecimiento": {
      "rfcResponsableSanitario": this.establecimientDatos.rfcDel,
      "razonSocial": this.establecimientDatos.denominacionRazonSocial,
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
      "avisoFuncionamiento": this.solicitudDatos.avisoCheckbox ?? false,
      "numeroLicencia": this.solicitudDatos.licenciaSanitaria ?? "",
      "aduanas": Array.isArray(this.solicitudDatos['aduanasDeEntradaObj'])
        ? this.solicitudDatos['aduanasDeEntradaObj'].map((a: { clave?: string }) => a?.clave || "")
        : []
    },
    "pagoDeDerechos": {
      "claveDeReferencia": this.pagoDerechosDatos.claveReferencia,
      "cadenaPagoDependencia": this.pagoDerechosDatos.cadenaDependencia,
      "banco": {
        "clave": "002",
        "descripcion": "BANCO NACIONAL DE MÉXICO, S.A."
      },
      "llaveDePago": this.pagoDerechosDatos.llavePago,
      "fecPago": this.pagoDerechosDatos.fechaPago,
      "impPago": this.pagoDerechosDatos.importePago
    },
    "mercancias": [
      {
        "objetoImportacionEnum": "CLAVE_DEL_CATALOGO",
        "objetoImportacionDesc": "Descripción (opcional, desde catálogo)",
        "descOtroObjetoImportacion": "Descripción cuando se selecciona 'Otro' (opcional)",
        "clasificacionToxicologica": {
          "idClasificacionToxicologicaTipoTramite": this.solicitudDatos.clasificacionToxicologica,
          "clasificacionToxicologica": "Descripción opcional (string)"
        },
        "numeroCAS": this.solicitudDatos.numeroRegistroSanitario,
        "porcentajeConcentracion": this.solicitudDatos.denominacionEspecifica,
        "nombreComercial": this.solicitudDatos.nombreComercial,
        "nombreComun": this.solicitudDatos.nombreComun,
        "nombreCientifico": this.solicitudDatos.nombreCientifico,
        "idMercancia": "1",
        "idClasificacionProducto": "325",
        "nombreClasificacionProducto": "Fab. sustancias químicas básicas",
        "ideSubClasificacionProducto": "32541",
        "nombreSubClasificacionProducto": "Fab. productos farmacéuticos",
        "descDenominacionEspecifica": "Medicamentos para uso humano",
        "descDenominacionDistintiva": "Paracetamol Tabletas 500mg",
        "descripcionMercancia": "Acetaminophen",
        "formaFarmaceuticaDescripcionOtros": "Tableta",
        "estadoFisicoDescripcionOtros": this.solicitudDatos.estadoFisicoOtro,
        "fraccionArancelaria": {
          "clave": this.solicitudDatos.fraccionArancelaria,
          "descripcion": this.solicitudDatos.descripcionFraccion || ""
        },
        "unidadMedidaComercial": {
          "descripcion": this.solicitudDatos.UMC
        },
        "cantidadUMCConComas": this.solicitudDatos.cantidadUMC,
        "unidadMedidaTarifa": {
          "descripcion": this.solicitudDatos.UMT
        },
        "cantidadUMTConComas": this.solicitudDatos.cantidadUMT,
        "presentacion": "",
        "registroSanitarioConComas": "",
        "nombreCortoPaisOrigen": Array.isArray(this.solicitudDatos['paisDeOriginDatosObj'])
          ? this.solicitudDatos['paisDeOriginDatosObj'].map((a: { clave?: string }) => a?.clave || "")
          : [],
        "nombreCortoPaisProcedencia": Array.isArray(this.solicitudDatos['paisDeProcedenciaDatosObj'])
          ? this.solicitudDatos['paisDeProcedenciaDatosObj'].map((a: { clave?: string }) => a?.clave || "")
          : [],
        "tipoProductoDescripcionOtros": "",
        "nombreCortoUsoEspecifico": "Uso humano",
        "fechaCaducidadStr": "",
        "idEstadoFisico": this.solicitudDatos.estadoFisico
      }
    ],
    "representanteLegal": {
      "rfc": this.solicitudDatos.rfc,
      "resultadoIDC": "",
      "nombre": this.solicitudDatos.nombre,
      "apellidoPaterno": this.solicitudDatos.apellidoPaterno,
      "apellidoMaterno": this.solicitudDatos.apellidoMaterno
    }
  };
  }
}