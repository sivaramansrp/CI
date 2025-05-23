import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@libs/shared/data-access-user/src/core/estados/consulta.store';

import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110102State } from '../../estados/store/tramite110102.store';

import { ExportadorAutorizadoService } from '../../service/exportador-autorizado.service';

/**
 * Componente DataosMercanciaComponent.
 *
 * Este componente representa la sección de datos de la mercancía.
 * Actualmente, no contiene lógica adicional y sirve como un contenedor
 * para la vista definida en 'dataos-de-la-mercancia.component.html'.
 */
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  standalone: false, // Indica que este componente no es un componente independiente (standalone).
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {



  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
    /**
   * Índice de la pestaña actualmente seleccionada.
   * Inicializado a 1 por defecto.
   */
    indice: number = 1;


    constructor(
      private exportadorAutorizadoService: ExportadorAutorizadoService,
    private consultaQuery: ConsultaioQuery
  ) {
  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
      
    if(this.consultaState.readonly) {
      this.getBandejaSolicitudesDatos();
    } else {
      this.esDatosRespuesta = true;
    }
  }

   getBandejaSolicitudesDatos():void {
    this.exportadorAutorizadoService.getRegistro()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response: Tramite110102State) => {
        if(response) {
          this.esDatosRespuesta = true;
          this.exportadorAutorizadoService.setRegistro(response);
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}