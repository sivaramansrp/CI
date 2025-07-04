import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/** Tipo de endoso, puede ser cadena o número */
export interface Solicitud32512State {
  nombreComercial: string;
  entidadFederativa: number;
  municipio: number;
  colonia: number;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  lugarEntidadFederativa: number;
  lugarMunicipioAlcaldia: number;
  lugarColonia: number;
  lugarCalle: string;
  lugarNumeroExterior: string;
  lugarNumeroInterior: string;
  lugarCodigoPostal: string;
  generico1: string;
  generico2: string;
  archivoDestruccion: File | null;
}

/**
 * Función que crea el estado inicial de la solicitud.
 * Esta función devuelve un objeto vacío que representa el estado inicial
 * de la solicitud, el cual puede ser modificado posteriormente.
 *
 * @returns {Solicitud32512State} Estado inicial de la solicitud.
 */
export function createInitialSolicitudState(): Solicitud32512State {
  return {
    nombreComercial: '',
    entidadFederativa: 0,
    municipio: 0,
    colonia: 0,
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    lugarEntidadFederativa: 0,
    lugarMunicipioAlcaldia: 0,
    lugarColonia: 0,
    lugarCalle: '',
    lugarNumeroExterior: '',
    lugarNumeroInterior: '',
    lugarCodigoPostal: '',
    generico1: '',
    generico2: '',
    archivoDestruccion: null,
  };
}
@Injectable({
  providedIn: 'root', // Este servicio es proporcionado en el nivel raíz de la aplicación
})
@StoreConfig({
  name: 'solicitud32512', // Nombre de la configuración para el store
  resettable: true, // Habilita la opción de restablecer el estado del store
})
export class Solicitud32512Store extends Store<Solicitud32512State> {
  constructor() {
    // Llama al constructor de la clase padre Store con el estado inicial
    super(createInitialSolicitudState());
  }

  actualizarNombreComercial(nombreComercial: string): void {
    this.update((state) => ({ ...state, nombreComercial }));
  }

  actualizarEntidadFederativa(entidadFederativa: number): void {
    this.update((state) => ({ ...state, entidadFederativa }));
  }

  actualizarMunicipio(municipio: number): void {
    this.update((state) => ({ ...state, municipio }));
  }

  actualizarColonia(colonia: number): void {
    this.update((state) => ({ ...state, colonia }));
  }

  actualizarCalle(calle: string): void {
    this.update((state) => ({ ...state, calle }));
  }

  actualizarNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({ ...state, numeroExterior }));
  }

  actualizarNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({ ...state, numeroInterior }));
  }

  actualizarCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({ ...state, codigoPostal }));
  }

  actualizarLugarEntidadFederativa(lugarEntidadFederativa: number): void {
    this.update((state) => ({ ...state, lugarEntidadFederativa }));
  }

  actualizarLugarMunicipioAlcaldia(lugarMunicipioAlcaldia: number): void {
    this.update((state) => ({ ...state, lugarMunicipioAlcaldia }));
  }

  actualizarLugarColonia(lugarColonia: number): void {
    this.update((state) => ({ ...state, lugarColonia }));
  }

  actualizarLugarCalle(lugarCalle: string): void {
    this.update((state) => ({ ...state, lugarCalle }));
  }

  actualizarLugarNumeroExterior(lugarNumeroExterior: string): void {
    this.update((state) => ({ ...state, lugarNumeroExterior }));
  }

  actualizarLugarNumeroInterior(lugarNumeroInterior: string): void {
    this.update((state) => ({ ...state, lugarNumeroInterior }));
  }

  actualizarLugarCodigoPostal(lugarCodigoPostal: string): void {
    this.update((state) => ({ ...state, lugarCodigoPostal }));
  }

  actualizarGenerico1(generico1: string): void {
    this.update((state) => ({ ...state, generico1 }));
  }

  actualizarGenerico2(generico2: string): void {
    this.update((state) => ({ ...state, generico2 }));
  }

  actualizarArchivoDestruccion(archivoDestruccion: File): void {
    this.update((state) => ({ ...state, archivoDestruccion }));
  }

  resetStore(): void {
    this.reset();
  }
}
