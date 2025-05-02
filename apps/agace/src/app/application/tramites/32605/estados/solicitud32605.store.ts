import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud32605State {
  idPersonaSolicitud: string;
  rfcTercero: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correoElectronico: string;

  agregarEnlaceRfcTercero: string;
  agregarEnlaceRfc: string;
  agregarEnlaceNombre: string;
  agregarEnlaceApellidoPaterno: string;
  agregarEnlaceApellidoMaterno: string;
  agregarEnlaceCiudadEstado: string;
  agregarEnlaceCargo: string;
  agregarEnlaceTelefono: string;
  agregarEnlaceCorreoElectronico: string;
  agregarEnlaceSuplente: boolean;
}

export function createInitialSolicitudState(): Solicitud32605State {
  return {
    idPersonaSolicitud: '',
    rfcTercero: '',
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    correoElectronico: '',

    agregarEnlaceRfcTercero: '',
    agregarEnlaceRfc: '',
    agregarEnlaceNombre: '',
    agregarEnlaceApellidoPaterno: '',
    agregarEnlaceApellidoMaterno: '',
    agregarEnlaceCiudadEstado: '',
    agregarEnlaceCargo: '',
    agregarEnlaceTelefono: '',
    agregarEnlaceCorreoElectronico: '',
    agregarEnlaceSuplente: false,
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'solicitud32605',
  resettable: true,
})
export class Solicitud32605Store extends Store<Solicitud32605State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  actualizarIdPersonaSolicitud(valor: string): void {
    this.update((state) => ({ ...state, idPersonaSolicitud: valor }));
  }

  actualizarRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, rfcTercero: valor }));
  }

  actualizarRfc(valor: string): void {
    this.update((state) => ({ ...state, rfc: valor }));
  }

  actualizarNombre(valor: string): void {
    this.update((state) => ({ ...state, nombre: valor }));
  }

  actualizarApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoPaterno: valor }));
  }

  actualizarApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoMaterno: valor }));
  }

  actualizarTelefono(valor: string): void {
    this.update((state) => ({ ...state, telefono: valor }));
  }

  actualizarCorreoElectronico(valor: string): void {
    this.update((state) => ({ ...state, correoElectronico: valor }));
  }

  actualizarEnlaceRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfcTercero: valor }));
  }
  
  actualizarEnlaceRfc(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfc: valor }));
  }
  
  actualizarEnlaceNombre(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceNombre: valor }));
  }
  
  actualizarEnlaceApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoPaterno: valor }));
  }
  
  actualizarEnlaceApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoMaterno: valor }));
  }
  
  actualizarEnlaceCiudadEstado(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCiudadEstado: valor }));
  }
  
  actualizarEnlaceCargo(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCargo: valor }));
  }
  
  actualizarEnlaceTelefono(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceTelefono: valor }));
  }
  
  actualizarEnlaceCorreoElectronico(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCorreoElectronico: valor }));
  }
  
  actualizarEnlaceSuplente(valor: boolean): void {
    this.update((state) => ({ ...state, agregarEnlaceSuplente: valor }));
  }
  
  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
