import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaFusionEscisionDTO } from '../models/avisomodify.model';
import { TableDataNgTable } from '../models/avisomodify.model';
import { catalogoResponse } from '@ng-mf/data-access-user';

@Injectable({
  providedIn: 'any' // El servicio está disponible en toda la aplicación.
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
  private adicianFraccionUnidadMedidaModOption = 'adicianFraccionUnidadMedidaModOption.json';
  private adicianFraccionActivRelProcModOption = 'adicianFraccionActivRelProcModOption.json'
  private capacidadAlmacenamiento = 'fusionOEscision.json';
  private entidadFederativa = 'entidadFederative.json';
  private gridDomiciliosModificados = 'gridDomiciliosModificados.json';
  private gridMostrarGridModificado = 'gridMostrarGridModificado.json';
  private enSuCaracterDe = 'enSuCaracterDe.json';
  private nacionalidad = 'nacionalidad.json';
  private preOperativo = 'preOperativo.json';
  private gridMiembrosEmpresas = 'gridMiembrosEmpresas.json';
  private seccionMiembrosRevocados = 'seccionMiembrosRevocados.json';
 private adicianFraccioncveFraccionCorrelacionModOption = 'adicianFraccioncveFraccionCorrelacionModOption.json';
 private subFusionOescision = 'subFusionOescision.json'
  /** Método para obtener el tipo de aviso */
  getAvisoModify(): Observable<catalogoResponse> {
    return this.http.get<catalogoResponse>(`${this.jsonUrl}/${this.fileName}`).pipe(
      catchError(error => {
        console.error('Error fetching data from:', this.jsonUrl, error);
        return of({ id: 0, descripcion: '', code: 0, data: [], message: 'Respuesta por defecto debido a un error' } as unknown as catalogoResponse);
      })
    );
  }

  /** Método para cargar datos de persona de fusión o escisión */
  cargarDatosPersonaFusion(): Observable<PersonaFusionEscisionDTO> {
    return this.http.get<PersonaFusionEscisionDTO>(`${this.jsonUrl}/${this.personaFusionEscision}`).pipe(
      catchError(error => {
        console.error('Error fetching data from:', this.jsonUrl, error);
        return of({ id: 0, descripcion: '', code: 0, data: [], message: 'Respuesta por defecto debido a un error' } as unknown as PersonaFusionEscisionDTO);
      })
    );
  }


  gridsubFusionOescision(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(`${this.jsonUrl}/${this.subFusionOescision}`);
  }


  /** Método para obtener el rango de días */
  getSelectRangoDias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}/${this.selectRangoDias}`);
  }

  /** Método para obtener las opciones de fracción adicional */
  getAdicianFraccionOption(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}/${this.adicianFraccionOption}`);
  }

 /**
 * Obtiene las opciones de modificación de clave nacional única desde la URL JSON.
 * Retorna un Observable con un array de cadenas.
 */
getAdicianFraccionNicoModOptions(): Observable<string[]> {
  return this.http.get<string[]>(`${this.jsonUrl}/${this.adicianFraccionNicoModOptions}`);
}

/**
 * Obtiene las opciones de modificación de unidad de medida desde la URL JSON.
 * Retorna un Observable con un array de cadenas.
 */
getAdicianFraccionUnidadMedidaModOption(): Observable<string[]> {
  return this.http.get<string[]>(`${this.jsonUrl}/${this.adicianFraccionUnidadMedidaModOption}`);
}

/**
 * Obtiene las opciones de modificación de actividad relacionada con el proceso desde la URL JSON.
 * Retorna un Observable con un array de cadenas.
 */
getAdicianFraccionActivRelProcModOption(): Observable<string[]> {
  return this.http.get<string[]>(`${this.jsonUrl}/${this.adicianFraccionActivRelProcModOption}`);
}

/**
 * Obtiene las opciones de modificación de la clave de fracción de correlación desde la URL JSON.
 * Retorna un Observable con un array de cadenas.
 */
getAdicianFraccioncveFraccionCorrelacionModOption(): Observable<string[]> {
  return this.http.get<string[]>(`${this.jsonUrl}/${this.adicianFraccioncveFraccionCorrelacionModOption}`);
}

  /** Método para obtener la capacidad de almacenamiento */
  getCapacidadAlmacenamiento(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonUrl}/${this.capacidadAlmacenamiento}`);
  }

  /** Método para obtener las entidades federativas */
  getEntidadFederativa(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.entidadFederativa}`);
  }

  /** Método para obtener la tabla de domicilios modificados */
  getGridDomiciliosModificados(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(`${this.jsonUrl}/${this.gridDomiciliosModificados}`);
  }

  /** Método para obtener la tabla de grid de elementos modificados */
  getGridMostrarGridModificado(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(`${this.jsonUrl}/${this.gridMostrarGridModificado}`);
  }

  /** Método para obtener las opciones de carácter de */
  getEnSuCaracterDe(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.enSuCaracterDe}`);
  }

  /** Método para obtener la nacionalidad */
  getNacionalidad(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.nacionalidad}`);
  }

  /** Método para obtener las opciones pre-operativas */
  getPreOperativo(): Observable<string[]> {
    return this.http.get<string[]>(`${this.jsonLkURl}/${this.preOperativo}`);
  }

  /** Método para obtener la tabla de miembros de empresas */
  getGridMiembrosEmpresas(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(`${this.jsonUrl}/${this.gridMiembrosEmpresas}`);
  }

  /** Método para obtener la tabla de miembros revocados */
  getSeccionMiembrosRevocados(): Observable<TableDataNgTable> {
    return this.http.get<TableDataNgTable>(`${this.jsonUrl}/${this.seccionMiembrosRevocados}`);
  }
}
