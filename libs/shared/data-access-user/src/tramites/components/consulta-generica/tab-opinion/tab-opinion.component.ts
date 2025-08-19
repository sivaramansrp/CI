import { CommonModule } from '@angular/common';

import { Component, Input, OnDestroy} from '@angular/core';

import { OpinionComponent } from "../consulta-opinion/opiniones.component";

import { DetalleOpinionComponent } from '../consulta-detalle-opinion/detalle-opinion.component';
import { DetalleOpinonService } from '../../../../core/services/130118/detalleOpinion.service';
import { OpinionDetalleResponse } from '../../../../core/models/130118/opinion-detalle-response.model';
import { OpinionResponse } from '../../../../core/models/130118/opinion-response.model';
import { Subject } from 'rxjs';


@Component({
  selector: 'tab-opinion',
  standalone: true,
  imports: [CommonModule, OpinionComponent, DetalleOpinionComponent],
  templateUrl: './tab-opinion.component.html',
  styleUrl: './tab-opinion.component.scss',
})
export class TabOpinionComponent implements OnDestroy{

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice de la pestaña seleccionada en la interfaz de usuario.
   */
  indice: number = 1;

  /** Listado de opiniones (input desde componente padre) */
  @Input() opinion: OpinionResponse[] = [];

  /**
   * Detalle completo de la solicitud/opinión seleccionada
   */
  solicitud!: OpinionDetalleResponse;

  /**
   * ID de la opinión actualmente seleccionada
   */
  idOpinionActual!: string;

  /**
   * @property {number} tramite
   * @description Identificador del trámite asociado a las pestañas.
   */
  @Input() tramite!: number;

  /**
   * Constructor del componente
   * @param detalleOpinonService Servicio para obtener detalles de opiniones
   */
  constructor(
        private detalleOpinonService: DetalleOpinonService
  ) { }

  
  /**
   * Maneja la selección de una opinión
   * @param id ID de la opinión seleccionada
   */
  onIdOpinionSeleccionada(id: number): void {
    this.idOpinionActual = id.toString();
    this.seleccionaTab(2); 
     this.getSolicitud(this.idOpinionActual);
  }

  /**
   * Obtiene el detalle completo de una solicitud/opinión
   * @param idOpinion ID de la opinión a consultar
   */
  getSolicitud(idOpinion: string): void {
    this.detalleOpinonService
      .getDetalleOpinion(this.tramite, idOpinion)
      .subscribe((data) => {
       if (data.codigo === "00") {
          this.solicitud = data.datos ?? {} as OpinionDetalleResponse;
          this.seleccionaTab(2); 
        }

      });
  }

  /**
   * Ciclo de vida: OnDestroy
   * Limpia las suscripciones activas
   */
  ngOnDestroy(): void {
     this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Cambia la pestaña seleccionada en la UI.
   * @param i Índice de la pestaña a activar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}
