import { DestinatarioForm, DomicilioForm, RepresentanteLegalForm } from '../models/registro.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';


/**
 * Interfaz que representa la estructura del estado de un trámite 110204.
 * Este estado contiene formularios, catálogos, listas, valores seleccionados y otros datos requeridos.
 */
export interface TramiteState {
    /**
     * @property {DestinatarioForm} destinatarioForm - Formulario de destinatario.
     * @description
     * Contiene los campos del formulario para el destinatario, como nombre y número fiscal.
     */
    destinatarioForm: DestinatarioForm;

    selectedMercancia: Mercancia | null;
    /**
     * @property {DomicilioForm} domicilioForm - Formulario de domicilio.
     * @description
     * Contiene los campos del formulario para el domicilio, como calle, número/letra, país destino, ciudad, correo electrónico, lada y teléfono.
     */
    domicilioForm: DomicilioForm;
    /**
     * @property {RepresentanteLegalForm} representanteLegalForm - Formulario de representante legal.
     * @description
     * Contiene los campos del formulario para el representante legal, como lugar, nombre, empresa, cargo, lada, teléfono, fax y correo electrónico.
     */
    representanteLegalForm: RepresentanteLegalForm;
    /**
     * @property {boolean} [productorMismoExportador] - Indica si el productor es el mismo que el exportador.
     * @description
     * Bandera que indica si el productor y el exportador son la misma entidad, utilizada para simplificar el flujo del trámite.
     */
  /** Lista de catálogos que representan los idiomas disponibles. */
  idiomaDatos: Catalogo[];

  /** Lista de catálogos que representan las entidades federativas disponibles. */
  entidadFederativaDatos: Catalogo[];

  /** Lista de catálogos que representan las representaciones federales disponibles. */
  representacionFederalDatos: Catalogo[];

  /** Lista de catálogos para la alta de planta. */
  altaPlanta: Catalogo[];

  /** Catálogo que representa el estado actual. */
  estado: Catalogo;

  /** Lista de catálogos que representan facturas disponibles. */
  factura: Catalogo[];

  /** Catálogo que representa facturas. */
  facturas: Catalogo;

  /** Catálogo que representa la unidad de medida comercial (UMC). */
  umc: Catalogo;

  /** Lista de catálogos que representan unidades de medida comercial (UMCs). */
  umcs: Catalogo[];

  /** Lista de catálogos que representan países bloqueados. */
  paisBloques: Catalogo[];


  /**
   * Objeto que contiene datos del formulario del certificado.
   * Las claves pueden contener valores de tipo undefined, boolean, string, number u objeto.
   */
  formCertificado: { [key: string]: undefined | boolean | string | number | object };
  /**
   * @property {Object} formDatosCertificado - Datos adicionales del certificado.
   * @description
   * Contiene campos como observaciones, idioma, entidad federativa y representación federal.
   */
  formDatosCertificado: { [key: string]: unknown};
  /**
   * Objeto que contiene datos del formulario de mercancía.
   * Las claves pueden contener valores de tipo undefined, boolean, string, number u objeto.
   */
  mercanciaForm: { [key: string]: undefined | boolean | string | number | object };

  /** Lista de mercancías encontradas o buscadas. */
  buscarMercancia: Mercancia[];

  /**
   * Objeto que representa la validez de los formularios,
   * donde cada clave es un identificador de formulario y el valor un booleano indicando si es válido.
   */
  formaValida: { [key: string]: boolean };

  mercanciaTabla: Mercancia[];
  
  /** Representación federal (si aplica). */
  representacionFederal: string;

 idiomaDatosSeleccion: Catalogo;
 entidadFederativaSeleccion: Catalogo;
  representacionFederalSeleccion: Catalogo;
    /**
   * @property {Object} formulario - Otros datos de formularios auxiliares.
   * @description
   * Contiene otros datos relevantes para el trámite, como datos confidenciales del productor y si el productor es el mismo exportador.
   */
  formulario: { [key: string]: unknown};
  datosConfidencialesProductor:boolean;
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
 
}




/**
 * Estado inicial que se utiliza para crear el store con valores por defecto.
 */
