import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstanciaDelRegistroService {

  private jsonUrl = 'assets/json/120301/constancia-del-registro.json';
  constructor(private httpClient: HttpClient) {
    // Constructor logic can be added here if needed
  }

  getFederal(): Observable<any> {
    return this.httpClient.get<any[]>(this.jsonUrl);
  }
}