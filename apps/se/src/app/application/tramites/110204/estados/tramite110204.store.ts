import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/plantas-consulta.model';

// Interfaz que define el estado del trámite.
export interface TramiteState {
  idiomaDatos: Catalogo[];
  entidadFederativaDatos: Catalogo[];
  representacionFederalDatos: Catalogo[];
  altaPlanta: Catalogo[];
  estado: Catalogo;
  factura:Catalogo[];
  facturas:Catalogo,
  umc:Catalogo;
  umcs:Catalogo[],
  paisBloques: Catalogo[];
  paisBloque: Catalogo;
  formCertificado: { [key: string]: undefined | boolean | string | number | object };
  formDatosCertificado: { [key: string]: undefined | boolean | string | number | object };
  mercanciaForm:{ [key: string]: undefined | boolean | string | number | object}
  buscarMercancia: Mercancia[];
  formaValida: { [key: string]: boolean };
}

// Interfaz que define el estado de la solicitud 110204.
export interface Solicitud110204State {
  regimenMercancia: string;
  clasifiRegimen: string;
  valueTA: string;
  fraccionArancelaria: string;
  nico: string;
  unidadMedidaTarifaria: string;
  cantidadTarifaria: number;
  valorFacturaUSD: number;
  precioUnitarioUSD: string;
  paisOrigen: string;
  paisDestino: string;
  lote: string;
  fechaSalida: string;
  observaciones: string;
  observacionMerc: string;
  tipoPersona: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial: string;
  molino: string;
  domicilio: string;
  estado: string;
  paisBloque: string;
  factura:string;
  umc:string;
  representacionFederal: string;
}

// Estado inicial para el trámite.
export const INITIAL_STATE: TramiteState = {
  altaPlanta: [],
  paisBloques: [],
  estado: {
    id: -1,
    descripcion: '',
  },
  umc:{id:-1,descripcion:''},
  umcs:[],
  factura:[],
  formaValida: {},
  formCertificado: {
    entidadFederativa: '',
    tercerOperador: false,
    bloque: '',
    nombreComercialForm: '',
    registroProductoForm: '',
    fracciónArancelariaForm: '',
    fechaInicioInput:'',
    fechaFinalInput:'',
  },
  formDatosCertificado: {
    observacionesDates: '',
    idiomaDates: '',
    EntidadFederativaDates: '',
    representacionFederalDates: '',
  },
  mercanciaForm:{
    fraccionNaladi:'',
    fraccionNaladiSa93: '',
    fraccionNaladiSa96: '',
    fraccionNaladiSa02: '',
    nombreTecnico: '',
    nombreComercial:'',
    normaOrigen:'',
    id:'',
    cantidad:'',
    umc:'',
    tipoFactura:'',
    valorMercancia:'',
    fechaFinalInput:'',
    numeroFactura:'',
    nalad:'',
    complementoClasificacion:''
  },
  facturas:{
    id: -1,
    descripcion: '',
  },
  buscarMercancia: [],
  paisBloque: {
    id: -1,
    descripcion: '',
  },
  idiomaDatos: [],
  entidadFederativaDatos: [],
  representacionFederalDatos: [],
};

