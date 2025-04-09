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


  // eslint-disable-next-line class-methods-use-this
  convertirNumeroALetras(num: number): string {
    const UNIDADES = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const ESPECIALES = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince'];
    const DECENAS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  
    if (num === 0) {return 'cero'}
    if (num === 100) {return 'cien'}
  
    let letras = '';
  
    const C = Math.floor(num / 100);
    const D = Math.floor((num % 100) / 10);
    const U = num % 10;
    const DOS_DIGITOS = num % 100;
  
    if (C > 0) {
      letras += CENTENAS[C] + ' ';
    }
  
    if (DOS_DIGITOS < 10) {
      letras += UNIDADES[DOS_DIGITOS];
    } else if (DOS_DIGITOS >= 10 && DOS_DIGITOS < 16) {
      letras += ESPECIALES[DOS_DIGITOS - 10];
    } else if (DOS_DIGITOS < 30) {
      letras += 'veinti' + UNIDADES[U];
    } else {
      letras += DECENAS[D];
      if (U > 0) {
        letras += ' y ' + UNIDADES[U];
      }
    }
  
    return letras.trim();
  }
}
