/**
 * @fileoverview Servicio `EstablecimientoService`
 * Este servicio proporciona métodos para interactuar con los datos relacionados con el establecimiento,
 * incluyendo catálogos, datos de representantes, manifiestos, y propietarios.
 */
import { Asociados, Manifiestistos, MercanciasInfo, PropietarioRadio, PropietarioTipoPersona, Representante, ScianModel } from '../models/datos-de-la-solicitud.model';
import { AvisocalidadStore, SolicitudState } from '../estados/stores/aviso-calidad.store';
import { Catalogo, JSONResponse } from '@libs/shared/data-access-user/src';
import { DatosDeLaProductoModel, PropietarioModel} from '../models/datos-de-la-solicitud.model';
import { DatosDomicilioLegalState,DatosDomicilioLegalStore} from '../estados/stores/datos-domicilio-legal.store';
import { DatosSolicitudState, DatosSolicitudStore } from '../estados/stores/datos-de-la-solicitud-modificacion.store';
import { Observable ,map} from 'rxjs';
import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../estados/permiso-importacion-biologica.store';
import { EstadoCombinado } from '../models/solicitud-datos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * @class EstablecimientoService
 * @description
 * Servicio que gestiona las solicitudes HTTP para obtener datos relacionados con el establecimiento.
 */
