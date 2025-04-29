import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { DatosGeneralesDeLaSolicitudCatologo } from '../models/solicitud.model';
import { DatosGeneralesDeLaSolicitudRadioLista } from '../models/solicitud.model';
import { DatosPorGarantia } from '../models/solicitud.model';
import { Domicilios } from '../models/solicitud.model';
import { EntidadFederativa } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModificacionDenominacionRazonSocial } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { RecibirNotificaciones } from '../models/solicitud.model';
import { SeccionSociosIC } from '../models/solicitud.model';
import { SubContratistas } from '../models/solicitud.model';
import { TipoDeInversion } from '../models/solicitud.model';

/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 31101 a partir de archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * Constructor que inyecta el cliente HTTP.
   * @param http - Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) {
    // Lógica del constructor aquí
  }

  /**
   * Obtiene la lista de opciones para recibir notificaciones.
   */
  conseguirRecibirNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>(
      'assets/json/31101/recibir-notificaciones.json'
    );
  }

  /**
   * Obtiene los datos para la modificación de denominación o razón social.
   */
  conseguirModificacionDenominacionRazonSocial(): Observable<ModificacionDenominacionRazonSocial> {
    return this.http.get<ModificacionDenominacionRazonSocial>(
      'assets/json/31101/modificacion-denominacion-razon-social.json'
    );
  }

  /**
   * Obtiene el catálogo de nombres de instituciones.
   */
  conseguirNombreInstitucionCatalogo(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(
      'assets/json/31101/nombre-institucion-catalogo.json'
    );
  }

  /**
   * Obtiene los datos relacionados a la garantía.
   */
  conseguirDatosPorGarantia(): Observable<DatosPorGarantia> {
    return this.http.get<DatosPorGarantia>(
      'assets/json/31101/datos-por-garantia.json'
    );
  }

  /**
   * Obtiene los datos generales de la solicitud (opciones de tipo radio).
   */
  conseguirDatosGeneralesOpcionDeRadio(): Observable<DatosGeneralesDeLaSolicitudRadioLista> {
    return this.http.get<DatosGeneralesDeLaSolicitudRadioLista>(
      'assets/json/31101/datos-generales-de-la-solicitud-radio-option.json'
    );
  }

  /**
   * Obtiene los catálogos generales de la solicitud.
   */
  conseguirDatosGeneralesCatologo(): Observable<DatosGeneralesDeLaSolicitudCatologo> {
    return this.http.get<DatosGeneralesDeLaSolicitudCatologo>(
      'assets/json/31101/datos-generales-de-la-solicitud-catologo.json'
    );
  }

  /**
   * Obtiene la lista de subcontratistas.
   */
  conseguirListaDeSubcontratistas(): Observable<SubContratistas[]> {
    return this.http.get<SubContratistas[]>(
      'assets/json/31101/lista-de-subcontratistas.json'
    );
  }

  /**
   * Obtiene la lista de regímenes aduaneros.
   */
  conseguirRegimenAduanero(): Observable<string[]> {
    return this.http.get<string[]>('assets/json/31101/regimen-aduanero.json');
  }

  /**
   * Obtiene la lista de miembros de la empresa (socios).
   */
  conseguirMiembrosDeLaEmpresa(): Observable<SeccionSociosIC[]> {
    return this.http.get<SeccionSociosIC[]>(
      'assets/json/31101/miembros-de-la-empresa.json'
    );
  }

  /**
   * Obtiene los tipos de inversión disponibles.
   */
  conseguirTipoDeInversionDatos(): Observable<TipoDeInversion[]> {
    return this.http.get<TipoDeInversion[]>(
      'assets/json/31101/tipo-de-inversion-datos.json'
    );
  }

  /**
   * Obtiene los domicilios registrados.
   */
  conseguirDomicilios(): Observable<Domicilios[]> {
    return this.http.get<Domicilios[]>('assets/json/31101/domicilios.json');
  }

  /**
   * @description Obtiene los datos de la entidad federativa desde un archivo JSON.
   * @returns {Observable<EntidadFederativa[]>} Observable con la lista de entidades federativas.
   */
  conseguirEntidadFederativaDatos(): Observable<EntidadFederativa[]> {
    return this.http.get<EntidadFederativa[]>(
      'assets/json/31101/entidad-federativa-datos.json'
    );
  }

  entidadFederativaCatalogo():Observable<CatalogosSelect>{
    return this.http.get<CatalogosSelect>(
      'assets/json/31101/entidad-federativa-catalogo.json'
    );
  }
}
