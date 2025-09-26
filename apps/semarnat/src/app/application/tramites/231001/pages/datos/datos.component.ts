import {
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  Usuario,
  WizardComponent,
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MSG_REGISTRO_EXITOSO, USUARIO_INFO } from '../../enum/enum-tramite';
import {
  Solicitud231001State,
  Tramite231001Store,
} from '../../estados/tramites/tramite231001.store';

import { Observable, Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { AVISO } from '../../models/datos.model';
import { GuardarService } from '../../services/guardar.service';
import { GuardarSolicitud231001Request } from '../../models/guardar-solicitud-request';
import { PASOS } from '../../enum/pasos.enum';
import { ResultadoSolicitud } from '../../models/ResultadoSolicitud';
import { SolicitanteDatosTabsComponent } from '../solicitante-datos-tabs/solicitante-datos-tabs.component';
import { Tramite231001Query } from '../../estados/queries/tramite231001.query';

/**
 * Interface representing the action of a button.
 */
interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

/** Representa la forma cruda que puede venir desde el backend */
interface ErrorModeloRaw {
  campo?: string;
  errores?: string | string[] | null | undefined;
}

/** Forma normalizada que usa el componente */
interface ErrorModelo {
  campo: string;
  errores: string[];
}

/**
 *  DatosComponent
 * app-datos
 * ./datos.component.html
 *
 *
 *
 * Componente Angular para manejar los datos del wizard.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``,
})
export class DatosComponent implements OnInit, OnDestroy {
  constructor(
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store,
    private guardarService: GuardarService
  ) {}

  @Output() cargarArchivosEvento = new EventEmitter<void>();

  @Input() idTipoTRamite!: string;
  datosUsuario: Usuario = USUARIO_INFO;
  public infoAlert = 'alert-info';

  TEXTOS = AVISO.Aviso;

  /**
   * Evento que se emite para regresar a la sección de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
   */
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;
  private destroyed$ = new Subject<void>();
  public nuevaNotificacion: Notificacion | null = null;
  public alertaNotificacion!: Notificacion;
  public solicitudState!: Solicitud231001State;

  ngOnInit(): void {
    this.obtenerEstadoSolicitud();
  }

  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$
      ?.pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  siguiente(): void {
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
  /**
   *  texto
   *  Texto del aviso de privacidad.
   */
  texto: string = 'Aviso de Privacidad simplificado';
  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   *  Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property aviso
   * @type {string}
   *  Texto del aviso de privacidad en formato HTML.
   */

  aviso = AVISO.Aviso;

  public folioTemporal: number = 0;

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = `<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   *  Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property indice
   * @type {number}
   *  El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: SolicitanteDatosTabsComponent;

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   * }
   */
  esFormaValido: boolean = true;

  /**
   * The data for the steps in the wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
    if (this.indice === 1) {
      const FORM_VALIDO = this.pasoUnoComponent?.validarTodosLosFormularios();
      this.esFormaValido = FORM_VALIDO;
      if (!FORM_VALIDO) {
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      this.ejecutaPostGuardar(e);
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }

  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
  alCambiarPestana(): void {
    this.esFormaValido = true;
  }

  ejecutaEnviarSolicitud(): Observable<ResultadoSolicitud> {
    const PAYLOAD: GuardarSolicitud231001Request = {
      solicitante: {
        rfc: 'AAL0409235E6',
        nombre: 'IGNACIO EDUARDO',
        es_persona_moral: true,
        certificado_serial_number: '3082054030820428a00302010',
      },
      aduana_solicitud: {
        cve_aduana: this.solicitudState.aduana.padStart(3, '0'),
      },
      descripcionGenerica1: this.solicitudState.descripcionGenerica1,
      id_solcitud: null,
      mercancias: this.solicitudState.mercancias.map((item) => ({
        cantidad_en_letra: item.cantidadEnLetra,
        capitulo_fraccion: item.capituloFraccion,
        cve_partida: item.clavePartida,
        cve_subpartida: item.claveSubPartida,
        desc_fraccion: item.descFraccion,
        desc_unidad_medida_comercial: item.descUnidadMedida,
        descripcion_mercancia: item.descripcionMercancia,
        generica2: item.descFraccion,
        cantidad: item.generica2,
        cve_unidad_medida_comercial: item.unidadMedidaComercialClave,
      })),
      numeroProgramaImmex: this.solicitudState.numeroProgramaImmex,
      numeroRegistroAmbiental: this.solicitudState.numeroRegistroAmbiental,
    };

    return this.guardarService.postSolicitud(PAYLOAD).pipe(
      map((response) => {
        if (response.codigo === '00' && response.datos?.id_solicitud) {
          this.tramite231001Store.setIdSolicitud(response.datos.id_solicitud);
          this.folioTemporal = response.datos.id_solicitud;
          return { exito: true };
        }

        const MENSAJE =
          response?.error ||
          response?.mensaje ||
          response?.causa ||
          'Ocurrió un error al guardar la solicitud.';

        const ERRORESMODELO: ErrorModelo[] = (
          (response?.errores_modelo ?? []) as ErrorModeloRaw[]
        ).map((err) => {
          const CAMPO = typeof err?.campo === 'string' ? err.campo : 'general';
          const RAW_ERRORES = err?.errores;
          const ERRORES = Array.isArray(RAW_ERRORES)
            ? RAW_ERRORES.map(String)
            : RAW_ERRORES === null
            ? [String(RAW_ERRORES)]
            : [];
          return { campo: CAMPO, errores: ERRORES };
        });

        return {
          exito: false,
          MENSAJE,
          erroresModelo: ERRORESMODELO,
        } as ResultadoSolicitud;
      }),
      catchError((error) => {
        const MENSAJE =
          error?.error?.error ||
          error?.message ||
          'Error inesperado al guardar la solicitud.';

        return of({
          exito: false,
          MENSAJE,
          erroresModelo: error?.error?.errores_modelo || [],
        });
      }),
      takeUntil(this.destroyed$)
    );
  }

  ejecutaPostGuardar(e: AccionBoton): void {
    if (this.indice === 1) {
      this.ejecutaEnviarSolicitud()
        .pipe(
          takeUntil(this.destroyed$),
          tap((respuesta) => {
            if (!respuesta.exito) {
              console.error('entra aqui');

              const ERRORESEXTRA = (respuesta.erroresModelo || [])
                .map((err) => `${err.campo}: ${err.errores.join(', ')}`)
                .join('<br>');

              const MENSAJEFINAL = `${
                respuesta.mensaje || 'Error inesperado al enviar la solicitud.'
              }${ERRORESEXTRA}`;

              this.nuevaNotificacion = {
                tipoNotificacion: 'toastr',
                categoria: CategoriaMensaje.ERROR,
                modo: 'action',
                titulo: 'Error',
                mensaje:
                  MENSAJEFINAL || 'Error inesperado al enviar la solicitud.',
                cerrar: false,
                txtBtnAceptar: '',
                txtBtnCancelar: '',
              };

              setTimeout(
                () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                0
              );
              this.indice = 1;
              this.wizardComponent.indiceActual = 1;
              this.actualizarDatosPasos();
              return;
            }

            if (e.valor > 0 && e.valor < 5) {
              this.alertaNotificacion = {
                tipoNotificacion: 'banner',
                categoria: 'success',
                modo: 'action',
                titulo: '',
                mensaje: MSG_REGISTRO_EXITOSO(String(this.folioTemporal)),
                cerrar: true,
                txtBtnAceptar: '',
                txtBtnCancelar: '',
              };
              this.indice = e.valor;
              this.actualizarDatosPasos();
              if (e.accion === 'cont') {
                this.wizardComponent.siguiente();
              } else {
                this.wizardComponent.atras();
              }
            }
          }),
          catchError((err) => {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: '',
              mensaje:
                err?.mensaje || 'Error inesperado al enviar la solicitud.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            setTimeout(
              () => window.scrollTo({ top: 0, behavior: 'smooth' }),
              0
            );
            return of(false);
          })
        )
        .subscribe();
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }
}
