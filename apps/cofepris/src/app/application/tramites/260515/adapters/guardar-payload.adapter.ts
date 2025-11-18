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
export class GuardarAdapter_260515 {
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
          "codigoPostal": this.solicitudDatos.codigoPostal,
          "entidadFederativa": {
            "clave": "09"
          },
          "descripcionMunicipio": this.solicitudDatos.muncipio,
          "informacionExtra": this.solicitudDatos.localidad,
          "descripcionColonia": this.solicitudDatos.colonia,
          "calle": this.solicitudDatos.calle,
          "colonia": this.solicitudDatos.colonia,
          "estado": this.solicitudDatos.estado,
          "numeroExterior": "300",
          "numeroInterior": "12",
          "municipioAlcaldia": this.solicitudDatos.muncipio,
          "lada": this.solicitudDatos.lada,
          "telefono": this.solicitudDatos.telefono
        },
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
          "telefono": this.solicitudDatos.telefono,
          "localidad": this.solicitudDatos.localidad,
        },
        "original": "",
        "avisoFuncionamiento": this.solicitudDatos.avisoCheckbox ?? false,
        "numeroLicencia": this.solicitudDatos.licenciaSanitaria ?? "",
        "aduanas": this.solicitudDatos.aduanasDeEntrada?.toString()
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
      },
      "mercancias": this.solicitudDatos.mercanciaTabla?.map((item:any) => ({
        "objetoImportacionEnum": item['objetoImportacion'] as string || "",
        "objetoImportacionDesc": "Descripción (opcional, desde catálogo)",
        "descOtroObjetoImportacion": item['objetoImportacionOtro'] as string || "",
        "clasificacionToxicologica": {
          "idClasificacionToxicologicaTipoTramite": item['clasificacionToxicologica'] as string || "",
          "clasificacionToxicologica": ""
        },
        "numeroCAS": "34121",
        "porcentajeConcentracion": item['porcentajeConcentracion'] as string || "",
        "nombreComercial": item['nombreComercial'] as string || "",
        "nombreComun": item['nombreComun'] as string || "",
        "nombreCientifico": item['nombreCientifico'] as string || "",
        "idEstadoFisico": item['estadoFisico'] as string || "",
        "idMercancia": "1",
        "idClasificacionProducto": "325",
        "nombreClasificacionProducto": "Fab. sustancias químicas básicas",
        "ideSubClasificacionProducto": "32541",
        "nombreSubClasificacionProducto": "Fab. productos farmacéuticos",
        "descDenominacionEspecifica": "Medicamentos para uso humano",
        "descDenominacionDistintiva": "Paracetamol Tabletas 500mg",
        "descripcionMercancia": "Acetaminophen",
        "formaFarmaceuticaDescripcionOtros": "Tableta",
        "estadoFisicoDescripcionOtros": item['estadoFisicoOtro'] as string || "",
        "fraccionArancelaria": {
          "clave": item['fraccionArancelaria'] as string || "",
          "descripcion": item['descripcionFraccion'] as string || ""
        },
        "unidadMedidaComercial": {
          "descripcion": item['UMC'] as string || ""
        },
        "cantidadUMCConComas": item['cantidadUmc'] as string || "",
        "unidadMedidaTarifa": {
          "descripcion": item['UMT'] as string || ""
        },
        "cantidadUMTConComas": item['cantidadUmt'] as string || "",
        "presentacion": "Frasco x 100 tabletas",
        "registroSanitarioConComas": item['numeroRegistroSanitario'] as string || "",
        "nombreCortoPaisOrigen": item['paisOrigen']?.toString() || "",
        "nombreCortoPaisProcedencia": item['paisProcedenciaUltimoPuerto']?.toString() || "",
        "tipoProductoDescripcionOtros": "Analgésico",
        "nombreCortoUsoEspecifico": item['usoEspecifico'] as string || "",
        "fechaCaducidadStr": "31/12/2026"
      })) || [],
      "representanteLegal": {
        "rfc": this.solicitudDatos.rfc,
        "resultadoIDC": "",
        "nombre": this.solicitudDatos.nombre,
        "apellidoPaterno": this.solicitudDatos.apellidoPaterno,
        "apellidoMaterno": this.solicitudDatos.apellidoMaterno
      },
      "solicitud": {
        "discriminatorValue": 260515,
        "declaracionesSeleccionadas": this.solicitudDatos.mensaje,
        "regimen": "",
        "aduanaAIFA": "",
        "informacionConfidencial": this.solicitudDatos.cumplimiento === 'Si' ? true : false
      },
      "datosSCIAN": this.solicitudDatos.nicoTabla ?? []
    }
  }
}