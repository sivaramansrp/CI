import { HttpCoreService } from '../../shared/http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportadorAutorizadoService {
  getRegistro() {
    throw new Error('Method not implemented.');
  }
  setRegistro(response: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpCoreService) { 
    // Lógica de inicialización si es necesario
  }


  getExportadorAutorizado(): Observable<any> {
      return this.http.get('./assets/json/110102/exportadorautorizado.json');
    }

    getExportadorAutorizadoJPN(): Observable<any> {
      return this.http.get('./assets/json/110102/exportadorautorizadojpn.json');
    }
    
}
