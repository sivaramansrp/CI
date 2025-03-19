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
  url: string = URL;
  constructor(private readonly http: HttpClient,
    private readonly seccionStore: SeccionLibStore,
    private readonly fitosanitarioStore: FitosanitarioStore
  ) {
    // Constructor logic can be added here if needed
  }
  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }

  updateDatosForma(datosForma: DatosForma): void {
    this.fitosanitarioStore.actualizarDatosForma(datosForma);
  }
  updateMovilizacion(movilizacion: Movilizacion): void {
    this.fitosanitarioStore.actualizarMovilizacion(movilizacion);
  }
  updatePago(pagoDatos: PagoForm): void {
    this.fitosanitarioStore.actualizarPago(pagoDatos);
  }
  limpiarFormulario(): void {
    this.fitosanitarioStore.limpiarFormulario();
  }

  getDatosForma(): Observable<DatosForma> {
    return this.fitosanitarioStore._select(state => state.datos); // Use _select for observable
  }
  getPagoForma(): Observable<PagoForm> {
    return this.fitosanitarioStore._select(state => state.pago); // Use _select for observable
  }
  getMovilizacion(): Observable<Movilizacion> {
    return this.fitosanitarioStore._select(state => state.movilizacion); // Use _select for observable
  }
  getAllDatosForma(): Observable<ListaDeDatosFinal> {
    return this.fitosanitarioStore._select(state => state); // Select the entire state
  }

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

  obtenerTodosLosStatus(): Observable<boolean> {
    return this.fitosanitarioStore._select(state => state.finalEnviar).pipe(
      map((formaValida: FinalEnviar) => {
        return Object.values(formaValida).every(value => value === true);
      })
    );
  }



}