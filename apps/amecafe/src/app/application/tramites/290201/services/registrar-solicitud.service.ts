import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/tabla-model';

import { Solicitud290201State, Solicitud290201Store } from '../../../estados/tramites/tramites290201.store';

@Injectable({
  providedIn: 'root'
})
export class RegistrarSolicitudService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient, private solicitud290201Store: Solicitud290201Store) {}
  actualizarEstadoFormulario(DATOS: Solicitud290201State): void {
     this.solicitud290201Store.setFormasDelCafe(DATOS.formasdelcafe);
     this.solicitud290201Store.setTipos(DATOS.tipos);
     this.solicitud290201Store.setCalidad(DATOS.calidad);
     this.solicitud290201Store.setProcesos(DATOS.procesos);
     this.solicitud290201Store.setCertifications(DATOS.certifications);
     this.solicitud290201Store.setAdunadesalida(DATOS.adunadesalida);
     this.solicitud290201Store.setPaisdestino(DATOS.paisdestino);
     this.solicitud290201Store.setEntidaddeprocedencia(DATOS.entidaddeprocedencia);
     this.solicitud290201Store.setCiclocafetalero(DATOS.ciclocafetalero);
     this.solicitud290201Store.setEnvasadoen(DATOS.envasadoen);
     this.solicitud290201Store.setUtilizoCafeComo(DATOS.utilizoCafeComo);
     this.solicitud290201Store.setCantidadutilizada(DATOS.cantidadutilizada);
     this.solicitud290201Store.setNumerodepedimento(DATOS.numerodepedimento);
     this.solicitud290201Store.setPaisdeimportacion(DATOS.paisdeimportacion);
     this.solicitud290201Store.setFraccionarancelaria(DATOS.fraccionarancelaria);
     this.solicitud290201Store.setCantidad(DATOS.cantidad);
     this.solicitud290201Store.setUnidaddemedida(DATOS.unidaddemedida);
     this.solicitud290201Store.setPrecioapplicable(DATOS.precioapplicable);
     this.solicitud290201Store.setDolar(DATOS.dolar);
     this.solicitud290201Store.setLote(DATOS.lote);
     this.solicitud290201Store.setOtrasmarcas(DATOS.otrasmarcas);
     this.solicitud290201Store.setElcafe(DATOS.elcafe);
     this.solicitud290201Store.setFechaexportacion(DATOS.fechaexportacion);
     this.solicitud290201Store.setPaisdetransbordo(DATOS.paisdetransbordo);
     this.solicitud290201Store.setMediodetransporte(DATOS.mediodetransporte);
     this.solicitud290201Store.setIdentificadordel(DATOS.Identificadordel);
     this.solicitud290201Store.setObservaciones(DATOS.observaciones);
     this.solicitud290201Store.setTipoPersona(DATOS.tipoPersona);
     this.solicitud290201Store.setDenominacion(DATOS.denominacion);
     this.solicitud290201Store.setDomicilio(DATOS.domicilio);
     this.solicitud290201Store.setPais(DATOS.pais);
     this.solicitud290201Store.setCodigopostal(DATOS.codigopostal);
     this.solicitud290201Store.setTelefono(DATOS.telefono);
     this.solicitud290201Store.setCorreoelectronico(DATOS.correoelectronico);

  }

  /**
   * Obtiene los datos de tipos.
   * @returns Observable con los datos del catálogo de tipos.
   */
  getTiposData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/tipos.json');
  }

  /**
   * Obtiene los datos de formas del café.
   * @returns Observable con los datos del catálogo de formas del café.
   */
  getFormasdelcafeData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/formadelcafe.json');
  }

  /**
   * Obtiene los datos de calidad.
   * @returns Observable con los datos del catálogo de calidad.
   */
  getCalidadData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/calidad.json');
  }

  /**
   * Obtiene los datos de procesos.
   * @returns Observable con los datos del catálogo de procesos.
   */
  getProcesosData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/procesos.json');
  }

  /**
   * Obtiene los datos de aduana de salida.
   * @returns Observable con los datos del catálogo de aduana de salida.
   */
  getAduanadesalidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/adunadesalida.json');
  }

  /**
   * Obtiene los datos de entidad de procedencia.
   * @returns Observable con los datos del catálogo de entidad de procedencia.
   */
  getEntidadDeProcedenciaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/entidaddeprocedencia.json');
  }

  /**
   * Obtiene los datos del ciclo cafetalero.
   * @returns Observable con los datos del catálogo del ciclo cafetalero.
   */
  getCiclocafetaleroData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/ciclocafetalero.json');
  }

  /**
   * Obtiene los datos de envasado.
   * @returns Observable con los datos del catálogo de envasado.
   */
  getEnvasadoenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/envasadoen.json');
  }

  /**
   * Obtiene los datos de uso del café.
   * @returns Observable con los datos del catálogo de uso del café.
   */
  getUtilicoCafeComoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/utilizocafecomo.json');
  }

  /**
   * Obtiene los datos del país de importación.
   * @returns Observable con los datos del catálogo de país de importación.
   */
  getPaisDeImportacionData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');
  }

  /**
   * Obtiene los datos de fracción arancelaria.
   * @returns Observable con los datos del catálogo de fracción arancelaria.
   */
  getFraccionArancelariaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/fraccionarancelaria.json');
  }

  /**
   * Obtiene los datos de unidad de medida.
   * @returns Observable con los datos del catálogo de unidad de medida.
   */
  getUnidadDeMedidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/unidaddemedida.json');
  }

  /**
   * Obtiene los datos del dólar.
   * @returns Observable con los datos del catálogo del dólar.
   */
  getDollarData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/dolardata.json');
  }

  /**
   * Obtiene los datos del medio de transporte.
   * @returns Observable con los datos del catálogo de medio de transporte.
   */
  getMediaDeTransporte(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/mediodetransporte.json');
  }

  /**
   * Obtiene los datos del país.
   * @returns Observable con los datos del catálogo de país.
   */
  getPaisData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');
  }

  /**
   * Obtiene los datos de la solicitud.
   * @returns Observable con los datos de la solicitud.
   */
  getSolicitudData(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>('./assets/json/290201/solicitud.json');
  }

  /**
 * Obtiene los datos del país de destino.
 * @returns Observable con los datos del catálogo de país de destino.
 */
  getPaisDestinoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/paisdeimportacion.json');
  }

  /**
 * Obtiene los datos de certificación.
 * @returns Observable con los datos del catálogo de certificación.
 */
  getCertificacionData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/290201/certificacions.json');
  }

  /**
 * Obtiene los datos de consulta.
 * @returns Observable con los datos de la consulta.
 */
 getConsultaData(): Observable<Solicitud290201State> {
  return this.http.get<Solicitud290201State>('assets/json/290201/consulta.json');
}
/**
 * Obtiene los datos del destinatario.
 * @returns Observable con los datos del destinatario en formato `Solicitud290201State`.
 * @description Realiza una solicitud HTTP para obtener los datos del destinatario desde un archivo JSON.
 */
getDestinatarioData(): Observable<Solicitud290201State> {
  return this.http.get<Solicitud290201State>('assets/json/290201/destinatariodata.json');
}
}
