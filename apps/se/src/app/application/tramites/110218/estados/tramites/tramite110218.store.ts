import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 
 * Solicitud120501
 */
export interface Solicitud110218State {
  puertodeEmbarque: string,
  puertodeDesembarque:string,
  puertodeTransito:string,
  nombredelaEmbarcacion:string,
  numerodeVuelo:string,
  nombre:string,
  primerApellido:string,
  segundoApellido:string,
  numeroderegistroFiscal:string,
  razonSocial:string,
  calle:string,
  numeroLetra:string,
  ciudad:string,
  correoElectronico:string,
  fax:string,
  telefono:string,
  nombredelRepresentante:string,
  cargo:string,
  telefonos:string,
  faxs:string,
  correoElectronicos:string
  lugar:string,
  observaciones:string,
  tableDataDatos:CompliMentaria[],
  unidaddeMedidadeComercializacion: Catalogo | null,
  tipodeFactura: Catalogo | null,
  complementoDelaDescripcion: string,
  marca: string,
  valorMercancia: string,
  numerodeFactura: string
}


export function createInitialState(): Solicitud110218State {
  return{
    puertodeEmbarque:'',
    puertodeDesembarque:'',
    puertodeTransito:'',
    nombredelaEmbarcacion:'',
    numerodeVuelo:'',
    nombre:'',
    primerApellido:'',
    segundoApellido:'',
    numeroderegistroFiscal:'',
    razonSocial:'',
    calle:'',
    numeroLetra:'',
    ciudad:'',
    correoElectronico:'',
    fax:'',
    telefono:'',
    nombredelRepresentante:'',
    cargo:'',
    telefonos:'',
    faxs:'',
    correoElectronicos:'',
    lugar:'',
    observaciones:'',
    tableDataDatos: [],
    unidaddeMedidadeComercializacion: null,
    tipodeFactura: null,
    complementoDelaDescripcion: '',
    marca: '',
    valorMercancia: '',
    numerodeFactura: ''
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110218', resettable: true })
export class Tramite110218Store extends Store<Solicitud110218State> {
  constructor() {
    super(createInitialState());
  }

      setTramite110218State(valores: Partial<Solicitud110218State>): void {
        this.update((state => ({
          ...state,
          ...valores,
        })));
      }
}

