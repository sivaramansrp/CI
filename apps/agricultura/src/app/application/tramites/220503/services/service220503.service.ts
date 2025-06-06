import { Solicitud220503State, Solicitud220503Store } from '../estados/tramites220503.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solocitud220503Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private solicitud220503Store: Solicitud220503Store,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: Solicitud220503State): void {
    this.solicitud220503Store.setCertificadosAutorizados(DATOS.certificadosAutorizados);
    this.solicitud220503Store.setMercancia(DATOS.mercancia);
    this.solicitud220503Store.setHoraDeInspeccion(DATOS.horaDeInspeccion);
    this.solicitud220503Store.setAduanaDeIngreso(DATOS.aduanaDeIngreso);
    this.solicitud220503Store.setSanidadAgropecuaria(DATOS.sanidadAgropecuaria);
    this.solicitud220503Store.setPuntoDeInspeccion(DATOS.puntoInspeccion);
    this.solicitud220503Store.setFechaDeInspeccion(DATOS.fechaDeInspeccion);
    this.solicitud220503Store.setNombre(DATOS.nombre);
    this.solicitud220503Store.setPrimerapellido(DATOS.primerapellido);
    this.solicitud220503Store.setSegundoapellido(DATOS.segundoapellido);
    this.solicitud220503Store.setTipocontenedor(DATOS.tipocontenedor);
    this.solicitud220503Store.setTransporteIdMedio(DATOS.transporteIdMedio);
    this.solicitud220503Store.setIdentificacionTransporte(DATOS.identificacionTransporte);
    this.solicitud220503Store.setEsSolicitudFerros(DATOS.esSolicitudFerros);
    this.solicitud220503Store.setTotalDeGuiasAmparadas(DATOS.totalDeGuiasAmparadas);
    this.solicitud220503Store.setFoliodel(DATOS.foliodel);
    this.solicitud220503Store.setAduanaIngreso(DATOS.aduanaIngreso);
    this.solicitud220503Store.setOficinaInspeccion(DATOS.oficinaInspeccion);
    this.solicitud220503Store.setPuntoInspeccion(DATOS.puntoInspeccion);
    this.solicitud220503Store.setClaveUCON(DATOS.claveUCON);
    this.solicitud220503Store.setEstablecimientoTIF(DATOS.establecimientoTIF);
    this.solicitud220503Store.setNumeroguia(DATOS.numeroguia);
    this.solicitud220503Store.setRegimen(DATOS.regimen);
    this.solicitud220503Store.setCapturaDatosMercancia(DATOS.capturaDatosMercancia);
    this.solicitud220503Store.setCoordenadas(DATOS.coordenadas);
    this.solicitud220503Store.setMovilizacion(DATOS.movilizacion);
    this.solicitud220503Store.setTransporte(DATOS.transporte);
    this.solicitud220503Store.setNombreEmpresa(DATOS.nombreEmpresa);
    this.solicitud220503Store.setPunto(DATOS.punto);
    this.solicitud220503Store.setExentoPagoNo(DATOS.exentoPagoNo);
    this.solicitud220503Store.setJustificacion(DATOS.justificacion);
    this.solicitud220503Store.setClaveReferencia(DATOS.claveReferencia);
    this.solicitud220503Store.setCadenaDependencia(DATOS.cadenaDependencia);
    this.solicitud220503Store.setBanco(DATOS.banco);
    this.solicitud220503Store.setIlavePago(DATOS.llavePago);
    this.solicitud220503Store.setImportePago(DATOS.importePago);
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud220503State> {
    return this.http.get<Solicitud220503State>('assets/json/220503/registro_toma_muestras_mercancias.json');
  }

}
