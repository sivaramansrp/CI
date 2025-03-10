import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  Acuicultura,
  DatosMercancia220203,
  FormularioMovilizacion,
  FormularioPago
} from '../../models/220203/importacion-de-acuicultura.module';

import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';

import { RespuestaCatalogos } from '@ng-mf/data-access-user';


/**
 * @description Servicio para la importación de acuicultura, encargado de obtener datos de catálogos.
 */
@Injectable({
  providedIn: 'root'
})
export class ImportacionDeAcuiculturaService {
  /**
   * @description URL base para los archivos JSON de catálogos.
   */
  url: string = 'assets/json/220203/';

  /**
   * @description Constructor del servicio.
   * @param http Cliente HTTP para realizar las peticiones.
   */
  constructor(private readonly http: HttpClient, private readonly acuiculturaStore: AcuiculturaStore) {
    console.log('ImportacionDeAcuiculturaService');
  }

  /**
   * @description Obtiene los detalles de un catálogo desde un archivo JSON.
   * @param nombreDelArchivo Nombre del archivo JSON del catálogo.
   * @returns Observable con la respuesta del catálogo.
   */
  obtenerDetallesDelCatalogo(nombreDelArchivo: string) {
    const BASEURL: string = this.url + nombreDelArchivo; // CamelCase variable name
    return this.http.get<RespuestaCatalogos>(BASEURL);
  }
  /**
   * Obtener todos los datos del estado de Acuicultura.
   * @returns Observable con el estado completo.
   */
  public obtenerDatos(): Observable<Acuicultura> {
    return this.acuiculturaStore._select(state => state); // Devuelve el estado completo
  }
  /**
  * Actualizar el formulario de pago en el store.
  * @param formularioPago Datos del formulario de pago.
  */
  public actualizarFormularioPago(formularioPago: FormularioPago): void {
    this.acuiculturaStore.actualizarFormularioPago(formularioPago); // Actualiza solo el formularioPago
  }

  /**
   * Actualizar el formulario de movilización en el store.
   * @param formularioMovilizacion Datos del formulario de movilización.
   */
  public actualizarFormularioMovilizacion(formularioMovilizacion: FormularioMovilizacion): void {
    this.acuiculturaStore.actualizarFormularioMovilizacion(formularioMovilizacion); // Actualiza solo el formularioMovilizacion
  }

  /**
   * Actualizar los datos de mercancía en el store.
   * @param datosMercancia Datos de mercancía.
   */
  public actualizarDatosMercancia(datosMercancia: DatosMercancia220203): void {
    this.acuiculturaStore.actualizarDatosMercancia(datosMercancia); // Actualiza solo los datosMercancia
  }
  /**
   * Actualizar los datos de mercancía en el store.
   * @param datosMercancia Datos de mercancía.
   */
  /**
   * Updates the 'formaValida' field in the store.
   * @param updatedFormaValida The updated boolean values for 'formaValida'.
   */
  public actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.acuiculturaStore.actualizarformaValida(updatedFormaValida);
  }



  /**
   * Restablecer el formulario a su estado inicial.
   */
  public limpiarFormulario(): void {
    this.acuiculturaStore.limpiarFormulario(); // Restablece todo el estado
  }
}