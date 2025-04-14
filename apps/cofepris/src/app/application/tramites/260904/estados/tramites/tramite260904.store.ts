/**
 * @fileoverview Este archivo define el estado y las operaciones relacionadas con el trámite 260904.
 * Proporciona un store para gestionar el estado de los datos del trámite, incluyendo métodos
 * para actualizar propiedades específicas.
 */
import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * @interface Tramite260904State
 * @description Define la estructura del estado para el trámite 260904.
 */
export interface Tramite260904State {
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
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 260904.
 * @returns {Tramite260904State} Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite260904State {
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
 * @class Tramite260904Store
 * @description Clase que extiende la funcionalidad de Akita Store para gestionar el estado
 * del trámite 260904. Proporciona métodos para actualizar propiedades específicas del estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120402', resettable: true })
export class Tramite260904Store extends Store<Tramite260904State> {
  /**
   * @constructor
   * @description Inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setBtonDeRadio
   * @description Actualiza el valor del botón de radio.
   * @param {string} btonDeRadio - Nuevo valor del botón de radio.
   */
  public setBtonDeRadio(btonDeRadio: string): void {
    this.update((state) => ({
      ...state,
      btonDeRadio,
    }));
  }

  /**
   * @method setJustificacion
   * @description Actualiza la justificación.
   * @param {string} justificacion - Nueva justificación.
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }

  /**
   * @method setRfcDel
   * @description Actualiza el RFC del solicitante.
   * @param {string} rfcDel - Nuevo RFC del solicitante.
   */
  public setRfcDel(rfcDel: string): void {
    this.update((state) => ({
      ...state,
      rfcDel,
    }));
  }

  /**
   * @method setDenominacion
   * @description Actualiza la denominación del solicitante.
   * @param {string} denominacion - Nueva denominación.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * @method setCorreo
   * @description Actualiza el correo electrónico.
   * @param {string} correo - Nuevo correo electrónico.
   */
  public setCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      correo,
    }));
  }

  /**
   * @method setCodigoPostal
   * @description Actualiza el código postal.
   * @param {string} codigoPostal - Nuevo código postal.
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * @method setEstado
   * @description Actualiza el estado seleccionado.
   * @param {Catalogo} estado - Nuevo estado seleccionado.
   */
  public setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * @method setMunicipioOAlcaldia
   * @description Actualiza el municipio o alcaldía.
   * @param {string} municipioOAlcaldia - Nuevo municipio o alcaldía.
   */
  public setMunicipioOAlcaldia(municipioOAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioOAlcaldia,
    }));
  }

  /**
   * @method setLocalidad
   * @description Actualiza el valor de la propiedad `localidad` en el estado.
   * @param {string} localidad - Nueva localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * @method setColonias
   * @description Actualiza el valor de la propiedad `colonias` en el estado.
   * @param {string} colonias - Nueva colonia.
   */
  public setColonias(colonias: string): void {
    this.update((state) => ({
      ...state,
      colonias,
    }));
  }

  /**
   * @method setCalle
   * @description Actualiza el valor de la propiedad `calle` en el estado.
   * @param {string} calle - Nueva calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * @method setLada
   * @description Actualiza el valor de la propiedad `lada` en el estado.
   * @param {string} lada - Nueva lada telefónica.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * @method setTelefono
   * @description Actualiza el valor de la propiedad `telefono` en el estado.
   * @param {string} telefono - Nuevo número de teléfono.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * @method setAvisoCheckbox
   * @description Actualiza el valor de la propiedad `avisoCheckbox` en el estado.
   * @param {string} avisoCheckbox - Nuevo valor del checkbox de aviso.
   */
  public setAvisoCheckbox(avisoCheckbox: string): void {
    this.update((state) => ({
      ...state,
      avisoCheckbox,
    }));
  }

  /**
   * @method setRegimen
   * @description Actualiza el valor de la propiedad `regimen` en el estado.
   * @param {Catalogo} regimen - Nuevo régimen seleccionado.
   */
  public setRegimen(regimen: Catalogo): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * @method setAduanasEntradas
   * @description Actualiza el valor de la propiedad `aduanasEntradas` en el estado.
   * @param {Catalogo} aduanasEntradas - Nuevas aduanas de entrada seleccionadas.
   */
  public setAduanasEntradas(aduanasEntradas: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanasEntradas,
    }));
  }

  /**
   * @method setAifaCheckbox
   * @description Actualiza el valor de la propiedad `aifaCheckbox` en el estado.
   * @param {string} aifaCheckbox - Nuevo valor del checkbox relacionado con AIFA.
   */
  public setAifaCheckbox(aifaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      aifaCheckbox,
    }));
  }

  /**
   * @method setManifests
   * @description Actualiza el valor de la propiedad `manifests` en el estado.
   * @param {string} manifests - Nueva información de manifiestos.
   */
  public setManifests(manifests: string): void {
    this.update((state) => ({
      ...state,
      manifests,
    }));
  }

  /**
   * @method setAcuerdoPublico
   * @description Actualiza el valor de la propiedad `acuerdoPublico` en el estado.
   * @param {string} acuerdoPublico - Nueva información del acuerdo público.
   */
  public setAcuerdoPublico(acuerdoPublico: string): void {
    this.update((state) => ({
      ...state,
      acuerdoPublico,
    }));
  }

  /**
   * @method setRFC
   * @description Actualiza el valor de la propiedad `rfc` en el estado.
   * @param {string} rfc - Nuevo RFC del usuario.
   */
  public setRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * @method setClaveDeReferencia
   * @description Actualiza el valor de la propiedad `claveDeReferencia` en el estado.
   * @param {string} claveDeReferencia - Nueva clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  /**
   * @method setCadenaPagoDependencia
   * @description Actualiza el valor de la propiedad `cadenaPagoDependencia` en el estado.
   * @param {string} cadenaPagoDependencia - Nueva cadena de pago de la dependencia.
   */
  public setCadenaPagoDependencia(cadenaPagoDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaPagoDependencia,
    }));
  }

  /**
   * @method setClave
   * @description Actualiza el valor de la propiedad `clave` en el estado.
   * @param {string} clave - Nueva clave del trámite.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  /**
   * @method setLlaveDePago
   * @description Actualiza la llave de pago.
   * @param {string} llaveDePago - Nueva llave de pago.
   */
  public setLlaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }

  /**
   * @method setFecPago
   * @description Actualiza la fecha de pago.
   * @param {string} fecPago - Nueva fecha de pago.
   */
  public setFecPago(fecPago: string): void {
    this.update((state) => ({
      ...state,
      fecPago,
    }));
  }

  /**
   * @method setImpPago
   * @description Actualiza el importe del pago.
   * @param {string} impPago - Nuevo importe del pago.
   */
  public setImpPago(impPago: string): void {
    this.update((state) => ({
      ...state,
      impPago,
    }));
  }
}
