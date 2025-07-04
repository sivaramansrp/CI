import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32512 a partir de archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * Constructor que inyecta el cliente HTTP.
   * @param http - Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) {
    // Lógica del constructor aquí
  }

  conseguirEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/32512/entidad-federativa-catalogo.json'
    );
  }

  conseguirMunicipioAlcaldia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/32512/municipio-alcaldia-catalogo.json'
    );
  }

  conseguirColonia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/32512/colonia-catalogo.json');
  }
}
