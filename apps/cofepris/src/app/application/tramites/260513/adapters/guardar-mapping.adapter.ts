/* eslint-disable complexity */
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
        rfc: this.solicitudDatos.rfc ?? "AAL0409235E6",
        nombre: this.solicitudDatos.nombre ?? "ACEROS ALVARADO S.A. DE C.V.",
        actividadEconomica: "Fabricación de productos de hierro y acero",
        correoElectronico: this.solicitudDatos.correo ?? "contacto@acerosalvarado.com",
        domicilio: {
          pais: "México",
          codigoPostal: this.solicitudDatos.codigoPostal ?? "06700",
          estado: this.solicitudDatos.estado ?? "Ciudad de México",
          municipioAlcaldia: this.solicitudDatos.muncipio ?? "Cuauhtémoc",
          localidad: this.solicitudDatos.localidad ?? "Centro",
          colonia: this.solicitudDatos.colonia ?? "Roma Norte",
          calle: this.solicitudDatos.calle ?? "Av. Insurgentes Sur",
          numeroExterior: "123",
          numeroInterior: "Piso 5, Oficina A",
          lada: this.solicitudDatos.lada ?? "",
          telefono: this.solicitudDatos.telefono ?? "123456"
        }
      },
      establecimiento: {
        rfcResponsableSanitario: this.establecimientDatos.rfcDel ?? "XAXX010101000",
        razonSocial: this.establecimientDatos.denominacionRazonSocial ?? "Laboratorios Farmacéuticos del Centro S.A. de C.V.",
        correoElectronico: this.establecimientDatos.correoElectronico ?? "info@labcentro.com.mx",
        domicilio: {
          codigoPostal: this.solicitudDatos.codigoPostal ?? "06700",
          entidadFederativa: {
            clave: this.solicitudDatos.estado ?? "09"
          },
          descripcionMunicipio: this.solicitudDatos.muncipio ?? "Cuauhtémoc",
          informacionExtra: this.solicitudDatos.localidad ?? "Centro",
          descripcionColonia: this.solicitudDatos.colonia ?? "Roma Norte",
          calle: this.solicitudDatos.calle ?? "Calle Orizaba 123, Interior 4B",
          lada: this.solicitudDatos.lada ?? "55",
          telefono: this.solicitudDatos.telefono ?? "55551234"
        },
        original: "",
        avisoFuncionamiento: this.solicitudDatos.avisoCheckbox ?? true,
        numeroLicencia: this.solicitudDatos.licenciaSanitaria ?? "123456",
        aduanas: Array.isArray(this.solicitudDatos.aduanasDeEntradaObj)
          ? this.solicitudDatos.aduanasDeEntradaObj.map((a: { clave?: string; descripcion?: string }) => a?.clave || "")
          : ["140","160","120","170"],
      },
      datosSCIAN: Array.isArray(this.solicitudDatos.nicoTabla)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? this.solicitudDatos.nicoTabla.map((item: any) => ({
            cveScian: String(item.clave_Scian ?? item.claveScianModal ?? ""),
            descripcion: String(item.descripcion_Scian ?? item.claveDescripcionModal ?? ""),
            selected: true
          }))
        : [],
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
      mercancias: Array.isArray(this.solicitudDatos.mercanciaTabla)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ? this.solicitudDatos.mercanciaTabla.map((item: any) => ({
            objetoImportacionEnum: item.objetoImportacion ?? "",
            objetoImportacionDesc: "Descripción (opcional, desde catálogo)",
            descOtroObjetoImportacion: item.objetoImportacionOtro ?? "",
            clasificacionToxicologica: {
              idClasificacionToxicologicaTipoTramite: item.clasificacionToxicologica ?? "",
              clasificacionToxicologica: ""
            },
            numeroCAS: item.numeroRegistroSanitario ?? "34121",
            porcentajeConcentracion: item.porcentajeConcentracion ?? "",
            nombreComercial: item.nombreComercial ?? "",
            nombreComun: item.nombreComun ?? "",
            nombreCientifico: item.nombreCientifico ?? "",
            idEstadoFisico: item.estadoFisico ?? "",
            idMercancia: "1",
            idClasificacionProducto: "325",
            nombreClasificacionProducto: "Fab. sustancias químicas básicas",
            ideSubClasificacionProducto: "32541",
            nombreSubClasificacionProducto: "Fab. productos farmacéuticos",
            descDenominacionEspecifica: "Medicamentos para uso humano",
            descDenominacionDistintiva: "Paracetamol Tabletas 500mg",
            descripcionMercancia: "Acetaminophen",
            formaFarmaceuticaDescripcionOtros: "Tableta",
            estadoFisicoDescripcionOtros: item.estadoFisicoOtro ?? "",
            fraccionArancelaria: {
              clave: item.fraccionArancelaria ?? "",
              descripcion: item.descripcionFraccion ?? ""
            },
            unidadMedidaComercial: {
              descripcion: item.UMC ?? ""
            },
            cantidadUMCConComas: item.cantidadUmc ?? "",
            unidadMedidaTarifa: {
              descripcion: item.UMT ?? ""
            },
            cantidadUMTConComas: item.cantidadUmt ?? "",
            presentacion: "Frasco x 100 tabletas",
            registroSanitarioConComas: item.numeroRegistroSanitario ?? "",
            nombreCortoPaisOrigen: Array.isArray(item.paisDeOriginDatosObj)
              ? item.paisDeOriginDatosObj.map((a: { clave?: string }) => a?.clave || "")
              : [],
            nombreCortoPaisProcedencia: Array.isArray(item.paisDeProcedenciaDatosObj)
              ? item.paisDeProcedenciaDatosObj.map((a: { clave?: string }) => a?.clave || "")
              : [],
            tipoProductoDescripcionOtros: "Analgésico",
            nombreCortoUsoEspecifico: item.usoEspecifico ?? "",
            fechaCaducidadStr: "31/12/2026"
          }))
        : [],
      representanteLegal: {
        rfc: this.solicitudDatos.rfc ?? "REPR890123ABC",
        resultadoIDC: "",
        nombre: this.solicitudDatos.nombre ?? "Juan Carlos",
        apellidoPaterno: this.solicitudDatos.apellidoPaterno ?? "García",
        apellidoMaterno: this.solicitudDatos.apellidoMaterno ?? "López"
      },
      solicitud: {
        discriminatorValue: 260513,
        declaracionesSeleccionadas: this.solicitudDatos.mensaje ?? true,
        regimen: this.solicitudDatos.regimen ?? "01",
        aduanaAIFA: "140",
        informacionConfidencial: true
      },
    
    };
  }

}
