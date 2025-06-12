import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificacionDatos } from '../models/modificacion-programa-immex-baja-submanufacturera.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite80303Store } from '../estados/tramite80303Store.store';

@Injectable({
  providedIn: 'root',
})
export class ModificacionProgramaImmexBajaSubmanufactureraService {
  /**
   * Constructor de la clase ModificacionProgramaImmexBajaSubmanufactureraService.
   *
   * @param httpServicios - Servicio HttpClient para realizar solicitudes HTTP.
   * @param tramite80303Store - Almacén de estado para gestionar los datos relacionados con el trámite 80303.
   */
  constructor(
    public httpServicios: HttpClient,
    public tramite80303Store: Tramite80303Store
  ) {}

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(variable: string, url: string): void {
    if (self && variable && url) {
      this.httpServicios
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .subscribe((resp): void => {
          const VALOR = resp?.code === 200 && resp.data ? resp.data : [];
          this.tramite80303Store.update((state) => ({
            ...state,
            [variable]: VALOR,
          }));
        });
    }
  }
  /**
   * Obtiene los datos de modificación del programa IMMEX baja submanufacturera.
   * Realiza una solicitud HTTP GET a un archivo JSON y actualiza el estado del trámite con los datos obtenidos.
   *
   * @returns {void}
   */
  obtenerModicicacionDatos(): void {
    this.httpServicios
      .get<ModificacionDatos>(
        'assets/json/80303/modificacionProgramaImmexBajaSubmanufacturera.json'
      )
      .subscribe((resp): void => {
        this.tramite80303Store.update((state) => ({
          ...state,
          modificacionDatos: resp,
        }));
      });
  }
}
