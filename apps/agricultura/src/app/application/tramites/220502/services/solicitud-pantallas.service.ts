import { Destinatario, Exportador } from '../models/pago-de-derechos.model';
import { Observable, catchError, throwError } from 'rxjs';
import { CargarDatosIniciales } from '../models/solicitud-pantallas.model';
import { DatosDeLaSolicitud } from '../models/solicitud-pantallas.model';
import { DatosDelTramiteRealizar } from '../models/solicitud-pantallas.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroTomaMuestrasMercanciasDatos } from '../models/datos-generales.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Solicitud220502Store } from '../estados/tramites220502.store';
import { TipoContenedor } from '../models/solicitud-pantallas.model';

/** Servicio para obtener los datos de la solicitud */
@Injectable({
  providedIn: 'root',
})
/** Servicio para obtener los datos de la solicitud */
export class SolicitudPantallasService {
  /** URL para obtener los datos de la solicitud */
  private dataUrl =
    '../../../assets/json/220502/solicitud-pantallas-mock-data.json';

  /** Constructor para inyectar el servicio HttpClient */
  constructor(
    public http: HttpClient,
    private solicitud220502Store: Solicitud220502Store
  ) {
    /** Llamar al método para obtener los datos */
    this.getData();
  }

  /** Método para obtener los datos de la solicitud
   * @returns Observable<CargarDatosIniciales>
   */
  getData(): Observable<CargarDatosIniciales> {
    return this.http.get<CargarDatosIniciales>(this.dataUrl).pipe();
  }

  /** Método para obtener los datos de la solicitud
   * @returns Observable<DatosDelTramiteRealizar>
   */
  getDataDatosDelTramite(): Observable<DatosDelTramiteRealizar> {
    return this.http.get<DatosDelTramiteRealizar>(this.dataUrl).pipe();
  }

  /** Método para obtener los datos de la solicitud
   * @returns Observable<TipoContenedor>
   */
  getDataResponsableInspeccion(): Observable<TipoContenedor> {
    return this.http.get<TipoContenedor>(this.dataUrl).pipe();
  }

  /**
   * Obtiene los datos iniciales de la solicitud desde un archivo JSON local.
   *
   * @returns Un observable que emite los datos de la solicitud.
   */
  getDatosDeLaSolicitud(): Observable<DatosDeLaSolicitud> {
    return this.http
      .get<DatosDeLaSolicitud>('assets/json/220502/datos-de-la-solicitud.json')
      .pipe();
  }

  /**
   * Actualiza el estado del formulario en el store con los datos recibidos.
   *
   * @param datos - Objeto que contiene la información de la solicitud.
   */
  actualizarEstadoFormulario(datos: DatosDeLaSolicitud): void {
    this.solicitud220502Store.setCertificadosAutorizados(
      datos.certificadosAutorizados
    );
    this.solicitud220502Store.setHoraDeInspeccion(datos.horaDeInspeccion);
    this.solicitud220502Store.setAduanaDeIngreso(datos.aduanaDeIngreso);
    this.solicitud220502Store.setSanidadAgropecuaria(datos.sanidadAgropecuaria);
    this.solicitud220502Store.setPuntoDeInspeccion(datos.puntoDeInspeccion);
    this.solicitud220502Store.setFechaDeInspeccion(datos.fechaDeInspeccion);
    this.solicitud220502Store.setNombre(datos.nombre);
    this.solicitud220502Store.setPrimerapellido(datos.primerapellido);
    this.solicitud220502Store.setSegundoapellido(datos.segundoapellido);
    this.solicitud220502Store.setMercancia(datos.mercancia);
    this.solicitud220502Store.setTipocontenedor(datos.tipocontenedor);
    this.solicitud220502Store.setTransporteIdMedio(datos.transporteIdMedio);
    this.solicitud220502Store.setIdentificacionTransporte(
      datos.identificacionTransporte
    );
    this.solicitud220502Store.setTotalDeGuiasAmparadas(
      datos.totalDeGuiasAmparadas
    );
    this.solicitud220502Store.setEsSolicitudFerros(datos.esSolicitudFerros);
  }

  /**
   * Método para obtener los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del registro de toma de muestras de mercancías.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<RegistroTomaMuestrasMercanciasDatos> {
    return this.http.get<RegistroTomaMuestrasMercanciasDatos>(
      'assets/json/220501/registro_toma_muestras_mercancias.json'
    );
  }

  /**
   * Obtiene los datos de la tabla de exportadores.
   *
   * @returns {Observable<Exportador[]>} - Lista de exportadores.
   */
  obtenerTablaExportador(): Observable<Exportador[]> {
    return this.http
      .get<Exportador[]>('assets/json/220501/exportador-tabla.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la tabla de destinatarios.
   *
   * @returns {Observable<Destinatario[]>} - Lista de destinatarios.
   */
  obtenerTablaDestinatario(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('assets/json/220501/destinatario-tabla.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la aduana de ingreso.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la aduana de ingreso.
   */
  getAduanaIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/aduana-ingreso.json'
    );
  }

  /**
   * Obtiene los datos de la oficina de inspección.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la oficina de inspección.
   */
  getOficianaInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/oficiana-de-inspeccion.json'
    );
  }

  /**
   * Obtiene los datos del punto de inspección.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de inspección.
   */
  getPuntoInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/punto-de-inspeccion.json'
    );
  }

  /**
   * Obtiene los datos del establecimiento.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del establecimiento.
   */
  getEstablecimiento(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/establecimiento.json'
    );
  }

  /**
   * Obtiene los datos del régimen al que se destinarán las mercancías.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del régimen.
   */
  getRegimenDestinaran(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/regimen-destinaran.json'
    );
  }

  /**
   * Obtiene los datos de la movilización nacional.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la movilización nacional.
   */
  getMovilizacionNacional(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/movilizacion-nacional.json'
    );
  }

  /**
   * Obtiene los datos del punto de verificación.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos del punto de verificación.
   */
  getPuntoVerificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/punto-verificacion.json'
    );
  }

  /**
   * Obtiene los datos de la empresa transportista.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la empresa transportista.
   */
  getEmpresaTransportista(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/empresa-transportista.json'
    );
  }

  /**
   * Obtiene los datos de la justificación.
   *
   * @returns {Observable<RespuestaCatalogos>} - Los datos de la justificación.
   */
  getJustificacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/220501/justificacion.json'
    );
  }
}
