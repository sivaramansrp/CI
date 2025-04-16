import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { VehiculosTabla } from '../modelos/registro-empresas-transporte.model';


/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns Tramites30401State
 */
export interface Tramites30401State {
  claveDeReferencia: string;
  cadenaPagoDependencia: string;
  clave: string;
  llaveDePago: string;
  fecPago: string;
  impPago: string;
  manifiestoDeclaracion:boolean;

  cveFolioCaat: string;
  tipoTransito: string;
  cboAduanasActuarSeleccionadas: string[];
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  entidadFederativa: string;
  delegacionMunicipio: string;
  colonia: string;
  localidad: string;
  codigoPostal: string;
  capitalSocial: string;
  numeroFolioPermiso: string;
  fechaExpedicion: string;
  elCapitalSocial: boolean;
  miRepresentada: boolean;
  vehiculosTablaDatos:VehiculosTabla[];

}



export function createInitialState(): Tramites30401State {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    manifiestoDeclaracion:false,

    cveFolioCaat: '',
    tipoTransito: '',
    cboAduanasActuarSeleccionadas: [],
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    localidad: '',
    codigoPostal: '',
    capitalSocial: '',
    numeroFolioPermiso: '',
    fechaExpedicion: '',
    elCapitalSocial: false,
    miRepresentada: false,
    vehiculosTablaDatos:[]
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites30401', resettable: true })
export class Tramite30401Store extends Store<Tramites30401State> {
  constructor() {
    super(createInitialState());
  }
  
  public establecerDatos(values: Partial<Tramites30401State>): void {    
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }

  /**
   * method vetVehiculosTablaDatos
   * description Actualiza los datos de la tabla de mercancías en el estado.
   * param {ConfiguracionItem[]} vehiculosTablaDatos Datos de la tabla de mercancías.
   */
  public setVehiculosTablaDatos(vehiculosTablaDatos: VehiculosTabla[]): void {
    this.update((state) => ({
      ...state,
      vehiculosTablaDatos,
    }));
  }
}