import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface DatosSolicitudState {
    /**
     * Genericos relacionados con la solicitud.
     */
    genericos: string;
    folioTramite:string;
    tipoSolicitud:string;
    regimen:string;
    clasificacionRegimen:string;
    periodoVigencia:string;
    unidadMedida:string;
    fraccionArancelaria:string;
    cantidadAutorizada:string;
    valorAutorizado:string;
    nico:string;
    descripcionNico:string;
    acotacion:string;
    permisoDesde:string;
    permisoHasty:string;
    motivoRenuncia:string
}

export function createInitialState(): DatosSolicitudState {
  return {
    genericos: '', 
    folioTramite:'',
    tipoSolicitud:'',
    regimen:'',
    clasificacionRegimen:'',
    periodoVigencia:'',
    unidadMedida:'',
    fraccionArancelaria:'',
    cantidadAutorizada:'',
    valorAutorizado:'',
    nico:'',
    descripcionNico:'',
    acotacion:'',
    permisoDesde:'',
    permisoHasty:'',
    motivoRenuncia:''
};
}

@Injectable({
  providedIn: 'root'
})

@StoreConfig({ name: 'tramite140218', resettable: true })


export class Tramite140218Store extends Store<DatosSolicitudState> {
  /**
   * Constructor de la clase que inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado con el RFC.
   * @param rfc El RFC a establecer.
   */
  public setGenericos(genericos: string): void {
    this.update((state) => ({
      ...state,
      genericos,
    }));
  }

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

