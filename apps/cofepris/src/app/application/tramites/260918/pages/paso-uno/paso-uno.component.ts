import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import {Subject, map,takeUntil } from 'rxjs';
import { ModificacionPermisoLabService } from '../../services/modificacion-permiso-lab.service';
/**
 * Componente que representa el paso uno del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {
     /**
     * showPreFillingOptions
     * Indica si se deben mostrar las opciones de prellenado.
     */
 showPreFillingOptions: boolean = false; 

 /**
* Índice de la pestaña actualmente seleccionada.
* Inicializado a 1 por defecto.
*/
 indice = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido del store. */
  public consultaState!: ConsultaioState;


 /**
  * Método para seleccionar una pestaña específica.
  *
  * @param i El índice de la pestaña a seleccionar.
  */
 seleccionaTab(i: number): void {
   this.indice = i;
 }

  constructor(
    private consultaQuery: ConsultaioQuery,private modificacionPermisoLabService: ModificacionPermisoLabService) {

  }

  ngOnInit(): void {
    // Se suscribe al observable del estado y actualiza la propiedad local.
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    // Si el estado indica actualización, carga los datos del formulario.
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
      this.guardarDatosFormularioPagoDerechos();
    } 
  }
 

  guardarDatosFormulario(): void {
    this.modificacionPermisoLabService
      .obtenerDatosInicialesFormulario().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.modificacionPermisoLabService.actualizarEstadoFormulario(resp);
        }
      });
  }

  guardarDatosFormularioPagoDerechos(): void {
    this.modificacionPermisoLabService
      .obtenerValoresFormularioPagoDerechos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.modificacionPermisoLabService.actualizarValoresFormularioPagoDerechos(resp);
        }
      });
  }

 
}
