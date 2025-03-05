import { Injectable } from '@angular/core';
import { HttpCoreService } from '../../shared/http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportadorAutorizadoService {

  constructor(private http: HttpCoreService) { }


  getExportadorAutorizado(): Observable<any> {
      return this.http.get('./assets/json/110102/exportadorautorizado.json');
    }

    getExportadorAutorizadoJPN(): Observable<any> {
      return this.http.get('./assets/json/110102/exportadorautorizadojpn.json');
    }
    
}
