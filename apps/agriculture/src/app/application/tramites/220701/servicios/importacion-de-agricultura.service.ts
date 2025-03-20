import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs';

import { Agricultura } from '../modelos/importacion-de-acuicultura.module';
import { DatosMercancia220701 } from '../modelos/importacion-de-acuicultura.module';
import { EnviarDatos } from '../modelos/importacion-de-acuicultura.module';
import { FormularioMovilizacion } from '../modelos/importacion-de-acuicultura.module';
import { FormularioPago } from '../modelos/importacion-de-acuicultura.module';

import { AgriculturaStore } from '../estados/sanidad-certificado.store';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';


/**
 * @description Servicio para la importación de Agricultura, encargado de obtener datos de catálogos.
 */
@Injectable({
  providedIn: 'root'
})
export class ImportacionDeAcuiculturaService {
  /**
   * @description URL base para los archivos JSON de catálogos.
   */
  url: string = 'assets/json/220701/';

  /**
   * @description Constructor del servicio.
   * @param http Cliente HTTP para realizar las peticiones.
   */
  constructor(private readonly http: HttpClient, private readonly agriculturaStore: AgriculturaStore, private readonly seccionStore: SeccionLibStore) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @description Obtiene los detalles de un catálogo desde un archivo JSON.
   * @param nombreDelArchivo Nombre del archivo JSON del catálogo.
   * @returns Observable con la respuesta del catálogo.
   */
  obtenerDetallesDelCatalogo(nombreDelArchivo: string): Observable<RespuestaCatalogos> {
    const BASEURL: string = this.url + nombreDelArchivo; 
    return this.http.get<RespuestaCatalogos>(BASEURL);
  }
  /**
   * Obtener todos los datos del estado de Agricultura.
   * @returns Observable con el estado completo.
   * 
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public obtenerDatos(): Observable<Agricultura> {
    return this.agriculturaStore._select((state: any) => state); // Devuelve el estado completo
  }
  /**
  * Actualizar el formulario de pago en el store.
  * @param formularioPago Datos del formulario de pago.
  */
  public actualizarFormularioPago(formularioPago: FormularioPago): void {
    this.agriculturaStore.actualizarFormularioPago(formularioPago); // Actualiza solo el formularioPago
  }

  /**
   * Actualizar el formulario de movilización en el store.
   * @param formularioMovilizacion Datos del formulario de movilización.
   */
  public actualizarFormularioMovilizacion(formularioMovilizacion: FormularioMovilizacion): void {
    this.agriculturaStore.actualizarFormularioMovilizacion(formularioMovilizacion); // Actualiza solo el formularioMovilizacion
  }

  /**
   * Actualizar los datos de mercancía en el store.
   * @param datosMercancia Datos de mercancía.
   */
  public actualizarDatosMercancia(datosMercancia: DatosMercancia220701): void {
    this.agriculturaStore.actualizarDatosMercancia(datosMercancia); // Actualiza solo los datosMercancia
  }
  /**
   * Actualizar los datos de mercancía en el store.
   * @param datosMercancia Datos de mercancía.
   */
  /**
   * Actualiza el campo 'formaValida' en el store de Agricultura.
   * @param updatedFormaValida Los valores booleanos actualizados para 'formaValida'.
   * @description Esta función actualiza el estado de 'formaValida' en el store de Agricultura y, 
   * dependiendo del valor de todos los estados, actualiza las secciones y forma válida en el store.
   */
  public actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.agriculturaStore.actualizarformaValida(updatedFormaValida);
    this.obtenerTodosLosStatus().subscribe((result: boolean) => {
      if (result) {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([true]);
      } else {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([false]);
      }
    });
  }
  /**
   * Obtiene el estado actualizado de la forma válida.
   * @returns Observable<boolean> Devuelve un observable con el valor booleano que indica si todos los valores de 'formaValida' son verdaderos.
   * @description Esta función obtiene los valores actuales de 'formaValida' del store de Agricultura 
   * y verifica si todos los valores son verdaderos.
   */
  public obtenerTodosLosStatus(): Observable<boolean> {
    return this.agriculturaStore._select((state: { formaValida: any; }) => state.formaValida).pipe(
      map((formaValida: EnviarDatos) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }




  /**
   * Restablecer el formulario a su estado inicial.
   */
  public limpiarFormulario(): void {
    this.agriculturaStore.limpiarFormulario(); // Restablece todo el estado
  }
}