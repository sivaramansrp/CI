import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;
  /** Descripción del catálogo. */
  descripcion: string;
}

/**
 * Representa el estado de la solicitud 32514 con información del solicitante, permiso y vehículo.
 * @interface
 *
 * @property {string} residenteNacExt - Indica si el residente es nacional o del extranjero.
 * @property {string} tipoSolicitude - Tipo de solicitud del permiso.
 * @property {string} numeroVehiculo - Número de identificación del vehículo.
 * @property {string} numeroPermiso - Número del permiso de importación temporal.
 * @property {string} fechaEmision - Fecha de emisión del permiso.
 * @property {string} fechaVencimiento - Fecha de vencimiento del permiso.
 * @property {string} númeroPedimento - Número de pedimento aduanal.
 * @property {string} fechaPedimento - Fecha del pedimento.
 * @property {string} avisoNacExt - Aviso relacionado con la residencia (nacional/extranjero).
 * @property {string} fechaAcuse - Fecha del acuse de recibo.
 * @property {string} conformidad - Documento de conformidad u observaciones.
 *
 * @property {string} marca - Marca del vehículo.
 * @property {string} tipo - Tipo del vehículo.
 * @property {string} modelo - Modelo del vehículo.
 * @property {string} niv - Número de identificación vehicular (NIV).
 * @property {string} numeroDePlacas - Número de placas del vehículo.
 * @property {string} estadoPlacas - Estado donde están registradas las placas.
 *
 * @property {string} declara - Declaración relacionada con la importación.
 * @property {string} tipoVehiculo - Tipo específico de vehículo.
 * @property {string} especifique - Detalles adicionales del tipo de vehículo.
 * @property {string} numeroSerie - Número de serie del vehículo.
 */
export interface Solicitud32514State {
  residenteNacExt: string;
  tipoSolicitude: string;
  numeroVehiculo: string;
  numeroPermiso: string;
  fechaEmision: string;
  fechaVencimiento: string;
  númeroPedimento: string;
  fechaPedimento: string;
  avisoNacExt: string;
  fechaAcuse: string;
  conformidad: string;

  marca: string;
  tipo: string;
  modelo: string;
  niv: string;
  numeroDePlacas: string;
  estadoPlacas: string;

  declara: string;
  tipoVehiculo: string;
  especifique: string;
  numeroSerie: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 32514.
 * @returns Estado inicial de tipo `Solicitud32514State`.
 */
export function createInitialState(): Solicitud32514State {
  return {
    residenteNacExt: '',
    tipoSolicitude: '',
    numeroVehiculo: '',
    numeroPermiso: '',
    fechaEmision: '',
    fechaVencimiento: '',
    númeroPedimento: '',
    fechaPedimento: '',
    avisoNacExt: '',
    fechaAcuse: '',
    conformidad: '',

    marca: '',
    tipo: '',
    modelo: '',
    niv: '',
    numeroDePlacas: '',
    estadoPlacas: '',

    declara: '',
    tipoVehiculo: '',
    especifique: '',
    numeroSerie: '',
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32514.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32514', resettable: true })
export class Tramite32514Store extends Store<Solicitud32514State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece o actualiza una propiedad específica del estado con un nuevo valor.
   *
   * @param {string} key - Clave de la propiedad del estado que se desea modificar.
   * @param {string} value - Nuevo valor que se asignará a la propiedad especificada.
   * @returns {void}
   */
  public setEstado(key: string, value: string): void {
    this.update((state) => ({ ...state, [key]: value }));
  }
}
