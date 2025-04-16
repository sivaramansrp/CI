import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar la importación de vehículos.
 * Este servicio proporciona métodos para obtener datos relacionados con la importación de vehículos,
 * como listas de países, entidades federativas, representaciones federales y opciones de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class EquipoEInstrumentosMusicalesService {
  /**
   * Constructor del servicio.
   * Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
    //
  }


  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * El ID del bloque.
   * Un observable que emite una lista de países agrupados por bloque.
   */
  getPropietarioOptions(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/630104/propietario-options.json'
    );
  }

  getPropietarioNoOptions(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/630104/propietario-no-options.json'
    );
  }

  }