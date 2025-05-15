import {AlertComponent,InputRadioComponent,TituloComponent,} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {DatosDomicilioLegalState, DatosDomicilioLegalStore,} from '../../estados/stores/datos-domicilio-legal.store';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import CumplimientoOptions from '@libs/shared/theme/assets/json/260501/cumplimiento-options.json';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { MENSAJE_DE_ALERTA } from '../../constantes/datos-domicilio-legal.enum';

/**
 * @description
 * Componente principal para gestionar el formulario de manifiestos y declaraciones.
 * Este componente permite capturar y validar datos relacionados con el cumplimiento
 * de manifiestos y declaraciones en el sistema.
 */
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    InputRadioComponent,
  ],
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.css',
})
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Mensaje de alerta que se muestra en el componente.
   */
  public mensaje = MENSAJE_DE_ALERTA.message;

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description
   * Opciones de cumplimiento cargadas desde un archivo JSON.
   */
  cumplimientoOptions = CumplimientoOptions;

  /**
   * @description
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param DatosDomicilioLegalStore Store para gestionar el estado del domicilio legal.
   * @param DatosDomicilioLegalQuery Query para obtener datos del estado del domicilio legal.
   */
  constructor(
    public fb: FormBuilder,
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Grupo de formularios principal para capturar los datos de manifiestos.
   */
  manifiestos!: FormGroup;

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sus valores iniciales basados en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

      this.configurarGrupoForm(); // Configura el formulario reactivo.
  }

  /**
   * @method configurarGrupoForm
   * @description Configura el formulario reactivo para los manifiestos, estableciendo los controles necesarios
   * y asignando valores iniciales desde el estado de la solicitud.
   */
  configurarGrupoForm(): void {
  this.manifiestos = this.fb.group({
    cumplimiento: [this.solicitudState?.cumplimiento, Validators.required],
  });
}
  /**
   * @description
   * Método que actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo que contiene los datos.
   * @param campo Nombre del campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.DatosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}