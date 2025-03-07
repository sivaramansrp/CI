import { CargarDatosIniciales } from '../models/solicitud-pantallas.model';
import { CarrosDeFerrocarril } from '../models/solicitud-pantallas.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { DatosDeMercancias } from '../models/solicitud-pantallas.model';
import { HistorialInspeccionFisica } from '../models/solicitud-pantallas.model';
import { Injectable } from '@angular/core';
import { Solicitud } from '../models/solicitud-pantallas.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Crea el estado inicial de la tienda con los valores por defecto.
 *
 * @returns Un objeto con la estructura de `CargarDatosIniciales`.
 */
export function crearEstadoInicial(): CargarDatosIniciales {
  return {
    hHistorialinspeccion: [] as string[],
    dHistorialInspecciones: [] as HistorialInspeccionFisica[],
    dCarrosDeFerrocarril: [] as CarrosDeFerrocarril[],
    hCarroFerrocarril: [] as string[],
    hSolicitud: [] as string[],
    dSolicitud: [] as Solicitud[],
    hMerchandise: [] as string[],
    dMercancia: [] as DatosDeMercancias[],
    medioDeTransporte: {} as CatalogosSelect,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'inspeccion-fisica', resettable: true })
export class InspeccionFisicaStore extends Store<CargarDatosIniciales> {
  /**
   * Constructor de la tienda `InspeccionFisicaStore`.
   * Inicializa la tienda con el estado predeterminado.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza los datos iniciales de la tienda con la información proporcionada.
   *
   * @param datos - Objeto que contiene los nuevos datos a actualizar en el estado.
   */
  public actualizarDatosIniciales(datos: CargarDatosIniciales): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }

  /**
   * Limpia los datos de la sección restableciendo el estado a su valor inicial.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
