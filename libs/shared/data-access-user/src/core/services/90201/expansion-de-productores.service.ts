import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '../../models/shared/catalogos.model';

@Injectable({
  providedIn: 'root'
})

/**
 * Este servicio se utiliza para almacenar los datos del formulario del trámite 90201.
 */

export class ExpansionDeProductoresService {
   /**
  * constructor de la clase
  * @param http: constructor de HttpClient
  */
  constructor(private http: HttpClient) { }


  getSectorCatalog() {
    // ../../../../../assets/json/220201/aduana_de_ingreso.json
    return this.http.get<RespuestaCatalogos>('assets/json/90201/sector.json');
  }



}
