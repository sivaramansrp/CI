import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciosElegibilidadDeTextilesService {
  setSoliciante: any;

  constructor(private http: HttpClient) { }
}
