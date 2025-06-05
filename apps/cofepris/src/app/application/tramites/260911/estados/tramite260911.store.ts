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
  /** Licencia sanitaria */
  licenciaSanitaria: string;
  /** Nombre del representante legal */
  nombre: string;
  /** Apellido paterno del representante legal */
  apellidoPaterno: string;
  /** Apellido materno del representante legal */
  apellidoMaterno: string;
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
    licenciaSanitaria: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
  };
}

/**
 * Servicio que gestiona el estado del trámite 260911.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite260911', resettable: true })
export class Tramite260911Store extends Store<Tramite260911State> {
  /**
   * Constructor del servicio de estado.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del trámite 630303 con los valores proporcionados.
   * 
   * @param valores - Valores parciales para actualizar el estado.
   */
  setTramite260911State(valores: Partial<Tramite260911State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }

}