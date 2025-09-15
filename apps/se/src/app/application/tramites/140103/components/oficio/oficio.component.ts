import { BtnContinuarComponent, ConsultaioState, DatosPasos, ListaPasosWizard, Notificacion, NotificacionesComponent, Pedimento, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadosCancelar} from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { ConfiguracionItem } from '../../models/detalle';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DetalleComponent } from '../detalle/detalle.component';
import { DevolverComponent } from '../devolver/devolver.component';
import { HttpClient } from '@angular/common/http';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import oficiodata from '@libs/shared/theme/assets/json/140103/oficiotable.json';

import { ModalComponent } from '../model/modal.component';
import { NUEVO_DATOS_CUPO } from '../../constants/detalle.enum';
import { Tramite140103Query } from '../../../../estados/queries/tramite140103.query';
import { Tramite140103Store } from '../../../../estados/tramites/tramite140103.store';


/**
 * Componente para gestionar la visualización y actualización de los datos de los oficios de certificados.
 * Este componente muestra una tabla con la información de los oficios y permite la interacción con un formulario
 * reactivo que captura datos relacionados con la asignación y monto a cancelar.
 *
 * @component
 * @example
 * <app-oficio></app-oficio>
 * 
 * @imports
 * - `TablaDinamicaComponent`: Componente para mostrar datos en formato de tabla dinámica.
 * - `DetalleComponent`: Componente que muestra detalles adicionales del certificado.
 * - `FormsModule`: Módulo necesario para trabajar con formularios basados en plantillas.
 * - `ReactiveFormsModule`: Módulo necesario para trabajar con formularios reactivos en Angular.
 * - `TituloComponent`: Componente para mostrar el título en la interfaz.
 * - `BtnContinuarComponent`: Componente que permite la acción de continuar.
 */
@Component({
  selector: 'app-oficio',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    DetalleComponent,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    BtnContinuarComponent,
    CommonModule,
    DevolverComponent,
    ModalComponent,
    NotificacionesComponent,
  ],
  templateUrl: './oficio.component.html',
  styleUrls: ['./oficio.component.scss']
})

/**
 * Componente que gestiona la visualización y la actualización de datos relacionados con los oficios de certificados.
 * Este componente se encarga de mostrar una tabla dinámica con la información de los oficios y permite la interacción
 * con un formulario reactivo para capturar datos de asignación, monto y estado de cancelación.
 * Además, implementa la navegación por pasos dentro del proceso de gestión de los oficios.
 * 
 * @class
 * @implements OnInit
 * @example
 * <app-oficio></app-oficio>
 * 
 * @constructor
 * El componente se inicializa con un formulario reactivo que incluye campos como 'asignado', 'monto', y 'cancelar'.
 * También carga los datos de los oficios a través de un archivo JSON y establece configuraciones para las columnas de la tabla.
 * 
 * @property {Facturas[]} Certificados - Lista vacía que almacena los certificados de los oficios.
 * @property {certificadosCancelar[]} oficio - Lista que contiene los oficios cargados desde un archivo JSON.
 * @property {ConfiguracionColumna<any>[]} configuracionTabla - Configuración de las columnas para la tabla de oficios.
 * @property {any[]} filteredData - Datos filtrados de los oficios para mostrar solo los que cumplen con un criterio específico.
 * @property {TablaSeleccion} TablaSeleccion - Tipo de selección de tabla (checkbox).
 * @property {FormGroup} oficioForm - Formulario reactivo que captura la información del oficio.
 * @property {ListaPasosWizard[]} pasos - Lista de pasos del asistente de navegación (wizard).
 * @property {number} indice - Índice del paso actual del asistente de navegación.
 * @property {DatosPasos} datosPasos - Datos del asistente de pasos que incluyen la cantidad de pasos, texto de los botones, etc.
 * 
 * @method ngOnInit() - Inicializa el formulario reactivo y llama a `updateformfied` para establecer valores predeterminados en los campos.
 * @method updateformfied() - Actualiza los valores del formulario y deshabilita los campos de entrada para evitar modificaciones del usuario.
 */
export class OficioComponent implements OnInit, OnDestroy{

   /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

   /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Lista de certificados cargados desde un archivo JSON.
   * Esta lista contiene la información de los oficios y su estado.
   */
  Certificados: ConfiguracionItem[] = [];
  /** 
 * Certificado actualmente seleccionado en la configuración.
 * Puede ser nulo si no se ha seleccionado ningún certificado.
 * Utilizado para mostrar o procesar la información del certificado.
 */
  selectedCertificados: ConfiguracionItem | null = null;

