import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@ng-mf/data-access-user';
import {HistoricoColumnas} from '../models/peru-certificado.module';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

/**
 * @description
 * Interfaz que define el estado del certificado PERU.
 */
/**
 * @interface Tramite110205State
 * @description Representa el estado de la aplicación para el trámite 110205.
 * Contiene las propiedades necesarias para gestionar los datos del formulario,
 * tablas, catálogos y otros elementos relacionados con el trámite.
 * 
 * @property { {[key: string]: unknown} } formCertificado - Datos del formulario de certificado.
 * @property { Catalogo } estado - Estado actual del trámite.
 * @property { Catalogo[] } paisBloques - Lista de países o bloques relacionados.
 * @property { {[key: string]: unknown} } mercanciaForm - Datos del formulario de mercancía.
 * @property { Mercancia[] } mercanciaTabla - Lista de mercancías en la tabla.
 * @property { {[key: string]: unknown} } formDatosCertificado - Datos del formulario de certificado.
 * @property { Catalogo } idiomaDatosSeleccion - Idioma seleccionado para los datos.
 * @property { Catalogo } entidadFederativaSeleccion - Entidad federativa seleccionada.
 * @property { Catalogo } representacionFederalSeleccion - Representación federal seleccionada.
 * @property { {[key: string]: unknown} } formDatosDelDestinatario - Datos del formulario del destinatario.
 * @property { {[key: string]: unknown} } formExportor - Datos del formulario del exportador.
 * @property { string } fraccionArancelaria - Fracción arancelaria de la mercancía.
 * @property { string } nombreComercialMercancia - Nombre comercial de la mercancía.
 * @property { string } nombreTecnico - Nombre técnico de la mercancía.
 * @property { string } nombreIngles - Nombre en inglés de la mercancía.
 * @property { string } otrasInstancias - Información sobre otras instancias relacionadas.
 * @property { string } criterioParaConferirOrigen - Criterio para conferir origen.
 * @property { string } cantidad - Cantidad de la mercancía.
 * @property { Catalogo[] } umc - Unidades de medida comercial.
 * @property { string } valorMercancia - Valor de la mercancía.
 * @property { string } complementoDescripcion - Descripción complementaria de la mercancía.
 * @property { string } numeroFactura - Número de factura.
 * @property { Catalogo[] } tipoFactura - Tipos de factura disponibles.
 * @property { {[key: string]: boolean} } formaValida - Validación de la forma.
 * @property { {[key: string]: unknown} } formDestinatario - Datos del formulario del destinatario.
 * @property { boolean | undefined } datosConfidencialesProductor - Indica si los datos del productor son confidenciales.
 * @property { boolean | undefined } productorMismoExportador - Indica si el productor es el mismo exportador.
 * @property { {[key: string]: unknown} } agregarDatosProductorFormulario - Datos adicionales del productor.
 * @property { {[key: string]: unknown} } formulario - Datos generales del formulario.
 */
export interface Tramite110205State {
  formCertificado: {[key: string]: unknown};
  estado: Catalogo;
  paisBloques: Catalogo[];
  mercanciaForm: {[key: string]: unknown};
  mercanciaTabla: Mercancia[];
  formDatosCertificado: {[key: string]: unknown};
  idiomaDatosSeleccion: Catalogo;
  entidadFederativaSeleccion: Catalogo;
  representacionFederalSeleccion: Catalogo;
  formDatosDelDestinatario: {[key: string]: unknown};
  formExportor: {[key: string]: unknown};
  fraccionArancelaria: string;
  nombreComercialMercancia: string;
  nombreTecnico: string;
  nombreIngles: string;
  otrasInstancias: string;
  criterioParaConferirOrigen: string;
  cantidad: string;
  umc: Catalogo[];
  valorMercancia: string;
  complementoDescripcion: string;
  numeroFactura: string;
  tipoFactura: Catalogo[];
  formaValida: { [key: string]: boolean };
  formDestinatario: {[key: string]: unknown};
  datosConfidencialesProductor?: boolean;
  productorMismoExportador?: boolean;
  agregarDatosProductorFormulario: {[key: string]: unknown};
  formulario: {[key: string]: unknown};
  disponiblesDatos:Mercancia[];
  procductoUno:HistoricoColumnas[];
}


