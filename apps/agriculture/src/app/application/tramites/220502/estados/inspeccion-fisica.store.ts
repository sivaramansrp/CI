import { CargarDatosIniciales } from '../models/solicitud-pantallas.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { DatosDelTramiteRealizar } from '../models/solicitud-pantallas.model';
import { Injectable } from '@angular/core';
import { InspeccionFisica } from '../models/solicitud-pantallas.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Función para crear el estado inicial de la inspección física.
 * Retorna un objeto con los valores predeterminados.
 * 
 * @returns Estado inicial de la inspección física.
 */
export function crearEstadoInicial(): InspeccionFisica {
  return {
    cargarDatosIniciales: {} as CargarDatosIniciales,
    catalogosSelect: {} as CatalogosSelect,
    datosDelTramiteRealizar: {} as DatosDelTramiteRealizar,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'inspeccion-fisica', resettable: true })
export class InspeccionFisicaStore extends Store<InspeccionFisica> {
  /**
   * Constructor de la tienda (store) de inspección física.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Método para actualizar los datos iniciales de la inspección física.
   * 
   * @param datos - Datos iniciales a actualizar.
   */
  public actualizarDatosIniciales(datos: CargarDatosIniciales): void {
    this.update((state) => ({
      ...state,
      cargarDatosIniciales: datos,
    }));
  }

  /**
   * Método para actualizar los datos del trámite que se va a realizar.
   * 
   * @param datos - Información del trámite a actualizar.
   */
  actualizarDatosDelTramite(datos: DatosDelTramiteRealizar): void {
    this.update((state) => ({
      ...state,
      datosDelTramiteRealizar: datos,
    }));
  }

  /**
   * Método para actualizar los catálogos disponibles en la inspección.
   * 
   * @param datos - Catálogos de selección a actualizar.
   */
  actualizarCatalogosSelect(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      catalogosSelect: datos,
    }));
  }

  /**
   * Método para limpiar y restablecer la sección de inspección física.
   * Restaura el estado a su valor inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
