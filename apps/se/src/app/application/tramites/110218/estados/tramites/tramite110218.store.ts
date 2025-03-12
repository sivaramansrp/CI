import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 
 * @returns Solicitud120501
 */
export interface Solicitud110218State {
  puertodeEmbarque: string,
  puertodeDesembarque:string,
  puertodeTránsito:string,
  nombredelaEmbarcación:string,
  númerodeVuelo:string,
  nombre:string,
  primerApellido:string,
  númeroderegistroFiscal:string,
  razónSocial:string,
  calle:string,
  númeroLetra:string,
  ciudad:string,
  correoElectrónico:string,
  fax:string,
  teléfono:string,
  nombredelRepresentante:string,
  cargo:string,
  teléfonos:string,
  faxs:string,
  correoElectrónicos:string
  lugar:string,
  observaciones:string,
  tableDataDatos:CompliMentaria[],
  unidaddeMedidadeComercializacion: Catalogo | null
}


export function createInitialState(): Solicitud110218State {
  return{
    puertodeEmbarque:'',
    puertodeDesembarque:'',
    puertodeTránsito:'',
    nombredelaEmbarcación:'',
    númerodeVuelo:'',
    nombre:'',
    primerApellido:'',
    númeroderegistroFiscal:'',
    razónSocial:'',
    calle:'',
    númeroLetra:'',
    ciudad:'',
    correoElectrónico:'',
    fax:'',
    teléfono:'',
    nombredelRepresentante:'',
    cargo:'',
    teléfonos:'',
    faxs:'',
    correoElectrónicos:'',
    lugar:'',
    observaciones:'',
    tableDataDatos: [],
    unidaddeMedidadeComercializacion: null
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
    public setnúmerodeVuelo(númerodeVuelo: string): void {
      this.update((state) => ({
        ...state,
        númerodeVuelo,
      }));
    }
    public setPuertodeTránsito(puertodeTránsito : string):void{
      this.update((state) => ({
        ...state,
        puertodeTránsito,
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
    public setnúmeroderegistroFiscal(númeroderegistroFiscal : string):void{
      this.update((state) => ({
        ...state,
        númeroderegistroFiscal,
      }));
    }
    public setrazónSocial(razónSocial : string):void{
      this.update((state) => ({
        ...state,
        razónSocial,
      }));
    }
    public setcalle(calle : string):void{
      this.update((state) => ({
        ...state,
        calle,
      }));
    }
    public setnúmeroLetra(númeroLetra : string):void{
      this.update((state) => ({
        ...state,
        númeroLetra,
      }));
    }
    public setciudad(ciudad : string):void{
      this.update((state) => ({
        ...state,
        ciudad,
      }));
    }
    public setcorreoElectrónico(correoElectrónico : string):void{
      this.update((state) => ({
        ...state,
        correoElectrónico,
      }));
    }
    public setfax(fax : string):void{
      this.update((state) => ({
        ...state,
        fax,
      }));
    }
    public setteléfono(teléfono : string):void{
      this.update((state) => ({
        ...state,
        teléfono,
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
    public setteléfonos(teléfonos : string):void{
      this.update((state) => ({
        ...state,
        teléfonos,
      }));
    }
    public setfaxs(faxs : string):void{
      this.update((state) => ({
        ...state,
        faxs,
      }));
    }
    public setcorreoElectrónicos(correoElectrónicos : string):void{
      this.update((state) => ({
        ...state,
        correoElectrónicos,
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
}

