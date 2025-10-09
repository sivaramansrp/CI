import { Cancelacion, PermisosDatos, createDatosState } from '../models/cancelacion-de-solicitus.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define la estructura del estado de desistimiento de permiso.
 */
export interface DesistimientoDePermisoState {
  /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number | null;
  
  /** RFC del solicitante */
  rfc: string;
  
  /** Nombre del solicitante */
  nombre: string;
  
  /** Apellido paterno */
  apPaterno: string;
  
  /** Apellido materno */
  apMaterno: string;
  
  /** Teléfono */
  telefono: string;
  
  /** Tipo de desistimiento */
  tipoDesistimiento: string;
  
  /** Motivo de cancelación */
  motivoCancelacion: string;
  
  /** Número de permiso */
  numeroPermiso: string;
  
  /** Fecha de desistimiento */
  fechaDesistimiento: string;
  
  /** Observaciones */
  observaciones: string;
  
  /** Certificado Serial Number para firma electrónica */
  certificadoSerialNumber: string;
  
  /** Certificado para firma electrónica */
  certificado: string;
  
  /** Datos de cancelación legacy */
  datos: Cancelacion[];
}

/**
 * Función para crear el estado inicial
 */
function createInitialState(): DesistimientoDePermisoState {
  return {
    idSolicitud: 253688,
    rfc: '',
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    telefono: '',
    tipoDesistimiento: '',
    motivoCancelacion: '',
    numeroPermiso: '',
    fechaDesistimiento: '',
    observaciones: '',
    certificadoSerialNumber: '',
    certificado: '',
    datos: []
  };
}

@Injectable({
  providedIn: 'root',
})

@StoreConfig({ name: 'desistimiento-de-permiso', resettable: true })
/**
 * Tienda (store) Akita para gestionar el estado relacionado con la cancelación o desistimiento
 * de solicitudes de permiso.
 *
 * @description
 * Esta clase extiende de `Store` de Akita y permite inicializar y actualizar el estado
 * de tipo `DesistimientoDePermisoState`. Está diseñada para almacenar y manejar los datos relacionados
 * con los trámites de cancelación, como el folio del trámite, tipo de solicitud, fracción arancelaria, etc.
 */
export class DesistimientoStore extends Store<DesistimientoDePermisoState> {

  /**
   * Constructor que inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza los datos de la forma de cancelación en el estado.
   *
   * @remarks
   * Este método recibe un arreglo de objetos de tipo `Cancelacion` y reemplaza
   * los datos actuales en el estado por los nuevos.
   * 
   * Es útil cuando se modifica la información del formulario o cuando se cargan datos desde una fuente externa.
   *
   * @param datos - Arreglo de objetos de tipo `Cancelacion` que se utilizará para actualizar el estado.
   */
  public actualizarDatosForma(datos: Cancelacion[]): void {
    this.update((_state) => ({
      datos,
    }));
  }

  /**
   * Actualiza el ID de la solicitud
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update({ idSolicitud });
  }

  /**
   * Actualiza los datos del solicitante
   */
  public setSolicitanteData(data: Partial<DesistimientoDePermisoState>): void {
    this.update(data);
  }

  /**
   * Actualiza los datos de firma electrónica
   */
  public setFirmaData(certificadoSerialNumber: string, certificado: string): void {
    this.update({ certificadoSerialNumber, certificado });
  }
}
