import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite130401State, Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { CommonModule } from '@angular/common';
import { MERCANCIA_TABLA_ENCABEZADOS } from '../../constants/modificacion-descripcion.enum';
import { MercanciaTablaDatos } from '../../models/modificacion-descripcion.model';
import { ModificacionDescripcionService } from '../../services/modificacion-descripcion.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from "@libs/shared/data-access-user/src";
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar la modificación de mercancías en el trámite 130401.
 * 
 * Este componente permite al usuario visualizar, modificar y seleccionar mercancías
 * relacionadas con el trámite. También incluye funcionalidades para inicializar el formulario,
 * cargar datos desde el servicio y validar los campos del formulario.
 */
@Component({
  selector: 'app-modificacion-mercancia',
  templateUrl: './modificacion-mercancia.component.html',
  styleUrl: './modificacion-mercancia.component.scss',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent],
})
export class ModificacionMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite130401State;

  /**
   * Formulario reactivo para capturar los datos de la mercancía.
   * 
   * Este formulario incluye campos como el número de folio, cantidad libre, descripción, entre otros.
   */
  mercanciaFormulario!: FormGroup;

  /**
   * Configuración de las columnas de la tabla de mercancías.
   * 
   * Define los encabezados y claves para mostrar los datos de las mercancías.
   */
  public mercanciaTablaEncabezados: ConfiguracionColumna<MercanciaTablaDatos>[] = MERCANCIA_TABLA_ENCABEZADOS;

  /**
   * Datos de la tabla de mercancías.
   * 
   * Contiene las mercancías obtenidas desde el servicio.
   */
  mercanciaTablaDatos: MercanciaTablaDatos[] = [];

  /**
   * Filas seleccionadas en la tabla de mercancías.
   * 
   * Contiene las mercancías seleccionadas por el usuario.
   */
  mercanciaSeleccionadasFila!: MercanciaTablaDatos[];
  /**
   * Propiedad que define la configuración de selección de filas en la tabla de mercancías.
   * 
   * Esta propiedad utiliza la constante `TablaSeleccion` para habilitar la funcionalidad
   * de selección de filas en la tabla dinámica de mercancías.
   */
  tablaSeleccion = TablaSeleccion;
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  soloLectura: boolean = false;
  /**
   * Constructor del componente.
   * 
   * @param {Tramite130401Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite130401Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   * @param {ModificacionDescripcionService} modificacionDescripcionService - Servicio para obtener datos relacionados con la mercancía.
   */
  constructor(
    public store: Tramite130401Store,
    public tramiteQuery: Tramite130401Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private modificacionDescripcionService: ModificacionDescripcionService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    // Constructor del componente
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite, inicializa el formulario y
   * carga los datos de la mercancía y la tabla de mercancías.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
    this.mercanciaTablaDatos = this.tramiteState?.mercanciaTablaDatos || [];
    if (!this.tramiteState?.mercancia?.numeroFolioResolucion && !this.consultaDatos.update) {
      this.cargarMercancia();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar los datos de la mercancía.
   */
  inicializarFormulario(): void {
    this.mercanciaFormulario = this.fb.group({
      numeroFolioResolucion: [{ value: this.tramiteState?.mercancia?.numeroFolioResolucion, disabled: true }, []],
      cantidadLibreMercancia: [{ value: this.tramiteState?.mercancia?.cantidadLibreMercancia, disabled: true }, []],
      descripcion: [{ value: this.tramiteState?.mercancia?.descripcion, disabled: true }, []],
      descripcionModificacion: [this.tramiteState?.mercancia?.descripcionModificacion, [Validators.required]],
    });
    this.inicializarEstadoFormulario();
  }
  /**
     * Inicializa el estado del formulario según el modo de solo lectura.
     * 
     * Este método deshabilita el formulario `mercanciaFormulario` si la propiedad `soloLectura` es `true`.
     */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.mercanciaFormulario.get('descripcionModificacion')?.disable();
    } else {
      this.mercanciaFormulario.get('descripcionModificacion')?.enable();
    }
  }
  /**
   * Carga los datos de la mercancía desde el servicio y los almacena en el store.
   */
  cargarMercancia(): void {
    this.modificacionDescripcionService.obtenerMercancia()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.store.setMercancia(respuesta.datos);
        this.inicializarFormulario();
      });
  }

  /**
   * Carga los datos de la tabla de mercancías desde el servicio.
   */
  cargarMercanciaTabla(): void {
    this.modificacionDescripcionService.obtenerMercanciaTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.mercanciaTablaDatos = respuesta.datos;
      });
  }

  /**
   * Verifica si un campo del formulario es válido.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías.
   * 
   * @param {MercanciaTablaDatos[]} evento - Las filas seleccionadas.
   */
  seleccionDeFilas(evento: MercanciaTablaDatos[]): void {
    this.mercanciaSeleccionadasFila = evento;
  }

  /**
   * Establece valores en el store desde el formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite130401Store} metodoNombre - El método del store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130401Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método completa el `Subject` `destroyNotifier$` para cancelar todas las suscripciones activas
   * y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}