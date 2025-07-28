import {AbstractControl,FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,ValidationErrors,Validators} from '@angular/forms';
import {Catalogo,CatalogoSelectComponent,InputFecha,InputFechaComponent,Notificacion,NotificacionesComponent,Pedimento,TablaDinamicaComponent,TablaSeleccion,TituloComponent,ValidacionesFormularioService,} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { DatosDeLaTabla, TramiteList } from '../../models/datos-tramite.model';
import { ENCABEZADO_TABLA_DATOS, Solicitud32101Enum } from '../../constants/solicitud32101.enum';
import { Solicitud32101State, Tramite32101Store } from '../../../../estados/tramites/tramite32101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { FECHA_PAGO } from '../../models/registro.model';
import { Router } from '@angular/router';
import { Tramite32101Query } from '../../../../estados/queries/tramite32101.query';

/**
 * Componente que gestiona la solicitud del trámite 31803.
 * Contiene la lógica para inicializar el formulario, manejar eventos y comunicarse con el estado global.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
  ],
  providers: [ConsultaAvisoAcreditacionService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  registroForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32101State;

  /**
   * Sujeto utilizado como notificador para la destrucción del componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones o liberar recursos asociados.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de la tabla de selección.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos configurados para la tabla.
   */
  configuracionTablaDatos: DatosDeLaTabla[] = [];

  /**
   * Enumeración que contiene los textos utilizados en el componente.
   */
  solicitudEnum = Solicitud32101Enum;

  /**
  * Estado actual de la consulta obtenido desde el servicio.
  */
  consultaDatos!: ConsultaioState;

  /**
  * Indica si el formulario está en modo de solo lectura.
  */
  soloLectura: boolean = false;

  /**
   * Representa una lista de trámites con información adicional.
   *
   * @property {TramiteList[]} catalogos - Lista de catálogos relacionados con los trámites.
   * @property {string} labelNombre - Etiqueta que representa el nombre asociado al trámite.
   * @property {string} primerOpcion - Primera opción seleccionable en la lista de trámites.
   */
  tramiteList: {
    catalogos: TramiteList[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Lista de aduanas.
   */
  aduana: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Representa la estructura de un banco utilizado en la aplicación.
   *
   * @property {Catalogo[]} catalogos - Lista de catálogos asociados al banco.
   * @property {string} labelNombre - Etiqueta que representa el nombre del banco.
   * @property {string} primerOpcion - Primera opción predeterminada para el banco.
   */
  banco: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Configuración para el campo de fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_PAGO;

  /**
   * Arreglo que contiene las filas seleccionadas de la tabla.
   * Cada elemento del arreglo es de tipo `datosDeLaTabla`.
   */
  selectedRows: DatosDeLaTabla[] = [];

  /**
   * Notificación utilizada para mostrar mensajes o alertas en la interfaz.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Notificación utilizada para mostrar mensajes o alertas en la interfaz.
   */
  public nuevaNotificacion2!: Notificacion;

  /** 
  * Índice del pedimento marcado para eliminación.
  */
  public elementoParaEliminar!: number;

  /** 
  * Arreglo que contiene los pedimentos registrados.
  */
  public pedimentos: Array<Pedimento> = [];

  /**
   * Propiedad que almacena el encabezado de la tabla utilizado en el componente.
   * Este encabezado define los datos que se mostrarán en la tabla.
   */
  public encabezadoDeTabla = ENCABEZADO_TABLA_DATOS;

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   *
   * @param registroSolicitud Servicio para obtener datos relacionados con la solicitud.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén global para gestionar el estado del trámite.
   * @param query Consulta para obtener el estado actual del trámite.
   * @param validacionesService Servicio para validar campos del formulario.
   */
  constructor(
    private consultaAvisoAcreditacionService: ConsultaAvisoAcreditacionService,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    public tramite32101Store: Tramite32101Store,
    private tramite32101Query: Tramite32101Query,
    private router: Router,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.tramiteList = {
      catalogos: [],
      labelNombre: 'Tipo de inversión',
      primerOpcion: 'Seleccione un valor',
    };
    this.aduana = {
      catalogos: [],
      labelNombre: 'Forma de adquisicion',
      primerOpcion: 'Selecciona el tipo de Trámite',
    };
    this.banco = {
      catalogos: [],
      labelNombre: 'Banco',
      primerOpcion: 'Seleccione un valor',
    };
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Suscribe al observable `selectSolicitud$` para obtener el estado de la solicitud
   *   y lo asigna a la propiedad `solicitudState`.
   * - Inicializa el formulario llamando a `inicializarFormulario`.
   * - Realiza las solicitudes necesarias para obtener las listas de documentos,
   *   inversiones y bancos mediante los métodos `fetchListaDeDocumentos`,
   *   `fetchListaDeInversion` y `fetchBancoList`.
   * - Escucha los cambios en los datos del formulario desde el servicio
   *   `consultaAvisoAcreditacionService` y actualiza las filas de la tabla
   *   llamando a `updateTableRow` con los datos recibidos.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite32101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.configuracionTablaDatos = this.solicitudState.datosDelContenedor;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.fetchListaDeDocumentos();
    this.fetchListaDeInversion();
    this.fetchBancoList();
    /**
    * Escuchar los datos actualizados de la fila
    */
    this.consultaAvisoAcreditacionService.formData$.pipe(takeUntil(this.destroyNotifier$)).subscribe((formData) => {
      formData.forEach((row) => this.updateTableRow(row));
      });

    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaDatos = seccionState;
        this.soloLectura = this.consultaDatos.readonly;
        this.inicializarEstadoFormulario();
      })
    )
  .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario `registroForm` con los campos necesarios y sus valores predeterminados.
   *
   * Este método configura un formulario reactivo utilizando `FormBuilder` y asigna valores iniciales
   * a cada campo basado en el estado actual de `solicitudState`. También incluye validadores requeridos
   * y personalizados para ciertos campos.
   *
   * Campos del formulario:
   * - `tipoDeInversion`: Lista de documentos, requerido.
   * - `valorEnPesos`: Valor en pesos, requerido.
   * - `descripcionGeneral`: Descripción general, requerido.
   * - `listaDeDocumentos`: Lista de documentos, requerido.
   * - `manifiesto1`, `manifiesto2`, `manifiesto3`: Manifiestos opcionales.
   * - `claveDeReferencia`: Clave de referencia, deshabilitado por defecto con un valor predeterminado.
   * - `cadenaDeLaDependencia`: Cadena de la dependencia, deshabilitado por defecto con un valor predeterminado.
   * - `numeroDeOperacion`: Número de operación.
   * - `banco`: Banco asociado.
   * - `llaveDePago`: Llave de pago.
   * - `fechaInicialInput`: Fecha inicial, incluye un validador personalizado para verificar que la fecha no sea mayor a hoy.
   * - `importeDePago`: Importe de pago, deshabilitado por defecto con un valor predeterminado.
   *
   * @returns {void} No retorna ningún valor.
   */
  inicializarFormulario(): void {
    this.registroForm = this.fb.group({
      tipoDeInversion: [
        this.solicitudState?.listaDeDocumentos,
        [Validators.required],
      ],
      valorEnPesos: [this.solicitudState?.valorEnPesos, [Validators.required]],
      descripcionGeneral: [
        this.solicitudState?.descripcionGeneral,
        [Validators.required],
      ],
      listaDeDocumentos: [this.solicitudState?.listaDeDocumentos, [Validators.required]],
      manifiesto1: [this.solicitudState?.manifiesto1],
      manifiesto2: [this.solicitudState?.manifiesto2],
      manifiesto3: [this.solicitudState?.manifiesto3],
      claveDeReferencia: [
        {
          value: this.solicitudState?.claveDeReferencia || '284000255',
          disabled: true,
        },
      ],
      cadenaDeLaDependencia: [
        {
          value: this.solicitudState?.cadenaDeLaDependencia || '0111514EC10101',
          disabled: true,
        },
      ],
      numeroDeOperacion: [this.solicitudState?.numeroDeOperacion],
      banco: [this.solicitudState?.banco],
      llaveDePago: [this.solicitudState?.llaveDePago],
      fechaInicialInput: [
        this.solicitudState?.fechaInicialInput,
        [SolicitudComponent.validateFechaMenorIgualHoy.bind(this)],
      ],
      importeDePago: [
        { value: this.solicitudState?.importeDePago || '7735', disabled: true },
      ],
    });
    this.inicializarEstadoFormulario()
  }

      /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * @private
   */
  private inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.registroForm?.disable();
    } else {
      this.registroForm?.enable();
    }
  }

  /**
   * Obtiene el grupo de formulario 'tipoDeInversion' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'tipoDeInversion'.
   */
  get tipoDeInversion(): FormGroup {
    return this.registroForm.get('tipoDeInversion') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get valorEnPesos(): FormGroup {
    return this.registroForm.get('valorEnPesos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get claveDeReferencia(): FormGroup {
    return this.registroForm.get('claveDeReferencia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get importeDePago(): FormGroup {
    return this.registroForm.get('importeDePago') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get cadenaDeLaDependencia(): FormGroup {
    return this.registroForm.get('cadenaDeLaDependencia') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get llaveDePago(): FormGroup {
    return this.registroForm.get('llaveDePago') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get numeroDeOperacion(): FormGroup {
    return this.registroForm.get('numeroDeOperacion') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario 'valorEnPesos' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'valorEnPesos'.
   */
  get descripcionGeneral(): FormGroup {
    return this.registroForm.get('descripcionGeneral') as FormGroup;
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite32101Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Obtiene la lista de documentos relacionados con el trámite de inversión.
   *
   * Este método realiza una solicitud al servicio `consultaAvisoAcreditacionService`
   * para obtener la lista de documentos bajo el identificador 'listaDeInversion'.
   * Los datos obtenidos se asignan al catálogo de trámites.
   *
   * @remarks
   * Utiliza el operador `takeUntil` para gestionar la suscripción y evitar
   * fugas de memoria al destruir el componente.
   *
   * @example
   * ```typescript
   * this.fetchListaDeDocumentos();
   * ```
   *
   * @returns {void} No retorna ningún valor.
   */
  fetchListaDeDocumentos(): void {
    this.consultaAvisoAcreditacionService
      .getListaDeDocumentos('listaDeInversion')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.tramiteList.catalogos = respuesta.data;
      });
  }

  /**
   * Obtiene la lista de documentos de inversión desde el servicio de consulta
   * y actualiza el catálogo de aduanas con los datos recibidos.
   *
   * @remarks
   * Este método utiliza el servicio `consultaAvisoAcreditacionService` para
   * realizar una solicitud de documentos. Los datos obtenidos se asignan al
   * catálogo de aduanas (`aduana.catalogos`).
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  fetchListaDeInversion(): void {
    this.consultaAvisoAcreditacionService
      .getListaDeDocumentos('listaDeDocumentos')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.aduana.catalogos = respuesta.data;
      });
  }

  /**
   * Obtiene la lista de bancos desde el servicio `consultaAvisoAcreditacionService`
   * y actualiza el catálogo de bancos en el componente.
   *
   * @remarks
   * Este método utiliza el operador `takeUntil` para gestionar la suscripción
   * y asegurarse de que se complete cuando el observable `destroyNotifier$` emita un valor.
   *
   * @returns {void} No retorna ningún valor.
   */
  fetchBancoList(): void {
    this.consultaAvisoAcreditacionService
      .getListaDeDocumentos('bancoList')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.banco.catalogos = respuesta.data;
      });
  }

  /**
   * Método para poblar una tabla con los datos ingresados en un formulario.
   *
   * Este método toma los valores del formulario `registroForm`, crea una nueva fila
   * con los datos procesados y la agrega a la tabla representada por `configuracionTablaDatos`.
   * Además, actualiza el estado de la tienda `tramite32101Store` con los datos de la tabla
   * y reinicia el formulario a su estado inicial.
   *
   * @remarks
   * - Los valores del formulario se procesan para obtener etiquetas legibles desde catálogos.
   * - El formulario se reinicia y se marca como no modificado después de agregar la fila.
   * - Se validan los campos requeridos antes de agregar la fila a la tabla.
   *
   * @example
   * // Ejemplo de uso:
   * this.poblarTabla();
   *
   * @returns {void} Este método no retorna ningún valor.
   */
  poblarTabla(): void {
    // Validar campos requeridos antes de agregar a la tabla
    const REQUIRED_FIELDS = ['tipoDeInversion', 'valorEnPesos', 'descripcionGeneral', 'listaDeDocumentos'];
    const INVALID_FIELDS: string[] = [];

    // Verificar si los campos requeridos están vacíos o son inválidos
    REQUIRED_FIELDS.forEach(field => {
      const CONTROL = this.registroForm.get(field);
      if (!CONTROL?.value || CONTROL.invalid) {
        INVALID_FIELDS.push(field);
      }
    });

    // Si algún campo requerido es inválido, mostrar error y salir
    if (INVALID_FIELDS.length > 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Error de validación',
        mensaje: 'Por favor, complete todos los campos requeridos antes de agregar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
      
      // Marcar todos los controles del formulario como tocados para mostrar errores de validación
      this.registroForm.markAllAsTouched();
      return;
    }

    const FORM_VALUES = this.registroForm.value;
    const NEW_ROW: DatosDeLaTabla = {
      id: this.configuracionTablaDatos.length + 1,
      tipoDeInversion: SolicitudComponent.getDropdownLabel(
        FORM_VALUES.tipoDeInversion,
        this.tramiteList.catalogos
      ),
      descripcionGeneral: FORM_VALUES.descripcionGeneral,
      formaAdquisicion: SolicitudComponent.getDropdownLabel(
        FORM_VALUES.listaDeDocumentos,
        this.aduana.catalogos
      ),
      valorEnPesos: FORM_VALUES.valorEnPesos,
      comprobanteDePago: 'N/A',
    };

    this.configuracionTablaDatos = [...this.configuracionTablaDatos, NEW_ROW];
    this.tramite32101Store.setDatosDelContenedor(this.configuracionTablaDatos);
    this.abrirModal();
    this.registroForm.reset();
    this.registroForm.markAsUntouched();
    this.registroForm.markAsPristine();
  }

  /**
   * Obtiene la etiqueta de un elemento seleccionado en un catálogo desplegable.
   *
   * @param selectedId - El ID del elemento seleccionado.
   * @param catalog - Una lista de objetos del catálogo que contiene descripciones.
   * @returns La descripción del elemento seleccionado si se encuentra, de lo contrario, 'N/A'.
   */
  static getDropdownLabel(selectedId: string | number, catalog: Catalogo[]): string {
    const NUMERIC_ID = typeof selectedId === 'string' ? parseInt(selectedId, 10) : selectedId;
    const SELECTED_ITEMS = catalog.find(
      (item) => {
        return item.id === NUMERIC_ID;
      }
    );
    return SELECTED_ITEMS ? SELECTED_ITEMS.descripcion : 'N/A';
  }

  /**
   * Maneja el evento de clic en un checkbox para una fila de la tabla.
   *
   * @param row - La fila de datos seleccionada o `null` si se deselecciona.
   *
   * - Si se proporciona una fila (`row` no es `null`), se agrega a la lista de filas seleccionadas
   *   (`selectedRows`) si aún no está presente.
   * - Si `row` es `null`, se elimina de la lista de filas seleccionadas.
   */
  onCheckboxClicked(row: DatosDeLaTabla | null): void {
    if (row) {
      if (!this.selectedRows.some((selectedRow) => selectedRow.id === row.id)) {
        this.selectedRows.push(row);
      }
    } else {
      this.selectedRows = this.selectedRows.filter(
        (selectedRow) => selectedRow !== row
      );
    }
  }

  /**
  * modificar la fila seleccionada en otro componente 
  */
  modificarFilaSeleccionada(): void {
    const SELECTED_ROW = this.selectedRows[0];
    const CURRENT_URL = this.router.url;
    if (this.selectedRows.length !== 1) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Por favor, seleccione exactamente una fila para modificar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
      return;
    }
    if (SELECTED_ROW) {
      this.consultaAvisoAcreditacionService.setUpdatedRow([SELECTED_ROW]);
      this.tramite32101Store.setAbc(SELECTED_ROW);
      setTimeout(() => {
        if (CURRENT_URL.includes('agace')) {
          this.router.navigate(
        ['/agace/consulta-aviso-acreditacion/actualizacion',
  SELECTED_ROW.id]);
        }
        if (CURRENT_URL.includes('pago')) {
          this.router.navigate(
        ['/pago/consulta-aviso-acreditacion/actualizacion',
  SELECTED_ROW.id]);
        }
      }, 100);
    }
  }

  /**
  * Eliminar filas seleccionadas 
  */
  eliminarFilasSeleccionadas(): void {
    if (this.selectedRows.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: 'Error',
        mensaje: 'No se seleccionaron filas para eliminar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'De acuerdo',
        txtBtnCancelar: '',
      };
      return;
    }
    this.configuracionTablaDatos = this.configuracionTablaDatos.filter(
      (row) => !this.selectedRows.includes(row)
    );
    this.tramite32101Store.setDatosDelContenedor(this.configuracionTablaDatos);
    this.selectedRows = [];
    this.abrirEleminarModal();
  }


  /**
  * Validador personalizado para verificar si la fecha es menor o igual a la fecha actual 
  */
  static validateFechaMenorIgualHoy(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    let SELECTED_DATE: Date;
    if (typeof control.value === 'string' && control.value.includes('/')) {
      const PARTS = control.value.split('/');
      if (PARTS.length === 3) {
        const DAY = parseInt(PARTS[0], 10);
        const MONTH = parseInt(PARTS[1], 10);
        const YEAR = parseInt(PARTS[2], 10);
        SELECTED_DATE = new Date(YEAR, MONTH - 1, DAY);
      } else {
        SELECTED_DATE = new Date(control.value);
      }
    } else {
      SELECTED_DATE = new Date(control.value);
    }
    
    // Verificar si la fecha es válida
    if (isNaN(SELECTED_DATE.getTime())) {
      return { fechaInvalida: true }; // Retorna error para fechas inválidas
    }
    
    const CURRENT_DATE = new Date();
    
    // Restablecer la hora para comparar solo las fechas
    SELECTED_DATE.setHours(0, 0, 0, 0);
    CURRENT_DATE.setHours(0, 0, 0, 0);
    
    if (SELECTED_DATE > CURRENT_DATE) {
      return { fechaInvalida: true }; // Retorna un objeto de error para fechas futuras
    }
    
    return null; // Retorna null si la fecha es válida (hoy o pasada)
  }

  /**
   * Cambia la fecha de ingreso en el formulario.
   *
   * @param nuevo_valor - El nuevo valor de la fecha en formato de cadena.
   *
   * Este método actualiza el campo 'fechaInicialInput' del formulario con el nuevo valor proporcionado
   * y marca el campo como no modificado (untouched).
   */
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.registroForm.get('fechaInicialInput')?.setValue(nuevo_valor);
    this.registroForm.get('fechaInicialInput')?.markAsUntouched();
    this.tramite32101Store.setFechaInicialInput(nuevo_valor);
  }

  /**
   * Restablece los campos del formulario relacionados con la operación bancaria.
   *
   * Este método reinicia los valores de los siguientes controles del formulario:
   * - `numeroDeOperacion`: Número de operación bancaria.
   * - `banco`: Banco asociado a la operación.
   * - `llaveDePago`: Llave de pago utilizada.
   * - `fechaInicialInput`: Fecha inicial de la operación.
   *
   * Utiliza el método `reset()` para limpiar los valores de cada control y
   * elimina cualquier error de validación asociado.
   */
  borrar(): void {
    this.registroForm.get('numeroDeOperacion')?.reset();
    this.registroForm.get('banco')?.reset();
    this.registroForm.get('llaveDePago')?.reset();
    const FECHA_CONTROL = this.registroForm.get('fechaInicialInput');
    FECHA_CONTROL?.setValue('');
    FECHA_CONTROL?.setErrors(null);
    FECHA_CONTROL?.markAsUntouched();
    FECHA_CONTROL?.markAsPristine();
    this.tramite32101Store.setFechaInicialInput('');
  }

  /**
   * Actualiza una fila específica en la tabla con los datos proporcionados.
   *
   * @param updatedRow - Objeto que contiene los datos actualizados de la fila.
   *                      Debe incluir un identificador único (`id`) para localizar
   *                      la fila correspondiente en la tabla.
   *
   * @remarks
   * Si no se encuentra una fila con el mismo `id` que el de `updatedRow`,
   * no se realiza ninguna actualización.
   */
  updateTableRow(updatedRow: DatosDeLaTabla): void {
    const INDEX = this.configuracionTablaDatos.findIndex(
      (row) => row.id === updatedRow.id
    );
    if (INDEX !== -1) {
      this.configuracionTablaDatos[INDEX] = updatedRow;
      this.configuracionTablaDatos = [...this.configuracionTablaDatos];
    }
  }

  /**
  * Abre el modal y configura la notificación para confirmar que se agregaron datos a la tabla. 
  */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'success',
      modo: 'action',
      titulo: '',
      mensaje: 'Datos agregados a la tabla correctamente',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }

  /**
  * Abre el modal y configura la notificación para eliminar un pedimento. 
  */
  abrirEleminarModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Seguro que desea eliminar el pedimento?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.elementoParaEliminar = i;
  }

  /**
  * Elimina un pedimento si se confirma la acción. 
  */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
}