  /**
   * Lista de datos de oficios, cada uno representando un certificado que será mostrado en la tabla.
   */
  oficio: CertificadosCancelar[] = oficiodata ?? [];

  /**
   * Configuración de las columnas para la tabla de oficios.
   * Define qué columnas mostrar y cómo extraer los datos de cada oficio.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = [
    { encabezado: 'Folio del oficio de certificado', clave: (item:ConfiguracionItem) => item.folioOficioCertificado, orden: 1 },
    { encabezado: 'Nombre, Denominación o Razón Social', clave: (item: ConfiguracionItem) => item.nombreRazonSocial, orden: 2 },
    { encabezado: 'Estado', clave: (item: ConfiguracionItem) => item.estado, orden: 3 },
    { encabezado: 'Fabricante', clave: (item: ConfiguracionItem) => item.fabricante, orden: 4 },
    { encabezado: 'Importador', clave: (item: ConfiguracionItem) => item.importador, orden: 5 },
    { encabezado: 'Unidad Primaria', clave: (item: ConfiguracionItem) => item.unidadPrimaria, orden: 6 },
    { encabezado: 'Monto Expediente', clave: (item: ConfiguracionItem) => item.montoExpediente, orden: 7 },
    { encabezado: 'Monto a Cancelar', clave: (item: ConfiguracionItem) => item.montocancelar, orden: 8 },
    { encabezado: 'Monto Utilizado', clave: (item: ConfiguracionItem) => item.montoutilizado, orden: 9 },
  ];

  /**
   * Filtra los datos de los oficios para mostrar solo aquellos con unidadPrimaria igual a 12.
   */
  filteredData = this.oficio.filter(item => item.unidadPrimaria === 12);

  /**
   * Configuración del tipo de selección en la tabla (en este caso, se usa un checkbox).
   */
  TablaSeleccion = TablaSeleccion.CHECKBOX;
   /** Almacena el estado actual de la consulta relacionada con el trámite.  
 *  Contiene información necesaria para mostrar o procesar datos en el componente. */
   public consultaState!:ConsultaioState;
  /**
   * Formulario reactivo que captura datos relacionados con el oficio, incluyendo
   * asignado, monto y cancelar.
   */
  oficioForm!: FormGroup;

/**
 * @property {Subject<void>} destroyNotifier$
 * Sujeto utilizado para manejar la destrucción de suscripciones en los observables.
 *
 * Se usa comúnmente junto con el operador `takeUntil` en pipes de RxJS
 * para evitar fugas de memoria al destruir el componente.
 */
  private destroyNotifier$: Subject<void> = new Subject();

    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente. Inicializa el formulario reactivo utilizando FormBuilder
   * y configura las dependencias necesarias como HttpClient.
   * 
   * @param http - HttpClient utilizado para hacer solicitudes HTTP.
   * @param fb - FormBuilder utilizado para crear y gestionar el formulario reactivo.
   */
  constructor(public http: HttpClient, public fb: FormBuilder,private consultaioQuery: ConsultaioQuery,private tramite140103Store: Tramite140103Store,private tramite140103Query: Tramite140103Query,) {
            this.consultaioQuery.selectConsultaioState$
              .pipe(
                takeUntil(this.destroyNotifier$),
                map((seccionState) => {
                  this.esFormularioSoloLectura = seccionState.readonly;
                  this.inicializarEstadoFormulario();
                      this.consultaState = seccionState;
                      if (this.consultaState.update) {
                       this.tramite140103Store.update((state) => ({
                       ...state,                  
                      certificados: [...state.certificados, NUEVO_DATOS_CUPO] }));
        }
                })
              )
              .subscribe();
  }

  /**
   * Lista de pasos del asistente de navegación (wizard) que guiará al usuario a través de los pasos del proceso.
   */
  pasos: ListaPasosWizard[] = [];

  /**
   * Índice del paso actual en el asistente de navegación.
   */
  indice: number = 1;

