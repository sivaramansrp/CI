import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DatosSolicitudState {
  folioTramite: string; // Número de folio del trámite
  tipoSolicitud: string; // Tipo de solicitud
  regimen: string; // Régimen asociado
  clasificacionRegimen: string; // Clasificación del régimen
  periodoVigencia: string; // Periodo de vigencia
  unidadMedida: string; // Unidad de medida
  fraccionArancelaria: string; // Fracción arancelaria
  cantidadAutorizada: string; // Cantidad autorizada
  valorAutorizado: string; // Valor autorizado
  nico: string; // Número de Identificación Comercial (NICO)
  descripcionNico: string; // Descripción del NICO
  acotacion: string; // Acotación
  permisoDesde: string; // Fecha de inicio del permiso
  permisoHasty: string; // Fecha de fin del permiso
  motivoRenuncia: string; // Motivo de renuncia
}

export function createInitialState(): DatosSolicitudState {
  return {
    folioTramite: '', // Número de folio del trámite
    tipoSolicitud: '', // Tipo de solicitud
    regimen: '', // Régimen asociado
    clasificacionRegimen: '', // Clasificación del régimen
    periodoVigencia: '', // Periodo de vigencia
    unidadMedida: '', // Unidad de medida
    fraccionArancelaria: '', // Fracción arancelaria
    cantidadAutorizada: '', // Cantidad autorizada
    valorAutorizado: '', // Valor autorizado
    nico: '', // Número de Identificación Comercial (NICO)
    descripcionNico: '', // Descripción del NICO
    acotacion: '', // Acotación
    permisoDesde: '', // Fecha de inicio del permiso
    permisoHasty: '', // Fecha de fin del permiso
    motivoRenuncia: '' // Motivo de renuncia
  };
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({ name: 'tramite140218', resettable: true })


export class Tramite140218Store extends Store<DatosSolicitudState> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el número de folio del trámite.
   * @param folioTramite - Número de folio del trámite.
   */
  public setFolioTramite(folioTramite: string): void {
    this.update((state) => ({
      ...state,
      folioTramite,
    }));
  }

  /**
   * Establece el tipo de solicitud en el estado de la tienda.
   *
   * @param tipoSolicitud - El nuevo tipo de solicitud que se va a asignar al estado.
   */
  public setTipoSolicitud(tipoSolicitud: string): void {
    this.update((state) => ({
      ...state,
      tipoSolicitud,
    }));
  }

  /**
   * @comdoc
   * Establece el valor del régimen en el estado de la tienda.
   *
   * @param regimen - El nuevo valor de régimen que se asignará al estado.
   */
  public setRegimen(regimen: string): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }
  
  /**
   * Establece la clasificación del régimen en el estado de la tienda.
   *
   * @param clasificacionRegimen - La nueva clasificación del régimen que se asignará al estado.
   */
  public setClasificacionRegimen(clasificacionRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasificacionRegimen,
    }));
  }

  /**
   * Establece el valor del periodo de vigencia en el estado.
   *
   * @param periodoVigencia - El nuevo periodo de vigencia que se asignará al estado.
   */
  public setPeriodoVigencia(periodoVigencia: string): void {
    this.update((state) => ({
      ...state,
      periodoVigencia,
    }));
  }

  /**
   * Establece la unidad de medida en el estado de la tienda.
   *
   * @param unidadMedida - La nueva unidad de medida que se asignará al estado.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  /**
   * Establece la fracción arancelaria en el estado de la tienda.
   *
   * @param fraccionArancelaria - La nueva fracción arancelaria que se asignará al estado.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Establece la cantidad autorizada en el estado de la tienda.
   *
   * @param cantidadAutorizada - La nueva cantidad autorizada que se asignará al estado.
   */
  public setCantidadAutorizada(cantidadAutorizada: string): void {
    this.update((state) => ({
      ...state,
      cantidadAutorizada,
    }));
  }

  /**
   * Establece el valor autorizado en el estado de la tienda.
   *
   * @param valorAutorizado - El nuevo valor autorizado que se asignará al estado.
   */
  public setValorAutorizado(valorAutorizado: string): void {
    this.update((state) => ({
      ...state,
      valorAutorizado,
    }));
  }

  /**
   * Establece el NICO (Número de Identificación Comercial) en el estado de la tienda.
   *
   * @param nico - El nuevo NICO que se asignará al estado.
   */
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Establece la descripción del NICO en el estado de la tienda.
   *
   * @param descripcionNico - La nueva descripción del NICO que se asignará al estado.
   */
  public setDescripcionNico(descripcionNico: string): void {
    this.update((state) => ({
      ...state,
      descripcionNico,
    }));
  }

  /**
   * Establece la acotación en el estado de la tienda.
   *
   * @param acotacion - La nueva acotación que se asignará al estado.
   */
  public setAcotacion(acotacion: string): void {
    this.update((state) => ({
      ...state,
      acotacion,
    }));
  }

  /**
   * Establece la fecha de inicio del permiso en el estado de la tienda.
   *
   * @param permisoDesde - La nueva fecha de inicio del permiso que se asignará al estado.
   */
  public setPermisoDesde(permisoDesde: string): void {
    this.update((state) => ({
      ...state,
      permisoDesde,
    }));
  }

  /**
   * Establece la fecha de fin del permiso en el estado de la tienda.
   *
   * @param permisoHasty - La nueva fecha de fin del permiso que se asignará al estado.
   */
  public setPermisoHasty(permisoHasty: string): void {
    this.update((state) => ({
      ...state,
      permisoHasty,
    }));
  }

  /**
   * Establece el motivo de renuncia en el estado de la tienda.
   *
   * @param motivoRenuncia - El nuevo motivo de renuncia que se asignará al estado.
   */
  public setMotivoRenuncia(motivoRenuncia: string): void {
    this.update((state) => ({
      ...state,
      motivoRenuncia,
    }));
  }

}

