import { ArchivoDocumentos, AvisoFormulario, DatosSolicitante, DesperdicioFormulario, DomicilioFormulario, PedimentoFormulario, ProcesoFormulario, TipoDocumento } from '../models/aviso-destruccion.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * @interface Tramite32506State
 * @description Representa el estado de la gestión del trámite 32506.
 *
 * @property {number} pasoActivo - Indica el paso activo en el flujo del trámite.
 * @property {number} pestanaActiva - Indica la pestaña activa en la interfaz del trámite.
 * @property {DatosSolicitante} datosSolicitante - Contiene los datos del solicitante.
 * @property {PedimentoFormulario} pedimentoFormulario - Contiene los datos del formulario de pedimento.
 * @property {DomicilioFormulario} domicilioFormulario - Contiene los datos del formulario de domicilio.
 * @property {AvisoFormulario} avisoFormulario - Contiene los datos del formulario de aviso.
 * @property {TipoDocumento[]} tipoTablaDatos - Lista de tipos de documentos disponibles.
 * @property {string} tipoDocumento - Tipo de documento seleccionado.
 * @property {ArchivoDocumentos[]} documentosDesplegable - Lista de documentos disponibles en el desplegable.
 * @property {string[]} valorSeleccionado - Valores seleccionados en el formulario.
 */
export interface Tramite32506State {
  pasoActivo: number;
  pestanaActiva: number;
  datosSolicitante: DatosSolicitante;
  domicilioFormulario: DomicilioFormulario;
  avisoFormulario: AvisoFormulario;
  procesoFormulario: ProcesoFormulario;
  desperdicioFormulario: DesperdicioFormulario;
  pedimentoFormulario: PedimentoFormulario;
  tipoTablaDatos: TipoDocumento[];
  tipoDocumento: string;
  documentosDesplegable: ArchivoDocumentos[];
  valorSeleccionado: string[];
}
/**
 * Estado inicial del trámite 32506.
 * 
 * Esta función define el estado inicial del trámite, incluyendo datos del solicitante,
 * formulario de mercancías, formulario de domicilio, formulario de aviso, y otros datos relacionados.
 * 
 * @returns {Tramite32506State} El estado inicial del trámite.
 * 
 * 
 */
