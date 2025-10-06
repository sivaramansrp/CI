/**
 * @fileoverview
 * El `RegistroPageComponent` es el componente principal para gestionar el formulario de registro de solicitud IMMEX modalidad ampliación 3R's.
 * Este componente utiliza un asistente (wizard) para controlar la navegación entre los pasos del formulario y gestionar la información mostrada.
 * 
 * @module RegistroPageComponent
 * @description
 * Este componente permite la navegación entre los pasos del formulario, muestra alertas según el estado del servicio y gestiona los datos
 * relacionados con el registro de la solicitud IMMEX.
 */

import { ALERT, ERROR_FORMA_ALERT } from '../../constantes/modificacion.constants';
import { AVISO, RegistroSolicitudService, esValidObject, getValidDatos} from '@ng-mf/data-access-user';
import { AmpliacionServiciosState, Tramite80206Store } from '../../estados/tramite80206.store';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { ChangeDetectorRef } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/modificacion.constants';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { WizardComponent } from '@ng-mf/data-access-user';
import { buildGuardarPayload } from '../../mappers/guardar.mapper';
/**
 * Interfaz para manejar las acciones de los botones del asistente.
 * @interface AccionBoton
 */
interface AccionBoton {
  /**
   * Acción del botón (e.g., "cont" para continuar, "atras" para retroceder).
   * @property {string} accion
   */
  accion: string;

  /**
   * Valor asociado a la acción (índice del paso).
   * @property {number} valor
   */
  valor: number;
}

@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
})
export class RegistroPageComponent implements OnInit, OnDestroy {
  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Notificador para gestionar la destrucción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje
   */
  tituloMensaje: string | null = "Registro de solicitud IMMEX modalidad ampliación 3R's";

  /**
   * Constantes de alerta.
   * @property {any} alert
   */
  alert = ALERT;

  /**
   * Clase CSS para mensajes de alerta.
   * @property {string} dangerClass
   */
  dangerClass = 'alert-danger';

  /**
   * Referencia al componente Wizard para controlar la navegación.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild('wizardRef') wizardComponent!: WizardComponent;

  /**
   * Índice actual del paso.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Configuración para los botones del asistente.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Textos constantes utilizados en el componente.
   * @property {any} TEXTOS
   */
  TEXTOS = AVISO;

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito
   */
  mensajeDeTextoDeExito: string = "MENSAJE_DE_ÉXITO_ETAPA_UNO";

  /**
   * Controla la visibilidad de las alertas.
   * @property {boolean} mostrarAlerta
   */
  mostrarAlerta: boolean = false;

   /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
   /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;

  /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;
  
  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;
  
    /**
  * URL de la página actual.
  */
  public solicitudState!: AmpliacionServiciosState;

