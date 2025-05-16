import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { FusionEscision } from '../../models/30505/aviso-modificacion.model';


/**
 * @description
 * Estado de la solicitud para el trámite 30505.
 *
 * @property {string} numeroDeOficio - Número de oficio relacionado con la solicitud.
 * @property {string} fechaFinVigencia - Fecha de fin de vigencia de la solicitud.
 * @property {boolean} avisoDeMod - Indica si existe aviso de modificación.
 * @property {boolean} avisoDeFusion - Indica si existe aviso de fusión.
 * @property {boolean} avisoDeCal - Indica si existe aviso de calificación.
 * @property {boolean} avisoDenom - Indica si existe aviso de denominación.
 * @property {string[]} selectedCheckbox - Lista de checkboxes seleccionados.
 * @property {string} descClobGenerica - Descripción genérica adicional.
 * @property {string} fechaInicioVigencia - Fecha de inicio de vigencia.
 * @property {string} rfcVucem - RFC registrado en VUCEM.
 * @property {string} razonSocialVucem - Razón social registrada en VUCEM.
 * @property {string} rfcIdc - RFC registrado en IDC.
 * @property {string} razonSocialIdc - Razón social registrada en IDC.
 * @property {string} folioAcuse - Folio del acuse de recibo.
 * @property {string} cantidadBienes - Cantidad de bienes declarados.
 * @property {string} capacidadAlmacenamiento2 - Capacidad de almacenamiento adicional.
 * @property {string} numeroTotalCarros - Número total de carros involucrados.
 * @property {string} fechaInspeccion - Fecha de inspección.
 * @property {string} descripcionClobGenerica2 - Descripción genérica adicional 2.
 * @property {string} razonSocial - Razón social principal.
 * @property {string} razonSocialSC - Razón social de la sociedad controladora.
 * @property {string} numFolioTramite - Número de folio del trámite.
 * @property {string} fechafinVigencia2 - Fecha de fin de vigencia adicional.
 * @property {string} tipoSolicitudPexim - Tipo de solicitud PEXIM.
 * @property {string} capacidadAlmacenamiento - Capacidad de almacenamiento.
 * @property {string} tipoCaat - Tipo de CAAT.
 * @property {string} tipoProgFomExp - Tipo de programa de fomento a la exportación.
 * @property {string} tipoTransito - Tipo de tránsito.
 * @property {string} numeroEstablecimiento - Número de establecimiento.
 * @property {string} medioTransporte - Medio de transporte utilizado.
 * @property {string} nombreBanco - Nombre del banco relacionado.
 * @property {string} nomOficialAutorizado - Nombre del oficial autorizado.
 * @property {string} empresaControladora - Nombre de la empresa controladora.
 * @property {string} observaciones - Observaciones adicionales.
 * @property {string} descripcionLugarEmbarque - Descripción del lugar de embarque.
 * @property {string} actividadProductiva - Actividad productiva principal.
 * @property {string} certificacionModal - Certificación modal.
 * @property {string} rfcBusquedaModal - RFC para búsqueda modal.
 * @property {string} razonSocialFusionante - Razón social de la empresa fusionante.
 * @property {string} folioVucemFusionante - Folio VUCEM de la empresa fusionante.
 * @property {string} fechaInicioVigenciaFusionante - Fecha de inicio de vigencia de la empresa fusionante.
 * @property {string} fechaFinVigenciaFusionante - Fecha de fin de vigencia de la empresa fusionante.
 * @property {string} rfcBusquedaModalSC - RFC para búsqueda modal de la sociedad controladora.
 * @property {string} razonSocialFusionanteSC - Razón social de la sociedad controladora fusionante.
 * @property {FusionEscision[]} fusionEscisionData - Datos de fusión o escisión.
 *
 * @author Equipo de desarrollo AGA
 */
export interface Solicitud30505State {
  numeroDeOficio: string,
  fechaFinVigencia: string,
  avisoDeMod: boolean
  avisoDeFusion: boolean
  avisoDeCal: boolean,
  avisoDenom: boolean,
  selectedCheckbox: string[],

  descClobGenerica: string;
  fechaInicioVigencia: string;

  rfcVucem: string;
  razonSocialVucem: string;
  rfcIdc: string;
  razonSocialIdc: string;
  folioAcuse: string;

