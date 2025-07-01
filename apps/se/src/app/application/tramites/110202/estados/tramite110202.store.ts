import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/configuracion-columna.model';


/**
 * @interface TramiteState
 * @description
 * Interfaz que representa la estructura completa del estado del formulario de un trámite.
 * Este estado incluye catálogos, selecciones, formularios dinámicos, listas de mercancía, datos del destinatario y banderas de validación.
 */
export interface TramiteState {
  /** Lista de idiomas disponibles como catálogo */
  idiomaDatos: Catalogo[];

  /** Idioma seleccionado actualmente */
  idiomaDatosSeleccion: Catalogo;

  /** Lista de países destino como catálogo */
  paisDestin: Catalogo[];

  /** País destino seleccionado */
  paisDestinSeleccion: Catalogo;

  /** Lista de medios de transporte disponibles */
  medioDeTransporte: Catalogo[];

  /** Medio de transporte seleccionado */
  medioDeTransporteSeleccion: Catalogo;

  /** Entidad federativa seleccionada */
  entidadFederativaSeleccion: Catalogo;

  /** Lista de entidades federativas disponibles */
  entidadFederativaDatos: Catalogo[];

  /** Lista de representaciones federales disponibles */
  representacionFederalDatos: Catalogo[];

  /** Representación federal seleccionada */
  representacionFederalSeleccion: Catalogo;

  /** Lista de opciones para alta de planta */
  altaPlanta: Catalogo[];

  /** Estado actual del trámite */
  estado: Catalogo;

  /** Lista de facturas como catálogo */
  factura: Catalogo[];

  /** Factura seleccionada actualmente */
  facturas: Catalogo;

  /** Unidad de medida comercial seleccionada */
  umc: Catalogo;

  /** Lista de unidades de medida comercial disponibles */
  umcs: Catalogo[];

  /** Unidad de medida de masa seleccionada */
  masa: Catalogo;

  /** Lista de unidades de masa bruta disponibles */
  masaBruta: Catalogo[];

  /** Lista de países por bloque comercial */
  paisBloques: Catalogo[];

  /** País seleccionado dentro del bloque comercial */
  paisBloque: Catalogo;

  /**
   * Datos del formulario principal del certificado.
   * Clave-valor que puede contener strings, números, objetos u otros tipos.
   */
  formCertificado: { [key: string]: unknown };

  /**
   * Datos del formulario relacionados con los detalles del certificado.
   * Estructura dinámica y flexible.
   */
  formDatosCertificado: { [key: string]: unknown };

  /**
   * Datos específicos del formulario de mercancía.
   * Cada clave representa un campo.
   */
  mercanciaForm: { [key: string]: unknown };

  /**
   * Objeto que contiene banderas booleanas para validar formularios.
   * Cada clave representa una sección del formulario.
   */
  formaValida: { [key: string]: boolean };

  /** Lista de mercancías encontradas en la búsqueda */
  buscarMercancia: Mercancia[];

  /** Lista de mercancías mostradas en la tabla */
  mercanciaTabla: Mercancia[];

  /** Datos generales del destinatario en formulario dinámico */
  destinatarioForm: { [key: string]: unknown };

  /** Formulario general del destinatario */
  formDestinatario: { [key: string]: unknown };

  /** Formulario con los datos específicos del destinatario */
  formDatosDelDestinatario: { [key: string]: unknown };
}

/**
 * @interface Solicitud110202State
 * @description
 * Interfaz que define la estructura del estado para el trámite de solicitud 110202.
 * Contiene datos relacionados con la mercancía, información del solicitante, origen/destino y otros campos asociados al formulario.
 */
export interface Solicitud110202State {
  /** Régimen de la mercancía (por ejemplo, definitivo, temporal) */
  regimenMercancia: string;

  /** Clasificación del régimen aplicable */
  clasifiRegimen: string;

  /** Valor del Tratado de Libre Comercio o Acuerdo aplicable */
  valueTA: string;

  /** Fracción arancelaria correspondiente a la mercancía */
  fraccionArancelaria: string;

  /** NICO (Número de Identificación Comercial) relacionado con la fracción */
  nico: string;

  /** Unidad de medida tarifaria usada para la mercancía */
  unidadMedidaTarifaria: string;

  /** Cantidad medida en unidad tarifaria */
  cantidadTarifaria: number;

  /** Valor total de la factura en dólares estadounidenses */
  valorFacturaUSD: number;

  /** Precio unitario de la mercancía en dólares estadounidenses */
  precioUnitarioUSD: string;

  /** País de origen de la mercancía */
  paisOrigen: string;

  /** País de destino de la mercancía */
  paisDestino: string;

  /** Identificador del lote o agrupación de productos */
  lote: string;

  /** Fecha de salida de la mercancía (en formato ISO o compatible) */
  fechaSalida: string;

  /** Observaciones generales relacionadas con la solicitud */
  observaciones: string;

  /** Observaciones específicas relacionadas con la mercancía */
  observacionMerc: string;

  /** Tipo de persona (por ejemplo, FÍSICA o MORAL) */
  tipoPersona: string;

  /** Nombre de la persona física (en caso de no ser razón social) */
  nombre: string;

  /** Apellido paterno del solicitante */
  apellidoPaterno: string;

  /** Apellido materno del solicitante */
  apellidoMaterno: string;

  /** Razón social (en caso de persona moral) */
  razonSocial: string;

  /** Nombre del molino asociado (si aplica) */
  molino: string;

  /** Dirección o domicilio del solicitante */
  domicilio: string;

  /** Estado o entidad federativa del domicilio */
  estado: string;

  /** País perteneciente a un bloque comercial (ej. MERCOSUR, USMCA) */
  paisBloque: string;

