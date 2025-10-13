import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Mercancia } from '@libs/shared/data-access-user/src/core/models/110203/tecnicos.model';


import mediocatalogo from '@libs/shared/theme/assets/json/110203/mediocatalogo.json';

import mercanciasFromDatos from '@libs/shared/theme/assets/json/110203/mercancias-from-datos.json';

import { REGEX_RFC,REG_X} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { Solicitud110203State, Tramite110203Store } from '../../estados/tramite110203.store';
import { Tramite110203Query } from '../../estados/tramite110203.query';


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
  mercancias: Mercancia[] = mediocatalogo?.mercancias;

  /**
   * Lista de tipos de datos obtenidos del catálogo.
   */
  tipoDatos: Catalogo[] = mediocatalogo?.tipo;

  /**
   * Lista de opciones de comercialización obtenidas del catálogo.
   */
  comercializacion: Catalogo[] = mediocatalogo?.comercializacion;

  /**
   * Lista de medidas obtenidas del catálogo.
   */
  medida: Catalogo[] = mediocatalogo?.comercializacion;

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

/**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;

  /**
   * Inicializa el componente inyectando los servicios requeridos y configurando las suscripciones de estado.
   *
   * @param fb - Servicio FormBuilder de Angular para crear y gestionar formularios.
   * @param tramite110203Store - Servicio Store para gestionar el estado del "Trámite 110203".
   * @param tramite110203Query - Servicio Query para acceder al estado del "Trámite 110203".
   * @param consultaioQuery - Servicio Query para acceder al estado de "Consultaio".
   *
   * Se suscribe al estado de `Consultaio` para:
   * - Actualizar la propiedad `esFormularioSoloLectura` según el estado actual de solo lectura.
   * - Llamar a `inicializarEstadoFormulario()` para aplicar configuraciones según el estado recibido.
   * - Cancelar automáticamente la suscripción cuando `destroyNotifier$` emite, evitando fugas de memoria.
   */
  constructor(
    private fb: FormBuilder,
    private tramite110203Store: Tramite110203Store,
    private tramite110203Query: Tramite110203Query,
    private consultaioQuery: ConsultaioQuery
  ) { 
/**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

     }


/**
     * Evalúa si se debe inicializar o cargar datos en el formulario.  
     * Además, obtiene la información del catálogo de mercancía.
     */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }


   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.certificadoForm?.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.certificadoForm.enable();
    }
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
  public abrirModal(): void {
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
      comercial: [mercanciasFromDatos?.comercial, Validators.required],
      ingles: [mercanciasFromDatos?.ingles, Validators.required],
      complemento: [this.solicitudState?.complemento ? this.solicitudState?.complemento : mercanciasFromDatos?.complemento],
      marca: [this.solicitudState?.marca ? this.solicitudState?.marca : mercanciasFromDatos?.marca, Validators.required],
      valor: [this.solicitudState?.valor ? this.solicitudState?.valor : mercanciasFromDatos?.valor, [Validators.required, Validators.pattern(REG_X.DECIMALES_DOS_LUGARES)]],
      cantidad: [mercanciasFromDatos?.cantidad, [Validators.required, Validators.pattern(REGEX_RFC)]],
      comercializacion: [this.solicitudState?.comercializacion, Validators.required],
      bruta: [this.solicitudState?.bruta ? this.solicitudState?.bruta : mercanciasFromDatos?.bruta, [Validators.required, Validators.pattern(REG_X.DECIMALES_DOS_LUGARES)]],
      medida: [this.solicitudState?.medida, Validators.required],
      factura: [this.solicitudState?.factura ? this.solicitudState?.factura : mercanciasFromDatos?.factura, Validators.required],
      tipo: [this.solicitudState?.tipo, Validators.required],
      fecha: [mercanciasFromDatos?.fecha, Validators.required]
    });
    this.patchData();
  }
   /**
   * Asigna valores predeterminados al formulario de mercancías.
   * Este método utiliza `patchValue` para completar algunos campos del formulario con datos de ejemplo,
   * lo cual es útil para pruebas o para precargar información existente en un flujo de edición.
   */
  patchData():void {
   /**
   * Desactiva campos específicos del formulario de mercancías.
   * Los campos deshabilitados no pueden ser modificados por el usuario y no se incluirán al enviar el formulario.
   * En este caso, se deshabilitan los campos: comercial, inglés, cantidad y fecha.
   */
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
     this.tramite110203Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud110203State;
        })
      )
      .subscribe();
       /**
   * Inicializa el formulario reactivo del componente con sus valores y validaciones correspondientes.
   * Este método configura los controles del formulario y sus validadores iniciales.
   */
    this.inicializarFormulario();
   }
   /**
 * Formatea el valor de un campo numérico del formulario a 4 decimales.
 *
 * Este método obtiene el valor del control especificado por su nombre,
 * y si el valor no es nulo ni vacío, lo convierte a número flotante
 * con 4 cifras decimales. Luego actualiza el control sin disparar eventos.
 *
 * @param controlName - El nombre del campo dentro del formulario `mercanciasForm` que se desea formatear.
 */