  cantidadBienes: string;
  capacidadAlmacenamiento2: string;
  numeroTotalCarros: string;
  fechaInspeccion: string;
  descripcionClobGenerica2: string;
  razonSocial: string;
  razonSocialSC: string;
  numFolioTramite: string;
  fechafinVigencia2: string;
  tipoSolicitudPexim: string;
  capacidadAlmacenamiento: string;
  tipoCaat: string;
  tipoProgFomExp: string;
  tipoTransito: string;
  numeroEstablecimiento: string;
  medioTransporte: string;
  nombreBanco: string;
  nomOficialAutorizado: string;
  empresaControladora: string;
  observaciones: string;
  descripcionLugarEmbarque: string;
  actividadProductiva: string;

       certificacionModal: string,
        rfcBusquedaModal: string,
        razonSocialFusionante: string,
        folioVucemFusionante: string,
        fechaInicioVigenciaFusionante:string,
        fechaFinVigenciaFusionante: string,
        rfcBusquedaModalSC: string,
        razonSocialFusionanteSC: string,
        fusionEscisionData: FusionEscision[]
}
/**
 * @description
 * Crea y retorna el estado inicial para la solicitud 30505.
 *
 * @returns {Solicitud30505State} El estado inicial de la solicitud 30505 con valores predeterminados.
 *
 * @memberof Tramites30505Store
 *
 * @see Solicitud30505State
 */
export function createInitialSolicitudState(): Solicitud30505State {
  return {
    numeroDeOficio: '2500300300202599100000000000',
    fechaFinVigencia: '02-04-2025',
    avisoDeMod: false,
    avisoDeFusion: false,
    avisoDeCal: false,
    avisoDenom: false,
    selectedCheckbox: [],
    descClobGenerica: '',
    fechaInicioVigencia: '',
    fechafinVigencia2: '',
    rfcVucem: 'AAL0409235E6',
    razonSocialVucem: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
    rfcIdc: 'AAL0409235E6',
    razonSocialIdc: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
    folioAcuse: '',
    capacidadAlmacenamiento2: '',
    cantidadBienes: '',
    numeroTotalCarros: '',
    fechaInspeccion: '',
    descripcionClobGenerica2: '',
    razonSocial: '',
    razonSocialSC: '',
    numFolioTramite: '',
    tipoSolicitudPexim: '',
    capacidadAlmacenamiento: '',
    tipoCaat: '',
    tipoProgFomExp: '',
    tipoTransito: '',
    numeroEstablecimiento: '',
    medioTransporte: '',
    nombreBanco: '',
    nomOficialAutorizado: '',
    empresaControladora: '',
    observaciones: '',
    descripcionLugarEmbarque: '',
    actividadProductiva: '',
    certificacionModal: '',
        rfcBusquedaModal: '',
        razonSocialFusionante: '',
        folioVucemFusionante: '',
        fechaInicioVigenciaFusionante:'',
        fechaFinVigenciaFusionante: '',
        rfcBusquedaModalSC: '',
        razonSocialFusionanteSC: '',
        fusionEscisionData: []
  };
}


/**
 * Store para gestionar el estado de la solicitud 30505.
 * 
 * Proporciona métodos para actualizar diferentes campos del estado relacionados con la solicitud,
 * como descripciones, fechas de vigencia, avisos, datos seleccionados, folios, tipos de solicitud,
 * capacidades, medios de transporte, bancos, observaciones, lugares de embarque, actividades productivas,
 * y datos de fusión/escisión.
 * 
 * @remarks
 * Utiliza Akita Store para el manejo del estado reactivo.
 * 
 * @example
 * ```typescript
 * solicitud30505Store.setDescClobGenerica('Descripción genérica');
 * solicitud30505Store.setFechaInicioVigencia('2024-01-01');
 * ```
 */

