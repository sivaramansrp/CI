import { Component, OnDestroy, ViewChild } from '@angular/core';

import { AVISO, FIRMAR, ListaPasosWizard, RegistroSolicitudService } from '@libs/shared/data-access-user/src';
import { Observable, Subject, catchError, map, switchMap, take, takeUntil, throwError } from 'rxjs';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { DatosComponent } from '../datos/datos.component';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { GuardarMappingAdapter } from '../../adapters/guardar-mapping.adapter';
import { OCTA_TEMPO } from '@libs/shared/data-access-user/src/core/services/130102/octava-temporal.enum';
import { ServiciosService } from '../../../../shared/services/servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite140101Query } from '../../../../estados/queries/tramite140101.query';
import { Tramite140101Store } from '../../../../estados/tramites/tramite140101.store';
import { WizardComponent } from '@libs/shared/data-access-user/src';


/**
 * Componente que representa la página del solicitante dentro del flujo de trámites.
 * Este componente utiliza un wizard para guiar al usuario a través de diferentes pasos.
 * 
 * @component
 * @selector app-solicitante-de-page
 * @templateUrl ./solicitante-page.component.html
 */
@Component({
  // Selector utilizado para identificar el componente en el HTML.
  selector: 'app-solicitante-de-page',

  // Ruta del archivo de plantilla HTML asociado al componente.
  templateUrl: './solicitante-page.component.html',
})

// Definición de la clase del componente.
export class SolicitantePageComponent implements OnDestroy {
  /**
   * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
   * Inicializa con los valores de OCTA_TEMPO.
   */
  pantallasPasos: ListaPasosWizard[] = OCTA_TEMPO;

  /**
   * @property {number} indice - El índice actual del paso.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
  public TEXTOS = {
    AVISO,
    FIRMAR,
  };

  /**
   * Referencia al componente del wizard para controlar su comportamiento.
   * Permite acceder a métodos como avanzar o retroceder pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

   /**
     * Mensaje de error para validación de formularios.
     * @type {string}
     */
   public formErrorAlert!:string;
  
   /**
     * Controla la visibilidad del mensaje de error.
   * @type {boolean}
   */
  esFormaValido: boolean = true;

  /**
     * ID del estado de la solicitud.
     * @type {number | null}
     */
    idSolicitudState: number | null = 0;

  /**
   * Identificador del tipo de trámite.
   * @type {string}
   */
  idTipoTramite: string = '140101';

  /**
     * Notificador para la destrucción del componente.
     */
  destroyNotifier$: Subject<void> = new Subject();

    /**
   * Clase CSS para mostrar una alerta de error.
   * @type {string}
   */
  infoError = 'alert-danger';

  
    /**
     * Referencia al componente `datosComponent`.
     */
    @ViewChild('datosComponent', { static: false }) datosComponent: DatosComponent | undefined;
  

  constructor(
    private toastrService: ToastrService,
    private tramite140101Store: Tramite140101Store,
    private tramite140101Query: Tramite140101Query,
    private registroSolicitudService: RegistroSolicitudService,
  ) {

  }

