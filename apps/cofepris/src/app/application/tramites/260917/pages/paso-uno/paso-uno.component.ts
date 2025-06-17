import { Component } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260917Service } from '../../services/service260917.service';
/**
 * Componente que representa el paso uno del formulario o flujo de trabajo.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {

   /**
   * Indica si se están mostrando los datos de respuesta.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Estado actual de la consulta.
   */
  public consultaState!: ConsultaioState;
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();
   /**
   * El índice de la pestaña actualmente seleccionada.
   */
   indice: number = 1;

     /**
   * Constructor del componente DatosComponent.
   * Inyecta los servicios necesarios para la gestión de pantallas, obtención y actualización de datos,
   * así como la consulta del estado desde el store.
   *
   * @param {Pantallas301Service} pantallasSvc - Servicio para controlar la visibilidad y datos de las pantallas del trámite 301.
   * @param {Solocitud301Service} solocitud301Service - Servicio para obtener y actualizar los datos del formulario del trámite 301.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260917Service:Solocitud260917Service
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

    /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
   * En caso contrario, activa la bandera para mostrar los datos de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        if(this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
    })).subscribe();
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud260917Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud260917Service.actualizarEstadoFormulario(resp);
        }
      });
  }

   /**
    * Selecciona una pestaña estableciendo su índice.
    * @param i El índice de la pestaña a seleccionar.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
}
