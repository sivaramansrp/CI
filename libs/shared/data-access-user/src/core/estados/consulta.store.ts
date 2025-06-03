import { Store, StoreConfig } from '@datorama/akita';
import { ConsultaioSolicitante } from '../models/consultaio-solicitante.model';
import { Injectable } from '@angular/core';

/**
 * Estado para la información de Consultaio obtenida del inicio de sesión
 */
export interface ConsultaioState {
  procedureId: string;
  parameter: string;
  department: string;
  folioTramite: string;
  tipoDeTramite: string;
  estadoDeTramite: string;
  readonly: boolean;
  create: boolean;
  update: boolean;
  consultaioSolicitante: ConsultaioSolicitante | null;
}

/**
 * Creación del estado inicial para el Consultaio
 * @returns ConsultaioState
 */
export function createConsultaInitialState(): ConsultaioState {
  return {
    procedureId: '230501',
    parameter: '',
    department: 'Semarnat',
    folioTramite: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    readonly: false,
    create: false,
    update: true,
    consultaioSolicitante: null,
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
    department: string, folioTramite: string, tipoDeTramite: string, estadoDeTramite: string, readonly: boolean, create: boolean, update: boolean): void {
    this.update(state => ({
      ...state,
      procedureId,
      parameter,
      department,
      folioTramite,
      tipoDeTramite,
      estadoDeTramite,
      readonly,
      create,
      update,
    }));
  }
  /**
 * Actualiza la información del solicitante en el estado de Consultaio.
 * 
 * Este método guarda los datos del solicitante proporcionados en el estado de Consultaio.
 * Se utiliza para mantener actualizada la información del solicitante en la sesión.
 * 
 * @param {ConsultaioSolicitante} consultaioSolicitante - Objeto que contiene la información del solicitante.
 */
  public solicitanteConsultaio(consultaioSolicitante: ConsultaioSolicitante | null): void {
    this.update(state => ({
      ...state, consultaioSolicitante
    }));
  }
}