import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  SECCIONES_TRAMITE_5701,
  SeccionLibQuery, SeccionLibState,
  SeccionLibStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';
import { GuardaSolicitudService } from '../../../../core/services/5701/guardar/guarda-solicitud.service';
import { Solicitud5701State } from '../../../../core/estados/tramites/tramite5701.store';
import { SolicitudPayload } from '../../../../core/models/5701/solicitud-payload.model';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent implements OnInit {
  pasos: ListaPasosWizard[] = PASOS;
  indice: number = 1;
  public seccion!: SeccionLibState;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud utilizado en el componente.
   */
  public solicitudState!: Solicitud5701State;

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private tramite5701Query: Tramite5701Query,
    private guardarSolicitudService: GuardaSolicitudService,
  ) {

  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método, se suscribe al estado de la sección utilizando `selectSeccionState$` 
   * y actualiza la propiedad `seccion` con el estado recibido. La suscripción se 
   * completa cuando se emite `destroyNotifier$` para evitar fugas de memoria.
   * 
   * Además, llama al método `asignarSecciones` para realizar asignaciones adicionales.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  /**
   * Selecciona una pestaña específica y actualiza el índice actual.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Actualiza el valor del índice basado en la acción del botón y navega en el componente wizard.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción del botón.
   * 
   * Si el valor del botón está entre 1 y 4, actualiza el índice con el valor del botón.
   * Si la acción es 'cont', avanza al siguiente paso del wizard.
   * Si la acción no es 'cont', retrocede al paso anterior del wizard.
   */
  getValorIndice(e: AccionBoton): void {
    // Nos encontramos en el paso 1, se guarda parcialmente la información.
    if (this.indice === 1) {
      this.enviaSolicitudRequest();
    }
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  private enviaSolicitudRequest(): void {
    const CONSTRUYE_SOLICITUD_PAYLOAD: SolicitudPayload = {
      id_solicitud: 1,
      datos_tramite: {
        importador_exportador: {
          rfc: this.solicitudState.RFCImportadorExportador,
          nombre: this.solicitudState.nombre,
          industria_automotriz: this.solicitudState.industriaAutomotriz,
          desc_industrial_automotriz: this.solicitudState.descripcionIndustrialAutomotriz,
          programa_fomento: this.solicitudState.programa,
          desc_programa_fomento: this.solicitudState.descripcionProgramaFomento,
          immex: this.solicitudState.checkIMMEX,
          desc_inmex: this.solicitudState.descripcionImmex,
          numero_registro: true,
          desc_numero_registro: this.solicitudState.descripcionNumeroRegistro,
          certificacion_a: this.solicitudState.tipoEmpresaCertificada === 'a' ? true : false,
          certificacion_aa: this.solicitudState.tipoEmpresaCertificada === 'aa' ? true : false,
          certificacion_aaa: this.solicitudState.tipoEmpresaCertificada === 'aaa' ? true : false,
          socio_comercial: this.solicitudState.socioComercial,
          id_socio_comercial: this.solicitudState.idSocioComercial,
          oea: this.solicitudState.certificacionOEA,
          revision_origen: this.solicitudState.revision,
        },
        despacho: {
          aduana_despacho: this.solicitudState.aduanaDespacho,
          id_seccion_despacho: parseInt(this.solicitudState.idSeccionDespacho, 10),
          bln_lda: this.solicitudState.lda,
          rfc_despacho: this.solicitudState.autorizacionLDA,
          bln_dd: this.solicitudState.dd,
          folio_ddex: this.solicitudState.autorizacionDDEX,
          tipo_despacho: this.solicitudState.tipoDespacho,
          nombre_recinto: this.solicitudState.nombreRecinto,
          domicilio: this.solicitudState.domicilioDespacho,
          especifique: '',
          fecha_inicio: this.solicitudState.fechaInicio,
          fecha_final: this.solicitudState.fechaFinal,
          hora_inicio: this.solicitudState.horaInicio,
          hora_fin: this.solicitudState.horaFinal,
          tipo_operacion: this.solicitudState.tipoOperacion,
          encargo_conferido: this.solicitudState.encargoConferido,
          relacion: this.solicitudState.relacionSociedad,
          bln_despacho: true,
        },
        pedimentos:
          [
            {
              id_pedimento: 1,
              id_solicitud: parseInt(this.solicitudState.idSolicitud, 10),
              numero_pedimento: this.solicitudState.idPedimento,
              patente: this.solicitudState.patentePedimento,
              pedimento: '',
              aduana: this.solicitudState.aduanaDespacho,
              tipo_pedimento: this.solicitudState.tipoPedimento,
              numeros: this.solicitudState.numero.toString(),
              cove: this.solicitudState.comprobanteValor,
              bln_activo: true,
              fecha_edo_ws_pedimento: '',
              estado_pedimento: 1,
              sub_estado_pedimento: 2,
              bln_valido_pedimento: this.solicitudState.pedimentoValidado,
            }
          ],
        tipo_servicio: {
          id_solicitud: parseInt(this.solicitudState.idSolicitud, 10),
          bln_activo: false,
          cve_tipo_servicio: 0,
          desc_tipo_servicio: '',
          numero_svex: '',
          rni: 0,
          fecha_inicio_servicio: this.solicitudState.fechaInicio,
          fecha_fin_servicio: this.solicitudState.fechaFinal,
          hora_inicio_servicio: this.solicitudState.horaInicio,
          hora_fin_servicio: this.solicitudState.horaFinal,
          patente: 1,
          id_patentes_aduanales: 1,
        },
        lista_pagos: [{
          id_solicitud: parseInt(this.solicitudState.idSolicitud, 10),
          linea_captura: this.solicitudState.lineaCaptura,
          monto: parseFloat(this.solicitudState.monto),
          bln_activo: true,
          id_modulo: 1,
          cve_modulo: "cve1",
        }],
        mercancias: {
          pais_origen: this.solicitudState.paisOrigen.toString(),
          descripcion_generica: this.solicitudState.descripcionGenerica,
          justificacion: this.solicitudState.justificacion,
          pais_procedencia: this.solicitudState.paisProcedencia.toString(),
        },
      }
    };

    this.guardarSolicitudService.postSolicitud(CONSTRUYE_SOLICITUD_PAYLOAD)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .subscribe();
  }

  /**
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    for (const LLAVE_SECCION in SECCIONES_TRAMITE_5701.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(SECCIONES_TRAMITE_5701.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(SECCIONES_TRAMITE_5701.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}
