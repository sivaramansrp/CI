import { Store, StoreConfig } from '@datorama/akita';
import type { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado completo para el trámite 260912.
 * Contiene todos los campos necesarios para manejar la información
 * del formulario de trámite, incluyendo datos de pago, información
 * personal, direcciones y configuraciones específicas.
 */
export interface Tramites260912State {
  /** Clave única de referencia para identificar el trámite */
  claveDeReferencia: string;
  
  /** Cadena de pago específica de la dependencia gubernamental */
  cadenaPagoDependencia: string;
  
  /** Clave general del trámite o proceso */
  clave: string;
  
  /** Llave específica utilizada para el proceso de pago */
  llaveDePago: string;
  
  /** Fecha en que se realizó el pago (formato string) */
  fecPago: string;
  
  /** Importe o monto del pago realizado */
  impPago: string;
  
  /** Valor del botón de radio seleccionado en el formulario */
  btonDeRadio: string;
  
  /** Texto de justificación o motivo del trámite */
  justificacion: string;
  
  /** RFC (Registro Federal de Contribuyentes) del solicitante */
  rfcDel: string;
  
  /** Denominación o razón social de la empresa o persona */
  denominacion: string;
  
  /** Dirección de correo electrónico del solicitante */
  correo: string;
  
  /** Código postal de la dirección del solicitante */
  codigoPostal: string;
  
  /** Objeto catálogo que representa el estado o entidad federativa */
  estado: Catalogo | null;
  
  /** Nombre del municipio o alcaldía donde reside el solicitante */
  municipioOAlcaldia: string;
  
  /** Localidad específica dentro del municipio */
  localidad: string;
  
  /** Nombre de la colonia o barrio */
  colonias: string;
  
  /** Nombre y número de la calle */
  calle: string;
  
  /** Código de área telefónica (LADA) */
  lada: string;
  
  /** Número telefónico de contacto */
  telefono: string;
  
  /** Estado del checkbox de aviso (marcado/desmarcado) */
  avisoCheckbox: string;
  
  /** Objeto catálogo que representa el régimen fiscal o legal */
  regimen: Catalogo | null;
  
  /** Objeto catálogo para las aduanas de entrada seleccionadas */
  aduanasEntradas: Catalogo | null;
  
  /** Estado del checkbox relacionado con AIFA (Aeropuerto Internacional Felipe Ángeles) */
  aifaCheckbox: string;
  
  /** Información o datos de los manifiestos */
  manifests: string;
  
  /** Datos del acuerdo público relacionado con el trámite */
  acuerdoPublico: string;
  
  /** RFC adicional o secundario */
  rfc: string;
  
  /** Número de licencia sanitaria si aplica */
  licenciaSanitaria: string;
  
  /** Nombre(s) de la persona física solicitante */
  nombre: string;
  
  /** Apellido paterno del solicitante */
  apellidoPaterno: string;
  
  /** Apellido materno del solicitante */
  apellidoMaterno: string;
}

/**
 * Función que crea y retorna el estado inicial para el trámite 260912.
 * Inicializa todos los campos con valores por defecto (cadenas vacías o null
 * para objetos complejos como Catalogo).
 * 
 * @returns {Tramites260912State} Objeto con el estado inicial del trámite
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
    licenciaSanitaria: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
  };
}

/**
 * Store de Akita para manejar el estado del trámite 260912.
 * 
 * Esta clase extiende el Store de Akita y proporciona funcionalidad
 * para manejar el estado global del formulario de trámite 260912.
 * Incluye configuración para hacer el store reiniciable y métodos
 * para actualizar el estado de manera reactiva.
 * 
 * @Injectable Decorador que permite la inyección de dependencias
 * @StoreConfig Configuración del store con nombre único y capacidad de reinicio
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites260912', resettable: true })
export class Tramite260912Store extends Store<Tramites260912State> {
  
  /**
   * Constructor del store.
   * Inicializa el store padre con el estado inicial creado
   * por la función createInitialState().
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Método que actualiza parcialmente el estado del trámite 260912.
   * 
   * Permite actualizar uno o varios campos del estado sin afectar
   * los campos no especificados. Utiliza el patrón de spread operator
   * para mantener la inmutabilidad del estado.
   * 
   * @param {Partial<Tramites260912State>} valores - Objeto con los campos
   *        a actualizar. Puede contener cualquier combinación de propiedades
   *        del estado, no es necesario proporcionar todos los campos.
   * 
   * @example
   * // Actualizar solo el nombre y correo
   * store.setTramite260912State({
   *   nombre: 'Juan',
   *   correo: 'juan@email.com'
   * });
   * 
   * @example
   * // Actualizar información de pago
   * store.setTramite260912State({
   *   fecPago: '2024-01-15',
   *   impPago: '1500.00',
   *   llaveDePago: 'LP123456'
   * });
   */
  setTramite260912State(valores: Partial<Tramites260912State>): void {
    this.update((state => ({
      ...state,
      ...valores,
    })));
  }
}