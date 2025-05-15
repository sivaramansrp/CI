import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  SECCIONES_TRAMITE_5701,
  SeccionLibQuery, SeccionLibState,
  SeccionLibStore,
  TercerosQuery,
  TercerosState,
  TercerosStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { ListPersonaNoti, PersonaResponsableDespacho, SolicitudPayload } from '../../../../core/models/5701/solicitud-payload.model';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud5701State, Tercero5701State } from '../../../../core/estados/tramites/tramite5701.store';
import { GuardaSolicitudService } from '../../../../core/services/5701/guardar/guarda-solicitud.service';
import { Pedimento } from '../../../../core/models/5701/solicitud-payload.model';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { TIPO_TRAMITE } from '../../../../core/enums/5701/tramite5701.enum';

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
  public tercerosState!: TercerosState;

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
    private terceros5701Store: TercerosStore,
    private tercerosQuery: TercerosQuery,
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


    this.tercerosQuery.selectTerceros$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((tercerosState) => {
          this.tercerosState = tercerosState;
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
    const RESPONSABLES_DESPACHO: PersonaResponsableDespacho[] = this.solicitudState.personasResponsablesDespacho.map((persona) => {
      return {
        gafete: persona.gafeteRespoDespacho,
        nombre: persona.nombre,
        apellido_paterno: persona.primerApellido,
        apellido_materno: persona.segundoApellido,
      };
    });

    const PERSONAS_NOTIFICACION: ListPersonaNoti[] = this.tercerosState.terceros.map((persona, i) => {
      return {
        id_persona_noti: i + 1,
        correo_electronico: persona.nombre,
        nombreTercero: persona.correo,
      };
    });

    const PEDIMENTOS_LISTA: Pedimento[] = this.solicitudState.pedimentos.map((pedimento, i) => {
      return {
        id_pedimento: i + 1,
        patente: pedimento.patente,
        pedimento: pedimento.pedimento.toString(),
        aduana: pedimento.aduana.toString(),
        tipo_pedimento: pedimento.tipoPedimento.toString(),
        numeros: pedimento.numero,
        cove: pedimento.comprobanteValor,
        estado_pedimento: parseInt(pedimento.estadoPedimento, 10),
        sub_estado_pedimento: parseInt(pedimento.subEstadoPedimento, 10),
        numero_pedimento: pedimento.pedimento,
        tipo_pedimento_por_evaluacion: '',
        bln_valido_pedimento: pedimento.pedimentoValidado === 'SI' ? true : false,
        fecha_edo_ws_pedimento: '',
        bln_activo: false,
      }
    });

    const CONSTRUYE_SOLICITUD_PAYLOAD: SolicitudPayload = {
      id_solicitud: this.solicitudState.idSolicitud,
      id_tipo_tramite: TIPO_TRAMITE,
      costo_total: '',
      rfc: '', //Este viene del store con los datos del inicio de sesión
      representante_legal: {
        rfc: '',
        telefono: '',
        nombre: '',
        ap_paterno: '',
        ap_materno: '',

      },
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
          numero_registro: this.solicitudState.descripcionNumeroRegistro !== '' ? true : false,
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
          rfc_despacho_lda: this.solicitudState.autorizacionLDA,
          bln_dd: this.solicitudState.dd,
          folio_ddex: this.solicitudState.autorizacionDDEX,
          tipo_despacho: this.solicitudState.descripcionTipoDespacho,
          nombre_recinto: this.solicitudState.nombreRecinto,
          domicilio: this.solicitudState.domicilioDespacho,
          especifique: this.solicitudState.especifique,
          fecha_inicio: this.solicitudState.fechaInicio,
          fecha_final: this.solicitudState.fechaFinal,
          hora_inicio: this.solicitudState.horaInicio,
          hora_fin: this.solicitudState.horaFinal,
          tipo_operacion: this.solicitudState.tipoOperacion,
          encargo_conferido: this.solicitudState.encargoConferido,
          relacion: this.solicitudState.relacionSociedad,
          bln_despacho: true,
        },
        pedimentos: PEDIMENTOS_LISTA,
        tipo_servicio: {
          bln_activo: false,
          cve_tipo_servicio: this.solicitudState.tipoSolicitud,
          desc_tipo_servicio: this.solicitudState.descripcionTipoSolicitud,
          numero_svex: '',
          rni: 0,
          fecha_inicio_servicio: this.solicitudState.fechaInicio,
          fecha_fin_servicio: this.solicitudState.fechaFinal,
          hora_inicio_servicio: this.solicitudState.horaInicio,
          hora_fin_servicio: this.solicitudState.horaFinal,
          patente: parseInt(this.solicitudState.patente.patente, 10),
          id_patentes_aduanales: 1,
        },
        lista_pagos: [{
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
        tipo_transporte_despacho: this.solicitudState.tipoTransporte,
        list_transporte_despacho: this.solicitudState.transporte,
        tipo_transporte_arribo: this.solicitudState.tipoTransporteArriboSalida,
        list_unidad_arribo: this.solicitudState.transporteArriboDatos,
        persona_responsable: RESPONSABLES_DESPACHO,
        list_persona_noti: PERSONAS_NOTIFICACION,
      }
    };

    this.guardarSolicitudService.postSolicitud(CONSTRUYE_SOLICITUD_PAYLOAD)
      .pipe(
        map((response) => {
          return response;
        }),
        takeUntil(this.destroyNotifier$),
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
