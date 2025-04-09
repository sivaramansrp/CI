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

  public establecerPuertodeEmbarque(puertodeEmbarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeEmbarque,
      }));
    }
    public establecerPuertodeDesembarque(puertodeDesembarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeDesembarque,
      }));
    }
    public establecerNombredelaEmbarcacion(nombredelaEmbarcacion: string): void {
      this.update((state) => ({
        ...state,
        nombredelaEmbarcacion,
      }));
    }
    public establecerNúmerodeVuelo(numerodeVuelo: string): void {
      this.update((state) => ({
        ...state,
        numerodeVuelo,
      }));
    }
    public establecerPuertodeTránsito(puertodeTransito : string):void{
      this.update((state) => ({
        ...state,
        puertodeTransito,
      }));
    }
    public establecerNombre(nombre : string):void{
      this.update((state) => ({
        ...state,
        nombre,
      }));
    }
    public establecerPrimerApellido(primerApellido : string):void{
      this.update((state) => ({
        ...state,
        primerApellido,
      }));
    }
    public establecerNúmeroderegistroFiscal(numeroderegistroFiscal : string):void{
      this.update((state) => ({
        ...state,
        numeroderegistroFiscal,
      }));
    }
    public establecerRazónSocial(razonSocial : string):void{
      this.update((state) => ({
        ...state,
        razonSocial,
      }));
    }
    public establecerCalle(calle : string):void{
      this.update((state) => ({
        ...state,
        calle,
      }));
    }
    public establecerNúmeroLetra(numeroLetra : string):void{
      this.update((state) => ({
        ...state,
        numeroLetra,
      }));
    }
    public establecerCiudad(ciudad : string):void{
      this.update((state) => ({
        ...state,
        ciudad,
      }));
    }
    public establecerCorreoElectrónico(correoElectronico : string):void{
      this.update((state) => ({
        ...state,
        correoElectronico,
      }));
    }
    public establecerFax(fax : string):void{
      this.update((state) => ({
        ...state,
        fax,
      }));
    }
    public establecerTeléfono(telefono : string):void{
      this.update((state) => ({
        ...state,
        telefono,
      }));
    }
    public establecerNombredelRepresentante(nombredelRepresentante : string):void{
      this.update((state) => ({
        ...state,
        nombredelRepresentante,
      }));
    }
    public establecerCargo(cargo : string):void{
      this.update((state) => ({
        ...state,
        cargo,
      }));
    }
    public establecerTeléfonos(telefonos : string):void{
      this.update((state) => ({
        ...state,
        telefonos,
      }));
    }
    public establecerFaxs(faxs : string):void{
      this.update((state) => ({
        ...state,
        faxs,
      }));
    }
    public establecerCorreoElectrónicos(correoElectronicos : string):void{
      this.update((state) => ({
        ...state,
        correoElectronicos,
      }));
    }
    public establecerLugar(lugar : string):void{
      this.update((state) => ({
        ...state,
        lugar,
      }));
    }
    public establecerObservaciones(observaciones : string):void{
      this.update((state) => ({
        ...state,
        observaciones,
      }));
    }
    public almacenarValoresDeTabla(fila : CompliMentaria):void{
      this.update((state) => {
        
        const TABLE_DATA = [...state.tableDataDatos, fila]
        return{
            ...state,
            tableDataDatos: TABLE_DATA
        }
        
      });
    }
    public establecerUnidadeMedida(unidaddeMedidadeComercializacion: Catalogo):void{
      this.update((state) => ({
        ...state,
        unidaddeMedidadeComercializacion,
      }));
    }
    public establecerTipodeFactura(tipodeFactura:Catalogo):void{
      this.update((state) => ({
        ...state,
        tipodeFactura,
      }));
    }

    public establecerComplementoDelaDescripcion(complementoDelaDescripcion: string): void {
      this.update((state) => ({
         ...state,
          complementoDelaDescripcion 
        }));
    }

    public establecerMarca(marca: string): void {
      this.update((state) => ({
         ...state,
          marca 
        }));
    }

    public establecerValorMercancia(valorMercancia: string): void {
      this.update((state) => ({
         ...state,
         valorMercancia 
        }));
    }
    public establecerNumerodeFactura(numerodeFactura: string): void {
      this.update((state) => ({
         ...state, 
         numerodeFactura 
        }));
      }
    
}

