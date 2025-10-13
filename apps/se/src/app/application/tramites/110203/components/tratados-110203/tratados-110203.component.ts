import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud110203State, Tramite110203Store } from '../../estados/tramite110203.store';
import { Tramite110203Query } from '../../estados/tramite110203.query';

/**
 * Componente que gestiona la visualización y actualización de los datos relacionados con el trámite 110203.
 * Este componente se encarga de inicializar y gestionar un formulario reactivo con campos específicos
 * relacionados con los tratados, como tratado, bloque, origen, destino, expedición, y vencimiento.
 * Además, establece la lógica para interactuar con el estado de la solicitud y el store del trámite 110203.
 * 
 * @component
 * @example
 * <app-tratados-110203></app-tratados-110203>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * 
 */
@Component({
  selector: 'app-tratados-110203',
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './tratados-110203.component.html',
  styleUrl: './tratados-110203.component.scss'
})

/**
 * Componente que maneja la visualización y actualización de los datos relacionados con el trámite 110203.
 * Utiliza un formulario reactivo para capturar y mostrar datos relacionados con los tratados,
 * y se conecta con el estado del store para gestionar y persistir los valores del formulario.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-tratados-110203></app-tratados-110203>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo que incluye campos como 'tratado', 'bloque', 
 * 'origen', 'destino', 'expedición', y 'vencimiento'. También establece un Observable para escuchar
 * los cambios en el estado de la solicitud a través de `tramite110203Query`.
 * 
 * @property {FormGroup} tratadosForm - Formulario reactivo para capturar los datos del tratado.
 * @property {Solicitud110203State} solicitudState - Estado de la solicitud 110203, que contiene los datos de los tratados.
 * @property {Subject<void>} destroyNotifier$ - Subject utilizado para gestionar la destrucción del componente.
 * 
 * @method ngOnInit() - Inicializa el formulario reactivo y sus valores predeterminados a partir del estado de la solicitud.
 * @method inicializarFormulario() - Establece el formulario reactivo con los valores actuales del estado de la solicitud.
 * @method updateForm() - Deshabilita el formulario y establece los valores predeterminados para los controles del formulario.
 * @method setValoresStore() - Actualiza el store del trámite con los valores del formulario.
 * @method ngOnDestroy() - Destruye el componente y limpia los recursos.
 */
export class Tratados110203Component implements OnInit, OnDestroy {
  
  /**
   * Formulario reactivo para gestionar los datos del tratado.
   * Contiene los campos 'tratado', 'bloque', 'origen', 'destino', 'expedicion', 'vencimiento'.
   */
  tratadosForm!: FormGroup;

  /**
   * Estado de la solicitud 110203, que contiene los valores actuales de los tratados.
   */
  public solicitudState!: Solicitud110203State;

  /**
   * Subject que se usa para destruir el componente y limpiar los recursos.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa el formulario reactivo y configura las dependencias.
   * 
   * @param fb - FormBuilder utilizado para construir el formulario reactivo.
   * @param tramite110203Store - Store que gestiona los valores persistentes del trámite 110203.
   * @param tramite110203Query - Query que se usa para obtener el estado actual de la solicitud 110203.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110203Store: Tramite110203Store,
    private tramite110203Query: Tramite110203Query
  ) {
    // Método constructor, se usa para inicializar las dependencias
  }

  /**
   * Se ejecuta al inicializar el componente. Llama al método `inicializarFormulario` para cargar los valores
   * predeterminados en el formulario.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    // Se puede cargar datos adicionales si es necesario (por ejemplo, desde una API o archivo JSON)
  }

  /**
   * Método que inicializa el formulario reactivo con los valores actuales del estado de la solicitud.
   * El formulario incluye los campos 'tratado', 'bloque', 'origen', 'destino', 'expedicion', 'vencimiento'.
   */
  private inicializarFormulario(): void {
    this.tramite110203Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud110203State;
        })
      )
      .subscribe();

    // Inicializa el formulario con valores del estado de la solicitud
    this.tratadosForm = this.fb.group({
      tratado: [this.solicitudState.tratado, Validators.required],
      bloque: [this.solicitudState.bloque, Validators.required],
      origen: [this.solicitudState.origen, Validators.required],
      destino: [this.solicitudState.destino, Validators.required],
      expedicion: [this.solicitudState.expedicion, Validators.required],
      vencimiento: [this.solicitudState.vencimiento, Validators.required],
    });

    this.updateForm();
  }

  /**
   * Método que deshabilita el formulario y establece los valores predeterminados en cada campo.
   */
  updateForm(): void {
    this.tratadosForm.disable(); // Deshabilita el formulario para que no se pueda modificar

    // Carga los valores predeterminados en cada uno de los controles del formulario
    this.tratadosForm.get('tratado')?.setValue('Tratado de Libre Comercio México-,');
    this.tratadosForm.get('bloque')?.setValue('ISLANDIA (REPUBLICA DE)');
    this.tratadosForm.get('origen')?.setValue('México');
    this.tratadosForm.get('destino')?.setValue('ISLANDIA (REPUBLICA DE)');
    this.tratadosForm.get('expedicion')?.setValue('2025-02-18');
    this.tratadosForm.get('vencimiento')?.setValue('2026-02-18');
  }

  /**
   * Método para actualizar el store del trámite con el valor de un campo específico del formulario.
   * 
   * @param form - Formulario que contiene los valores.
   * @param campo - Nombre del campo del formulario.
   * @param metodoNombre - Método del store que se utilizará para guardar el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110203Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110203Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta cuando el componente es destruido. Se limpia el `destroyNotifier$` para evitar memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
