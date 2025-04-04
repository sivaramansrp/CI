import { DatosSolicitante, DomicilioFormulario, MercanciaFormulario } from '../../tramites/32503/models/aviso-traslado.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite32503State {

  pasoActivo: number;
  pestanaActiva: number;
  datosSolicitante: DatosSolicitante
  mercanciaFormulario: MercanciaFormulario
  domicilioFormulario: DomicilioFormulario

}

export function createInitialState(): Tramite32503State {
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
    mercanciaFormulario: {
      claveFraccionArancelaria: '',
      nico: '',
      cantidad: '',
      claveUnidadMedida: '',
      valorUSD: '',
      descripcionMercancia: '',
      descripcionProceso: '',
      numPedimentoExportacion: '',
      numPedimentoImportacion: '',
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
    }
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32503', resettable: true })
export class Tramite32503Store extends Store<Tramite32503State> {

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

  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante
    }));
  }

  public setFraccionArancelaria(claveFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, claveFraccionArancelaria },
    }));
  }
  public setMercanciaFormularioNico(nico: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, nico },
    }));
  }
  public setMercanciaFormularioCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, cantidad },
    }));
  }
  public setMercanciaFormularioUnidadMedida(claveUnidadMedida: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, claveUnidadMedida },
    }));
  }
  public setMercanciaFormularioValor(valorUSD: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, valorUSD },
    }));
  }
  public setMercanciaFormularioDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, descripcionMercancia },
    }));
  }
  public setMercanciaFormularioDescripcionProceso(descripcionProceso: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, descripcionProceso },
    }));
  }
  public setMercanciaFormularioPedimentoExportacion(numPedimentoExportacion: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, numPedimentoExportacion },
    }));
  }
  public setMercanciaFormularioPedimentoImportacion(numPedimentoImportacion: string): void {
    this.update((state) => ({
      ...state,
      mercanciaFormulario: { ...state.mercanciaFormulario, numPedimentoImportacion },
    }));
  }
  public setDomicilioFormularioNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, nombreComercial },
    }));
  }
  public setDomicilioFormularioEntidadFederativa(claveEntidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveEntidadFederativa },
    }));
  }
  public setDomicilioFormularioDelegacionMunicipio(claveDelegacionMunicipio: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveDelegacionMunicipio },
    }));
  }
  public setDomicilioFormularioColonia(claveColonia: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, claveColonia },
    }));
  }
  public setDomicilioFormularioCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, calle },
    }));
  }
  public setDomicilioFormularioNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, numeroExterior },
    }));
  }
  public setDomicilioFormularioNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, numeroInterior },
    }));
  }
  public setDomicilioFormularioCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, codigoPostal },
    }));
  }
  public setDomicilioFormularioRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      domicilioFormulario: { ...state.domicilioFormulario, rfc },
    }));
  }

}
