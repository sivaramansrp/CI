import { ColumnasTabla, SeleccionadasTabla, } from '../models/registro.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

/**
 * @interface Tramite110221State
 * Interfaz que define el estado global del trámite 110221 para el certificado zoosanitario.
 * Contiene todas las propiedades y formularios requeridos en el flujo del trámite, así como los datos y banderas de validación.
 * 
 */
export interface Tramite110221State {
  /**
   * @property {Object} formCertificado - Datos del formulario principal de certificado.
   * @description
   * Contiene información básica del certificado, como entidad federativa, bloque, nombre comercial, registro de producto, fracción arancelaria y fechas.
   */
  formCertificado: { [key: string]: unknown};
  /**
   * @property {Catalogo} estado - Estado seleccionado.
   * @description
   * Representa el estado actual del trámite, utilizado para filtrar y seleccionar opciones en el formulario.
   */
  estado: Catalogo;
  /**
   * @property {Catalogo[]} paisBloques - Bloques de países seleccionados.
   * @description
   * Lista de bloques de países que se pueden seleccionar en el formulario, representados como objetos `Catalogo`.
   */
  paisBloques: Catalogo[];
  /**
   * @property {Mercancia[]} mercanciaTabla - Tabla de mercancías agregadas.
   * @description
   * Arreglo que almacena las mercancías seleccionadas, cada una representada por un objeto `Mercancia`.
   */
  mercanciaTabla: Mercancia[];
  /**
   * @property {Object} formDatosCertificado - Datos adicionales del certificado.
   * @description
   * Contiene campos como observaciones, idioma, entidad federativa y representación federal.
   */
  formDatosCertificado: { [key: string]: unknown};
  /**
   * @property {Catalogo} idiomaDatosSeleccion - Idioma seleccionado.
   * @description
   * Representa el idioma en el que se generará el certificado, utilizado para la presentación del documento.
   */
  idiomaDatosSeleccion: Catalogo;
  /**
   * @property {Catalogo} entidadFederativaSeleccion - Entidad federativa seleccionada.
   * @description
   * Representa la entidad federativa donde se llevará a cabo el trámite, utilizada para filtrar opciones en el formulario.
   */
  entidadFederativaSeleccion: Catalogo;
  /**
   * @property {Catalogo} representacionFederalSeleccion - Representación federal seleccionada.
   * @description
   * Representa la representación federal asociada al trámite, utilizada para la validación y presentación del certificado.
   */
  representacionFederalSeleccion: Catalogo;
  /**
   * @property {string} nombreComercialMercancia - Nombre comercial de la mercancía.
   * @description
   * Nombre comercial utilizado para identificar la mercancía en el trámite.
   */
  nombreComercialMercancia: string;
  /**
   * @property {string} nombreIngles - Nombre en inglés de la mercancía.
   * @description
   * Nombre de la mercancía en inglés, utilizado para trámites internacionales.
   */
  nombreIngles: string;
  /**
   * @property {string} complementoDescripcion - Complemento de la descripción.
   * @description
   * Descripción adicional de la mercancía, utilizada para proporcionar más detalles en el certificado.
   */
  complementoDescripcion: string;
  /**
   * @property {string} criterioParaTratoPreferencial - Criterio para trato preferencial.
   * @description
   * Criterio que determina si la mercancía califica para un trato preferencial en términos arancelarios.
   */
  criterioParaTratoPreferencial: string;
  /**
   * @property {string} valorDeContenidoRegional - Valor de contenido regional.
   * @description
   * Representa el valor del contenido regional de la mercancía, utilizado para determinar su origen.
   */
  valorDeContenidoRegional: string;
  /**
   * @property {string} numeroDeSerie - Número de serie de la mercancía.
   * @description
   * Número de serie único asignado a la mercancía, utilizado para su identificación.
   */
  numeroDeSerie: string;
  /**
   * @property {string} valorMercancia - Valor de la mercancía.
   * @description
   * Valor monetario asignado a la mercancía, utilizado para fines fiscales y comerciales.
   */
  valorMercancia: string;
  /**
   * @property {string} complementoClasificacion - Complemento de clasificación.
   * @description
   * Información adicional sobre la clasificación de la mercancía, utilizada para su correcta identificación.
   */
  complementoClasificacion: string;
  /**
   * @property {Object} formaValida - Estado de validación de los formularios.
   * @description
   * Contiene banderas que indican si cada sección del formulario es válida, como certificado, datos, destinatario y exportador.
   */
  formaValida: { [key: string]: boolean };
  /**
   * @property {boolean} [datosConfidencialesProductor] - Indica si los datos del productor son confidenciales.
   * @description
   * Bandera que indica si los datos del productor deben ser tratados como confidenciales.
   */
  datosConfidencialesProductor?: boolean;
  /**
   * @property {boolean} [si] - Bandera auxiliar para el flujo del trámite.
   * @description
   * Utilizada para controlar el flujo del trámite, puede ser utilizada en condiciones lógicas dentro del store.
   */
  si?: boolean;
  /**
   * @property {boolean} [productorMismoExportador] - Indica si el productor es el mismo que el exportador.
   * @description
   * Bandera que indica si el productor y el exportador son la misma entidad, utilizada para simplificar el flujo del trámite.
   */
  productorMismoExportador?: boolean;
  /**
   * @property {Object} agregarDatosProductorFormulario - Datos adicionales del productor.
   * @description
   * Contiene campos adicionales para el formulario del productor, como número de registro fiscal y fax.
   */
  agregarDatosProductorFormulario: { [key: string]: unknown};
  /**
   * @property {Object} formulario - Otros datos de formularios auxiliares.
   * @description
   * Contiene otros datos relevantes para el trámite, como datos confidenciales del productor y si el productor es el mismo exportador.
   */
  formulario: { [key: string]: unknown};

