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
  nombredelaEmbarcación:string,
  numerodeVuelo:string,
  nombre:string,
  primerApellido:string,
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
    nombredelaEmbarcación:'',
    numerodeVuelo:'',
    nombre:'',
    primerApellido:'',
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

  public setpuertodeEmbarque(puertodeEmbarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeEmbarque,
      }));
    }
    public setpuertodeDesembarque(puertodeDesembarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeDesembarque,
      }));
    }
    public setnombredelaEmbarcación(nombredelaEmbarcación: string): void {
      this.update((state) => ({
        ...state,
        nombredelaEmbarcación,
      }));
    }
    public setnúmerodeVuelo(numerodeVuelo: string): void {
      this.update((state) => ({
        ...state,
        numerodeVuelo,
      }));
    }
    public setPuertodeTránsito(puertodeTransito : string):void{
      this.update((state) => ({
        ...state,
        puertodeTransito,
      }));
    }
    public setnombre(nombre : string):void{
      this.update((state) => ({
        ...state,
        nombre,
      }));
    }
    public setprimerApellido(primerApellido : string):void{
      this.update((state) => ({
        ...state,
        primerApellido,
      }));
    }
    public setnúmeroderegistroFiscal(numeroderegistroFiscal : string):void{
      this.update((state) => ({
        ...state,
        numeroderegistroFiscal,
      }));
    }
    public setrazónSocial(razonSocial : string):void{
      this.update((state) => ({
        ...state,
        razonSocial,
      }));
    }
    public setcalle(calle : string):void{
      this.update((state) => ({
        ...state,
        calle,
      }));
    }
    public setnúmeroLetra(numeroLetra : string):void{
      this.update((state) => ({
        ...state,
        numeroLetra,
      }));
    }
    public setciudad(ciudad : string):void{
      this.update((state) => ({
        ...state,
        ciudad,
      }));
    }
    public setcorreoElectrónico(correoElectronico : string):void{
      this.update((state) => ({
        ...state,
        correoElectronico,
      }));
    }
    public setfax(fax : string):void{
      this.update((state) => ({
        ...state,
        fax,
      }));
    }
    public setteléfono(telefono : string):void{
      this.update((state) => ({
        ...state,
        telefono,
      }));
    }
    public setnombredelRepresentante(nombredelRepresentante : string):void{
      this.update((state) => ({
        ...state,
        nombredelRepresentante,
      }));
    }
    public setcargo(cargo : string):void{
      this.update((state) => ({
        ...state,
        cargo,
      }));
    }
    public setteléfonos(telefonos : string):void{
      this.update((state) => ({
        ...state,
        telefonos,
      }));
    }
    public setfaxs(faxs : string):void{
      this.update((state) => ({
        ...state,
        faxs,
      }));
    }
    public setcorreoElectrónicos(correoElectronicos : string):void{
      this.update((state) => ({
        ...state,
        correoElectronicos,
      }));
    }
    public setlugar(lugar : string):void{
      this.update((state) => ({
        ...state,
        lugar,
      }));
    }
    public setobservaciones(observaciones : string):void{
      this.update((state) => ({
        ...state,
        observaciones,
      }));
    }
    public storeTableValues(fila : CompliMentaria):void{
      this.update((state) => {
        
        const TABLE_DATA = [...state.tableDataDatos, fila]
        return{
            ...state,
            tableDataDatos: TABLE_DATA
        }
        
      });
    }
    public setUnidadeMedida(unidaddeMedidadeComercializacion: Catalogo):void{
      this.update((state) => ({
        ...state,
        unidaddeMedidadeComercializacion,
      }));
    }
    public setTipodeFactura(tipodeFactura:Catalogo):void{
      this.update((state) => ({
        ...state,
        tipodeFactura,
      }));
    }

    public setComplementoDelaDescripcion(complementoDelaDescripcion: string): void {
      this.update((state) => ({
         ...state,
          complementoDelaDescripcion 
        }));
    }

    public setMarca(marca: string): void {
      this.update((state) => ({
         ...state,
          marca 
        }));
    }

    public setValorMercancia(valorMercancia: string): void {
      this.update((state) => ({
         ...state,
         valorMercancia 
        }));
    }
    public setNumerodeFactura(numerodeFactura: string): void {
      this.update((state) => ({
         ...state, 
         numerodeFactura 
        }));
      }
    
}

