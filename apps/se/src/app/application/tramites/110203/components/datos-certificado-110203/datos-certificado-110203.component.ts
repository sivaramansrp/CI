import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Mercancia } from '@libs/shared/data-access-user/src/core/models/110203/tecnicos.model';

import { Solicitud110203State, Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query';

import mediocatalogo from '@libs/shared/theme/assets/json/110203/mediocatalogo.json';

import { REGEX_RFC,REG_X} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';


/**
 * Componente que gestiona los datos del certificado 110203, incluyendo la visualización de mercancias, 
 * su comercialización y la validación de los datos del formulario.
 * 
 * Este componente permite al usuario ver, editar y agregar información relacionada con el certificado
 * y las mercancias asociadas, manejando también un modal para agregar mercancias.
 * 
 * @component
 * @example
 * <app-datos-certificado-110203></app-datos-certificado-110203>
 * 
 * @imports
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `TablaDinamicaComponent`: Componente para la visualización de tablas dinámicas.
 * - `CatalogoSelectComponent`: Componente para seleccionar valores de un catálogo.
 * 
 */
@Component({
  selector: 'app-datos-certificado-110203',
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent, CatalogoSelectComponent],
  templateUrl: './datos-certificado-110203.component.html',
  styleUrl: './datos-certificado-110203.component.scss'
})

/**
 * Componente que maneja la visualización y actualización de los datos del certificado y las mercancias
 * asociadas al trámite 110203. Utiliza un formulario reactivo para capturar y persistir la información 
 * del certificado y la mercancia. También incluye un modal para agregar nuevas mercancias a través de un formulario.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-datos-certificado-110203></app-datos-certificado-110203>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo para capturar los datos del certificado y otro para 
 * gestionar las mercancias. Además, gestiona la visibilidad de un modal para agregar mercancias.
 * 
 * @property {FormGroup} certificadoForm - Formulario reactivo que gestiona los datos del certificado.
 * @property {FormGroup} mercanciasForm - Formulario reactivo que gestiona los datos de las mercancias.
 * @property {Mercancia[]} mercancias - Lista de mercancias obtenidas de un catálogo.
 * @property {Catalogo[]} tipoDatos - Lista de tipos de datos obtenidos de un catálogo.
 * @property {Catalogo[]} comercializacion - Lista de opciones de comercialización obtenidas del catálogo.
 * @property {Catalogo[]} medida - Lista de medidas obtenidas del catálogo.
 * @property {ConfiguracionColumna<Mercancia>[]} configuracionTabla - Configuración de las columnas para la tabla dinámica.
 * @property {Solicitud110203State} solicitudState - Estado de la solicitud 110203 que contiene los valores actuales de la solicitud.
 * @property {Subject<void>} destroyNotifier$ - Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
 * @property {string} modal - Variable que controla la visibilidad del modal.
 * @property {ElementRef} closeModal - Referencia al elemento de cierre del modal.
 * 
 * @method ngOnInit() - Inicializa el formulario reactivo con los valores actuales del estado de la solicitud y los datos de las mercancias.
 * @method inicializarFormulario() - Inicializa el formulario reactivo con los valores del certificado obtenidos desde el estado de la solicitud.
 * @method abrirModal() - Abre el modal y carga el formulario con los datos predefinidos de las mercancias.
 * @method getRegistroForm() - Carga los datos predefinidos de las mercancias en el formulario del modal.
 * @method setValoresStore() - Actualiza el store del trámite con el valor de un campo específico del formulario.
 * @method ngOnDestroy() - Se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
 */
export class DatosCertificado110203Component implements OnInit, OnDestroy {

  /**
   * Radio utilizado para la selección de un solo valor en la tabla dinámica.
   */
  public radio = TablaSeleccion.RADIO;

  /**
   * Lista de mercancias obtenidas del catálogo.
   */
  mercancias: Mercancia[] = mediocatalogo.mercancias;

  /**
   * Lista de tipos de datos obtenidos del catálogo.
   */
  tipoDatos: Catalogo[] = mediocatalogo.tipo;