  //NEW
  nombre: string;
  apellidoPrimer: string;
  apellidoSegundo: string;
  numeroFiscal: string;
  razonSocial: string;
  ciudad: string;
  calle: string;
  numeroLetra: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
  paisDestino: string;
  tercerOperador: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  numeroDeRegistroFiscal: string;
  tratado: string;
  rangoDeFecha: string;
  pais: string;
  fraccionArancelaria: string;
  numeroRegistro: string;
  nombreComercial: string;
  fechaInicial: string;
  fechaFinal: string;
  archivo: string;
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreComercialDelaMercancia: string;
  criterioParaConferir: string;
  nombreEnIngles: string;
  cantidad: string;
  umc: string;
  valorDelaMercancia: string;
  complementoDelaDescripcion: string;
  tipoFactura: string;
  fecha: string;
  numeroFactura: string;
  mercanciaSeleccionadasTablaData:SeleccionadasTabla[],
  mercanciaDisponsiblesTablaDatos:ColumnasTabla[]
}

/**
 * asegurando que el estado comience limpio y sin datos previos.
 * @method createInitialState
 * @function createInitialState
 * @descripcion
 * Función que crea y retorna el estado inicial del store Tramite110221Store para el certificado zoosanitario.
 * Inicializa todas las propiedades y formularios requeridos en el flujo del trámite con valores por defecto,
 * 
 * 
 * @returns {Tramite110221State} Estado inicializado para el store del trámite 110221.
 */