  /** Número o identificador de la factura comercial */
  factura: string;

  /** Unidad de medida comercial utilizada */
  umc: string;

  /** Representación federal asociada (puede usarse en trámites centralizados) */
  representacionFederal: string;
}

/**
 * Estado inicial para el store del trámite 110202.
 *
 * Contiene la estructura y valores predeterminados para todos los campos y formularios
 * relacionados con el trámite, incluyendo listas de selección, formularios de datos,
 * estados de validación y objetos seleccionados.
 *
 * @remarks
 * Este estado inicial es utilizado para inicializar y resetear el store del trámite,
 * asegurando que todos los campos tengan valores definidos y consistentes al inicio.
 *
 * @property altaPlanta Lista de plantas de producción registradas.
 * @property paisBloques Lista de países o bloques económicos seleccionables.
 * @property buscarMercancia Resultado de búsqueda de mercancías.
 * @property mercanciaTabla Lista de mercancías añadidas a la tabla.
 * @property estado Estado actual del trámite.
 * @property umc Unidad de medida comercial seleccionada.
 * @property umcs Lista de unidades de medida comerciales disponibles.
 * @property masa Unidad de medida de masa seleccionada.
 * @property masaBruta Lista de masas brutas disponibles.
 * @property factura Lista de facturas asociadas al trámite.
 * @property formaValida Estado de validación de los diferentes formularios.
 * @property formCertificado Formulario de información del certificado.
 * @property formDatosCertificado Formulario de datos adicionales del certificado.
 * @property mercanciaForm Formulario de información de la mercancía.
 * @property facturas Factura seleccionada actualmente.
 * @property paisBloque País o bloque económico seleccionado.
 * @property idiomaDatosSeleccion Idioma seleccionado para los datos.
 * @property idiomaDatos Lista de idiomas disponibles.
 * @property paisDestin Lista de países destino.
 * @property paisDestinSeleccion País destino seleccionado.
 * @property medioDeTransporte Lista de medios de transporte.
 * @property medioDeTransporteSeleccion Medio de transporte seleccionado.
 * @property entidadFederativaSeleccion Entidad federativa seleccionada.
 * @property entidadFederativaDatos Lista de entidades federativas disponibles.
 * @property representacionFederalDatos Lista de representaciones federales disponibles.
 * @property representacionFederalSeleccion Representación federal seleccionada.
 * @property formDestinatario Formulario con información del destinatario (ubicación y contacto).
 * @property formDatosDelDestinatario Formulario con información fiscal y general del destinatario.
 * @property destinatarioForm Formulario adicional para el destinatario.
 */
export const INITIAL_STATE: TramiteState = {
  /** Lista de alta planta (por ejemplo, plantas de producción registradas) */
  altaPlanta: [],

  /** Lista de países o bloques económicos seleccionables */
  paisBloques: [],

  /** Resultado de búsqueda de mercancías */
  buscarMercancia: [],

  /** Lista de mercancías añadidas a la tabla */
  mercanciaTabla: [],

  /** Estado actual del trámite */
  estado: {
    id: -1,
    descripcion: '',
  },

  /** Unidad de medida comercial seleccionada */
  umc: { id: -1, descripcion: '' },

  /** Lista de unidades de medida comerciales disponibles */
  umcs: [],

  /** Unidad de medida de masa seleccionada */
  masa: { id: -1, descripcion: '' },

  /** Lista de masas brutas disponibles */
  masaBruta: [],

  /** Lista de facturas asociadas al trámite */
  factura: [],

  /** Estado de validación de los diferentes formularios */
  formaValida: {
    certificado: false,
    datos: false,
    destinatrio: false,
    datosDestinatario: false,
  },

  /** Formulario de información del certificado */
  formCertificado: {
    entidadFederativa: '',
    bloque: '',
    nombreComercialForm: '',
    registroProductoForm: '',
    fraccionArancelariaForm: '',
    fechaInicioInput: '',
    fechaFinalInput: '',
  },

  /** Formulario de datos adicionales del certificado */
  formDatosCertificado: {
    observacionesDates: '',
    idiomaDates: '',
    precisaDates: '',
    EntidadFederativaDates: '',
    representacionFederalDates: '',
  },

  /** Formulario de información de la mercancía */
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

  /** Factura seleccionada actualmente */
  facturas: {
    id: -1,
    descripcion: '',
  },

  /** País o bloque económico seleccionado */
  paisBloque: {
    id: -1,
    descripcion: '',
  },

  /** Idioma seleccionado para los datos */
  idiomaDatosSeleccion: { id: -1, descripcion: '' },

  /** Lista de idiomas disponibles */
  idiomaDatos: [],

  /** Lista de países destino */
  paisDestin: [],

  /** País destino seleccionado */
  paisDestinSeleccion: { id: -1, descripcion: '' },

  /** Lista de medios de transporte */
  medioDeTransporte: [],

  /** Medio de transporte seleccionado */
  medioDeTransporteSeleccion: { id: -1, descripcion: '' },

  /** Entidad federativa seleccionada */
  entidadFederativaSeleccion: { id: -1, descripcion: '' },

  /** Lista de entidades federativas disponibles */
  entidadFederativaDatos: [],

  /** Lista de representaciones federales disponibles */
  representacionFederalDatos: [],

  /** Representación federal seleccionada */
  representacionFederalSeleccion: { id: -1, descripcion: '' },

  /** Formulario con información del destinatario (ubicación y contacto) */
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

  /** Formulario con información fiscal y general del destinatario */
  formDatosDelDestinatario: {
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDeRegistroFiscal: '',
    razonSocial: ''
  },

  /** Formulario adicional para el destinatario */
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