export const INITIAL_STATE: TramiteState = {
  selectedMercancia: {} as Mercancia,
  destinatarioForm: {} as DestinatarioForm,
  domicilioForm: {} as DomicilioForm,
  representanteLegalForm: {} as RepresentanteLegalForm,
  altaPlanta: [],
  paisBloques: [],
  estado: { id: -1, descripcion: '' },
  umc: { id: -1, descripcion: '' },
  umcs: [],
  factura: [],
  formaValida: {},
  idiomaDatosSeleccion: { id: -1, descripcion: '' },
  entidadFederativaSeleccion: { id: -1, descripcion: '' },
  representacionFederalSeleccion: { id: -1, descripcion: '' },
   formCertificado: {
    entidadFederativa: '',
    tercerOperador: false,
    bloque: '',
    nombreComercialForm: '',
    registroProductoForm: '',
    fraccionArancelariaForm: '',
    fechaInicioInput: '',
    fechaFinalInput: '',
  },
    formulario:{
      datosConfidencialesProductor: false,
      productorMismoExportador: '',
    },
      datosConfidencialesProductor: false,
  formDatosCertificado: {
    observacionesDates: '',
    idiomaDates: '',
    EntidadFederativaDates: '',
    representacionFederalDates: '',
  },
  mercanciaForm: {
    fraccionNaladi: '',
    fraccionNaladiSa93: '',
    fraccionNaladiSa96: '',
    fraccionNaladiSa02: '',
    nombreTecnico: '',
    nombreComercial: '',
    normaOrigen: '',
    id: '',
    cantidad: '',
    umc: '',
    tipoFactura: '',
    valorMercancia: '',
    fechaFinalInput: '',
    numeroFactura: '',
    nalad: '',
    complementoClasificacion: '',
  },
  facturas: { id: -1, descripcion: '' },
  buscarMercancia: [],
  idiomaDatos: [],
  entidadFederativaDatos: [],
  representacionFederalDatos: [],
  mercanciaTabla: [],
  
  representacionFederal: '',
      agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',      
    },
};

/**
 * @class Tramite110223Store
 * @description
 * Store que administra el estado global del trámite 110204 utilizando Akita.
 * Este store encapsula todos los datos y formularios necesarios para la gestión
 * de un trámite, tales como catálogos, formularios, validaciones y mercancías.
 * 
 * Cada método `set` permite actualizar secciones específicas del estado de forma inmutable.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-110223', resettable: true })
export class Tramite110223Store extends Store<TramiteState> {
  constructor() {
    super(INITIAL_STATE);
  }
    /**
   * Elimina una o varias mercancías de la tabla.
   * @param ids Lista de IDs de mercancías a eliminar.
   */
  removeMercancia(ids: number[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTabla: state.mercanciaTabla.filter(m => !ids.includes(Number(m.id ?? -1))),
    }));
  }
   /**
   * Actualiza una mercancía en la tabla.
   * @param mercancia Mercancía con los nuevos datos (debe tener id).
   */
  updateMercancia(mercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciaTabla: state.mercanciaTabla.map(m =>
        m.id === mercancia.id ? { ...m, ...mercancia } : m
      ),
    }));
  }


  /**
   * Actualiza el estado seleccionado.
   * @param estado Objeto de tipo `Catalogo` representando un estado.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({ ...state, estado }));
  }

  /**
   * Actualiza la lista de facturas.
   * @param factura Arreglo de objetos `Catalogo`.
   */
  setFactura(factura: Catalogo[]): void {
    this.update((state) => ({ ...state, factura }));
  }

  /**
   * Actualiza la lista de UMCs disponibles.
   * @param umcs Lista de catálogos con unidades de medida.
   */
  setUmc(umcs: Catalogo[]): void {
    this.update((state) => ({ ...state, umcs }));
  }

  /**
   * Establece los bloques de países disponibles.
   * @param paisBloques Lista de catálogos de países por bloque.
   */
  setBloque(paisBloques: Catalogo[]): void {
    this.update((state) => ({ ...state, paisBloques }));
  }

  /**
   * Establece las plantas disponibles para alta.
   * @param altaPlanta Lista de plantas.
   */
  setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({ ...state, altaPlanta }));
  }

  /**
   * Actualiza el estado de validación de uno o varios campos del formulario.
   * @param formaValida Objeto con clave/valor booleano que indica si cada campo es válido.
   */
  setFormValida(formaValida: { [key: string]: boolean }): void {
    const IS_VALID = { ...this.getValue().formaValida, ...formaValida };
    this.update({ formaValida: IS_VALID });
  }
  /**
   * @descripcion
   * Actualiza los datos del formulario de certificado en el almacén.
   * @param values - Objeto que contiene los valores a actualizar en el formulario de certificado.
   */
