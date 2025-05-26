/**
 * @description
 * Este componente maneja la representación federal, incluyendo la interacción con el estado global y la validación de formularios.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';

import { ConsultaioQuery, RepresentacionfederalService, TituloComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';

/**
 * @description
 * Componente que gestiona la representación federal, incluyendo la selección de entidades federativas y unidades administrativas.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './representacion-federal.component.html',
  styleUrls: ['./representacion-federal.component.scss'],
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Indica si el formulario está en modo de solo lectura.
   */
  esSoloLectura!: boolean;

  /**
   * @description
   * Formulario reactivo para gestionar los datos de la representación federal.
   */
  formularioRepresentacionFederal!: FormGroup;

  /**
   * @description
   * Lista de entidades federativas disponibles.
   */
  entidadesFederativas: Catalogo[] = [];

  /**
   * @description
   * Lista de opciones de representación federal disponibles.
   */
  opcionesRepresentacionFederal: Catalogo[] = [];

  /**
   * @description
   * Subject que emite un evento cuando el componente es destruido, permitiendo la desuscripción de observables.
   */
  private destruido$ = new Subject<void>();

  /**
   * @description
   * Constructor del componente.
   * @param {FormBuilder} formBuilder - Servicio para la creación de formularios reactivos.
   * @param {RepresentacionfederalService} servicioRepresentacionFederal - Servicio para obtener datos de la representación federal.
   * @param {Tramite110102Store} estadoTramite - Servicio para manejar el estado del trámite.
   * @param {Tramite110102Query} consultaTramite - Servicio para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private consultaQuery: ConsultaioQuery,
    private servicioRepresentacionFederal: RepresentacionfederalService,
    private estadoTramite: Tramite110102Store,
    private consultaTramite: Tramite110102Query
  ) {}

  /**
   * @description
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Inicializa el formulario y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destruido$))
      .subscribe((estadoSeccion) => {
        this.esSoloLectura = estadoSeccion.readonly;
        this.habilitarDeshabilitarFormulario();
      });
  }

  /**
   * @description
   * Inicializa el formulario con los valores predeterminados y obtiene datos del estado global.
   */
  inicializarFormulario(): void {
    this.formularioRepresentacionFederal = this.formBuilder.group({
      claveEntidadFederativa: ['', Validators.required],
      claveUnidadAdministrativa: ['', Validators.required],
      protestoDecirVerdad: [false],
    });
    this.obtenerValoresDelEstado();
    this.cargarEntidadesFederativas();
  }

  /**
   * @description
   * Habilita o deshabilita los controles del formulario según el estado de solo lectura.
   */
  habilitarDeshabilitarFormulario(): void {
    if (this.esSoloLectura) {
      this.formularioRepresentacionFederal.disable();
    } else {
      this.formularioRepresentacionFederal.enable();
    }
  }

  /**
   * @description
   * Carga las entidades federativas desde el servicio.
   */
  cargarEntidadesFederativas(): void {
    this.servicioRepresentacionFederal.getEntidadFederativa()
      .pipe(takeUntil(this.destruido$))
      .subscribe((datos) => {
        this.entidadesFederativas = datos;
      });
  }

  /**
   * @description
   * Maneja el cambio de la entidad federativa seleccionada.
   * @param {any} valor - El valor de la entidad federativa seleccionada.
   */
  alCambiarEntidadFederativa(valor: Event): void {
    const TARGET = valor.target as HTMLSelectElement;
    const ID = TARGET.value;
    if (ID !== '-1') {
      this.obtenerRepresentacionFederal(ID);
    } else {
      this.opcionesRepresentacionFederal = [];
    }
    this.establecerValoresEnEstado(this.formularioRepresentacionFederal, 'claveEntidadFederativa');
  }

  /**
   * @description
   * Obtiene las opciones de representación federal desde el servicio.
   * @param {string} claveEntidadFederativa - La clave de la entidad federativa seleccionada.
   */
  obtenerRepresentacionFederal(claveEntidadFederativa: string): void {
    this.servicioRepresentacionFederal.getRepresentacionfederal(claveEntidadFederativa)
      .pipe(takeUntil(this.destruido$))
      .subscribe((datos) => {
        this.opcionesRepresentacionFederal = datos;
      });
  }

  /**
   * @description
   * Establece los valores en el estado global a partir del formulario.
   * @param {FormGroup} formulario - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a guardar.
   */
  establecerValoresEnEstado(formulario: FormGroup, campo: string): void {
    const VALOR = formulario.get(campo)?.value;
    this.estadoTramite.establecerDatos({ [campo]: VALOR });
  }

  /**
   * @description
   * Obtiene los valores del estado global y los asigna al formulario.
   */
  obtenerValoresDelEstado(): void {
    this.consultaTramite.selectTramite110102$
      .pipe(
        takeUntil(this.destruido$),
        map((estadoSeccion) => {
          this.formularioRepresentacionFederal.patchValue({
            claveEntidadFederativa: estadoSeccion.solicitudEntidadFederativaEntidadClave || '',
            claveUnidadAdministrativa: estadoSeccion.unidadAdministrativaClave || '',
            protestoDecirVerdad: estadoSeccion.protestoDecirVerdad || false,
          });
        })
      )
      .subscribe();

    const ENTIDAD = this.formularioRepresentacionFederal.get('claveEntidadFederativa')?.value;
    const UNIDAD_ADMINISTRATIVA = this.formularioRepresentacionFederal.get('claveUnidadAdministrativa')?.value;
    if (ENTIDAD !== '') {
      this.obtenerRepresentacionFederal(ENTIDAD);
      this.formularioRepresentacionFederal.get('claveUnidadAdministrativa')?.setValue(UNIDAD_ADMINISTRATIVA);
    } else {
      this.opcionesRepresentacionFederal = [];
    }
  }

  /**
   * @description
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject `destruido$` para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destruido$.next();
    this.destruido$.complete();
  }
}