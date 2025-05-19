import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  SECCIONES_TRAMITE_5701,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TercerosQuery,
  TercerosState,
  TercerosStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import {
  ListPersonaNoti,
  PersonaResponsableDespacho,
  SolicitudPayload,
} from '../../../../core/models/5701/solicitud-payload.model';
import { map, Subject, takeUntil } from 'rxjs';
import {
  Solicitud5701State,
  Tercero5701State,
} from '../../../../core/estados/tramites/tramite5701.store';
import { GuardaSolicitudService } from '../../../../core/services/5701/guardar/guarda-solicitud.service';
import { Pedimento } from '../../../../core/models/5701/solicitud-payload.model';
import {
  CVE_UNIDAD_ADMIN,
  TIPO_TRAMITE,
} from '../../../../core/enums/5701/tramite5701.enum';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Contiene la lista de pasos del wizard.
   * Se inicializa con la constante PASOS importada desde el archivo correspondiente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Contiene el índice del paso actual, para las navs-tabs del paso uno.
   * Se inicializa en 1
   */
  indice: number = 1;

  /**
   * Contiene el estado de la sección actual.
   * Se inicializa como un objeto vacío.
   */
  public seccion!: SeccionLibState;

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * Se completa al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud utilizado en el componente.
   */
  public solicitudState!: Solicitud5701State;

  /**
   * Estado de los terceros utilizado en el componente.
   */
  public tercerosState!: TercerosState;

  /**
   * Referencia al componente WizardComponent, que se utiliza para navegar entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Emite un evento cuando el boton de carga de archivos es presionado.
   * Este evento es escuchado por el componente <anexar-documentos> para iniciar la carga de archivos.
   */
  @Output() cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Emite un evento cuando el boton de Anterior es presionado
   * Este evento es escuchado por el componente <anexar-documentos> para regresar a la sección de carga de documentos.
   */
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

  /**
   * Representa los datos de configuración para los pasos de un proceso.
   * @property nroPasos - Número total de pasos.
   * @property indice - Índice actual del paso.
   * @property txtBtnAnt - Texto del botón "Anterior".
   * @property txtBtnSig - Texto del botón "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private tramite5701Query: Tramite5701Query,
    private tercerosQuery: TercerosQuery,
    private guardarSolicitudService: GuardaSolicitudService
  ) {}
  
  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * En este método, se suscribe al estado de la sección utilizando `selectSeccionState$`
   * y actualiza la propiedad `seccion` con el estado recibido. La suscripción se
   * completa cuando se emite `destroyNotifier$` para evitar fugas de memoria.
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
    const RESPONSABLES_DESPACHO: PersonaResponsableDespacho[] =
      this.solicitudState.personasResponsablesDespacho.map((persona) => {
        return {
          gafete: persona.gafeteRespoDespacho,
          nombre: persona.nombre,
          apellido_paterno: persona.primerApellido,
          apellido_materno: persona.segundoApellido,
        };
      });

    const PERSONAS_NOTIFICACION: ListPersonaNoti[] =
      this.tercerosState.terceros.map((persona, i) => {
        return {
          id_persona_noti: i + 1,
          correo_electronico: persona.nombre,
          nombreTercero: persona.correo,
        };
      });

    const PEDIMENTOS_LISTA: Pedimento[] = this.solicitudState.pedimentos.map(
      (pedimento, i) => {
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
          bln_valido_pedimento:
            pedimento.pedimentoValidado === 'SI' ? true : false,
          fecha_edo_ws_pedimento: '',
          bln_activo: false,
        };
      }
    );

    const CONSTRUYE_SOLICITUD_PAYLOAD: SolicitudPayload = {
      id_solicitud: this.solicitudState.idSolicitud,
      id_tipo_tramite: TIPO_TRAMITE,
      cve_unidad_administrativa: CVE_UNIDAD_ADMIN, //TODO: Este campo se va a eliminar
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
          desc_industrial_automotriz:
            this.solicitudState.descripcionIndustrialAutomotriz,
          programa_fomento: this.solicitudState.programa,
          desc_programa_fomento: this.solicitudState.descripcionProgramaFomento,
          immex: this.solicitudState.checkIMMEX,
          desc_inmex: this.solicitudState.descripcionImmex,
          numero_registro:
            this.solicitudState.descripcionNumeroRegistro !== '' ? true : false,
          desc_numero_registro: this.solicitudState.descripcionNumeroRegistro,
          certificacion_a:
            this.solicitudState.tipoEmpresaCertificada === 'a' ? true : false,
          certificacion_aa:
            this.solicitudState.tipoEmpresaCertificada === 'aa' ? true : false,
          certificacion_aaa:
            this.solicitudState.tipoEmpresaCertificada === 'aaa' ? true : false,
          socio_comercial: this.solicitudState.socioComercial,
          id_socio_comercial: this.solicitudState.idSocioComercial,
          oea: this.solicitudState.certificacionOEA,
          revision_origen: this.solicitudState.revision,
        },
        despacho: {
          aduana_despacho: this.solicitudState.aduanaDespacho,
          id_seccion_despacho: parseInt(
            this.solicitudState.idSeccionDespacho,
            10
          ),
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
        lista_pagos: [
          {
            linea_captura: this.solicitudState.lineaCaptura,
            monto: parseFloat(this.solicitudState.monto),
            bln_activo: true,
            id_modulo: 1,
            cve_modulo: 'cve1',
          },
        ],
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
      },
    };

    this.guardarSolicitudService
      .postSolicitud(CONSTRUYE_SOLICITUD_PAYLOAD)
      .pipe(
        map((response) => {
          return response;
        }),
        takeUntil(this.destroyNotifier$)
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
      if (
        Object.prototype.hasOwnProperty.call(
          SECCIONES_TRAMITE_5701.PASO_1,
          LLAVE_SECCION
        )
      ) {
        // @ts-expect-error - fix this
        SECCIONES.push(SECCIONES_TRAMITE_5701.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }

  /**
   * Emite un evento para cargar archivos.
   * @returns {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * @returns {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * @returns {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado del botón de carga de archivos.
   * @param carga - Indica si la carga de documentos está activa o no.
   * @returns {void} No retorna ningún valor.
   */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Método para manejar el evento de regreso a la sección de carga de documentos.
   * Emite un evento para regresar a la sección de carga de documentos.
   * @returns {void} No retorna ningún valor.
   */
  anteriorSeccionCargarDocumento(): void {
    this.regresarSeccionCargarDocumentoEvento.emit();
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   * @param cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * @returns {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }
}
