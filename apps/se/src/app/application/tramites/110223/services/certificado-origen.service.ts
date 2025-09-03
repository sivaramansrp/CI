import { Catalogo, CatalogoLista, DisponiblesTabla, MercanciasHistorico, MercanciasHistoricos, SeleccionadasTabla } from '../models/certificado-origen.model';
import { Observable,map } from 'rxjs';
import { Tramite110223Store, TramiteState } from '../estados/Tramite110223.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductorExportador } from '../models/certificado-origen.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

/**
 * Servicio para gestionar las operaciones relacionadas con el certificado de origen.
 * 
 * Este servicio proporciona métodos para obtener datos como idiomas, entidades federativas,
 * representaciones federales, productores/exportadores, mercancías disponibles y seleccionadas,
 * tratados y países desde archivos JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
    url: string = '../../../../../assets/json/110221/';
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient,private store: Tramite110223Store) { }

  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de idiomas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/idioma.json');
  }

  /**
   * Obtiene la lista de entidades federativas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de entidades federativas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/entidad-federativa.json');
  }

  /**
   * Obtiene la lista de representaciones federales disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de representaciones federales desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/representacion-federal.json');
  }

  /**
   * Obtiene la lista de productores/exportadores disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de productores/exportadores desde un archivo JSON.
   * 
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110223/productor-exportador.json');
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de mercancías disponibles desde un archivo JSON.
   * 
   * @returns {Observable<DisponiblesTabla[]>} Un observable que emite la lista de mercancías disponibles.
   */
  obtenerMercanciasDisponibles(): Observable<DisponiblesTabla[]> {
    return this.http
      .get<DisponiblesTabla[]>('assets/json/110223/mercancia-disponsible.json');
  }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de mercancías seleccionadas desde un archivo JSON.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable que emite la lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(): Observable<SeleccionadasTabla[]> {
    return this.http
      .get<SeleccionadasTabla[]>('assets/json/110223/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de tratados disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de tratados desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/pais.json');
  }

  /**
   * Obtiene la lista de países disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
  obtenerPais(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/pais.json');
  }
    /**
   * Obtiene los datos para la consulta del trámite.
   * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
   */
  getDatosConsulta(): Observable<TramiteState> {
    return this.http.get<TramiteState>('assets/json/110223/consulta_110223.json');
  }
    /**
     * @description Actualiza el estado completo del formulario en el store de acuicultura.
     * @param DATOS Objeto de tipo Acuicultura con los datos a actualizar.
     */
    public actualizarEstadoFormulario(DATOS: TramiteState): void {
      this.store.setEstado(DATOS.estado)
      this.store.setFactura(DATOS.factura)
      this.store.setUmc(DATOS.umcs)
      this.store.setBloque(DATOS.paisBloques)
      this.store.setaltaPlanta(DATOS.altaPlanta)
      this.store.setFormDatosCertificado(DATOS.formDatosCertificado);
      this.store.setFormCertificado(DATOS.formCertificado);
      this.store.setFormMercancia(DATOS.mercanciaForm);
      this.store.setbuscarMercancia(DATOS.buscarMercancia);
      this.store.setDestinatarioForm(DATOS.destinatarioForm)
      this.store.setDomicilioForm(DATOS.domicilioForm)
      this.store.setRepresentanteLegalForm(DATOS.representanteLegalForm)
    }
      /**
       * Obtiene la lista de mercancías desde un archivo JSON local.
       * @method obtenerMercancia
       * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
       */
       /**
        * @method obtenerMercancia
        * @descripcion
        * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
        * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
        */
       obtenerMercancia(): Observable<MercanciasHistorico> {
         return this.http
           .get<MercanciasHistorico>('assets/json/110223/mercancias-seleccionadas.json');
       }
          obtenerMercancias(): Observable<MercanciasHistoricos> {
              return this.http
                .get<MercanciasHistoricos>('assets/json/110221/mercancias-seleccionadas.json');
            }
      
      
        /**
         * Obtiene la lista de países bloque desde un archivo JSON local.
         * @method obtenerPaisBloque
         * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
         */
        obtenerPaisBloque(): Observable<Catalogo[]> {
          return this.http
            .get<{ data: Catalogo[] }>('assets/json/110204/país-bloque.json') // Solicita los datos del archivo JSON
            .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
        }
         /**
           * Obtiene la lista de estados desde un archivo JSON local.
           * @method obtenerListaEstado
           * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
           */
          obtenerListaEstado(): Observable<Catalogo[]> {
            return this.http
              .get<{ data: Catalogo[] }>('./assets/json/110204/estado.json') // Solicita los datos del archivo JSON
              .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
          }
          
            /**
             * Obtiene el catálogo de unidades de medida comercial (UMC).
             * @returns Observable con la respuesta del catálogo de UMC.
             */
            getUMC(): Observable<RespuestaCatalogos> {
              return this.http.get<RespuestaCatalogos>('assets/json/110223/umc.json');
            }
              /**
             * Obtiene la lista de facturas desde un archivo JSON local.
             * @method obtenerFacturas
             * @returns {Observable<Catalogo[]>} Observable con la lista de facturas.
             */
              obtenerFacturas(): Observable<Catalogo[]> {
                return this.http
                  .get<{ data: Catalogo[] }>('assets/json/110204/factura.json') // Solicita los datos del archivo JSON
                  .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
              }
                /**
                 * @method obtenerMenuDesplegable
                 * @descripcion
                 * Obtiene un arreglo de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
                 * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
                 * @returns Un `Observable` que emite un arreglo de objetos `Catalogo`.
                 * @usageNotes
                 * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
                 * y realiza una solicitud HTTP GET para recuperar los datos.
                 */
                obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
                  const BASE_URL = this.url + fileName;
                  return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
                    map(response => response.data)
                  );
                }
}