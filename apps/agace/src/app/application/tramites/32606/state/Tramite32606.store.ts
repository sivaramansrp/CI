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
 * Estado inicial para la interfaz del trámite 32606.
 */
export interface Solicitud32606State {
  tipoRadio01: string,
  tipoRadio02: string,
  tipoRadio03: string,
  tipoRadio04: string,
  tipoRadio05: string,
  tipoRadio06: string,
  tipoRadio07: string,
  tipoRadio08: string,
  tipoRadio09: string,
  tipoRadio10: string,
  tipoRadio11: string,
  tipoRadio12: string
  tipoRadio13: string
  tipoRadio14: string
  tipoRadio15: string
  tipoRadio16: string
  tipoRadio17: string
  tipoRadio18: string
  tipoRadio19: string
  tipoRadio20: string
  tipoRadio21: string
  tipoRadio22: string
  tipoRadio23: string
  tipoRadio24: string
  tipoRadio25: string
  tipoRadio26: string,
  sectorProductivo: string,
  servicio: string,
  domicilio: string,
  biomestre: string,
  numeroEmpleados: string,
  domicillio: string,
  file1: string,
  file2: string,
  actualmente: string,
  actualmente2: string,
  sistemaIdentificacion: string,
  lugarRadicacion: string,
  sistemaControlInventarios: boolean,
  rfcTercero: string,
  rfc: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  telefono: string,
  correoElectronico: string,
  monto: string,
  operacionesBancarias: string,
  llavePago: string,
  modalidad: string,
  fechaRegistro: string,
  numeroAutorizacion: string,
  radioAutorizo: string,
  radioClasificacion: string,
}

/**
 * Crea el estado inicial para la solicitud del trámite 32606.
 * @returns Estado inicial de tipo `Solicitud32606State`.
 */
export function createInitialState(): Solicitud32606State {
  return {
    tipoRadio01: '',
    tipoRadio02: '',
    tipoRadio03: '',
    tipoRadio04: '',
    tipoRadio05: '',
    tipoRadio06: '',
    tipoRadio07: '',
    tipoRadio08: '',
    tipoRadio09: '',
    tipoRadio10: '',
    tipoRadio11: '',
    tipoRadio12: '',
    tipoRadio13: '',
    tipoRadio14: '',
    tipoRadio15: '',
    tipoRadio16: '',
    tipoRadio17: '',
    tipoRadio18: '',
    tipoRadio19: '',
    tipoRadio20: '',
    tipoRadio21: '',
    tipoRadio22: '',
    tipoRadio23: '',
    tipoRadio24: '',
    tipoRadio25: '',
    tipoRadio26: '',

    sectorProductivo: '',
    servicio: '', 
    domicilio: '', 
    biomestre: '',
    numeroEmpleados: '', 
    domicillio: '',
    file1: '', 
    file2: '', 
    actualmente: '', 
    actualmente2: '', 
    sistemaIdentificacion: '', // Sistema de identificación
    lugarRadicacion: '', // Lugar de radicación
    sistemaControlInventarios: false, // Sistema de control de inventarios
    rfcTercero: '', // RFC del tercero
    rfc: '', // RFC del solicitante
    nombre: '', // Nombre del solicitante
    apellidoPaterno: '', // Apellido paterno del solicitante
    apellidoMaterno: '', // Apellido materno del solicitante
    telefono: '', // Teléfono de contacto
    correoElectronico: '', // Correo electrónico de contacto
    monto: '', // Monto relacionado con la solicitud
    operacionesBancarias: '', // Operaciones bancarias realizadas
    llavePago: '', // Llave de pago para la solicitud
    modalidad: '', // Modalidad de la solicitud
    fechaRegistro: new Date().toISOString(), // Fecha de registro, por defecto la fecha actual en formato ISO
    numeroAutorizacion: '', // Número de autorización si aplica
    radioAutorizo: 'NO', // Radio que indica si se autorizó
    radioClasificacion: 'NO', 
  };
}

/**
 * Clase que representa el almacén de estado para el trámite 32606.
 * Gestiona el estado global de la solicitud y proporciona métodos para actualizarlo.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32606', resettable: true })
export class Tramite32606Store extends Store<Solicitud32606State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la clave del fiscalizado.
   * @param claveFiscalizado Nueva clave del fiscalizado.
   */
  public setClaveFiscalizador(claveFiscalizado: string): void {
    this.update((state) => ({ ...state, claveFiscalizado }));
  }


  /**
   * Restaura el estado al valor inicial.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}