export function createInitialState(): Tramite110221State {
  return {
    formCertificado: {
      si: false,
      entidadFederativa: '',
      bloque: '',
      nombreComercialForm: '',
      registroProductoForm: '',
      fraccionArancelariaForm: '',
      fechaInicioInput: '',
      fechaFinalInput: '',
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDeRegistroFiscal: '',
      razonSocial: '',
    },
    estado: {
      id: -1,
      descripcion: '',
    },
    paisBloques: [],

    mercanciaTabla: [],
    formDatosCertificado: {
      observacionesDates: '',
      idiomaDates: '',
      precisaDates: '',
      EntidadFederativaDates: '',
      representacionFederalDates: '',
    },
    idiomaDatosSeleccion: { id: -1, descripcion: '' },
    entidadFederativaSeleccion: { id: -1, descripcion: '' },
    representacionFederalSeleccion: { id: -1, descripcion: '' },
    fraccionArancelaria: '',
    nombreComercialMercancia: '',
    nombreTecnico: '',
    nombreIngles: '',
    complementoDescripcion: '',
    criterioParaTratoPreferencial: '',
    valorDeContenidoRegional: '',
    numeroDeSerie: '',
    cantidad: '',
    valorMercancia: '',
    complementoClasificacion: '',
    numeroFactura: '',
    formaValida: {
      certificado: false,
      datos: false,
      destinatrio: false,
      datosDestinatario: false,
      exportador: false,
    },
    formulario:{
      datosConfidencialesProductor: '',
      productorMismoExportador: '',
    },
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',      
    },
    nombre: '',
    apellidoPrimer: '',
    apellidoSegundo: '',
    numeroFiscal: '',
    razonSocial: '',
    ciudad: '',
    calle: '',
    numeroLetra: '',
    lada: '',
    telefono: '',
    fax: '',
    correoElectronico: '',
    paisDestino: '',
    tercerOperador: '',
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    numeroDeRegistroFiscal: '',
    tratado: '',
    rangoDeFecha: '',
    pais: '',
    numeroRegistro: '',
    nombreComercial: '',
    fechaInicial: '',
    fechaFinal: '',
    archivo: '',
    fraccionMercanciaArancelaria: '',
    nombreComercialDelaMercancia: '',
    criterioParaConferir: '',
    nombreEnIngles: '',
    umc: '',
    valorDelaMercancia: '',
    complementoDelaDescripcion: '',
    tipoFactura: '',
    fecha: '',
    mercanciaSeleccionadasTablaData:[],
    mercanciaDisponsiblesTablaDatos:[]

  };
}

