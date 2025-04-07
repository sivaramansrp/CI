/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Inicializa los datos de los catálogos para el primer paso.
 *
 * Este método realiza solicitudes HTTP para obtener varios catálogos desde archivos JSON locales y asigna los datos recibidos a las propiedades correspondientes de la clase.
 * 
 * - `tiposSolicitud`: Obtiene los tipos de solicitud desde `tiposDeSolicitud.json`.
 * - `noDePermisocoferprise`: Obtiene los datos desde `noDePermisocoferprise.json`.
 * - `fraccionArancelaria`: Obtiene los datos desde `fraccionArancelaria.json`.
 * - `numeroCas`: Obtiene los datos desde `numeroCas.json`.
 * - `clasificacion`: Obtiene los datos desde `clasificacion.json`.
 * - `estadoFisico`: Obtiene los datos desde `estadoFisico.json`.
 * - `datosObjecto`: Obtiene los datos desde `datosObjecto.json`.
 * - `unidadDeMedida`: Obtiene los datos desde `unidadDeMedida.json`.
 */
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialesPeligrososService {
  // Las siguientes variables se utilizan en el componente paso uno datos solicitud
  tiposSolicitud: Catalogo[] = [];
  noDePermisocoferprise: Catalogo[] = [];
  fraccionArancelaria: Catalogo[] = [];
  numeroCas: Catalogo[] = [];
  clasificacion: Catalogo[] = [];
  estadoFisico: Catalogo[] = [];
  datosObjecto: Catalogo[] = [];
  unidadDeMedida: Catalogo[] = [];
 
  // Las siguientes variables se utilizan en el componente pago de derechos
  listoBanco: Catalogo[] = [];

  constructor(public httpServicios: HttpClient) {}

  /**
   * Inicializa el catálogo de pago de derechos.
   * 
   * Este método obtiene la respuesta desde una URL específica y la asigna a la propiedad 'listoBanco'.
   * 
   * @returns {void}
   */
  inicializaPagoDerechosCatalogo():void {
    this.obtenerRespuestaPorUrl(this, 'listoBanco', '/230501/pagoDerechosBanco.json');
  }

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @param {Object} self - El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(self: any, variable: string, url: string) :void {
    if (self && variable && url) {
      this.httpServicios.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }
}
