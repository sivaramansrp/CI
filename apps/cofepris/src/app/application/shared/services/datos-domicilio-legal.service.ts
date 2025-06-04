import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { DatosDomicilioLegalQuery } from '../estados/queries/datos-domicilio-legal.query';
import { DatosDomicilioLegalState, DatosDomicilioLegalStore } from '../estados/stores/datos-domicilio-legal.store';
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
   * @param DATOS - Objeto que contiene el estado del trámite 260501.
   */
  actualizarEstadoFormulario(DATOS: DatosDomicilioLegalState): void {
    if (DATOS) {
      if (DATOS.claveDeReferencia) this.datosDomicilioLegalStore.setClaveDeReferencia(DATOS.claveDeReferencia);
      if (DATOS.cadenaDependencia) this.datosDomicilioLegalStore.setCadenaDependencia(DATOS.cadenaDependencia);
      if (DATOS.banco) this.datosDomicilioLegalStore.setBanco(DATOS.banco);
      if (DATOS.llaveDePago) this.datosDomicilioLegalStore.setllaveDePago(DATOS.llaveDePago);
      if (DATOS.fechaPago) this.datosDomicilioLegalStore.setFechaPago(DATOS.fechaPago);
      if (DATOS.importePago) this.datosDomicilioLegalStore.setImportePago(DATOS.importePago);
      if (DATOS.rfcDel) this.datosDomicilioLegalStore.setRfcDel(DATOS.rfcDel);
      if (DATOS.denominacion) this.datosDomicilioLegalStore.setDenominacion(DATOS.denominacion);
      if (DATOS.correo) this.datosDomicilioLegalStore.setCorreo(DATOS.correo);
      if (DATOS.codigoPostal) this.datosDomicilioLegalStore.setCodigoPostal(DATOS.codigoPostal);
      if (DATOS.estado) this.datosDomicilioLegalStore.setEstado(DATOS.estado);
      if (DATOS.muncipio) this.datosDomicilioLegalStore.setMuncipio(DATOS.muncipio);
      if (DATOS.localidad) this.datosDomicilioLegalStore.setLocalidad(DATOS.localidad);
      if (DATOS.colonia) this.datosDomicilioLegalStore.setColonia(DATOS.colonia);
      if (DATOS.calle) this.datosDomicilioLegalStore.setCalle(DATOS.calle);
      if (DATOS.lada) this.datosDomicilioLegalStore.setLada(DATOS.lada);
      if (DATOS.telefono) this.datosDomicilioLegalStore.setTelefono(DATOS.telefono);
      if (DATOS.claveScianModal) this.datosDomicilioLegalStore.setClaveScianModal(DATOS.claveScianModal);
      if (DATOS.claveDescripcionModal) this.datosDomicilioLegalStore.setClaveDescripcionModal(DATOS.claveDescripcionModal);
      if (typeof DATOS.avisoCheckbox === 'boolean') this.datosDomicilioLegalStore.setAvisoCheckbox(DATOS.avisoCheckbox);
      if (DATOS.licenciaSanitaria) this.datosDomicilioLegalStore.setLicenciaSanitaria(DATOS.licenciaSanitaria);
      if (DATOS.regimen) this.datosDomicilioLegalStore.setRegimen(DATOS.regimen);
      if (DATOS.aduanasEntradas) this.datosDomicilioLegalStore.setAduanasEntradas(DATOS.aduanasEntradas);
      if (DATOS.numeroPermiso) this.datosDomicilioLegalStore.setNumeroPermiso(DATOS.numeroPermiso);
      if (DATOS.clasificacion) this.datosDomicilioLegalStore.setClasificacion(DATOS.clasificacion);
      if (DATOS.especificar) this.datosDomicilioLegalStore.setEspecificar(DATOS.especificar);
      if (DATOS.denominacionEspecifica) this.datosDomicilioLegalStore.setDenominacionEspecifica(DATOS.denominacionEspecifica);
      if (DATOS.denominacionDistintiva) this.datosDomicilioLegalStore.setDenominacionDistintiva(DATOS.denominacionDistintiva);
      if (DATOS.denominacionComun) this.datosDomicilioLegalStore.setDenominacionComun(DATOS.denominacionComun);
      if (DATOS.tipoDeProducto) this.datosDomicilioLegalStore.setTipoDeProducto(DATOS.tipoDeProducto);
      if (DATOS.estadoFisico) this.datosDomicilioLegalStore.setEstadoFisico(DATOS.estadoFisico);
      if (DATOS.fraccionArancelaria) this.datosDomicilioLegalStore.setFraccionArancelaria(DATOS.fraccionArancelaria);
      if (DATOS.descripcionFraccion) this.datosDomicilioLegalStore.setDescripcionFraccion(DATOS.descripcionFraccion);
      if (DATOS.cantidadUMT) this.datosDomicilioLegalStore.setCantidadUMT(DATOS.cantidadUMT);
      if (DATOS.UMT) this.datosDomicilioLegalStore.setUMT(DATOS.UMT);
      if (DATOS.cantidadUMC) this.datosDomicilioLegalStore.setCantidadUMC(DATOS.cantidadUMC);
      if (DATOS.UMC) this.datosDomicilioLegalStore.setUMC(DATOS.UMC);
      if (DATOS.presentacion) this.datosDomicilioLegalStore.setPresentacion(DATOS.presentacion);
      if (DATOS.numeroRegistro) this.datosDomicilioLegalStore.setNumeroRegistro(DATOS.numeroRegistro);
      if (DATOS.fechaCaducidad) this.datosDomicilioLegalStore.setFechaCaducidad(DATOS.fechaCaducidad);
      if (DATOS.cumplimiento) this.datosDomicilioLegalStore.setCumplimiento(DATOS.cumplimiento);
      if (DATOS.rfc) this.datosDomicilioLegalStore.setRfc(DATOS.rfc);
      if (DATOS.nombre) this.datosDomicilioLegalStore.setNombre(DATOS.nombre);
      if (DATOS.apellidoPaterno) this.datosDomicilioLegalStore.setApellidoPaterno(DATOS.apellidoPaterno);
      if (DATOS.apellidoMaterno) this.datosDomicilioLegalStore.setApellidoMaterno(DATOS.apellidoMaterno);
      if (Array.isArray(DATOS.aduanasDeEntrada)) this.datosDomicilioLegalStore.setPaisDeOriginDatos(DATOS.aduanasDeEntrada);
      if (DATOS.garantiasOfrecidas) this.datosDomicilioLegalStore.setGarantiasOfrecidas(DATOS.garantiasOfrecidas);
    }
  }

  /**
   * Método para obtener los datos del registro de toma de muestras de mercancías.
   * @returns Observable que emite el estado del trámite 260501.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<DatosDomicilioLegalState> {
    return this.http.get<DatosDomicilioLegalState>('assets/json/260501/registro_toma_muestras_mercancias.json');
  }
}
