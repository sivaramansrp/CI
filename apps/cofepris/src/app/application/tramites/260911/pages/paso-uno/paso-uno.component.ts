import { Component, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260911Service } from '../../services/service260911.service';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {

    /**
   * Indica si se han recibido correctamente los datos desde el servidor.
   */
  public esDatosRespuesta: boolean = false;

    /**
   * Subject utilizado para cancelar suscripciones y evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  
  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;
  /**
   * El índice de la pestaña actualmente seleccionada.
   */

  constructor(private consultaQuery: ConsultaioQuery, private solocitud120402Service: Solocitud260911Service,) {}
  indice: number = 1;

    /**
   * Hook del ciclo de vida de Angular.
   * Se ejecuta al inicializar el componente y se suscribe al estado del store.
   */
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
   * Solicita los datos del formulario al servicio y actualiza el store si la respuesta es válida.
   */
  guardarDatosFormulario(): void {
    this.solocitud120402Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud120402Service.actualizarEstadoFormulario(resp);
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

    /**
   * Hook del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Libera recursos cancelando todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
