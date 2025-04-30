import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroComoEmpresaService {

  constructor(private http: HttpClient) {}

  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/estado.json');
  }
  getRepresentacionFederalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/representacionfederal.json');
  }
   getTipoDeEmpresaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/tipoDeEmpresaData.json');
  }
  getSociosYAaccionistasData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasData.json');
  }
  getSociosYAccionistasExtranjerosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasExtranjerosData.json');
  }
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/paisData.json');
  }
}
