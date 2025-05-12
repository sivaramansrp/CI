import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa el estado de Tramites260912.
 */
export interface Tramites260912State {
  /** Clave de referencia del trámite */
  claveDeReferencia: string;
  /** Cadena de pago de la dependencia */
  cadenaPagoDependencia: string;
  /** Clave del trámite */
  clave: string;
  /** Llave de pago */
  llaveDePago: string;
  /** Fecha de pago */
  fecPago: string;
  /** Importe del pago */
  impPago: string;
  /** Botón de radio seleccionado */
  btonDeRadio: string;
  /** Texto de justificación */
  justificacion: string;
  /** RFC del delegado */
  rfcDel: string;
  /** Denominación de la entidad */
  denominacion: string;
  /** Dirección de correo electrónico */
  correo: string;
  /** Código postal */
  codigoPostal: string;
  /** Catálogo del estado */
  estado: Catalogo | null;
  /** Municipio o alcaldía */
  municipioOAlcaldia: string;
  /** Localidad */
  localidad: string;
  /** Colonias */
  colonias: string;
  /** Calle */
  calle: string;
  /** Lada telefónica */
  lada: string;
  /** Teléfono */
  telefono: string;
  /** Checkbox de aviso */
  avisoCheckbox: string;
  /** Catálogo de régimen */
  regimen: Catalogo | null;
  /** Catálogo de aduanas de entrada */
  aduanasEntradas: Catalogo | null;
  /** Checkbox de AIFA */
  aifaCheckbox: string;
  /** Manifiestos */
  manifests: string;
  /** Acuerdo público */
  acuerdoPublico: string;
  /** RFC */
  rfc: string;
}

/**
 * Crea el estado inicial para Tramites260912.
 * @returns El estado inicial.
 */
export function createInitialState(): Tramites260912State {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    btonDeRadio: '',
    justificacion: '',
    rfcDel: '',
    denominacion: '',
    correo: '',
    codigoPostal: '',
    estado: null,
    municipioOAlcaldia: '',
    localidad: '',
    colonias: '',
    calle: '',
    lada: '',
    telefono: '',
    avisoCheckbox: '',
    regimen: null,
    aduanasEntradas: null,
    aifaCheckbox: '',
    manifests: '',
    acuerdoPublico: '',
    rfc: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites260912', resettable: true })
export class Tramite260912Store extends Store<Tramites260912State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la clave de referencia del trámite.
   * @param claveDeReferencia La nueva clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Actualiza la cadena de pago de la dependencia.
   * @param cadenaPagoDependencia La nueva cadena de pago.
   */
  public setCadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  /**
   * Actualiza la clave del trámite.
   * @param clave La nueva clave.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  /**
   * Actualiza la llave de pago.
   * @param llaveDePago La nueva llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Actualiza la fecha de pago.
   * @param fecPago La nueva fecha de pago.
   */
  public setFecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  /**
   * Actualiza el importe del pago.
   * @param impPago El nuevo importe.
   */
  public setImpPago(impPago: string): void {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }

  /**
   * Actualiza el valor del botón de radio.
   * @param btonDeRadio El nuevo valor del botón de radio.
   */
  public setBtonDeRadio(btonDeRadio: string): void {
    this.update((state) => ({
      ...state,
      btonDeRadio,
    }));
  }

  /**
   * Actualiza el texto de justificación.
   * @param justificacion La nueva justificación.
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  /**
   * Actualiza el RFC del delegado.
   * @param rfcDel El nuevo RFC.
   */
  public setRfcDel(rfcDel: string): void {
    this.update((state) => ({
      ...state,
      rfcDel,
    }));
  }

  /**
   * Actualiza la denominación de la entidad.
   * @param denominacion La nueva denominación.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Actualiza el correo electrónico.
   * @param correo El nuevo correo.
   */
  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  /**
   * Actualiza el código postal.
   * @param codigoPostal El nuevo código postal.
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Actualiza el catálogo del estado.
   * @param estado El nuevo estado.
   */
  public setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Actualiza el municipio o alcaldía.
   * @param municipioOAlcaldia El nuevo municipio o alcaldía.
   */
  public setMunicipioOAlcaldia(municipioOAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioOAlcaldia,
    }));
  }

  /**
   * Actualiza la localidad.
   * @param localidad La nueva localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Actualiza las colonias.
   * @param colonias Las nuevas colonias.
   */
  public setColonias(colonias: string): void {
    this.update((state) => ({
      ...state,
      colonias,
    }));
  }

  /**
   * Actualiza la calle.
   * @param calle La nueva calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Actualiza la lada telefónica.
   * @param lada La nueva lada.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Actualiza el teléfono.
   * @param telefono El nuevo teléfono.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Actualiza el checkbox de aviso.
   * @param avisoCheckbox El nuevo valor del checkbox.
   */
  public setAvisoCheckbox(avisoCheckbox: string): void {
    this.update((state) => ({
      ...state,
      avisoCheckbox,
    }));
  }

  /**
   * Actualiza el catálogo de régimen.
   * @param regimen El nuevo régimen.
   */
  public setRegimen(regimen: Catalogo): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Actualiza el catálogo de aduanas de entrada.
   * @param aduanasEntradas Las nuevas aduanas.
   */
  public setAduanasEntradas(aduanasEntradas: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanasEntradas,
    }));
  }

  /**
   * Actualiza el checkbox de AIFA.
   * @param aifaCheckbox El nuevo valor del checkbox.
   */
  public setAifaCheckbox(aifaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      aifaCheckbox,
    }));
  }

  /**
   * Actualiza los manifiestos.
   * @param manifests Los nuevos manifiestos.
   */
  public setManifests(manifests: string): void {
    this.update((state) => ({
      ...state,
      manifests,
    }));
  }

  /**
   * Actualiza el acuerdo público.
   * @param acuerdoPublico El nuevo acuerdo público.
   */
  public setAcuerdoPublico(acuerdoPublico: string): void {
    this.update((state) => ({
      ...state,
      acuerdoPublico,
    }));
  }

  /**
   * Actualiza el RFC.
   * @param rfc El nuevo RFC.
   */
  public setRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }
}