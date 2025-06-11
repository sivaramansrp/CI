import { AcuseComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud40302State, Solicitud40302Store } from './../../estados/tramite40302.store';
import { Subject, map } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelTramiteService } from '../../services/datos-del-tramite.service';
import { Solicitud40302Query } from '../../estados/tramite40302.query';
import { takeUntil } from 'rxjs/operators';
/**
 * ## DatosDelTramiteComponent
 * 
 * Componente que muestra y gestiona los datos del trámite 40302.
 * Utiliza formularios reactivos para interactuar con el usuario.
 * 
 * ### Decorador @Component
 * 
 * Define el componente con su selector, plantilla y estilos.
 * 
 * ### Parámetros
 * - **selector**: `'app-datos-del-tramite'`  
 *   Identificador del componente en el HTML.
 * - **standalone**: `true`  
 *   Indica que el componente es independiente y no requiere un módulo.
 * - **imports**: `[TituloComponent, ReactiveFormsModule, AcuseComponent]`  
 *   Componentes y módulos importados para su uso dentro del componente.
 * - **templateUrl**: `'./datos-del-tramite.component.html'`  
 *   Ruta a la plantilla HTML del componente.
 * - **styleUrl**: `'./datos-del-tramite.component.scss'`  
 *   Ruta a los estilos CSS del componente.
 */
@Component({
  selector: 'app-datos-del-tramite',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, AcuseComponent],
  templateUrl: './datos-del-tramite.component.html',
  styleUrls: ['./datos-del-tramite.component.scss'] // Corregido a styleUrls
})
export class DatosDelTramiteComponent implements OnInit, OnDestroy {
  /**
   * ## solicitudForm
   * 
   * Formulario reactivo para gestionar los datos del trámite.
   */
  public solicitudForm!: FormGroup;

  /**
   * ## destroy$
   * 
   * Sujeto que se utiliza para cancelar las suscripciones cuando el componente se destruye.
   */
  private destroy$ = new Subject<void>();

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;

  /** Estado de la solicitud tipo 40302. 
 *  Contiene información y progreso de la solicitud. */
  public solicitudState!: Solicitud40302State;

  /**
   * ## Constructor
   * 
   * Inicializa el componente con las dependencias necesarias.
   * 
   * ### Parámetros
   * - **fb**: `FormBuilder`  
   *   Constructor de formularios reactivos.
   * - **datosService**: `DatosDelTramiteService`  
   *   Servicio que gestiona los datos del trámite.
   */
    
    constructor(private fb: FormBuilder, 
      private datosService: DatosDelTramiteService, 
      private solicitud40302Store: Solicitud40302Store, 
      private solcitud40302Query: Solicitud40302Query,
      private consultaioQuery: ConsultaioQuery
    ) {
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    }

  /**
   * ## ngOnInit
   * 
   * Método que se ejecuta al inicializar el componente.
   * 
   * ### Funcionalidad
   * Establece los valores iniciales del servicio y suscribe al estado de la solicitud.
   */
  ngOnInit(): void {
    this.datosService.setInitialValues();
    this.establecerSolicitudForm();
    this.suscribirseAlEstado();
    this.inicializarEstadoFormulario()
  }


  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.solicitudForm && this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
       this.establecerSolicitudForm();
    }
  }

/**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.establecerSolicitudForm();
    if (this.esFormularioSoloLectura) {
      this.solicitudForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.solicitudForm.enable();
    } 
  }

  /**
   * ## establecerSolicitudForm
   * 
   * Establece la estructura del formulario reactivo para los datos del trámite.
   * 
   * ### Funcionalidad
   * Crea un grupo de formularios con validaciones para los campos requeridos.
   */
  public establecerSolicitudForm(): void {

    /** Suscribe al estado de solicitud 40302 y lo asigna a `solicitudState`.  
    * Usa `takeUntil` para limpiar la suscripción al destruir el componente. */
    this.solcitud40302Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud40302State;
        })
      )
      .subscribe();

    this.solicitudForm = this.fb.group({
      cveFolioCaat: [{ value: '3L6V', disabled: true }],
      descTipoCaat: [{ value: 'Naviero', disabled: true }],
      descTipoAgente: [{ value: 'Agente Naviero', disabled: true }],
      directorGeneralNombre: ['', [Validators.required, Validators.maxLength(200)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(200)]],
      segundoApellido: ['', [Validators.maxLength(200)]],
    });
   
this.solicitudForm.get('directorGeneralNombre')?.setValue(this.solicitudState.directorGeneralNombre);
this.solicitudForm.get('primerApellido')?.setValue(this.solicitudState.primerApellido);
this.solicitudForm.get('segundoApellido')?.setValue(this.solicitudState.segundoApellido);
  }


  /**
   * ## suscribirseAlEstado
   * 
   * Suscribe al estado de la solicitud para actualizar el formulario automáticamente.
   * 
   * ### Funcionalidad
   * Utiliza el servicio para obtener el estado actual de la solicitud y parchea los valores en el formulario.
   */
  public suscribirseAlEstado(): void {
    this.datosService
      .getSolicitudState()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (state) => {
          this.solicitudForm.patchValue(state);
        },
      });
  }

  /**
 * Actualiza el nombre del Director General en el store.
 *
 * Este método obtiene el valor actual del campo `directorGeneralNombre` del formulario `solicitudForm`
 * y lo envía al store `solicitud40302Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarDirectorGeneralNombre(): void {
    const DIRECTOR_GENERAL_NOMBRE = this.solicitudForm.get('directorGeneralNombre')?.value;
    this.solicitud40302Store.setDirectorGeneralNombre(DIRECTOR_GENERAL_NOMBRE);
  }

  /**
 * Actualiza el primer apellido en el store.
 *
 * Este método obtiene el valor actual del campo `primerApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40302Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarPrimerApellido(): void {
    const PRIMER_APELLIDO = this.solicitudForm.get('primerApellido')?.value;
    this.solicitud40302Store.setPrimerApellido(PRIMER_APELLIDO);
  }

  /**
 * Actualiza el segundo apellido en el store.
 *
 * Este método obtiene el valor actual del campo `segundoApellido` del formulario `solicitudForm`
 * y lo envía al store `solicitud40302Store` mediante el método `setDirectorGeneralNombre`.
 */
  public actualizarSegundoApellido(): void {
    const SEGUNDO_APELLIDO = this.solicitudForm.get('segundoApellido')?.value;
    this.solicitud40302Store.setSegundoApellido(SEGUNDO_APELLIDO);
  }

    /**
   * ## ngOnDestroy
   * 
   * Método que se ejecuta al destruir el componente.
   * 
   * ### Funcionalidad
   * Cancela las suscripciones para evitar fugas de memoria.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
