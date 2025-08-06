/**
 * PasoUnoComponent
 * Componente que representa el primer paso del proceso de modificación de permiso sanitario.
 */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ModificacionPermisoSanitarioService } from '../../services/modificacion-permosi-sanitario.service';

import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject,forkJoin,takeUntil } from 'rxjs';
/**
 * PasoUnoComponent
 * Componente que representa el primer paso del proceso de modificación de permiso sanitario.
 * Este componente se encarga de mostrar la información del solicitante y del establecimiento,
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
/**
 * * PasoUnoComponent
 * Componente que representa el primer paso del proceso de modificación de permiso sanitario.
 * Este componente se encarga de mostrar la información del solicitante y del establecimiento,
 */
export class PasoUnoComponent implements OnInit ,AfterViewInit ,OnDestroy{
  
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
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
   @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

   /**
    * Se ejecuta después de que la vista ha sido inicializada.
    * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
    * para establecer el tipo de persona como MORAL_NACIONAL.
    */
    constructor(
       private consultaQuery: ConsultaioQuery,
       private solocitudService: ModificacionPermisoSanitarioService,
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
   * ngAfterViewInit
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   */
   ngAfterViewInit() :void{
     this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
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
    * Índice actual del subtítulo seleccionado en la interfaz.
    */
  public indice: number = 1;
 
   /**
    * Método para actualizar el índice del subtítulo seleccionado.
    * 
    * @param i - Índice de la pestaña seleccionada.
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