/**
 * Store de la entidad Tramite.
 * 
 * Este store se utiliza para gestionar el estado relacionado con el trámite,
 * actualizando los valores del estado mediante las funciones proporcionadas.
 * 
 * @export
 * @class TramiteStore
 * @extends {Store<TramiteState>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-110204', resettable: true })
export class Tramite110204Store extends Store<TramiteState> {
  
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Establece el estado en el almacén.
   * 
   * @param {Catalogo} estado - El estado que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece la lista de facturas en el estado.
   * 
   * @param factura - Lista de objetos de tipo Catalogo que representan las facturas.
   */
  setFactura(factura: Catalogo[]): void {    
    this.update((state) => ({
      ...state,
      factura,
    }));
  }

  /**
   * Establece el catálogo de UMCs en el estado de la tienda.
   *
   * @param umcs - Una lista de objetos de tipo `Catalogo` que representan las UMCs a establecer.
   */
  setUmc(umcs: Catalogo[]): void {    
    this.update((state) => ({
      ...state,
      umcs,
    }));
  }
  /**
   * Establece los bloques de países en el almacén.
   * 
   * @param {Catalogo[]} paisBloques - Un array de objetos `Catalogo` que representa los bloques de países.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setBloque(paisBloques: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      paisBloques,
    }));
  }

  /**
   * Establece las plantas a dar de alta en el almacén.
   * 
   * @param {Catalogo[]} altaPlanta - Un array de objetos `Catalogo` que representa las plantas a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      altaPlanta,
    }));
  }

  /**
   * Establece el estado de validación del formulario en el almacén.
   * 
   * @param {Object} formaValida - Un objeto donde las claves son los nombres de los campos del formulario y los valores son booleanos que indican si el campo es válido o no.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  /**
   * Establece los valores del formulario de fechas del certificado en el almacén.
   * 
   * @param {Object} values - Un objeto con las claves y valores para actualizar las fechas del certificado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setFormDatosCertificado(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formDatosCertificado: {
        ...state.formDatosCertificado,
        ...values,
      },
    }));
  }

  /**
   * Establece los valores del formulario del certificado en el almacén.
   * 
   * @param {Object} values - Un objeto con las claves y valores para actualizar el formulario del certificado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setFormCertificado(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formCertificado: {
        ...state.formCertificado,
        ...values,
      },
    }));
  }

  /**
   * Establece los valores del formulario del certificado en el almacén.
   * 
   * @param {Object} values - Un objeto con las claves y valores para actualizar el formulario del certificado.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setFormMercancia(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      mercanciaForm: {
        ...state.mercanciaForm,
        ...values,
      },
    }));
  }
  /**
   * Establece los datos de la mercancía a buscar en el almacén.
   * 
   * @param {Mercancia[]} buscarMercancia - Un array de objetos `Mercancia` con la información de la mercancía a buscar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setbuscarMercancia(buscarMercancia: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      buscarMercancia,
    }));
  }

  /**
   * Establece el régimen de la mercancía en el almacén.
   * 
   * @param {string} regimenMercancia - El régimen de la mercancía a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setRegimenMercancia(regimenMercancia: string): void {
    this.update((state) => ({
      ...state,
      regimenMercancia,
    }));
  }

  /**
   * Establece la clasificación del régimen en el almacén.
   * 
   * @param {string} clasifiRegimen - La clasificación del régimen a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setClasifiRegimen(clasifiRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasifiRegimen,
    }));
  }

  /**
   * Establece la fracción arancelaria en el almacén.
   * 
   * @param {string} fraccionArancelaria - La fracción arancelaria a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Establece el NICO en el almacén.
   * 
   * @param {string} nico - El NICO (número de identificación comercial).
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Establece la unidad de medida tarifaria en el almacén.
   * 
   * @param {string} unidadMedidaTarifaria - La unidad de medida tarifaria a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setUnidadMedidaTarifaria(unidadMedidaTarifaria: string): void {
    this.update((state) => ({
      ...state,
      unidadMedidaTarifaria,
    }));
  }

  /**
   * Establece el país de origen en el almacén.
   * 
   * @param {string} paisOrigen - El país de origen a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setPaisOrigen(paisOrigen: string): void {
    this.update((state) => ({
      ...state,
      paisOrigen,
    }));
  }

  /**
   * Establece el país de destino en el almacén.
   * 
   * @param {string} paisDestino - El país de destino a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setPaisDestino(paisDestino: string): void {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  /**
   * Establece el molino en el almacén.
   * 
   * @param {string} molino - El molino a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setMolino(molino: string): void {
    this.update((state) => ({
      ...state,
      molino,
    }));
  }

  /**
   * Establece la representación federal en el almacén.
   * 
   * @param {string} representacionFederal - La representación federal a establecer.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

  /**
   * Establece los datos de la representación federal en el almacén.
   * 
   * @param {Catalogo[]} representacionFederalDatos - Un array de objetos `Catalogo` con los datos de la representación federal.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setRepresentacionFederalDatos(representacionFederalDatos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      representacionFederalDatos,
    }));
  }

  /**
   * Establece los datos de la entidad federativa en el almacén.
   * 
   * @param {Catalogo[]} entidadFederativaDatos - Un array de objetos `Catalogo` con los datos de la entidad federativa.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setEntidadFederativaDatos(entidadFederativaDatos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      entidadFederativaDatos,
    }));
  }

  /**
   * Establece los datos del idioma en el almacén.
   * 
   * @param {Catalogo[]} idiomaDatos - Un array de objetos `Catalogo` con los datos del idioma.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  public setIdiomaDatos(idiomaDatos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      idiomaDatos,
    }));
  }
}
