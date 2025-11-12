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
      mercancias: (this.solicitudDatos.mercanciaTabla ?? []).map((m: any) => ({
        idMercancia: m.idMercancia ?? "",
        nombreComercial: m.nombreComercial ?? "",
        nombreComun: m.nombreComun ?? "",
        nombreCientifico: m.nombreCientifico ?? "",
        acondicionamiento: m.acondicionamiento ?? "",
        estadoFisico: m.estadoFisico ?? "",
        estadoFisicoDescripcionOtros: m.estadoFisicoOtro ?? "",
        fraccionArancelaria: {
          clave: m.fraccionArancelaria ?? "",
          descripcion: m.descripcionFraccion ?? ""
        },
        unidadMedidaComercial: {
          descripcion: m.UMC ?? ""
        },
        cantidadUMCConComas: m.cantidadUMC ?? "",
        unidadMedidaTarifa: {
          descripcion: m.UMT ?? ""
        },
        cantidadUMTConComas: m.cantidadUMT ?? "",
        presentacion: m.presentacion ?? "",
        registroSanitarioConComas: m.numeroRegistroSanitario ?? "",
        nombreCortoPaisOrigen: m.paisDeOriginDatos?.toString() ?? "",
        nombreCortoPaisProcedencia: m.paisDeProcedenciaDatos?.toString() ?? "",
        porcentajeConcentracion: m.porcentajeConcentracion ?? "",
        fechaCaducidadStr: m.fechaCaducidad ?? ""
      })),
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
      datosSCIAN: this.solicitudDatos.nicoTabla ?? []
      };
    }
    
  }
  