import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { URL } from '../../constantes/fitosanitario.enum';

import { Catalogo, RespuestaCatalogos, SeccionLibStore } from '@libs/shared/data-access-user/src';

import { FitosanitarioStore } from '../../estados/fitosanitario.store';

import { FinalDataToSend, MercanciaForm } from '../../models/fitosanitario.model';


@Injectable({
  providedIn: 'root'
})
export class DatosMercanciaService {
  url: string = URL;
  constructor(private readonly http: HttpClient,
    private readonly seccionStore: SeccionLibStore,
    private readonly fitosanitarioStore: FitosanitarioStore
  ) {
    // Constructor logic can be added here if needed
  }
  obtenerSelectorList(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
  }
  /**
    * Actualizar el formulario de movilización en el store.
    * @param formularioMovilizacion Datos del formulario de movilización.
    */
  public actualizarFormularioMovilizacion(formularioMovilizacion: MercanciaForm[]): void {
    this.fitosanitarioStore.actualizarDatosForma(formularioMovilizacion);
  }
  /**
    * Actualizar el formulario de movilización en el store.
    * @param formularioMovilizacion Datos del formulario de movilización.
    */
  public eliminarDatoPorId(id: number): void {
    this.fitosanitarioStore.eliminarDatoPorId(id);
  }
  public obtenerDatos(): Observable<FinalDataToSend> {
    return this.fitosanitarioStore._select(state => state); // Devuelve el estado completo
  }
  public botonDesactivarCampos(status: boolean): void {
    this.seccionStore.establecerSeccion([true]);
    this.seccionStore.establecerFormaValida([status]);
  }





}
