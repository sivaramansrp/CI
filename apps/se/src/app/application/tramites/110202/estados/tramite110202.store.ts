import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/configuracion-columna.model';

// Interfaz que define el estado del trámite.
/**
 * @interface TramiteState
 * @description Representa el estado de un trámite en la aplicación, incluyendo datos relacionados con catálogos, formularios, mercancías y destinatarios.
 * 
 * @property {Catalogo[]} idiomaDatos - Lista de datos de idiomas disponibles.
 * @property {Catalogo} idiomaDatosSeleccion - Idioma seleccionado.
 * @property {Catalogo[]} paisDestin - Lista de países de destino disponibles.
 * @property {Catalogo} paisDestinSeleccion - País de destino seleccionado.
 * @property {Catalogo[]} medioDeTransporte - Lista de medios de transporte disponibles.
 * @property {Catalogo} medioDeTransporteSeleccion - Medio de transporte seleccionado.
 * @property {Catalogo} entidadFederativaSeleccion - Entidad federativa seleccionada.
 * @property {Catalogo[]} entidadFederativaDatos - Lista de entidades federativas disponibles.
 * @property {Catalogo[]} representacionFederalDatos - Lista de representaciones federales disponibles.
 * @property {Catalogo} representacionFederalSeleccion - Representación federal seleccionada.
 * @property {Catalogo[]} altaPlanta - Lista de plantas disponibles para alta.
 * @property {Catalogo} estado - Estado actual del trámite.
 * @property {Catalogo[]} factura - Lista de facturas disponibles.
 * @property {Catalogo} facturas - Factura seleccionada.
 * @property {Catalogo} umc - Unidad de medida y conteo seleccionada.
 * @property {Catalogo[]} umcs - Lista de unidades de medida y conteo disponibles.
 * @property {Catalogo} masa - Masa seleccionada.
 * @property {Catalogo[]} masaBruta - Lista de masas brutas disponibles.
 * @property {Catalogo[]} paisBloques - Lista de bloques de países disponibles.
 * @property {Catalogo} paisBloque - Bloque de país seleccionado.
 * @property {{ [key: string]: unknown }} formCertificado - Datos del formulario de certificado.
 * @property {{ [key: string]: unknown }} formDatosCertificado - Datos específicos del formulario de certificado.
 * @property {{ [key: string]: unknown }} mercanciaForm - Datos del formulario de mercancía.
 * @property {{ [key: string]: boolean }} formaValida - Validación de los formularios.
 * @property {Mercancia[]} buscarMercancia - Lista de mercancías buscadas.
 * @property {Mercancia[]} mercanciaTabla - Lista de mercancías mostradas en la tabla.
 * @property {{ [key: string]: unknown }} destinatarioForm - Datos del formulario del destinatario.
 * @property {{ [key: string]: unknown }} formDestinatario - Datos específicos del destinatario.
 * @property {{ [key: string]: unknown }} formDatosDelDestinatario - Datos adicionales del destinatario.
 * 
 * @command Este estado se utiliza para gestionar los datos y formularios relacionados con un trámite específico.
 */
export interface TramiteState {
  idiomaDatos: Catalogo[];
  idiomaDatosSeleccion: Catalogo;
  paisDestin: Catalogo[];
  paisDestinSeleccion: Catalogo;
  medioDeTransporte: Catalogo[];
  medioDeTransporteSeleccion: Catalogo;
  entidadFederativaSeleccion: Catalogo;
  entidadFederativaDatos: Catalogo[];
  representacionFederalDatos: Catalogo[];
  representacionFederalSeleccion: Catalogo;
  altaPlanta: Catalogo[];
  estado: Catalogo;
  factura: Catalogo[];
  facturas: Catalogo,
  umc: Catalogo;
  umcs: Catalogo[],
  masa: Catalogo;
  masaBruta: Catalogo[],
  paisBloques: Catalogo[];
  paisBloque: Catalogo;
  formCertificado: { [key: string]: unknown};
  formDatosCertificado: { [key: string]: unknown};
  mercanciaForm: { [key: string]: unknown}
  formaValida: { [key: string]: boolean };
  buscarMercancia: Mercancia[];
  mercanciaTabla: Mercancia[];

