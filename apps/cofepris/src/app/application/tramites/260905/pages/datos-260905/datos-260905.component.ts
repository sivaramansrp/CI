import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,forkJoin,takeUntil } from 'rxjs';
import { Solocitud260905Service } from '../../services/service260905.service';

/**
 * @descripción
 * Componente `Datos260905Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260905',
  templateUrl: './datos-260905.component.html',
})
export class Datos260905Component implements OnInit{

   /**
     * showPreFillingOptions
     * Indica si se deben mostrar las opciones de prellenado.
     */
 showPreFillingOptions: boolean = false; 

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
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

    /**
   * Constructor del componente.
   * 
   * @param consultaQuery Servicio para consultar el estado de la solicitud.
   * @param solocitud220401Service Servicio para manejar operaciones relacionadas con el trámite 260402.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud220401Service: Solocitud260905Service,
  ) {}
  

    /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta y, dependiendo de si hay una actualización,
   * guarda los datos del formulario o muestra la respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.consultaState = seccionState
          if (this.consultaState.update) {
             this.guardarDatosFormulario()
             } else {
              this.esDatosRespuesta = true;
            }
        })
  }

  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

    /**
   * Método para guardar los datos del formulario.
   * Realiza llamadas a los servicios para obtener los datos de registro y pago de derechos,
   * y actualiza el estado del formulario según la respuesta.
   */
  guardarDatosFormulario(): void {
    forkJoin({
      registro: this.solocitud220401Service.getRegistroTomaMuestrasMercanciasData(),
      permiso: this.solocitud220401Service.getPagoDerechos()
    })
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(({ registro, permiso }) => {
        if (registro) {
          this.esDatosRespuesta = true;
          this.solocitud220401Service.actualizarEstadoFormulario(registro);
        }
        if (permiso) {
          this.solocitud220401Service.actualizarPagoDerechosFormulario(permiso);
        }
      });
  }
}
