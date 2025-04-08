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
    return this.http.get<dropdownList[]>('assets/json/30401/bancoList.json');
  }

  tipodeTransitoList(): Observable<dropdownList[]> {
    return this.http.get<dropdownList[]>('assets/json/30401/tipodeTransitoList.json');
  }

  entidadFederativaList(): Observable<dropdownList[]> {
    return this.http.get<dropdownList[]>('assets/json/30401/entidadFederativaList.json');
  }
  municipioDelegacionList(): Observable<dropdownList[]> {
    return this.http.get<dropdownList[]>('assets/json/30401/municipioDelegacionList.json');
  }

  coloniaList(): Observable<dropdownList[]> {
    return this.http.get<dropdownList[]>('assets/json/30401/coloniaList.json');
  }

}
