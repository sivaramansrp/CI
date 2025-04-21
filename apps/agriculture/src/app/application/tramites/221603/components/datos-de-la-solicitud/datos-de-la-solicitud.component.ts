import {
  CONFIGURATION_TABLA_MERCANCIAS,
  DATOS_SOLICITUD,
  FormularioDatos,
  Mercancia,
} from '../../enum/sanidad.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud221603State,
  Tramite221603Store,
} from '../../estados/tramite221603.store';
import { Subject, takeUntil } from 'rxjs';
import { SanidadService } from '../../service/sanidad.service';
import { Tramite221603Query } from '../../estados/tramite221603.query';

/**
 * Componente que gestiona la visualización y el manejo de los datos de la solicitud 221603, incluyendo
 * la gestión de mercancías y la visualización de una tabla dinámica con los requisitos y detalles de las mercancías.
 *
 * Este componente utiliza formularios reactivos para capturar los datos de la solicitud y gestionar el estado
 * de los campos. También incluye la opción de mostrar/ocultar contenido relacionado con la solicitud.
 *
 * @component
 * @example
 * <app-datos-de-la-solicitud></app-datos-de-la-solicitud>
 *
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `TablaDinamicaComponent`: Componente para la visualización de tablas dinámicas.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
 * - `AlertComponent`: Componente para mostrar alertas.
 * - `CommonModule`: Módulo común de Angular que permite utilizar directivas comunes como `ngIf`, `ngFor`, etc.
 *
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos de la solicitud.
   */
  datosSolicitudForm!: FormGroup;

  formularioDatos!: FormularioDatos;

  /**
   * Constante para definir el tipo de selección de tabla (checkbox).
   */
  checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Texto que contiene los datos de la solicitud.
   */
  TEXTOS: string = DATOS_SOLICITUD;

  /**
   * Variable para mostrar u ocultar el contenido de la solicitud.
   */
  showContent = true;

  /**
   * Configuración de las columnas para la tabla dinámica que muestra las mercancías.
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] =
    CONFIGURATION_TABLA_MERCANCIAS;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private tramite221603Query: Tramite221603Query,
    public sanidadService: SanidadService
  ) {
    // Constructor que inyecta las dependencias necesarias
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   *
   * Inicializa el formulario reactivo y carga los datos necesarios para la solicitud.
   */
  ngOnInit(): void {

    this.tramite221603Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state: Solicitud221603State) => {
        this.solicitudState = state;
      });

      this.inicializarFormulario();
      this.sanidadService.getFormularioDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp: FormularioDatos) => {
        this.formularioDatos = resp;
        this.inicializarFormulario();
      });
      
    this.sanidadService.inicializaCatalogosRegimen();
    this.sanidadService.inicializaDatosMercancia();
   
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales del estado de la solicitud.
   *
   * Carga los datos de la solicitud, como justificación, aduana, oficina, punto, y régimen.
   */
  private inicializarFormulario(): void {
    this.datosSolicitudForm = this.formBuilder.group({
      justificacion: [this.solicitudState.justificacion, Validators.required],
      aduana: [this.solicitudState.aduana, Validators.required],
      oficina: [this.solicitudState.oficina, Validators.required],
      punto: [this.solicitudState.punto, Validators.required],
      guia: [this.solicitudState.guia],
      regimen: [
        this.solicitudState.regimen ? this.solicitudState.regimen : 3,
        Validators.required,
      ],
      carro: [this.solicitudState.carro],
    });

    this.datosSolicitudForm.get('punto')?.setValue(this.formularioDatos?.punto);
    this.datosSolicitudForm.get('punto')?.disable();
    this.datosSolicitudForm
    .get('aduana')
    ?.setValue(this.formularioDatos?.aduana);
    this.datosSolicitudForm.get('aduana')?.disable();
    this.datosSolicitudForm
    .get('oficina')
    ?.setValue(this.formularioDatos?.oficina);
    this.datosSolicitudForm.get('oficina')?.disable();
  }

  /**
   * Método que abre o cierra el contenido de la solicitud.
   */
  public toggleContent(): void {
    this.showContent = !this.showContent;
  }

  setValoresStore(campo: string, metodoNombre: keyof Tramite221603Store): void {
    const VALOR = this.datosSolicitudForm.get(campo)?.value;
    (this.tramite221603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