  /**
   * Datos del asistente de pasos que contiene la cantidad de pasos y el índice del paso actual.
   * También contiene los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // El número de pasos se obtiene dinámicamente de la lista `pasos`
    indice: this.indice, // Índice del paso actual en el formulario
    txtBtnAnt: 'Anterior', // Texto para el botón de retroceso
    txtBtnSig: 'Continuar', // Texto para el botón de siguiente
  };

  /**
   * Método que se ejecuta al inicializar el componente. Este método crea el formulario reactivo
   * con los controles necesarios y las validaciones requeridas.
   */
  ngOnInit(): void {
    // Inicializa el formulario con los controles y validaciones necesarias
    this.oficioForm = this.fb.group({
      oficioData: this.fb.group({
        asignado: ['', Validators.required], // Campo obligatorio para el monto asignado
        monto: ['', Validators.required], // Campo obligatorio para el monto
        cancelar: ['', Validators.required],// Campo obligatorio para la acción de cancelar
      })
    });

    // Llama al método para actualizar el campo 'monto' con valores predeterminados
    this.updateformfied();

    /** Llama al método que configura el formulario según el estado de solo lectura. */
    this.inicializarEstadoFormulario();
      this.tramite140103Query.select('certificados').subscribe((data: ConfiguracionItem[]) => {
    this.Certificados = data;
  });

  }
/**
   * Método que se invoca al seleccionar una fila en la tabla de certificados.
   * Actualiza la variable `selectedCertificado` con el certificado seleccionado.
   * 
   * @param cancelar - El certificado seleccionado de la tabla.
   */
  onSeleccionarFila(cancelar: ConfiguracionItem): void {
    this.selectedCertificados = cancelar;
  }
/**
   * Método que se ejecuta al destruir el componente.
   * Limpia el Subject `destroyNotifier$` para evitar fugas de memoria.
   */

onClickSeleccionar(): void {
    if (!this.selectedCertificados) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Seleccione un registro.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } 
  }
 /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.oficioForm && this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } 
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.oficioForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.oficioForm.enable();
    } 
  }

  /**
   * Método que actualiza los valores del formulario con datos predeterminados.
   * También deshabilita los campos para que no puedan ser modificados por el usuario.
   */
  updateformfied(): void {
    this.oficioForm.get('oficioData.asignado')?.disable(); // Deshabilita el campo 'asignado'
    this.oficioForm.get('oficioData.monto')?.disable(); // Deshabilita el campo 'monto'
    this.oficioForm.get('oficioData.asignado')?.setValue('2500'); // Asigna un valor predeterminado al campo 'asignado'
    this.oficioForm.get('oficioData.monto')?.setValue('-3991'); // Asigna un valor predeterminado al campo 'monto'
    this.oficioForm.get('oficioData.cancelar')?.setValue('12'); // Asigna un valor predeterminado al campo 'cancelar'
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * 
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   * 
   */

  showDevolverModal = false;

/**
 * @method abrirDevolverFacturas
 * @description
 * Abre el modal para devolver facturas, estableciendo la variable `showDevolverModal` en `true`.
 * 
 * @memberof OficioComponent
 */
abrirDevolverFacturas() : void {
  this.showDevolverModal = true;
}

 /**
   * @description
   * Método que se invoca para abrir un modal de confirmación antes de eliminar un pedimento.
   * Muestra una notificación al usuario y establece el índice del pedimento a eliminar.
   * @param i Índice del pedimento a eliminar. Por defecto es 0.
   */

  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'seleccione un registro',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }

    this.elementoParaEliminar = i;
  }

   /**
   * @description
   * Método que se invoca para eliminar un pedimento del arreglo `pedimentos`.
   * Si el parámetro `borrar` es verdadero, elimina el pedimento en el índice almacenado en `elementoParaEliminar`.
   * @param borrar Indica si se debe proceder con la eliminación del pedimento.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * 
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   * 
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Limpia el Subject `destroyNotifier$` para evitar fugas de memoria.
   */

  selectedCertificado: CertificadosCancelar | null = null;
  showCapturaMontoModal = false;

  /**
   * Método que se invoca al seleccionar una fila en la tabla de certificados.
   * Actualiza la variable `selectedCertificado` con el certificado seleccionado.
   * 
   * @param certificado - El certificado seleccionado de la tabla.
   */
  onSeleccionRow(certificado: CertificadosCancelar): void {
    this.selectedCertificado = certificado;
  }

  /**
   * Método que se invoca al hacer clic en el botón "Seleccionar" de la tabla.
   * Si no hay un certificado seleccionado, muestra una notificación de error.
   * Si hay un certificado seleccionado, muestra el modal para capturar el monto.
   */
  onSeleccionarClick(): void {
    if (!this.selectedCertificado) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'Seleccione un registro.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
    } else {
      this.showCapturaMontoModal = true;
    }
  }

  /**
   * Método que se invoca para cerrar el modal de captura de monto.
   * Resetea la variable `selectedCertificado` a null y oculta el modal.
   */
  closeCapturaMontoModal():void {
    this.showCapturaMontoModal = false;
    this.selectedCertificado = null;
  }
}
