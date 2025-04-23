import { Observable, catchError, of } from 'rxjs';
import { CatalogoResponse } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaFusionEscisionDTO } from '../models/avisomodify.model';
import { TableDataNgTable } from '../models/avisomodify.model';

@Injectable({
  providedIn: 'any', // El servicio está disponible en toda la aplicación.
})
export class AvisoModifyService {
  constructor(private http: HttpClient) {
    // Constructor para la inyección de dependencias (HttpClient)
  }

  // URLs para los archivos JSON
  private jsonUrl = 'assets/json/32301';
  private jsonLkURl = 'assets/json/31601';
  private fileName = 'tipoDeAviso.json';
  private personaFusionEscision = 'personaFusionEscision.json';
  private selectRangoDias = 'selectRangoDias.json';
  private adicianFraccionOption = 'adicianFraccionOption.json';
  private adicianFraccionNicoModOptions = 'adicianFraccionNicoModOptions.json';
  private adicianFraccionUnidadMedidaModOption =
    'adicianFraccionUnidadMedidaModOption.json';
  private adicianFraccionActivRelProcModOption =
    'adicianFraccionActivRelProcModOption.json';
  private capacidadAlmacenamiento = 'fusionOEscision.json';
  private entidadFederativa = 'entidadFederative.json';
  private gridDomiciliosModificados = 'gridDomiciliosModificados.json';
  private gridMostrarGridModificado = 'gridMostrarGridModificado.json';
  private enSuCaracterDe = 'enSuCaracterDe.json';
  private nacionalidad = 'nacionalidad.json';
  private preOperativo = 'preOperativo.json';
  private gridMiembrosEmpresas = 'gridMiembrosEmpresas.json';
  private seccionMiembrosRevocados = 'seccionMiembrosRevocados.json';
  private adicianFraccioncveFraccionCorrelacionModOption =
    'adicianFraccioncveFraccionCorrelacionModOption.json';
  private subFusionOescision = 'subFusionOescision.json';
  /**
   * Método para obtener el tipo de aviso desde un archivo JSON.
   * Se realiza una solicitud HTTP y se maneja cualquier error que pueda ocurrir.
   *
   * @returns Un `Observable` que contiene los datos del aviso en formato `CatalogoResponse`.
   */
  getAvisoModify(): Observable<CatalogoResponse> {
    /**
     * Realiza una solicitud HTTP para obtener los datos del tipo de aviso desde el archivo JSON.
     */
    return this.http
      .get<CatalogoResponse>(`${this.jsonUrl}/${this.fileName}`)
      .pipe(
        /**
         * Captura errores que puedan ocurrir durante la solicitud HTTP y los maneja.
         */
        catchError((error) => {
          /**
           * Registra el error en la consola para su análisis.
           */
          console.error('Error fetching data from:', this.jsonUrl, error);

          /**
           * Retorna un objeto por defecto en caso de error para evitar que la aplicación falle.
           */
          return of({
            id: 0,
            descripcion: '',
            code: 0,
            data: [],
            message: 'Respuesta por defecto debido a un error',
          } as unknown as CatalogoResponse);
        })
      );
  }

  /**
   * Método para cargar datos de una persona involucrada en un proceso de fusión o escisión.
   * Se realiza una solicitud HTTP al archivo JSON correspondiente y se maneja cualquier posible error.
   *
   * @returns Un `Observable` con los datos de la persona en formato `PersonaFusionEscisionDTO`.
   */
  cargarDatosPersonaFusion(): Observable<PersonaFusionEscisionDTO> {
    /**
     * Realiza una solicitud HTTP para obtener los datos desde el archivo JSON.
     */
    return this.http
      .get<PersonaFusionEscisionDTO>(
        `${this.jsonUrl}/${this.personaFusionEscision}`
      )
      .pipe(
        /**
         * Captura errores que puedan ocurrir durante la solicitud HTTP y los maneja.
         */
        catchError((error) => {
          /**
           * Registra el error en la consola para facilitar su análisis y depuración.
           */
          console.error('Error fetching data from:', this.jsonUrl, error);

          /**
           * Retorna un objeto por defecto en caso de error, evitando fallos en la aplicación.
           */
          return of({
            id: 0,
            descripcion: '',
            code: 0,
            data: [],
            message: 'Respuesta por defecto debido a un error',
          } as unknown as PersonaFusionEscisionDTO);
        })
      );
  }

  /**
   * Método para obtener los datos de la tabla de subfusión o escisión.
   * Realiza una solicitud HTTP para recuperar la información desde un archivo JSON.
   *
   * @returns Un `Observable` que contiene los datos de la tabla en formato `TableDataNgTable`.
   */
  gridsubFusionOescision(): Observable<TableDataNgTable> {
    /**
     * Realiza una solicitud HTTP para obtener los datos desde el archivo JSON correspondiente.
     */
    return this.http.get<TableDataNgTable>(
      `${this.jsonUrl}/${this.subFusionOescision}`
    );
  }