setFormDatosCertificado(values: { [key: string]: unknown }): void {
  this.update((state) => ({
    ...state,
    formDatosCertificado: {
      ...state.formDatosCertificado, 
      ...values,                     
    },
  }));
}

  /**
   * Actualiza los valores del formulario principal del certificado.
   * @param values Clave/valor con campos del formulario.
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
   * Actualiza los valores del formulario de mercancía.
   * @param values Clave/valor con información sobre la mercancía.
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
   * Establece los resultados de mercancía obtenidos por búsqueda.
   * @param buscarMercancia Lista de resultados de tipo `Mercancia`.
   */
  setbuscarMercancia(buscarMercancia: Mercancia[]): void {
    this.update((state) => ({ ...state, buscarMercancia }));
  }

  /** Métodos individuales para establecer propiedades específicas de la solicitud **/

  public setRegimenMercancia(regimenMercancia: string): void {
    this.update((state) => ({ ...state, regimenMercancia }));
  }

  public setClasifiRegimen(clasifiRegimen: string): void {
    this.update((state) => ({ ...state, clasifiRegimen }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({ ...state, fraccionArancelaria }));
  }

  public setNico(nico: string): void {
    this.update((state) => ({ ...state, nico }));
  }

  public setUnidadMedidaTarifaria(unidadMedidaTarifaria: string): void {
    this.update((state) => ({ ...state, unidadMedidaTarifaria }));
  }

  public setPaisOrigen(paisOrigen: string): void {
    this.update((state) => ({ ...state, paisOrigen }));
  }

  public setPaisDestino(paisDestino: string): void {
    this.update((state) => ({ ...state, paisDestino }));
  }

  public setMolino(molino: string): void {
    this.update((state) => ({ ...state, molino }));
  }

  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({ ...state, representacionFederal }));
  }

  public setRepresentacionFederalDatos(representacionFederalDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, representacionFederalDatos }));
  }

  public setEntidadFederativaDatos(entidadFederativaDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, entidadFederativaDatos }));
  }

  public setIdiomaDatos(idiomaDatos: Catalogo[]): void {
    this.update((state) => ({ ...state, idiomaDatos }));
  }

  public setMercanciaTabla(mercanciaTabla: Mercancia[]): void {
    this.update((state) => ({ ...state, mercanciaTabla }));
  }
    /**
     * @descripcion
     * Actualiza los datos del formulario de destinatario.
     * @param destinatarioForm - Objeto que contiene los valores del formulario de destinatario.
     */
    setDestinatarioForm(destinatarioForm: DestinatarioForm): void {
      this.update((state) => ({
        ...state,
        destinatarioForm,
      }));
    }
  
    /**
     * @descripcion
     * Actualiza los datos del formulario de domicilio.
     * @param domicilioForm - Objeto que contiene los valores del formulario de domicilio.
     */
    setDomicilioForm(domicilioForm: DomicilioForm): void {
      this.update((state) => ({
        ...state,
        domicilioForm,
      }));
    }
  
    /**
     * @descripcion
     * Actualiza los datos del formulario de representante legal.
     * @param representanteLegalForm - Objeto que contiene los valores del formulario de representante legal.
     */
    setRepresentanteLegalForm(representanteLegalForm: RepresentanteLegalForm): void {
      this.update((state) => ({
        ...state,
        representanteLegalForm,
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
   * Actualiza la mercancía seleccionada.
   * @param mercancia Objeto de tipo Mercancia.
   */
  setSelectedMercancia(mercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      selectedMercancia: mercancia,
    }));
  }

  /**
   * Limpia la mercancía seleccionada.
   */
  clearSelectedMercancia(): void {
    this.update((state) => ({
      ...state,
      selectedMercancia: {} as Mercancia,
    }));
  }
}