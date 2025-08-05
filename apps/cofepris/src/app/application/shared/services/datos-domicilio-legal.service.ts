import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import { DatosDomicilioLegalState, DatosDomicilioLegalStore } from '../estados/stores/datos-domicilio-legal.store';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { DatosDomicilioLegalQuery } from '../estados/queries/datos-domicilio-legal.query';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoModel } from '../models/datos-domicilio-legal.model';

@Injectable({
  providedIn: 'root',
})
export class DatosDomicilioLegalService {
  /**
   * Servicio para obtener datos de terceros relacionados y permisos.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient,private query: DatosDomicilioLegalQuery, private datosDomicilioLegalStore: DatosDomicilioLegalStore,) {
    // Constructor del servicio
  }

  /**
   * Obtiene los datos de selección desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaCatalogos.
   */
  getObtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260501/seleccion.json'
    );
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaTabla.
   */
  getObtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/260501/tablaDatos.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto MercanciasTabla.
   */
  getObtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>(
      'assets/json/260501/mercanciasDatos.json'
    );
  }

  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/260501/terceros-relacionados.json'
    );
  }

  /**
   * Obtiene los datos de permisos desde un archivo JSON local.
   * @returns Observable que emite un arreglo de objetos PermisoModel.
   */
  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260501/terceros.json');
  }

   /**
   * Obtiene el estado completo de DatosDomicilioLegal.
   * @returns Observable<DatosDomicilioLegalState>
   */
   getDatosDomicilioLegalState(): Observable<DatosDomicilioLegalState> {
    return this.query.selectSolicitud$;
  }
    /**
   * Método para actualizar el estado del formulario con los datos proporcionados.
   * @param DATOS - Objeto que contiene el estado del trámite.
   */
  actualizarEstadoFormulario(DATOS: DatosDomicilioLegalState): void {
      this.datosDomicilioLegalStore.setClaveDeReferencia(DATOS.claveDeReferencia);
      this.datosDomicilioLegalStore.setCadenaDependencia(DATOS.cadenaDependencia);
      this.datosDomicilioLegalStore.setBanco(DATOS.banco);
      this.datosDomicilioLegalStore.setllaveDePago(DATOS.llaveDePago);
      this.datosDomicilioLegalStore.setFechaPago(DATOS.fechaPago);
      this.datosDomicilioLegalStore.setImportePago(DATOS.importePago);
      this.datosDomicilioLegalStore.setRfcDel(DATOS.rfcDel);
      this.datosDomicilioLegalStore.setDenominacion(DATOS.denominacion);
      this.datosDomicilioLegalStore.setCorreo(DATOS.correo);
      this.datosDomicilioLegalStore.setCodigoPostal(DATOS.codigoPostal);
      this.datosDomicilioLegalStore.setEstado(DATOS.estado);
      this.datosDomicilioLegalStore.setMuncipio(DATOS.muncipio);
      this.datosDomicilioLegalStore.setLocalidad(DATOS.localidad);
      this.datosDomicilioLegalStore.setColonia(DATOS.colonia);
      this.datosDomicilioLegalStore.setCalle(DATOS.calle);
      this.datosDomicilioLegalStore.setLada(DATOS.lada);
      this.datosDomicilioLegalStore.setTelefono(DATOS.telefono);
      this.datosDomicilioLegalStore.setClaveScianModal(DATOS.claveScianModal);
      this.datosDomicilioLegalStore.setClaveDescripcionModal(DATOS.claveDescripcionModal);
      if (typeof DATOS.avisoCheckbox === 'boolean') {this.datosDomicilioLegalStore.setAvisoCheckbox(DATOS.avisoCheckbox);}
      this.datosDomicilioLegalStore.setLicenciaSanitaria(DATOS.licenciaSanitaria);
      this.datosDomicilioLegalStore.setRegimen(DATOS.regimen);
      this.datosDomicilioLegalStore.setAduanasEntradas(DATOS.aduanasEntradas);
      this.datosDomicilioLegalStore.setNumeroPermiso(DATOS.numeroPermiso);
      this.datosDomicilioLegalStore.setClasificacion(DATOS.clasificacion);
      this.datosDomicilioLegalStore.setEspecificar(DATOS.especificar);
      this.datosDomicilioLegalStore.setDenominacionEspecifica(DATOS.denominacionEspecifica);
      this.datosDomicilioLegalStore.setDenominacionDistintiva(DATOS.denominacionDistintiva);
      this.datosDomicilioLegalStore.setDenominacionComun(DATOS.denominacionComun);
      this.datosDomicilioLegalStore.setTipoDeProducto(DATOS.tipoDeProducto);
      this.datosDomicilioLegalStore.setEstadoFisico(DATOS.estadoFisico);
      this.datosDomicilioLegalStore.setFraccionArancelaria(DATOS.fraccionArancelaria);
      this.datosDomicilioLegalStore.setDescripcionFraccion(DATOS.descripcionFraccion);
      this.datosDomicilioLegalStore.setCantidadUMT(DATOS.cantidadUMT);
      this.datosDomicilioLegalStore.setUMT(DATOS.UMT);
      this.datosDomicilioLegalStore.setCantidadUMC(DATOS.cantidadUMC);
      this.datosDomicilioLegalStore.setUMC(DATOS.UMC);
      this.datosDomicilioLegalStore.setPresentacion(DATOS.presentacion);
      this.datosDomicilioLegalStore.setNumeroRegistro(DATOS.numeroRegistro);
      this.datosDomicilioLegalStore.setFechaCaducidad(DATOS.fechaCaducidad);
      this.datosDomicilioLegalStore.setCumplimiento(DATOS.cumplimiento);
      this.datosDomicilioLegalStore.setRfc(DATOS.rfc);
      this.datosDomicilioLegalStore.setNombre(DATOS.nombre);
      this.datosDomicilioLegalStore.setApellidoPaterno(DATOS.apellidoPaterno);
      this.datosDomicilioLegalStore.setApellidoMaterno(DATOS.apellidoMaterno);
      if (Array.isArray(DATOS.aduanasDeEntrada)) {this.datosDomicilioLegalStore.setPaisDeOriginDatos(DATOS.aduanasDeEntrada);}
      this.datosDomicilioLegalStore.setGarantiasOfrecidas(DATOS.garantiasOfrecidas);
      this.datosDomicilioLegalStore.setNombre(DATOS.nombre);
      this.datosDomicilioLegalStore.setApellidoPaterno(DATOS.apellidoPaterno);
      this.datosDomicilioLegalStore.setApellidoMaterno(DATOS.apellidoMaterno);
      this.datosDomicilioLegalStore.setMensaje(DATOS.mensaje);
  }

  /**
   * Método para obtener los datos del registro de toma de muestras de mercancías.
   * @returns Observable que emite el estado del trámite.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<DatosDomicilioLegalState> {
    return this.http.get<DatosDomicilioLegalState>('assets/json/260501/registro_toma_muestras_mercancias.json');
  }

  /**
     * Obtiene los datos de la tabla desde un archivo JSON local.
     *
     * @returns Observable que emite un objeto RespuestaTabla.
     */
    getObtenerScianTablaDatos(): Observable<RespuestaTabla> {
      return this.http.get<RespuestaTabla>('assets/json/cofepris/clave-scian.json');
    }
  
    /**
     * Obtiene los datos de mercancías desde un archivo JSON local.
     *
     * @returns Observable que emite un objeto MercanciasTabla.
     */
    getObtenerDataMercanciasDatos(): Observable<MercanciasTabla> {
      return this.http.get<MercanciasTabla>(
        'assets/json/cofepris/mercancias-tabla.json'
      );
    }
}