  /**
   * Método para obtener el rango de días desde un archivo JSON.
   * Se realiza una solicitud HTTP para recuperar la información almacenada.
   *
   * @returns Un `Observable` con un array de cadenas que representan los rangos de días disponibles.
   */
  getSelectRangoDias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}/${this.selectRangoDias}`);
  }

  /**
   * Método para obtener las opciones de fracción adicional desde un archivo JSON.
   * Se consulta un recurso externo y se devuelve la información en formato de arreglo de cadenas.
   *
   * @returns Un `Observable` con un array de cadenas que contienen las opciones de fracción adicional.
   */
  getAdicianFraccionOption(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.adicianFraccionOption}`
    );
  }

  /**
   * Obtiene las opciones de modificación de clave nacional única desde la URL JSON.
   * Se consulta la información almacenada y se retorna un `Observable` con los datos disponibles.
   *
   * @returns Un `Observable` con un array de cadenas que contienen las opciones de modificación de clave nacional única.
   */
  getAdicianFraccionNicoModOptions(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.adicianFraccionNicoModOptions}`
    );
  }
  /**
   * Método para obtener las opciones de modificación de unidad de medida desde un archivo JSON.
   * Se consulta la información almacenada y se retorna un `Observable` con los datos disponibles.
   *
   * @returns Un `Observable` con un array de cadenas que contienen las opciones de modificación de unidad de medida.
   */
  getAdicianFraccionUnidadMedidaModOption(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.adicianFraccionUnidadMedidaModOption}`
    );
  }

  /**
   * Método para obtener las opciones de modificación de actividad relacionada con el proceso desde un archivo JSON.
   * Se consulta la información almacenada y se retorna un `Observable` con los datos disponibles.
   *
   * @returns Un `Observable` con un array de cadenas que contienen las opciones de modificación de actividad relacionada con el proceso.
   */
  getAdicianFraccionActivRelProcModOption(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.adicianFraccionActivRelProcModOption}`
    );
  }
  /**
   * Método para obtener las opciones de modificación de la clave de fracción de correlación desde un archivo JSON.
   * Realiza una solicitud HTTP y retorna un `Observable` con un array de cadenas que contienen las opciones disponibles.
   *
   * @returns Un `Observable` con los datos de las opciones de modificación de la clave de fracción de correlación.
   */
  getAdicianFraccioncveFraccionCorrelacionModOption(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.adicianFraccioncveFraccionCorrelacionModOption}`
    );
  }

  /**
   * Método para obtener la capacidad de almacenamiento desde un archivo JSON.
   * Se consulta la información disponible y se retorna un `Observable` con los datos en formato de arreglo de cadenas.
   *
   * @returns Un `Observable` con los datos de capacidad de almacenamiento.
   */
  getCapacidadAlmacenamiento(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonUrl}/${this.capacidadAlmacenamiento}`
    );
  }

  /**
   * Método para obtener las entidades federativas desde un archivo JSON.
   * Se consulta la información almacenada en otro recurso (`jsonLkURl`) y se retorna un `Observable` con los datos disponibles.
   *
   * @returns Un `Observable` con las entidades federativas disponibles en el sistema.
   */
  getEntidadFederativa(): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.jsonLkURl}/${this.entidadFederativa}`
    );
  }
  /**
   * Método para obtener la tabla de domicilios modificados desde un archivo JSON.
   * Realiza una solicitud HTTP para recuperar la información de domicilios previamente modificados.
   *
   * @returns Un `Observable` que contiene los datos de la tabla en formato `TableDataNgTable`.
   */
  getGridDomiciliosModificados(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(
      `${this.jsonUrl}/${this.gridDomiciliosModificados}`
    );
  }

  /**
   * Método para obtener la tabla de grid de elementos modificados desde un archivo JSON.
   * Recupera información sobre modificaciones realizadas en distintos registros del sistema.
   *
   * @returns Un `Observable` que contiene los datos de los elementos modificados en formato `TableDataNgTable`.
   */
  getGridMostrarGridModificado(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(
      `${this.jsonUrl}/${this.gridMostrarGridModificado}`
    );
  }

  /**
   * Método para obtener las opciones disponibles para el carácter de una persona dentro de un proceso.
   * Consulta la información desde un recurso JSON y retorna los datos en un formato de arreglo de cadenas.
   *
   * @returns Un `Observable` con un array de cadenas que representan las opciones de carácter.
   */
  getEnSuCaracterDe(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.enSuCaracterDe}`);
  }

  /**
   * Método para obtener las opciones de nacionalidad disponibles desde un archivo JSON.
   * Consulta los datos desde un recurso externo y retorna la lista de nacionalidades posibles.
   *
   * @returns Un `Observable` con un array de cadenas que contienen las opciones de nacionalidad.
   */
  getNacionalidad(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.nacionalidad}`);
  }
  /**
   * Método para obtener las opciones pre-operativas desde un archivo JSON.
   * Consulta los datos almacenados y retorna un `Observable` con las opciones disponibles.
   *
   * @returns Un `Observable` con un array de cadenas que representan las opciones pre-operativas.
   */
  getPreOperativo(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.preOperativo}`);
  }

  /**
   * Método para obtener la tabla de miembros de empresas desde un archivo JSON.
   * Realiza una solicitud HTTP para recuperar la información sobre los miembros registrados.
   *
   * @returns Un `Observable` que contiene los datos de la tabla en formato `TableDataNgTable`.
   */
  getGridMiembrosEmpresas(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(
      `${this.jsonUrl}/${this.gridMiembrosEmpresas}`
    );
  }

  /**
   * Método para obtener la tabla de miembros revocados desde un archivo JSON.
   * Recupera información sobre aquellos miembros que han sido revocados dentro del sistema.
   *
   * @returns Un `Observable` que contiene los datos de los miembros revocados en formato `TableDataNgTable`.
   */
  getSeccionMiembrosRevocados(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(
      `${this.jsonUrl}/${this.seccionMiembrosRevocados}`
    );
  }
}
