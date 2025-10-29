import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';

import { Component, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PermisoImportacionService } from "../../services/permiso-importacion.service";
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

import { DatosExportadorComponent } from "../../components/datos-exportador/datos-exportador.component";
import { DatosMercanciaComponent } from "../../components/datos-mercancia/datos-mercancia.component";
import { DatosProductorComponent } from "../../components/datos-productor/datos-productor.component";
import { DocumentoExportacionComponent } from "../../components/documento-exportacion/documento-exportacion.component";
import { RepresentacionFederalComponent } from "../../components/representacion-federal/representacion-federal.component";
import { TramiteRealizerComponent } from "../../components/tramite_realizer/tramite_realizer.component";

/**
 * Componente para el paso uno del trámite 130120.
 * Se encarga de inicializar el estado, gestionar la suscripción a los datos de consulta
 * y cargar los datos del formulario si es necesario.
 *
 * @export
 * @class PasoUnoComponent
 * @implements {OnDestroy}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, SolicitanteComponent, TramiteRealizerComponent, DatosMercanciaComponent, DocumentoExportacionComponent, DatosProductorComponent, DatosExportadorComponent, RepresentacionFederalComponent],
  standalone: true,
})
export class PasoUnoComponent implements OnDestroy, OnInit {

  /**
   * Estado de la consulta obtenido desde el store.
   * @type {ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  @ViewChild(TramiteRealizerComponent) tramiteRealizer!: TramiteRealizerComponent;
  @ViewChild(DatosMercanciaComponent) datosMercancia!: DatosMercanciaComponent;
  @ViewChild(DocumentoExportacionComponent) documentoExportacion!: DocumentoExportacionComponent;
  @ViewChild(DatosProductorComponent) datosProductor!: DatosProductorComponent;
  @ViewChild(DatosExportadorComponent) datosExportador!: DatosExportadorComponent;
  @ViewChild(RepresentacionFederalComponent) representacionFederal!: RepresentacionFederalComponent;

  /**
   * Indica si los datos de respuesta del servidor están disponibles para actualizar el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Notificador observable que permite cancelar las suscripciones activas cuando se destruye el componente.
   * Ayuda a prevenir fugas de memoria.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice de la pestaña seleccionada.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Constructor del componente.
   * Suscribe al estado de consulta y actualiza la propiedad consultaState.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param permisoImportacionService Servicio para operaciones de permiso de importación.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private permisoImportacionService: PermisoImportacionService,
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
  }

  /**
   * Ciclo de vida de Angular: se ejecuta al inicializar el componente.
   * Si hay datos para actualizar, llama a guardarDatosFormulario; si no, activa el modo de respuesta.
   */
  ngOnInit(): void {
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Guarda los datos del formulario obtenidos del servicio.
   * Actualiza el estado del formulario con la respuesta del servidor.
   */
  guardarDatosFormulario(): void {
    this.permisoImportacionService
      .obtenerRegistroTomarMuestrasDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.permisoImportacionService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Cambia la pestaña seleccionada.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  validarFormulario(): boolean {
    const VALID_TRAMITE = this.tramiteRealizer?.validarFormulario() ?? false;
    const VALID_MERCANCIA = this.datosMercancia?.validarFormulario() ?? false;
    const VALID_EXPORTA = this.documentoExportacion?.validarFormulario() ?? false;
    const VALID_PRODUCTOR = this.datosProductor?.validarFormulario() ?? false;
    const VALID_EXPORTADOR = this.datosExportador?.validarFormulario() ?? false;
    const VALID_FEDERAL = this.representacionFederal?.validarFormulario() ?? false;

    return (
      VALID_TRAMITE &&
      VALID_MERCANCIA &&
      VALID_EXPORTA &&
      VALID_PRODUCTOR &&
      VALID_EXPORTADOR &&
      VALID_FEDERAL
    );
  }

  /**
   * Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}