import { DatosSolicitud } from "../../tramites/130401/models/modificacion-descripcion.model";
import { Injectable } from "@angular/core";
import { Store } from "@datorama/akita";
import { StoreConfig } from "@datorama/akita";


export interface Tramite130401State {
  pasoActivo: number;
  pestanaActiva: number;
  folioPermiso: string
  datosSolicitud: DatosSolicitud
}
export function createInitialState(): Tramite130401State {
  return {
    pasoActivo: 1,
    pestanaActiva: 2,
    folioPermiso: '',
    datosSolicitud: {
      numeroFolioTramiteOriginal: '',
      solicitud: '',
      regimen: '',
      clasificacionRegimen: '',
      condicionMercancia: '',
      mercanciaDescripcion: '',
      fraccionArancelaria: '',
      unidadMedidaComercial: '',
      unidadesAutorizadas: '',
      importeFacturaAutorizadoUSD: '',
      usoEspecifico: '',
      justificacionImportacionExportacion: '',
      observaciones: '',
      representacionFederal: ''
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130401', resettable: true })
export class Tramite130401Store extends Store<Tramite130401State> {

  constructor() {
    super(createInitialState());
  }
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }
  public setFolioPermiso(folioPermiso: string): void {
    this.update((state) => ({
      ...state,
      folioPermiso,
    }));
  }
  public setSolicitud(datosSolicitud: DatosSolicitud): void {
    this.update((state) => ({
      ...state,
      datosSolicitud,
    }));
  }

}