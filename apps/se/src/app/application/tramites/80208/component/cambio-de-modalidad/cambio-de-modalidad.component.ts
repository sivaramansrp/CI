/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo, SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
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
 * Componente para gestionar el cambio de modalidad.
 * 
 * @export
 * @class CombioDeModalidadComponent
 * @implements {OnInit, OnDestroy}
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
export class CambioDeModalidadComponent implements OnInit, OnDestroy {
  /**
   * Tipo de selección de la tabla.
   * @type {TablaSeleccion}
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * Configuración de las columnas de la tabla.
   * @type {ConfiguracionColumna<ServicioInfo>[]}
   */
  configuracionTabla: ConfiguracionColumna<ServicioInfo>[] = CONFIGURACION_SERVICIO;

  /**
   * Datos de los servicios.
   * @type {ServicioInfo[]}
   */
  ServiciosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * Datos de los servicios autorizados.
   * @type {ServicioInfo[]}
   */
  autorizadosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true
    }
  ];

  /**
   * Subject para manejar la desuscripción de observables.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * Formulario para el cambio de modalidad.
   * @type {FormGroup}
   */
  cambioDeModalidadForm!: FormGroup;

  /**
   * Formulario para los servicios IMMX.
   * @type {FormGroup}
   */
  serviciosImmxForm!: FormGroup;

  /**
   * @propiedad cambioModalidadState
   * @tipo string
   */
  cambioModalidadState!: string;

  /**
   * @propiedad cambioDeModalidadState
   * @tipo CambioDeModalidadForm
   */
  cambioDeModalidadState!: CambioDeModalidadForm;

  /**
   * @propiedad serviciosImmxState
   * @tipo string
   */
  serviciosImmxState!: string;

  /**
   * Lista de servicios IMMX disponibles.
   * @type {Catalogo[]}
   */
  serviciosImmx!: Catalogo[];

  /**
   * Lista de cambios de modalidad disponibles.
   * @type {CambioModalidad[]}
   */
  cambioDeModalidad!: CambioModalidad[];

  /**
   * Indica si se deben mostrar los servicios IMMX.
   * @type {boolean}
   */
  espectaculoServiciosImmx: boolean = false;

  /**
   * @propiedad destroyNotifier$
   * @tipo Subject<void>
   */
  private destroyNotifier$: Subject<void> = new Subject();

  private seccion!: SeccionLibState;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {CambioModalidadService} modalidadService - Servicio para gestionar los cambios de modalidad.
   */

  constructor(
    public fb: FormBuilder,
    public modalidadService: CambioModalidadService,
    public cambioModalidadQuery: CambioModalidadQuery,
    public cambioModalidadStore: CambioModalidadStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método de inicialización del componente.
   * 
   * @returns {void}
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
    this.disableFormControls();
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
   * Inicializa los formularios del componente.
   * 
   * @returns {void}
   */
  inicializarForm(): void {
    this.cambioDeModalidadForm = this.fb.group({
      seleccionaLaModalidad: [this.cambioDeModalidadState.seleccionaLaModalidad, Validators.required],
      folio: [this.cambioDeModalidadState.folio, [Validators.required, Validators.min(1)]],
      ano: [this.cambioDeModalidadState.ano, [Validators.required, Validators.min(2000), Validators.max(2100)]],
      seleccionaModalidad: [this.cambioDeModalidadState.seleccionaModalidad, Validators.required],
      cambioDeModalidad: [this.cambioModalidadState, Validators.required]
    });

    this.serviciosImmxForm = this.fb.group({
      serviciosImmx: [this.cambioModalidadState, Validators.required]
    });
  }

  /**
   * Carga los datos simulados en el formulario de cambio de modalidad.
   * 
   * @returns {void}
   */
  getCargarDatos(): void {
    this.modalidadService.getDatosSimulados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.cambioDeModalidadForm.patchValue(data);
      });
  }

  /**
   * Obtiene los servicios IMMX disponibles.
   * 
   * @returns {void}
   */
  getServiciosImmx(): void {
    this.modalidadService.getServiciosImmx().subscribe((data) => {
      this.serviciosImmx = data.data;
      this.cambioModalidadStore.setCambioModalidad(JSON.stringify(this.serviciosImmx));
    });
  }

  /**
   * Obtiene los cambios de modalidad disponibles.
   * 
   * @returns {void}
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
   * Deshabilita los controles del formulario de cambio de modalidad.
   * 
   * @returns {void}
   */
  disableFormControls(): void {
    this.cambioDeModalidadForm.get('seleccionaLaModalidad')?.disable();
    this.cambioDeModalidadForm.get('folio')?.disable();
    this.cambioDeModalidadForm.get('ano')?.disable();
    this.cambioDeModalidadForm.get('seleccionaModalidad')?.disable();
  }

  /**
   * Alterna la visibilidad de los servicios IMMX según la modalidad seleccionada.
   * 
   * @param {number} SELECCIONADAID - ID de la modalidad seleccionada.
   * @returns {void}
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
   * Maneja el evento de selección del dropdown.
   *  
   * @param {any} event - Evento de selección del dropdown.
   * @returns {void}
   */
  onDropdownSelect(event: any): void {
    if (event?.id) {
      this.toggleServiciosImmx(event.id.toString());
    }
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}