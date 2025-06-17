import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ImportacionDestinadosDonacioService } from '../../services/importacion-destinados-donacio.service';
import { Tramite260209Query } from '../../estados/tramite260209Query.query';
import { Tramite260209Store } from '../../estados/tramite260209Store.store';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  
  /**
   * Índice de la pestaña/tab actualmente seleccionada.
   * Puede ser undefined si no hay pestaña seleccionada.
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * Subject utilizado para manejar la desuscripción de observables
   * cuando el componente es destruido.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Constructor que inyecta las dependencias necesarias para el manejo del estado del trámite.
   * @constructor
   * @param {Tramite260209Query} tramite260209Query - Query para acceder al estado del trámite
   * @param {Tramite260209Store} tramite260209Store - Store para actualizar el estado del trámite
   * @param {ConsultaioQuery} consultaQuery - Query para acceder al estado de la consulta
   * @param {ImportacionDestinadosDonacioService} importacionDestinadosDonacioService - Servicio para importar datos de donación
   */
  constructor(
    private tramite260209Query: Tramite260209Query,
    private tramite260209Store: Tramite260209Store,
    private consultaQuery: ConsultaioQuery,
    private importacionDestinadosDonacioService: ImportacionDestinadosDonacioService,
  ) { 
     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Se suscribe a los cambios en la pestaña seleccionada del trámite.
   * @method ngOnInit
   */
  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260209' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

    this.tramite260209Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
  * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
  * Luego reinicializa el formulario con los valores actualizados desde el store.
  */
  guardarDatosFormulario(): void {
    this.importacionDestinadosDonacioService.getRegistroTomaMuestrasMercanciasData().pipe(
      takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.importacionDestinadosDonacioService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza la pestaña seleccionada en el store del trámite.
   * @method seleccionaTab
   * @param {number} i - Índice de la nueva pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.tramite260209Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Limpia las suscripciones activas emitiendo un valor al destroyNotifier$
   * y completando el subject.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
