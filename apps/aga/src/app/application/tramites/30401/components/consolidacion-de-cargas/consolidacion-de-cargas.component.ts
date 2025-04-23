import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  Tramite30401Store,
  Tramites30401State,
} from '../../estados/tramites30401.store';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/registro-empresas-transporte.enum';
import { RegistroAgentesComponent } from '../registro-agentes/registro-agentes.component';
import { RegistroVehiculosComponent } from '../registro-vehiculos/registro-vehiculos.component';
import { Tramite30401Query } from '../../estados/tramites30401.query';

/**
 * Componente para la consolidación de cargas dentro del módulo de registro de empresas de transporte.
 *
 * Este componente permite la gestión de agentes y vehículos asociados a la consolidación de carga.
 * Utiliza formularios reactivos para validar los datos de entrada.
 *
 * @component
 * @selector app-consolidacion-de-cargas
 * @standalone true
 * @imports CommonModule, InputRadioComponent, RegistroAgentesComponent, RegistroVehiculosComponent, ReactiveFormsModule
 * @templateUrl ./consolidacion-de-cargas.component.html
 * @styleUrl ./consolidacion-de-cargas.component.scss
 */
@Component({
  selector: 'app-consolidacion-de-cargas',
  standalone: true,
  imports: [
    CommonModule,
    InputRadioComponent,
    RegistroAgentesComponent,
    RegistroVehiculosComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './consolidacion-de-cargas.component.html',
  styleUrl: './consolidacion-de-cargas.component.scss',
})
export class ConsolidacionDeCargasComponent implements OnDestroy {
  /**
   * Formulario reactivo para manejar los campos de entrada del usuario.
   */
  forma!: FormGroup;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Indicates whether the entity is consolidated in ET.
   *
   * @type {boolean}
   * @default false
   */
  esConsolidatedET: boolean = false;
  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * @property {Tramites30401State} seccionState
   * Estado actual del formulario.
   */
  public seccionState!: Tramites30401State;

  /**
   * Constructor para inyectar los servicios y las tiendas necesarias.
   * @param fb - FormBuilder para formularios reactivos.
   * @param tramite30401Store - Tienda para gestionar el estado del formulario.
   * @param tramite30401Query - Servicio de consulta para acceder a los datos del store.
   */
  constructor(
    public fb: FormBuilder,
    private tramite30401Query: Tramite30401Query,
    private tramite30401Store: Tramite30401Store
  ) {
    this.enPatchStoredFormData();
    this.crearFormulario();
    this.enCambioDeValor(this.seccionState?.consolidacionCargas);
  }

  /**
   * Crea el formulario reactivo con los controles necesarios.
   *
   * @returns {void}
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      consolidacionCargas: [
        this.seccionState?.consolidacionCargas,
        [Validators.requiredTrue],
      ],
      noConsolidadoET: [
        this.seccionState?.noConsolidadoET,
        [Validators.requiredTrue],
      ],
    });
  }

  /**
   * Actualiza el formulario con datos obtenidos desde la tienda.
   */
  public enPatchStoredFormData(): void {
    this.tramite30401Query.selectTramite30401$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: Tramites30401State) => {
        this.seccionState = datos;
      });
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form) {
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== null && CONTROL.value !== undefined) {
      this.tramite30401Store.establecerDatos({ [campo]: CONTROL.value });
    }
  }

  /**
   * Actualiza el indicador `esConsolidatedET` basado en el valor proporcionado.
   *
   * @param {string | number} valor - El valor de entrada a evaluar.
   * Si `valor` es `'1'`, establece `esConsolidatedET` en `true`, de lo contrario, lo establece en `false`.
   *
   * @returns {void}
   */
  enCambioDeValor(valor: string | number): void {
    this.esConsolidatedET = valor === '1' ? true : false;
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
