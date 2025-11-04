import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Observable, catchError, map, switchMap, take, throwError } from 'rxjs';

import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { RegistroSolicitudService } from '@libs/shared/data-access-user/src/core/services/shared/registro-solicitud.service';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

import { AmpliacionServiciosAdapter } from '../../adapters/ampliacion-servicios.adapter';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-sanitario',
  templateUrl: './sanitario.component.html',
})
export class SanitarioComponent {
  /**
   * Alerta de error para mostrar mensajes en el formulario
   */
  formErrorAlert: { tipo: string; mensaje: string } | null = null;
   /**
   * ID del tipo de trámite.
   */
  idTipoTramite: string = '260215';

  /**
   * Flag to enable/disable API calls for testing navigation flow
   * Set to true when API endpoint is working correctly
   */
  private enableAPICall: boolean = true;

 /**
   * Evento para cargar archivos.
   */
  cargarArchivosEvento: EventEmitter<void> = new EventEmitter<void>();
    /**
   * Control para activar botón de carga de archivos.
   */
  activarBotonCargaArchivos: boolean = false;

    /**
   * Control de sección de carga de documentos.
   */
  seccionCargarDocumentos: boolean = false;

  /**
       * Indica si la carga de documentos está en progreso.
       * @type {boolean}
       */
      cargaEnProgreso: boolean = true;

  /**
   * @property {ListaPasosWizard[]} pasos - Lista de pasos para el asistente (wizard) del trámite sanitario.
   * Utiliza la constante PASOS para inicializar la secuencia de pasos que el usuario debe seguir.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual utilizado para controlar el estado o la posición dentro del componente.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * Referencia al componente `WizardComponent` dentro de la vista.
   * Permite acceder y manipular las funcionalidades del asistente de pasos (wizard)
   * desde el componente actual.
   *
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
   * ID de la solicitud.
   */
  idSolicitudState: number | null = null;

   constructor (private query : Tramite260215Query,
               private registroSolicitudService: RegistroSolicitudService,
               private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService
  ) {

  }

    getValorIndice(e: AccionBoton): void {
      if (e.accion === 'cont') {
        this.query.selectTramiteState$.pipe(
          take(1),
          map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
          switchMap(FORM_PAYLOAD => this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD)),
          catchError(error => {
            console.error('Error al guardar:', error);
            this.formErrorAlert = {
              tipo: 'danger',
              mensaje: 'Error al guardar: ' + (error?.message || 'Error desconocido'),
            };
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
            return throwError(() => error);
          })
        ).subscribe(response => {
          const SHOULD_NAVIGATE = response.codigo === '00';
          if (!SHOULD_NAVIGATE) {
            const ERROR_MESSAGE = response.error || 'Error desconocido en la solicitud';
            this.formErrorAlert = {
              tipo: 'danger',
              mensaje: ERROR_MESSAGE,
            };
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
            return;
          }
          // Si éxito, navega al siguiente paso
          if (e.valor > 0 && e.valor < 5) {
            this.indice = e.valor;
            this.datosPasos.indice = this.indice;
            if (this.wizardComponent) {
              this.wizardComponent.siguiente();
            }
          }
        });
      } else {
        if (e.valor > 0 && e.valor < 5) {
          this.indice = e.valor;
          if (this.wizardComponent) {
            this.wizardComponent.atras();
          }
        }
      }
    }

  /**
   * Guarda los datos del formulario utilizando el servicio estándar compartido.
   * Convierte el estado actual a payload y envía los datos al servidor.
   * @returns {Observable<BaseResponse<unknown>>}
   */
  guardarDatosAPI(): Observable<BaseResponse<unknown>> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return this.registroSolicitudService.postGuardarDatos('260215', FORM_PAYLOAD);
      }),
      catchError(error => {
        // eslint-disable-next-line no-console
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }

   /**
   * Maneja el evento de carga de documentos
   */
  manejaEventoCargaDocumentos(event: boolean): void {
    this.activarBotonCargaArchivos = event;
  }

      /**
   * Maneja cuando la carga se ha realizado
   */
  cargaRealizada(realizada: boolean): void {
    this.seccionCargarDocumentos = realizada ? false : true;
  }

    /**
   * Maneja el progreso de carga
   */
  onCargaEnProgreso(carga: boolean): void {
    // Implementar lógica de progreso si es necesario
     this.cargaEnProgreso = carga;
  }
   /**
   * Actualiza la sección de carga de documentos según el paso actual
   */
  private actualizarSeccionCargarDocumentos(): void {
    this.seccionCargarDocumentos = this.indice === 2;
  }
  
  /**
   * Maneja el clic en cargar archivos
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }
 /**
   * Botón siguiente para paso 2
   */
  /**
   * Maneja el click en 'Continuar': guarda datos y navega si éxito, muestra error si falla
   */
  continuarConGuardado(): void {
    this.query.selectTramiteState$.pipe(
      take(1),
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD)),
      catchError(error => {
        console.error('Error al guardar:', error);
        this.formErrorAlert = {
          tipo: 'danger',
          mensaje: 'Error al guardar: ' + (error?.message || 'Error desconocido'),
        };
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return throwError(() => error);
      })
    ).subscribe(response => {
  const SHOULD_NAVIGATE = response.codigo === '00';
  if (!SHOULD_NAVIGATE) {
        const ERROR_MESSAGE = response.error || 'Error desconocido en la solicitud';
        this.formErrorAlert = {
          tipo: 'danger',
          mensaje: ERROR_MESSAGE,
        };
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      // Si éxito, navega al siguiente paso
      this.indice = 3;
      this.datosPasos.indice = this.indice;
      this.actualizarSeccionCargarDocumentos();
      if (this.wizardComponent) {
        this.wizardComponent.siguiente();
      }
    });
  }
 /**
   * Botón anterior para paso 2
   */
  anterior(): void {
    this.indice = 1;
    this.datosPasos.indice = this.indice;
    this.actualizarSeccionCargarDocumentos();
    if (this.wizardComponent) {
      this.wizardComponent.atras();
    }
  }


  /**
   * Guarda la solicitud de ampliación de servicios utilizando el adaptador para convertir el estado
   * y enviar los datos al servidor.
   * @returns {Observable<BaseResponse<{ id_solicitud: number }>>}
   */
  onGuardar(): Observable<BaseResponse<{ id_solicitud: number }>> {
    return this.query.selectTramiteState$.pipe(
      take(1), // Tomar solo el primer valor para evitar loops
      map(ESTADO_ACTUAL => AmpliacionServiciosAdapter.toFormPayload(ESTADO_ACTUAL)),
      switchMap(FORM_PAYLOAD => {
        return (this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD) as Observable<BaseResponse<{ id_solicitud?: number }>>).pipe(
          map((response: BaseResponse<{ id_solicitud?: number }>) => {
            // Adapt the response to the expected type
            return {
              ...response,
              datos: {
                id_solicitud: response.datos?.id_solicitud ?? 0
              }
            } as BaseResponse<{ id_solicitud: number }>;
          })
        );
      }),
      catchError(error => {
        console.error('Error al guardar:', error);
        return throwError(() => error);
      })
    );
  }
}
