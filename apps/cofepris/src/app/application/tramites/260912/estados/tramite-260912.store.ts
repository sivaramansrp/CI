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
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
setTramite260912State(valores: Partial<Tramites260912State>): void {
  this.update((state => ({
    ...state,
    ...valores,
  })));
}

}