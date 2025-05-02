import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';


@Injectable({
  providedIn: 'root'
})

export class AsignacionDirectaCupoPersonasFisicasPrimeraVezService {
    constructor(private httpServicios: HttpClient){}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obtenerRespuestaPorUrl(self: any, variable: string, url: string) :void {
      if (self && variable && url) {
        this.httpServicios.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
          self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
        });
      }
    }
  
}