export function createInitialState(): Tramite32506State {
  return {
    pasoActivo: 1,
    pestanaActiva: 2,
    datosSolicitante: {
      rfc: "",
      denominacion: "",
      actividadEconomica: "",
      correoElectronico: "",
      pais: "",
      codigoPostal: "",
      horaDestruccion: "",
      fechaDestruccion: "",
      entidadFederativa: "",
      municipio: "",
      localidad: "",
      colonia: "",
      calle: "",
      nExt: "",
      nInt: "",
      lada: "",
      telefono: "",
      adace: "",
    },
    domicilioFormulario: {
      nombreComercial: '',
      claveEntidadFederativa: '',
      claveDelegacionMunicipio: '',
      claveColonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      codigoPostal: '',
      rfc: '',
    },
    avisoFormulario: {
      adace: '',
      valorProgramaImmex: '',
      valorAnioProgramaImmex: '',
      tipoAviso: '',
      justificacion: '',
      periodicidadMensualDestruccion: '',
      fechaTranslado: '',
      nombreComercial: '',
      claveEntidadFederativa: '',
      claveDelegacionMunicipio: '',
      claveColonia: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      codigoPostal: '',
      horaDestruccion: '',
      fechaDestruccion: '',
      tipoCarga: '',
    },
    procesoFormulario: {
      descripcionProcesoDestruccion: ''
    },
    desperdicioFormulario: {
      descripcionDesperdicio: '',
      cantidadDesp: '',
      claveUnidadMedidaDesp: '',
      porcentaje: '',
      descripcionMercancia: '',
      circunstanciaHechos: ''
    },
    pedimentoFormulario: {
      patenteAutorizacion: '',
      pedimento: '',
      claveAduanaPedimento: '',
      claveFraccionArancelariaPedimento: '',
      nicoPedimento: '',
      cantidadPedimento: '',
      claveUnidadMedidaPedimento: ''
    },
    tipoTablaDatos: [],
    tipoDocumento: '',
    documentosDesplegable: [],
    valorSeleccionado: []
  };
}
/**
 * Store para gestionar el estado del trámite 32506.
 * 
 * Este store utiliza Akita para manejar el estado del trámite, permitiendo actualizar y consultar
 * diferentes propiedades relacionadas con el trámite.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32506', resettable: true })
export class Tramite32506Store extends Store<Tramite32506State> {

  /**
   * Constructor del store.
   * 
   * Inicializa el store con el estado inicial definido en `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
 * Actualiza el paso activo del trámite.
 * 
 * @param {number} pasoActivo - El número del paso activo.
 */
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }

  /**
   * Actualiza el tipo de documento seleccionado.
   * 
   * @param {string} tipoDocumento - El tipo de documento seleccionado.
   */
  public setTipoDocumento(tipoDocumento: string): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  /**
   * Actualiza la lista de documentos desplegables.
   * 
   * @param {ArchivoDocumentos[]} documentosDesplegable - Lista de documentos desplegables.
   */
  public setDocumentosDesplegable(documentosDesplegable: ArchivoDocumentos[]): void {
    this.update((state) => ({
      ...state,
      documentosDesplegable,
    }));
  }

  /**
   * Actualiza los valores seleccionados.
   * 
   * @param {string[]} valorSeleccionado - Lista de valores seleccionados.
   */
  public setValorSeleccionado(valorSeleccionado: string[]): void {
    this.update((state) => ({
      ...state,
      valorSeleccionado,
    }));
  }

  /**
   * Actualiza la pestaña activa del trámite.
   * 
   * @param {number} pestanaActiva - El número de la pestaña activa.
   */
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }
  /**
   * Actualiza los datos del solicitante en el estado.
   * 
   * @param {DatosSolicitante} datosSolicitante - Objeto que contiene los datos del solicitante.
   */
  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante
    }));
  }

  /**
   * Actualiza el nombre comercial en el formulario de domicilio.
   * 
   * @param {string} nombreComercial - El nombre comercial.
   */
  public setDomicilioFormularioNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, nombreComercial },
    }));
  }

  /**
   * Actualiza la clave de la entidad federativa en el formulario de domicilio.
   * 
   * @param {string} claveEntidadFederativa - La clave de la entidad federativa.
   */
  public setDomicilioFormularioEntidadFederativa(claveEntidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveEntidadFederativa },
    }));
  }

  /**
   * Actualiza la clave de la delegación o municipio en el formulario de domicilio.
   * 
   * @param {string} claveDelegacionMunicipio - La clave de la delegación o municipio.
   */
  public setDomicilioFormularioDelegacionMunicipio(claveDelegacionMunicipio: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveDelegacionMunicipio },
    }));
  }
  /**
   * Actualiza la clave de la colonia en el formulario de domicilio.
   * 
   * @param {string} claveColonia - La clave de la colonia.
   */
  public setDomicilioFormularioColonia(claveColonia: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveColonia },
    }));
  }

  /**
   * Actualiza la calle en el formulario de domicilio.
   * 
   * @param {string} calle - El nombre de la calle.
   */
  public setDomicilioFormularioCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, calle },
    }));
  }

  /**
   * Actualiza el número exterior en el formulario de domicilio.
   * 
   * @param {string} numeroExterior - El número exterior.
   */
  public setDomicilioFormularioNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, numeroExterior },
    }));
  }

  /**
   * Actualiza el número interior en el formulario de domicilio.
   * 
   * @param {string} numeroInterior - El número interior.
   */
  public setDomicilioFormularioNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, numeroInterior },
    }));
  }

  /**
   * Actualiza el código postal en el formulario de domicilio.
   * 
   * @param {string} codigoPostal - El código postal.
   */
  public setDomicilioFormularioCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, codigoPostal },
    }));
  }

  /**
   * Actualiza el hora destrucción en el formulario de domicilio.
   * 
   * @param {string} horaDestruccion - El horaDestruccion.
   */
  public setHoraDestruccion(horaDestruccion: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, horaDestruccion },
    }));
  }

  /**
   * Actualiza el fecha destrucción en el formulario de domicilio.
   * 
   * @param {string} fechaDestruccion - El fechaDestruccion.
   */
  public setFechaDestruccion(fechaDestruccion: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, fechaDestruccion },
    }));
  }

  /**
   * Actualiza el RFC en el formulario de domicilio.
   * 
   * @param {string} rfc - El RFC.
   */
  public setDomicilioFormularioRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, rfc },
    }));
  }

  /**
   * Actualiza el valor de ADACE en el formulario de aviso.
   * 
   * @param {string} adace - El valor de ADACE.
   */
  public setAvisoFormularioAdace(adace: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, adace },
    }));
  }

  /**
   * Actualiza el valor del programa IMMEX en el formulario de aviso.
   * 
   * @param {string} valorProgramaImmex - El valor del programa IMMEX.
   */
  public setAvisoFormularioValorProgramaImmex(valorProgramaImmex: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, valorProgramaImmex },
    }));
  }
  /**
   * Actualiza el valor del año del programa IMMEX en el formulario de aviso.
   * 
   * @param {string} valorAnioProgramaImmex - El valor del año del programa IMMEX.
   */
  public setAvisoFormularioValorAnioProgramaImmex(valorAnioProgramaImmex: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, valorAnioProgramaImmex },
    }));
  }

  /**
   * Actualiza el tipo de aviso en el formulario de aviso.
   * 
   * @param {string} tipoAviso - El tipo de aviso.
   */
  public setAvisoFormularioTipoAviso(tipoAviso: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, tipoAviso },
    }));
  }

  /**
   * Actualiza el ID de la justificación en el formulario de aviso.
   * 
   * @param {string} justificacion - El ID de la justificación.
   */
  public setAvisoFormularioJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, justificacion },
    }));
  }

  /**
   * Actualiza el Periodicidad Mensual Destruccion en el formulario de aviso.
   * 
   * @param {string} periodicidadMensualDestruccion - El Periodicidad Mensual Destruccion.
   */
  public setPeriodicidadMensualDestruccion(periodicidadMensualDestruccion: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, periodicidadMensualDestruccion },
    }));
  }

  /**
   * Actualiza la fecha de traslado en el formulario de aviso.
   * 
   * @param {string} fechaTranslado - La fecha de traslado.
   */
  public setAvisoFormularioFechaTranslado(fechaTranslado: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, fechaTranslado },
    }));
  }

  /**
   * Actualiza el nombre comercial en el formulario de aviso.
   * 
   * @param {string} nombreComercial - El nombre comercial.
   */
  public setAvisoFormularioNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, nombreComercial },
    }));
  }

  /**
   * Actualiza la clave de la entidad federativa en el formulario de aviso.
   * 
   * @param {string} claveEntidadFederativa - La clave de la entidad federativa.
   */
  public setAvisoFormularioEntidadFederativa(claveEntidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, claveEntidadFederativa },
    }));
  }

  /**
   * Actualiza la clave de la delegación o municipio en el formulario de aviso.
   * 
   * @param {string} claveDelegacionMunicipio - La clave de la delegación o municipio.
   */
  public setAvisoFormularioDelegacionMunicipio(claveDelegacionMunicipio: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, claveDelegacionMunicipio },
    }));
  }

  /**
   * Actualiza la clave de la colonia en el formulario de aviso.
   * 
   * @param {string} claveColonia - La clave de la colonia.
   */
  public setAvisoFormularioColonia(claveColonia: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, claveColonia },
    }));
  }
  /**
 * Actualiza la calle en el formulario de aviso.
 * 
 * @param {string} calle - La calle del aviso.
 */
  public setAvisoFormularioCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, calle },
    }));
  }

  /**
   * Actualiza el número exterior en el formulario de aviso.
   * 
   * @param {string} numeroExterior - El número exterior del aviso.
   */
  public setAvisoFormularioNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, numeroExterior },
    }));
  }

  /**
   * Actualiza el número interior en el formulario de aviso.
   * 
   * @param {string} numeroInterior - El número interior del aviso.
   */
  public setAvisoFormularioNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, numeroInterior },
    }));
  }

  /**
   * Actualiza el código postal en el formulario de aviso.
   * 
   * @param {string} codigoPostal - El código postal del aviso.
   */
  public setAvisoFormularioCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, codigoPostal },
    }));
  }

  /**
   * Actualiza el tipo de carga en el formulario de aviso.
   * 
   * @param {string} tipoCarga - El tipo de carga del aviso.
   */
  public setAvisoFormularioTipoCarga(tipoCarga: string): void {
    this.update((state) => ({
      ...state,
      avisoFormulario: { ...state.avisoFormulario, tipoCarga },
    }));
  }

  /**
   * Actualiza los datos de la tabla de tipos de documentos.
   * 
   * @param {TipoDocumento[]} tipoTablaDatos - Lista de tipos de documentos.
   */
  public setTipoTablaDatos(tipoTablaDatos: TipoDocumento[]): void {
    this.update((state) => ({
      ...state,
      tipoTablaDatos,
    }));
  }

  public setDescripcionProcesoDestruccion(descripcionProceso: string): void {
    this.update((state) => ({
      ...state,
      procesoFormulario: { ...state.procesoFormulario, descripcionProceso },
    }))
  }

  
  public setDescripcionDesperdicio(descripcionDesperdicio: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, descripcionDesperdicio },
    }))
  }

  public setCantidadDesp(cantidadDesp: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, cantidadDesp },
    }))
  }
  
  public setClaveUnidadMedidaDesp(claveUnidadMedidaDesp: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, claveUnidadMedidaDesp },
    }))
  }

  public setPorcentaje(porcentaje: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, porcentaje },
    }))
  }

  public setDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, descripcionMercancia },
    }))
  }
  public setCircunstanciaHechos(circunstanciaHechos: string): void {
    this.update((state) => ({
      ...state,
      desperdicioFormulario: { ...state.desperdicioFormulario, circunstanciaHechos },
    }))
  }

  public setPatenteAutorizacion(patenteAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, patenteAutorizacion },
    }))
  }

  public setPedimento(pedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, pedimento },
    }))
  }

  public setClaveAduanaPedimento(claveAduanaPedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, claveAduanaPedimento },
    }))
  }

  public setClaveFraccionArancelariaPedimento(claveFraccionArancelariaPedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, claveFraccionArancelariaPedimento },
    }))
  }

  public setNicoPedimento(nicoPedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, nicoPedimento },
    }))
  }

  public setCantidadPedimento(cantidadPedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, cantidadPedimento },
    }))
  }

  public setClaveUnidadMedidaPedimento(claveUnidadMedidaPedimento: string): void {
    this.update((state) => ({
      ...state,
      pedimentoFormulario: { ...state.pedimentoFormulario, claveUnidadMedidaPedimento },
    }))
  }

}
