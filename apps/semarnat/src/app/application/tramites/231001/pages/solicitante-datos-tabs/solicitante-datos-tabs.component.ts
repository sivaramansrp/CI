/**
 * Componente que representa las pestañas de detalles del solicitante.
 * 
 * @selector app-solicitante-detos-tabs
 * @templateUrl ./solicitante-detos-tabs.component.html
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { MateriaprimaformserviceService } from '../../services/materia-prima-formservice.service';

/**
 * Decorador que define un componente de Angular.
 * 
 * @selector app-solicitante-detos-tabs - El selector CSS que identifica este componente en una plantilla.
 * @templateUrl ./solicitante-detos-tabs.component.html - La URL de la plantilla HTML del componente.
 */

@Component({
  selector: 'app-solicitante-datos-tabs',
  templateUrl: './solicitante-datos-tabs.component.html',
})
export class SolicitanteDatosTabsComponent implements OnInit, OnDestroy{

   /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
   indice: number = 1;

   /**
 * Indica si se ha recibido una respuesta con datos.
 * Se utiliza para mostrar u ocultar información en la interfaz según el estado de la respuesta.
 */
public esDatosRespuesta: boolean = false;

/**
 * Estado actual de la consulta, obtenido desde el store.
 * Almacena la información relevante para el paso del solicitante.
 */
public consultaState!: ConsultaioState;
/**
 * Constructor del componente.
 * Inyecta los servicios necesarios para la gestión de licitaciones y la consulta del estado.
 */
  /**
 * Subject utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria
 * cuando el componente se destruye.
 */
private destroyed$ = new Subject<void>();
constructor(
  private service: MateriaprimaformserviceService,
  private consultaQuery: ConsultaioQuery
) {
  // constructor
}
   /**
    * Selecciona una pestaña específica.
    * 
    * @param {number} i - El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

    /**
 * Método del ciclo de vida que se ejecuta al inicializar el componente.
 *
 * Se suscribe al observable `selectConsultaioState$` para obtener el estado actual de la consulta
 * y lo asigna a la propiedad `consultaState`. Dependiendo del valor de `update` en el estado,
 * decide si debe llamar a `guardarDatosFormulario()` para obtener y actualizar los datos,
 * o simplemente mostrar la información existente.
 */
  ngOnInit(): void {
   this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyed$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
  
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
  /**
 * Obtiene los datos vigentes de licitaciones mediante el servicio y actualiza el estado del formulario.
 *
 * Se suscribe al observable que retorna el servicio `getLicitationesVigentesData()`. Si la respuesta es válida,
 * actualiza la bandera `esDatosRespuesta` y llama al método del servicio para actualizar el estado del formulario.
 */
   guardarDatosFormulario(): void {
    this.service.getDatos().pipe(
        takeUntil(this.destroyed$)).subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service.actualizarEstadoFormulario(resp);
        }
      });
  }

/**
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 *
 * Emite y completa el subject `destroyed$` para cancelar todas las suscripciones activas,
 * evitando fugas de memoria.
 */
  ngOnDestroy(): void {
  this.destroyed$.next();
  this.destroyed$.complete();
}
}
