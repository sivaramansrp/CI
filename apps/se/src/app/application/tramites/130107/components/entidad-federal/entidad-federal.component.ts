import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionesAgropecuariasState, ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { REPRESENTACION_FEDERAL } from '../../constantes/datos-de-la-solicitud.enum';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';

/**
 * @component RepresentacionFederalComponent
 * @description
 * Componente principal para gestionar los datos de la representación federal en el flujo del trámite 130107.
 * Este componente incluye la lógica para manejar formularios dinámicos y datos relacionados con las entidades y representaciones federales.
 * 
 * @selector app-representacion-federal
 * @templateUrl ./Representacion-federal.component.html
 * @styleUrl ./Representacion-federal.component.scss
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, FormasDinamicasComponent, ReactiveFormsModule],
  templateUrl: './entidad-federal.component.html',
  styleUrl: './entidad-federal.component.scss',
})

export class RepresentacionFederalComponent implements OnInit, OnDestroy {

  /**
  *
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
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
   * Incluye un grupo de formularios para manejar los datos de la representación federal.
   * 
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * @property ninoFormGroup
   * @description
   * Getter para acceder al grupo de formularios de representación federal.
   * Retorna el grupo de formularios correspondiente.
   * 
   * @type {FormGroup}
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @property datosRepresentacionFederal
   * @description
   * Datos dinámicos del formulario relacionados con la representación federal.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public datosRepresentacionFederal = REPRESENTACION_FEDERAL;

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
  ) { }

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

    this.datosEntidad();
    this.datosRepresentacion();
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
      this.servicioDeFormularioService.setFormValue('representacionForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * @method datosEntidad
   * @description
   * Método que obtiene los datos de las entidades desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosEntidad(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.entidad)
      )
      .subscribe((datosEntidad: Catalogo[]) => {
        const ENTIDAD_FIELD = this.datosRepresentacionFederal.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'entidad'
        ) as ModeloDeFormaDinamica;
        if (ENTIDAD_FIELD && !ENTIDAD_FIELD.opciones) {
          if (Array.isArray(datosEntidad)) {
            ENTIDAD_FIELD.opciones = datosEntidad.map(
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
   * @method datosRepresentacion
   * @description
   * Método que obtiene los datos de la representación federal desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosRepresentacion(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.representacion)
      )
      .subscribe((datosEntidad: Catalogo[]) => {
        const ENTIDAD_FIELD = this.datosRepresentacionFederal.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'reprsentation_federal'
        ) as ModeloDeFormaDinamica;
        if (ENTIDAD_FIELD && !ENTIDAD_FIELD.opciones) {
          if (Array.isArray(datosEntidad)) {
            ENTIDAD_FIELD.opciones = datosEntidad.map(
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
