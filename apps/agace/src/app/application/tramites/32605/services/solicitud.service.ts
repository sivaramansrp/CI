import { EnlaceOperativo, RFCEnlaceOperativo } from '../models/solicitud.model';
import { GuardarDatosFormulario } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventarios } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { RecibirNotificaciones } from '../models/solicitud.model';
import { RepresentanteLegal } from '../models/solicitud.model';
import { SeccionSubcontratados } from '../models/solicitud.model';
import { Solicitud32605Store } from '../estados/solicitud32605.store';
import { SolicitudCatologoSelectLista } from '../models/solicitud.model';
import { SolicitudRadioLista } from '../models/solicitud.model';
import { TransportistasTable } from '../models/solicitud.model';

/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32605 a partir de archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32605 a partir de archivos JSON locales.
 */
export class SolicitudService {
  /**
   * Constructor que inyecta el cliente HTTP.
   * @param http - Cliente HTTP para realizar peticiones.
   */
  constructor(
    private http: HttpClient,
    public solicitud32605Store: Solicitud32605Store
  ) {
    // Lógica del constructor aquí
  }

  /**
   * Obtiene la lista de opciones para recibir notificaciones.
   */
  conseguirRecibirNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>(
      'assets/json/32605/recibir-notificaciones.json'
    );
  }

  /**
   * Obtiene la lista de enlaces operativos desde un archivo JSON local.
   * @returns Observable con un arreglo de EnlaceOperativo.
   */
  conseguirEnlaceOperativoDatos(): Observable<EnlaceOperativo[]> {
    return this.http.get<EnlaceOperativo[]>(
      'assets/json/32605/enlace-operativo-datos.json'
    );
  }

  /**
   * Obtiene los datos del representante legal desde un archivo JSON local.
   * @returns Observable con un objeto de tipo RepresentanteLegal.
   */
  conseguirRepresentanteLegalDatos(): Observable<RepresentanteLegal> {
    return this.http.get<RepresentanteLegal>(
      'assets/json/32605/representante-legal-datos.json'
    );
  }

  /**
   * Obtiene las opciones de radio de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SolicitudRadioLista.
   */
  conseguirOpcionDeRadio(): Observable<SolicitudRadioLista> {
    return this.http.get<SolicitudRadioLista>(
      'assets/json/32605/solicitud-radio-lista.json'
    );
  }

  

  /**
   * Obtiene los catálogos selectivos de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SolicitudCatologoSelectLista.
   */
  conseguirSolicitudCatologoSelectLista(): Observable<SolicitudCatologoSelectLista> {
    return this.http.get<SolicitudCatologoSelectLista>(
      'assets/json/32605/solicitud-catologo-select-lista.json'
    );
  }

  /**
   * Obtiene los datos de la sección de subcontratados desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SeccionSubcontratados.
   */
  conseguirSeccionSubcontratados(): Observable<SeccionSubcontratados> {
    return this.http.get<SeccionSubcontratados>(
      'assets/json/32605/seccion-subcontratados.json'
    );
  }

  /**
   * Obtiene los inventarios registrados desde un archivo JSON local.
   * @returns Observable con un arreglo de Inventarios.
   */
  conseguirInventarios(): Observable<Inventarios[]> {
    return this.http.get<Inventarios[]>(
      'assets/json/32605/inventarios-datos.json'
    );
  }

  /**
   * Realiza una solicitud HTTP GET para obtener los datos guardados del formulario
   * desde un archivo JSON local.
   *
   * @returns {Observable<GuardarDatosFormulario>} Un observable que emite los datos del formulario.
   */
  guardarDatosFormulario(): Observable<GuardarDatosFormulario> {
    return this.http.get<GuardarDatosFormulario>(
      'assets/json/32605/guardar-datos-formulario.json'
    );
  }

  /**
   * Actualiza el estado del formulario en el store `solicitud32605Store`
   * con los datos proporcionados en la respuesta.
   *
   * @param {GuardarDatosFormulario} resp - Objeto con la información del formulario a actualizar.
   */
  actualizarEstadoFormulario(resp: GuardarDatosFormulario): void {
    this.solicitud32605Store.actualizar190(resp[190]);
    this.solicitud32605Store.actualizar191(resp[191]);
    this.solicitud32605Store.actualizar199(resp[199]);
    this.solicitud32605Store.actualizar2034(resp[2034]);
    this.solicitud32605Store.actualizar236(resp[236]);
    this.solicitud32605Store.actualizar237(resp[237]);
    this.solicitud32605Store.actualizar238(resp[238]);
    this.solicitud32605Store.actualizar239(resp[239]);
    this.solicitud32605Store.actualizar240(resp[240]);
    this.solicitud32605Store.actualizar243(resp[243]);
    this.solicitud32605Store.actualizar244(resp[244]);
    this.solicitud32605Store.actualizar245(resp[245]);
    this.solicitud32605Store.actualizar246(resp[246]);
    this.solicitud32605Store.actualizar247(resp[247]);
    this.solicitud32605Store.actualizar248(resp[248]);
    this.solicitud32605Store.actualizar249(resp[249]);
    this.solicitud32605Store.actualizar250(resp[250]);
    this.solicitud32605Store.actualizar251(resp[251]);
    this.solicitud32605Store.actualizarIdPersonaSolicitud(
      resp.idPersonaSolicitud
    );
    this.solicitud32605Store.actualizarRfcTercero(resp.rfcTercero);
    this.solicitud32605Store.actualizarRfc(resp.rfc);
    this.solicitud32605Store.actualizarNombre(resp.nombre);
    this.solicitud32605Store.actualizarApellidoPaterno(resp.apellidoPaterno);
    this.solicitud32605Store.actualizarApellidoMaterno(resp.apellidoMaterno);
    this.solicitud32605Store.actualizarTelefono(resp.telefono);
    this.solicitud32605Store.actualizarCorreoElectronico(
      resp.correoElectronico
    );
    this.solicitud32605Store.actualizarEnlaceRfcTercero(
      resp.agregarEnlaceRfcTercero
    );
    this.solicitud32605Store.actualizarEnlaceRfc(resp.agregarEnlaceRfc);
    this.solicitud32605Store.actualizarEnlaceNombre(resp.agregarEnlaceNombre);
    this.solicitud32605Store.actualizarEnlaceApellidoPaterno(
      resp.agregarEnlaceApellidoPaterno
    );
    this.solicitud32605Store.actualizarEnlaceApellidoMaterno(
      resp.agregarEnlaceApellidoMaterno
    );
    this.solicitud32605Store.actualizarEnlaceCiudadEstado(
      resp.agregarEnlaceCiudadEstado
    );
    this.solicitud32605Store.actualizarEnlaceCargo(resp.agregarEnlaceCargo);
    this.solicitud32605Store.actualizarEnlaceTelefono(
      resp.agregarEnlaceTelefono
    );
    this.solicitud32605Store.actualizarEnlaceCorreoElectronico(
      resp.agregarEnlaceCorreoElectronico
    );
    this.solicitud32605Store.actualizarEnlaceSuplente(
      resp.agregarEnlaceSuplente
    );
    this.solicitud32605Store.actualizar2089(resp[2089]);
    this.solicitud32605Store.actualizar2090(resp[2090]);
    this.solicitud32605Store.actualizar2091(resp[2091]);
    this.solicitud32605Store.actualizar2042(resp[2042]);
    this.solicitud32605Store.actualizar2043(resp[2043]);
    this.solicitud32605Store.actualizar2044(resp[2044]);
    this.solicitud32605Store.actualizarFechaInicioComercio(
      resp.fechaInicioComercio
    );
    this.solicitud32605Store.actualizarFechaPago(resp.fechaPago);
    this.solicitud32605Store.actualizarMonto(resp.monto);
    this.solicitud32605Store.actualizarOperacionesBancarias(
      resp.operacionesBancarias
    );
    this.solicitud32605Store.actualizarLlavePago(resp.llavePago);
    this.solicitud32605Store.actualizarTransportistaRFC(resp.transportistaRFC);
    this.solicitud32605Store.actualizarTransportistaRFCModifTrans(
      resp.transportistaRFCModifTrans
    );
    this.solicitud32605Store.actualizarTransportistaRazonSocial(
      resp.transportistaRazonSocial
    );
    this.solicitud32605Store.actualizarTransportistaDomicilio(
      resp.transportistaDomicilio
    );
    this.solicitud32605Store.actualizarTransportistaCaat(
      resp.transportistaCaat
    );
    this.solicitud32605Store.actualizarTransportistaIdDomicilio(
      resp.transportistaIdDomicilio
    );
    this.solicitud32605Store.actualizarTransportistaIdRFC(
      resp.transportistaIdRFC
    );
    this.solicitud32605Store.actualizarTransportistaIdRazonSocial(
      resp.transportistaIdRazonSocial
    );
    this.solicitud32605Store.actualizarTransportistaIdCaat(
      resp.transportistaIdCaat
    );
    this.solicitud32605Store.actualizarMiembroCaracterDe(
      resp.miembroCaracterDe
    );
    this.solicitud32605Store.actualizarMiembroTributarMexico(
      resp.miembroTributarMexico
    );
    this.solicitud32605Store.actualizarMiembroNacionalidad(
      resp.miembroNacionalidad
    );
    this.solicitud32605Store.actualizarMiembroRFC(resp.miembroRfc);
    this.solicitud32605Store.actualizarMiembroRegistroFederal(
      resp.miembroRegistroFederal
    );
    this.solicitud32605Store.actualizarMiembroNombreCompleto(
      resp.miembroNombreCompleto
    );
    this.solicitud32605Store.actualizarMiembroTipoPersonaMuestra(
      resp.miembroTipoPersonaMuestra
    );
    this.solicitud32605Store.actualizarMiembroNombre(resp.miembroNombre);
    this.solicitud32605Store.actualizarMiembroApellidoPaterno(
      resp.miembroApellidoPaterno
    );
    this.solicitud32605Store.actualizarMiembroApellidoMaterno(
      resp.miembroApellidoMaterno
    );
    this.solicitud32605Store.actualizarMiembroNombreEmpresa(
      resp.miembroNombreEmpresa
    );
    this.solicitud32605Store.actualizarSubcontrataRFCBusqueda(
      resp.subcontrataRFCBusqueda
    );
    this.solicitud32605Store.actualizarSubcontrataRFC(resp.subcontrataRFC);
    this.solicitud32605Store.actualizarSubcontrataRazonSocial(
      resp.subcontrataRazonSocial
    );
    this.solicitud32605Store.actualizarSubcontrataEmpleados(
      resp.subcontrataEmpleados
    );
    this.solicitud32605Store.actualizarSubcontrataBimestre(
      resp.subcontrataBimestre
    );
    this.solicitud32605Store.actualizarPrincipales(resp.principales);
    this.solicitud32605Store.actualizarMunicipio(resp.municipio);
    this.solicitud32605Store.actualizarTipoDeInstalacion(
      resp.tipoDeInstalacion
    );
    this.solicitud32605Store.actualizarEntidadFederativa(
      resp.entidadFederativa
    );
    this.solicitud32605Store.actualizarRegistroSESAT(resp.registroSESAT);
    this.solicitud32605Store.actualizarDescripcion(resp.descripcion);
    this.solicitud32605Store.actualizarCodigoPostal(resp.codigoPostal);
    this.solicitud32605Store.actualizarProcesoProductivo(
      resp.procesoProductivo
    );
    this.solicitud32605Store.actualizarGoceDelInmueble(resp.goceDelInmueble);
    this.solicitud32605Store.actualizarEmpresa(resp.empresa);
    this.solicitud32605Store.actualizarComercioExterior(resp.comercioExterior);
    this.solicitud32605Store.actualizarMutuo(resp.mutuo);
    this.solicitud32605Store.actualizarCatseleccionados(resp.catseleccionados);
    this.solicitud32605Store.actualizarServicio(resp.servicio);
    this.solicitud32605Store.actualizarEmpleados(resp.empleados);
    this.solicitud32605Store.actualizarBimestre(resp.bimestre);
    this.solicitud32605Store.actualizarIndiqueTodos(resp.indiqueTodos);
    this.solicitud32605Store.actualizarFile1(resp.file1);
    this.solicitud32605Store.actualizarFile2(resp.file2);
    this.solicitud32605Store.actualizarIdentificacion(resp.identificacion);
    this.solicitud32605Store.actualizarLugarDeRadicacion(
      resp.lugarDeRadicacion
    );
    this.solicitud32605Store.actualizarCheckbox1(resp.checkbox1);
    this.solicitud32605Store.actualizarCheckbox2(resp.checkbox2);
    this.solicitud32605Store.actualizarCheckbox3(resp.checkbox3);
    this.solicitud32605Store.actualizarActualmente2(resp.actualmente2);
    this.solicitud32605Store.actualizarActualmente1(resp.actualmente1);
  }


  //service para guardar los datos del formulario---------------

   /**
   * Obtiene los datos de una empresa por RFC
   * @param rfc RFC de la empresa a buscar
   * @returns Observable con los datos de la empresa
   */
  conseguirDatosPorRFC(rfc: string): Observable<{ [key: string]: RFCEnlaceOperativo }> {
    return this.http.get<{ [key: string]: RFCEnlaceOperativo }>('assets/json/32605/rfc-datos.json');
  }
  /**
   * Obtiene la lista de transportistas desde un archivo JSON local.
   * @returns Observable con un arreglo de TransportistasTable.
   */
  conseguirTransportistasLista(): Observable<TransportistasTable[]> {
    return this.http.get<TransportistasTable[]>(
      'assets/json/32605/transportistas-lista.json'
    );
  }
}