@Injectable({
  providedIn: 'root',
})
/**
 * Store Akita para gestionar el estado de la solicitud 30505.
 * 
 * Proporciona métodos para actualizar diferentes propiedades del estado relacionadas con la solicitud,
 * como la descripción genérica del producto, fechas de vigencia, avisos, datos seleccionados, folio de acuse,
 * tipo de solicitud, capacidad de almacenamiento, tipo de tránsito, medio de transporte, nombre del banco,
 * observaciones, descripción del lugar de embarque, actividad productiva, y datos de fusión/escisión.
 * 
 * @remarks
 * Utiliza Akita Store para el manejo reactivo del estado en la aplicación.
 * 
 * @example
 * ```typescript
 * solicitud30505Store.setDescClobGenerica('Nueva descripción');
 * solicitud30505Store.setFechaInicioVigencia('2024-06-01');
 * ```
 */

@StoreConfig({ name: 'solicitud30505', resettable: true })
export class Solicitud30505Store extends Store<Solicitud30505State> {

  /**
   * Constructor de la clase.
   * Inicializa el estado de la solicitud utilizando el estado inicial definido por `createInitialSolicitudState()`.
   * Llama al constructor de la clase base con el estado inicial.
   */
  constructor() {
    super(createInitialSolicitudState());
  }
  
  /**
   * Actualiza el estado con un nuevo valor para la propiedad `descClobGenerica`.
   *
   * @param descClobGenerica - Nueva descripción en formato CLOB genérica que se asignará al estado.
   */
  public setDescClobGenerica(descClobGenerica: string): void {
    this.update((state) => ({
      ...state,
      descClobGenerica,
    }));
  }
  
  /**
   * Establece la fecha de inicio de vigencia en el estado.
   *
   * @param fechaInicioVigencia - La nueva fecha de inicio de vigencia en formato string.
   */
  public setFechaInicioVigencia(fechaInicioVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioVigencia,
    }));
  }

  /**
   * Establece la fecha de fin de vigencia en el estado.
   *
   * @param fechaFinVigencia - La nueva fecha de fin de vigencia en formato string.
   */
  public setFechaFinVigencia(fechaFinVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaFinVigencia,
    }));
  }

  /**
   * Actualiza el estado estableciendo el valor del aviso para un campo específico.
   *
   * @param aviso - Valor booleano que indica el estado del aviso.
   * @param field - Nombre del campo del estado que se actualizará.
   */
  public setAviso(aviso: boolean, field: string): void {
    this.update((state) => ({
      ...state,
      [field]: aviso,
    }));
  }

  /**
   * Actualiza el estado con los valores seleccionados de los checkboxes.
   *
   * @param datos - Un arreglo de strings que representa los valores seleccionados de los checkboxes.
   */
  public setCheckboxDatos(datos: string[]): void {
    this.update((state) => ({
      ...state,
      selectedCheckbox: datos,
    }));
  }

  /**
   * Actualiza el estado con el nuevo valor de folioAcuse.
   *
   * @param folio - El folio del acuse que se debe establecer en el estado.
   */
  public setFolioAcuse(folio: string): void {
    this.update((state) => ({
      ...state,
      folioAcuse: folio,
    }));
  }

  /**
   * Actualiza el estado estableciendo un aviso en el campo especificado.
   *
   * @param aviso - El mensaje de aviso que se asignará.
   * @param field - El nombre del campo del estado donde se almacenará el aviso.
   */
  public setAvisoDatos(aviso: string, field: string): void {
    this.update((state) => ({
      ...state,
      [field]: aviso,
    }));
  }

  /**
   * Establece el valor de `tipoSolicitudPexim` en el estado de la tienda.
   *
   * @param tipoSolicitudPexim - El nuevo valor para el tipo de solicitud PEXIM.
   */
  public setTipoSolicitudPexim(tipoSolicitudPexim: string): void {
    this.update((state) => ({
      ...state,
      tipoSolicitudPexim,
    }));
  }

  /**
   * Actualiza la capacidad de almacenamiento en el estado de la tienda.
   *
   * @param capacidadAlmacenamiento - Nueva capacidad de almacenamiento a establecer en el estado.
   */
  public setCapacidadAlmacenamiento(capacidadAlmacenamiento: string): void {
    this.update((state) => ({ 
      ...state,
      capacidadAlmacenamiento,
    }));
  }

  /**
   * Actualiza el estado con un nuevo valor para el tipo de CAAT.
   *
   * @param tipoCaat - El nuevo valor de tipo CAAT que se establecerá en el estado.
   */
  public setTipoCaat(tipoCaat: string): void {
    this.update((state) => ({   
      ...state,
      tipoCaat,
    }));
  }

