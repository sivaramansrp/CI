/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Inicializa los datos de los catálogos para el primer paso.
 *
 * Este método realiza solicitudes HTTP para obtener varios catálogos desde archivos JSON locales y asigna los datos recibidos a las propiedades correspondientes de la clase.
 * 
 * - `tiposSolicitud`: Obtiene los tipos de solicitud desde `tiposDeSolicitud.json`.
 * - `noDePermisocoferprise`: Obtiene los datos desde `noDePermisocoferprise.json`.
 * - `fraccionArancelaria`: Obtiene los datos desde `fraccionArancelaria.json`.
 * - `numeroCas`: Obtiene los datos desde `numeroCas.json`.
 * - `clasificacion`: Obtiene los datos desde `clasificacion.json`.
 * - `estadoFisico`: Obtiene los datos desde `estadoFisico.json`.
 * - `datosObjecto`: Obtiene los datos desde `datosObjecto.json`.
 * - `unidadDeMedida`: Obtiene los datos desde `unidadDeMedida.json`.
 */
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Solicitud230401State, Tramite230401Store } from '../estados/tramite230401.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PantallasActionService {
  // Las siguientes variables se utilizan en el componente paso uno datos solicitud
  tiposSolicitud: Catalogo[] = [];
  noDePermisocoferprise: Catalogo[] = [];
  fraccionArancelaria: Catalogo[] = [];
  numeroCas: Catalogo[] = [];
  clasificacion: Catalogo[] = [];
  estadoFisico: Catalogo[] = [];
  datosObjecto: Catalogo[] = [];
  unidadDeMedida: Catalogo[] = [];
 
  // Las siguientes variables se utilizan en el componente pago de derechos
  listoBanco: Catalogo[] = [];

  constructor(public httpServicios: HttpClient,
    public tramite230401Store: Tramite230401Store
  ) {
        // do nothing.
  }


  /**
   * Inicializa los datos de los catálogos necesarios para el paso uno.
   *
   * Este método realiza múltiples solicitudes a diferentes servicios para obtener datos de catálogos específicos.
   * Los datos obtenidos se asignan a las propiedades correspondientes para su uso posterior.
   *
   * Las solicitudes realizadas son:
   * - Tipos de solicitud
   * - Número de permiso coferprise
   * - Fracción arancelaria
   * - Número CAS
   * - Clasificación
   * - Estado físico
   * - Datos de objeto
   * - Unidad de medida
   */
  public inicializaPasoUnoDatosCatalogos(): void {
    /**
     * Obtiene los tipos de solicitud desde el catálogo y los asigna a `datosTiposSolicitud`.
     *
     * Este método realiza una solicitud al servicio `catalogosServices` para obtener el catálogo de tipos de solicitud identificado por `CATALOGOS_ID.CAT_TIPO_SOL`. Una vez que recibe la  respuesta, verifica si la respuesta contiene elementos. Si es así, asigna los datos recibidos a la propiedad `datosTiposSolicitud` con la estructura adecuada.
     */
    this.obtenerRespuestaPorUrl(this, 'tiposSolicitud', '/230401/tiposDeSolicitud.json');
    this.obtenerRespuestaPorUrl(this, 'noDePermisocoferprise', '/230401/noDePermisocoferprise.json');
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelaria', '/230401/fraccionArancelaria.json');
    this.obtenerRespuestaPorUrl(this, 'numeroCas', '/230401/numeroCas.json');
    this.obtenerRespuestaPorUrl(this, 'clasificacion', '/230401/clasificacion.json');
    this.obtenerRespuestaPorUrl(this, 'estadoFisico', '/230401/estadoFisico.json');
    this.obtenerRespuestaPorUrl(this, 'datosObjecto', '/230401/datosObjecto.json');
    this.obtenerRespuestaPorUrl(this, 'unidadDeMedida', '/230401/unidadDeMedida.json');
  }

  /**
   * Inicializa el catálogo de pago de derechos.
   * 
   * Este método obtiene la respuesta desde una URL específica y la asigna a la propiedad 'listoBanco'.
   * 
   * @returns {void}
   */
  inicializaPagoDerechosCatalogo():void {
    this.obtenerRespuestaPorUrl(this, 'listoBanco', '/230401/pagoDerechosBanco.json');
  }

  /**
   * Obtiene una respuesta desde una URL y asigna los datos a una variable.
   *
   * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
   * @param {string} url - La URL desde la cual se obtendrá la respuesta.
   * @param {Object} self - El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
   * @returns {void}
   * @author Muneez
   * @remarks
   * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
   * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
   * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
   */
  obtenerRespuestaPorUrl(self: any, variable: string, url: string) :void {
    if (self && variable && url) {
      this.httpServicios.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }

/**
 * Actualiza el estado del formulario con los datos proporcionados.
 * 
 * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
actualizarEstadoFormulario(DATOS: Solicitud230401State): void {
  // this.tramite230401Store.setTipoSolicitud(DATOS.tipoSolicitud);
  this.tramite230401Store.update((state) => ({
    ...state,
    ...DATOS
  }))

}

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud230401State> {
  return this.httpServicios.get<Solicitud230401State>('assets/json/230401/respuestaDeActualizacionDe.json');
}

}
