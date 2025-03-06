import { Injectable } from '@angular/core';
import { ListaDeFechas } from '../../models/registro-muestras-mercancias.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Crea el estado inicial con las fechas de vigencia predefinidas.
 * 
 * @returns Un objeto `ListaDeFechas` con las fechas predeterminadas.
 */
export function crearEstadoInicial(): ListaDeFechas {
  return {
    fechaInicioVigencia: '01/01/2024',
    fechaFinVigencia: '31/12/2025',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'DatosProrrogaMuestrasMercanciasStore', resettable: true })
export class DatosProrrogaMuestrasMercanciasStore extends Store<ListaDeFechas> {
  /**
   * Inicializa la tienda con el estado predeterminado.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza las fechas de vigencia en el estado de la tienda.
   * 
   * @param fechaInicio - Nueva fecha de inicio de vigencia.
   * @param fechaFin - Nueva fecha de fin de vigencia.
   */
  actualizarFechas(fechaInicio: string, fechaFin: string): void {
    this.update({
      fechaInicioVigencia: fechaInicio,
      fechaFinVigencia: fechaFin,
    });
  }

  /**
   * Restablece el estado de la tienda a los valores iniciales.
   */
  resetStore(): void {
    this.reset();
  }
}
