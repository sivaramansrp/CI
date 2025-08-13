import { ExencionImpuestosService } from '../services/exencion-impuestos.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaioQuery, InputRadioComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { MercanciaTableService } from '../services/mercancia-table.service';

import { DatosDelMercancia } from '../constants/exencion-impuestos.enum';

import { Modal } from 'bootstrap';
import {
  AlertComponent,
  CatalogoSelectComponent,
  InputCheckComponent, REGEX_POSTAL,
  REGEX_TELEFONO_DIGITOS,
  TableBodyData, TableComponent,
  TituloComponent,
  ValidacionesFormularioService,
  TablaDinamicaComponent,
  ConfiguracionColumna
} from '@libs/shared/data-access-user/src';

import {
  Catalogo,
  Solicitud103State,
  Tramite103Store
} from '../estados/tramite103.store';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, map, merge, distinctUntilChanged } from 'rxjs';
import { Tramite103Query } from '../estados/tramite103.query';

/**
 * Maneja formularios, catálogos, tablas de mercancías y modales relacionados con el trámite.
 */
@Component({
  selector: 'app-exencion-impuestos',
  standalone: true,
  imports: [
    AlertComponent,
    CatalogoSelectComponent,
    CommonModule,
    FormsModule,
    InputCheckComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TableComponent,
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './exencion-impuestos.component.html',
  styleUrls: ['./exencion-impuestos.component.scss']
})
export class ExencionImpuestosComponent implements OnInit, OnDestroy {
  /**
   * Helper to get description from catalog by id or description value.
   */
  obtenerDescripcion(catalog: Catalogo[] | undefined, value: any): string {
    if (!catalog) return value;
    let found = catalog.find(item => item.id === value || item.id === Number(value) || item.descripcion === value);
    return found ? found.descripcion : value;
  }

  /**
   * Índice de la fila pendiente de eliminación (para el modal de confirmación).
   *
   * @type {number | null}
   */
  filaPendienteEliminar: number | null = null;

  /**
   * Prepara la fila para su eliminación almacenando su índice antes de mostrar el modal de confirmación.
   *
   * @param {number | null} index Índice de la fila a eliminar.
   * @returns {void}
   */
  prepararEliminarFila(index: number | null): void {
    this.filaPendienteEliminar = index;
  }

  /**
   * Elimina la fila después de la confirmación desde el modal.
   *
   * @returns {void}
   */
  eliminarMercancias(): void {
    if (this.filaPendienteEliminar !== null && this.filaPendienteEliminar >= 0 && this.filaPendienteEliminar < this.mercanciaBodyData.length) {
      this.eliminarFila(this.filaPendienteEliminar);
    }
    this.filaPendienteEliminar = null;
  }
  /**
   * Agrega la mercancía a la tabla después de aceptar en el modal de confirmación.
   *
   * @returns {void}
   */
  agregarMercanciasAceptar(): void {
    this.agregarMercancias();
  }
  /**
   * Muestra el modal de confirmación de agregado y agrega la mercancía después de aceptar.
   *
   * @returns {void}
   */
  agregarMercanciasConfirm(): void {
    this.envioIntentado = true;
    const datos = this.agregarMercanciasForm.get('datosMercancia');
    if (!datos) return;
    const vehiculoSeleccionado = datos.get('vehiculo')?.value;
    // Campos principales requeridos
    const camposPrincipales = [
      'tipoDeMercancia',
      'usoEspecifico',
      'cantidad',
      'condicionMercancia',
      'unidadMedida'
    ];
    let camposValidos = camposPrincipales.every(campo => {
      const ctrl = datos.get(campo);
      return ctrl && ctrl.value !== null && ctrl.value !== '';
    });
    // Si el checkbox de vehículo está seleccionado, agregar directamente y cerrar el modal
    if (vehiculoSeleccionado && this.agregarMercanciasForm.valid) {
      this.agregarMercancias();
      // Cerrar el modal de agregar mercancías
      if (this.modalElement && this.modalElement.nativeElement) {
        const win = window as any;
        if (win.bootstrap) {
          const modalAgregarMercancias = win.bootstrap.Modal.getInstance(this.modalElement.nativeElement) || new win.bootstrap.Modal(this.modalElement.nativeElement);
          modalAgregarMercancias.hide();
        } else {
          this.modalElement.nativeElement.style.display = 'none';
        }
      }
      return;
    }
    // Si NO es vehículo y los campos principales son válidos, mostrar el modal de confirmación
    if (!vehiculoSeleccionado && camposValidos) {
      // Mostrar el modal de confirmación sin cerrar el modal principal
      const win = window as any;
      const modalAgregar = document.getElementById('confirmarModalAgregar');
      if (modalAgregar && win.bootstrap) {
        const modalInstance = new win.bootstrap.Modal(modalAgregar);
        modalInstance.show();
      }
      return;
    }
    // Si no cumple, marcar como tocado para mostrar errores
    this.agregarMercanciasForm.markAllAsTouched();
  }
  /**
   * Index of the selected row in the table, or null if none selected.
   */
  filaSeleccionada: number | null = null;

  /**
   * Index of the row being edited, or null if adding new.
   */
  filaEditando: number | null = null;

  /**
   * Selecciona una fila de la tabla y actualiza el índice de la fila seleccionada.
   *
   * @param {any} row Fila de mercancía seleccionada.
   * @returns {void}
   */
  seleccionarFila(row: any): void {
    const idx = this.mercanciaBodyData.indexOf(row);
    this.filaSeleccionada = idx;
  }

  /**
   * Permite editar una fila de la tabla de mercancías.
   * Busca la fila por su índice, valida que sea correcto, y carga los datos en el formulario de mercancías para su edición.
   * Si el índice es inválido, no realiza ninguna acción.
   *
   * @param {number | null} index Índice de la fila a editar en la tabla de mercancías.
   * @returns {void}
   */
  editarFila(index: number | null): void {
    if (index === null || index === undefined || index < 0 || index >= this.mercanciaBodyData.length) {
      return;
    }
    this.filaEditando = index;
    const row = this.mercanciaBodyData[index];
    this.agregarMercanciasForm.patchValue({
      datosMercancia: {
        tipoDeMercancia: row.tbodyData[0] ?? '',
        cantidad: row.tbodyData[1] ?? '',
        unidadMedida: row.tbodyData[2] ?? '',
        ano: row.tbodyData[3] ?? '',
        modelo: row.tbodyData[4] ?? '',
        marca: row.tbodyData[5] ?? '',
        serie: row.tbodyData[6] ?? '',
        usoEspecifico: row.tbodyData[7] ?? '', // Uso específico after Numero de serie
        condicionMercancia: row.tbodyData[8] ?? '',
        vehiculo: row.tbodyData[9] === 'Sí',
      }
    });
    this.abrirDialogoMercancias();
  }

  /**
   * Elimina una fila de la tabla de mercancías según el índice proporcionado.
   * Si el índice es válido, elimina la fila tanto del arreglo de datos como de la tabla visual,
   * y limpia la selección si la fila eliminada estaba seleccionada.
   *
   * @param {number | null} index Índice de la fila a eliminar en la tabla de mercancías.
   * @returns {void}
   */
  eliminarFila(index: number | null): void {
    if (index === null || index === undefined) return;
    this.mercanciaBodyData.splice(index, 1);
    this.getMercanciaTableData.mercanciaTable.tableBody.splice(index, 1);
    this.mercanciaBodyData = [...this.mercanciaBodyData];
    // Limpiar la selección si la fila eliminada estaba seleccionada
    if (this.filaSeleccionada === index) {
      this.filaSeleccionada = null;
    }
  }

  /**
   * Controla si el radio button debe estar deshabilitado.
   */
  public opcionDeshabilitado = true;

  /**
   * Limpia el formulario de agregar mercancías en el modal.
   */
  /**
   * Limpia y reinicia el formulario de agregar mercancías en el modal.
   * Restablece los valores, el estado de los controles y la bandera de intento de envío.
   *
   * @returns {void}
   */
  limpiarAgregarMercanciasForm(): void {
    this.agregarMercanciasForm.reset();
    this.agregarMercanciasForm.markAsUntouched();
    this.agregarMercanciasForm.markAsPristine();
    this.envioIntentado = false;
  }

  /**
   * Cancela y limpia el formulario de agregar mercancías al cerrar el modal.
   */
  /**
   * Cancela la operación de agregar mercancía, limpia el formulario y cierra el modal correspondiente.
   *
   * @returns {void}
   */
  cancelarAgregarMercanciasForm(): void {
    this.limpiarAgregarMercanciasForm();
    this.cerrarModal();
  }
  /**
   * Bandera para indicar si se intentó enviar el formulario y mostrar errores de validación
   */
  public envioIntentado = false;
  /**
   * Formulario principal para el trámite de exención de impuestos.
   */
  tramiteForm!: FormGroup;

  /**
   * Formulario para agregar mercancías al trámite.
   */
  agregarMercanciasForm!: FormGroup;

  /**
   * Sujeto para manejar la finalización de observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud del trámite.
   */
  public solicitudState!: Solicitud103State;

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciaHeaderData: ConfiguracionColumna<TableBodyData>[] = [];
  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Datos del cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: MercanciaRow[] = [];

  /**
   * Catálogos de fechas seleccionadas.
   */
  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Lista de condiciones disponibles para la mercancía.
   */
  condicionMercancia!: Catalogo[];

  /**
   * Lista de unidades de medida disponibles.
   */
  unidadMedida!: Catalogo[];

  /**
   * Lista de años disponibles.
   */
  ano!: Catalogo[];

  /**
   * Lista de países disponibles.
   */
  pais!: Catalogo[];

  /**
   * Lista de aduanas disponibles.
   */
  aduana: Catalogo[] = [];

  /**
   * Lista de destinos disponibles para la mercancía.
   */
  destinoMercancia!: Catalogo[];

  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación de vehículo.
   */
  @ViewChild('confirmarModalVehiculo') confirmarModalVehiculoElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal de confirmación.
   */
  @ViewChild('closeConfirmarModal') closeConfirmarModal!: ElementRef;

  /**
   * Datos de las mercancías registradas.
   */
  public datosDelMercancia: DatosDelMercancia[] = [];

  /**
   * Valor seleccionado en el grupo de opciones de radio.
   */
  valorSeleccionado!: string;

  /**
   * Opciones disponibles para el grupo de radio.
   */
  radioOpcions: RadioOpcion[] = [];

  /**
   * Estado actual de la consulta relacionada con el trámite.
   */
  consultaDatos: ConsultaDatos = { readonly: false };

  /**
   * Datos de la tabla de mercancías obtenidos desde un archivo JSON.
   */
  public getMercanciaTableData: MercanciaTableData = { mercanciaTable: { tableHeader: [], tableBody: [] } };

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;

  /**
   * Flag para evitar bucles infinitos en el método aduanaSeleccion
   */
  private isProcessingAduanaSelection = false;

  /**
   * Flag para evitar bucles infinitos en el método destinoMercanciaSeleccion
   */
  private isProcessingDestinoSelection = false;

  /**
   * Constructor del componente ExencionImpuestosComponent.
   * Inicializa los servicios y dependencias necesarias para el manejo de formularios, catálogos y tablas de mercancías.
   *
   * @param {ExencionImpuestosService} exencionImpuestoService Servicio para operaciones de exención de impuestos.
   * @param {Tramite103Store} store Almacén para el estado del trámite 103.
   * @param {Tramite103Query} query Consulta para obtener el estado del trámite 103.
   * @param {FormBuilder} fb Constructor para formularios reactivos de Angular.
   * @param {ValidacionesFormularioService} validacionesService Servicio para validaciones personalizadas de formularios.
   * @param {ConsultaioQuery} consultaioQuery Consulta para el estado de la consulta relacionada.
   * @param {ChangeDetectorRef} cdr Referencia para la detección de cambios en el componente.
   * @param {MercanciaTableService} mercanciaTableService Servicio para la gestión de la tabla de mercancías.
   */
  constructor(
    private exencionImpuestoService: ExencionImpuestosService,
    private store: Tramite103Store,
    private query: Tramite103Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef,
    private mercanciaTableService: MercanciaTableService
  ) {
    // Aquí se implementará la lógica del constructor.
  }

  /**
   * Método de inicialización del componente.
   * Configura observables, inicializa catálogos y formularios.
   */
  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa catálogos, formularios, suscripciones y datos de la tabla de mercancías.
   * Configura el modo de solo lectura y prepara la interfaz para la captura de datos.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.exencionImpuestoService.getOpcionesAduana().subscribe(options => {
      this.aduana = options.map(opt => ({ id: Number(opt.value ?? opt.id), descripcion: opt.label ?? opt.descripcion }));
    });

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: ConsultaDatos) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.inicializaCatalogos();
    this.obtenerEstadoSolicitud();
    this.donanteDomicilio();
    // Configura los encabezados de la tabla para que siempre se muestren las columnas, aunque no haya datos
    this.mercanciaTableService.getTable().subscribe((data: MercanciaTableData) => {
      this.getMercanciaTableData = data;
      this.obtenerMercancia();
    });
    // Asegura que el radio esté deshabilitado por defecto (controlado en donanteDomicilio)
  }

  /**
   * Obtiene el estado actual de la solicitud desde el almacén.
   * @private
   */
  private obtenerEstadoSolicitud(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: Solicitud103State) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   * @private
   */
  /**
   * Inicializa los catálogos necesarios para el formulario, obteniendo datos de los servicios correspondientes.
   * Carga los catálogos de destino de mercancía, condición, unidad de medida, año y país.
   *
   * @private
   * @returns {void}
   */
  private inicializaCatalogos(): void {
    // Aduana se carga en ngOnInit desde ImportadorExportadorService.getOpcionesAduana()
    const DESTINO_MERCANCIA$ = this.exencionImpuestoService.getDestinoMercancia().pipe(
      map((resp: any) => {
        this.destinoMercancia = resp.data;
      })
    );
    const CONDICION_MERCANCIA$ = this.exencionImpuestoService.getCondicionMercancia().pipe(
      map((resp: any) => {
        this.condicionMercancia = resp.data;
      })
    );
    const UNIDAD_MEDIDA$ = this.exencionImpuestoService.getUnidadMedida().pipe(
      map((resp: any) => {
        this.unidadMedida = resp.data;
      })
    );
    const ANO$ = this.exencionImpuestoService.getAno().pipe(
      map((resp: any) => {
        this.ano = resp.data;
      })
    );
    const PAIS$ = this.exencionImpuestoService.getPais().pipe(
      map((resp: any) => {
        this.pais = resp.data;
      })
    );

    merge(DESTINO_MERCANCIA$, CONDICION_MERCANCIA$, UNIDAD_MEDIDA$, ANO$, PAIS$)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Inicializa los formularios principales con valores y validaciones.
   * @private
   */
  private donanteDomicilio(): void {
    this.tramiteForm = this.fb.group({
      exencionImpuestos: this.fb.group({
        manifesto: [this.solicitudState?.manifesto, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [this.solicitudState?.organismoPublico, [Validators.required]],
        destinoMercancia: [this.solicitudState?.destinoMercancia, [Validators.required]],
        personaMoral: [this.solicitudState?.personaMoral]
      }),
      importadorExportador: this.fb.group({
        nombre: [this.solicitudState?.nombre, [Validators.required, Validators.maxLength(50)]],
        calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(80)]],
        numeroExterior: [this.solicitudState?.numeroExterior, [Validators.required, Validators.maxLength(40)]],
        numeroInterior: [this.solicitudState?.numeroInterior, [Validators.maxLength(30)]],
        telefono: [this.solicitudState?.telefono, [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email, Validators.maxLength(50)]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.pattern(REGEX_POSTAL)]],
        estado: [this.solicitudState?.estado, [Validators.required, Validators.maxLength(50)]],
        colonia: [this.solicitudState?.colonia, [Validators.required, Validators.maxLength(50)]],
        personaMoral: [this.solicitudState?.personaMoral],
        opcion: [{ value: this.solicitudState?.opcion }, [Validators.required]]
      })
    });

    /**
     * Formulario reactivo para agregar mercancías al trámite.
     * Contiene el grupo de controles 'datosMercancia' con los siguientes campos:
     * - tipoDeMercancia: Tipo de mercancía (requerido)
     * - usoEspecifico: Uso específico de la mercancía (requerido)
     * - condicionMercancia: Condición de la mercancía (requerido)
     * - unidadMedida: Unidad de medida de la mercancía (requerido)
     * - vehiculo: Indica si la mercancía es un vehículo (requerido)
     * - ano: Año del vehículo (opcional, requerido si es vehículo)
     * - cantidad: Cantidad de mercancía (requerido)
     * - marca: Marca del vehículo (opcional, requerido si es vehículo)
     * - modelo: Modelo del vehículo (opcional, requerido si es vehículo)
     * - serie: Serie del vehículo (opcional, requerido si es vehículo)
     */
    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        tipoDeMercancia: [this.solicitudState?.tipoDeMercancia, [Validators.required]],
        usoEspecifico: [this.solicitudState?.usoEspecifico, [Validators.required]],
        condicionMercancia: [this.solicitudState?.condicionMercancia, [Validators.required]],
        unidadMedida: [this.solicitudState?.unidadMedida, [Validators.required]],
        vehiculo: [this.solicitudState?.vehiculo ?? false],
        ano: [this.solicitudState?.ano ?? ''],
        cantidad: [this.solicitudState?.cantidad, [Validators.required]],
        marca: [this.solicitudState?.marca],
        modelo: [this.solicitudState?.modelo],
        serie: [this.solicitudState?.serie]
      })
    });
    /**
     * Inicializa el estado de los formularios (habilitado o deshabilitado) según el modo de solo lectura.
     * Si el trámite está en modo solo lectura, deshabilita los formularios para evitar modificaciones.
     */
    this.inicializarEstadoFormulario();

    // Asegura que el radio esté deshabilitado por defecto (controlado por aduanaSeleccion)
    this.opcionDeshabilitado = true;

    // Suscribirse a los cambios de aduana para habilitar/deshabilitar los botones de radio
    this.tramiteForm?.get('exencionImpuestos.aduana')?.valueChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (!this.isProcessingAduanaSelection) {
          this.aduanaSeleccion();
        }
      });

    // Asegura el estado correcto de habilitación/deshabilitación del radio después de la inicialización del formulario
    this.aduanaSeleccion();
  }

  /**
   * Obtiene el grupo de formulario para exención de impuestos.
   * @returns {FormGroup} Grupo de formulario.
   */
  get exencionImpuestos(): FormGroup {
    return this.tramiteForm.get('exencionImpuestos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para importador/exportador.
   * @returns {FormGroup} Grupo de formulario.
   */
  get importadorExportador(): FormGroup {
    return this.tramiteForm.get('importadorExportador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para datos de mercancía.
   * @returns {FormGroup} Grupo de formulario.
   */
  get datosMercancia(): FormGroup {
    return this.agregarMercanciasForm.get('datosMercancia') as FormGroup;
  }

  /**
   * Maneja la selección de aduana y actualiza el almacén.
   */
  /**
   * Maneja la selección de aduana en el formulario y actualiza el almacén y el estado de los controles relacionados.
   * Habilita o deshabilita el grupo de opciones de radio según la aduana seleccionada.
   *
   * @returns {void}
   */
  aduanaSeleccion(): void {
    if (this.isProcessingAduanaSelection) {
      return;
    }
    
    this.isProcessingAduanaSelection = true;
    
    try {
      const ADUANA = this.tramiteForm.get('exencionImpuestos.aduana')?.value;
      this.store.setAduana(ADUANA);
      // ADUANA puede ser id (número) o descripción (cadena), así que buscar por id si es posible
      let aduanaObj: Catalogo | undefined = undefined;
      // Intentar coincidir por id (número) primero
      if (!isNaN(Number(ADUANA))) {
        aduanaObj = this.aduana.find(a => a.id === Number(ADUANA));
      }
      // Alternativa: intentar coincidir por descripción (cadena)
      if (!aduanaObj && typeof ADUANA === 'string') {
        aduanaObj = this.aduana.find(a => a.descripcion === ADUANA);
      }
      // Registro de depuración
      const opcionControl = this.tramiteForm.get('importadorExportador.opcion');
      if (aduanaObj && aduanaObj.descripcion && aduanaObj.descripcion.toLowerCase().includes('salud')) {
        this.opcionDeshabilitado = false;
        opcionControl?.enable({ emitEvent: false });
        // Simplemente establezca el valor actual sin la manipulación del tiempo.
        if (opcionControl?.value) {
          opcionControl.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        this.opcionDeshabilitado = true;
        this.valorSeleccionado = '';
        opcionControl?.setValue('', { emitEvent: false });
        opcionControl?.disable({ emitEvent: false });
      }
    } finally {
      // Restablecer siempre la bandera
      this.isProcessingAduanaSelection = false;
    }
  }

  /**
   * Maneja la selección de destino de mercancía y actualiza el almacén.
   */
  /**
   * Maneja la selección de destino de mercancía en el formulario y actualiza el almacén y el estado de los controles relacionados.
   * Habilita o deshabilita el grupo de opciones de radio según el destino seleccionado.
   *
   * @returns {void}
   */
  destinoMercanciaSeleccion(): void {
    // Evite bucles infinitos con protección de reentrada
    if (this.isProcessingDestinoSelection) {
      return;
    }
    
    this.isProcessingDestinoSelection = true;
    
    try {
      const DESTINO_MERCANCIA = this.tramiteForm.get('exencionImpuestos.destinoMercancia')?.value;
      this.store.setDestinoMercancia(DESTINO_MERCANCIA);
      // Buscar el objeto destinoMercancia seleccionado
      const destinoObj = this.destinoMercancia.find(d => d.id === DESTINO_MERCANCIA);
      const opcionControl = this.tramiteForm.get('importadorExportador.opcion');
      if (destinoObj && destinoObj.descripcion && destinoObj.descripcion.toLowerCase().includes('salud')) {
        this.opcionDeshabilitado = false;
        opcionControl?.enable({ emitEvent: false });
        // Simplemente establezca el valor actual sin la manipulación del tiempo.
        if (opcionControl?.value) {
          opcionControl.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        this.opcionDeshabilitado = true;
        this.valorSeleccionado = '';
        opcionControl?.setValue('', { emitEvent: false });
        opcionControl?.disable({ emitEvent: false });
      }
    } finally {
      // Restablecer siempre la bandera
      this.isProcessingDestinoSelection = false;
    }
  }

  /**
   * Maneja la selección de condición de mercancía y actualiza el almacén.
   */
  condicionMercanciaSeleccion(): void {
    const CONDICION_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia.condicionMercancia')?.value;
    this.store.setCondicionMercancia(CONDICION_MERCANCIA);
  }

  /**
   * Maneja la selección de unidad de medida y actualiza el almacén.
   */
  unidadMedidaSeleccion(): void {
    const UNIDAD_MEDIDA = this.agregarMercanciasForm.get('datosMercancia.unidadMedida')?.value;
    this.store.setUnidadMedida(UNIDAD_MEDIDA);
  }

  /**
   * Maneja la selección de año y actualiza el almacén.
   */
  anoSeleccion(): void {
    const ANO = this.agregarMercanciasForm.get('datosMercancia.ano')?.value;
    this.store.setAno(ANO);
  }

  /**
   * Maneja la selección de país y actualiza el almacén.
   */
  paisSeleccion(): void {
    const PAIS = this.tramiteForm.get('importadorExportador.pais')?.value;
    this.store.setPais(PAIS);
  }

  /**
   * Maneja la selección de organismo público y actualiza el almacén.
   */
  organismoPublico(): void {
    const ORGANISMOPUBLICO = this.tramiteForm.get('exencionImpuestos.organismoPublico')?.value;
    this.store.setOrganismoPublico(ORGANISMOPUBLICO);
  }
  /**
   * Maneja la selección de persona moral.
   * (Método deshabilitado porque setPersonaMoral no existe en Tramite103Store)
   */
  personaMoral(): void {
    const PERSONAMORAL = this.tramiteForm.get('exencionImpuestos.personaMoral')?.value;
    this.store.setPersonaMoral(PERSONAMORAL);
  }
  /**
   * Maneja la selección de vehículo y actualiza el almacén.
   */
  /**
   * Maneja la selección del checkbox de vehículo en el formulario de mercancías.
   * Si el checkbox está seleccionado, abre el modal de confirmación de forma segura.
   * Si no está seleccionado, elimina los validadores de esos campos.
   * Finalmente, actualiza la validez de los controles.
   *
   * @returns {void}
   */
  vehiculo(): void {
    const vehiculoCtrl = this.agregarMercanciasForm.get('datosMercancia.vehiculo');
    const marcaCtrl = this.agregarMercanciasForm.get('datosMercancia.marca');
    const anoCtrl = this.agregarMercanciasForm.get('datosMercancia.ano');
    const serieCtrl = this.agregarMercanciasForm.get('datosMercancia.serie');
    const modeloCtrl = this.agregarMercanciasForm.get('datosMercancia.modelo');
    const VEHICULO = vehiculoCtrl?.value;
    
    // Actualizar tienda
    this.store.setVehiculo(VEHICULO);
    
    if (VEHICULO) {
      this.abrirModalVehiculoSeguro();
    } else {
      // Borrar validadores cuando no están marcados
      marcaCtrl?.clearValidators();
      modeloCtrl?.clearValidators();
      serieCtrl?.clearValidators();
      anoCtrl?.clearValidators();
      
      marcaCtrl?.updateValueAndValidity({ emitEvent: false });
      modeloCtrl?.updateValueAndValidity({ emitEvent: false });
      serieCtrl?.updateValueAndValidity({ emitEvent: false });
      anoCtrl?.updateValueAndValidity({ emitEvent: false });
    }
  }

  /**
   * Abre el modal de confirmación de vehículo de manera segura.
   * Utiliza un enfoque que evita conflictos con Bootstrap y problemas de colgado.
   *
   * @returns {void}
   */
  abrirModalVehiculoSeguro(): void {
    setTimeout(() => {
      const modalVehiculo = document.getElementById('confirmarModalVehiculo');
      if (modalVehiculo) {
        try {
          const win = window as any;
          if (win.bootstrap && win.bootstrap.Modal) {
            const modalInstance = new win.bootstrap.Modal(modalVehiculo, {
              backdrop: 'static',
              keyboard: false,
              focus: false 
            });
            modalInstance.show();
          } else {
            modalVehiculo.style.display = 'block';
            modalVehiculo.style.zIndex = '1070';
            modalVehiculo.classList.add('show');
            modalVehiculo.setAttribute('aria-hidden', 'false');
            
            // Agregar fondo manualmente
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            backdrop.style.zIndex = '1069';
            document.body.appendChild(backdrop);
          }
        } catch (error) {
          // Retroceder para confirmar el diálogo si falla el modal
          const confirmacion = confirm('¿Confirma que la mercancía es un vehículo?');
          if (confirmacion) {
            this.confirmarVehiculo();
          } else {
            this.cancelarVehiculo();
          }
        }
      }
    }, 50);
  }

  /**
   * Confirma la selección de vehículo y establece los validadores requeridos.
   *
   * @returns {void}
   */
  confirmarVehiculo(): void {
    const marcaCtrl = this.agregarMercanciasForm.get('datosMercancia.marca');
    const anoCtrl = this.agregarMercanciasForm.get('datosMercancia.ano');
    const serieCtrl = this.agregarMercanciasForm.get('datosMercancia.serie');
    const modeloCtrl = this.agregarMercanciasForm.get('datosMercancia.modelo');
    
    // Establecer validadores para campos de vehículos
    marcaCtrl?.setValidators([Validators.required]);
    modeloCtrl?.setValidators([Validators.required]);
    serieCtrl?.setValidators([Validators.required]);
    anoCtrl?.setValidators([Validators.required]);
    
    // Actualizar validez sin emitir eventos
    marcaCtrl?.updateValueAndValidity({ emitEvent: false });
    modeloCtrl?.updateValueAndValidity({ emitEvent: false });
    serieCtrl?.updateValueAndValidity({ emitEvent: false });
    anoCtrl?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Cancela la selección de vehículo y desmarca el checkbox.
   *
   * @returns {void}
   */
  cancelarVehiculo(): void {
    const vehiculoCtrl = this.agregarMercanciasForm.get('datosMercancia.vehiculo');
    const marcaCtrl = this.agregarMercanciasForm.get('datosMercancia.marca');
    const anoCtrl = this.agregarMercanciasForm.get('datosMercancia.ano');
    const serieCtrl = this.agregarMercanciasForm.get('datosMercancia.serie');
    const modeloCtrl = this.agregarMercanciasForm.get('datosMercancia.modelo');
    
    // Desmarque la casilla de verificación del vehículo y borre los validadores.
    vehiculoCtrl?.setValue(false, { emitEvent: false });
    marcaCtrl?.clearValidators();
    modeloCtrl?.clearValidators();
    serieCtrl?.clearValidators();
    anoCtrl?.clearValidators();

    // Actualizar validez sin emitir eventos
    marcaCtrl?.updateValueAndValidity({ emitEvent: false });
    modeloCtrl?.updateValueAndValidity({ emitEvent: false });
    serieCtrl?.updateValueAndValidity({ emitEvent: false });
    anoCtrl?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Valida el formulario de destinatario marcando todos los controles como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Establece un valor en el almacén a partir de un campo de formulario.
   * @param {FormGroup} form Grupo de formulario.
   * @param {string} campo Nombre del campo.
   * @param {keyof Tramite103Store} metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite103Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal actualmente abierto.
   */
  cerrarModal(): void {
    if (this.modalElement) {
      const modalInstance = Modal.getInstance(this.modalElement.nativeElement) || new Modal(this.modalElement.nativeElement);
      modalInstance.hide();
    }
    // Alternativa: también hacer clic en el botón de cerrar si está presente
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
    // Limpie los fondos modales inmediatamente para evitar que se cuelguen.
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(bd => bd.parentNode?.removeChild(bd));
    document.body.classList.remove('modal-open');
  }

  /**
   * Agrega mercancías al trámite si el formulario es válido.
   * Actualiza la tabla y cierra el modal.
   */
  agregarMercancias(): void {
    const datos = this.agregarMercanciasForm.get('datosMercancia');
    if (!datos) return;
    const vehiculoSeleccionado = datos.get('vehiculo')?.value;
    // Campos principales requeridos
    const camposPrincipales = [
      'tipoDeMercancia',
      'usoEspecifico',
      'cantidad',
      'condicionMercancia',
      'unidadMedida'
    ];
    let camposValidos = camposPrincipales.every(campo => {
      const ctrl = datos.get(campo);
      return ctrl && ctrl.value !== null && ctrl.value !== '';
    });
    // Si no es vehículo, solo los campos principales son obligatorios
    if (!vehiculoSeleccionado && camposValidos) {
      const valores = this.agregarMercanciasForm.value.datosMercancia;
      const vehiculoValue = valores.vehiculo === true ? 'Sí' : 'No';
      const DATOS = {
        tbodyData: [
          valores.tipoDeMercancia ?? '',
          valores.cantidad ?? '',
          valores.unidadMedida ?? '',
          valores.ano ?? '',
          valores.modelo ?? '',
          valores.marca ?? '',
          valores.serie ?? '',
          valores.usoEspecifico ?? '',
          valores.condicionMercancia ?? '',
          vehiculoValue
        ]
      };
      if (this.filaEditando !== null) {
        this.mercanciaBodyData[this.filaEditando] = DATOS;
        if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable && Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
          this.getMercanciaTableData.mercanciaTable.tableBody[this.filaEditando] = DATOS;
        }
        this.filaEditando = null;
      } else {
        this.mercanciaBodyData.push(DATOS);
        if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable) {
          if (!Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
            this.getMercanciaTableData.mercanciaTable.tableBody = [];
          }
          this.getMercanciaTableData.mercanciaTable.tableBody.push(DATOS);
        }
      }
      this.mercanciaBodyData = [...this.mercanciaBodyData];
      this.agregarMercanciasForm.reset();
      this.agregarMercanciasForm.markAsUntouched();
      this.agregarMercanciasForm.markAsPristine();
      this.envioIntentado = false;
      this.cerrarModal();
      return;
    }
    // Sí es vehículo, requiere el formulario completo válido
    if (vehiculoSeleccionado && this.agregarMercanciasForm.valid) {
      const valores = this.agregarMercanciasForm.value.datosMercancia;
      const vehiculoValue = valores.vehiculo === true ? 'Sí' : 'No';
      const DATOS = {
        tbodyData: [
          valores.tipoDeMercancia ?? '',
          valores.cantidad ?? '',
          valores.unidadMedida ?? '',
          valores.ano ?? '',
          valores.modelo ?? '',
          valores.marca ?? '',
          valores.serie ?? '',
          valores.usoEspecifico ?? '',
          valores.condicionMercancia ?? '',
          vehiculoValue
        ]
      };
      if (this.filaEditando !== null) {
        this.mercanciaBodyData[this.filaEditando] = DATOS;
        if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable && Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
          this.getMercanciaTableData.mercanciaTable.tableBody[this.filaEditando] = DATOS;
        }
        this.filaEditando = null;
      } else {
        this.mercanciaBodyData.push(DATOS);
        if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable) {
          if (!Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
            this.getMercanciaTableData.mercanciaTable.tableBody = [];
          }
          this.getMercanciaTableData.mercanciaTable.tableBody.push(DATOS);
        }
      }
      this.mercanciaBodyData = [...this.mercanciaBodyData];
      this.agregarMercanciasForm.reset();
      this.agregarMercanciasForm.markAsUntouched();
      this.agregarMercanciasForm.markAsPristine();
      this.envioIntentado = false;
      this.cerrarModal();
      return;
    }
    // Si no cumple, marcar como tocado para mostrar errores
    this.agregarMercanciasForm.markAllAsTouched();
  }

  /**
   * Abre el modal de confirmación si el formulario de mercancías es válido.
   */
  agregarConfirmarModal(): void {
    this.envioIntentado = true;
    if (this.agregarMercanciasForm.valid === true) {
      if (this.confirmarModalElement) {
        const MODAL_INSTANCE = new Modal(this.confirmarModalElement.nativeElement);
        this.cerrarModal();
        MODAL_INSTANCE.show();
      }
    } else {
      this.agregarMercanciasForm.markAllAsTouched();
    }
  }

  /**
   * Inicializa los datos de la tabla de mercancías.
   */
  public obtenerMercancia(): void {
    // Solo configura los encabezados, pero no carga datos iniciales
    const headers: string[] = this.getMercanciaTableData?.mercanciaTable?.tableHeader || [];
    this.mercanciaHeaderData = headers.map((encabezado, idx) => ({
      encabezado,
      orden: idx,
      clave: (row: TableBodyData) => {
        if (encabezado.toLowerCase().includes('condición')) {
          return this.obtenerDescripcion(this.condicionMercancia, row.tbodyData?.[idx]);
        }
        if (encabezado.toLowerCase().includes('unidad')) {
          return this.obtenerDescripcion(this.unidadMedida, row.tbodyData?.[idx]);
        }
        if (encabezado.toLowerCase().includes('año') || encabezado.toLowerCase().includes('ano')) {
          return this.obtenerDescripcion(this.ano, row.tbodyData?.[idx]);
        }
        return row.tbodyData?.[idx] ?? '';
      }
    }));
    // La tabla inicia vacía
    this.mercanciaBodyData = [];
  }

  /**
   * Cambia el valor seleccionado en el grupo de radio y actualiza el almacén.
   * @param {string | number} value Nuevo valor seleccionado.
   */
  cambiarRadio(value: string | number): void {
    this.valorSeleccionado = value as string;
    this.store.setValorSeleccionado(this.valorSeleccionado);
  }

  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   * @private
   */
  private inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.tramiteForm?.disable();
      this.agregarMercanciasForm?.disable();
    } else {
      this.tramiteForm?.enable();
      this.agregarMercanciasForm?.enable();
    }
  }

  /**
  * Método de limpieza al destruir el componente.
  * Finaliza observables y libera recursos.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

/**
 * Interfaz que representa una fila de la tabla de mercancías.
 * Extiende TableBodyData y agrega el campo opcional usoEspecifico.
 */
interface MercanciaRow extends TableBodyData {
  /**
   * Uso específico de la mercancía (opcional).
   */
  usoEspecifico?: string;
}

/**
 * Interface para representar el estado de la consulta relacionada con el trámite.
 */
interface ConsultaDatos {
  readonly: boolean;
  // Agregar otras propiedades según sea necesario para tu caso de uso
}

/**
 * Interface para las opciones de radio.
 */
interface RadioOpcion {
  label: string;
  value: string | number;
}

/**
 * Interface para la tabla de mercancía.
 */
interface MercanciaTableData {
  mercanciaTable: {
    tableHeader: string[];
    tableBody: TableBodyData[];
  };
}