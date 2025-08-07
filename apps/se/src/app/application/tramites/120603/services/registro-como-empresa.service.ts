import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Solicitud120603State, Solicitud120603Store } from '../estados/tramite120603.store';

@Injectable({
  providedIn: 'root'
})
export class RegistroComoEmpresaService {

  /**
   * Constructor del servicio RegistroComoEmpresaService.
   * @param http - Cliente HTTP para realizar solicitudes.
   * @param solicitud120603Store - Store para manejar el estado de la solicitud 120603.
   */
  constructor(private http: HttpClient, private solicitud120603Store: Solicitud120603Store) {}
  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS - Datos de tipo Solicitud120603State que se utilizarán para actualizar el estado del formulario.
   */
  actualizarEstadoFormulario(DATOS: Solicitud120603State): void {
     this.solicitud120603Store.setEstado(DATOS.estado);
     this.solicitud120603Store.setRepresentacionFederal(DATOS.representacionFederal);
     this.solicitud120603Store.setTipoEmpresa(DATOS.tipoEmpresa);
     this.solicitud120603Store.setEspecifique(DATOS.apellidoPaterno);
     this.solicitud120603Store.setActividadEconomicaPreponderante(DATOS.actividadEconomicaPreponderante);   
     this.solicitud120603Store.setDescripcion(DATOS.descripcion); 
     this.solicitud120603Store.setPais(DATOS.pais);
     this.solicitud120603Store.setCodigoPostal(DATOS.codigoPostal);
     this.solicitud120603Store.setEstadoDomicilio(DATOS.estadoDomicilio);
     this.solicitud120603Store.setMunicipioAlcaldia(DATOS.municipioAlcaldia);
      this.solicitud120603Store.setLocalidad(DATOS.localidad);
     this.solicitud120603Store.setColonia(DATOS.colonia);   
     this.solicitud120603Store.setCalle(DATOS.calle); 
     this.solicitud120603Store.setNumeroExterior(DATOS.numeroExterior);
     this.solicitud120603Store.setNumeroInterior(DATOS.numeroInterior);
     this.solicitud120603Store.setLada(DATOS.lada);   
     this.solicitud120603Store.setTelefono(DATOS.telefono); 
     this.solicitud120603Store.setNacionalidad(DATOS.nacionalidad);
     this.solicitud120603Store.setTipoDePersona(DATOS.tipoDePersona);
     this.solicitud120603Store.setTaxId(DATOS.taxId);   
     this.solicitud120603Store.setRazonSocial(DATOS.razonSocial); 
     this.solicitud120603Store.setDatosPais(DATOS.datosPais);
     this.solicitud120603Store.setDatosCodigoPostal(DATOS.datosCodigoPostal);
     this.solicitud120603Store.setDatosEstado(DATOS.datosEstado);   
     this.solicitud120603Store.setCorreoElectronico(DATOS.correoElectronico); 
     this.solicitud120603Store.setRegistroFederal(DATOS.registroFederal);
     this.solicitud120603Store.setNombre(DATOS.nombre);
     this.solicitud120603Store.setApellidoPaterno(DATOS.apellidoPaterno);
  }

  /**
   * Obtiene los datos de la consulta desde un archivo JSON local.
   * @returns Un Observable que emite un objeto de tipo Solicitud120603State.
   */
  getConsultaData(): Observable<Solicitud120603State> {
    return this.http.get<Solicitud120603State>('assets/json/120603/consulta.json');
  }

  /**
   * Obtiene los datos del estado desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/estado.json');
  }

  /**
   * Obtiene los datos de representación federal desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getRepresentacionFederalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/representacionfederal.json');
  }

  /**
   * Obtiene los datos del tipo de empresa desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getTipoDeEmpresaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/tipoDeEmpresaData.json');
  }

  /**
   * Obtiene los datos de socios y accionistas desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getSociosYAaccionistasData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasData.json');
  }

  /**
   * Obtiene los datos de socios y accionistas extranjeros desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getSociosYAccionistasExtranjerosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/sociosYAccionistasExtranjerosData.json');
  }

  /**
   * Obtiene los datos de países desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/paisData.json');
  }

  /**
   * Obtiene los datos de sucursales desde un archivo JSON local.
   * @returns Un Observable que emite una lista de objetos de tipo Catalogo.
   */
  getSucursalData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/120603/seleccionDeSucursal.json');
  }
}