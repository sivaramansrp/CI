import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { NUMERO_TRAMITE } from '../../../../shared/constants/datos-solicitud.enum';
import { Tramite240122Store } from '../../estados/tramite240122Store.store';

/**
 * @title Datos de la Mercancía Contenedora
 * @description Componente contenedor encargado de recibir los datos de mercancía y actualizar el estado global del trámite.
 * @summary Actúa como puente entre el componente de datos de mercancía y el store de Akita.
 */
/**
 * Componente que representa los datos de mercancía contenedora.
 * 
 * Este componente es parte del trámite 240122 y se encarga de gestionar
 * y actualizar los datos de mercancías en el store correspondiente.
 * 
 * @selector app-datos-mercancia-contenedora
 * @standalone true
 * @imports CommonModule, DatosMercanciaComponent
 * @templateUrl ./datos-mercancia-contenedora.component.html
 * @styleUrl ./datos-mercancia-contenedora.component.scss
 */
@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
  imports: [CommonModule, DatosMercanciaComponent],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
})
export class DatosMercanciaContenedoraComponent {
    /**
     * Identificador único del procedimiento asociado al trámite.
     * 
     * @property {number} idProcedimiento
     * @remarks Este valor se utiliza para identificar el trámite específico.
     */
    idProcedimiento = NUMERO_TRAMITE.TRAMITE_240122;

    /**
     * Constructor del componente.
     *
     * @method constructor
     * @param {Tramite240122Store} tramiteStore - Store de Akita para actualizar el estado de la tabla de mercancías.
     * @returns {void}
     */
    // eslint-disable-next-line no-empty-function
    constructor(private tramiteStore: Tramite240122Store) {}

    /**
     * Actualiza los datos de la tabla de mercancía en el store.
     *
     * @method updateMercanciaDetalle
     * @param {MercanciaDetalle[]} event - Lista de mercancías actualizada desde el formulario.
     * @returns {void}
     */
    updateMercanciaDetalle(event: MercanciaDetalle[]): void {
      this.tramiteStore.updateMercanciaTablaDatos(event);
    }
}
