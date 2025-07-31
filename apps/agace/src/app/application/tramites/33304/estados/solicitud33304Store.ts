import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEmpresaFusionada } from '../modelos/aviso-de-empresa-fusionadas.model';
import { TablaEmpresaTransportista } from '../modelos/aviso-de-transportistas.model';

export interface Solicitud33304State {
  cambioDocumentoUsoGoce: boolean; //Cambio de documento de uso o goce
  fusionEscisionEmpresas: boolean; //Fusión o escisión de empresas
  reestructuracion: boolean; //Reestructuración
  transportistas: boolean; //¿Incluye transportistas?
  BAJO_MANIFIESTO: boolean; //Bajo manifiesto
  avisoDeOperacion: number | string; //Aviso de operación
  tipoOperacion: number | string; //Tipo de operación
  cuenta: number | string; //Cuenta
  rfc: string; //RFC
  denominacion: string; //Denominación o razón social
  fechaFusioneEfecto: string; //Fecha de fusión con efecto
  folioAcuse: string; //Folio del acuse
  registroCertificacion: string; //Registro de certificación
  empresaFusionadasLista: TablaEmpresaFusionada[]; //Lista de empresas fusionadas
  transportistasLista: TablaEmpresaTransportista[]; //Lista de empresas transportistas
}


export function createInitialState(): Solicitud33304State {
  return {
    cambioDocumentoUsoGoce: false, //Cambio de documento de uso o goce
    fusionEscisionEmpresas: false, //Fusión o escisión de empresas
    reestructuracion: false, //Reestructuración
    transportistas: false, //¿Incluye transportistas?
    BAJO_MANIFIESTO: false, //Bajo manifiesto
    avisoDeOperacion: 0, //Aviso de operación
    tipoOperacion: 0, //Tipo de operación
    cuenta: 0, //Cuenta
    rfc: '', //RFC
    denominacion: '', //Denominación o razón social
    fechaFusioneEfecto: '', //Fecha de fusión con efecto
    folioAcuse: '', //Folio del acuse
    registroCertificacion: '', //Registro de certificación
    empresaFusionadasLista: [], //Lista de empresas fusionadas
    transportistasLista: [], //Lista de empresas transportistas
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
