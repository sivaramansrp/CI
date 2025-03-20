import { BancoList } from '../modelos/pago-de-derechos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoDeDerechosService {

  constructor(private http:HttpClient) { 
     // No se necesita lógica de inicialización adicional.
  }
   onBancoList(): Observable<BancoList[]> {
        return this.http.get<BancoList[]>('assets/json/260912/bancoList.json');
      }
}
