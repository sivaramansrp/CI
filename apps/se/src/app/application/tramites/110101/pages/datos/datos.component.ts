import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject,map, takeUntil } from 'rxjs';
import { PantallasSvcService } from '../../services/pantallas-svc.service';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 110101
 * Establecer el índice del subtítulo
 */ 

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {

   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
   indice: number = 1;
  /**
   * Subject utilizado para emitir una señal que permite desuscribirse de los observables, típicamente en el ciclo de vida ngOnDestroy.
   * Cuando se emite un valor, todas las suscripciones que usan `takeUntil(this.destroyNotifier$)` serán desuscritas,
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Almacena el estado actual del proceso Consultaio para este componente.
   */
  public consultaState!: ConsultaioState;

  /**
   * Inicializa una nueva instancia del componente.
   */
   constructor(
    private pantallasSvc: PantallasSvcService,
    private consultaQuery: ConsultaioQuery
   ) {

   }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * 
   * - Se suscribe al observable `selectConsultaioState$` de `consultaQuery` y actualiza la propiedad local `consultaState` con el valor emitido.
   * - Si la bandera `consultaState.update` es verdadera después de la inicialización, ejecuta el método `guardarDatosFormulario()` para guardar los datos del formulario.
   * - Asegura que la suscripción se limpie correctamente utilizando el observable `destroyNotifier$` para evitar fugas de memoria.
   */
   ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
    })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    }
   }
   /**
    * Este método se utiliza para establecer el índice del subtítulo.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

  /**
   * Guarda los datos del formulario obteniendo el estado actual del formulario desde el servicio.
   *
   * Este método se suscribe al observable retornado por `pantallasSvc.getConsultaDatos()`,
   * y al recibir una respuesta, actualiza el estado del formulario usando `pantallasSvc.actualizarEstadoFormulario`.
   * La suscripción se cancela automáticamente cuando `destroyNotifier$` emite, evitando fugas de memoria.
   */
   public guardarDatosFormulario(): void {
    this.pantallasSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.pantallasSvc.actualizarEstadoFormulario(response);
    })
   }

    /**
     * Método del ciclo de vida que se llama cuando el componente es destruido.
     * Emite un valor y completa el subject `destroyNotifier$` para notificar a cualquier suscripción
     * que debe limpiar recursos y prevenir fugas de memoria.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
   

}
