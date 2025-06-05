import { ColumnasTabla, SeleccionadasTabla } from '../models/registro.model';
import { ENVIRONMENT, JSONResponse, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud110201State, Tramite110201Store } from '../state/Tramite110201.store';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110201.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroService {

  /**
   * URL base del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(private http: HttpClient, private tramite110201Store: Tramite110201Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de tratados.
   * @returns Observable con la respuesta del catálogo de tratados.
   */
  getTratado() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/tratado.json');
  }

  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/pais.json');
  }

  /**
   * Obtiene el catálogo de idiomas.
   * @returns Observable con la respuesta del catálogo de idiomas.
   */
  getIdioma() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/idioma.json');
  }

  /**
   * Obtiene el catálogo de países de destino.
   * @returns Observable con la respuesta del catálogo de países de destino.
   */
  getPaisDestino() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/paiss.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns Observable con la respuesta del catálogo de transportes.
   */
  getTransporte() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/pais.json');
  }

  /**
   * Obtiene el catálogo de entidades.
   * @returns Observable con la respuesta del catálogo de entidades.
   */
  getEntidad() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/entidad.json');
  }

  /**
   * Obtiene el catálogo de representaciones.
   * @returns Observable con la respuesta del catálogo de representaciones.
   */
  getRepresentacion() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/entidad.json');
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   * @returns Observable con la respuesta del catálogo de tipos de factura.
   */
  getTipoFactura() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110201/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns Observable con la respuesta del catálogo de UMC.
   */
  getUMC() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns Observable con la respuesta del catálogo de unidades de medida.
   */
  getUnidadMedida() {
    return this.http.get<RespuestaCatalogos>('assets/json/110201/umc.json');
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param id Identificador del catálogo.
   * @returns Observable con la respuesta del catálogo solicitado.
   */
  getCatalogoById(id: number) {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

  /**
    * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
    *
    * @returns {Observable<ColumnasTabla[]>} Un observable que contiene un array de objetos RegistroDeSolicitudesTabla.
    *
    * @throws Lanzará un error si la solicitud HTTP falla.
    */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http.get<ColumnasTabla[]>('assets/json/110201/mercancia-disponsible.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  public getSolicitudesDataTabla(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110201/mercancia-seleccionadas.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
     * Actualiza el estado global del formulario con los datos proporcionados.
     * @param DATOS Objeto con los datos del formulario de tipo Solicitud110201State.
     */
  actualizarEstadoFormulario(DATOS: Solicitud110201State): void {
    this.tramite110201Store.setTratado(DATOS.tratado);
    this.tramite110201Store.setPais(DATOS.pais);
    this.tramite110201Store.setFraccionArancelaria(DATOS.fraccionArancelaria);
    this.tramite110201Store.setNumRegistro(DATOS.numeroRegistro);
    this.tramite110201Store.setNomComercial(DATOS.nombreComercial);
    this.tramite110201Store.setFechInicioB(DATOS.fechaInicial);
    this.tramite110201Store.setFechFinB(DATOS.fechaFinal);
    this.tramite110201Store.setArchivo(DATOS.archivo);
    this.tramite110201Store.setObservaciones(DATOS.observaciones);
    this.tramite110201Store.setPresica(DATOS.presica);
    this.tramite110201Store.setPresenta(DATOS.presenta);
    this.tramite110201Store.setIdioma(DATOS.idioma);
    this.tramite110201Store.setEntidad(DATOS.entidad);
    this.tramite110201Store.setRepresentacion(DATOS.representacion);
    this.tramite110201Store.setNombre(DATOS.nombre);
    this.tramite110201Store.setApellidoPrimer(DATOS.apellidoPrimer);
    this.tramite110201Store.setApellidoSegundo(DATOS.apellidoSegundo);
    this.tramite110201Store.setNumeroFiscal(DATOS.numeroFiscal);
    this.tramite110201Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110201Store.setCiudad(DATOS.ciudad);
    this.tramite110201Store.setCalle(DATOS.calle);
    this.tramite110201Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110201Store.setLada(DATOS.lada);
    this.tramite110201Store.setTelefono(DATOS.telefono);
    this.tramite110201Store.setFax(DATOS.fax);
    this.tramite110201Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite110201Store.setNacion(DATOS.nacion);
    this.tramite110201Store.setTransporte(DATOS.transporte);
    this.tramite110201Store.setfraccionMercanArancelaria(DATOS.fraccionMercanciaArancelaria);
    this.tramite110201Store.setnombretecnico(DATOS.nombreTecnico);
    this.tramite110201Store.setnomreeningles(DATOS.nombreEnIngles);
    this.tramite110201Store.setcriterioparaconferir(DATOS.criterioParaConferir);
    this.tramite110201Store.setmarca(DATOS.marca);
    this.tramite110201Store.setcantidad(DATOS.cantidad);
    this.tramite110201Store.setUMC(DATOS.umc);
    this.tramite110201Store.setvalordelamercancia(DATOS.valorDelaMercancia);
    this.tramite110201Store.setcomplementodeladescripcion(DATOS.complementoDelaDescripcion);
    this.tramite110201Store.setmasabruta(DATOS.masaBruta);
    this.tramite110201Store.setnombrecomercialdelamercancia(DATOS.nombreComercialDelaMercancia);
    this.tramite110201Store.setUnidadMedida(DATOS.unidadMedida);
    this.tramite110201Store.setTipoFactura(DATOS.tipoFactura);
    this.tramite110201Store.setFecha(DATOS.fecha);
    this.tramite110201Store.setNFactura(DATOS.numeroFactura);
    this.tramite110201Store.setJustificacion(DATOS.justificacion);
    this.tramite110201Store.setCheckbox(DATOS.casillaVerificacion);
  }
  /**
     * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
     * @returns Observable con los datos del formulario.
     */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110201State> {
    return this.http.get<Solicitud110201State>('assets/json/110201/registro_toma_muestras_mercancias.json');
  }

}
