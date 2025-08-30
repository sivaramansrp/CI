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


/**
 * Crea el estado inicial para la solicitud 110218.
 * 
 * @returns {Solicitud110218State} El estado inicial con todos los campos predefinidos.
 * 
 * @remarks
 * Este estado incluye información relevante para el trámite, como datos de embarque, 
 * datos personales, información fiscal, datos de contacto y detalles de la mercancía.
 * Todos los campos se inicializan con valores vacíos, nulos o arreglos vacíos según corresponda.
 */
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

/**
 * @description
 * Almacén de estado para el trámite 110218.
 * Utiliza Akita para la gestión del estado de la solicitud.
 * 
 * @componente Tramite110218Store
 * @autor Equipo de Desarrollo
 * @since 2024
 */

/**
 * Actualiza el estado del trámite 110218 con los valores proporcionados.
 * 
 * @param valores - Objeto parcial con las propiedades a actualizar en el estado de la solicitud.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Almacén de estado para el trámite 110218.
 * Utiliza Akita para la gestión del estado de la solicitud.
 */
@StoreConfig({ name: 'tramite110218', resettable: true })

/**
 * @class Tramite110218Store
 * @extends Store<Solicitud110218State>
 * 
 * @description
 * Store especializado para manejar el estado de la solicitud 110218.
 * Proporciona métodos para inicializar y actualizar el estado relacionado con el trámite.
 * 
 * @constructor
 * Inicializa el estado usando la función `createInitialState`.
 * 
 * @method setTramite110218State
 * Actualiza el estado del trámite 110218 con los valores proporcionados.
 * 
 * @param valores - Un objeto parcial de tipo `Solicitud110218State` con los valores a actualizar en el estado.
 */
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

