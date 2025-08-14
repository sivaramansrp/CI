

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CAPTURA_MERCANCIA, DATOS_SOLICITUD, Mercancias, OPCIONES_DE_BOTON_DE_RADIO, PreOperativo } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { Solicitud221601State, Tramite221601Store } from '../../../../estados/tramites/tramite221601.store';
import { CONFIGURATION_TABLAS_MERCANCIAS } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';

import { ModalComponent } from '../modal/modal.component';
import { ZoosanitarioService } from '../../service/zoosanitario.service';

import { INPUT_FECHA_CONFIGURACION } from '@libs/shared/data-access-user/src/core/enums/221601/fecha.enum';


/**
 * Componente que gestiona la visualización y el manejo de los datos de la solicitud 221601, incluyendo 
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
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    CommonModule,
    InputRadioComponent,
    ModalComponent,
    InputFechaComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss']
})

/**
 * Componente que maneja la visualización y actualización de los datos relacionados con la solicitud 221601.
 * Utiliza un formulario reactivo para capturar y persistir la información relacionada con la solicitud.
 * También incluye un modal para mostrar las mercancías y gestionar ciertos campos del formulario.
 * 
 * @class
 * @implements OnInit, OnDestroy
 * @example
 * <app-datos-de-la-solicitud></app-datos-de-la-solicitud>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo que gestiona los datos de la solicitud, como justificación,
 * aduana, oficina y punto. También maneja la visualización de la tabla dinámica que contiene la lista de mercancías.
 * 
 * @property {FormGroup} datosSolicitudForm - Formulario reactivo que gestiona los datos de la solicitud, como justificación,
 * aduana, oficina, etc.
 * @property {Catalogo[]} regimen - Lista de opciones de régimen obtenidas del catálogo.
 * @property {Mercancia[]} mercancias - Lista de mercancías obtenidas de un catálogo.
 * @property {ConfiguracionColumna<Mercancia>[]} configuracionTabla - Configuración de las columnas para la tabla dinámica.
 * @property {Solicitud221601State} solicitudState - Estado de la solicitud 221601 que contiene los valores actuales de la solicitud.
 * @property {string} TEXTOS - Contiene los datos relacionados con la solicitud (generalmente un texto descriptivo).
 * @property {boolean} showContent - Controla la visibilidad del contenido relacionado con la solicitud.
 * 
 * @method toggleContent() - Método que cambia la visibilidad del contenido asociado a la solicitud.
 * @method ngOnInit() - Inicializa el formulario reactivo y carga los datos de la solicitud.
 * @method setValoresStore() - Actualiza el store del trámite con el valor de un campo específico del formulario.
 * @method ngOnDestroy() - Se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
 */

