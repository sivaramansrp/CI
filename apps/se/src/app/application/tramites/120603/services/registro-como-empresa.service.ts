import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroComoEmpresaService {

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del estado desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/estado.json');
  }

  /**
   * Obtiene los datos de representación federal desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getRepresentacionFederalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/representacionfederal.json');
  }

  /**
   * Obtiene los datos del tipo de empresa desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getTipoDeEmpresaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/tipoDeEmpresaData.json');
  }

  /**
   * Obtiene los datos de socios y accionistas desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getSociosYAaccionistasData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasData.json');
  }

  /**
   * Obtiene los datos de socios y accionistas extranjeros desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getSociosYAccionistasExtranjerosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasExtranjerosData.json');
  }

  /**
   * Obtiene los datos de países desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/paisData.json');
  }
}