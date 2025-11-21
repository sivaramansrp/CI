import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Service260702Service } from '../../../../shared/services/shared2607/service260702.service';


/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 * Este componente se encarga de gestionar la información del pago de derechos
 * y de mostrar los trámites asociados a la solicitud de permiso.
 * 
 * @example
 * ```html
 * <app-paso-uno></app-paso-uno>
 * ```
 * 
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   * Por defecto es 1 que representa la primera pestaña.
   * 
   * @type {number}
   * @default 1
   * @example
   * ```typescript
   * this.indice = 3; // Selecciona la tercera pestaña
   * ```
   */
  indice: number = 1;

  /**
   * Formulario reactivo para capturar los datos del pago de derechos.
   * Se inicializa dinámicamente con los valores del estado de la solicitud.
   * 
   * @type {FormGroup}
   * @see {@link crearformularioPagoDerechos}
   * @example
   * ```typescript
   * this.formularioPagoDerechos.get('claveDeReferencia')?.value;
   * ```
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria mediante el patrón takeUntil.
   * 
   * @private
   * @type {Subject<void>}
   * @see {@link ngOnDestroy}
   * @example
   * ```typescript
   * someObservable.pipe(takeUntil(this.notificadorDestruccion$))
   * ```
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Datos de respuesta del servidor utilizados para actualizar el formulario.
   * Indica si los datos han sido cargados desde el servidor correctamente.
   * 
   * @type {boolean}
   * @default false
   * @example
   * ```typescript
   * if (this.esDatosRespuesta) {
   *   // Procesar datos del servidor
   * }
   * ```
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta, que contiene información sobre el estado actual del formulario.
   * Incluye información sobre el modo de visualización y permisos del usuario.
   * 
   * @type {ConsultaioState}
   * @see {@link ConsultaioState}
   */
  public consultaState!: ConsultaioState;
/**
 * Indica si el formulario está en modo de solo lectura.
 */
  esFormularioSoloLectura: boolean = false;

  public idProcedimiento: number = 260703;
 /**
  * Constructor del componente PasoUnoComponent.
  * Inyecta los servicios necesarios para la gestión del formulario, estado y consultas.
  */
  constructor(
    private formBuilder: FormBuilder,
    private service260702Service: Service260702Service,
    private consultaQuery: ConsultaioQuery
  ) {
     this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.notificadorDestruccion$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       
      })
    )
    .subscribe()
  }

 /**
  * Método del ciclo de vida `ngOnInit`.
  * Inicializa el componente y sus dependencias.
  * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
  * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
  * En caso contrario, activa la bandera para mostrar los datos de respuesta.
  */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.notificadorDestruccion$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.service260702Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.notificadorDestruccion$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service260702Service.actualizarEstadoFormulario(resp);
        }
      });
  }


 /**
  * Método para seleccionar una pestaña específica.
  * @param i Índice de la pestaña a seleccionar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria utilizando el patrón takeUntil.
   * 
   * Realiza las siguientes operaciones de limpieza:
   * - Emite una señal de destrucción a todas las suscripciones activas
   * - Completa el subject notificadorDestruccion$
   * - Libera los recursos utilizados por las suscripciones
   * 
   * @returns {void}
   * @see {@link notificadorDestruccion$}
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al destruir el componente
   * component.ngOnDestroy();
   * ```
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}