/**
 * @method createInitialState
 * Crea el estado inicial para el trámite 110205 (Certificado PERU).
 * Inicializa todas las propiedades requeridas en el estado del store.
 * @function createInitialState
 * @description
 * 
 * @returns {Tramite110205State} Estado inicial del trámite 110205.
 */
export function createInitialState(): Tramite110205State {
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
      pais: '',
      ciudad: '',
      telefono: '',
      correoElectronico: '',
      numeroLetra: '',
      calle: '',

    },
    estado: {
      id: -1,
      descripcion: '',
    },
    paisBloques: [],
    mercanciaForm: {
      fraccionArancelaria: '',
      nombreComercialMercancia: '',
      nombreTecnico: '',
      nombreIngles: '',
      otrasInstancias: '',
      criterioParaConferirOrigen: '',
      marca: '',
      cantidad: '',
      umc: '',
      valorMercancia: '',
      complementoDescripcion: '',
      masaBruta: '',
      unidadMedidaMasaBruta: '',
      numeroFactura: '',
      tipoFactura: '',
      fechaFinal: '',
      normaOrigen: '',
      id: '',
      fechaFinalInput: '',
      nalad: '',
    },
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
    formDatosDelDestinatario: {
      nombres: '',
      primerApellido: '',
      segundoApellido: '',
      numeroDeRegistroFiscal: '',
      razonSocial: '',
    },
    fraccionArancelaria: '',
    nombreComercialMercancia: '',
    nombreTecnico: '',
    nombreIngles: '',
    otrasInstancias: '',
    criterioParaConferirOrigen: '',
    cantidad: '',
    umc: [],
    valorMercancia: '',
    complementoDescripcion: '',
    numeroFactura: '',
    tipoFactura: [],
    formExportor: {
      lugar: '',
      exportador: '',
      empresa: '',
      cargo: '',
      lada: '',
      telfono: '',
      fax: '',
      correo: '',
    },
    formaValida: {
      certificado: false,
      datos: false,
      destinatrio: false,
      datosDestinatario: false,
      exportador: false,
    },
    formDestinatario: {
      paisDestin: '',
      ciudad: '',
      celle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    formulario:{
      datosConfidencialesProductor: '',
      productorMismoExportador: '',
    },
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',      
    },
    disponiblesDatos: [],
    procductoUno:[]
  };
}

