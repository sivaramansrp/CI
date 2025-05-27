import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { Observable, catchError, throwError } from 'rxjs';
import { Solicitud260215State, Tramite260215Store } from '../estados/tramites/tramite260215.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermisoModel } from '../models/permiso-sanitario.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosPermisoSanitarioService {
  constructor(private http: HttpClient, private tramite260215Store: Tramite260215Store) {
    // to be initilized
  }

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260215/banco-options.json');
  }
  getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260215/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getProveedordata(): Observable<unknown> {
    return this.http.get('assets/json/260215/proveedor.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }
  getLocalidaddata(): Observable<unknown> {
    return this.http.get('assets/json/260215/estadolocalidad.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260215/terceros.json');
  }

  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/260215/terceros-relacionados.json'
    );
  }

  getObtenerEstadoList() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260215/seleccion.json'
    );
  }

  getObtenerTablaDatos() {
    return this.http.get<RespuestaTabla>('assets/json/260215/tablaDatos.json');
  }

  getObtenerMercanciasDatos() {
    return this.http.get<MercanciasTabla>(
      'assets/json/260215/mercanciasDatos.json'
    );
  }

   actualizarEstadoTramite260215(datos: Solicitud260215State): void {
    this.tramite260215Store.setClaveDeReferencia(datos.claveDeReferencia);
    this.tramite260215Store.setCadenaDependencia(datos.cadenaDependencia);
    this.tramite260215Store.setBanco(datos.banco);
    this.tramite260215Store.setllaveDePago(datos.llaveDePago);
    this.tramite260215Store.setFechaPago(datos.fechaPago);
    this.tramite260215Store.setImportePago(datos.importePago);
    this.tramite260215Store.setRfcDel(datos.rfcDel);
    this.tramite260215Store.setDenominacion(datos.denominacion);
    this.tramite260215Store.setCorreo(datos.correo);
    this.tramite260215Store.setCodigoPostal(datos.codigoPostal);
    this.tramite260215Store.setEstado(datos.estado);
    this.tramite260215Store.setMuncipio(datos.muncipio);
    this.tramite260215Store.setLocalidad(datos.localidad);
    this.tramite260215Store.setColonia(datos.colonia);
    this.tramite260215Store.setCalle(datos.calle);
    this.tramite260215Store.setLada(datos.lada);
    this.tramite260215Store.setTelefono(datos.telefono);
    this.tramite260215Store.setClaveScianModal(datos.claveScianModal);
    this.tramite260215Store.setClaveDescripcionModal(datos.claveDescripcionModal);
    this.tramite260215Store.setAvisoCheckbox(datos.avisoCheckbox);
    this.tramite260215Store.setLicenciaSanitaria(datos.licenciaSanitaria);
    this.tramite260215Store.setRegimen(datos.regimen);
    this.tramite260215Store.setAduanasEntradas(datos.aduanasEntradas);
    this.tramite260215Store.setNumeroPermiso(datos.numeroPermiso);
    this.tramite260215Store.setClasificacion(datos.clasificacion);
    this.tramite260215Store.setEspecificar(datos.especificar);
    this.tramite260215Store.setDenominacionEspecifica(datos.denominacionEspecifica);
    this.tramite260215Store.setDenominacionDistintiva(datos.denominacionDistintiva);
    this.tramite260215Store.setDenominacionComun(datos.denominacionComun);
    this.tramite260215Store.setTipoDeProducto(datos.tipoDeProducto);
    this.tramite260215Store.setEstadoFisico(datos.estadoFisico);
    this.tramite260215Store.setFraccionArancelaria(datos.fraccionArancelaria);
    this.tramite260215Store.setDescripcionFraccion(datos.descripcionFraccion);
    this.tramite260215Store.setCantidadUMT(datos.cantidadUMT);
    this.tramite260215Store.setUMT(datos.UMT);
    this.tramite260215Store.setCantidadUMC(datos.cantidadUMC);
    this.tramite260215Store.setUMC(datos.UMC);
    this.tramite260215Store.setPresentacion(datos.presentacion);
    this.tramite260215Store.setNumeroRegistro(datos.numeroRegistro);
    this.tramite260215Store.setFechaCaducidad(datos.fechaCaducidad);
    this.tramite260215Store.setCumplimiento(datos.cumplimiento);
    this.tramite260215Store.setRfc(datos.rfc);
    this.tramite260215Store.setNombre(datos.nombre);
    this.tramite260215Store.setApellidoPaterno(datos.apellidoPaterno);
    this.tramite260215Store.setApellidoMaterno(datos.apellidoMaterno);
  }

  
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud260215State> {
    return this.http.get<Solicitud260215State>('assets/json/260215/registro_toma_muestras_mercancias.json');
  }
}
