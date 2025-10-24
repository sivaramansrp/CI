import { HttpCoreService, JSONResponse } from '@libs/shared/data-access-user/src';
import { Solicitud110208State, Tramite110208Store } from '../../../estados/tramites/tramite110208.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROC_110208 } from '../servers/api-route';
import { Tramite110208Query } from '../../../estados/queries/tramite110208.query';

/**
 * Servicio encargado de manejar la lógica relacionada con la solicitud del trámite 110208.
 * Se encarga de actualizar el estado de la solicitud en el store y de obtener datos precargados desde archivos JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class Solocitud110208Service {
  /**
   * URL base del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor que contiene los catálogos auxiliares en formato JSON.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a servicios o archivos locales.
   * @param tramite110208Store Store personalizado para el manejo del estado del trámite 110208.
   */
  constructor(
    private http: HttpClient,
    private tramite110208Store: Tramite110208Store,
    private query: Tramite110208Query,
    private httpService: HttpCoreService,
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   * 
   * @param DATOS Objeto con la estructura completa del estado del formulario del trámite 110208.
   */
  actualizarEstadoFormulario(DATOS: Solicitud110208State): void {
    this.tramite110208Store.setEntidadFederativa(DATOS.entidadFederativa);
    this.tramite110208Store.setBloque(DATOS.bloque);
    this.tramite110208Store.setFraccionArancelariaForm(DATOS.fraccionArancelariaForm);
    this.tramite110208Store.setRegistroProductoForm(DATOS.registroProductoForm);
    this.tramite110208Store.setNombreComercialForm(DATOS.nombreComercialForm);
    this.tramite110208Store.setFechaInicio(DATOS.fechaInicio);
    this.tramite110208Store.setFechaFinal(DATOS.fechaFinal);
    this.tramite110208Store.setTercerOperador(DATOS.tercerOperador);
    this.tramite110208Store.setMarca(DATOS.marca);
    this.tramite110208Store.setUmc(DATOS.umc);
    this.tramite110208Store.setCantidad(DATOS.cantidad);
    this.tramite110208Store.setValorDeLa(DATOS.valorDeLa);
    this.tramite110208Store.setComplementoDescripcion(DATOS.complementoDescripcion);
    this.tramite110208Store.setNFactura(DATOS.nFactura);
    this.tramite110208Store.setTipoDeFactura(DATOS.tipoDeFactura);
    this.tramite110208Store.setFechaFactura(DATOS.fechaFactura);
    this.tramite110208Store.setNombres(DATOS.nombres);
    this.tramite110208Store.setPrimerApellido(DATOS.primerApellido);
    this.tramite110208Store.setSegundoApellido(DATOS.segundoApellido);
    this.tramite110208Store.setNumeroFiscal(DATOS.numeroFiscal);
    this.tramite110208Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110208Store.setCiudad(DATOS.ciudad);
    this.tramite110208Store.setCalle(DATOS.calle);
    this.tramite110208Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110208Store.setLada(DATOS.lada);
    this.tramite110208Store.setTelefono(DATOS.telefono);
    this.tramite110208Store.setFax(DATOS.fax);
    this.tramite110208Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite110208Store.setPaisDestino(DATOS.paisDestino);
    this.tramite110208Store.setMedioTransporte(DATOS.medioTransporte);
    this.tramite110208Store.setRutaCompleta(DATOS.rutaCompleta);
    this.tramite110208Store.setPuertoDeEmbarque(DATOS.puertoDeEmbarque);
    this.tramite110208Store.setPuertoDeDesembarque(DATOS.puertoDeDesembarque);
    this.tramite110208Store.setObservaciones(DATOS.observaciones);
    this.tramite110208Store.setIdioma(DATOS.idioma);
    this.tramite110208Store.setEntidadFederativaCertificado(DATOS.entidadFederativaCertificado);
    this.tramite110208Store.setRepresentacionFederal(DATOS.representacionFederal);
    this.tramite110208Store.setEntidadFederativaCertificado(DATOS.entidadFederativaCertificado);
  }

  /**
   * Obtiene los datos precargados desde un archivo JSON relacionado con el registro de toma de muestras de mercancías.
   * Este archivo contiene información que se puede utilizar para precargar el estado del formulario.
   * 
   * @returns Observable con la estructura del estado de la solicitud.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110208State> {
    return this.http.get<Solicitud110208State>('assets/json/110208/registro_toma_muestras_mercancias.json');
  }

   /**
 * Obtiene todos los datos del estado almacenado en el store.
 * @returns {Observable<Tramite110212State>} Observable con todos los datos del estado.
 */
  getAllState(): Observable<Solicitud110208State> {
    return this.query.selectSolicitud$;
  }

  /**
   * 
   * @param body - Objeto que contiene los datos para buscar mercancías.
   * @returns 
   */
  buscarMercanciasCert(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110208.BUSCAR, { body: body });
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   * 
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110208.GUARDAR, { body: body });
  }

  /**
  * Construye un arreglo de mercancías seleccionadas a partir de los datos proporcionados.
  * @param arr Arreglo de objetos con los datos de las mercancías seleccionadas.
  * @returns Arreglo de objetos con la estructura requerida para las mercancías seleccionadas.
  * */
  buildMercanciaSeleccionadas(array: unknown[]): unknown[] {
    const RESULT: unknown[] = [];

    array.forEach((arr) => {
      const ITEM = arr as {
        id?: number;
        fraccionArancelaria?: string;
        nombreTecnico?: string;
        nombreComercial?: string;
        numeroDeRegistrodeProductos?: string;
        fechaExpedicion?: string;
        fechaVencimiento?: string;
        tipoFactura?: string;
        numFactura?: string;
        complementoDescripcion?: string;
        fechaFactura?: string;
        cantidad?: string;
        umc?: string;
        unidadMedida?: string;
        valorMercancia?: string;
      };

      RESULT.push({
        id: ITEM.id,
        fraccion_arancelaria: ITEM.fraccionArancelaria,
        cantidad: ITEM.cantidad,
        unidad_medida: ITEM.unidadMedida,
        valor_mercancia: ITEM.valorMercancia,
        nombreTecnico: ITEM.nombreTecnico,
        nombre_comercial: ITEM.nombreComercial,
        registro_producto: ITEM.numeroDeRegistrodeProductos,
        fechaExpedicion: ITEM.fechaExpedicion,
        fechaVencimiento: ITEM.fechaVencimiento,
        tipo_factura: ITEM.tipoFactura,
        num_factura: ITEM.numFactura,
        complemento_descripcion: ITEM.complementoDescripcion,
        fecha_factura: ITEM.fechaFactura,
        umc: ITEM.umc,
      });
    });

    return RESULT;
  }

  /** Construye el objeto datos del certificado a partir del estado del trámite TramiteState. */
  buildDatosCertificado(data: Solicitud110208State): unknown {
    return {
      observaciones: data.formDatosCertificado['observacionesDates'] ?? '',
      idioma: data.formDatosCertificado['idiomaDates'] ?? 0,
      presenta: data.formDatosCertificado['presentaDates'] ?? 'ghgh',
      precisa: data.formDatosCertificado['precisaDates'] ?? 'grrfgh',
      representacion_federal: {
        entidad_federativa: data.formDatosCertificado['EntidadFederativaDates'] ?? 0,
        representacion_federal: data.formDatosCertificado['representacionFederalDates'] ?? 0
      },
        desea_obtener_certificado: false,
        justificacion: "wertyu"
      
    }
  }
  /** Construye el objeto certificado a partir del estado del trámite TramiteState. */
  buildCertificado(item: Solicitud110208State): unknown {
    return {
      tratado_acuerdo: item.formCertificado['entidadFederativa'] || '',
      pais_bloque: item.formCertificado['bloque'] || '',
      fraccion_arancelaria: item.formCertificado['fraccionArancelaria'] || '',
      nombre_comercial: item.formCertificado['nombreComercial'] || '',
      fecha_inicio: item.formCertificado['fechaInicio'] || '',
      fecha_fin: item.formCertificado['fechaFin'] || '',
      registro_producto: item.formCertificado['registroProducto'] || '',
      mercancias_seleccionadas: this.buildMercanciaSeleccionadas(item.mercanciaTabla),
    };
  }
  /** Construye el objeto destinatario a partir del estado del trámite TramiteState. */
  buildDestinatario(data: Solicitud110208State): unknown {
    return {
        nombre: data.formDatosDelDestinatario['nombres'],
        primer_apellido: data.formDatosDelDestinatario['primerApellido'],
        segundo_apellido: data.formDatosDelDestinatario['segundoApellido'],
        numero_registro_fiscal: data.formDatosDelDestinatario['numeroDeRegistroFiscal'],
        razon_social: data.formDatosDelDestinatario['razonSocial'],
        domicilio: {
          ciudad_poblacion_estado_provincia: data.formDestinatario['ciudad'],
          calle: data.formDestinatario['calle'],
          numero_letra: data.formDestinatario['numeroLetra'],
          lada: data.formDestinatario['lada'],
          telefono: data.formDestinatario['telefono'],
          fax: data.formDestinatario['fax'],
          correo_electronico: data.formDestinatario['correoElectronico'],
          pais_destino: data.formDestinatario['paisDestin']
        },
         medio_transporte: data.medioDeTransporteSeleccion?.clave || '',
          ruta_completa: data.rutaCompleta || '',
          puerto_embarque: data.puertoDeEmbarque || '',
          puerto_desembarque: data.puertoDeDesembarque || ''
          
      }
    }
}
