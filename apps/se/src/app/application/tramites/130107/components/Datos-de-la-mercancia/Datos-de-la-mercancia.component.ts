import { Catalogo, ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ImportacionesAgropecuariasState, ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DATOS_DE_LA_MERCANCIA } from '../../constantes/datos-de-la-solicitud.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ImportacionesAgropecuariasService } from '../../services/importaciones-agropecuarias.service';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';

/**
 * @component DatosDeLaMercanciaComponent
 * @description
 * Componente principal para gestionar los datos de la mercancía en el flujo del trámite 130107.
 * Este componente incluye la lógica para manejar formularios dinámicos y datos relacionados con fracciones arancelarias y UMT.
 * 
 * @selector app-datos-de-la-mercancia
 * @templateUrl ./Datos-de-la-mercancia.component.html
 * @styleUrl ./Datos-de-la-mercancia.component.scss
 */
@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './Datos-de-la-mercancia.component.html',
  styleUrl: './Datos-de-la-mercancia.component.scss',
})
export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {
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
   * Incluye un grupo de formularios para manejar los datos de la mercancía.
   * 
   * @type {FormGroup}
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * @property ninoFormGroup
   * @description
   * Getter para acceder al grupo de formularios de mercancía.
   * Retorna el grupo de formularios correspondiente.
   * 
   * @type {FormGroup}
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @property datosDelMercancia
   * @description
   * Datos dinámicos del formulario relacionados con la mercancía.
   * 
   * @type {ModeloDeFormaDinamica[]}
   */
  public datosDelMercancia = DATOS_DE_LA_MERCANCIA;

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

    this.datosFraccion();
    this.datosUMT();
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
      this.servicioDeFormularioService.setFormValue('datosMercanciaForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * @method datosFraccion
   * @description
   * Método que obtiene los datos de las fracciones arancelarias desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosFraccion(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.fraccion)
      )
      .subscribe((datosFraccion: Catalogo[]) => {
        const FRACCION_FIELD = this.datosDelMercancia.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'fraccion_arancelaria'
        ) as ModeloDeFormaDinamica;
        if (FRACCION_FIELD && !FRACCION_FIELD.opciones) {
          if (Array.isArray(datosFraccion)) {
            FRACCION_FIELD.opciones = datosFraccion.map(
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
   * @method datosUMT
   * @description
   * Método que obtiene los datos de las UMT (Unidades de Medida y Tipo) desde el servicio.
   * Actualiza las opciones del formulario dinámico con los datos obtenidos.
   */
  datosUMT(): void {
    this.importacionesAgropecuariasService.datosDeLaSolicitud()
      .pipe(
        takeUntil(this.destroy$),
        map((data) => data.UMT)
      )
      .subscribe((datosFraccion: Catalogo[]) => {
        const UMT_FIELD = this.datosDelMercancia.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'umt'
        ) as ModeloDeFormaDinamica;
        if (UMT_FIELD && !UMT_FIELD.opciones) {
          if (Array.isArray(datosFraccion)) {
            UMT_FIELD.opciones = datosFraccion.map(
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
