import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 11201
 * @returns Solicitud11201
 */
export interface Solicitud11201State {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
}

export function createInitialSolicitudState(): Solicitud11201State {
  return {
    rfc: 'AAL0409235E6',
    denominacion: 'AGRICOLA ALPE S DE RL DE CV',
    actividadEconomica: 'Siembra, cultivo y cosecha de papa',
    correoElectronico: 'vucem2.5@hotmail.com',
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud11201', resettable: true })
export class Solicitud11201Store extends Store<Solicitud11201State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  public setRfc(rfc: string) {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }
  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  public setActividadEconomica(actividadEconomica: string) {
    this.update((state) => ({
      ...state,
      actividadEconomica
    }));
  }

  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }

}