  /**
   * Lista de opciones de comercialización obtenidas del catálogo.
   */
  comercializacion: Catalogo[] = mediocatalogo.comercializacion;

  /**
   * Lista de medidas obtenidas del catálogo.
   */
  medida: Catalogo[] = mediocatalogo.comercializacion;

  /**
   * Configuración de las columnas para la tabla dinámica que muestra las mercancias.
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] = [
    { encabezado: 'Número de orden', clave: (item: Mercancia) => item.orden, orden: 1 },
    { encabezado: 'Fracción arancelaria', clave: (item: Mercancia) => item.arancelaria, orden: 2 },
    { encabezado: 'Nombre técnico', clave: (item: Mercancia) => item.tecnico, orden: 3 },
    { encabezado: 'Nombre comercial', clave: (item: Mercancia) => item.comercial, orden: 4 },
    { encabezado: 'Nombre inglés', clave: (item: Mercancia) => item.ingles, orden: 5 },
    { encabezado: 'Número de registro', clave: (item: Mercancia) => item.registro, orden: 6 },
  ];

  /**
   * Formulario reactivo que gestiona los datos del certificado, como observaciones, precisa, y presenta.
   */
  certificadoForm!: FormGroup;

  /**
   * Formulario reactivo que gestiona los datos de las mercancias, como nombre comercial, cantidad, valor, etc.
   */
  mercanciasForm!: FormGroup;

  /**
   * Estado de la solicitud 110203, que contiene los valores actuales de los campos relacionados con el certificado.
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
  ) { // Método constructor, utilizado para inicializar las dependencias
     }

  /**
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
  public abrirModal() {
    this.modal = 'show'; // Muestra el modal
    this.getRegistroForm(); // Carga los datos en el formulario
  }

  /**
   * Método que carga los datos predefinidos en el formulario del modal.
   * 
   * Carga valores predeterminados en el formulario de mercancias, deshabilitando algunos campos
   * para evitar que el usuario los edite.
   */
  public getRegistroForm(): void {
    this.mercanciasForm = this.fb.group({
      comercial: ['', Validators.required],
      ingles: ['', Validators.required],
      complemento: [''],
      marca: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern(REG_X.DECIMALES_DOS_LUGARES)]],
      cantidad: ['', [Validators.required,Validators.pattern(REGEX_RFC)]],
      comercializacion: ['', Validators.required],
      bruta: ['', [Validators.required, Validators.pattern(REG_X.DECIMALES_DOS_LUGARES)]],
      medida: ['', Validators.required],
      factura: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
     this.patchData();
  
  }
  patchData():void {
    this.mercanciasForm.patchValue({
      comercial: 'Patitos de hule',
      ingles: 'rubber ducklings',
      complemento:'preabus',
      marca: 'preabus',
      valor: 15,
      cantidad: 20000,
      bruta: '4',         
      factura: '23',
      fecha: '18/02/2025',
    });

    this.mercanciasForm.get('comercial')?.disable();
    this.mercanciasForm.get('ingles')?.disable();
    this.mercanciasForm.get('cantidad')?.disable();
    this.mercanciasForm.get('fecha')?.disable();
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo y carga los datos necesarios para el certificado y las mercancias.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
 
    this.mercanciasForm = this.fb.group({
      comercial: ['', Validators.required],
      ingles: ['', Validators.required],
      complemento: [''],
      marca: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      comercializacion: ['', Validators.required],
      bruta: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      medida: ['', Validators.required],
      factura: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales del estado de la solicitud.
   * 
   * Carga los datos del certificado, como observaciones, precisa, y presenta desde el estado de la solicitud.
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

    this.certificadoForm = this.fb.group({
      observaciones: [this.solicitudState.observaciones],
      precisa: [this.solicitudState.precisa,Validators.required],
      presenta: [this.solicitudState.presenta],
    });
  }

  /**
   * Método que actualiza el store del trámite con el valor de un campo específico del formulario.
   * 
   * @param form - Formulario que contiene los valores.
   * @param campo - Nombre del campo del formulario.
   * @param metodoNombre - Nombre del método del store que actualizará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110203Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110203Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
