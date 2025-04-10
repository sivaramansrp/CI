import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dropdownList } from '../modelos/registro-empresas-transporte.model';

/**
 * Servicio para manejar las renovaciones de muestras de mercancías.
 * 
 * @remarks
 * Este servicio proporciona métodos para interactuar con la API relacionada con las renovaciones de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroEmpresasTransporteService {

  /**
   * Constructor del servicio RegistroEmpresasTransporteService.
   * 
   * @param httpClient - Cliente HTTP inyectado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
       // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  onBancoList(): Observable<dropdownList[]> {
    return this.http.get<dropdownList[]>('assets/json/30401/banco-list.json');
  }

  tipoTransitoList(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/30401/tipode-transito-list.json');
  }

  entidadFederativaList(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/30401/entidad-federativa-list.json');
  }
  delegacionMunicipioList(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/30401/municipio-delegacion-list.json');
  }

  coloniaList(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/30401/colonia-list.json');
  }

  cveFolioCaat(): Observable<{id?:number; value: string}> {
    return this.http.get<{id?:number; value: string}>('assets/json/30401/numero-caat.json');
  }

}
