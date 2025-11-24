/**
 * @fileoverview Componente para la gestión de la página de asignación directa.
 * Este componente maneja la lógica y la presentación de la página de asignación directa,
 * incluyendo la inicialización y la gestión de los pasos del wizard.
 * @module AsignciondirectaPageComponent
 */
import { ASIGNACION, TEXTOS_BUSCAR } from '../../constants/asignacion.enum';
import { AVISO_CONTRNIDO, DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite120404State, Tramite120404Store } from '../../estados/store/tramite120404.store';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { Tramite120404Query } from '../../estados/queries/tramite120404.query';

interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

@Component({
  selector: 'app-asignciondirecta-page',
  templateUrl: './asignciondirecta-page.component.html',
  styleUrls: ['./asignciondirecta-page.component.scss'],
})
export class AsignciondirectaPageComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = ASIGNACION;
  
  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Los datos para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Propiedad para mostrar/ocultar el mensaje de error de búsqueda
   */
  public showBuscarError = false;

  /**
   * Propiedad para mostrar/ocultar el mensaje de error de validación del formulario
   */
  public showValidationError = false;

  /**
   * Propiedad para almacenar los errores de validación
   */
  public validationErrors: string[] = [];

  /**
   * Número de trámite actual.  
   * Identifica y almacena el valor asociado al formulario.  
   */
  numTramite: string = '';
     /**
   * Contiene los textos que se muestran al usuario cuando ocurre una cancelación.
   * Los textos provienen del archivo de constantes TEXTOS_CANCELACIONS.
   */
   TEXTOS = TEXTOS_BUSCAR;
     /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-danger';
 /**
 * Contiene el texto del aviso de privacidad simplificado.
 * 
 * @constant {string} avisoContrnido
 * Se inicializa con la propiedad `aviso` del objeto `AVISO_CONTRNIDO`.
 * 
 * Uso:
 * - Mostrar el aviso de privacidad en la interfaz de usuario.
 * - Reutilizar el contenido del aviso en distintos componentes.
 */
avisoContrnido = AVISO_CONTRNIDO.aviso;

/** Estado actual del trámite 120404 que contiene toda la información de la solicitud. */
public solicitudState!: Tramite120404State;

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
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private store: Tramite120404Store,
    private query: Tramite120404Query
  ) {
    //
  }

 /**
 * @method ngOnInit
 * @description
 * Método de inicialización del componente `AsignciondirectaPageComponent`.
 */
  ngOnInit(): void {
    this.query.selectTramite120404$.pipe(
      takeUntil(this.destroyNotifier$),
      map((data) => {
        this.solicitudState = data;
      })
    ).subscribe();
  }

  /**
   * Método para manejar el evento de intento de búsqueda desde componentes hijos.
   * Establece la propiedad `showBuscarError` según el estado de enviado e inválido del formulario.
   *
   * @param {Object} event - El objeto de evento que contiene las propiedades `submitted` e `invalid`.
   */
  onBuscarIntento(event: {submitted: boolean, invalid: boolean, numTramite: string}): void {
    this.showBuscarError = event.submitted && event.invalid;
    this.numTramite = event.numTramite;
  }

  /**
   * Método para manejar la validación del formulario desde componentes hijos
   * @param event - Objeto que contiene el estado de validación del formulario
   */
  onFormValidation(event: { isValid?: boolean; errors?: string[] } | null | undefined): void {
    if (event && typeof event === 'object' && 'isValid' in event) {
      this.showValidationError = !event.isValid;
      this.validationErrors = event.errors || [];
    } else {
      this.showValidationError = false;
      this.validationErrors = [];
    }
  }
 
  /**
   * Maneja la acción del botón de navegación en el wizard.
   * @param e - Objeto que contiene la acción y el valor asociado.
   */
  public getValorIndice(e: AccionBoton): void {
    this.showBuscarError = false;
    this.showValidationError = false;
     if (e.accion === 'cont') {
      if (!this.validateCurrentStep()) {
        return; 
      }
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

  /**
   * Getter para la lista de errores (usado por la plantilla)
   */
  get validationErrorsList(): string[] {
    return this.validationErrors || [];
  }

  /**
   * Texto plano para la alerta de búsqueda (usado por la plantilla)
   */
  get buscarAlertText(): string {
    return this.numTramite ? `El valor (${this.numTramite}) debe ser un número válido.` : '';
  }

  /**
   * Valida el paso actual del wizard
   * @returns {boolean} - true si el paso es válido, false en caso contrario
   */
  private validateCurrentStep(): boolean {
    this.validationErrors = [];
    let isValid = true;

    switch (this.indice) {
      case 1:
        isValid = this.validateStep1();
        break;
      case 2:
        isValid = this.validateStep2();
        break;
      case 3:
        isValid = this.validateStep3();
        break;
      default:
        isValid = true;
    }

    this.showValidationError = !isValid;
    return isValid;
  }

  /**
   * Valida el paso 1 (Solicitante/Entidad)
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep1(): boolean {
    let isValid = true;
 if (!this.numTramite || this.numTramite.trim() === '') {
      this.validationErrors.push('El número de trámite es requerido.');
      isValid = false;
    }
    return isValid;
  }

  /**
   * Valida el paso 2
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep2(): boolean {
    const ISVALID = true;
     return ISVALID;
  }

  /**
   * Valida el paso 3
   * @returns {boolean} - true si es válido, false en caso contrario
   */
  private validateStep3(): boolean {
    const ISVALID = true;
     return ISVALID;
  }

      /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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

  /** Actualiza el estado de carga en progreso. */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}