import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Catalogo {
  id: number;
  descripcion: string;
}

/**
 * Creacion del estado inicial para la interfaz de tramite 10302
 * @returns Solicitud10302
 */
export interface Solicitud10302State {
  organismoPublico: string;
  aduana: Catalogo[] | null;
  usoEspecifico: string;
  showTabla: boolean;
  tipoDeMercancia: string;
  unidadMedida: string;
  condicionMercancia: string;
  ano: Catalogo[] | null;
  cantidad: string;
  marca: string;
  modelo: string;
  serie: string;
  pais: Catalogo[] | null;
  rfc: string;
  numeroProgramaImmex: string;
  razonSocial: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  correoElectronico: string;
  telefono: string;
  correoElectronicoOpcional: string;
  telefonoOpcional: string;
  codigoPostal: string;
  estado: string;
  colonia: string;
  datosDelMercancia: [];
}

export function createInitialState(): Solicitud10302State {
  return {
    organismoPublico: '',
    aduana: null,
    usoEspecifico: '',
    showTabla: true,
    tipoDeMercancia: '',
    unidadMedida: '',
    condicionMercancia: '',
    ano: null,
    cantidad: '',
    marca: '',
    modelo: '',
    serie: '',
    pais: null,
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    telefono: '',
    correoElectronico: '',
    correoElectronicoOpcional: '',
    telefonoOpcional: '',
    rfc: '',
    numeroProgramaImmex: '',
    razonSocial: '',
    codigoPostal: '',
    estado: '',
    colonia: '',
    datosDelMercancia: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite10302', resettable: true })
export class Tramite10302Store extends Store<Solicitud10302State> {
  constructor() {
    super(createInitialState());
  }

  public setOrganismoPublico(organismoPublico: string): void {
    this.update((state) => ({
      ...state,
      organismoPublico,
    }));
  }

  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setTipoDeMercancia(tipoDeMercancia: string): void {
    this.update((state) => ({
      ...state,
      tipoDeMercancia,
    }));
  }

  public setUnidadMedida(unidadMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  public setCondicionMercancia(condicionMercancia: string): void {
    this.update((state) => ({
      ...state,
      condicionMercancia,
    }));
  }

  public setAno(ano: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      ano,
    }));
  }

  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }

  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  public setModelo(modelo: string): void {
    this.update((state) => ({
      ...state,
      modelo,
    }));
  }

  public setSerie(serie: string): void {
    this.update((state) => ({
      ...state,
      serie,
    }));
  }

  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setUsoEspecifico(usoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      usoEspecifico,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  public setNumeroProgramaImmex(numeroProgramaImmex: string): void {
    this.update((state) => ({
      ...state,
      numeroProgramaImmex,
    }));
  }

  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public setCorreoElectronicoOpcional(correoElectronicoOpcional: string): void {
    this.update((state) => ({
      ...state,
      correoElectronicoOpcional,
    }));
  }

  public setTelefonoOpcional(telefonoOpcional: string): void {
    this.update((state) => ({
      ...state,
      telefonoOpcional,
    }));
  }

  /**
   * Establece los datos del contenedor.
   * @param datosDelMercancia Datos del contenedor.
   */
  public setDelMercancia(datosDelMercancia: []): void {
    this.update((state) => ({
      ...state,
      datosDelMercancia,
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
