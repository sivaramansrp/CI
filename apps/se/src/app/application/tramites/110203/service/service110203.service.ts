import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud110203State, Tramite110203Store } from '../estados/tramite110203.store';

@Injectable({
  providedIn: 'root',
})
/** Servicio responsable de la lógica del trámite 110203.  
 *  Maneja la comunicación con APIs y gestión de estado relacionada. */
export class Solocitud110203Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
// URL base para consumir los catálogos auxiliares desde el servidor.
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

/** Constructor que inyecta servicios HTTP y el store del trámite 110203.  
 *  Utilizado para inicializar dependencias necesarias en el componente. */
  constructor(private http: HttpClient, private tramite110203Store: Tramite110203Store,) {
    // Lógica de inicialización si es necesario
  }
/** Actualiza el estado del formulario en el store con los datos proporcionados.  
 *  Establece el régimen seleccionado desde el objeto de estado.
 *  */
actualizarEstadoFormulario(DATOS: Solicitud110203State): void {
this.tramite110203Store.setTratado(DATOS.tratado);
this.tramite110203Store.setBloque(DATOS.bloque);
this.tramite110203Store.setOrigen(DATOS.origen);
this.tramite110203Store.setDestino(DATOS.destino);
this.tramite110203Store.setExpedicion(DATOS.expedicion);
this.tramite110203Store.setVencimiento(DATOS.vencimiento);
this.tramite110203Store.setNombre(DATOS.nombres);
this.tramite110203Store.setPrimer(DATOS.primer);
this.tramite110203Store.setSegundo(DATOS.segundo);
this.tramite110203Store.setFiscal(DATOS.fiscal);
this.tramite110203Store.setRazon(DATOS.razon);
this.tramite110203Store.setCalle(DATOS.calle);
this.tramite110203Store.setLetra(DATOS.letra);
this.tramite110203Store.setCiudad(DATOS.ciudad);
this.tramite110203Store.setCorreo(DATOS.correo);
this.tramite110203Store.setFax(DATOS.fax);
this.tramite110203Store.setTelefono(DATOS.telefono);
this.tramite110203Store.setMedio(DATOS.medio);
this.tramite110203Store.setPrecisa(DATOS.precisa);
this.tramite110203Store.setPresenta(DATOS.presenta);
this.tramite110203Store.setValorSeleccionado(DATOS.valorSeleccionado);
this.tramite110203Store.setNumeroDeCertificado(DATOS.numeroDeCertificado);
this.tramite110203Store.setTratadoAcuerdo(DATOS.tratadoAcuerdo);
this.tramite110203Store.setPaisBloque(DATOS.paisBloque);
this.tramite110203Store.setObservaciones(DATOS.observaciones);
this.tramite110203Store.setComercializacion(DATOS.comercializacion);
this.tramite110203Store.setTipo(DATOS.tipo);
this.tramite110203Store.setMedida(DATOS.medida);


  }
/** Obtiene los datos simulados del registro de toma de muestras de mercancías  
 *  desde un archivo JSON local para el trámite 110203. */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110203State> {
    return this.http.get<Solicitud110203State>('assets/json/110203/serviciosExtraordinarios.json');
  }

}