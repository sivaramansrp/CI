import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface que representa el estado de la solicitud para el trámite 90201.
 * Este estado contiene la información relacionada con los datos de la solicitud.
 * @interface ComplementarState complementar.store.ts
 */
export interface ComplementarState {

  permanecera: string;
  tipo: string;
  fechaDeFirma: string;
  fetchaDeFinDeVigencia: string;
   tipos: string;
  cantidad: string;
  descripsion: string;
  mnx: string;
   totalDeEmpleados: string;
  directos: string;
  indirectos: string;
  directo: string;
  cedula: string;
  fechaCedula: string;
  indirectosDatos: string;
  contrato: string;
  objeto: string;
  fechaFirma: string;
  fechaFinVigencia: string;
  rfcEmpresa: string;
  razonSocial: string;
  

}

/**
 * Función para crear el estado inicial de la solicitud.
 * @returns {ComplementarState} El estado inicial con valores vacíos para cada propiedad.
 */
export function createInitialState(): ComplementarState {
  return {
    permanecera: '',
    tipo: '',
    fechaDeFirma: '',
    fetchaDeFinDeVigencia: '',
     tipos: '',
    cantidad: '',
    descripsion: '',
    mnx: '',
       totalDeEmpleados: '',
    directos: '',
    indirectos: '',
    directo: '',
    cedula: '',
    fechaCedula: '',
    indirectosDatos: '',
    contrato: '',
    objeto: '',
    fechaFirma: '',
    fechaFinVigencia: '',
    rfcEmpresa: '',
    razonSocial: ''
  };
}
/**
 * Store para la gestión del estado de la solicitud del trámite 221602.
 * Utiliza Akita para la gestión de estado y permite actualizar los valores relacionados con el trámite.
 * @class Tramite221602Store
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Complementar', resettable: true })
export class ComplementarStore extends Store<ComplementarState> {
  /**
   * Constructor del store que inicializa el estado con el estado inicial creado.
   */
  constructor() {
    super(createInitialState());
  }
public setPermanecera(permanecera: string): void {
  this.update((state) => ({
    ...state,
    permanecera,
  }));
}

public setTipo(tipo: string): void {
  this.update((state) => ({
    ...state,
    tipo,
  }));
}

public setFechaDeFirma(fechaDeFirma: string): void {
  this.update((state) => ({
    ...state,
    fechaDeFirma,
  }));
}

public setFetchaDeFinDeVigencia(fetchaDeFinDeVigencia: string): void {
  this.update((state) => ({
    ...state,
    fetchaDeFinDeVigencia,
  }));
}
public setTipos(tipos: string): void {
    this.update((state) => ({ ...state, tipos }));
  }

  public setCantidad(cantidad: string): void {
    this.update((state) => ({ ...state, cantidad }));
  }

  public setDescripsion(descripsion: string): void {
    this.update((state) => ({ ...state, descripsion }));
  }

  public setMnx(mnx: string): void {
    this.update((state) => ({ ...state, mnx }));
  }
public setTotalDeEmpleados(totalDeEmpleados: string): void {
  this.update((state) => ({ ...state, totalDeEmpleados }));
}

public setDirectos(directos: string): void {
  this.update((state) => ({ ...state, directos }));
}

public setIndirectos(indirectos: string): void {
  this.update((state) => ({ ...state, indirectos }));
}

public setDirecto(directo: string): void {
  this.update((state) => ({ ...state, directo }));
}

public setCedula(cedula: string): void {
  this.update((state) => ({ ...state, cedula }));
}

public setFechaCedula(fechaCedula: string): void {
  this.update((state) => ({ ...state, fechaCedula }));
}

public setIndirectosDatos(indirectosDatos: string): void {
  this.update((state) => ({ ...state, indirectosDatos }));
}

public setContrato(contrato: string): void {
  this.update((state) => ({ ...state, contrato }));
}

public setObjeto(objeto: string): void {
  this.update((state) => ({ ...state, objeto }));
}

public setFechaFirma(fechaFirma: string): void {
  this.update((state) => ({ ...state, fechaFirma }));
}

public setFechaFinVigencia(fechaFinVigencia: string): void {
  this.update((state) => ({ ...state, fechaFinVigencia }));
}

public setRfcEmpresa(rfcEmpresa: string): void {
  this.update((state) => ({ ...state, rfcEmpresa }));
}

public setRazonSocial(razonSocial: string): void {
  this.update((state) => ({ ...state, razonSocial }));
}


}
