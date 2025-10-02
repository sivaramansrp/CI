import { Component, type OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { FormBuilder } from '@angular/forms';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import { map, takeUntil } from 'rxjs/operators';
import { PROCESO_TABLA } from '../constante110101.enum';
import { ProcesoSolicitado } from '../../models/response/validar-fraccion-response.model';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';

import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {

  /**
   * Tipo de selección utilizado en la tabla, definido como casillas de verificación (checkbox).
   * @type {TablaSeleccion}
   */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<ProcesoSolicitado>[] = PROCESO_TABLA;

  /** Un array de objetos `procesosSolicitado` que representa los datos para la tabla de solicitudes.*/
  public procesosTablaDatos: ProcesoSolicitado[] = [];

  /**
  * **Subject utilizado para manejar la destrucción de suscripciones**
  * 
  * Este `Subject` se emite en `ngOnDestroy` para notificar y completar todas las
  * suscripciones activas, evitando posibles fugas de memoria en el componente.
  */
  private destroy$ = new Subject<void>();

  /**
   * Representa el estado actual del solicitante (Solicitante) para el trámite 110101.
   * Esta propiedad contiene toda la información relevante sobre los datos y el estado
   * del solicitante dentro del contexto del trámite.
   */
  public solicitudeState!: Solicitante110101State;

  /** Almacena las filas seleccionadas de la tabla */
  public procesoSeleccionado: ProcesoSolicitado[] = [];
  

  /**
   * Inicializa el ProcesosComponent.
   * @param fb - Servicio FormBuilder utilizado para crear y gestionar formularios reactivos.
   */
  constructor(private fb: FormBuilder,
    private solicitanteQuery: Solicitante110101Query,
    private tramite110101Store: Tramite110101Store
  ){
    
  }
  /**
   * Método que se ejecuta al iniciar el componente. 
   * @returns void
   */
  ngOnInit(): void { 
    this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
      this.solicitudeState = seccionState;
    })).subscribe();
    if (this.solicitudeState.validacionFraccionArancelaria.mercancia.procesos_solicitados?.length){
      this.procesosTablaDatos = this.solicitudeState.validacionFraccionArancelaria.mercancia.procesos_solicitados
    }
  }

  /**
   * Maneja el cambio de selección en la tabla procesos.
   * @param filaSeleccionadas - Array de registros seleccionados en la tabla.
   */
  onSeleccionChange(procesoSeleccionado: ProcesoSolicitado[]) :void{
      this.procesoSeleccionado = [...procesoSeleccionado]; 
      this.tramite110101Store.clearProcesoSolicitado();
      this.tramite110101Store.addProcesoSolicitado(this.procesoSeleccionado);
  }
}
