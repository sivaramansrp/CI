import { Asociados } from '../models/asociados.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ClavesDeLotes } from '../models/claves-de-lotes.model';
import { ConsultaDatos, DatosDeSolicitud, RespuestaConsulta } from '../models/solicitud-datos.model';
import { Destinatario } from '../models/destinatario.model';
import { DestinatarioCatalogos } from '../models/destinatario.model';
import { DestinatarioImitar } from '../models/mercancia.model';
import { Fabricante } from '../models/fabricante.model';
import { Facturador } from '../models/facturador.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/mercancia.model';
import { MercanciaCatalogos } from '../models/mercancia.model';
import { MercanciaCrossList } from '../models/mercancia.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { SCIAN } from '../models/SCIAN.model';
import { Solicitud } from '../models/solicitud-datos.model';
import { Solicitud260910Store } from '../estados/tramites260910.store';

/**
 * Servicio `SolicitudDatosService`.
 * Este servicio se encarga de gestionar las operaciones relacionadas con los datos de la solicitud 260910.
 * Realiza llamadas HTTP para obtener catálogos, datos de mercancías, destinatarios, pagos y más.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudDatosService {
  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(public http: HttpClient, private solicitudStore: Solicitud260910Store) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Obtiene los datos generales de la solicitud.
   * @returns Observable con los datos de la solicitud.
   */
  obtenerDatosDeSolicitud(): Observable<DatosDeSolicitud> {
    return this.http
      .get<DatosDeSolicitud>('../../../assets/json/260910/solicitud-datos.json')
      .pipe();
  }

  /**
   * Obtiene los datos de la solicitud específica.
   * @returns Observable con la solicitud.
   */
  obtenerSolicitud(): Observable<Solicitud> {
    return this.http
      .get<Solicitud>('../../../assets/json/260910/solicitud.json')
      .pipe();
  }

  /**
   * Obtiene el catálogo de regímenes disponibles.
   * @returns Observable con el catálogo de regímenes.
   */
  obtenerRegimenDestinaraListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>(
        '../../../assets/json/260910/regimen-destinaran.json'
      )
      .pipe();
  }

  /**
   * Obtiene el catálogo de aduanas disponibles.
   * @returns Observable con el catálogo de aduanas.
   */
  obtenerAduanaListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260910/aduana.json')
      .pipe();
  }

  /**
   * Obtiene el catálogo de estados disponibles.
   * @returns Observable con el catálogo de estados.
   */
  obtenerEstadoCatalogo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260910/estado-catalogo.json')
      .pipe();
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * @returns Observable con la lista de mercancías.
   */
  obtenerMercanciaListo(): Observable<Mercancia[]> {
    return this.http
      .get<Mercancia[]>('../../../assets/json/260910/mercancia.json')
      .pipe();
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * @returns Observable con la lista de mercancías.
   */
  obtenerSCIANMesa(): Observable<SCIAN[]> {
    return this.http
      .get<SCIAN[]>('../../../assets/json/260910/SCIAN.json')
      .pipe();
  }

  /**
   * Obtiene la lista de claves de lotes disponibles.
   * @returns Observable con las claves de lotes.
   */
  obtenerClavesDeLotesListo(): Observable<ClavesDeLotes[]> {
    return this.http
      .get<ClavesDeLotes[]>('../../../assets/json/260910/claves-de-lotes.json')
      .pipe();
  }

  /**
   * Obtiene la lista de destinatarios disponibles.
   * @returns Observable con los destinatarios.
   */
  obtenerDestinatarioListo(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('../../../assets/json/260910/destinatario.json')
      .pipe();
  }

  /**
   * Obtiene la lista de fabricantes disponibles.
   * @returns Observable con los fabricantes.
   */
  obtenerFabricanteListo(): Observable<Fabricante[]> {
    return this.http
      .get<Fabricante[]>('../../../assets/json/260910/fabricante.json')
      .pipe();
  }

  obtenerProveedorListo(): Observable<Proveedor[]> {
    return this.http
      .get<Proveedor[]>('../../../assets/json/260910/proveedor.json')
      .pipe();
  }

  obtenerFacturadorListo(): Observable<Facturador[]> {
    return this.http
      .get<Proveedor[]>('../../../assets/json/260910/facturador.json')
      .pipe();
  }

  obtenerTramitesAsociadosListo(): Observable<Asociados[]> {
    return this.http
      .get<Asociados[]>('../../../assets/json/260910/asociados.json')
      .pipe();
  }
  /**
   * Obtiene los catálogos relacionados con los destinatarios.
   * @returns Observable con los catálogos de destinatarios.
   */
  obtenerDestinatarioCatalogos(): Observable<DestinatarioCatalogos> {
    return this.http
      .get<DestinatarioCatalogos>(
        '../../../assets/json/260910/destinatario-catalogos.json'
      )
      .pipe();
  }

  /**
   * Obtiene las opciones de selección de tipo de persona (radio).
   * @returns Observable con las opciones de tipo de persona.
   */
  obtenerDestinatarioRadio(): Observable<
    { label: string; value: string | number }[]
  > {
    return this.http
      .get<{ label: string; value: string | number }[]>(
        '../../../assets/json/260910/destinatario-radio.json'
      )
      .pipe();
  }

  /**
   * Obtiene los catálogos relacionados con las mercancías.
   * @returns Observable con los catálogos de mercancías.
   */
  obtenerMercanciaCatalogos(): Observable<MercanciaCatalogos> {
    return this.http
      .get<MercanciaCatalogos>(
        '../../../assets/json/260910/mercancia-catalogos.json'
      )
      .pipe();
  }

  /**
   * Obtiene las listas cruzadas relacionadas con la mercancía.
   * @returns Observable con las listas cruzadas de la mercancía.
   */
  obtenerCrosslisto(): Observable<MercanciaCrossList> {
    return this.http
      .get<MercanciaCrossList>(
        '../../../assets/json/260910/mercancia-cross-list.json'
      )
      .pipe();
  }

  /**
   * Obtiene los datos relacionados con el pago de derechos.
   * @returns Observable con los datos de pago de derechos.
   */
  obtenerPagoDerechos(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260910/pago-derechos.json')
      .pipe();
  }

  /**
   * Obtiene un destinatario basado en datos de ejemplo (mock).
   * @returns Observable con un destinatario de ejemplo.
   */
  obtenerDestinatarioImitar(): Observable<DestinatarioImitar> {
    return this.http
      .get<DestinatarioImitar>(
        '../../../assets/json/260910/destinatario-mock.json'
      )
      .pipe();
  }

  /**
   * Obtiene el catálogo de SCIAN.
   * @returns Observable con el catálogo de SCIAN.
   */
  obtenerSCIANListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260910/clave-SCIAN.json')
      .pipe();
  }

  /**
   * Obtiene el catálogo de descripcion del SCIAN.
   * @returns Observable con el catálogo de de descripcion del SCIAN.
   */
  obtenerSCIANDescListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260910/clave-SCIAN-descripcion.json')
      .pipe();
  }

  /**
   * @method
   * @name getDatosConsulta
   * @description
   * Obtiene los datos para la consulta del trámite desde un archivo JSON.
   * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
   */
    getDatosConsulta(): Observable<RespuestaConsulta> {
      const RUTA_JSON = 'assets/json/260910/consulta-260910.json';
      return this.http.get<RespuestaConsulta>(RUTA_JSON).pipe(
        catchError((error) => throwError(() => error))
      );
    }

  /**
   * Actualiza el estado completo del formulario en el store
   * @param DATOS Objeto con todos los datos del formulario a actualizar
   */
  actualizarEstadoFormulario(DATOS: ConsultaDatos): void {
    this.solicitudStore.setTipoOperacion(DATOS?.tipoOperacion);
    this.solicitudStore.setObservaciones(DATOS?.observaciones);
    this.solicitudStore.setRfcSanitario(DATOS?.rfcSanitario);
    this.solicitudStore.setRazonSocial(DATOS?.razonSocial);
    this.solicitudStore.setCorreoElectronico(DATOS?.correoElectronico);
    this.solicitudStore.setCodigoPostal(DATOS?.codigoPostal);
    this.solicitudStore.setEstado(DATOS?.estado);
    this.solicitudStore.setMunicipio(DATOS?.municipio);
    this.solicitudStore.setLocalidad(DATOS?.localidad);
    this.solicitudStore.setColonia(DATOS?.colonia);
    this.solicitudStore.setCalle(DATOS?.calle);
    this.solicitudStore.setLada(DATOS?.lada);
    this.solicitudStore.setTelefono(DATOS?.telefono);
    this.solicitudStore.setAvisoDeFuncionamiento(DATOS?.avisoDeFuncionamiento);
    this.solicitudStore.setLicenciaSanitaria(DATOS?.licenciaSanitaria);
    this.solicitudStore.setLiveFreshFrozen(DATOS?.liveFreshFrozen);
    this.solicitudStore.setRegimen(DATOS?.regimen);
    this.solicitudStore.setAduana(DATOS?.aduana);
    this.solicitudStore.setClaveSCIAN(DATOS?.claveSCIAN);
    this.solicitudStore.setClaveSCIANDesc(DATOS?.claveSCIANDesc);
    this.solicitudStore.setHacerlos(DATOS?.hacerlos);
    this.solicitudStore.setRfc(DATOS?.rfc);
    this.solicitudStore.setLegalRazonSocial(DATOS?.legalRazonSocial);
    this.solicitudStore.setApellidoPaterno(DATOS?.apellidoPaterno);
    this.solicitudStore.setApellidoMeterno(DATOS?.apellidoMeterno);
    this.solicitudStore.setMercanciasDatos(DATOS?.mercanciasDatos);
    this.solicitudStore.setSCIANDatos(DATOS?.SCIANDatos);
    this.solicitudStore.setManifesto(DATOS?.manifesto);
    this.solicitudStore.setClasificacionProductos(DATOS?.clasificaionProductos);
    this.solicitudStore.setEspecificarProducto(DATOS?.especificarProducto);
    this.solicitudStore.setNombreProductoEspecifico(DATOS?.nombreProductoEspecifico);
    this.solicitudStore.setDistintiva(DATOS?.distintiva);
    this.solicitudStore.setCientifico(DATOS?.cientifico);
    this.solicitudStore.setTipoProducto(DATOS?.tipoProducto);
    this.solicitudStore.setFarmaceutica(DATOS?.farmaceutica);
    this.solicitudStore.setFisico(DATOS?.fisico);
    this.solicitudStore.setFraccionArancelaria(DATOS?.fraccionArancelaria);
    this.solicitudStore.setDescripcionFraccionArancelaria(DATOS?.descripcionFraccionArancelaria);
    this.solicitudStore.setCantidadUMT(DATOS?.cantidadUMT);
    this.solicitudStore.setUmt(DATOS?.umt);
    this.solicitudStore.setCantidadUMC(DATOS?.cantidadUMC);
    this.solicitudStore.setUmc(DATOS?.umc);
    this.solicitudStore.setPresentacionFarmaceutica(DATOS?.presentacionFarmaceutica);
    this.solicitudStore.setRegistroSanitario(DATOS?.registroSanitario);
    this.solicitudStore.setFechaCaducidad(DATOS?.fechaCaducidad);
    this.solicitudStore.setTipoPersona(DATOS?.tipoPersona);
    this.solicitudStore.setModificarRFC(DATOS?.modificarRFC);
    this.solicitudStore.setDenominacion(DATOS?.denominacion);
    this.solicitudStore.setDomicilioPais(DATOS?.domicilioPais);
    this.solicitudStore.setDomicilioEstado(DATOS?.domicilioEstado);
    this.solicitudStore.setDomicilioMunicipio(DATOS?.domicilioMunicipio);
    this.solicitudStore.setDomicilioLocalidad(DATOS?.domicilioLocalidad);
    this.solicitudStore.setDomicilioCodigo(DATOS?.domicilioCodigo);
    this.solicitudStore.setDomicilioColonia(DATOS?.domicilioColonia);
    this.solicitudStore.setDomicilioCalle(DATOS?.domiciliCalle);
    this.solicitudStore.setDomicilioNumeroExterior(DATOS?.domiciliNumeroExterior);
    this.solicitudStore.setDomicilioNumeroInterior(DATOS?.domiciliNumeroInterior);
    this.solicitudStore.setDomicilioLada(DATOS?.domiciliLada);
    this.solicitudStore.setDomicilioTelefono(DATOS?.domiciliTelefono);
    this.solicitudStore.setDomicilioCorreoElectronico(DATOS?.domiciliCorreoElectronioco);
    this.solicitudStore.setDestinatarioDatos(DATOS?.destinatarioDatos);
    this.solicitudStore.setFabricanteDatos(DATOS?.fabricanteDatos);
    this.solicitudStore.setProveedorDatos(DATOS?.proveedorDatos);
    this.solicitudStore.setFacturadorDatos(DATOS?.facturadorDatos);
    this.solicitudStore.setClaveDeReferencia(DATOS?.claveDeReferencia);
    this.solicitudStore.setCadenaDeDependencia(DATOS?.cadenaDeDependencia);
    this.solicitudStore.setBanco(DATOS?.banco);
    this.solicitudStore.setLiaveDePago(DATOS?.liaveDePago);
    this.solicitudStore.setFechaDePago(DATOS?.fechaDePago);
    this.solicitudStore.setImporteDePago(DATOS?.importeDePago);
  }

}
