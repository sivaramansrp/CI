import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud.service';

/**
 * @component PasoUnoComponent
 * @description
 * Componente encargado de gestionar el primer paso del trámite 130107.
 * Este paso incluye la lógica para manejar la navegación entre subtítulos o secciones
 * dentro del primer paso del trámite.
 * 
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property consultaState
   * @description
   * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
   */
  @Input() consultaState!: ConsultaioState;

  /**
   * @property indice
   * @description
   * Variable utilizada para almacenar el índice del subtítulo o sección activa.
   * 
   * @type {number}
   */
  public indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private datosDeLaSolicitudService: DatosDeLaSolicitudService,
    private consultaQuery: ConsultaioQuery

  ) {
    // Lógica de inicialización si es necesario
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
          if (this.consultaState?.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      ).subscribe();

  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.datosDeLaSolicitudService
      .getImportacionDefinitivaData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          Object.entries(resp).forEach(([key, value]) => {
            this.datosDeLaSolicitudService.actualizarEstadoFormulario(key, value);
          });
        }
      });
  }

  /**
   * @method seleccionaTab
   * @description
   * Método utilizado para establecer el índice del subtítulo o sección activa.
   * Cambia el valor de la propiedad `indice` según el número proporcionado.
   * 
   * @param i Índice del subtítulo o sección a activar.
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