export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {


   /**
   * property tipoPersonaOptions
   * description Opciones para el tipo de persona (física o moral).
   */
  tipoPersonaOptions: PreOperativo[] = [];
  /** Modal para mostrar la información de terceros */
  
   showtercerosModal = false;

    /**
      * Constante para configurar el input de fecha.
      * Define las propiedades del campo de entrada de fecha.
      */
       INPUT_FECHA_CONFIGURACION = INPUT_FECHA_CONFIGURACION;

/** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
 esFormularioSoloLectura: boolean = false;
  /**
   * Lista de opciones de régimen obtenidas de un catálogo.
   */
  public regimen: Catalogo[] = realizar.regimen;

  /**
   * Lista de opciones de veterinarios obtenidas de un catálogo.
   */
  public veterinario: Catalogo[] = realizar.veterinario;
  /**
   * Lista de opciones de establecimientos obtenidas de un catálogo.
   */
  public establecimiento: Catalogo[] = realizar.establecimiento;
  /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Solicitud221601State;

  /**
   * Formulario reactivo que gestiona los datos de la solicitud.
   */
  datosSolicitudForm!: FormGroup;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para definir el tipo de selección de tabla (checkbox).
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Texto que contiene los datos de la solicitud.
   */
  TEXTOS: string = DATOS_SOLICITUD;

  /**
   * Constante que almacena el valor de la mercancía capturada.
   */
  MERCANCIA: string = CAPTURA_MERCANCIA;


  /**
   * Variable para mostrar u ocultar el contenido de la solicitud.
   */
  showContent = true;

  /**
   * Lista de mercancías obtenidas del catálogo.
   */
  mercancias: Mercancias[] = realizar.mercancias;

  /**
   * Configuración de las columnas para la tabla dinámica que muestra las mercancías.
   */
  configuracionTabla: ConfiguracionColumna<Mercancias>[] = CONFIGURATION_TABLAS_MERCANCIAS;

  /**
* Indica si se deben mostrar las opciones de prellenado en la interfaz de usuario.
*/
  mostrarOpcionesDePrellenado: boolean = true;

  /**
   * Texto de los manifiestos.
   */
  plegable: boolean = true;

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Opciones de botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * @variable valorSeleccionado
   * @type {string}
   * @description Almacena el valor seleccionado por defecto, que en este caso es 'Productos y Subproductos'.
   */
  valorSeleccionado: string = 'Productos y Subproductos';
  
  /**
   * Constructor del componente. Inicializa el formulario reactivo y configura las dependencias necesarias.
   * 
   * @param fb - FormBuilder utilizado para crear el formulario reactivo.
   * @param tramite221601Store - Store que gestiona los valores persistentes del trámite 221601.
   * @param tramite221601Query - Query que se utiliza para obtener el estado actual de la solicitud 221601.
   */
  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
      private consultaioQuery: ConsultaioQuery,
        private validacionesService: ValidacionesFormularioService, 
        private service: ZoosanitarioService 
  ) {
    // Constructor que inyecta las dependencias necesarias
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
         
         
           this.inicializarCombinacionFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Método que abre o cierra el contenido de la solicitud.
   */
  public toggleContent(): void {
    this.showContent = !this.showContent;
  }

  /**
 * Alterna el estado de la propiedad `plegable` entre verdadero y falso.
 * Esto se utiliza para mostrar u ocultar un elemento colapsable en la interfaz de usuario.
 */
  mostrarColapsable(): void {
    this.plegable = !this.plegable;
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo y carga los datos necesarios para la solicitud.
   */
  ngOnInit(): void {
   this.inicializarCombinacionFormulario();
     this.cargarRadio();
  }

  showMercanciaModal = false;

mercanciaForm = this.fb.group({
  paisOrigen: ['', Validators.required],
  regulacion: ['', Validators.required],
  nombreProducto: ['', Validators.required, Validators.maxLength(50)],
  fracciónArancelaria: ['', Validators.required],
  unidad2: ['', Validators.required, { disabled: true }],
  nico: ['', Validators.required],
  unidad1: ['',{ disabled: true }],
  observaciones: [''],
  cantidadUmt: ['', Validators.required],
  umt: ['', Validators.required,{disabled:true}],
  cantidadUmc: ['', Validators.required],
  umc: ['', Validators.required],
  especie: ['', Validators.required],
  edadAnimal: ['', Validators.required],
  paisOrigen1: ['', Validators.required],
  paisdeprocedencia: ['', Validators.required],
  tipoProducto: [''],
  presentacion: ['', Validators.required],
  cantidadPresentacion: ['', Validators.required],
  tipoPresentacion: [''],
  tipoPlanta: [''],
  plantaAutorizadaOrigen: [''],
  nombreLote: [''],
  //  tipoPersona: [this.solicitudState?.tipoPersona || 'fisica', Validators.required],
  tipoPersona: ['fisica', Validators.required],
  fechaElaboracion: [''],
  fechaProduccion: [''],
  fechaCaducidad: [''],
  tipoEspecie: [''],
  fecha: [''], // <-- Add this line to define the 'fecha' control
});


  /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCombinacionFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario()
    }  
  }
  /** Inicializa los datos del formulario suscribiéndose al estado del trámite.  
 *  Asigna el estado actual al modelo local del componente. */
   inicializarFormulario(): void {
    this.tramite221601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221601State;
        })
      )
      .subscribe();

    this.datosSolicitudForm = this.fb.group({
      justificacion: [this.solicitudState.justificacion, Validators.required],
      aduana: [this.solicitudState.aduana],
      oficina: [this.solicitudState.oficina],
      punto: [this.solicitudState.punto],
      guia: [this.solicitudState.guia,[Validators.maxLength(50)]],
      clave: [this.solicitudState.clave,[Validators.required, Validators.maxLength(15)]],
      establecimiento: [this.solicitudState.establecimiento, Validators.required],
      regimen: [this.solicitudState.regimen, Validators.required],
      veterinario: [this.solicitudState.veterinario, Validators.required, Validators.maxLength(50)],
      capturaMercancia: [this.solicitudState.capturaMercancia, Validators.required]
    });

    this.datosSolicitudForm.get('punto')?.disable();
    this.datosSolicitudForm.get('aduana')?.disable();
    this.datosSolicitudForm.get('oficina')?.disable();
    this.datosSolicitudForm.get('aduana')?.setValue(realizar.formData.aduana);
    this.datosSolicitudForm.get('oficina')?.setValue(realizar.formData.oficina);
    this.datosSolicitudForm.get('punto')?.setValue(realizar.formData.punto);
    this.datosSolicitudForm.get('capturaMercancia')?.setValue(this.valorSeleccionado);
    this.updateStoreWithFormData();
  }
    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.datosSolicitudForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.datosSolicitudForm.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

    cargarRadio(): void {
    this.service.obtenerRadiooption()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }
  /**
 * Actualiza el estado del store `tramite221601Store` con los datos del formulario `MedioForm`.
 *
 * Extrae los valores de los campos `transporte` y `empresa` del formulario y los fusiona con el
 * estado actual `solicitudState`, creando un nuevo objeto que se usa para actualizar el store.
 *
 * @private
 * @returns void
 */
  updateStoreWithFormData(): void {
    const UPDATED_FORM_DATA: Solicitud221601State = {
      ...this.solicitudState,
      aduana: this.datosSolicitudForm.get('aduana')?.value,
      oficina: this.datosSolicitudForm.get('oficina')?.value,
      punto: this.datosSolicitudForm.get('punto')?.value,     
      capturaMercancia: this.datosSolicitudForm.get('capturaMercancia')?.value,   
    };
    // Actualiza el store con el estado modificado
    this.tramite221601Store.update(UPDATED_FORM_DATA);
  }
  /**
   * property fisica
   * description Indica si el tipo de persona es física.
   */
  public fisica = false;

  /**
   * property moral
   * description Indica si el tipo de persona es moral.
   */
  public moral = false;

  /**
   * method inputChecked
   * description Cambia el estado de los checkboxes según el tipo de persona.
   * param checkBoxName Nombre del checkbox seleccionado.
   */
  public inputChecked(checkBoxName: string): void {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }
  /**
   * method cambiarRadioFisica
   * description Cambia el estado del radio button según el valor seleccionado.
   * param value Valor seleccionado.
   */
  cambiarRadioFisica(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.inputChecked(VALOR_SELECCIONADO);
  }
  /**
   * Método que actualiza los valores del store con los datos del formulario.
   * 
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

   /**

 * Método para cambiar la fecha final.

 * @param nuevo_valor Nuevo valor de la fecha final.

 */