/**
 * @descripcion
 * Store encargado de gestionar el estado global del trámite 110221 para el certificado zoosanitario.
 * Permite actualizar y consultar los datos de los diferentes formularios y secciones del trámite,
 * así como el estado de validación de cada uno de ellos.
 * Utiliza Akita para la gestión reactiva del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite110221Store', resettable: true })
export class Tramite110221Store extends Store<Tramite110221State> {
  /**
   * @descripcion
   * Constructor que inicializa el almacén con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de certificado.
   * @param values - Valores a actualizar en el formulario.
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
   * @descripcion
   * Actualiza los datos del formulario histórico.
   * @param values - Valores a actualizar en el formulario.
   */
  setFormHistorico(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      formulario: {
        ...state.formulario,
        ...values,
      },
    }));
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de productor.
   * @param values - Valores a actualizar en el formulario.
   */
  setAgregarFormDatosProductor(values: { [key: string]: unknown}): void {
    this.update((state) => ({
      agregarDatosProductorFormulario: {
        ...state.agregarDatosProductorFormulario,
        ...values,
      },
    }));
  }

  /**
   * @descripcion
   * Actualiza el estado seleccionado en el almacén.
   * @param estado - Objeto de tipo `Catalogo` que contiene la información del estado a actualizar.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * @descripcion
   * Actualiza los bloques de países en el almacén.
   * @param paisBloques - Array de objetos `Catalogo` que representa los bloques de países.
   */
  setBloque(paisBloques: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      paisBloques,
    }));
  }

  /**
   * @descripcion
   * Actualiza la tabla de mercancías en el almacén.
   * @param mercanciaTabla - Array de objetos `Mercancia` que representa la tabla de mercancías.
   */
  setmercanciaTabla(mercanciaTabla: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTabla,
    }));
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de certificado en el almacén.
   * @param values - Objeto que contiene los valores a actualizar en el formulario de certificado.
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
   * @descripcion
   * Actualiza el idioma seleccionado en el almacén.
   * @param idiomaDatosSeleccion - Objeto de tipo `Catalogo` que contiene la información del idioma seleccionado.
   */
  setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      idiomaDatosSeleccion,
    }));
  }

  /**
   * @descripcion
   * Actualiza la entidad federativa seleccionada en el almacén.
   * @param entidadFederativaSeleccion - Objeto de tipo `Catalogo` que contiene la información de la entidad federativa seleccionada.
   */
  setEntidadFederativaSeleccion(entidadFederativaSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativaSeleccion,
    }));
  }

  /**
   * @descripcion
   * Actualiza la representación federal seleccionada en el almacén.
   * @param representacionFederalSeleccion - Objeto de tipo `Catalogo` que contiene la información de la representación federal seleccionada.
   */
  setRepresentacionFederalDatosSeleccion(representacionFederalSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederalSeleccion,
    }));
  }

  /**
   * @descripcion
   * Actualiza el número de fraccionArancelaria en el almacén.
   * @param fraccionArancelaria - Cadena que representa el número de fraccionArancelaria a actualizar.
   */
  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * @descripcion
   * Actualiza el número de nombreComercialMercancia en el almacén.
   * @param nombreComercialMercancia - Cadena que representa el número de nombreComercialMercancia a actualizar.
   */
  setNombreComercialMercancia(nombreComercialMercancia: string): void {
    this.update((state) => ({
      ...state,
      nombreComercialMercancia
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de nombreTecnico en el almacén.
   * @param nombreTecnico - Cadena que representa el número de nombreTecnico a actualizar.
   */
  setNombreTecnico(nombreTecnico: string): void {
    this.update((state) => ({
      ...state,
      nombreTecnico
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de nombreIngles en el almacén.
   * @param nombreIngles - Cadena que representa el número de nombreIngles a actualizar.
   */
  setNombreIngles(nombreIngles: string): void {
    this.update((state) => ({
      ...state,
      nombreIngles
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de criterioParaTratoPreferencial en el almacén.
   * @param criterioParaTratoPreferencial - Cadena que representa el número de criterioParaTratoPreferencial a actualizar.
   */
  setCriterioParaTratoPreferencial(criterioParaTratoPreferencial: string): void {
    this.update((state) => ({
      ...state,
      criterioParaTratoPreferencial
    }))
  }

  /**
   * @descripcion
   * Actualiza el valor de `otrasInstancias` en el almacén.
   * @param otrasInstancias - Cadena que representa el nuevo valor de `otrasInstancias`.
   */
  setOtrasInstancias(otrasInstancias: string): void {
    this.update((state) => ({
      ...state,
      otrasInstancias
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de criterioParaConferirOrigen en el almacén.
   * @param criterioParaConferirOrigen - Cadena que representa el número de criterioParaConferirOrigen a actualizar.
   */
  setCriterioParaConferirOrigen(criterioParaConferirOrigen: string): void {
    this.update((state) => ({
      ...state,
      criterioParaConferirOrigen,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de valorDeContenidoRegional en el almacén.
   * @param valorDeContenidoRegional - Cadena que representa el número de valorDeContenidoRegional a actualizar.
   */
  setValorDeContenidoRegional(valorDeContenidoRegional: string): void {
    this.update((state) => ({
      ...state,
      valorDeContenidoRegional,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de numeroDeSerie en el almacén.
   * @param numeroDeSerie - Cadena que representa el número de numeroDeSerie a actualizar.
   */
  setNumeroDeSerie(numeroDeSerie: string): void {
    this.update((state) => ({
      ...state,
      numeroDeSerie,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de cantidad en el almacén.
   * @param cantidad - Cadena que representa el número de cantidad a actualizar.
   */
  setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de valorMercancia en el almacén.
   * @param valorMercancia - Cadena que representa el número de valorMercancia a actualizar.
   */
  setValorMercancia(valorMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorMercancia,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de complementoDescripcion en el almacén.
   * @param complementoDescripcion - Cadena que representa el número de complementoDescripcion a actualizar.
   */
  setComplementoDescripcion(complementoDescripcion: string): void {
    this.update((state) => ({
      ...state,
      complementoDescripcion,
    }))
  }

  /**
   * @descripcion
   * Actualiza el número de numeroFactura en el almacén.
   * @param numeroFactura - Cadena que representa el número de numeroFactura a actualizar.
   */
  setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }))
  }

  /**
   * @descripcion
   * Actualiza el estado de validación de los formularios en el almacén.
   * @param formaValida - Objeto que contiene los valores de validación para los formularios.
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
   * @descripcion
   * Actualiza los datos del formulario de certificado de manera genérica.
   * @param values - Objeto que contiene los valores a actualizar en el formulario de certificado.
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
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Tramite110221State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  } 
  
}