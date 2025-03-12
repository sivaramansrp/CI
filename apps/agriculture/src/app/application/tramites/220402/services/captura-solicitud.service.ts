import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'root',
})
export class CapturaSolicitudeService {
  constructor(private http: HttpClient) {}
  getBanco(): any {
    return this.http.get<RespuestaCatalogos>('assets/json/220402/banco.json');
  }
}
