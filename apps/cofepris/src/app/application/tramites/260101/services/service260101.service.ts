import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../estados/tramites260101.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service260101Service {
  /**
   * Constructor de la clase.
   *
   * Inyecta los servicios necesarios para realizar peticiones HTTP y
   * para gestionar el estado del trámite 260101 mediante el store.
   *
   * @param http Cliente HTTP de Angular para realizar solicitudes al backend.
   * @param tramite301Store Store encargado de manejar el estado del trámite 260101.
   */
  constructor(
    private http: HttpClient,
    private tramite301Store: Solicitud260101Store
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario en el store `tramite301Store`
   * utilizando los datos proporcionados en el objeto `DATOS`.
   *
   * Cada campo del estado `Solicitud260101State` se asigna a su correspondiente
   * método setter en el store, asegurando que el estado del trámite 260101
   * esté completamente sincronizado con los datos recibidos.
   *
   * @param DATOS Objeto de tipo `Solicitud260101State` que contiene la información del formulario.
   */
actualizarEstadoFormulario(DATOS: Solicitud260101State): void {
  this.tramite301Store.setRazonSocial(DATOS.razonSocial);
  this.tramite301Store.setCorreoElectronico(DATOS.correoElectronico);
  this.tramite301Store.setCodigoPostal(DATOS.codigoPostal);
  this.tramite301Store.setFraccionArancelaria(DATOS.fraccionArancelaria);
  this.tramite301Store.setEstado(DATOS.estado);
  this.tramite301Store.setMunicipio(DATOS.municipio);
  this.tramite301Store.setLocalidad(DATOS.localidad);
  this.tramite301Store.setColonia(DATOS.colonia);
  this.tramite301Store.setCalle(DATOS.calle);
  this.tramite301Store.setLada(DATOS.lada);
  this.tramite301Store.setTelefono(DATOS.telefono);
  this.tramite301Store.setAvisoDeFuncionamiento(DATOS.avisoDeFuncionamiento);
  this.tramite301Store.setLicenciaSanitaria(DATOS.licenciaSanitaria);
  this.tramite301Store.setLiveFreshFrozen(DATOS.liveFreshFrozen);
  this.tramite301Store.setRegimen(DATOS.regimen);
  this.tramite301Store.setAduana(DATOS.aduana);
  this.tramite301Store.setHacerlos(DATOS.hacerlos);
  this.tramite301Store.setRfc(DATOS.rfc);
  this.tramite301Store.setLegalRazonSocial(DATOS.legalRazonSocial);
  this.tramite301Store.setApellidoPaterno(DATOS.apellidoPaterno);
  this.tramite301Store.setApellidoMeterno(DATOS.apellidoMeterno);
  this.tramite301Store.setDenominacion(DATOS.denominacion);
  this.tramite301Store.setDenominacionNombre(DATOS.denominacionNombre);
  this.tramite301Store.setDenominacionApellidoPaterno(DATOS.denominacionApellidoPaterno);
  this.tramite301Store.setDenominacionApellidoMaterno(DATOS.denominacionApellidoMaterno);
  this.tramite301Store.setModificarRFC(DATOS.modificarRFC);
  this.tramite301Store.setMercanciasDatos(DATOS.mercanciasDatos);
  this.tramite301Store.setClasificacionProductos(DATOS.clasificaionProductos);
  this.tramite301Store.setTipoPersona(DATOS.tipoPersona);
  this.tramite301Store.setEspecificarProducto(DATOS.especificarProducto);
  this.tramite301Store.setNombreProductoEspecifico(DATOS.nombreProductoEspecifico);
  this.tramite301Store.setMarca(DATOS.marca);
  this.tramite301Store.setTipoProducto(DATOS.tipoProducto);
  this.tramite301Store.setDescripcionFraccionArancelaria(DATOS.descripcionFraccionArancelaria);
  this.tramite301Store.setCantidadUMT(DATOS.cantidadUMT);
  this.tramite301Store.setUmt(DATOS.umt);
  this.tramite301Store.setCantidadUMC(DATOS.cantidadUMC);
  this.tramite301Store.setUmc(DATOS.umc);
  this.tramite301Store.setClaveDeLosLotes(DATOS.claveDeLosLotes);
  this.tramite301Store.setFechaFabricacion(DATOS.fechaFabricacion);
  this.tramite301Store.setFechaCaducidad(DATOS.fechaCaducidad);
  this.tramite301Store.setClavesDeLotes(DATOS.clavesDeLotes);
  this.tramite301Store.setManifesto(DATOS.manifesto);
  this.tramite301Store.setClaveDeReferencia(DATOS.claveDeReferencia);
  this.tramite301Store.setCadenaDeDependencia(DATOS.cadenaDeDependencia);
  this.tramite301Store.setBanco(DATOS.banco);
  this.tramite301Store.setLiaveDePago(DATOS.liaveDePago);
  this.tramite301Store.setFechaDePago(DATOS.fechaDePago);
  this.tramite301Store.setImporteDePago(DATOS.importeDePago);
  this.tramite301Store.setModificarDestinatario(DATOS.modificarDestinatario);
  this.tramite301Store.setModificarFabricante(DATOS.modificarFabricante);
  this.tramite301Store.setDomicilioPais(DATOS.domicilioPais);
  this.tramite301Store.setDomicilioEstado(DATOS.domicilioEstado);
  this.tramite301Store.setDomicilioMunicipio(DATOS.domicilioMunicipio);
  this.tramite301Store.setDomicilioLocalidad(DATOS.domicilioLocalidad);
  this.tramite301Store.setDomicilioColonia(DATOS.domicilioColonia);
  this.tramite301Store.setTercerosTipoPersona(DATOS.tercerosTipoPersona);
  this.tramite301Store.setTercerosRFC(DATOS.tercerosRFC);
  this.tramite301Store.setTercerosCurp(DATOS.tercerosCurp);
  this.tramite301Store.setTercerosDenominacion(DATOS.tercerosDenominacion);
  this.tramite301Store.setTercerosDenominacionNombre(DATOS.tercerosDenominacionNombre);
  this.tramite301Store.setTercerosApellidoPaterno(DATOS.tercerosApellidoPaterno);
  this.tramite301Store.setTercerosApellidoMaterno(DATOS.tercerosApellidoMaterno);
  this.tramite301Store.setTercerosPais(DATOS.tercerosPais);
  this.tramite301Store.setTercerosEstado(DATOS.tercerosEstado);
  this.tramite301Store.setTercerosMunicipio(DATOS.tercerosMunicipio);
  this.tramite301Store.setTercerosLocalidad(DATOS.tercerosLocalidad);
  this.tramite301Store.setTercerosColonia(DATOS.tercerosColonia);
  this.tramite301Store.setTercerosCalle(DATOS.tercerosCalle);
  this.tramite301Store.setLiaveDePago(DATOS.liaveDePago);
  this.tramite301Store.setScianSeleccionados(DATOS.scianSeleccionados);
  this.tramite301Store.setMercanciasSeleccionados(DATOS.mercanciasSeleccionados);
}


  /**
   * Obtiene los datos del registro de toma de muestras de mercancías
   * desde un archivo JSON local correspondiente al trámite 260101.
   *
   * @returns Un observable que emite un objeto de tipo `Solicitud260101State`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud260101State> {
    return this.http.get<Solicitud260101State>(
      'assets/json/260101/registro_toma_muestras_mercancias.json'
    );
  }
}
