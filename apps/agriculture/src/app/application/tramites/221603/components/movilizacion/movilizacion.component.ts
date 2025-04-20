
import { Catalogo, CatalogoSelectComponent,TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud221603State, Tramite221603Store } from '../../estados/tramite221603.store';
import { Subject,map,takeUntil } from 'rxjs';
import { Tramite221603Query } from '../../estados/tramite221603.query';
import realizar from '@libs/shared/theme/assets/json/221603/realizar.json';




/**
 * Componente encargado de la gestión de la movilización de mercancías, permitiendo seleccionar el medio de transporte, 
 * verificación, y empresa relacionada con la solicitud 221603.
 * 
 * Este componente utiliza un formulario reactivo para gestionar los datos de la movilización, permitiendo 
 * a los usuarios seleccionar opciones como el medio de transporte, verificación y empresa.
 * 
 * @component
 * @example
 * <app-movilizacion></app-movilizacion>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
 * 
 */
@Component({
  selector: 'app-movilizacion',
  standalone: true,
  imports: [
    TituloComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './movilizacion.component.html',
  styleUrls: ['./movilizacion.component.scss']
})

/**
 * Componente que maneja la movilización de mercancías en el contexto de la solicitud 221603.
 * Utiliza un formulario reactivo para gestionar los datos de la movilización, como el medio de transporte, 
 * la verificación y la empresa. También interactúa con el store para actualizar el estado del trámite.
 * 
 * @class
 * @implements OnInit
 * @example
 * <app-movilizacion></app-movilizacion>
 * 
 * @constructor
 * El constructor inicializa el formulario reactivo y configura las dependencias necesarias para gestionar los
 * datos de la solicitud y la movilización de mercancías.
 * 
 * @property {FormGroup} MedioForm - Formulario reactivo que gestiona los datos de la movilización, como el medio
 * de transporte, verificación y empresa.
 * @property {Catalogo[]} medio - Lista de opciones de medio de transporte obtenidas del catálogo.
 * @property {Catalogo[]} verificacion - Lista de opciones de verificación obtenidas del catálogo.
 * @property {Solicitud221603State} solicitudState - Estado de la solicitud 221603 que contiene los valores actuales de la solicitud.
 * 
 * @method ngOnInit() - Método que se ejecuta cuando el componente es inicializado. Inicializa el formulario reactivo
 * y carga los datos de la solicitud.
 * @method setValoresStore() - Método para actualizar el store del trámite con los valores del formulario.
 */
export class MovilizacionComponent implements OnInit, OnDestroy {
 
  /**
   * Lista de opciones de medio de transporte obtenidas de un catálogo.
   */
  public medio: Catalogo[] = realizar.medio;

  /**
   * Lista de opciones de verificación obtenidas de un catálogo.
   */
  public verificacion: Catalogo[] = realizar.verificacion;

  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos de la movilización.
   */
  MedioForm!: FormGroup;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa las dependencias necesarias y prepara el formulario reactivo.
   * 
   * @param fb - FormBuilder utilizado para crear el formulario reactivo.
   * @param tramite221603Store - Store que gestiona los valores persistentes del trámite 221603.
   * @param Tramite221603Query - Query que se utiliza para obtener el estado actual de la solicitud 221603.
   */
  constructor(
    private fb: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private Tramite221603Query: Tramite221603Query
  ) { 
    // Constructor que inyecta las dependencias necesarias
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   * 
   * Configura el formulario para gestionar los campos relacionados con la movilización, como medio, transporte,
   * verificación y empresa. También asigna valores predeterminados a algunos campos.
   */
  private inicializarFormulario(): void {
    this.Tramite221603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221603State;
        })
      )
      .subscribe();

    this.MedioForm = this.fb.group({
      medio: [1, Validators.required],
      transporte: [this.solicitudState.transporte, Validators.required],
      verificacion: [14, Validators.required],
      empresa: [this.solicitudState.empresa, Validators.required]
    });

    this.MedioForm.get('empresa')?.setValue(realizar.formData.empresa);
    this.MedioForm.get('transporte')?.setValue(realizar.formData.transporte);
  }

  /**
   * Método que actualiza el store con los valores del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221603Store): void {
    const VALOR = form.get(campo)?.value;
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
