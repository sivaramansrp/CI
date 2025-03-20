import { AlertComponent, CatalogoSelectComponent, CatalogosSelect, InputFecha, InputFechaComponent, SeccionLibState, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatosDeLaSolicitudInt, DatosDelTramite, ResponsableInspección } from '../../modelos/acuicola.model';
import { EXPEDICION_FACTURA_FECHA, INSTRUCCION_DOBLE_CLIC, MEDIO_SERVICIO, medioInfo } from '../../constantes/acuicola.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs';
import { AcuicolaService } from '../../service/acuicola.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../modelos/configuracio-columna.model';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TEXTOS_220703 } from '../../constantes/acuicola.enum';
import { TramiteStore } from '../../estados/tramite220703.store';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';
import { delay } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Formulario reactivo para capturar los datos de la solicitud.
   * @type {FormGroup}
   */
  datosDeLaSolicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   * @type {DatosDeLaSolicitudInt}
   */
  solicitudState!: DatosDeLaSolicitudInt;

  /**
   * Indica si la sección colapsable está abierta o cerrada.
   * @type {boolean}
   */
  colapsable: boolean = false;

  /**
   * Instrucción para el usuario sobre cómo interactuar con la tabla.
   * @type {string}
   */
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  /**
   * Tipo de selección en la tabla (checkbox).
   * @type {TablaSeleccion}
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Catálogo de horas de inspección.
   * @type {CatalogosSelect}
   */
  horaDeInspeccion!: CatalogosSelect;

  /**
   * Catálogo de aduanas de ingreso.
   * @type {CatalogosSelect}
   */
  aduanaDeIngreso!: CatalogosSelect;

  /**
   * Catálogo de oficinas de inspección.
   * @type {CatalogosSelect}
   */
  oficinaDeInspeccion!: CatalogosSelect;

  /**
   * Catálogo de puntos de inspección.
   * @type {CatalogosSelect}
   */
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Catálogo de tipos de contenedores.
   * @type {CatalogosSelect}
   */
  tipoContenedor!: CatalogosSelect;

  /**
   * Catálogo de medios de transporte.
   * @type {CatalogosSelect}
   */
  medioDeTransporte!: CatalogosSelect;

  /**
   * Textos estáticos utilizados en el componente.
   * @type {Object}
   */
  TEXTOS = TEXTOS_220703;

  /**
   * Configuración de columnas para la tabla de medios de servicio.
   * @type {ConfiguracionColumna<medioInfo>[]}
   */
  exportadorTabla: ConfiguracionColumna<medioInfo>[] = MEDIO_SERVICIO;

  /**
   * Datos de la mercancía para la tabla.
   * @type {medioInfo[]}
   */
  mercanciaDatos: medioInfo[] = [];

  /**
   * Configuración del campo de fecha de inicio.
   * @type {InputFecha}
   */
  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

  /**
   * Subject para notificar la destrucción del componente.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la sección actual.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {AcuicolaService} acuicolaService - Servicio para obtener datos relacionados con la acuicultura.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Query para acceder al estado del trámite.
   * @param {TramiteStore} tramiteStore - Store para gestionar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Query para acceder al estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para gestionar el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Aquí se configuran las suscripciones a los estados y se inicializa el formulario.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState.solicitudState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.getHoraDeInspeccion();
    this.cargarDatos();
    this.getAduanaDeIngreso();
    this.getOficinaDeInspeccion();
    this.getPuntoDeInspeccion();
    this.getTipoContenedor();
    this.obtenerResponsableDatos();
    this.getMedioDeTransporte();
    this.getMercanciaDatos();

    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (seccionState) {
            this.solicitudState = seccionState.solicitudState;
            this.datosDeLaSolicitudForm.patchValue(this.solicitudState);
          }
        })
      ).subscribe();

    this.datosDeLaSolicitudForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.datosDeLaSolicitudForm.value };
          this.tramiteStore.setSolicitudTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario reactivo con los controles necesarios.
   * @method iniciarFormulario
   * @returns {void}
   */
  iniciarFormulario(): void {
    this.datosDeLaSolicitudForm = this.fb.group({
      justificacion: ['', Validators.required],
      certificadosAutorizados: [{ value: '', disabled: true }, Validators.required],
      fechaInicio: ['', Validators.required],
      horaDeInspeccion: ['', Validators.required],
      aduanaDeIngreso: ['', Validators.required],
      oficinaDeInspeccion: ['', Validators.required],
      puntoDeInspeccion: ['', Validators.required],
      nombreInsp: [{ value: '', disabled: true }, Validators.required],
      primerApellido: [{ value: '', disabled: true }, Validators.required],
      segundoApellido: [{ value: '', disabled: true }, Validators.required],
      cantidadContenedores: [{ value: '', disabled: true }, Validators.required],
      tipoContenedor: ['', Validators.required],
      medioDeTransporte: ['', Validators.required],
      identificacionTransporte: ['', Validators.required],
      esSolicitudFerros: ['', Validators.required]
    });
  }

  /**
   * Alterna la visibilidad de la sección colapsable.
   * @method mostrarColapsable
   * @returns {void}
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
  * Cambia el valor de la fecha final en el formulario.
  * @param nuevo_valor Nuevo valor de la fecha final.
  */
  cambioFechaFinal(nuevo_valor: string): void {
    this.datosDeLaSolicitudForm.get('fechaInicioInput')?.setValue(nuevo_valor);
    this.datosDeLaSolicitudForm.get('fechaInicioInput')?.markAsUntouched();
  }

  /**
   * Carga los datos de los certificados desde el servicio.
   * @method cargarDatos
   * @returns {void}
   */
  cargarDatos(): void {
    this.acuicolaService
      .obtenerDatosCertificados()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: DatosDelTramite) => {
        this.datosDeLaSolicitudForm.patchValue(data);
      })
  }

  /**
   * Obtiene las aduanas de ingreso desde el servicio.
   * @method getMercanciaDatos
   * @returns {void}
   */
  getMercanciaDatos(): void {
    this.acuicolaService.getDatosMercancia()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((data) => {
        this.mercanciaDatos = data;
      })
  }

  /**
   * Obtiene las horas de inspección desde el servicio.
   * @method getHoraDeInspeccion
   * @returns {void}
   */
  getHoraDeInspeccion(): void {
    this.acuicolaService.getHoraDeInspeccion()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.horaDeInspeccion = {
            labelNombre: 'Hora de inspección',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      })
  }

  /**
   * Obtiene las aduanas de ingreso desde el servicio.
   * @method getAduanaDeIngreso
   * @returns {void}
   */
  getAduanaDeIngreso(): void {
    this.acuicolaService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.aduanaDeIngreso = {
            labelNombre: 'Aduana de ingreso',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene las oficinas de inspección desde el servicio.
   * @method getOficinaDeInspeccion
   * @returns {void}
   */
  getOficinaDeInspeccion(): void {
    this.acuicolaService.getOficinaDeInspeccion()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.oficinaDeInspeccion = {
            labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene los puntos de inspección desde el servicio.
   * @method getPuntoDeInspeccion
   * @returns {void}
   */
  getPuntoDeInspeccion(): void {
    this.acuicolaService.getPuntoDeInspeccion()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.puntoDeInspeccion = {
            labelNombre: 'Punto de inspección',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene los tipos de contenedores desde el servicio.
   * @method getTipoContenedor
   * @returns {void}
   */
  getTipoContenedor(): void {
    this.acuicolaService.getTipoContenedor()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.tipoContenedor = {
            labelNombre: 'Tipo contenedor',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene los medios de transporte desde el servicio.
   * @method getMedioDeTransporte
   * @returns {void}
   */
  getMedioDeTransporte(): void {
    this.acuicolaService.getMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.medioDeTransporte = {
            labelNombre: 'Medio de transporte*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene los datos del responsable de la inspección desde el servicio.
   * @method obtenerResponsableDatos
   * @returns {void}
   */
  obtenerResponsableDatos(): void {
    this.acuicolaService
      .obtenerResponsableDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: ResponsableInspección) => {
        this.datosDeLaSolicitudForm.patchValue(data);
      })
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Aquí se desuscriben los observables para evitar fugas de memoria.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}
