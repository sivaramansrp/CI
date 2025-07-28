import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEmpresaTransportista } from '../modelos/aviso-de-transportistas.model';

export interface Solicitud33304State {
  cambioDocumentoUsoGoce: boolean;
  fusionEscisionEmpresas: boolean;
  reestructuracion: boolean;
  transportistas: boolean;
  BAJO_MANIFIESTO: boolean;
  fusionOEscision: boolean;
  fusionConEmpresasNoCertificadas: boolean; 
  empresaSubsistente: boolean;
  transportistasLista: TablaEmpresaTransportista[];
}

export function createInitialState(): Solicitud33304State {
  return {
    cambioDocumentoUsoGoce: false,
    fusionEscisionEmpresas: false,
    reestructuracion: false,
    transportistas: false,
    BAJO_MANIFIESTO: false,
    fusionOEscision: false,
    fusionConEmpresasNoCertificadas: false,
    empresaSubsistente: false,
    transportistasLista: []
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite33304', resettable: true })
export class Solicitud33304Store extends Store<Solicitud33304State> {

  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud33304State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  } 
}
