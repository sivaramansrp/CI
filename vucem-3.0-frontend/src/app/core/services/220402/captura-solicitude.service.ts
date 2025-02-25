import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root',
})
export class CapturaSolicitudeService {
  constructor(private http: HttpClient) {}
  getBanco() {
    return this.http.get<RespuestaCatalogos>('assets/json/220402/banco.json');
  }
}
