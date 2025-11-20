import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  DatosModificacion,
  ExportacionImportacionDatos,
} from '../../../../shared/models/modificacion.model';
import {
  Solicitud80301State,
  Tramite80301Store,
} from '../../estados/tramite80301.store';
import { Subject, map, takeUntil } from 'rxjs';
import { DISCRIMINATOR_VALUE } from '../../constantes/modificacion.enum';
import { EliminacionModificacionComponent } from '../../../../shared/components/modificacion/modificacion.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80301Query } from '../../estados/tramite80301.query';

/**
 * Componente ModificacionComponent que maneja la lógica de modificación de trámites.
 * Proporciona funcionalidades para cargar y gestionar datos de modificación,
 * incluyendo datos de exportación e importación, y permite la interacción con el estado del trámite 80301.
 * @component ModificacionComponent
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [EliminacionModificacionComponent],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})

/**
 * Clase que representa el componente de modificación de trámites.
 * @class ModificacionComponent
 */
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Arreglo que almacena datos de importación para la tabla dinámica.
   *
   * Este arreglo se utiliza para gestionar y mostrar información
   * relacionada con los servicios de importación en la tabla de datos.
   * @property {ExportacionImportacionDatos[]} datosImportacionTabla
   */
  datosImportacionTabla: ExportacionImportacionDatos[] = [];

  /**
   * @property {DatosModificacion} datosModificacion
   * @description Datos relacionados con la modificación del trámite.
   */
  datosModificacion: DatosModificacion | undefined;

  /**
   * Arreglo que almacena datos de exportación para la tabla dinámica.
   *
   * Este arreglo se utiliza para gestionar y mostrar información
   * relacionada con los servicios de exportación en la tabla de datos.
   * @property {ExportacionImportacionDatos[]} datosExportacionTabla
   */
  datosExportacionTabla: ExportacionImportacionDatos[] = [];

  /**
   * Estado de la solicitud del trámite 80301.
   * @property {Solicitud80301State} solicitudState
   */
  solicitudState!: Solicitud80301State;

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente ModificacionComponent.
   * @param solicitudService Servicio para manejar solicitudes relacionadas con el trámite.
   * @param consultaioQuery Estado de la consulta.
   * @param tramite80301Query Consulta para obtener el estado del trámite 80301.
   * @param tramite80301Store Almacén para gestionar el estado del trámite 80301.
   */
  constructor(
    private solicitudService: SolicitudService,
    private consultaioQuery: ConsultaioQuery,
    private tramite80301Query: Tramite80301Query,
    private tramite80301Store: Tramite80301Store
  ) {
    // Constructor vacío
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Aquí se configuran las suscripciones necesarias para obtener los datos iniciales.
   * @return {void}
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
        })
      )
      .subscribe();

    this.tramite80301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((solicitudState) => {
          this.solicitudState = solicitudState;
        })
      )
      .subscribe();

    this.loadDatosModificacion();
    this.loadDatosExportacionTablaData();
    this.loadDatosImportacionTablaData();
  }

  /**
   * Método para cargar los datos de modificación desde el servicio.
   * Asigna los datos obtenidos a la propiedad `datosModificacion`.
   * @returns {void}
   */
  loadDatosModificacion(): void {
    this.solicitudService
      .getDatosModificacion()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.datosModificacion = respuesta.datos;
      });
  }

  /**
   * Método para cargar los datos de exportación para la tabla dinámica.
   * Asigna los datos obtenidos a la propiedad `datosExportacionTabla`.
   * @returns {void}
   */
  loadDatosExportacionTablaData(): void {
    const PAYLOAD = {
      idSolicitud:
        this.solicitudState.idSolicitud > 0
          ? this.solicitudState.idSolicitud
          : '',
      discriminatorValue: DISCRIMINATOR_VALUE,
      rfc: this.solicitudState.loginRfc,
      folioPrograma: this.solicitudState.selectedFolioPrograma,
      tipoPrograma: this.solicitudState.selectedTipoPrograma,
      idPrograma: this.solicitudState.selectedIdPrograma,
    };

    this.solicitudService
      .getDatosExportacionTableData(PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosExportacionTabla =
          datos.datos?.map((item) => ({
            claveProductoExportacion: item.claveProductoExportacion,
            fraccionArancelaria: {
              clave: item.cveFraccion,
              descripcion: item.descripcion,
            },
            desEstatus: item.descripcionTestado,
          })) || [];
      });
  }

  /**
   * Método para cargar los datos de importación para la tabla dinámica.
   * Asigna los datos obtenidos a la propiedad `datosImportacionTabla`.
   * @returns {void}
   */
  loadDatosImportacionTablaData(): void {
    const PAYLOAD = {
      idSolicitud:
        this.solicitudState.idSolicitud > 0
          ? this.solicitudState.idSolicitud
          : '',
      discriminatorValue: DISCRIMINATOR_VALUE,
      rfc: this.solicitudState.loginRfc,
      folioPrograma: this.solicitudState.selectedFolioPrograma,
      tipoPrograma: this.solicitudState.selectedTipoPrograma,
      idPrograma: this.solicitudState.selectedIdPrograma,
    };

    this.solicitudService
      .getImportacionTablaDatos(PAYLOAD)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosImportacionTabla =
          datos.datos?.map((item) => ({
            fraccionArancelaria: {
              clave: item.cveFraccion,
              descripcion: item.descripcion,
            },
            fraccionPadre: item.fraccionPadre,
            desEstatus: item.descripcionTestado,
          })) || [];
      });
  }

  /**
   * Método que maneja el evento de alternancia de valor en la tabla de exportación.
   * @param event Objeto que contiene la fila y columna afectadas.
   * @return {void}
   */
  exportacionValorDeAlternancia(event: { row: unknown; column: string }): void {
    const ROW = event.row as ExportacionImportacionDatos;
    const INDEX = this.datosExportacionTabla.findIndex(
      (x) => x.fraccionArancelaria.clave === ROW.fraccionArancelaria.clave
    );
    this.datosExportacionTabla[INDEX].desEstatus =
      this.datosExportacionTabla[INDEX].desEstatus === 'Baja'
        ? 'Activada'
        : 'Baja';
    this.tramite80301Store.setDatosExportacion(this.datosExportacionTabla);
  }

  /**
   * Método que maneja el evento de alternancia de valor en la tabla de importación.
   * @param event Objeto que contiene la fila y columna afectadas.
   * @return {void}
   */
  importacionValorDeAlternancia(event: { row: unknown; column: string }): void {
    const ROW = event.row as ExportacionImportacionDatos;
    const INDEX = this.datosImportacionTabla.findIndex(
      (x) => x.fraccionArancelaria.clave === ROW.fraccionArancelaria.clave
    );
    this.datosImportacionTabla[INDEX].desEstatus =
      this.datosImportacionTabla[INDEX].desEstatus === 'Baja'
        ? 'Activada'
        : 'Baja';
    this.tramite80301Store.setDatosImportacion(this.datosImportacionTabla);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica la destrucción del componente.
    this.destroyNotifier$.complete(); // Completa el observable para evitar fugas de memoria.
  }
}