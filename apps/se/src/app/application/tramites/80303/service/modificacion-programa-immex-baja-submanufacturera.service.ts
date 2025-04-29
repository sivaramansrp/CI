import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class ModificacionProgramaImmexBajaSubmanufactureraService {

  constructor(public httpServicios: HttpClient) { }

    /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @param {any} self - El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
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
