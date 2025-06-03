/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Catalogo, ConsultaioQuery, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { CambioDeModalidadForm, ConfiguracionColumna } from '../../modelos/cambio-de-modalidad.model';

import { TablaSeleccion } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';

import { CONFIGURACION_SERVICIO } from '../../modelos/cambio-de-modalidad.model';

import { delay, map, takeUntil, tap } from 'rxjs/operators';

import { CambioModalidad } from '../../modelos/cambio-de-modalidad.model';
import { ServicioInfo } from '../../modelos/cambio-de-modalidad.model';

import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import { CambioModalidadStore } from '../../estados/tramite80208.store';


/**
 * @component CambioDeModalidadComponent
 * @description
 * Componente para gestionar el cambio de modalidad en el trámite IMMEX.
 * Permite la selección de modalidades, servicios y la configuración de datos relacionados.
 */
@Component({
  selector: 'app-cambio-de-modalidad',
  templateUrl: './cambio-de-modalidad.component.html',
  styleUrls: ['./cambio-de-modalidad.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent
  ]
})

/**
 * @class CambioDeModalidadComponent
 * @description
 * Clase que implementa la lógica para gestionar el cambio de modalidad.
 */
export class CambioDeModalidadComponent implements OnInit, OnDestroy {
  /**
   * @property {TablaSeleccion} tablaSeleccion
   * @description Tipo de selección de la tabla (Radio o Checkbox).
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * @property {ConfiguracionColumna<ServicioInfo>[]} configuracionTabla
   * @description Configuración de las columnas de la tabla para los servicios.
   */
  configuracionTabla: ConfiguracionColumna<ServicioInfo>[] = CONFIGURACION_SERVICIO;

  /**
   * @property {ServicioInfo[]} ServiciosDatos
   * @description Datos de los servicios disponibles.
   */
  ServiciosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * @property {ServicioInfo[]} autorizadosDatos
   * @description Datos de los servicios autorizados.
   */
  autorizadosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * @property {Subject<void>} unsubscribe$
   * @description Subject para manejar la desuscripción de observables.
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * @property {FormGroup} cambioDeModalidadForm
   * @description Formulario para el cambio de modalidad.
   */
  cambioDeModalidadForm!: FormGroup;

  /**
   * @property {FormGroup} serviciosImmxForm
   * @description Formulario para los servicios IMMX.
   */
  serviciosImmxForm!: FormGroup;

  /**
   * @property {string} cambioModalidadState
   * @description Estado actual del cambio de modalidad.
   */
  cambioModalidadState!: string;

  /**
   * @property {CambioDeModalidadForm} cambioDeModalidadState
   * @description Estado del formulario de cambio de modalidad.
   */
  cambioDeModalidadState!: CambioDeModalidadForm;

  /**
   * @property {string} serviciosImmxState
   * @description Estado actual de los servicios IMMX.
   */
  serviciosImmxState!: string;

  /**
   * @property {Catalogo[]} serviciosImmx
   * @description Lista de servicios IMMX disponibles.
   */
  serviciosImmx!: Catalogo[];

  /**
   * @property {CambioModalidad[]} cambioDeModalidad
   * @description Lista de cambios de modalidad disponibles.
   */
  cambioDeModalidad!: CambioModalidad[];

  /**
   * @property {boolean} espectaculoServiciosImmx
   * @description Indica si se deben mostrar los servicios IMMX.
   */
  espectaculoServiciosImmx: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {SeccionLibState} seccion
   * @description Estado de la sección actual.
   */
  private seccion!: SeccionLibState;

  /**
   * @description Indica si el formulario se encuentra en modo solo lectura.
   * @type {boolean}
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @description Constructor del componente que inicializa los servicios y dependencias necesarias.
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {CambioModalidadService} modalidadService - Servicio para gestionar los cambios de modalidad.
   * @param {CambioModalidadQuery} cambioModalidadQuery - Consulta para obtener el estado del cambio de modalidad.
   * @param {CambioModalidadStore} cambioModalidadStore - Store para manejar el estado del cambio de modalidad.
   * @param {SeccionLibQuery} seccionQuery - Consulta para obtener el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   */

