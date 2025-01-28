import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ServiciosExtraordinariosService {
  urlServer = enviroment.URL_SERVER;

  constructor(private http: HttpClient) {}





}
