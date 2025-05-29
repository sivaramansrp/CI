import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map
} from 'rxjs';

import {
  Acuicultura,

  DatosMercancia220203,

  EnviarDatos,

  FormularioMovilizacion,

  FormularioPago,
} from '../../models/220203/importacion-de-acuicultura.module';

import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';

import { RespuestaCatalogos, SeccionLibStore } from '@ng-mf/data-access-user';


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
  constructor(private readonly http: HttpClient, private readonly acuiculturaStore: AcuiculturaStore, private readonly seccionStore: SeccionLibStore) {
    // Constructor logic can be added here if needed
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
   * Actualiza el campo 'formaValida' en el store de acuicultura.
   * @param updatedFormaValida Los valores booleanos actualizados para 'formaValida'.
   * @description Esta función actualiza el estado de 'formaValida' en el store de acuicultura y, 
   * dependiendo del valor de todos los estados, actualiza las secciones y forma válida en el store.
   */
  public actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.acuiculturaStore.actualizarformaValida(updatedFormaValida);
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
   * @description Esta función obtiene los valores actuales de 'formaValida' del store de acuicultura 
   * y verifica si todos los valores son verdaderos.
   */
  public obtenerTodosLosStatus(): Observable<boolean> {
    return this.acuiculturaStore._select(state => state.formaValida).pipe(
      map((formaValida: EnviarDatos) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }




  /**
   * Restablecer el formulario a su estado inicial.
   */
  public limpiarFormulario(): void {
    this.acuiculturaStore.limpiarFormulario(); // Restablece todo el estado
  }

  /**
   * @description Obtiene los datos de acuicultura desde un archivo JSON local.
   * @returns Observable con los datos de acuicultura.
   */
  public getAcuiculturaData(): Observable<Acuicultura> {
    return this.http.get<Acuicultura>('assets/json/220203/acuicultura_forma.json');
  }

  /**
   * @description Actualiza el estado completo del formulario en el store de acuicultura.
   * @param DATOS Objeto de tipo Acuicultura con los datos a actualizar.
   */
  public actualizarEstadoFormulario(DATOS: Acuicultura): void {
    this.actualizarFormularioPago(DATOS.formularioPago);
    this.actualizarFormularioMovilizacion(DATOS.formularioMovilizacion);
    this.actualizarDatosMercancia(DATOS.datosMercancia);
    
  }

}