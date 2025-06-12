import { AvisoAgente, FusionDatos, FusionEscision, TercerosRelacionados } from '../../../core/models/30505/aviso-modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitud30505State, Solicitud30505Store } from '../../../core/estados/tramites/tramites30505.store';

/**
 * Servicio para gestionar operaciones relacionadas con terceros en el trámite 30505.
 * 
 * Proporciona métodos para obtener datos de terceros relacionados y datos de personas
 * a través de archivos JSON locales.
 * 
 * @remarks
 * Este servicio utiliza inyección de dependencias para acceder al cliente HTTP de Angular.
 */
@Injectable({
  providedIn: 'any'
})
export class TercerosRelacionadosService {
  /**
   * Constructor del servicio.
   * 
   * @param http - Cliente HTTP utilizado para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient,private tramiteStore: Solicitud30505Store) {
     // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del programa a cancelar desde un archivo JSON local.
   * 
   * @returns Observable que emite los datos del programa a cancelar.
   */
  obtenerDatos(): Observable<TercerosRelacionados> {
    return this.http.get<TercerosRelacionados>(`assets/json/30505/aviso.json`);
  }

  /**
   * @description
   * Obtiene los datos de una persona fusionando información desde un archivo JSON local,
   * utilizando el RFC proporcionado como parámetro de consulta.
   *
   * @param rfc El Registro Federal de Contribuyentes (RFC) de la persona a consultar.
   * @returns Un observable que emite un objeto de tipo FusionDatos con la información de la persona.
   *
   * @memberof TercerosRelacionadosService
   */
  obtenerDatosPersona(rfc: string): Observable<FusionDatos> {
    return this.http.get<FusionDatos>(`assets/json/30505/fusion.json`, { params: { rfc } });
  }

  /**
   * Fuente de datos reactiva que mantiene una lista de objetos de tipo `FusionEscision`.
   * Utiliza `BehaviorSubject` para emitir el estado actual y notificar a los suscriptores sobre cualquier cambio.
   * 
   * @private
   */
  private fusionSource = new BehaviorSubject<FusionEscision[]>([]);

  /**
   * Observable que expone el estado actual de la fuente de datos de fusión.
   * Permite a los suscriptores recibir actualizaciones cuando los datos de fusión cambian.
   */
  fusion$ = this.fusionSource.asObservable();

  /**
   * Actualiza la fuente de datos de fusiones con la lista proporcionada.
   *
   * @param data - Arreglo de objetos de tipo FusionEscision que representa las fusiones a establecer.
   */
  setFusionada(data: FusionEscision[]): void {
    this.fusionSource.next(data);
  }

  /**
   * Fuente de datos reactiva que mantiene una lista de objetos AvisoAgente.
   * Utiliza BehaviorSubject para emitir el estado actual y notificar a los suscriptores sobre cualquier cambio.
   * 
   * @private
   * @type {BehaviorSubject<AvisoAgente[]>}
   */
  private agenteSource = new BehaviorSubject<AvisoAgente[]>([]);

  /**
   * Observable que expone el estado actual del agente relacionado.
   * 
   * Permite a los componentes suscribirse para recibir actualizaciones
   * cuando el agente cambia en el flujo de la aplicación.
   */
  agente$ = this.agenteSource.asObservable();

  /**
   * Actualiza la fuente de datos de agentes con la lista proporcionada.
   *
   * @param data - Arreglo de objetos de tipo AvisoAgente que representa los agentes a establecer.
   */
  setAgente(data: AvisoAgente[]): void {
    this.agenteSource.next(data);
  }

   getAvisoDatos(): Observable<Solicitud30505State> {
    return this.http.get<any>('assets/json/30505/aviso-modificacion.json');
  }

  setDatosFormulario(datos:Solicitud30505State): void {
    this.tramiteStore.setNumeroEstablecimiento(datos.numeroEstablecimiento);
    this.tramiteStore.setDescClobGenerica(datos.descClobGenerica);
    this.tramiteStore.setActividadProductiva(datos.actividadProductiva);
    this.tramiteStore.setFechaInicioVigencia(datos.fechaInicioVigencia);
    this.tramiteStore.setFechaFinVigencia(datos.fechaFinVigencia);
    this.tramiteStore.setCheckboxDatos(datos.selectedCheckbox);
    this.tramiteStore.setFolioAcuse(datos.folioAcuse);
    this.tramiteStore.setTipoSolicitudPexim(datos.tipoSolicitudPexim);
    this.tramiteStore.setCapacidadAlmacenamiento(datos.capacidadAlmacenamiento);
    this.tramiteStore.setTipoCaat(datos.tipoCaat);
    this.tramiteStore.setTipoProgFomExp(datos.tipoProgFomExp);
    this.tramiteStore.setTipoTransito(datos.tipoTransito);
    this.tramiteStore.setMedioTransporte(datos.medioTransporte);
    this.tramiteStore.setNombreBanco(datos.nombreBanco);
    this.tramiteStore.setNomOficialAutorizado(datos.nomOficialAutorizado);
    this.tramiteStore.setObservaciones(datos.observaciones);
    this.tramiteStore.setEmpresaControladora(datos.empresaControladora);
    this.tramiteStore.setDescripcionLugarEmbarque(datos.descripcionLugarEmbarque);
    this.tramiteStore.setNumeroEstablecimiento(datos.numeroEstablecimiento);
    this.tramiteStore.updateFusionDatos(datos.fusionEscisionData || []);
    this.tramiteStore.updateAgenteDatos(datos.agenteDatos || {});
    if (datos && typeof (datos as any).avisoDatos === 'object' && (datos as any).avisoDatos !== null) {
      Object.entries((datos as any).avisoDatos).forEach(([key, value]) => {
        this.tramiteStore.setAvisoDatos(String(value),String(key));
      });
    }
    if (datos && typeof (datos as any).avisoCheckbox === 'object' && (datos as any).avisoCheckbox !== null) {
      Object.entries((datos as any).avisoCheckbox).forEach(([key, value]) => {
        this.tramiteStore.setAviso(Boolean(value),String(key));
      });
    }
  }
}