/**
 * Establece el valor de `tipoProgFomExp` en el estado de la tienda.
 *
 * @param tipoProgFomExp - El nuevo valor para el campo `tipoProgFomExp`.
 */
public setTipoProgFomExp(tipoProgFomExp: string): void {
    this.update((state) => ({
      ...state,
      tipoProgFomExp,
    }));
  }

/**
 * Establece el tipo de tránsito en el estado de la tienda.
 *
 * @param tipoTransito - El nuevo valor para el tipo de tránsito.
 */
public setTipoTransito(tipoTransito: string): void {
    this.update((state) => ({
      ...state,
      tipoTransito,
    }));
  }

/**
 * Establece el número de establecimiento en el estado.
 *
 * @param numeroEstablecimiento - El nuevo número de establecimiento a asignar al estado.
 */
public setNumeroEstablecimiento(numeroEstablecimiento: string): void {
    this.update((state) => ({
      ...state,
      numeroEstablecimiento,
    }));
  }

/**
 * Actualiza el estado con el medio de transporte especificado.
 *
 * @param medioTransporte - El medio de transporte a establecer en el estado.
 */
public setMedioTransporte(medioTransporte: string): void {
    this.update((state) => ({
      ...state,
      medioTransporte,
    }));
  }

/**
 * Establece el nombre del banco en el estado.
 *
 * @param nombreBanco - El nombre del banco a asignar en el estado.
 */
public setNombreBanco(nombreBanco: string): void {
    this.update((state) => ({
      ...state,
      nombreBanco,
    }));
  }

/**
 * Establece el nombre del oficial autorizado en el estado.
 *
 * @param nomOficialAutorizado - El nombre del oficial autorizado que se va a asignar al estado.
 */
public setNomOficialAutorizado(nomOficialAutorizado: string): void {
    this.update((state) => ({
      ...state,
      nomOficialAutorizado,
    }));
  }

/**
 * Establece el valor de la empresa controladora en el estado.
 *
 * @param empresaControladora - El nombre o identificador de la empresa controladora a asignar.
 */
public setEmpresaControladora(empresaControladora: string): void {
    this.update((state) => ({
      ...state,
      empresaControladora,
    }));
  }

  /**
   * Actualiza el estado con las nuevas observaciones proporcionadas.
   *
   * @param observaciones - Texto que contiene las observaciones a guardar en el estado.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /**
   * Actualiza la descripción del lugar de embarque en el estado.
   *
   * @param descripcionLugarEmbarque - Nueva descripción para el lugar de embarque.
   */
  public setDescripcionLugarEmbarque(descripcionLugarEmbarque: string): void {
    this.update((state) => ({
      ...state,
      descripcionLugarEmbarque,
    }));
  }

  /**
   * Actualiza el estado con una nueva actividad productiva.
   *
   * @param actividadProductiva - La actividad productiva que se va a establecer en el estado.
   */
  public setActividadProductiva(actividadProductiva: string): void {
    this.update((state) => ({
      ...state,
      actividadProductiva,
    }));
  }

  /**
   * Elimina un elemento de tipo FusionEscision del arreglo fusionEscisionData en el estado,
   * filtrando por el campo rfcBusquedaModal.
   *
   * @param fusionToRemove - El objeto FusionEscision que se desea eliminar del estado.
   */
   public removeFusionadoDato(fusionToRemove: FusionEscision): void {
    this.update((state) => ({
      ...state,
      fusionEscisionData: state.fusionEscisionData.filter(
        (fusionDatos) => fusionDatos.rfcBusquedaModal !== fusionToRemove.rfcBusquedaModal
      ),
    }));
  }

  
  /**
   * Actualiza el estado agregando nuevos datos de fusión/escisión al arreglo existente.
   *
   * @param newFusion - Un arreglo de objetos `FusionEscision` que serán añadidos a los datos actuales de fusión/escisión.
   */
  public updateFusionDatos(newFusion: FusionEscision[]): void {
    this.update((state) => ({
      ...state,
      fusionEscisionData: [...state.fusionEscisionData,...newFusion],
    }));
  }


}
