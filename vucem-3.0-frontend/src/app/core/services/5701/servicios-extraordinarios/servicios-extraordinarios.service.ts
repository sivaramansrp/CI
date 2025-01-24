import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaSolicitud } from '../../../models/5701/servicios-extraordinarios.model';
import { catalogoResponse } from '../../../models/shared/catalogos.model';
import {
  RespuestaCatalogos,
} from '../../../models/shared/catalogos.model';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  urlServer = enviroment.URL_SERVER;

  constructor(private http: HttpClient) {}
}
