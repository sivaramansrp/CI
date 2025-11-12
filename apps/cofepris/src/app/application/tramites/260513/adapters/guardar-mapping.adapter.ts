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
export class GuardarAdapter_260513 {
  establecimientDatos: SolicitudState = {} as SolicitudState;
  solicitudDatos: DatosDomicilioLegalState = {} as DatosDomicilioLegalState;

  pagoDerechosDatos: PagoDerechosState ={} as PagoDerechosState;

  constructor(
    private establecimientQuery:AvisocalidadQuery, 
    private solicitudQuery: DatosDomicilioLegalQuery,
     private pagoDrenchosQuery:PagoDerechosQuery
   ) {
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
          "rfcResponsableSanitario": this.establecimientDatos?.rfcDel ? this.establecimientDatos.rfcDel : "",
          "razonSocial":this.establecimientDatos?.denominacionRazonSocial ? this.establecimientDatos.denominacionRazonSocial : "",
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
      },
      // "mercancias": (this.solicitudDatos?.mercanciaTabla ?? []).map((mercancia) => ({
      //   "objetoImportacionEnum": mercancia.objetoImportacionEnum,
      //   "objetoImportacionDesc": mercancia.objetoImportacionDesc,
      //   "descOtroObjetoImportacion": mercancia.descOtroObjetoImportacion,
      //   "clasificacionToxicologica": {
      //     "idClasificacionToxicologicaTipoTramite": mercancia.clasificacionToxicologica?.idClasificacionToxicologicaTipoTramite,
      //     "clasificacionToxicologica": mercancia.clasificacionToxicologica?.clasificacionToxicologica
      //   },
      //   "numeroCAS": mercancia.numeroCAS,
      //   "porcentajeConcentracion": mercancia.porcentajeConcentracion,
      //   "nombreComercial": mercancia.nombreComercial,
      //   "nombreComun": mercancia.nombreComun,
      //   "nombreCientifico": mercancia.nombreCientifico,
      //   "idEstadoFisico": mercancia.idEstadoFisico,
      //   "idMercancia": mercancia.idMercancia,
      //   "idClasificacionProducto": mercancia.idClasificacionProducto,
      //   "nombreClasificacionProducto": mercancia.nombreClasificacionProducto,
      //   "ideSubClasificacionProducto": mercancia.ideSubClasificacionProducto,
      //   "nombreSubClasificacionProducto": mercancia.nombreSubClasificacionProducto,
      //   "descDenominacionEspecifica": mercancia.descDenominacionEspecifica,
      //   "descDenominacionDistintiva": mercancia.descDenominacionDistintiva,
      //   "descripcionMercancia": mercancia.descripcionMercancia,
      //   "formaFarmaceuticaDescripcionOtros": mercancia.formaFarmaceuticaDescripcionOtros,
      //   "estadoFisicoDescripcionOtros": mercancia.estadoFisicoDescripcionOtros,
      //   "fraccionArancelaria": {
      //     "clave": mercancia.fraccionArancelaria?.clave,
      //     "descripcion": mercancia.fraccionArancelaria?.descripcion
      //   },
      //   "unidadMedidaComercial": {
      //     "descripcion": mercancia.unidadMedidaComercial?.descripcion
      //   },
      //   "cantidadUMCConComas": mercancia.cantidadUMCConComas,
      //   "unidadMedidaTarifa": {
      //     "descripcion": mercancia.unidadMedidaTarifa?.descripcion
      //   },
      //   "cantidadUMTConComas": mercancia.cantidadUMTConComas,
      //   "presentacion": mercancia.presentacion,
      //   "registroSanitarioConComas": mercancia.registroSanitarioConComas,
      //   "nombreCortoPaisOrigen": mercancia.nombreCortoPaisOrigen,
      //   "nombreCortoPaisProcedencia": mercancia.nombreCortoPaisProcedencia,
      //   "tipoProductoDescripcionOtros": mercancia.tipoProductoDescripcionOtros,
      //   "nombreCortoUsoEspecifico": mercancia.nombreCortoUsoEspecifico,
      //   "fechaCaducidadStr": mercancia.fechaCaducidadStr
      // })),
 

    }
  }
}