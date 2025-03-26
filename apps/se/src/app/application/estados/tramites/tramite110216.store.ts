
import { AgregarDatosProductorFormulario } from '../../tramites/110216/models/certificado-origen.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Tramite110216State {
  observaciones: string;
  idioma: Catalogo | null;
  entidadFederativa: Catalogo | null;
  representacionFederal: Catalogo | null;
  datosConfidencialesProductor: boolean;
  productorMismoExportador: boolean
  agregarDatosProductorFormulario: AgregarDatosProductorFormulario
}

export function createInitialState(): Tramite110216State {
  return {
    observaciones: '',
    idioma: null,
    entidadFederativa: null,
    representacionFederal: null,
    datosConfidencialesProductor: true,
    productorMismoExportador: true,
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: ''
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite5701', resettable: true })
export class Tramite110216Store extends Store<Tramite110216State> {
  constructor() {
    super(createInitialState());
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  public setIdioma(idioma: Catalogo): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  public setEntidadFederativa(entidadFederativa: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setRepresentacionFederal(representacionFederal: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }
  public setDatosConfidencialesProductor(datosConfidencialesProductor: boolean): void {
    this.update((state) => ({
      ...state,
      datosConfidencialesProductor,
    }));
  }
  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({
      ...state,
      productorMismoExportador,
    }));
  }
  public setAgregarDatosProductorFax(fax: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, fax },
    }));
  }
  public setAgregarDatosProductorNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, numeroRegistroFiscal },
    }));
  }

}