  destinatarioForm: { [key: string]: unknown};
  formDestinatario: { [key: string]: unknown};
  formDatosDelDestinatario: { [key: string]: unknown};
}

// Interfaz que define el estado de la solicitud 110204.
export interface Solicitud110202State {
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
  factura: string;
  umc: string;
  representacionFederal: string;
}

// Estado inicial para el trámite.
export const INITIAL_STATE: TramiteState = {
  altaPlanta: [],
  paisBloques: [],
  buscarMercancia: [],
  mercanciaTabla: [],
  estado: {
    id: -1,
    descripcion: '',
  },
  umc: { id: -1, descripcion: '' },
  umcs: [],
  masa: { id: -1, descripcion: '' },
  masaBruta: [],
  factura: [],
  formaValida: {
    certificado: false,
    datos: false,
    destinatrio: false,
    datosDestinatario: false,
  },
  formCertificado: {
    entidadFederativa: '',
    bloque: '',
    nombreComercialForm: '',
    registroProductoForm: '',
    fraccionArancelariaForm: '',
    fechaInicioInput: '',
    fechaFinalInput: '',
  },
  formDatosCertificado: {
    observacionesDates: '',
    idiomaDates: '',
    precisaDates: '',
    EntidadFederativaDates: '',
    representacionFederalDates: '',
  },
  mercanciaForm: {
    fraccionArancelaria: '',
    nombreComercialMercancia: '',
    nombreTecnico: '',
    nombreIngles: '',
    criterioClasificacion: '',
    marca: '',
    cantidad: '',
    umc: '',
    valorMercancia: '',
    complementoClasificacion: '',
    masaBruta: '',
    unidadMedidaMasaBruta: '',
    numeroFactura: '',
    tipoFactura: '',
    fechaFinal: '',
    normaOrigen: '',
    id: '',
    fechaFinalInput: '',
    nalad: ''
  },
  facturas: {
    id: -1,
    descripcion: '',
  },
  paisBloque: {
    id: -1,
    descripcion: '',
  },
  idiomaDatosSeleccion: { id: -1, descripcion: '' },
  idiomaDatos: [],
  paisDestin: [],
  paisDestinSeleccion: { id: -1, descripcion: '' },
  medioDeTransporte: [],
  medioDeTransporteSeleccion: { id: -1, descripcion: '' },
  entidadFederativaSeleccion: { id: -1, descripcion: '' },
  entidadFederativaDatos: [],
  representacionFederalDatos: [],
  representacionFederalSeleccion: { id: -1, descripcion: '' },
  formDestinatario: {
    paisDestin: '',
    ciudad: '',
    calle: '',
    numeroLetra: '',
    lada: '',
    telefono: '',
    fax: '',
    correoElectronico: ''
  },

  formDatosDelDestinatario: {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDeRegistroFiscal: '',
    razonSocial: ''
  },

  destinatarioForm: {
    medioDeTransporte: '',
  }
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
@StoreConfig({ name: 'tramite-110202', resettable: true })
export class Tramite110202Store extends Store<TramiteState> {

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
 * Establece el catálogo de UMCs en el estado de la tienda.
 *
 * @param umc - Una lista de objetos de tipo `Catalogo` que representan las UMCs a establecer.
 */
  setUmcSeleccion(umc: Catalogo): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }


  /**
* Establece el catálogo de masa en el estado de la tienda.
*
* @param masa - Una lista de objetos de tipo `Catalogo` que representan las masa a establecer.
*/
  setMasaBrutaSeleccion(masa: Catalogo): void {
    this.update((state) => ({
      ...state,
      masa,
    }));
  }
  /**
* Establece el catálogo de facturas en el estado de la tienda.
*
* @param facturas - Una lista de objetos de tipo `Catalogo` que representan las facturas a establecer.
*/
  setFacturasSeleccion(facturas: Catalogo): void {
    this.update((state) => ({
      ...state,
      facturas,
    }));
  }

  /**
* Establece el catálogo de idiomaDatosSeleccion en el estado de la tienda.
*
* @param idiomaDatosSeleccion - Una lista de objetos de tipo `Catalogo` que representan las idiomaDatosSeleccion a establecer.
*/
  setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      idiomaDatosSeleccion,
    }));
  }


  /**
 * Establece el catálogo de masaBruta en el estado de la tienda.
 *
 * @param masaBruta - Una lista de objetos de tipo `Catalogo` que representan las masaBruta a establecer.
 */
  setMasaBruta(masaBruta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      masaBruta,
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
  * Establece los bloques de países en el almacén.
  * 
  * @param {Catalogo} paisBloque - Un array de objetos `Catalogo` que representa los paisBloque de países.
  * 
  * @returns {void} - No devuelve ningún valor.
  */
  setBloqueSeleccion(paisBloque: Catalogo): void {
    this.update((state) => ({
      ...state,
      paisBloque,
    }));
  }

  /**
  * Establece los paisDestinSeleccion de países en el almacén.
  * 
  * @param {Catalogo} paisDestinSeleccion - Un array de objetos `Catalogo` que representa los paisDestinSeleccion de países.
  * 
  * @returns {void} - No devuelve ningún valor.
  */
  setPaisDestinSeleccion(paisDestinSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      paisDestinSeleccion,
    }));
  }
  /**
  * Establece los medioDeTransporteSeleccion de países en el almacén.
  * 
  * @param {Catalogo} medioDeTransporteSeleccion - Un array de objetos `Catalogo` que representa los medioDeTransporteSeleccion de países.
  * 
  * @returns {void} - No devuelve ningún valor.
  */
  setMedioDeTransporteSeleccion(medioDeTransporteSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      medioDeTransporteSeleccion,
    }));
  }


  /**
  * Establece los entidadFederativaSeleccion de países en el almacén.
  * 
  * @param {Catalogo} entidadFederativaSeleccion - Un array de objetos `Catalogo` que representa los entidadFederativaSeleccion de países.
  * 
  * @returns {void} - No devuelve ningún valor.
  */
  setEntidadFederativaSeleccion(entidadFederativaSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativaSeleccion,
    }));
  }
  /**
* Establece los representacionFederalSeleccion de países en el almacén.
* 
* @param {Catalogo} representacionFederalSeleccion - Un array de objetos `Catalogo` que representa los representacionFederalSeleccion de países.
* 
* @returns {void} - No devuelve ningún valor.
*/
  setRepresentacionFederalDatosSeleccion(representacionFederalSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederalSeleccion,
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
  setFormDatosCertificado(values: { [key: string]: unknown}): void {
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
  setFormCertificado(values: { [key: string]: unknown}): void {
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
  setFormCertificadoGenric(values: { [key: string]: unknown}): void {    
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
  setFormMercancia(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      mercanciaForm: {
        ...state.mercanciaForm,
        ...values,
      },
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
 * Actualiza el estado con una nueva tabla de mercancías.
 * @param {Mercancia[]} mercanciaTabla - Un arreglo de objetos de tipo Mercancia que representa la tabla de mercancías a establecer.
 * @returns {void} - No retorna ningún valor.
 */
  setmercanciaTabla(mercanciaTabla: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTabla,
    }));
  }

  /**
   * Actualiza el estado con la lista de países de destino
   * @param paisDestin Arreglo de catálogos con los países de destino
   */
  public setPaisDestinatario(paisDestin: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      paisDestin,
    }));
  }

  /**
   * Actualiza el estado con la lista de medios de transporte
   * @param medioDeTransporte Arreglo de catálogos con los medios de transporte
   */
  setMedioDeTransporte(medioDeTransporte: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      medioDeTransporte,
    }));
  }

  /**
   * Actualiza el estado del formulario de destinatario con nuevos valores
   * @param values Objeto con los valores a actualizar en el formulario.
   */
  setDestinatarioForm(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      destinatarioForm: {
        ...state.destinatarioForm,
        ...values,
      },
    }));
  }

  /**
   * Actualiza el estado del formulario de destinatario (sección principal) con nuevos valores
   * @param values Objeto con los valores a actualizar en el formulario.
   */
  setFormDestinatario(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      formDestinatario: {
        ...state.formDestinatario,
        ...values,
      },
    }));
  }

  /**
   * Actualiza el estado del formulario de datos del destinatario con nuevos valores
   * @param values Objeto con los valores a actualizar en el formulario.
   */
  setFormDatosDelDestinatario(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      formDatosDelDestinatario: {
        ...state.formDatosDelDestinatario,
        ...values,
      },
    }));
  }

}

