import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery ,ConsultaioState} from '@ng-mf/data-access-user';

import { map, Subject, takeUntil } from 'rxjs';
import { SanitarioService } from '../../services/sanitario.service';
 
/**
 * Componente que gestiona la visualización de datos y permite cambiar entre diferentes pestañas o subtítulos.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy {
  
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /*
  * @description Notificador para destruir el componente y cancelar suscripciones.
  */
    private destroyNotifier$: Subject<void> = new Subject();
    /*
  * @description Estado actual de la consulta, obtenido desde el store.
    */
  public consultaState!:ConsultaioState;
 /**
   * Constructor del componente DatosComponent.
   * @param consultaQuery ConsultaQuery para obtener el estado de la consulta.
   * @param formularioRegistroService Servicio para manejar el registro del formulario.
   */
  constructor( private consultaQuery: ConsultaioQuery,
     private sanitarioService: SanitarioService
  ){}
  ngOnInit(): void {

     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
  guardarDatosFormulario(): void {
    this.sanitarioService
      .getSolicitudData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.sanitarioService.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Índice del subtítulo seleccionado.
   * Se utiliza para determinar qué sección de datos se muestra.
   * Inicialmente, el valor es 1.
   */
  indice: number = 1;
 
  /**
   * Método para cambiar el índice del subtítulo seleccionado.
   *
   * @param i - Índice del nuevo subtítulo seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

   /*
    * Método que se ejecuta al destruir el componente.
  */

   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
 