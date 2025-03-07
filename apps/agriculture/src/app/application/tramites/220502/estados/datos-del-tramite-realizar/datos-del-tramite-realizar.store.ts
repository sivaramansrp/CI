import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosDelTramiteRealizar } from '../../models/solicitud-pantallas.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Crea el estado inicial de la tienda con valores por defecto.
 *
 * @returns Un objeto con la estructura de `DatosDelTramiteRealizar`.
 */
export function crearEstadoInicial(): DatosDelTramiteRealizar {
  return {
      pendientesCertificados: {} as Catalogo[],
      horaInspeccion: {} as Catalogo[],
      aduanaIngreso: {} as Catalogo[],
      sanidadAgropecuaria: {} as Catalogo[],
      puntoInspeccion: {} as Catalogo[],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'datos-del-tramite-realizar-store', resettable: true })
/**
 * Clase que representa el store para los datos del trámite a realizar.
 * Extiende de `Store<DatosDelTramiteRealizar>` y gestiona el estado relacionado.
 */
export class DatosDelTramiteRealizarStore extends Store<DatosDelTramiteRealizar> {
  /**
   * Constructor de la tienda `DatosDelTramiteRealizarStore`.
   * Inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza los datos iniciales del store con la información proporcionada.
   *
   * @param datos - Objeto que contiene los nuevos datos a actualizar en el estado.
   */
  public actualizarDatosIniciales(datos: DatosDelTramiteRealizar): void {
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
