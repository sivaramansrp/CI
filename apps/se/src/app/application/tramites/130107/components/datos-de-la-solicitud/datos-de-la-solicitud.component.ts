import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionesAgropecuariasState,ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DATOS_DEL_TRAMITE } from '../../constantes/datos-de-la-solicitud.enum';
import { DatosDeLaMercanciaComponent } from '../datos-de-la-mercancia/datos-de-la-mercancia.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { PaisProcedenciaComponent } from '../pais-procedencia/pais-procedencia.component';
import { PartidasDeLaMercanciaComponent } from '../partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { RepresentacionFederalComponent } from '../representacion-federal/Representacion-federal.component';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';

/**
 * @component DatosDeLaSolicitudComponent
 * @description
 * Componente principal para gestionar los datos de la solicitud en el flujo del trámite 130107.
 * Este componente incluye la lógica para manejar formularios dinámicos y datos relacionados con el régimen y la clasificación.
 * 
 * @selector app-datos-de-la-solicitud
 * @templateUrl ./datos-de-la-solicitud.component.html
 * @styleUrl ./datos-de-la-solicitud.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    PaisProcedenciaComponent,
    RepresentacionFederalComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property destroy$
   * @description
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   */
  private destroy$ = new Subject<void>();

  /**
   * @property forma
   * @description
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos de la solicitud.
   * 
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * @property ninoFormGroup
   * @description
   * Getter para acceder al grupo de formularios de la solicitud.
   * Retorna el grupo de formularios correspondiente.
   * 
   * @type {FormGroup}
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @property datosDelTramite
   * @description
   * Datos dinámicos del formulario relacionados con el trámite.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public datosDelTramite = DATOS_DEL_TRAMITE;

  /**
   * @property solicitudDeRegistroState
   * @description
   * Estado actual de la solicitud de registro.
   * 
   * @type {ImportacionesAgropecuariasState}
   */
  public solicitudDeRegistroState!: ImportacionesAgropecuariasState;

  /**
   * @constructor
   * @description
   * Constructor del componente que inyecta los servicios necesarios para manejar los datos y formularios.
   * 
   * @param importacionesAgropecuariasService Servicio para obtener datos de la solicitud.
   * @param importacionesAgropecuariasStore Store para manejar el estado de la solicitud.
   * @param importacionesAgropecuariasQuery Query para obtener datos del estado de la solicitud.
   * @param servicioDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    private importacionesAgropecuariasService: ImportacionesAgropecuariasService,
    private importacionesAgropecuariasStore: ImportacionesAgropecuariasStore,
    private importacionesAgropecuariasQuery: ImportacionesAgropecuariasQuery,
    private servicioDeFormularioService: ServicioDeFormularioService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.importacionesAgropecuariasQuery.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();

    this.datosRegimen();
    this.datosClasificacion();
  }

  /**
   * @method establecerCambioDeValor
   * @description
   * Método que establece un cambio de valor en el formulario dinámico.
   * Actualiza el valor en el store y en el servicio de formularios.
   * 
   * @param event Objeto que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      const VALID_VALUE = typeof event.valor === 'object' ? JSON.stringify(event.valor) : event.valor;
      this.importacionesAgropecuariasStore.setDynamicFieldValue(event.campo, VALID_VALUE);
      this.servicioDeFormularioService.setFormValue('solicitudForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * @method datosRegimen
   * @description
   * Método que obtiene los datos del régimen desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosRegimen(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.regimen)
      )
      .subscribe((datosRegimen: Catalogo[]) => {
        const REGIMEN_FIELD = this.datosDelTramite.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'regimen'
        ) as ModeloDeFormaDinamica;
        if (REGIMEN_FIELD && !REGIMEN_FIELD.opciones) {
          if (Array.isArray(datosRegimen)) {
            REGIMEN_FIELD.opciones = datosRegimen.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * @method datosClasificacion
   * @description
   * Método que obtiene los datos de la clasificación desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosClasificacion(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.clasificacion)
      )
      .subscribe((datosClasificacion: Catalogo[]) => {
        const CLASIFICACION_FIELD = this.datosDelTramite.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'clasificacion'
        ) as ModeloDeFormaDinamica;
        if (CLASIFICACION_FIELD && !CLASIFICACION_FIELD.opciones) {
          if (Array.isArray(datosClasificacion)) {
            CLASIFICACION_FIELD.opciones = datosClasificacion.map(
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
