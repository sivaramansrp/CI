import {
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
} from '../../constantes/modificacion.enum';
import {
  Complimentaria,
  Federetarios,
  Operacions,
} from '../../models/plantas-consulta.model';
import { Component, OnDestroy } from '@angular/core';
import {
  Solicitud80301State,
  Tramite80301Store,
} from '../../estados/tramite80301.store';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { ComplementariaComponent } from '../../../../shared/components/complementaria/complementaria.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ServiciosImmex } from '../../../../shared/models/complementaria.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80301Query } from '../../estados/tramite80301.query';

/**
 * Componente que muestra la información complementaria relacionada con un trámite,
 * incluyendo socios, fedatarios, operaciones, empresas, plantas y servicios IMMEX.
 * @component DatosComplimentariaComponent
 */
@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [ComplementariaComponent],
})

/**
 * Clase que representa el componente de información complementaria relacionada con un trámite.
 * @class DatosComplimentariaComponent
 */
export class DatosComplimentariaComponent implements OnDestroy {
  /**
   * Configuración de las columnas de la tabla para los federetarios.
   * @type {ConfiguracionColumna<Federetarios>[]}
   */
  configuracionFederetios: ConfiguracionColumna<Federetarios>[] =
    CONFIGURACION_FEDERETARIOS;

  /**
   * Configuración de las columnas de la tabla para las operaciones.
   * @type {ConfiguracionColumna<Operacions>[]}
   */
  configuracionOperacion: ConfiguracionColumna<Operacions>[] =
    CONFIGURACION_OPERACIONES;

  /**
   * Datos de los federetarios obtenidos desde el servicio.
   * @type {Federetarios[]}
   */
  datosFederetarios: Federetarios[] = [];

  /**
   * Datos de las operaciones obtenidos desde el servicio.
   * @type {Operacions[]}
   */
  datosOperacions: Operacions[] = [];

  /**
   * Datos de la complimentaria obtenidos desde el servicio.
   * @type {Complimentaria[]}
   */
  datosComplimentaria: Complimentaria[] = [];

  /**
   * Datos de los servicios Immex obtenidos desde el servicio.
   * @type {ServiciosImmex[]}
   */
  datosServiciosImmex: ServiciosImmex[] = [];

  /**
   * Buscar ID de la solicitud
   * @type {string[]}
   */
  buscarIdSolicitud!: string[];

  /**
   * Estado de la solicitud del trámite 80301.
   * @type {Solicitud80301State}
   */
  solicitud80301State!: Solicitud80301State;

  /**
   * Certificación SAT
   * @type {string}
   */
  certificacionSAT: string = '';

  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto ayuda a prevenir fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente DatosComplimentariaComponent.
   * @param solicitudService Servicio para manejar las solicitudes generales.
   * @param tramite80301Query Consulta para obtener el estado del trámite 80301.
   * @param tramite80301Store Almacén para gestionar el estado del trámite 80301.
   */
  constructor(
    public solicitudService: SolicitudService,
    private tramite80301Query: Tramite80301Query,
    private tramite80301Store: Tramite80301Store
  ) {
    this.tramite80301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        filter((solicitud) => Boolean(solicitud?.buscarIdSolicitud?.length)),
        take(1)
      )
      .subscribe((solicitud) => {
        this.buscarIdSolicitud = solicitud?.buscarIdSolicitud || [];

        if (this.buscarIdSolicitud.length > 0) {
          this.buscarDatosCertificacionSAT(solicitud.loginRfc);
          this.obtenerFederetarios();
          this.obtenerOperacions();
          this.obtenerComplimentaria();
          this.obtenerServiciosImmex();
        }
      });
  }

  /**
   * Método que obtiene los datos de certificación SAT desde el servicio.
   * Asigna el dato obtenido a la variable `certificacionSAT`.
   * @param rfc RFC para buscar los datos de certificación SAT.
   */
  buscarDatosCertificacionSAT(rfc: string): void {
    this.solicitudService
      .obtenerDatosCertificacionSAT(rfc)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.certificacionSAT = respuesta.datos?.certificacionSAT || '';
        this.tramite80301Store.setCertificacionSAT(this.certificacionSAT);
      });
  }

  /**
   * Método que obtiene los datos de complimentaria desde el servicio.
   * Asigna los datos obtenidos a la variable `datosComplimentaria`.
   * @return {void}
   */
  obtenerComplimentaria(): void {
    this.solicitudService
      .obtenerComplimentaria(this.buscarIdSolicitud)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response) => {
        this.datosComplimentaria =
          response.datos?.map((item: Complimentaria) => ({
            rfc: item.rfc,
            nombre: item.nombre,
            apellidoPaterno: item.apellidoPaterno,
            apellidoMaterno: item.apellidoMaterno,
          })) || [];
        this.tramite80301Store.setSociosAccionistas(this.datosComplimentaria);
      });
  }

  /**
   * Método que obtiene los datos de federetarios desde el servicio.
   * Asigna los datos obtenidos a la variable `datosFederetarios`.
   * @return {void}
   */
  obtenerFederetarios(): void {
    this.solicitudService
      .obtenerFederetarios(this.buscarIdSolicitud)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosFederetarios =
          data.datos?.map((item) => ({
            nombreNotario: item.nombreNotario,
            apellidoPaterno: item.apellidoPaterno,
            apellidoMaterno: item.apellidoMaterno,
            numeroActa: item.numeroActa,
            fechaActa: item.fechaActa,
            numeroNotaria: item.numeroNotaria,
            delegacionMunicipio: item.delegacionMunicipio,
            entidadFederativa: item.entidadFederativa,
          })) || [];
        this.tramite80301Store.setNotarios(this.datosFederetarios);
      });
  }

  /**
   * Método que obtiene los datos de operaciones desde el servicio.
   * Asigna los datos obtenidos a la variable `datosOperacions`.
   * @return {void}
   */
  obtenerOperacions(): void {
    this.solicitudService
      .obtenerOperacion(this.buscarIdSolicitud)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosOperacions =
          data.datos?.map((item) => ({
            calle: item.calle,
            numeroExterior: item.numeroExterior,
            numeroInterior: item.numeroInterior,
            codigoPostal: item.codigoPostal,
            colonia: item.colonia,
            localidad: item.localidad,
            delegacionMunicipio: item.delegacionMunicipio,
            entidadFederativa: item.entidadFederativa,
            pais: item.pais,
            rfc: item.rfc,
            domicilioFiscal: item.domicilioFiscal,
            razonSocial: item.razonSocial,
            desEstatus: item.desEstatus,
          })) || [];
        this.tramite80301Store.setPlanta(this.datosOperacions);
      });
  }

  /**
   * Método que obtiene los datos de servicios Immex desde el servicio.
   * Asigna los datos obtenidos a la variable `datosServiciosImmex`.
   * @return {void}
   */
  obtenerServiciosImmex(): void {
    this.solicitudService
      .obtenerServiciosImmex(this.buscarIdSolicitud)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((servicio) => {
        this.datosServiciosImmex =
          servicio.datos?.map((item) => ({
            descripcion: item.descripcion,
            descripcionTipo: item.descripcionTipo,
            descripcionTestado: item.descripcionTestado,
            desEstatus: item.desEstatus,
          })) || [];
        this.tramite80301Store.setServiciosImmex(this.datosServiciosImmex);
      });
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   * @return {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}