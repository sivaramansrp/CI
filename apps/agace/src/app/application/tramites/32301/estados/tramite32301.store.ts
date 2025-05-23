/**
 * Importación de modelos relacionados con el aviso de modificación.
 * Estos modelos se utilizan para estructurar los datos dentro del sistema.
 */
import { FormularioGrupo, ModificacionGoceInmueble, PersonaFusionEscisionDTO, ProveedorExtranjero, TipoDevAviso } from '../models/avisomodify.model';

/**
 * Importación de la librería Akita para gestionar el estado global de la aplicación.
 * Se incluyen `Store` y `StoreConfig` para definir y estructurar la tienda de datos.
 */
import { Store, StoreConfig } from '@datorama/akita';

/**
 * Importación de la funcionalidad `Injectable` de Angular.
 * Se usa para definir que la clase puede ser inyectada como un servicio.
 */
import { Injectable } from '@angular/core';

/**
 * Definición de la interfaz `Catalogo`.
 * Representa un objeto con un identificador único y una descripción asociada.
 */
export interface Catalogo {
    /**
     * Identificador único del catálogo.
     */
    id: number;

    /**
     * Descripción del elemento dentro del catálogo.
     */
    descripcion: string;
}


// Estado inicial del formulario
export const INITIAL_STATE: FormularioGrupo = {
  /** Opciones del tipo de aviso a declarar */
  tipoDevAviso: {
    /** Modalidad de la certificación seleccionada */
    modalidadCertificacion: '',
    /** Indica si se incluyen proveedores o clientes extranjeros */
    foreignClientsSuppliers: false,
    /** Indica si se incluyen proveedores nacionales */
    nationalSuppliers: false,
    /** Indica si se realizaron modificaciones a los socios o accionistas */
    modificationsMembers: false,
    /** Indica si hay cambios en los documentos legales de la empresa */
    changesToLegalDocuments: false,
    /** Indica si se trata de un aviso por fusión o escisión */
    mergerOrSplitNotice: false,
    /** Indica si se agregan fracciones a la submaquila */
    additionFractions: false,
    /** Aceptación del artículo 253 del Reglamento */
    acepto253: false,
  },

  /** Datos relacionados con el proveedor extranjero */
  proveedorExtranjero: {
    /** Archivo adjunto que contiene información del proveedor extranjero */
    archivoExtranjero: null,
    /** Registro o registros del proveedor extranjero */
    registrosProveedoresExtranjeros: ''
  },

  /** Información para modificación de socios o accionistas */
  modificacionSocios: {
    /** Carácter con el que actúa el socio */
    ensucarácterde: 1,
    /** Indica si el socio está obligado a tributar en México */
    obligadoaTributarenMéxico: true,
    /** Nacionalidad del socio */
    nacionalidad: 1,
    /** Registro Federal de Contribuyentes completo del socio */
    registroFederaldeContribuyentes: null,
    /** RFC del socio */
    rfc: '',
    /** Nombre completo del socio */
    nombreCompleto: ''
  },

  /** Información sobre el inmueble en uso o goce */
  modificacionGoceInmueble: {
    /** ID del aviso relacionado al inmueble */
    idAviInmueble: '',
    /** Dirección del inmueble */
    direccion: '',
    /** Código postal del inmueble */
    codigoPostal: '',
    /** Clave de la entidad federativa */
    cveEntidad: '',
    /** Clave del municipio o alcaldía */
    cveMunicipio: '',
    /** Clave del tipo de documento que ampara el uso del inmueble */
    cveTipoDoc: '',
    /** Fecha de inicio anterior del contrato o documento */
    fechaInicioAnterior: '',
    /** Fecha de fin anterior del contrato o documento */
    fechaFinAnterior: '',
    /** Fecha de inicio actual del contrato o documento */
    fechaInicioActual: '',
    /** Fecha de fin actual del contrato o documento */
    fechaFinActual: '',
    /** RFC de las partes contratantes */
    rfcPartesC: '',
    /** RFC de las partes contratantes (consolidado) */
    rfcPartesCons: '',
    /** Nombre de las partes contratantes */
    nombrePartesCons: '',
    /** Carácter de las partes contratantes */
    caracterDeCons: '',
    /** Observaciones adicionales sobre el inmueble */
    observaciones: ''
  },

  /** Datos de la empresa relacionada a la fusión o escisión */
  personaFusionEscisionDTO: {
    /** RFC de la empresa */
    rfc: '',
    /** Razón social de la empresa */
    razonSocial: '',
    /** Número de folio del trámite relacionado */
    numFolioTramite: '',
    /** Fecha de inicio de vigencia de la fusión o escisión */
    fechaInicioVigencia: '',
    /** Fecha de fin de vigencia de la fusión o escisión */
    fechaFinVigencia: ''
  },

  /** Fechas seleccionadas para efectos del trámite */
  fechasSeleccionadas: {
    /** Arreglo con las fechas seleccionadas */
    fechasSeleccionadas: []
  },

  /** Datos generales de la empresa */
  datosEmpresa: {
    /** Número del programa IMMEX o similar */
    numeroPrograma: '',
    /** Año del programa correspondiente */
    anoPrograma: '',
    /** Mes al que corresponde el aviso */
    mesCorrespondeAviso: '',
    /** Año al que corresponde el aviso */
    anoCorrespondeAviso: '',
  },

  /** Tipo de carga del aviso */
  cargaTipo: {
    /** Tipo de carga seleccionado (p.ej. manual, archivo, etc.) */
    cargaTipo: '',
  },

  /** Datos de la persona o entidad que recibe */
  datosQuienRecibe: {
    /** RFC de quien recibe el trámite o transferencia */
    rfc: '',
    /** Número de programa de quien recibe */
    numberProgramaQr: '',
    /** Año del programa de quien recibe */
    anoProgramaQr: '',
  },

  /** Domicilio del lugar relacionado con el trámite */
  datosDomicilioLugar: {
    /** Nombre comercial del establecimiento o local */
    nombreComercial: '',
    /** Entidad federativa donde se ubica */
    entidadFederativa: '',
    /** Municipio o alcaldía correspondiente */
    alcaldiaMunicipio: '',
    /** Colonia donde se ubica el domicilio */
    colonias: '',
    /** Calle del domicilio */
    calle: '',
    /** Número exterior del domicilio */
    numeroExterior: '',
    /** Número interior del domicilio (si aplica) */
    numeroInterior: '',
    /** Código postal del domicilio */
    codigoPostal: '',
  },

  /** Datos de mercancía para submaquila o submanufactura */
  datosMercanciaSubmanufactura: {
    /** Fracción arancelaria de la mercancía */
    fracArancelaria: '',
    /** NICO (Número de Identificación Comercial) */
    nico: '',
    /** Unidad de medida de la mercancía */
    unidadMedida: '',
    /** Cantidad de mercancía */
    cantidad: '',
    /** Valor en dólares estadounidenses (USD) */
    valorUsd: '',
    /** Descripción general de la mercancía */
    descripcionMercancia: '',
  },
};


