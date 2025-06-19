import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud110203State, Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import { Subject, map, takeUntil } from 'rxjs';
import {Placeholders } from '@libs/shared/data-access-user/src/core/models/110203/tecnicos.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';
import mediocatalogo from '@libs/shared/theme/assets/json/110203/mediocatalogo.json';
/**
 * Componente que gestiona la visualización y actualización de los datos relacionados con el destinatario para el trámite 110203.
 * Este componente permite la edición de los datos personales del destinatario, como nombre, dirección, correo y teléfono,
 * y guarda los valores seleccionados en el estado de la solicitud a través de un formulario reactivo.
 * 
 * @component
 * @example
 * <app-destinatario-110203></app-destinatario-110203>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * 
 */
@Component({
  selector: 'app-destinatario-110203',
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './destinatario-110203.component.html',
  styleUrl: './destinatario-110203.component.scss'
})
/**
 * Componente que maneja la visualización y actualización de los datos relacionados con el destinatario
 * para el trámite 110203. Utiliza un formulario reactivo para capturar y persistir la información del destinatario
 * en el estado de la solicitud.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-destinatario-110203></app-destinatario-110203>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo que contiene los campos necesarios para capturar la
 * información del destinatario. Esta información se obtiene del estado de la solicitud 110203.
 * 
 * @property {FormGroup} destinatarioForm - Formulario reactivo que gestiona los datos del destinatario.
 * @property {Solicitud110203State} solicitudState - Estado de la solicitud 110203 que contiene los valores actuales de la solicitud.
 * @property {Subject<void>} destroyNotifier$ - Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
 * 
 * @method ngOnInit() - Inicializa el formulario reactivo con los valores actuales del estado de la solicitud.
 * @method inicializarFormulario() - Inicializa el formulario reactivo con los valores del destinatario obtenidos desde el estado de la solicitud.
 * @method setValoresStore() - Actualiza el store del trámite con el valor de un campo específico del formulario.
 * @method ngOnDestroy() - Se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
 */
export class Destinatario110203Component implements OnInit, OnDestroy {
  
  /**
   * Formulario reactivo que gestiona los datos del destinatario, incluyendo nombre, dirección, correo, etc.
   * 
   * Campos:
   * - nombre
   * - primer
   * - segundo
   * - fiscal
   * - razon
   * - calle
   * - letra
   * - ciudad
   * - correo
   * - fax
   * - telefono
   */
  destinatarioForm!: FormGroup;
  /**
 * Establece los valores de los placeholders utilizados en el formulario.
 * El valor se obtiene desde el catálogo de medios.
 */
  placeholder :Placeholders=mediocatalogo.placeholder;
  /**
   * Estado de la solicitud 110203, que contiene los valores actuales de los campos relacionados con el destinatario.
   */
  public solicitudState!: Solicitud110203State;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa el formulario reactivo y configura las dependencias necesarias.
   * 
   * @param fb - FormBuilder utilizado para crear el formulario reactivo.
   * @param tramite110203Store - Store que gestiona los valores persistentes del trámite 110203.
   * @param tramite110203Query - Query que se utiliza para obtener el estado actual de la solicitud 110203.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110203Store: Tramite110203Store,
    private tramite110203Query: Tramite110203Query
  ) {
    // Método constructor, utilizado para inicializar las dependencias
  }

  /**
   * Se ejecuta cuando el componente se inicializa. Llama al método `inicializarFormulario` para cargar los valores
   * predeterminados en el formulario con los datos del destinatario provenientes del estado de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    // Se pueden cargar datos adicionales si es necesario (por ejemplo, desde una API o archivo JSON)
  }

  /**
   * Método que inicializa el formulario reactivo con los valores del destinatario desde el estado de la solicitud.
   * El formulario contiene los campos: 'nombre', 'primer', 'segundo', 'fiscal', 'razon', 'calle', 'letra', 'ciudad',
   * 'correo', 'fax' y 'telefono', que son los datos personales del destinatario.
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

    // Inicializa el formulario con los valores del destinatario desde el estado de la solicitud
    this.destinatarioForm = this.fb.group({
      nombre: [this.solicitudState.nombre],
      primer: [this.solicitudState.primer],
      segundo: [this.solicitudState.segundo],
      fiscal: [this.solicitudState.fiscal,Validators.required],
      razon: [this.solicitudState.razon, Validators.required],
      calle: [this.solicitudState.calle, Validators.required],
      letra: [this.solicitudState.letra, Validators.required],
      ciudad: [this.solicitudState.ciudad, Validators.required],
      correo: [this.solicitudState.correo, Validators.required],
      fax: [this.solicitudState.fax],
      telefono: [this.solicitudState.telefono],
    });
  }

  /**
   * Método para actualizar el store del trámite con el valor de un campo específico del formulario.
   * 
   * @param form - Formulario que contiene los valores.
   * @param campo - Nombre del campo del formulario.
   * @param metodoNombre - Nombre del método del store que se utilizará para guardar el valor.
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
