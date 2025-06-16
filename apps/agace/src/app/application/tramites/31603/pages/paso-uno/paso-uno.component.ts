import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map,takeUntil } from 'rxjs';
import { DatosComunesService } from '../../../../shared/services/datos-comunes.service';
import { RegistrosDeComercioExteriorService } from '../../services/registros-de-comercio-exterior.service';
import { TercerosRelacionadosService } from '../../../../shared/services/terceros-relacionados.service';

/**
 * Representa el PasoUnoComponent, que es responsable de gestionar
 * el primer paso de un proceso específico en la aplicación.
 */
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
    private datosComunesSvc: DatosComunesService,
    private tercerosRelacionadosSvc: TercerosRelacionadosService,
    private registrosDeComercioExteriorSvc: RegistrosDeComercioExteriorService,
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
          this.guardarDatosComunesFormulario();
          this.guardarTercerosFormulario();
          this.guardarDatosFormulario();
          this.guardarIvaeiepsFormulario();
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
   * Recupera los datos comunes del formulario desde el servicio y actualiza el estado del formulario.
   * 
   * Se suscribe al observable `getConsultaDatosComunes` de `datosComunesSvc` y,
   * al recibir una respuesta, actualiza el estado del formulario llamando a
   * `actualizarEstadoFormulario` con los datos recibidos.
   */
  public guardarDatosComunesFormulario(): void {
    this.datosComunesSvc.getConsultaDatosComunes().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.datosComunesSvc.actualizarEstadoFormulario(response);
    })
  }

  /**
   * Guarda el estado actual del formulario de "Terceros" recuperando los datos desde el servicio,
   * luego itera sobre cada entrada en el objeto de respuesta para actualizar el estado del formulario
   * para cada par clave-valor utilizando el método `actualizarEstadoFormulario`.
   * 
   * La suscripción al observable se cancela automáticamente cuando el componente es destruido,
   * utilizando el subject `destroyNotifier$` para prevenir fugas de memoria.
   */
  public guardarTercerosFormulario(): void {
    this.tercerosRelacionadosSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.tercerosRelacionadosSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  /**
   * Recupera los datos del formulario desde el servicio comercioExteriorSvc y actualiza el estado del formulario.
   * Este método se suscribe al observable retornado por `getConsultaDatos()`, y por cada par clave-valor
   * en la respuesta, llama a `actualizarEstadoFormulario` para actualizar el estado del formulario en consecuencia.
   * La suscripción se cancela automáticamente cuando se emite `destroyNotifier$`.
   */
  public guardarDatosFormulario(): void {
    this.registrosDeComercioExteriorSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.registrosDeComercioExteriorSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  /**
   * Recupera los datos para el segundo formulario desde el servicio registrosDeComercioExteriorSvc y actualiza el estado del formulario.
   * 
   * Se suscribe al observable retornado por `getConsultaDatosDos()` y, al recibir una respuesta,
   * llama a `estadoFormulario` con los datos recibidos para actualizar el estado del formulario.
   * La suscripción se cancela automáticamente cuando se emite `destroyNotifier$`.
   */
  public guardarIvaeiepsFormulario(): void {
    this.registrosDeComercioExteriorSvc.getConsultaDatosDos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.registrosDeComercioExteriorSvc.estadoFormulario(response)
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
