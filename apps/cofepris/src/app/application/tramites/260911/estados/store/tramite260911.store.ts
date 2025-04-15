import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';


/**
 * Interfaz que define el estado inicial del trámite 260911.
 */
export interface Tramite260911State {
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
}

/**
 * Función que crea el estado inicial del trámite 260911.
 * @returns El estado inicial del trámite.
 */
export function createInitialState(): Tramite260911State {
  return {
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
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    clave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
  };
}

/**
 * Servicio que gestiona el estado del trámite 260911.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120402', resettable: true })
export class Tramite260911Store extends Store<Tramite260911State> {
  /**
   * Constructor del servicio de estado.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado de `btonDeRadio`.
   * @param btonDeRadio Nuevo valor para `btonDeRadio`.
   */
  public setBtonDeRadio(btonDeRadio: string): void {
    this.update((state) => ({
      ...state,
      btonDeRadio,
    }));
  }

  /**
   * Actualiza el estado de `justificacion`.
   * @param justificacion Nuevo valor para `justificacion`.
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  /**
   * Actualiza el estado de `rfcDel`.
   * @param rfcDel Nuevo valor para `rfcDel`.
   */
  public setRfcDel(rfcDel: string): void {
    this.update((state) => ({
      ...state,
      rfcDel,
    }));
  }

  /**
   * Actualiza el estado de `denominacion`.
   * @param denominacion Nuevo valor para `denominacion`.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Actualiza el estado de `correo`.
   * @param correo Nuevo valor para `correo`.
   */
  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  /**
   * Actualiza el estado de `codigoPostal`.
   * @param códigoPostal Nuevo valor para `codigoPostal`.
   */
  public setCodigoPostal(códigoPostal: string): void {
    this.update((state) => ({
      ...state,
      códigoPostal,
    }));
  }

  /**
   * Actualiza el estado de `estado`.
   * @param estado Nuevo valor para `estado`.
   */
  public setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Actualiza el estado de `municipioOAlcaldia`.
   * @param municipioOAlcaldia Nuevo valor para `municipioOAlcaldia`.
   */
  public setMunicipioOAlcaldia(municipioOAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioOAlcaldia,
    }));
  }

  /**
   * Actualiza el estado de `localidad`.
   * @param localidad Nuevo valor para `localidad`.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Actualiza el estado de `colonias`.
   * @param colonias Nuevo valor para `colonias`.
   */
  public setColonias(colonias: string): void {
    this.update((state) => ({
      ...state,
      colonias,
    }));
  }

  /**
   * Actualiza el estado de `calle`.
   * @param calle Nuevo valor para `calle`.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Actualiza el estado de `lada`.
   * @param lada Nuevo valor para `lada`.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Actualiza el estado de `telefono`.
   * @param telefono Nuevo valor para `telefono`.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Actualiza el estado de `avisoCheckbox`.
   * @param avisoCheckbox Nuevo valor para `avisoCheckbox`.
   */
  public setAvisoCheckbox(avisoCheckbox: string): void {
    this.update((state) => ({
      ...state,
      avisoCheckbox,
    }));
  }

  /**
   * Actualiza el estado de `regimen`.
   * @param regimen Nuevo valor para `regimen`.
   */
  public setRegimen(regimen: Catalogo): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Actualiza el estado de `aduanasEntradas`.
   * @param aduanasEntradas Nuevo valor para `aduanasEntradas`.
   */
  public setAduanasEntradas(aduanasEntradas: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanasEntradas,
    }));
  }

  /**
   * Actualiza el estado de `aifaCheckbox`.
   * @param aifaCheckbox Nuevo valor para `aifaCheckbox`.
   */
  public setAifaCheckbox(aifaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      aifaCheckbox,
    }));
  }

  /**
   * Actualiza el estado de `manifests`.
   * @param manifests Nuevo valor para `manifests`.
   */
  public setManifests(manifests: string): void {
    this.update((state) => ({
      ...state,
      manifests,
    }));
  }

  /**
   * Actualiza el estado de `acuerdoPublico`.
   * @param acuerdoPublico Nuevo valor para `acuerdoPublico`.
   */
  public setAcuerdoPublico(acuerdoPublico: string): void {
    this.update((state) => ({
      ...state,
      acuerdoPublico,
    }));
  }

  /**
   * Actualiza el estado de `rfc`.
   * @param rfc Nuevo valor para `rfc`.
   */
  public setRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Actualiza el estado de `claveDeReferencia`.
   * @param claveDeReferencia Nuevo valor para `claveDeReferencia`.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * Actualiza el estado de `cadenaPagoDependencia`.
   * @param cadenaPagoDependencia Nuevo valor para `cadenaPagoDependencia`.
   */
  public setCadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  /**
   * Actualiza el estado de `clave`.
   * @param clave Nuevo valor para `clave`.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  /**
   * Actualiza el estado de `llaveDePago`.
   * @param llaveDePago Nuevo valor para `llaveDePago`.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * Actualiza el estado de `fecPago`.
   * @param fecPago Nuevo valor para `fecPago`.
   */
  public setFecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  /**
   * Actualiza el estado de `impPago`.
   * @param impPago Nuevo valor para `impPago`.
   */
  public setImpPago(impPago: string): void {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }
}