/**
 * @class Tramite110205Store
 * @description
 * Store encargado de gestionar el estado global del trámite 110205 (Certificado PERU).
 * Permite actualizar y consultar los datos relacionados con los formularios, catálogos, tablas y validaciones del trámite.
 * Utiliza Akita para el manejo reactivo del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite-110205', resettable: true })
export class Tramite110205Store extends Store<Tramite110205State> {
  /**
   * @constructor
   * @description
   * Inicializa el almacén con el estado inicial del trámite.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setFormCertificado
   * @description
   * Actualiza los datos del formulario de certificado.
   * @param values Valores a actualizar en el formulario.
   */
  setFormCertificado(values: { [key: string]: unknown }): void {
    this.update((state) => ({
      formCertificado: {
        ...state.formCertificado,
        ...values,
      },
    }));
  }

  /**
   * @method setFormHistorico
   * @description
   * Actualiza los datos del formulario de formulario.
   * @param values Valores a actualizar en el formulario.
   */
  setFormHistorico(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formulario: {
        ...state.formulario,
        ...values,
      },
    }));
  }

  /**
   * @method setAgregarFormDatosProductor
   * @description
   * Actualiza los datos del formulario de productor.
   * @param values Valores a actualizar en el formulario.
   */
  setAgregarFormDatosProductor(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      agregarDatosProductorFormulario: {
        ...state.agregarDatosProductorFormulario,
        ...values,
      },
    }));
  }

  /**
   * @method setEstado
   * @description
   * Actualiza el estado seleccionado en el almacén.
   * @param estado Objeto de tipo `Catalogo` que contiene la información del estado a actualizar.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * @method setBloque
   * @description
   * Actualiza los bloques de países en el almacén.
   * @param paisBloques Array de objetos `Catalogo` que representa los bloques de países.
   */
  setBloque(paisBloques: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      paisBloques,
    }));
  }

  /**
   * @method setFormMercancia
   * @description
   * Actualiza los datos del formulario de mercancía en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de mercancía.
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
   * @method setmercanciaTabla
   * @description
   * Actualiza la tabla de mercancías en el almacén.
   * @param mercanciaTabla Array de objetos `Mercancia` que representa la tabla de mercancías.
   */
  setmercanciaTabla(mercanciaTabla: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciaTabla,
    }));
  }

  /**
   * @method setFormDatosCertificado
   * @description
   * Actualiza los datos del formulario de certificado en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de certificado.
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
   * @method setIdiomaSeleccion
   * @description
   * Actualiza el idioma seleccionado en el almacén.
   * @param idiomaDatosSeleccion Objeto de tipo `Catalogo` que contiene la información del idioma seleccionado.
   */
  setIdiomaSeleccion(idiomaDatosSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      idiomaDatosSeleccion,
    }));
  }

  /**
   * @method setEntidadFederativaSeleccion
   * @description
   * Actualiza la entidad federativa seleccionada en el almacén.
   * @param entidadFederativaSeleccion Objeto de tipo `Catalogo` que contiene la información de la entidad federativa seleccionada.
   */
  setEntidadFederativaSeleccion(entidadFederativaSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativaSeleccion,
    }));
  }

  /**
   * @method setRepresentacionFederalDatosSeleccion
   * @description
   * Actualiza la representación federal seleccionada en el almacén.
   * @param representacionFederalSeleccion Objeto de tipo `Catalogo` que contiene la información de la representación federal seleccionada.
   */
  setRepresentacionFederalDatosSeleccion(representacionFederalSeleccion: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederalSeleccion,
    }));
  }

  /**
   * @method setFormDatosDelDestinatario
   * @description
   * Actualiza los datos del formulario de destinatario en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de destinatario.
   */
  setFormDatosDelDestinatario(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formDatosDelDestinatario: {
        ...state.formDatosDelDestinatario,
        ...values,
      },
    }));
  }

  /**
   * @method setFormExportador
   * @description
   * Actualiza los datos del formulario de exportador en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de exportador.
   */
  setFormExportador(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formExportor: {
        ...state.formExportor,
        ...values,
      },
    }));
  }

  /**
   * @method setFraccionArancelaria
   * @description
   * Actualiza el número de fraccionArancelaria en el almacén.
   * @param fraccionArancelaria Cadena que representa el número de fraccionArancelaria a actualizar.
   */
  setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * @method setNombreComercialMercancia
   * @description
   * Actualiza el número de nombreComercialMercancia en el almacén.
   * @param nombreComercialMercancia Cadena que representa el número de nombreComercialMercancia a actualizar.
   */
  setNombreComercialMercancia(nombreComercialMercancia: string): void {
    this.update((state) => ({
      ...state,
      nombreComercialMercancia,
    }));
  }

  /**
   * @method setNombreTecnico
   * @description
   * Actualiza el número de nombreTecnico en el almacén.
   * @param nombreTecnico Cadena que representa el número de nombreTecnico a actualizar.
   */
  setNombreTecnico(nombreTecnico: string): void {
    this.update((state) => ({
      ...state,
      nombreTecnico,
    }));
  }

  /**
   * @method setNombreIngles
   * @description
   * Actualiza el número de nombreIngles en el almacén.
   * @param nombreIngles Cadena que representa el número de nombreIngles a actualizar.
   */
  setNombreIngles(nombreIngles: string): void {
    this.update((state) => ({
      ...state,
      nombreIngles,
    }));
  }

  /**
   * @method setOtrasInstancias
   * @description
   * Actualiza el valor de `otrasInstancias` en el almacén.
   * @param otrasInstancias Cadena que representa el nuevo valor de `otrasInstancias`.
   */
  setOtrasInstancias(otrasInstancias: string): void {
    this.update((state) => ({
      ...state,
      otrasInstancias,
    }));
  }

  /**
   * @method setCriterioParaConferirOrigen
   * @description
   * Actualiza el número de criterioParaConferirOrigen en el almacén.
   * @param criterioParaConferirOrigen Cadena que representa el número de criterioParaConferirOrigen a actualizar.
   */
  setCriterioParaConferirOrigen(criterioParaConferirOrigen: string): void {
    this.update((state) => ({
      ...state,
      criterioParaConferirOrigen,
    }));
  }

  /**
   * @method setCantidad
   * @description
   * Actualiza el número de cantidad en el almacén.
   * @param cantidad Cadena que representa el número de cantidad a actualizar.
   */
  setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  /**
   * @method setUmc
   * @description
   * Actualiza el número de umc en el almacén.
   * @param umc Array de objetos `Catalogo` que representa las unidades de medida comercial.
   */
  setUmc(umc: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  /**
   * @method setValorMercancia
   * @description
   * Actualiza el número de valorMercancia en el almacén.
   * @param valorMercancia Cadena que representa el número de valorMercancia a actualizar.
   */
  setValorMercancia(valorMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorMercancia,
    }));
  }

  /**
   * @method setComplementoDescripcion
   * @description
   * Actualiza el número de complementoDescripcion en el almacén.
   * @param complementoDescripcion Cadena que representa el número de complementoDescripcion a actualizar.
   */
  setComplementoDescripcion(complementoDescripcion: string): void {
    this.update((state) => ({
      ...state,
      complementoDescripcion,
    }));
  }

  /**
   * @method setNumeroFactura
   * @description
   * Actualiza el número de numeroFactura en el almacén.
   * @param numeroFactura Cadena que representa el número de numeroFactura a actualizar.
   */
  setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }));
  }

  /**
   * @method setTipoFactura
   * @description
   * Actualiza el número de tipoFactura en el almacén.
   * @param tipoFactura Array de objetos `Catalogo` que representa los tipos de factura.
   */
  setTipoFactura(tipoFactura: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tipoFactura,
    }));
  }

  /**
   * @method setFormValida
   * @description
   * Actualiza el estado de validación de los formularios en el almacén.
   * @param formaValida Objeto que contiene los valores de validación para los formularios.
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
   * @method setFormDestinatario
   * @description
   * Actualiza los datos del formulario de destinatario en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de destinatario.
   */
  setFormDestinatario(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formDestinatario: {
        ...state.formDestinatario,
        ...values,
      },
    }));
  }

  /**
   * @method setFormCertificadoGenric
   * @description
   * Actualiza los datos del formulario de certificado en el almacén.
   * @param values Objeto que contiene los valores a actualizar en el formulario de certificado.
   */
  setFormCertificadoGenric(values: { [key: string]: undefined | boolean | string | number | object }): void {
    this.update((state) => ({
      formCertificado: {
        ...state.formCertificado,
        ...values,
      },
    }));
  }
  /**
   * @method setDatosConfidencialesProductor
   * @description
   * Actualiza el estado de datos confidenciales del productor en el almacén.
   * @param datosConfidencialesProductor Valor booleano que indica si los datos del productor son confidenciales.
   * */
  setDisponsiblesDatos(disponiblesDatos: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      disponiblesDatos,
    }));
  }
  /**
   * @method setDatosConfidencialesProductor
   * @description
   * Actualiza el estado de datos confidenciales del productor en el almacén.
   * @param datosConfidencialesProductor Valor booleano que indica si los datos del productor son confidenciales.
   * */
  setHistorica(procductoUno: HistoricoColumnas[]): void {
    this.update((state) => ({
      ...state,
      procductoUno,
    }));
  }
}