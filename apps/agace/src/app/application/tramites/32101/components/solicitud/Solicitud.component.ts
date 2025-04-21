import {AbstractControl,FormBuilder,FormGroup,FormsModule,ReactiveFormsModule,ValidationErrors,Validators} from '@angular/forms';
import {Catalogo,CatalogoSelectComponent,CatalogosSelect,ConfiguracionColumna,InputFecha,InputFechaComponent,Notificacion,NotificacionesComponent,Pedimento,TablaDinamicaComponent,TablaSeleccion,TituloComponent,ValidacionesFormularioService,} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { Solicitud32101State, Tramite32101Store } from '../../../../estados/tramites/tramite32101.store';
import { TramiteList, datosDeLaTabla } from '../../models/datos-tramite.model';
import { CommonModule } from '@angular/common';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { FECHA_PAGO } from '../../models/registro.model';
import { Router } from '@angular/router';
import { Solicitud32101Enum } from '../../constants/solicitud32101.enum';
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
    NotificacionesComponent
  ],
  providers: [ConsultaAvisoAcreditacionService],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit,OnDestroy {
  /**
   * Observable para manejar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

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
  configuracionTablaDatos: datosDeLaTabla[] = [];

  /**
   * Enumeración que contiene los textos utilizados en el componente.
   */
  solicitudEnum = Solicitud32101Enum;

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
  selectedRows: datosDeLaTabla[] = [];

  // Notificación utilizada para mostrar mensajes o alertas en la interfaz.
  public nuevaNotificacion!: Notificacion;

    // Notificación utilizada para mostrar mensajes o alertas en la interfaz.
  public nuevaNotificacion2!: Notificacion;

  // Índice del pedimento marcado para eliminación.
  public elementoParaEliminar!: number;

  // Arreglo que contiene los pedimentos registrados.
  public pedimentos: Array<Pedimento> = [];

  /**
   * Configuración de las columnas para la tabla de datos en el componente de Solicitud.
   * 
   * Cada objeto en el arreglo `encabezadoDeTabla` representa una columna de la tabla,
   * definiendo su encabezado, la clave para acceder al dato correspondiente en los objetos
   * de la tabla, y el orden en el que se deben mostrar las columnas.
   * 
   * Propiedades de cada columna:
   * - `encabezado`: El texto que se mostrará como encabezado de la columna.
   * - `clave`: Una función que toma un objeto de tipo `datosDeLaTabla` y devuelve el valor
   *   que se mostrará en la celda correspondiente.
   * - `orden`: Un número que indica la posición de la columna en la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<datosDeLaTabla>[] = [
    {
      encabezado: 'Tipo de inversión',
      clave: (artículo) => artículo.tipoDeInversion,
      orden: 1,
    },
    {
      encabezado: 'Descripción general',
      clave: (artículo) => artículo.descripcionGeneral,
      orden: 2,
    },
    {
      encabezado: 'Valor en pesos',
      clave: (artículo) => artículo.valorEnPesos,
      orden: 3,
    },
    {
      encabezado: 'Forma Adquisicion',
      clave: (artículo) => artículo.formaAdquisicion,
      orden: 4,
    },
    {
      encabezado: 'Comprobante de pago',
      clave: (artículo) => artículo.comprobanteDePago,
      orden: 5,
    },
  ];

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
    private router: Router
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
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.fetchListaDeDocumentos();
    this.fetchListaDeInversion();
    this.fetchBancoList();
    // Listen for updated row data
    this.consultaAvisoAcreditacionService.formData$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((formData) => {
        this.updateTableRow(formData);
      });
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
   * - `listaDeDocumentos`: Lista de documentos.
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
      listaDeDocumentos: [this.solicitudState?.listaDeDocumentos],
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
        [SolicitudComponent.validateFechaMenorIgualHoy.bind(this)], // Add the custom validator
      ],
      importeDePago: [
        { value: this.solicitudState?.importeDePago || '7735', disabled: true },
      ],
    });
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
   * 
   * @example
   * // Ejemplo de uso:
   * this.poblarTabla();
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  poblarTabla(): void {
    const FORM_VALUES = this.registroForm.value;
    const NEW_ROW: datosDeLaTabla = {
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
    this.configuracionTablaDatos.push(NEW_ROW);
    this.tramite32101Store.setDatosDelContenedor(this.configuracionTablaDatos);
    this.abrirModal();
    this.registroForm.reset();
    this.registroForm.markAsUntouched();
    this.registroForm.markAsPristine();
  }

  /**
   * Obtiene la etiqueta de un elemento seleccionado en un catálogo desplegable.
   *
   * @param selectedId - El ID del elemento seleccionado (actualmente no se utiliza en la lógica).
   * @param catalog - Una lista de objetos del catálogo que contiene descripciones.
   * @returns La descripción del elemento seleccionado si se encuentra, de lo contrario, 'N/A'.
   */
  static getDropdownLabel(selectedId: number, catalog: Catalogo[]): string {
    const SELECTED_ITEMS = catalog.find(
      (item) => item.descripcion === item.descripcion
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
  onCheckboxClicked(row: datosDeLaTabla | null): void {
    if (row) {
      // Add the selected row to the selectedRows array if it's not already present
      if (!this.selectedRows.includes(row)) {
        this.selectedRows.push(row);
      }
    } else {
      // Remove the row from the selectedRows array if it is unchecked
      this.selectedRows = this.selectedRows.filter(
        (selectedRow) => selectedRow !== row
      );
    }
  }

  // modify selected row in other component
  modificarFilaSeleccionada(): void {
    if (this.selectedRows.length !== 1) {
      window.alert('Please select exactly one row to modify.');
      return;
    }
    const SELECTED_ROW = this.selectedRows[0];
    this.consultaAvisoAcreditacionService.setUpdatedRow(SELECTED_ROW);

    this.tramite32101Store.setAbc(SELECTED_ROW);
    setTimeout(() => {
      this.router.navigate(['/pago/consulta-aviso-acreditacion/actualizacion']);
    }, 100);
  }

  // Delete selected rows
  eliminarFilasSeleccionadas(): void {
    if (this.selectedRows.length === 0) {
      window.alert('No rows selected for deletion.');
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
   * Actualiza el formulario con los datos ingresados y los envía al servicio correspondiente.
   * 
   * @remarks
   * Este método toma los valores actuales del formulario `registroForm`, 
   * los encapsula en una constante y los pasa al servicio `consultaAvisoAcreditacionService` 
   * para actualizar la fila correspondiente.
   * 
   * @example
   * // Supongamos que el formulario tiene los siguientes valores:
   * // { nombre: 'Juan', edad: 30 }
   * formularioDeActualizacion();
   * // El servicio `consultaAvisoAcreditacionService` procesará estos datos.
   */
  formularioDeActualizacion() {
    const FORM_DATA = this.registroForm.value;
    this.consultaAvisoAcreditacionService.setUpdatedRow(FORM_DATA);
  }

  // Custom validator to check if the date is less than or equal to the current date
  static validateFechaMenorIgualHoy(
    control: AbstractControl
  ): ValidationErrors | null {
    const SELECTED_DATE = new Date(control.value);
    const CURRENT_DATE = new Date();
    if (SELECTED_DATE < CURRENT_DATE) {
      return { fechaInvalida: true }; // Return an error object
    }
    return null; // Return null if the date is valid
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
   * Utiliza el método `reset()` para limpiar los valores de cada control.
   */
  borrar() {
    this.registroForm.get('numeroDeOperacion')?.reset();
    this.registroForm.get('banco')?.reset();
    this.registroForm.get('llaveDePago')?.reset();
    this.registroForm.get('fechaInicialInput')?.reset();
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
  updateTableRow(updatedRow: datosDeLaTabla): void {
    const INDEX = this.configuracionTablaDatos.findIndex(
      (row) => row.id === updatedRow.id
    );
    if (INDEX !== -1) {
      this.configuracionTablaDatos[INDEX] = updatedRow;
    }
  }

  // Abre el modal y configura la notificación para eliminar un pedimento.
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Datos guardados correctamente',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
    this.elementoParaEliminar = i;
  }

    // Abre el modal y configura la notificación para eliminar un pedimento.
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
    }
    this.elementoParaEliminar = i;
  }

    // Elimina un pedimento si se confirma la acción.
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
}
