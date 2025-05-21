import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Requerimiento {
  code:number;
  message:string;
  data:Requisitos;
}

export interface Requisitos {
  fechaRequerimiento: string;
  justificacionRequerimiento:string;
}

@Injectable({
  providedIn: 'root'
})


export class AtenderRequerimientoService {

    constructor(private http: HttpClient) {
      // El constructor se utiliza para la inyección de dependencias.
    }


    /**
 * Obtiene la información de los requisitos de un requerimiento.
 *
 * Realiza una petición HTTP GET para obtener los datos de requisitos desde un archivo JSON local.
 *
 * @returns {Observable<Requerimiento>} Un observable que emite la información del requerimiento.
 *
 * @example
 * this.atenderRequerimientoService.informacionRequisitos().subscribe((resp) => {
 *   console.log(resp.data.fechaRequerimiento);
 * });
 */
public informacionRequisitos():Observable<Requerimiento> {
  return this.http.get<Requerimiento>('./assets/json/shared/informacion-requisitos.json');
}

}
