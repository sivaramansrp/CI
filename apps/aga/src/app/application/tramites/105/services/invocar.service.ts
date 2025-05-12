import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite105Store} from '../../105/estados/tramite105.store';
import { tap } from 'rxjs/operators';
/**
 * Servicio para obtener datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root',
})
export class InvoCarService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param store Store de Akita para gestionar el estado.
   */
  constructor(private http: HttpClient, private store: Tramite105Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }


  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais():Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/pais.json').pipe(
      tap(response => this.store.setPais(response.data))
    );
  }
  /**
   * Obtiene el catálogo de entidades federativas.
   * @returns Observable con la respuesta del catálogo de entidades federativas.
   */
  getEntidadFederativa(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/entidadfederativa.json').pipe(
      tap(response => this.store.setEntidadFederativa(response.data))
    );
  }

  /**
   * Obtiene el catálogo de colonias.
   * @returns Observable con la respuesta del catálogo de colonias.
   */
  getColonia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/colonia.json').pipe(
      tap(response => this.store.setColonia(response.data))
    );
  }

  /**
   * Obtiene las fechas seleccionadas.
   * @returns Observable con la respuesta de las fechas seleccionadas.
   */
  getFechasSeleccionadas(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/fechasSeleccionadas.json').pipe(
      tap(response => this.store.setEntidadFederativa(response.data))
    );
  }

  /**
   * Obtiene las opciones de fracción arancelaria.
   * @returns Observable con la respuesta de las opciones de fracción arancelaria.
   */
  getFraccionArancelariaOptions(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/fracciónarancelaria-options.json').pipe(
      tap(response => this.store.setFraccionarancelaria(response.data))
    );
  }

  /**
   * Obtiene el catálogo de municipios o delegaciones.
   * @returns Observable con la respuesta del catálogo de municipios o delegaciones.
   */
  getMunicipioDelegacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/municipiodelegacion.json').pipe(
      tap(response => this.store.setMunicipioDelegacion(response.data))
    );
  }

  /**
   * Obtiene el catálogo de aduanas.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/aduana.json').pipe(
      tap(response => this.store.setAduana(response.data))
    );
  }
}
