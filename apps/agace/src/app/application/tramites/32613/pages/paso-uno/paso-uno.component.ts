import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})

export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  public indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  constructor(private consultaQuery: ConsultaioQuery) {
      // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
    }

  /**
     * Método que se ejecuta al inicializar el componente.
     */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
            if (this.consultaState.update) {
              // this.guardarDatosFormulario();
            } else {
              this.esDatosRespuesta = true;
            }
          })
        )
        .subscribe();
    }

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