  /*
  * Indica si hay una carga en progreso.
  */
  cargaEnProgreso: boolean = true;
  /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const isValid = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 */
esFormaValido: boolean = false;

tramiteId: string = '80206';
  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Constructor del componente.
   * @constructor
   * @param {AmpliacionServiciosQuery} tramiteQuery - Servicio para consultar el estado del trámite.
   * @param {SeccionLibStore} seccion - Servicio para gestionar las secciones del formulario.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para gestionar la lógica de ampliación de servicios.
   * @param {ChangeDetectorRef} cdRef - Servicio para detectar cambios en la vista.
   */
  constructor(
    private tramiteQuery: AmpliacionServiciosQuery,
    private seccion: SeccionLibStore,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private cdRef: ChangeDetectorRef,
    private tramite80206Query: AmpliacionServiciosQuery,
    private registroSolicitudService: RegistroSolicitudService,
    private store: Tramite80206Store,
  ) {
    this.tramiteQuery.FormaValida$.pipe(takeUntil(this.destroyNotifier$)).subscribe((res) => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([res]);
    });
  }

  /**
   * Método de inicialización del componente.
   * Suscribe a los cambios en el servicio de ampliación de servicios para mostrar u ocultar alertas.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.tramite80206Query.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
      
    this.ampliacionServiciosService.deberiaMostrar$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((res) => {
        this.mostrarAlerta = !res;
        this.cdRef.detectChanges();
      });
  }

  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  getValorIndice(e: AccionBoton): void {
  // const PAYLOAD = buildGuardarPayload(this.solicitudState);
  // let shouldNavigate = false;
  
  // this.registroSolicitudService.postGuardarDatos(this.tramiteId, PAYLOAD)
  //   .pipe(takeUntil(this.destroyNotifier$))
  //   .subscribe(response => {
  //     shouldNavigate = response.codigo === '00';
      
  //     if (shouldNavigate) {
  //       if (esValidObject(response) && esValidObject(response.datos)) {
  //         const DATOS = response.datos as { id_solicitud?: number };
  //         if (getValidDatos(DATOS.id_solicitud)) {
  //           this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
  //         } else {
  //           this.store.setIdSolicitud(0);
  //         }
  //       }
  //       if (e.valor > 0 && e.valor < 5) {
  //         this.indice = e.valor;
  //         if (e.accion === 'cont') {
  //           this.wizardComponent.siguiente();
  //         } else {
  //           this.wizardComponent.atras();
  //         }
  //       }
  //     } else {
  //       console.error('Error saving data:', response.mensaje);
  //     }
  //   });

  //-------------------------------------------------------------------------------------

  if (e.accion === 'cont') {
    this.esFormaValido = false;
    
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = this.validarTodosFormulariosPasoUno();
      
      if (!ES_VALIDO) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }
    
    
    // If validation passes, save data and navigate
    const PAYLOAD = buildGuardarPayload(this.solicitudState);
    
    this.registroSolicitudService.postGuardarDatos(this.tramiteId, PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          const SHOULD_NAVIGATE = response.codigo === '00';
          
          if (SHOULD_NAVIGATE) {
            this.esFormaValido = false;
            // Update solicitud ID if available
            if (esValidObject(response) && esValidObject(response.datos)) {
              const DATOS = response.datos as { id_solicitud?: number };
              if (getValidDatos(DATOS.id_solicitud)) {
                this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
              } else {
                this.store.setIdSolicitud(0);
              }
            }
            
            // Calculate the correct next step index
            const SIGUIENTE_PASO = this.indice + 1;
            
            // Update indices
            this.indice = SIGUIENTE_PASO;
            this.datosPasos.indice = SIGUIENTE_PASO;
            
            // Make sure wizardComponent exists before calling siguiente()
            if (this.wizardComponent) {
              this.wizardComponent.siguiente();
            } else {
              console.error('wizardComponent is not available');
            }
          } else {
            console.error('API call failed - cannot navigate');
            console.error('Error message:', response.mensaje);
            console.error('Response code:', response.codigo);
          }
        },
        error: (error) => {
          console.error('API call error:', error);
        }
      });
    
    return;
  }
  
  // Handle 'atras' action
  const PASO_ANTERIOR = this.indice - 1;
  this.indice = PASO_ANTERIOR;
  this.datosPasos.indice = PASO_ANTERIOR;
  
  if (this.wizardComponent) {
    this.wizardComponent.atras();
  } else {
    console.error('wizardComponent is not available for going back');
  }
  //-------------------------------------------------------------------------------------
    
  //    this.esFormaValido = false;
  
  // // Validar formularios antes de continuar desde el paso uno
  // if (this.indice === 1 && e.accion === 'cont') {
  //   const ES_VALIDO = this.validarTodosFormulariosPasoUno();
  //   if (!ES_VALIDO) {
  //     this.esFormaValido = true;
  //     return; // Detener ejecución si los formularios son inválidos - NO actualizar índice
  //   }
  // }

  // // Solo calcular y actualizar el índice si la validación pasó
  // let indiceActualizado = e.valor;
  // if (e.accion === 'cont') {
  //   indiceActualizado = e.valor + 1;
  // } else if (e.accion === 'ant') {
  //   indiceActualizado = e.valor - 1;
  // }

  // // Validar que el nuevo índice esté dentro de los límites permitidos
  // if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {
  //   // Actualizar el índice y datosPasos solo si todo está válido
  //   this.indice = indiceActualizado;
  //   this.datosPasos.indice = indiceActualizado;
    
  //   if (e.accion === 'cont') {
  //     this.wizardComponent.siguiente();
  //   } else if (e.accion === 'ant') {
  //     this.wizardComponent.atras();
  //   }
  // }
  }
/**
 * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
 */
  validarTodosFormulariosPasoUno(): boolean {
  
  if (!this.pasoUnoComponent) {
    this.seccion.establecerSeccion([false]);
    this.seccion.establecerFormaValida([false]);
    return false;
  }
  
  // Call the validation method from PasoUnoComponent
  const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
  
  // Update section state based on validation result
  this.seccion.establecerSeccion([ISFORM_VALID_TOUCHED]);
  this.seccion.establecerFormaValida([ISFORM_VALID_TOUCHED]);
  
  return ISFORM_VALID_TOUCHED;
}
    /**
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado del botón de carga de archivos.
  *  carga - Indica si la carga de documentos está activa o no.
  * {void} No retorna ningún valor.
  */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }
   /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

    /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
    
  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /*
  * Maneja el evento de carga en progreso.
  */
   onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
  /**
   * Método que se ejecuta cuando se destruye el componente.
   * Limpia el notifier para evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}