  /**
   * @property {DatosPasos} datosPasos - Objeto que contiene información sobre los pasos del wizard.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   * Se inicializa con los valores predeterminados.
   */
    datosPasos: DatosPasos = {
    // Número total de pasos en el wizard, basado en la longitud del array `pantallasPasos`.
    nroPasos: this.pantallasPasos.length,

    // Índice actual del paso, inicializado con el valor de la propiedad `indice`.
    indice: this.indice,

    // Texto del botón para retroceder al paso anterior.
    txtBtnAnt: 'Anterior',

    // Texto del botón para avanzar al siguiente paso.
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza la propiedad `indice` en función del valor del objeto `AccionBoton` proporcionado.
   * Si la propiedad `valor` de `AccionBoton` está entre 1 y 4 (inclusive), establece `indice` en `valor`.
   * Dependiendo de la propiedad `accion` de `AccionBoton`, avanza o retrocede el componente wizard.
   *
   * @param {AccionBoton} e - Objeto que contiene las propiedades `valor` y `accion`.
   * @returns {void}
   */
  
  getValorIndice(e: AccionBoton): void {
      if (this.indice === 1) {
        const FORM_VALIDO = this.datosComponent?.validarFormularios() || false;
        const FORMFIELDVALIDO = this.datosComponent?.formFieldValidado;
        this.esFormaValido = FORM_VALIDO;
        if(!FORMFIELDVALIDO) {
          this.datosPasos.indice = 1;
          this.formErrorAlert = `<div class="text-center">Faltan campos por capturar.</div>`;
          return;
        }
        if (!this.esFormaValido && FORMFIELDVALIDO) {
          const ERROR_SERVICIO_ALERT = `(Seleccione un programa para realizar la cancelación) es un campo requerido`
          this.datosPasos.indice = 1;
          this.formErrorAlert = ServiciosService.generarAlertaDeError(ERROR_SERVICIO_ALERT);
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          return;
        }
  
        this.onGuardar().pipe(
          takeUntil(this.destroyNotifier$)
        ).subscribe({
          next: (respuesta: BaseResponse<{ id_solicitud: number }>) => {
            if (respuesta.codigo !== '00') {
              const ERROR_MESSAGE = respuesta.error || 'Error desconocido en la solicitud';
              this.formErrorAlert = ServiciosService.generarAlertaDeError(ERROR_MESSAGE);
              this.esFormaValido = false;
              this.indice = 1;
              this.datosPasos.indice = 1;
              this.wizardComponent.indiceActual = 1;
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
              return;
            }
              this.esFormaValido = true;
              this.indice = e.valor;
              this.datosPasos.indice = this.indice;
              this.wizardComponent.siguiente();
              if (respuesta.datos?.id_solicitud) {
                this.idSolicitudState = respuesta.datos.id_solicitud;
                this.tramite140101Store.setIdSolicitud(respuesta.datos.id_solicitud);
              }
              this.toastrService.success(respuesta.mensaje);
          },
          error: () => {
            this.esFormaValido = false;
            const ERROR_MESSAGE = 'Error desconocido en la solicitud';
              this.formErrorAlert = ServiciosService.generarAlertaDeError(ERROR_MESSAGE);
            this.indice = 1;
            this.datosPasos.indice = this.indice;
            this.wizardComponent.indiceActual = 1;
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          }
        });
        
      } else {
        if (e.valor > 0 && e.valor < 5) {
          this.indice = e.valor;
          if (e.accion === 'cont') {
            this.wizardComponent.siguiente();
          } else {
            this.wizardComponent.atras();
          }
        }
      }
    }

    /**
       * Guarda la solicitud de ampliación de servicios utilizando el adaptador para convertir el estado
       * y enviar los datos al servidor.
       * @returns {Observable<BaseResponse<{ id_solicitud: number }>>}
       */
      onGuardar(): Observable<BaseResponse<{ id_solicitud: number }>> {
        return this.tramite140101Query.selectSolicitud$.pipe(
          take(1), // Tomar solo el primer valor para evitar loops
          map(ESTADO_ACTUAL => GuardarMappingAdapter.toFormPayload(ESTADO_ACTUAL)),
          switchMap(FORM_PAYLOAD => {
            return (this.registroSolicitudService.postGuardarDatos(this.idTipoTramite, FORM_PAYLOAD) as Observable<BaseResponse<{ id_solicitud?: number }>>).pipe(
              map((response: BaseResponse<{ id_solicitud?: number }>) => {
                return {
                  ...response,
                  datos: {
                    id_solicitud: response.datos?.id_solicitud ?? 0
                  }
                };
              })
            );
          }),
          catchError(error => {
            console.error('Error al guardar:', error);
            return throwError(() => error);
          })
        );
      }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores
   * que deben limpiar recursos o cancelar suscripciones, y luego completa el observable.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
