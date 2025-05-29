import {
  Catalogo,
  RespuestaCatalogos,
  SeccionLibStore
} from '@ng-mf/data-access-user';

import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { URL } from '../../constantes/220202/fitosanitario.enums';

import { FitosanitarioStore } from '../../estados/fitosanitario.store';

import {
  DatosForma,
  FinalEnviar,
  ListaDeDatosFinal,
  Movilizacion,
  PagoForm
} from '../../models/220202/fitosanitario.model';

@Injectable({
  providedIn: 'root'
})
export class AgriculturaApiService {
  
  /** @description URL base para las peticiones a los catálogos y datos. */
  url: string = URL;

  /**
   * @constructor
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP.
   * @param {SeccionLibStore} seccionStore - Store para el manejo del estado de las secciones.
   * @param {FitosanitarioStore} fitosanitarioStore - Store para el manejo del estado de los formularios fitosanitarios.
   */
  constructor(
    private readonly http: HttpClient,
    private readonly seccionStore: SeccionLibStore,
    private readonly fitosanitarioStore: FitosanitarioStore
  ) {
    // Constructor logic can be added here if needed
  }

  /**
   * @description Obtiene la lista de catálogos a partir de un archivo.
   * @param {string} fileName - Nombre del archivo de catálogo.
   * @returns {Observable<Catalogo[]>} Observable con la lista de catálogos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @description Actualiza los datos del formulario principal en el store.
   * @param {DatosForma} datosForma - Datos del formulario principal.
   */
  updateDatosForma(datosForma: DatosForma): void {
    this.fitosanitarioStore.actualizarDatosForma(datosForma);
  }

  /**
   * @description Actualiza los datos de movilización en el store.
   * @param {Movilizacion} movilizacion - Datos de movilización.
   */
  updateMovilizacion(movilizacion: Movilizacion): void {
    this.fitosanitarioStore.actualizarMovilizacion(movilizacion);
  }

  /**
   * @description Actualiza los datos de pago en el store.
   * @param {PagoForm} pagoDatos - Datos del formulario de pago.
   */
  updatePago(pagoDatos: PagoForm): void {
    this.fitosanitarioStore.actualizarPago(pagoDatos);
  }

  /**
   * @description Limpia todos los datos del formulario en el store.
   */
  limpiarFormulario(): void {
    this.fitosanitarioStore.limpiarFormulario();
  }

  /**
   * @description Obtiene los datos del formulario principal como observable.
   * @returns {Observable<DatosForma>} Observable con los datos del formulario principal.
   */
  getDatosForma(): Observable<DatosForma> {
    return this.fitosanitarioStore._select(state => state.datos); // Use _select for observable
  }

  /**
   * @description Obtiene los datos del formulario de pago como observable.
   * @returns {Observable<PagoForm>} Observable con los datos del formulario de pago.
   */
  getPagoForma(): Observable<PagoForm> {
    return this.fitosanitarioStore._select(state => state.pago); // Use _select for observable
  }

  /**
   * @description Obtiene los datos de movilización como observable.
   * @returns {Observable<Movilizacion>} Observable con los datos de movilización.
   */
  getMovilizacion(): Observable<Movilizacion> {
    return this.fitosanitarioStore._select(state => state.movilizacion); // Use _select for observable
  }

  /**
   * @description Obtiene todos los datos del formulario como observable.
   * @returns {Observable<ListaDeDatosFinal>} Observable con todos los datos del formulario.
   */
  getAllDatosForma(): Observable<ListaDeDatosFinal> {
    return this.fitosanitarioStore._select(state => state); // Select the entire state
  }

  /**
   * @description Actualiza el estado de validez de las secciones del formulario.
   * También actualiza el estado global de la sección y su validez.
   * @param {{ [key: string]: boolean }} updatedFormaValida - Objeto con el estado de validez de cada sección.
   */
  actualizarFormaValida(updatedFormaValida: { [key: string]: boolean }): void {
    this.fitosanitarioStore.actualizarformaValida(updatedFormaValida);
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
   * @description Verifica si todas las secciones del formulario son válidas.
   * @returns {Observable<boolean>} Observable que emite true si todas las secciones son válidas, false en caso contrario.
   */
  obtenerTodosLosStatus(): Observable<boolean> {
    return this.fitosanitarioStore._select(state => state.finalEnviar).pipe(
      map((formaValida: FinalEnviar) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }

  /**
   * @description Actualiza el estado completo del formulario en el store.
   * @param {ListaDeDatosFinal} DATOS - Objeto con todos los datos del formulario.
   */
  actualizarEstadoFormulario(DATOS: ListaDeDatosFinal): void {
    this.fitosanitarioStore.actualizarDatosForma(DATOS.datos);
    this.fitosanitarioStore.actualizarMovilizacion(DATOS.movilizacion);
    this.fitosanitarioStore.actualizarPago(DATOS.pago);
  }

  /**
   * @description Obtiene los datos de la solicitud desde un archivo JSON local.
   * @returns {Observable<ListaDeDatosFinal>} Observable con los datos de la solicitud.
   */
  getDatosDeLaSolicitudData(): Observable<ListaDeDatosFinal> {
    return this.http.get<ListaDeDatosFinal>('assets/json/220202/datos-de-la-solicitud.json');
  }

}