  constructor(
    public fb: FormBuilder,
    public modalidadService: CambioModalidadService,
    public cambioModalidadQuery: CambioModalidadQuery,
    public cambioModalidadStore: CambioModalidadStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.cambioModalidadQuery.selectCambioModalidad$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.cambioModalidadState = seccionState.cambioModalidad;
          this.cambioDeModalidadState = seccionState.cambioDeModalidad;
          this.serviciosImmxState = seccionState.serviciosImmx;
        })
      ).subscribe();
    this.inicializarForm();
    this.getCargarDatos();
    this.getCambioDeModalidad();
    this.getServiciosImmx();
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    this.cambioDeModalidadForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 1;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const CONTROL = this.cambioDeModalidadForm.get('cambioDeModalidad')?.status;
          if (this.cambioDeModalidadForm.valid || CONTROL === 'VALID' ) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }

  /**
   * @method inicializarForm
   * @description Inicializa los formularios del componente.
   */
  inicializarForm(): void {
    this.cambioDeModalidadForm = this.fb.group({
      seleccionaLaModalidad: [{value: this.cambioDeModalidadState?.seleccionaLaModalidad, disabled: true}],
      folio: [{value: this.cambioDeModalidadState?.folio, disabled: true}],
      ano: [{value: this.cambioDeModalidadState?.ano, disabled: true}],
      seleccionaModalidad: [{value: this.cambioDeModalidadState?.seleccionaModalidad, disabled: true}],
      cambioDeModalidad: [{value:this.cambioModalidadState}]
    });

    this.serviciosImmxForm = this.fb.group({
      serviciosImmx: [{value: this.cambioModalidadState}]
    });
  } 

  /**
   * @description Inicializa el estado del formulario dependiendo si está en modo solo lectura o edición.
   * Si el formulario está en modo solo lectura, deshabilita los campos; de lo contrario, los habilita y crea los campos del formulario.
   * @method inicializarEstadoFormulario
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
      if (this.esFormularioSoloLectura) {
        this.guardarDatosFormulario();
      } else {
        this.inicializarForm();
      }
  }

  /**
   * @description Habilita o deshabilita el formulario según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita todos los controles; si no, los habilita.
   * @method guardarDatosFormulario
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.inicializarForm();
      if (this.esFormularioSoloLectura) {
        this.cambioDeModalidadForm.disable();
      } else {
        this.cambioDeModalidadForm.enable();
      }
  }

  /**
   * @method getCargarDatos
   * @description Carga los datos simulados en el formulario de cambio de modalidad.
   */
  getCargarDatos(): void {
    this.modalidadService.getDatosSimulados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.cambioDeModalidadForm.patchValue(data);
      });
  }

  /**
   * @method getServiciosImmx
   * @description Obtiene los servicios IMMX disponibles.
   */
  getServiciosImmx(): void {
    this.modalidadService.getServiciosImmx().subscribe((data) => {
      this.serviciosImmx = data.data;
      this.cambioModalidadStore.setCambioModalidad(JSON.stringify(this.serviciosImmx));
    });
  }

  /**
   * @method getCambioDeModalidad
   * @description Obtiene los cambios de modalidad disponibles.
   */
  getCambioDeModalidad(): void {
    this.modalidadService.getCambioDeModalidad().subscribe((data) => {
      this.cambioDeModalidad = data.cambioModalidad.data;
      const SELECCIONADAID = this.cambioDeModalidadForm.get('cambioDeModalidad')?.value;
      if (SELECCIONADAID) {
        this.toggleServiciosImmx(SELECCIONADAID);
      }
    });
  }


  /**
   * @method toggleServiciosImmx
   * @description Alterna la visibilidad de los servicios IMMX según la modalidad seleccionada.
   * @param {number} SELECCIONADAID - ID de la modalidad seleccionada.
   */
  toggleServiciosImmx(SELECCIONADAID: any): void {
    if (!SELECCIONADAID || !this.cambioDeModalidad.length) {
      this.espectaculoServiciosImmx = false;
      return;
    }
    const OPCIONSELECCIONADA = this.cambioDeModalidad.find(item => item.id.toString() === SELECCIONADAID);
    this.espectaculoServiciosImmx = OPCIONSELECCIONADA?.descripcion?.toUpperCase() === 'SERVICIOS';
    this.cambioModalidadStore.setCambioModalidad(SELECCIONADAID)
  }

  /**
   * @method onDropdownSelect
   * @description Maneja el evento de selección del dropdown.
   * @param {any} event - Evento de selección del dropdown.
   */
  onDropdownSelect(event: any): void {
    if (event?.id) {
      this.toggleServiciosImmx(event.id.toString());
    }
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente se destruye.
   * Libera los recursos y completa los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}