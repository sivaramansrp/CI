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

  public setTipoSolicitud(tipoSolicitud: string): void {
    this.update((state) => ({
      ...state,
      tipoSolicitud,
    }));
  }

  public setRegimen(regimen: string): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }
  
  public setClasificacionRegimen(clasificacionRegimen: string): void {
    this.update((state) => ({
      ...state,
      clasificacionRegimen,
    }));
  }

  public setPeriodoVigencia(periodoVigencia: string): void {
    this.update((state) => ({
      ...state,
      periodoVigencia,
    }));
  }

  public setUnidadMedida(unidadMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setCantidadAutorizada(cantidadAutorizada: string): void {
    this.update((state) => ({
      ...state,
      cantidadAutorizada,
    }));
  }

  public setValorAutorizado(valorAutorizado: string): void {
    this.update((state) => ({
      ...state,
      valorAutorizado,
    }));
  }

  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  public setDescripcionNico(descripcionNico: string): void {
    this.update((state) => ({
      ...state,
      descripcionNico,
    }));
  }

  public setAcotacion(acotacion: string): void {
    this.update((state) => ({
      ...state,
      acotacion,
    }));
  }

  public setPermisoDesde(permisoDesde: string): void {
    this.update((state) => ({
      ...state,
      permisoDesde,
    }));
  }

  public setPermisoHasty(permisoHasty: string): void {
    this.update((state) => ({
      ...state,
      permisoHasty,
    }));
  }

  public setMotivoRenuncia(motivoRenuncia: string): void {
    this.update((state) => ({
      ...state,
      motivoRenuncia,
    }));
  }

}

