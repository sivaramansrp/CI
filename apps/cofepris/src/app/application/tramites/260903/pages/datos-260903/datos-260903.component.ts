/**
 * @file
 * Componente que maneja la lógica de la página de datos para el trámite 260903.
 */
import { Component,OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,forkJoin,takeUntil } from 'rxjs';
import { ActualizacionImportacionService } from '../../services/actualizacion-importacion.service';

/**
 * @descripción
 * Componente `Datos260903Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260903',
  templateUrl: './datos-260903.component.html',
})
export class Datos260903Component implements OnInit, OnDestroy {

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
 public indice = 1;
/**
 * Constructor del componente Datos260903Component.
 * @param consultaQuery - Servicio para consultar el estado de la información.
 * @param solocitudService - Servicio para manejar la solicitud de actualización de importación.
 */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitudService: ActualizacionImportacionService,
  ) {}
/**
 * ngOnInit
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
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
   * Método para guardar los datos del formulario.
   * Realiza llamadas a los servicios para obtener los datos de registro y pago de derechos,
   * y actualiza el estado del formulario según la respuesta.
   */
  guardarDatosFormulario(): void {
    forkJoin({
      registro: this.solocitudService.getRegistroTomaMuestrasMercanciasData(),
      permiso: this.solocitudService.getPagoDerechos()
    })
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(({ registro, permiso }) => {
        if (registro) {
          this.esDatosRespuesta = true;
          this.solocitudService.actualizarEstadoFormulario(registro);
        }
        if (permiso) {
          this.solocitudService.actualizarPagoDerechosFormulario(permiso);
        }
      });
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
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
