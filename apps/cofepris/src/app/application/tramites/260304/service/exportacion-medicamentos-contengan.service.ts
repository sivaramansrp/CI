import { Facturador } from '../../../shared/models/terceros-relacionados.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportacionMedicamentosContenganService {

  /**
   * @property {string} jsonUrl
   * Ruta relativa al archivo JSON que contiene los datos del domicilio.
   * Usado para cargar información desde el frontend (assets).
   * @private
   */
  private jsonUrl = 'assets/json/260304/';
  
  constructor(public httpServicios: HttpClient) {
    // Constructor necesario para inyectar el servicio HttpClient
  }

  /**
   * Método para obtener datos de un "Facturador" desde un archivo JSON remoto.
   * Realiza una solicitud HTTP GET a la URL especificada y devuelve un observable
   * que emite el resultado de la petición.
   * 
   * @returns {Observable<Facturador>} Un observable que emite los datos de un facturador.
   */
  obtenerOstro(): Observable<Facturador> {
    return this.httpServicios.get<Facturador>(
      this.jsonUrl + 'buscar-otros.json'
    );
  }
}
