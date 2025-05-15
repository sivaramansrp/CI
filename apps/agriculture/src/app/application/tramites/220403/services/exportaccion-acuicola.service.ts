/**
 * @@Injectable
 * @description Servicio para obtener los datos del permiso IMMEX.
 */
import { Catalogo, LabelValueDatos, RespuestaCatalogos, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { FormularioGrupo } from '../models/acuicola.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tramite220403Query } from '../estados/tramite220403.query';
import { Tramite220403Store } from '../estados/tramite220403.store';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExportaccionAcuicolaService {
  /**
   * @property {string} jsonUrl - URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = 'assets/json/220403';

  private destroyNotifier$: Subject<void> = new Subject();

  private TramiteState!: FormularioGrupo;

  private seccionState!: SeccionLibState
  /**
   * @constructor
   * @param {HttpClient} httpClient - Cliente HTTP para realizar solicitudes.
   */
  constructor(private httpClient: HttpClient, 
    private store: Tramite220403Store,
    private query: Tramite220403Query,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery) {
    this.initializeService();
  }

  private initializeService(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.query.selectTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.TramiteState = state as FormularioGrupo;
        })
      )
      .subscribe();
  }
  /**
   * @method getDatos
   * @description Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @returns {Observable<any[]>} Observable con los datos del permiso IMMEX.
   */

  getDatos(fileName: string): Observable<LabelValueDatos[]> {
    return this.httpClient.get<LabelValueDatos[]>(`${this.jsonUrl}/${fileName}`).pipe(
      map((response: LabelValueDatos[]) => {
        return response.map((item: LabelValueDatos) => ({
          label: item.label,
          value: item.value
        }));
      }),
      catchError(error => {
        console.error('Error fetching data from:', this.jsonUrl, error);
        return of([]);
      })
    );
  }

  /**
   * Obtiene la lista de bancos.
   * @returns Observable de la lista de bancos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASEURL = this.jsonUrl + '/' + fileName + '.json';
    return this.httpClient.get<RespuestaCatalogos>(BASEURL).pipe(
      map(response => response.data)
    );
    
  }

  actualizarFormaValida(): void {
      if (this.TramiteState.datosRealizarValidada === true && 
        this.TramiteState.combinacionRequeridaValidada === true && 
        this.TramiteState.transporteValidada === true && 
        this.TramiteState.pagoDerechosValidada === true) {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([true]);
      } else {
        this.seccionStore.establecerSeccion([true]);
        this.seccionStore.establecerFormaValida([false]);
      }
  }

  
}
