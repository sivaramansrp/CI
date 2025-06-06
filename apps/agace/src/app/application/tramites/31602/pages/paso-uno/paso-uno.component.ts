import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { ComercioExteriorService } from '../../services/comercio-exterior.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit,OnDestroy {

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Representa el estado actual del proceso de consulta.
   * Esta propiedad contiene una instancia de `ConsultaioState`, que incluye
   * todos los datos relevantes e información de estado para la consulta en curso.
   */
  public consultaState!: ConsultaioState;

  /**
   * Construye una instancia de PasoUnoComponent.
   * @param comercioExteriorSvc - Servicio para manejar operaciones relacionadas con comercio exterior.
   * @param consultaQuery - Servicio de consulta para obtener datos.
   */
  constructor(
    private comercioExteriorSvc: ComercioExteriorService,
    private consultaQuery: ConsultaioQuery
   ) {

   }

  /**
   * Método del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de una directiva.
   * - Se suscribe al observable `selectConsultaioState$` de `consultaQuery` y actualiza la propiedad local `consultaState` con el estado emitido.
   * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite, evitando fugas de memoria.
   * - Si el `consultaState` actualizado tiene la bandera `update` en verdadero, se ejecuta el método `guardarDatosFormulario()` para guardar los datos del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        if(this.consultaState.update) {
          this.guardarDatosFormulario();
          this.guardarDatosFormularioDos();
        }
    })).subscribe();
   }
  
  /**
   * Selecciona una pestaña por su índice y actualiza el índice de la pestaña actual.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Recupera los datos del formulario desde el servicio comercioExteriorSvc y actualiza el estado del formulario.
   * Este método se suscribe al observable retornado por `getConsultaDatos()`, y por cada par clave-valor
   * en la respuesta, llama a `actualizarEstadoFormulario` para actualizar el estado del formulario en consecuencia.
   * La suscripción se cancela automáticamente cuando se emite `destroyNotifier$`.
   */
  public guardarDatosFormulario(): void {
    this.comercioExteriorSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.comercioExteriorSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  public guardarDatosFormularioDos(): void {
    this.comercioExteriorSvc.getConsultaDatosDos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.comercioExteriorSvc.estadoFormulario(response)
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