fechaFuturaSeleccionada = false;
  cambioFechaFinal(nuevo_valor: string): void {
    this.mercanciaForm.patchValue({
      fecha: nuevo_valor,
    });
   this.tramite221601Store.setFecha(nuevo_valor);
  this.mercanciaForm.get('fecha')?.setValue(nuevo_valor);

  let seleccionada: Date | null = null;
  if (nuevo_valor && nuevo_valor.includes('/')) {
    const [DAY, MONTH, YEAR] = nuevo_valor.split('/').map(Number);
    seleccionada = new Date(YEAR, MONTH - 1, DAY);
  } else {
    seleccionada = new Date(nuevo_valor); 
  }

  const HOY = new Date();
  HOY.setHours(0, 0, 0, 0);

  if (seleccionada && seleccionada > HOY) {
    this.fechaFuturaSeleccionada = true;
    this.mercanciaForm.get('fecha')?.setErrors({ futureDate: true });
  } else {
    this.fechaFuturaSeleccionada = false;
    this.mercanciaForm.get('fecha')?.setErrors(null);
  }
  }

/**
 * Método para abrir dialogo mercancías.
 * 
 * @returns {void}
 */
  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
 * @description Cambia el valor de un campo del formulario.
 * @param {string} nombreControl Nombre del campo del formulario.
 * @param {string} valor Nuevo valor a asignar.
 */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.datosSolicitudForm.patchValue({
      [nombreControl]: valor,
    });
    this.valorSeleccionado = valor;
  }
  /**
   * Método que se ejecuta cuando se selecciona un exportador en la tabla.
   * 
   * @param filas - Filas seleccionadas del exportador.
   */
 cancelarDestinatario(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

/**
   * Toggles the visibility of the "terceros" modal.
   *
   * @returns {void}
   * @memberof DatosDeLaSolicitudComponent
   */
  tercerosAgregar(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }


/**
 * Saves the merchandise information if the form is valid.
 *
 * This method checks the validity of the `mercanciaForm` and, if valid,
 * maps all required properties of the merchandise using the form values
 * and default values as needed.
 *
 * @returns {void}
 *
 * @memberof DatosDeLaSolicitudComponent
 */
guardarMercancia():void {
  if (this.mercanciaForm.valid) {
    // Map all required Mercancias properties here, using FORM_VALUE and defaults as needed
}
}
  /**
   * Closes the modal for adding merchandise.
   *
   * This method hides the modal by toggling the `showtercerosModal` property.
   *
   * @returns {void}
   *
   * @memberof DatosDeLaSolicitudComponent
   */
cerrarModal(): void {
  this.showtercerosModal = false;
}
/**
   * Método que se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}