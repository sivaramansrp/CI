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

  pagoDerechosDatos: PagoDerechosState = {} as PagoDerechosState;

  constructor(
    private establecimientQuery: AvisocalidadQuery,
    private solicitudQuery: DatosDomicilioLegalQuery,
    private pagoDrenchosQuery: PagoDerechosQuery
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

  // eslint-disable-next-line complexity
  public toFormPayload(): unknown {
    return {
      solicitante: {
        rfc: this.solicitudDatos.rfc ?? "",
        nombre: this.solicitudDatos.nombre ?? "",
        actividadEconomica: "",
        correoElectronico: this.solicitudDatos.correo ?? "",
        domicilio: {
          pais: "México",
          codigoPostal: this.solicitudDatos.codigoPostal ?? "",
          estado: this.solicitudDatos.estado ?? "",
          municipioAlcaldia: this.solicitudDatos.muncipio ?? "",
          localidad: this.solicitudDatos.localidad ?? "",
          colonia: this.solicitudDatos.colonia ?? "",
          calle: this.solicitudDatos.calle ?? "",
          numeroExterior: "",
          numeroInterior: "",
          lada: this.solicitudDatos.lada ?? "",
          telefono: this.solicitudDatos.telefono ?? ""
        }
      },
      establecimiento: {
        rfcResponsableSanitario: this.establecimientDatos.rfcDel ?? "",
        razonSocial: this.establecimientDatos.denominacionRazonSocial ?? "",
        correoElectronico: this.establecimientDatos.correoElectronico ?? "",
        domicilio: {
          codigoPostal: this.solicitudDatos.codigoPostal ?? "",
          entidadFederativa: {
            clave: "09" // Only hardcoded value available
          },
          descripcionMunicipio: this.solicitudDatos.muncipio ?? "",
          informacionExtra: this.solicitudDatos.localidad ?? "",
          descripcionColonia: this.solicitudDatos.colonia ?? "",
          calle: this.solicitudDatos.calle ?? "",
          lada: this.solicitudDatos.lada ?? "",
          telefono: this.solicitudDatos.telefono ?? ""
        },
        original: "",
        avisoFuncionamiento: this.solicitudDatos.avisoCheckbox ?? false,
        numeroLicencia: this.solicitudDatos.licenciaSanitaria ?? "",
        aduanas: this.solicitudDatos.aduanasDeEntrada?.toString() ?? ""
      },
      datosSCIAN: this.solicitudDatos.nicoTabla ?? [],
      pagoDeDerechos: {
        claveDeReferencia: this.pagoDerechosDatos.claveReferencia ?? "",
        cadenaPagoDependencia: this.pagoDerechosDatos.cadenaDependencia ?? "",
        banco: {
          clave: this.pagoDerechosDatos.banco ?? "",
          descripcion: this.pagoDerechosDatos.bancoObject?.descripcion ?? ""
        },
        llaveDePago: this.pagoDerechosDatos.llavePago ?? "",
        fecPago: this.pagoDerechosDatos.fechaPago ?? "",
        impPago: this.pagoDerechosDatos.importePago ?? ""
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mercancias: [{
        objetoImportacionEnum: "",
        objetoImportacionDesc: "Descripción (opcional, desde catálogo)",
        descOtroObjetoImportacion: this.solicitudDatos.objetoImportacionOtro,
        clasificacionToxicologica: {
          idClasificacionToxicologicaTipoTramite: this.solicitudDatos.especificar,
          clasificacionToxicologica: "Descripción opcional (string)"
        },
        numeroCAS: this.solicitudDatos.numeroRegistroSanitario,
        porcentajeConcentracion: this.solicitudDatos.denominacionEspecifica,
        nombreComercial: this.solicitudDatos.nombreComercial,
        nombreComun: this.solicitudDatos.nombreComun,
        nombreCientifico: this.solicitudDatos.nombreCientifico,
        idMercancia: "1",
        formaFarmaceuticaDescripcionOtros: "",
        estadoFisicoDescripcionOtros: this.solicitudDatos.estadoFisicoOtro,
        fraccionArancelaria: {
          clave: this.solicitudDatos.fraccionArancelaria,
          descripcion: this.solicitudDatos.descripcionFraccion
        },
        unidadMedidaComercial: {
          descripcion: this.solicitudDatos.UMC
        },
        cantidadUMCConComas: this.solicitudDatos.cantidadUMC,
        unidadMedidaTarifa: {
          descripcion: this.solicitudDatos.UMT
        },
        cantidadUMTConComas: this.solicitudDatos.cantidadUMT,
        presentacion: "",
        registroSanitarioConComas: "",
        nombreCortoPaisOrigen: this.solicitudDatos.paisDeOriginDatos?.toString(),
        nombreCortoPaisProcedencia: this.solicitudDatos.paisDeProcedenciaDatos?.toString(),
        tipoProductoDescripcionOtros: "",
        nombreCortoUsoEspecifico: this.solicitudDatos.acondicionamiento,
        fechaCaducidadStr: "",
        idEstadoFisico: this.solicitudDatos.estadoFisico,
      }],
      representanteLegal: {
        rfc: this.solicitudDatos.rfc ?? "",
        resultadoIDC: "",
        nombre: this.solicitudDatos.nombre ?? "",
        apellidoPaterno: this.solicitudDatos.apellidoPaterno ?? "",
        apellidoMaterno: this.solicitudDatos.apellidoMaterno ?? ""
      },
      solicitud: {
        discriminatorValue: 260513,
        declaracionesSeleccionadas: this.solicitudDatos.mensaje ?? false,
        regimen: this.solicitudDatos.regimen ?? "",
        aduanaAIFA: "",
        informacionConfidencial: this.solicitudDatos.cumplimiento === 'Si' ? true : false
      },
    
    };
  }

}