@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient,
    private datosSolicitudStore: DatosSolicitudStore,
    private permisoImportacionBiologicaStore: PermisoImportacionBiologicaStore,
    private avisoCalidadStore: AvisocalidadStore,
    private datosDomicilioLegalStore: DatosDomicilioLegalStore,
  ) {
    //constructor
  }

  /**
   * Obtiene los datos del catálogo de estados.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de estados.
   */
  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/establecimiento.json');
  }

  /**
   * Obtiene los datos del catálogo de SCIAN.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de SCIAN.
   */
  getSciandata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }

  /**
   * Obtiene los datos del catálogo de régimen.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de régimen.
   */
  getRegimenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/regimen.json');
  }

  /**
   * Obtiene los datos del catálogo de aduanas de salida.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de aduanas de salida.
   */
  getAduanaDeSalidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/aduanaDeSalida.json');
  }

  /**
   * Obtiene los datos del catálogo de tipos de producto.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de tipos de producto.
   */
  getTipoDeProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/tipoDeProducto.json');
  }

  /**
   * Obtiene los datos del catálogo de unidades de medida.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de unidades de medida.
   */
  getUnidadDeMedidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/unidadDeMedida.json');
  }

  /**
   * Obtiene los datos del catálogo de usos específicos.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de usos específicos.
   */
  getUsoEspecificoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/usoEspecifico.json');
  }

  /**
   * Obtiene los datos de un representante por su RFC.
   * @param rfc RFC del representante.
   * @returns {Observable<Representante | null>} Un observable con los datos del representante o `null` si no se encuentra.
   */
  getRepresentanteByRfc(rfc: string): Observable<Representante | null> {
    return this.http.get<Representante[]>('assets/json/260401/representanteByRfc.json').pipe(
      map((representantes) => {
        const REPRESENTANTES = representantes.find((rep) => rep.rfc === rfc) || null;
        return REPRESENTANTES;
      })
    );
  }

  /**
   * Obtiene los datos de manifiestos por RFC.
   * @param rfc RFC del representante.
   * @returns {Observable<Manifiestistos | null>} Un observable con los datos del manifiesto o `null` si no se encuentra.
   */
  getManifiestosByRfc(rfc: string): Observable<Manifiestistos | null> {
    return this.http.get<Manifiestistos[]>('assets/json/260401/manifiestos.json').pipe(
      map((representantes) => representantes.find((rep) => rep.rfc === rfc) || null)
    );
  }

  /**
   * Obtiene los datos del catálogo de opciones de radio para propietarios.
   * @returns {Observable<PropietarioRadio[]>} Un observable con los datos del catálogo de opciones de radio.
   */
  getPropietarioRadioData(): Observable<PropietarioRadio[]> {
    return this.http.get<PropietarioRadio[]>('assets/json/260401/propietario.json');
  }

  /**
   * Obtiene los datos del catálogo de tipos de persona para propietarios.
   * @returns {Observable<PropietarioTipoPersona[]>} Un observable con los datos del catálogo de tipos de persona.
   */
  getPropietarioTipoPersonaData(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/260401/propietarioTipoPersona.json');
  }

  /**
   * Obtiene las opciones de radio para información confidencial.
   * @returns {Observable<PropietarioTipoPersona[]>} Un observable con las opciones de radio para información confidencial.
   */
  getInformacionConfidencialRadioOptions(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/260401/radioSiNo.json');
  }
  /**
   * Obtiene los datos de justificación.
   * @returns {Observable<PropietarioTipoPersona[]>} Un observable con los datos de justificación.
   */
  getJustificationData(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/cofepris/justificacion.json');
  }
  /**
   * Obtiene los datos de un establecimiento por su ID.
   * @param id ID del establecimiento.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del establecimiento.
   */
  getEstadodata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }

  /**
   * Obtiene la lista de asociados desde un archivo JSON.
   * @returns {Observable<Asociados[]>} Un observable con la lista de asociados.
   */
  enListaDeAsociados(): Observable<Asociados[]> {
    return this.http.get<Asociados[]>('assets/json/cofepris/asociadosJson.json');
  }
  /**
     * Recupera los datos del destinatario desde un archivo JSON local.
     * @returns Un `Observable` que emite un `JSONResponse` que contiene los datos del destinatario.
     */
    getDestinatarioDatos(): Observable<JSONResponse> {
      return this.http.get<JSONResponse>('./assets/json/260701/destinatario-tabla.json');
    }
    /**
   * Recupera los datos del fabricante desde un archivo JSON local.
   * @returns {Observable<JSONResponse>} Un observable que contiene la respuesta JSON
   * con los datos del fabricante.
   */
  getFabricanteDatos(): Observable<JSONResponse> {
    return this.http.get<JSONResponse>('./assets/json/260701/fabricante-tabla.json');
  }

  /**
  * @method getScianTablaDatos
  * @description
  * Recupera los datos de la tabla SCIAN desde un archivo JSON local.
  * @returns {Observable<ScianModel>} Observable con los datos de la tabla SCIAN.
  */
  getScianTablaDatos(): Observable<ScianModel[]> {
    return this.http.get<ScianModel[]>('./assets/json/260902/scian-tabla.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   * @returns {Observable<MercanciasInfo[]>} Un observable con la lista de mercancías.
   */
  getMercancias(): Observable<MercanciasInfo[]> {
    return this.http.get<MercanciasInfo[]>('assets/json/260905/mercancias.json');
  }

   /**
     * @description
     * Actualiza el estado del formulario con los datos proporcionados.
     * Utiliza el store para establecer los valores de cada campo del formulario.
     * @param EstadoCombinado - Objeto que contiene los datos de la solicitud.
     */
    actualizarEstadoFormulario(EstadoCombinado: EstadoCombinado): void { 
      const DATOS_SOLICITUD: DatosSolicitudState = EstadoCombinado.datosSolicitudState;
      const DATOS_PERMISO: PermisoImportacionBiologicaState = EstadoCombinado.permisoImportacionBiologicaState;
      const DATOS_DOMICILIO_LEGAL: DatosDomicilioLegalState = EstadoCombinado.datosDomicilioLegalState;
      const AVISO_CALIDAD: SolicitudState = EstadoCombinado.solicitudState;

      this.datosSolicitudStore.setGenericos( DATOS_SOLICITUD.genericos);
      this.datosSolicitudStore.setObservaciones( DATOS_SOLICITUD.observaciones);
      this.datosSolicitudStore.setEstablecimientoRazonSocial( DATOS_SOLICITUD.establecimientoRazonSocial);
      this.datosSolicitudStore.setEstablecimientoCorreoElectronico( DATOS_SOLICITUD.establecimientoCorreoElectronico);
      this.datosSolicitudStore.setEstablecimientoDomicilioCodigoPostal( DATOS_SOLICITUD.establecimientoDomicilioCodigoPostal);
      this.datosSolicitudStore.setEstablecimientoEstados( DATOS_SOLICITUD.establecimientoEstados);
      this.datosSolicitudStore.setDescripcionMunicipio( DATOS_SOLICITUD.descripcionMunicipio);
      this.datosSolicitudStore.setLocalidad( DATOS_SOLICITUD.localidad);
      this.datosSolicitudStore.setEstablishomentoColonias( DATOS_SOLICITUD.establishomentoColonias);
      this.datosSolicitudStore.setCalle( DATOS_SOLICITUD.calle);
      this.datosSolicitudStore.setLada( DATOS_SOLICITUD.lada);
      this.datosSolicitudStore.setTelefono( DATOS_SOLICITUD.telefono);
      this.datosSolicitudStore.setAvisoCheckbox( DATOS_SOLICITUD.avisoCheckbox);
      this.datosSolicitudStore.setNoLicenciaSanitaria( DATOS_SOLICITUD.noLicenciaSanitaria);
      this.datosSolicitudStore.setRegimen( DATOS_SOLICITUD.regimen);
      this.datosSolicitudStore.setAduanasEntradas( DATOS_SOLICITUD.aduanasEntradas);
      this.datosSolicitudStore.setAifaCheckbox( DATOS_SOLICITUD.aifaCheckbox);
      this.datosSolicitudStore.setManifests( DATOS_SOLICITUD.manifests);
      this.datosSolicitudStore.setInformacionConfidencialRadio( DATOS_SOLICITUD.informacionConfidencialRadio);
      this.datosSolicitudStore.setScian( DATOS_SOLICITUD.scian);
      this.datosSolicitudStore.setDescripcionScian( DATOS_SOLICITUD.descripcionScian);

      this.permisoImportacionBiologicaStore.setClaveDeReferncia(DATOS_PERMISO.setClaveDeReferncia);
      this.permisoImportacionBiologicaStore.setCadenaDeLaDependencia(DATOS_PERMISO.setCadenaDeLaDependencia);
      this.permisoImportacionBiologicaStore.setLlaveDePago(DATOS_PERMISO.setLlaveDePago);
      this.permisoImportacionBiologicaStore.setFechaDePago(DATOS_PERMISO.setFechaDePago);
      this.permisoImportacionBiologicaStore.setImporteDePago(DATOS_PERMISO.setImporteDePago);
      if (DATOS_PERMISO.setBanco !== null) {
        this.permisoImportacionBiologicaStore.setBanco(DATOS_PERMISO.setBanco);
      }

      this.datosDomicilioLegalStore.setRfc(DATOS_DOMICILIO_LEGAL.rfc);
      this.datosDomicilioLegalStore.setNombre(DATOS_DOMICILIO_LEGAL.nombre);  
      this.datosDomicilioLegalStore.setApellidoPaterno(DATOS_DOMICILIO_LEGAL.apellidoPaterno);
      this.datosDomicilioLegalStore.setApellidoMaterno(DATOS_DOMICILIO_LEGAL.apellidoMaterno);

      this.avisoCalidadStore.setRfcDel(AVISO_CALIDAD.rfcDel);
      this.avisoCalidadStore.setDenominacionRazonSocial(AVISO_CALIDAD.denominacionRazonSocial); 
      this.avisoCalidadStore.setCorreoElectronico(AVISO_CALIDAD.correoElectronico);
      }
  
    /**
     * @description
     * Obtiene los datos iniciales para la solicitud de aviso de funcionamiento.
     * Carga los datos desde un archivo JSON local.
     * @returns Observable<SolicitudState> - Un observable que emite el estado de la solicitud.
     */
    obtenerSolicitudDatos(): Observable<EstadoCombinado> {
      return this.http.get<EstadoCombinado>('assets/json/cofepris/datosSolicitud.json');
    }

  /**
   * Obtiene los datos del propietario desde un archivo JSON local.
   * @returns {Observable<PropietarioModel[]>} Un observable con la lista de propietarios.
   */
  getPropietario(): Observable<PropietarioModel[]> {
    return this.http.get<PropietarioModel[]>('assets/json/260402/propietarioDatos.json');
  }


  /**
   * Obtiene los datos del producto desde un archivo JSON local.
   * @returns {Observable<DatosDeLaProductoModel[]>} Un observable con la lista de datos del producto.
   */
  getDatosDelProducto(): Observable<DatosDeLaProductoModel[]> {
    return this.http.get<DatosDeLaProductoModel[]>('assets/json/260402/datosDelProducto.json');
  }

    /**
     * Recupera los datos de SCIAN desde un archivo JSON local.
     * @returns {Observable<ScianModel[]>} Un observable con los datos de SCIAN.
     */
    getScianDatos(): Observable<ScianModel[]> {
      return this.http.get<ScianModel[]>('assets/json/260402/scianDatos.json');
    }
  
}


