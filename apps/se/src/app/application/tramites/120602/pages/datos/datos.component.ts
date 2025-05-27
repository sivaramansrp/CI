import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud120602Service } from '../../services/solicitud120602/solicitud120602.service';

/**
 * @Component
 * @selector app-datos
 * @description
 * Componente `DatosComponent` que gestiona la selección de pestañas y la carga de datos para el trámite 120602.
 * 
 * Detalles:
 * - Utiliza el decorador `@Component` para definir las propiedades del componente.
 * - Renderiza la plantilla HTML asociada para mostrar y gestionar los datos del trámite.
 * - Controla la selección de pestañas mediante el índice y la carga de datos desde el store y servicios.
 * 
 * Propiedades:
 * - `selector`: Define el nombre del selector del componente como `app-datos`.
 * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
 * 
 * @example
 * <app-datos></app-datos>
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

  /**
  * Esta variable se utiliza para almacenar el índice del subtítulo.
  * @type {number}
  */
  indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

  /**
  * @constructor
  * @description Inicializa una instancia del `DatosComponent`.
  */
  constructor(
    private solicitus120602Service: Solicitud120602Service,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * @method ngOnInit
   * @description
   * Método de inicialización del componente `DatosComponent`.
   * 
   * Detalles:
   * - Se suscribe al observable `selectConsultaioState$` del store `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
   * - Actualiza la propiedad `consultaState` con el estado recibido.
   * - Si la propiedad `update` del estado es verdadera, llama al método `guardarDatosFormulario()`.
   * - Si no, establece la bandera `esDatosRespuesta` en `true` para indicar que se deben mostrar los datos de respuesta.
   * 
   * @example
   * this.ngOnInit();
   * // Inicializa el componente y gestiona el flujo de datos según el estado de la consulta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
          this.consultaState = seccionState;
      })
    ).subscribe();
    if(this.consultaState.update) {
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
    this.solicitus120602Service
      .getEmpresaSolicitudData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solicitus120602Service.actualizarEstadoFormulario(resp);
        }
      });
  }
  
 /**
   * @method seleccionaTab
   * @description Este método se utiliza para establecer el índice del subtítulo.
   * @param {number} i - El nuevo índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * @method ngOnDestroy
 * @description
 * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
 * 
 * Detalles:
 * - Emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores que el componente está siendo destruido.
 * - Completa el observable para liberar recursos y evitar fugas de memoria.
 * 
 * @returns {void} No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
