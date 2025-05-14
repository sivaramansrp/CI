import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado para la información de Consultaio obtenida del inicio de sesión
 */
export interface ConsultaioState {
    procedureId: string;
    parameter: string;
    department: string;
    folioTramite:string;
    tipoDeTramite:string;
    readonly: boolean;
    create: boolean;
    update: boolean;
}

/**
 * Creación del estado inicial para el Consultaio
 * @returns ConsultaioState
 */
export function createConsultaInitialState(): ConsultaioState {
  return {
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite:'',
    tipoDeTramite:'',
    readonly: false,
    create: true,
    update: false,
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'Consultaio', resettable: true, })
export class ConsultaioStore extends Store<ConsultaioState> {
  constructor() {
    super(createConsultaInitialState());
  }

  /**
   * Guarda la información del Consultaio registrado en la sesión dentro del state
   *
   * @param logueado
   * @param token
   * @param nombre
   */
  public establecerConsultaio(procedureId: string, parameter: string,
    department: string, folioTramite:string, tipoDeTramite:string, readonly: boolean, create: boolean, update: boolean): void {
    this.update(state => ({
      ...state,
      procedureId,
      parameter,
      department,
      folioTramite,
      tipoDeTramite,
      readonly,
      create,
      update,
    }));
  }
}