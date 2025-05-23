import { Component, OnInit } from '@angular/core';
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
export class DatosMercanciaComponent implements OnInit {



  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
  public tieneConsulta:any= {
    readonly: true,
    create: false,
    update: false,
  }
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
      this.getBandejaSolicitudesDatos();
    // if(this.consultaState.readonly) {
      
    // } else {
    //   this.esDatosRespuesta = true;
    // }
  }

  public getBandejaSolicitudesDatos() {
    // this.tieneConsulta.readonly = this.consultaState.readonly;
    // this.tieneConsulta.create = this.consultaState.create;
    // this.tieneConsulta.update = this.consultaState.update;
    this.exportadorAutorizadoService.getRegistro()
      .subscribe((response: Tramite110102State) => {
        if(response) {
          this.esDatosRespuesta = true;
          console.log('response', response);
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
}