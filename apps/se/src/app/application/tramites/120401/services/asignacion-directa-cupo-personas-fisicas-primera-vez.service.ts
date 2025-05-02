import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio responsable de obtener datos desde archivos JSON locales
 * y asignarlos dinámicamente a propiedades de un componente.
 *
 * Este servicio está disponible de forma global en toda la aplicación
 * gracias al decorador `providedIn: 'root'`.
 */
@Injectable({
  providedIn: 'root'
})


export class AsignacionDirectaCupoPersonasFisicasPrimeraVezService {
    
  constructor(private httpServicios: HttpClient){}
  /**
 * Obtiene datos desde un archivo JSON localizado en la carpeta `assets/json`
 * y asigna el resultado a una propiedad del componente o clase llamadora.
 *
 * @param self - Referencia al componente o contexto que recibe los datos.
 * @param variable - Nombre de la propiedad dentro de `self` donde se asignará la respuesta.
 * @param url - Ruta relativa al archivo JSON dentro de `assets/json`.
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obtenerRespuestaPorUrl(self: any, variable: string, url: string) :void {
      if (self && variable && url) {
        this.httpServicios.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
          self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
        });
      }
    }
  
}
