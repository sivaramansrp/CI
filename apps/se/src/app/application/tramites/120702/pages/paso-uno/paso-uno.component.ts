import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';

import { ExpedicionAsignacionComponent } from '../../components/expedicion-asignacion/expedicion-asignacion.component';
/**
 * # Documentación - PasoUnoComponent
 *
 * ## Descripción del componente
 * `PasoUnoComponent` es un componente de Angular diseñado para gestionar la lógica de selección de pestañas en la aplicación.
 *
 * ### Selector
 * - **Selector del componente**: `app-paso-uno`
 * - **standalone**: `false`
 * - **templateUrl**: `./paso-uno.component.html`
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy{

   @Output() public buscarDatos =
    new EventEmitter<any>();

   /**
     * Referencia ViewChild al componente de asignación de datos de empresa.
     */
    @ViewChild('asignacionRef') asignacion!: ExpedicionAsignacionComponent;

 /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

    /** Propiedad que almacena el estado actual de la consulta IO.  
 * Se inicializa posteriormente con datos del store o de un observable. */
   public consultaState!:ConsultaioState;

    /**
   * ## Propiedad: indice
   * Define el índice actualmente seleccionado. Se inicializa con el valor `1`.
   */
  indice:number = 1;

    /**
   * ## Método: seleccionaTab
   * Este método actualiza el índice en función del número proporcionado como argumento.
   *
   * #### Parámetros
   * - **i**: Número que representa el índice de la pestaña seleccionada.
   *
   * #### Implementación
   * ```typescript
   * seleccionaTab(i: number): void {
   *   this.indice = i;
   * }
   * ```
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Valida el formulario del tab actualmente seleccionado.
   * @returns true si el formulario es válido, false en caso contrario.
   */
  public validarTabActual(): boolean {
    // Si estamos en el tab 2 (Expedición certificados), validar el formulario
    if (this.indice === 2 && this.asignacion && this.asignacion.asignacionForm) {
      // Marcar todos los campos como touched para mostrar errores
      this.asignacion.asignacionForm.markAllAsTouched();
      
      // Validar campos específicos requeridos
      const ANODELOFICIO = this.asignacion.asignacionForm.get('anoDelOficio');
      const NUMEROOFICIO = this.asignacion.asignacionForm.get('numeroOficio');
      const MONTOAEXPEDIR = this.asignacion.asignacionForm.get('montoAExpedir');

      return (ANODELOFICIO?.valid || false) &&
             (NUMEROOFICIO?.valid || false) &&
             (MONTOAEXPEDIR?.valid || false);
    }
    
    // Para otros tabs, retornar true (no hay validación específica)
    return true;
  }

  /**
   * Método público para validar el formulario independientemente del tab actual.
   * Utilizado por el componente padre para validar antes de continuar al siguiente paso.
   */
  public validarFormularioCompleto(): boolean {
    // Only validate if we're on tab 2 (where the form is visible)
    if (this.indice === 2) {
      if (this.asignacion && this.asignacion.asignacionForm) {
        // Forzar validación usando el método del componente hijo
        if (this.asignacion.forzarValidacion) {
          this.asignacion.forzarValidacion();
        }
        
        // Marcar todos los campos como touched
        this.asignacion.asignacionForm.markAllAsTouched();
        
        // Validar solo los campos requeridos específicos
        const ANODELOFICIO = this.asignacion.asignacionForm.get('anoDelOficio');
        const NUMEROOFICIO = this.asignacion.asignacionForm.get('numeroOficio');
        const MONTOAEXPEDIR = this.asignacion.asignacionForm.get('montoAExpedir');

        const ISVALID = (ANODELOFICIO?.valid || false) &&
                       (NUMEROOFICIO?.valid || false) &&
                       (MONTOAEXPEDIR?.valid || false);
              return ISVALID;
      }
      return true;
    }
    return true;
  }

  /**
 * Constructor de la clase.
 * Inyecta los servicios ExpedicionCertificadosFronteraService y ConsultaioQuery.
 * La inicialización de datos no se realiza en el constructor, sino en métodos específicos según sea necesario.
 */
  constructor(private expedicionService : ExpedicionCertificadosFronteraService, private consultaQuery: ConsultaioQuery)
  {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  
  /**
 * Inicializa la suscripción al estado de la consulta y actualiza el formulario
 * según el valor de `update`. Utiliza `takeUntil` para gestionar la cancelación
 * de la suscripción al destruir el componente.
 */
    ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$))
        .subscribe((seccionState) => {
          this.consultaState = seccionState;
          if (this.consultaState.update) {
             this.guardarDatosFormulario();
             } else {
              this.esDatosRespuesta = true;
            }
        })
  }

     /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  private guardarDatosFormulario(): void {
    this.expedicionService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.expedicionService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Maneja el evento de recepción de datos del formulario.
   * 
   * @param event - Datos emitidos por el formulario.
   * @remarks
   * Este método emite los datos recibidos a través del evento `buscarDatos`.
   */
  handleFormaDatos(event:any):void{
    this.buscarDatos.emit(event);
  }

      /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * 
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   * 
   */
    ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
