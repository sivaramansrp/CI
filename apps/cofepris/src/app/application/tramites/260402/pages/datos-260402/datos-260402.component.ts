import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260402Service } from '../../services/service260402.service';

/**
 * @descripción
 * Componente `Datos260212Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260402',
  standalone: false,
  templateUrl: './datos-260402.component.html',
})
export class Datos260402Component implements OnInit {
  public esDatosRespuesta: boolean = false;
  public consultaState!: ConsultaioState;
   private destroyNotifier$: Subject<void> = new Subject();
  /**
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

  constructor( private consultaQuery: ConsultaioQuery, private solocitud220401Service: Solocitud260402Service,) {}

   ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }
  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  guardarDatosFormulario(): void {
    this.solocitud220401Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud220401Service.actualizarEstadoFormulario(resp);
        }
      });
  }
}
