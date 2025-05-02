import { AgenteForm, CompleteForm, DomicilioEstablecimiento, MercanciasForm, MercanciasTabla, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/260104/domicilo.model';
import { CatalogosSelect, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio que gestiona las operaciones relacionadas con los permisos sanitarios de productos
 * en el trámite 260104. Este servicio incluye métodos para recopilar datos de formularios,
 * interactuar con componentes hijos y obtener datos desde archivos JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class PermisoSanitarioProductosService {
  /**
   * Lista de instancias del componente `DatosDeLaSolicitudComponent`.
   * Se utiliza para interactuar con los formularios de datos de la solicitud.
   */
  private datosSolicitudComponents: DatosDeLaSolicitudComponent[] = [];

  /**
   * Objeto que almacena los datos recopilados del formulario.
   * Contiene los datos de la solicitud en formato `CompleteForm[]`.
   */
  payload: {
    datosSolicitud?: CompleteForm[];
  } = {};

  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes a archivos JSON.
   */
  constructor(public http: HttpClient) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Establece las instancias de los componentes `DatosDeLaSolicitudComponent`.
   * @param components - Lista de instancias de `DatosDeLaSolicitudComponent`.
   */
  setDatosSolicitudComponents(components: DatosDeLaSolicitudComponent[]): void {
    this.datosSolicitudComponents = components;
  }

  /**
   * Recopila los valores de los formularios de los componentes `DatosDeLaSolicitudComponent`.
   * @returns Un objeto que contiene los datos de la solicitud en formato `CompleteForm[]`.
   */
  collectFormValues(): {
    datosSolicitud?: CompleteForm[];
  } {
    const ALL_FORM_VALUES: {
      datosSolicitud?: CompleteForm[];
    } = {
      datosSolicitud: [],
    };

    // Recorre los componentes y recopila los valores de sus formularios.
    if (this.datosSolicitudComponents?.length > 0) {
      this.datosSolicitudComponents.forEach((component) => {
        const CHILD_DATA: CompleteForm = {
          solicitudForm: component.solicitudForm?.value as DomicilioEstablecimiento,
          formAgente: component.formAgente?.value as AgenteForm,
          formMercancias: component.formMercancias?.value as MercanciasForm,
        };
        ALL_FORM_VALUES.datosSolicitud?.push(CHILD_DATA);
      });
    }

    return ALL_FORM_VALUES;
  }

  /**
   * Obtiene el catálogo de estados desde un archivo JSON.
   * @returns Un observable que emite los datos del catálogo de estados.
   */
  obtenerEstadoCatalogo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260104/estado-catalogo.json')
      .pipe();
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON.
   * @returns Un observable que emite los datos de la tabla.
   */
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/260104/tablaDatos.json');
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   * @returns Un observable que emite los datos de la lista de estados.
   */
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/260104/seleccion.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON.
   * @returns Un observable que emite los datos de las mercancías.
   */
  obtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>('assets/json/260104/mercanciasDatos.json');
  }
}