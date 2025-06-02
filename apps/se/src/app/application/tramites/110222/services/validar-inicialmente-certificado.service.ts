import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.module';
import { Observable, map } from 'rxjs';
import { Tramite110222State, Tramite110222Store } from '../estados/tramite110222.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class ValidarInicialmenteCertificadoService {
  url: string = '../../../../../assets/json/110222/';

  constructor(private readonly http: HttpClient, public tramite110222Store: Tramite110222Store) { }

  /**
   * @description Obtiene un arreglo de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Catalogo`.
   * @method obtenerMenuDesplegable
   * @memberof CertificadoDeService
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.CertificadoDeService.obtenerMenuDesplegable('menu.json').subscribe(menu => {
   *   console.log(menu);
   * });
   * ```
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @description Obtiene un arreglo de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Mercancia`.
   * @method obtenerTablaDatos
   * @memberof CertificadoDeService
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   * 
   * Ejemplo:
   * ```typescript
   * this.CertificadoDeService.obtenerTablaDatos('data.json').subscribe(data => {
   *   console.log(data);
   * });
   * ```
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    return this.http.get<Mercancia[]>(JSON_URL);
  }
  /**
   * Obtiene la lista de productores/exportadores disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de productores/exportadores desde un archivo JSON.
   * 
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110222/productor-exportador.json');
  }


  /**
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * 
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   * 
   * @command Este método realiza una solicitud HTTP GET para obtener los datos de mercancías.
   */
  obtenerMercancia(): Observable<MercanciasHistorico> {
    return this.http
      .get<MercanciasHistorico>('assets/json/110222/mercancias-seleccionadas.json');
  }
  /**
 * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
 * 
 * @returns Observable con los datos del estado de la solicitud `Tramite110222State`,
 *          cargados desde el archivo JSON especificado en la ruta de `assets`.
 */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110222State> {
    return this.http.get<Tramite110222State>('assets/json/110222/datos-prefill.json');
  }


  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param DATOS - Estado de la solicitud `Tramite110222State` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite110222State): void {
    this.tramite110222Store.update((state) => ({
      ...state,
      ...DATOS
    }))

  }
}