import { Injectable } from '@angular/core';
import {
  SolicitudSectoresYMercanciasState,
  TramiteSectoresYMercanciasStore,
} from '../estados/stores/sectores-y-mercancias.store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class SectoresMercanciasService {
  constructor(
    private readonly http: HttpClient,
    private tramiteSectoresYMercanciasStore: TramiteSectoresYMercanciasStore
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método para actualizar el estado del formulario con los datos proporcionados.
   * @param DATOS - Objeto que contiene el estado del trámite.
   */
  actualizarEstadoFormulario(DATOS: SolicitudSectoresYMercanciasState): void {
    this.tramiteSectoresYMercanciasStore.setFraccion(DATOS.fraccion);
    this.tramiteSectoresYMercanciasStore.setRfc(DATOS.rfc);
    this.tramiteSectoresYMercanciasStore.setSector(DATOS.sector);
  }

  /**
   * Método para obtener los datos del registro de toma de muestras de mercancías.
   * @returns Observable que emite el estado del trámite.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<SolicitudSectoresYMercanciasState> {
    return this.http.get<SolicitudSectoresYMercanciasState>(
      'assets/json/260501/registro_toma_muestras_mercancias.json'
    );
  }

  /**
   * Obtiene el catálogo de sectores desde un archivo JSON local.
   *
   * @returns Un observable que emite la respuesta del catálogo de sectores.
   */
  getSectorCatalog(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/90202/sector.json');
  }
}