formatDecimal(controlName: string, functionName: keyof Tramite110203Store): void {
  const DATA = this.mercanciasForm.get(controlName);
  if (!DATA) 
    {
      return;
    }

  const VALUE = DATA.value;

  if (VALUE !== null && VALUE !== '') {
    // Convert to float and format with 4 decimal places
    const FORMAT_DATOS = parseFloat(VALUE).toFixed(4);
    DATA.setValue(FORMAT_DATOS, { emitEvent: false });
    this.setValoresStore(this.mercanciasForm, controlName, functionName);
  }
}

  /**
   * Inicializa el formulario reactivo con los valores actuales del estado de la solicitud.
   * 
   * Carga los datos del certificado, como observaciones, precisa, y presenta desde el estado de la solicitud.
   */
  private inicializarFormulario(): void {  
/** 
 * Crea el formulario reactivo para el certificado.
 * Contiene los campos: observaciones, descripción precisa de la solicitud (precisa) y quién presenta la solicitud (presenta).
 */
    this.certificadoForm = this.fb.group({
      observaciones: [this.solicitudState?.observaciones],
      precisa: [this.solicitudState?.precisa,Validators.required],
      presenta: [this.solicitudState?.presenta],
    });
    /**
 * Crea el formulario reactivo correspondiente a los datos del certificado.
 * Incluye los siguientes campos:
 * - observaciones: Comentarios adicionales del solicitante.
 * - precisa: Descripción detallada de la solicitud (obligatorio).
 * - presenta: Persona o entidad que presenta la solicitud.
 */
      this.mercanciasForm = this.fb.group({
      comercial: ['', Validators.required],
      ingles: ['', Validators.required],
      complemento: [''],
      marca: ['', Validators.required],
      valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      cantidad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      comercializacion: [this.solicitudState.comercializacion, Validators.required],
      bruta: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      medida: [this.solicitudState.medida, Validators.required],
      factura: ['', Validators.required],
      tipo: [this.solicitudState.tipo, Validators.required],
      fecha: ['', Validators.required]
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
 * Actualiza la primera mercancía de la lista con los valores del formulario.
 * Valida que el formulario sea correcto antes de asignar los nuevos datos.
 * Finalmente, cierra el modal después de guardar los cambios.
 */
onModificar(): void {
    const UPDATED_DATOS = this.mercanciasForm.value;

    this.mercancias[0] = {
      ...this.mercancias[0],
      nombreComercial: UPDATED_DATOS.comercial,
      nombreIngles: UPDATED_DATOS.ingles,
      complementoClasificacion: UPDATED_DATOS.complemento,
      marca: UPDATED_DATOS.marca,
      valorMercancia: UPDATED_DATOS.valor,
      cantidad: UPDATED_DATOS.cantidad,
      umc: UPDATED_DATOS.comercializacion,
      masaBruta: UPDATED_DATOS.bruta,
      unidadMedidaMasaBruta: UPDATED_DATOS.medida,
      numeroFactura: UPDATED_DATOS.factura,
      tipoFactura: UPDATED_DATOS.tipo,
      fechaExpedicion: UPDATED_DATOS.fecha,
    };    
    this.closeModal.nativeElement.click();
  
}

  /**
   * Método que se ejecuta cuando el componente es destruido. Limpia los recursos y previene memory leaks.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
