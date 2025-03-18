import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/plantas-consulta.model';

// Interfaz que define el estado del trámite.
/**
 * @interface TramiteState
 * @description Representa el estado de un trámite en la aplicación.
 * 
 * @property {Catalogo[]} idiomaDatos - Datos del catálogo de idiomas.
 * @property {Catalogo[]} entidadFederativaDatos - Datos del catálogo de entidades federativas.
 * @property {Catalogo[]} representacionFederalDatos - Datos del catálogo de representaciones federales.
 * @property {Catalogo[]} altaPlanta - Datos del catálogo de alta planta.
 * @property {Catalogo} estado - Estado del catálogo.
 * @property {Catalogo[]} factura - Datos del catálogo de facturas.
 * @property {Catalogo} facturas - Facturas del catálogo.
 * @property {Catalogo} umc - Unidad de medida del catálogo.
 * @property {Catalogo[]} umcs - Unidades de medida del catálogo.
 * @property {Catalogo[]} paisBloques - Datos del catálogo de bloques de países.
 * @property {Catalogo} paisBloque - Bloque de país del catálogo.
 * @property {{ [key: string]: undefined | boolean | string | number | object }} formCertificado - Formulario de certificado.
 * @property {{ [key: string]: undefined | boolean | string | number | object }} formDatesCerticado - Formulario de fechas de certificado.
 * @property {{ [key: string]: undefined | boolean | string | number | object }} mercanciaForm - Formulario de mercancía.
 * @property {Mercancia[]} buscarMercancia - Lista de mercancías buscadas.
 * @property {{ [key: string]: boolean }} formaValida - Validación del formulario.
 */
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
  formDatesCerticado: { [key: string]: undefined | boolean | string | number | object };
  mercanciaForm:{ [key: string]: undefined | boolean | string | number | object}
  buscarMercancia: Mercancia[];
  formaValida: { [key: string]: boolean };
}

// Interfaz que define el estado de la solicitud 110204.
/**
 * @interface Solicitud110204State
 * @description Representa el estado de una solicitud 110204.
 * 
 * @property {string} regimenMercancia - Régimen de la mercancía.
 * @property {string} clasifiRegimen - Clasificación del régimen.
 * @property {string} valueTA - Valor TA.
 * @property {string} fraccionArancelaria - Fracción arancelaria.
 * @property {string} nico - NICO.
 * @property {string} unidadMedidaTarifaria - Unidad de medida tarifaria.
 * @property {number} cantidadTarifaria - Cantidad tarifaria.
 * @property {number} valorFacturaUSD - Valor de la factura en USD.
 * @property {string} precioUnitarioUSD - Precio unitario en USD.
 * @property {string} paisOrigen - País de origen.
 * @property {string} paisDestino - País de destino.
 * @property {string} lote - Lote.
 * @property {string} fechaSalida - Fecha de salida.
 * @property {string} observaciones - Observaciones.
 * @property {string} observacionMerc - Observación de la mercancía.
 * @property {string} tipoPersona - Tipo de persona.
 * @property {string} nombre - Nombre.
 * @property {string} apellidoPaterno - Apellido paterno.
 * @property {string} apellidoMaterno - Apellido materno.
 * @property {string} razonSocial - Razón social.
 * @property {string} molino - Molino.
 * @property {string} domicilio - Domicilio.
 * @property {string} estado - Estado.
 * @property {string} paisBloque - País bloque.
 * @property {string} factura - Factura.
 * @property {string} umc - UMC.
 * @property {string} representacionFederal - Representación federal.
 */
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
/**
 * @constant {TramiteState} INITIAL_STATE - Estado inicial de la aplicación para el trámite 110204.
 * 
 * @property {Array} altaPlanta - Lista de plantas altas.
 * @property {Array} paisBloques - Lista de bloques de países.
 * @property {Object} estado - Estado actual del trámite.
 * @property {number} estado.id - Identificador del estado.
 * @property {string} estado.descripcion - Descripción del estado.
 * @property {Object} umc - Unidad de medida y clasificación.
 * @property {number} umc.id - Identificador de la UMC.
 * @property {string} umc.descripcion - Descripción de la UMC.
 * @property {Array} umcs - Lista de UMCs.
 * @property {Array} factura - Lista de facturas.
 * @property {Object} formaValida - Validación del formulario.
 * @property {Object} formCertificado - Datos del formulario de certificado.
 * @property {string} formCertificado.entidadFederativa - Entidad federativa.
 * @property {boolean} formCertificado.tercerOperador - Indicador de tercer operador.
 * @property {string} formCertificado.bloque - Bloque.
 * @property {string} formCertificado.nombreComercialForm - Nombre comercial.
 * @property {string} formCertificado.registroProductoForm - Registro del producto.
 * @property {string} formCertificado.fracciónArancelariaForm - Fracción arancelaria.
 * @property {Object} formDatesCerticado - Fechas del certificado.
 * @property {string} formDatesCerticado.observacionesDates - Observaciones de las fechas.
 * @property {string} formDatesCerticado.idiomaDates - Idioma de las fechas.
 * @property {string} formDatesCerticado.EntidadFederativaDates - Entidad federativa de las fechas.
 * @property {string} formDatesCerticado.representacionFederalDates - Representación federal de las fechas.
 * @property {Object} mercanciaForm - Formulario de mercancía.
 * @property {string} mercanciaForm.fraccionNaladi - Fracción Naladi.
 * @property {string} mercanciaForm.fraccionNaladiSa93 - Fracción Naladi SA93.
 * @property {string} mercanciaForm.fraccionNaladiSa96 - Fracción Naladi SA96.
 * @property {string} mercanciaForm.fraccionNaladiSa02 - Fracción Naladi SA02.
 * @property {string} mercanciaForm.nombreTecnico - Nombre técnico.
 * @property {string} mercanciaForm.nombreComercial - Nombre comercial.
 * @property {string} mercanciaForm.normaOrigen - Norma de origen.
 * @property {string} mercanciaForm.id - Identificador.
 * @property {string} mercanciaForm.cantidad - Cantidad.
 * @property {string} mercanciaForm.umc - Unidad de medida y clasificación.
 * @property {string} mercanciaForm.tipoFactura - Tipo de factura.
 * @property {string} mercanciaForm.valorMercancia - Valor de la mercancía.
 * @property {string} mercanciaForm.fechaFinalInput - Fecha final.
 * @property {string} mercanciaForm.numeroFactura - Número de factura.
 * @property {string} mercanciaForm.nalad - Nalad.
 * @property {string} mercanciaForm.complementoClasificacion - Complemento de clasificación.
 * @property {Object} facturas - Facturas.
 * @property {number} facturas.id - Identificador de la factura.
 * @property {string} facturas.descripcion - Descripción de la factura.
 * @property {Array} buscarMercancia - Lista de búsqueda de mercancía.
 * @property {Object} paisBloque - Bloque de país.
 * @property {number} paisBloque.id - Identificador del bloque de país.
 * @property {string} paisBloque.descripcion - Descripción del bloque de país.
 * @property {Array} idiomaDatos - Lista de datos de idioma.
 * @property {Array} entidadFederativaDatos - Lista de datos de entidad federativa.
 * @property {Array} representacionFederalDatos - Lista de datos de representación federal.
 */
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
  },
  formDatesCerticado: {
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
@StoreConfig({ name: 'tramite-80308', resettable: true })
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

  setFactura(factura: Catalogo[]): void {    
    this.update((state) => ({
      ...state,
      factura,
    }));
  }

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
  setFormDatesCerticado(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formDatesCerticado: {
        ...state.formDatesCerticado,
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
