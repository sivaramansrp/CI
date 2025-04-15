import { Catalogo } from '@libs/shared/data-access-user/src';
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

  /**
 * Recupera la lista de bancos desde un archivo JSON almacenado.
 * El método devuelve un observable que contiene un arreglo de objetos BancoList.
 */
   onBancoList(): Observable<Catalogo[]> {
        return this.http.get<Catalogo[]>('assets/json/260912/bancoList.json');
      }
}