/**
 * Store del trámite 32301.
 * Este store gestiona el estado del formulario relacionado con el trámite 32301.
 * Utiliza Akita para manejar el estado de manera reactiva.
 * 
 * @export
 * @class Tramite32301Store
 * @extends {Store<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-32301', resettable: true })
export class Tramite32301Store extends Store<FormularioGrupo> {
  constructor() {
    super(INITIAL_STATE);
  }

  /**
   * Establece la modalidad de certificación en el estado.
   * 
   * @param {string} EV - La modalidad de certificación a establecer.
   */
  setModalidadCertificacion(EV: string): void {
    this.update((state) => ({
      ...state,
      modalidadCertificacion: EV
    }));
  }

  /**
   * Establece si es un proveedor extranjero en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de proveedor extranjero a establecer.
   */
  setClientesProveedoresExtranjeros(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      foreignClientsSuppliers: tipoDevAviso
    }));
  }

  /**
   * Establece si es un proveedor nacional en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de proveedor nacional a establecer.
   */
  setProveedoresNacionales(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      nationalSuppliers: tipoDevAviso
    }));
  }

  /**
   * Establece si hubo modificaciones en los miembros en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de modificación a establecer.
   */
  setModificacionesMiembros(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      modificationsMembers: tipoDevAviso
    }));
  }

  /**
   * Establece si hubo cambios en los documentos legales en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de cambio en los documentos legales.
   */
  setCambiosDocumentosLegales(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      changesToLegalDocuments: tipoDevAviso
    }));
  }

  /**
   * Establece si hay una notificación de fusión o escisión en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de notificación a establecer.
   */
  setNotifiFusionOescision(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      mergerOrSplitNotice: tipoDevAviso
    }));
  }

  /**
   * Establece si hay adiciones de fracciones en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de adición a establecer.
   */
  setAdicionalesFractions(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      additionFractions: tipoDevAviso
    }));
  }

  /**
   * Establece si se aceptó el artículo 253 en el estado.
   * 
   * @param {TipoDevAviso} tipoDevAviso - El tipo de aceptación a establecer.
   */
  setAceptacion253(tipoDevAviso: TipoDevAviso): void {
    this.update((state) => ({
      ...state,
      acepto253: tipoDevAviso
    }));
  }

  /**
   * Establece el archivo extranjero en el estado.
   * 
   * @param {ProveedorExtranjero} proveedorExtranjero - El archivo del proveedor extranjero.
   */
  setArchivoExtranjero(proveedorExtranjero: ProveedorExtranjero): void {
    this.update((state) => ({
      ...state,
      archivoExtranjero: proveedorExtranjero
    }));
  }

  /**
   * Establece los registros de proveedores extranjeros en el estado.
   * 
   * @param {ProveedorExtranjero} proveedorExtranjero - Los registros del proveedor extranjero.
   */
  setRegistrosProveedoresExtranjeros(proveedorExtranjero: ProveedorExtranjero): void {
    this.update((state) => ({
      ...state,
      registrosProveedoresExtranjeros: proveedorExtranjero.registrosProveedoresExtranjeros
    }));
  }

  /**
   * Establece el estado de 'sucarácterde' de modificación de socios.
   * 
   * @param {number} ensucarácterde - El valor a establecer para 'ensucarácterde'.
   */
  setSnsucarácterde(ensucarácterde: number): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        ensucarácterde
      }
    }));
  }

  /**
   * Establece el RFC de modificación de socios en el estado.
   * 
   * @param {string} rfc - El RFC a establecer.
   */
  setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        rfc
      }
    }));
  }

  /**
   * Establece si está obligado a tributar en México en el estado.
   * 
   * @param {boolean} obligadoaTributarenMéxico - El valor a establecer para 'obligadoaTributarenMéxico'.
   */
  setObligadoaTributarenMéxico(obligadoaTributarenMéxico: boolean): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        obligadoaTributarenMéxico
      }
    }));
  }

  /**
   * Establece la nacionalidad de modificación de socios en el estado.
   * 
   * @param {number} nacionalidad - La nacionalidad a establecer.
   */
  setNacionalidad(nacionalidad: number): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        nacionalidad
      }
    }));
  }
  
  /**
   * Establece el registro federal de contribuyentes de modificación de socios en el estado.
   * 
   * @param {[]} registroFederaldeContribuyentes - El registro a establecer.
   */
  setRegistroFederaldeContribuyentes(registroFederaldeContribuyentes: []): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        registroFederaldeContribuyentes
      }
    }));
  }
  
  /**
   * Establece los datos de modificación de goce de inmueble en el estado.
   * 
   * @param {ModificacionGoceInmueble} modificacionGoceInmueble - Los datos de modificación de goce de inmueble.
   */
  setModificacionGoceInmueble(modificacionGoceInmueble: ModificacionGoceInmueble): void {
    this.update(() => ({
      modificacionGoceInmueble
    }));
  }

  /**
   * Establece los datos de fusión o escisión de persona en el estado.
   * 
   * @param {PersonaFusionEscisionDTO} personaFusionEscisionDTO - Los datos de la persona en el proceso de fusión o escisión.
   */
  SetpersonaFusionEscisionDTO(personaFusionEscisionDTO: PersonaFusionEscisionDTO): void {
    this.update(() => ({
      personaFusionEscisionDTO
    }));
  }

  /**
   * Establece el nombre completo de modificación de socios en el estado.
   * 
   * @param {string} nombreCompleto - El nombre completo a establecer.
   */
  setNombreCompleto(nombreCompleto: string): void {
    this.update((state) => ({
      ...state,
      modificacionSocios: {
        ...state.modificacionSocios,
        nombreCompleto
      }
    }));
  }

  /**
   * Limpia el formulario y restablece el estado a su estado inicial.
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
