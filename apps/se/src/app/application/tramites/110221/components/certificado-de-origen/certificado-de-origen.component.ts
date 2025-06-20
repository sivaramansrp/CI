import { AlertComponent, Catalogo, CatalogoSelectComponent, CatalogosSelect, InputFecha, REGEX_PATRON_DECIMAL_2, REGEX_SOLO_DIGITOS, TablaDinamicaComponent, TablaSeleccion, TableBodyData, TableComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, FECHA_FACTURA, FECHA_FINAL, FECHA_INICIAL, HEADERS, HEADERS_DATA, SeleccionadasTabla } from '../../models/registro.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { RegistroService } from '../../services/registro.service';
import { Solicitud110221State } from '../../../../estados/tramites/Tramite110221.store';
import { Tramite110221Query } from '../../../../estados/queries/Tramite110221.query';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110221/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110221/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110221/mercancia.json';

const TERCEROS_TEXTO_DE_ALERTA = 'Para continuar con el trámite, debes agregar por lo menos una mercancía.';

/**
 * Componente que representa el formulario de certificado de origen en el trámite.
 */
@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.css',
})
export class CertificadoDeOrigenComponent implements OnInit, OnDestroy {
  /**
   * Texto de alerta mostrado en el componente.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Formulario reactivo para los datos del certificado.
   */
  registroForm!: FormGroup;

  /**
   * Formulario reactivo para los datos de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * Catálogo de países.
   */
  pais!: CatalogosSelect;

  /**
   * Catálogo de tratados.
   */
  tratado!: CatalogosSelect;

  /**
   * Catálogo de unidades de medida comercial (UMC).
   */
  umc!: CatalogosSelect;

  /**
   * Catálogo de tipos de factura.
   */
  tipoFactura!: CatalogosSelect;

  /**
   * Indica si se debe mostrar el formulario para cargar un archivo.
   */
  cargarArchivo: boolean = false;

  /**
   * Indica si se deben mostrar errores en el formulario.
   */
  mostrarErrores: boolean = false;

  /**
   * Indica si hay mercancías disponibles.
   */
  hayMercanciasDisponibles: boolean = false;

  /**
   * Indica si se está editando una mercancía.
   */
  esMercanciaEnEdicion = false;

  /**
   * Datos de la tabla de mercancías disponibles.
   */
  public getMercanciaDisponsibleTableData = mercanciaDisponsibleTable;

  /**
   * Datos de la tabla de mercancías seleccionadas.
   */
  public getmercanciaSeleccionadasTable = mercanciaSeleccionadasTable;

  /**
   * Datos de la tabla de mercancías.
   */
  public getMercanciaTable = mercanciaTable;

  /**
   * Lista de mercancías disponibles.
   */
  public mercanciasdisponibles: string[] = [];

  /**
   * Encabezados de las tablas.
   */
  public encabezadosTablas: string[] = [];

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciasHeader: string[] = [];

  /**
   * Cuerpo de la tabla de mercancías.
   */
  public mercanciasBody: TableBodyData[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud110221State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Tabla de selección de mercancías.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Valores de las unidades de medida.
   */
  unidadMedidaValue: unknown[] = [];

  /**
   * Tratado seleccionado.
   */
  seleccioneTratado: string | null = null;

  /**
   * Nombre del archivo seleccionado.
   */
  nombreArchivo: string = '';

  /**
   * Configuración de la fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Configuración de la fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Configuración de la fecha de la factura.
   */
  fechaFacturaInput: InputFecha = FECHA_FACTURA;

  /**
   * Indica si se está mostrando el formulario.
   */
  esFormulario: boolean = false;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Opciones del catálogo de tratados.
   */
  optionsTratado!: Catalogo[];

  /**
   * Opciones del catálogo de países.
   */
  optionsPais!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida comercial (UMC).
   */
  optionsUMC!: Catalogo[];

  /**
   * Opciones del catálogo de unidades de medida.
   */
  optionsUnidadMedida!: Catalogo[];

  /**
   * Opciones del catálogo de tipos de factura.
   */
  optionsTipoFactura!: Catalogo[];

  /**
   * Datos de la tabla de mercancías disponibles.
   */
  public mercanciaDisponsiblesTablaDatos: ColumnasTabla[] = [];

  /**
   * Datos de la tabla de mercancías seleccionadas.
   */
  public mercanciaSeleccionadasTablaData: SeleccionadasTabla[] = [];

  /**
   * Estado actual de la consulta.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;

  /**
   * Configuración de las columnas de la tabla de mercancías disponibles.
   */
  public headers = HEADERS;

  /**
   * Configuración de las columnas de la tabla de mercancías seleccionadas.
   */
  public headersData = HEADERS_DATA;

  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos
   * @param fb Constructor de formularios reactivos
   * @param store Tienda para gestionar el estado del trámite
   * @param query Consultas para obtener datos del estado del trámite
   * @param validacionesService Servicio para validar formularios
   * @param consultaioQuery Consulta del estado de la solicitud
   */
  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110221Store,
    private query: Tramite110221Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
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

    this.mercanciatable();
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
    this.getSolicitudesTabla();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada
   */
  manejarClic(): void {
    if (this.soloLectura) {
      this.esFormulario = false;
    } else {
      this.esFormulario = true;
    }
  }

  /**
   * Valida el formulario del destinatario.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Valida el formulario de mercancías.
   */
  validarMercanciaForm(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
  }

  /**
   * Actualiza la fecha inicial en el formulario.
   * @param nuevo_fechaIncial Nueva fecha inicial
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaInicial', 'setFechInicioB');
  }

  /**
   * Actualiza la fecha final en el formulario.
   * @param nuevo_fechaFinal Nueva fecha final
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.registroForm.patchValue({
      validacionForm: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(this.validacionForm, 'fechaFinal', 'setFechFinB');
  }

  /**
   * Actualiza la fecha de la factura en el formulario.
   * @param nuevo_fechaFin Nueva fecha de factura
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.mercanciaForm.patchValue({
      validacionMercanciaForm: {
        fecha: nuevo_fechaFin,
      },
    });
    this.setValoresStore(this.validacionMercanciaForm, 'fecha', 'setFecha');
  }

  /**
   * Busca mercancías disponibles basándose en el tratado seleccionado.
   */
  buscarMercancias(): void {
    if (this.registroForm.get('validacionForm.tratado')?.value === 0) {
      this.hayMercanciasDisponibles = false;
    } else {
      this.hayMercanciasDisponibles = true;
    }
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

  /**
   * Cancela la edición de la mercancía.
   */
  cancelar(): void {
    this.esFormulario = false;
    this.esMercanciaEnEdicion = true;
  }

  /**
   * Agrega una nueva mercancía al formulario.
   */
  agregar(): void {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();

    if (this.mercanciaForm.valid) {
      this.esMercanciaEnEdicion = true;
      this.esFormulario = false;
      this.mercanciaSeleccionadasTablaData.splice(0, 1, {
        fraccionArancelaria:
          this.mercanciaForm?.value.validacionMercanciaForm
            .fraccionMercanArancelaria,
        cantidad: this.mercanciaForm?.value.validacionMercanciaForm.cantidad,
        unidadMedida:
          this.mercanciaForm?.value.validacionMercanciaForm.unidadMedida,
        valorMercancia:
          this.mercanciaForm?.value.validacionMercanciaForm.valordelamercancia,
        tipoFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.tipoFactura,
        numFactura:
          this.mercanciaForm?.value.validacionMercanciaForm.numeroFactura,
        complementoDescripcion:
          this.mercanciaForm?.value.validacionMercanciaForm
            .complementoDelaDescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      });
    }
  }

  /**
   * Modifica una mercancía existente.
   */
  modificar(): void {
    this.esFormulario = true;
    this.esMercanciaEnEdicion = false;
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }

  /**
   * Configura los encabezados y cuerpo de la tabla de mercancías.
   */
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable?.tableHeader;
    this.mercanciasBody = this.getMercanciaTable?.tableBody;
  }

  /**
   * Activa el formulario para cargar archivos.
   */
  cargaArchivo(): void {
    this.cargarArchivo = true;
  }

  /**
   * Muestra errores en el formulario.
   */
  darError(): void {
    this.mostrarErrores = true;
    this.cargarArchivo = false;
  }

  /**
   * Obtiene el catálogo de tratados.
   */
  getTratado(): void {
    this.registroService
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTratado = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de países.
   */
  getPais(): void {
    this.registroService
      .getPais()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsPais = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial.
   */
  getUMC(): void {
    this.registroService
      .getUMC()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUMC = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   */
  getUnidadMedida(): void {
    this.registroService
      .getUnidadMedida()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsUnidadMedida = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene el catálogo de tipos de factura.
   */
  getTipoFactura(): void {
    this.registroService
      .getTipoFactura()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          this.optionsTipoFactura = resp.data as Catalogo[];
        }
      });
  }

  /**
   * Cierra el formulario de carga de archivos.
   */
  cerrarAdjuntarArchivoMercancias(): void {
    this.cargarArchivo = false;
  }

  /**
   * Maneja la selección de archivos.
   * @param event Evento de selección de archivo
   */
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT.files?.[0];
    this.nombreArchivo = FILE ? FILE.name : 'No se eligió ningún archivo';
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Lógica de envío
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario a validar
   * @param field Campo a verificar
   * @returns Estado de validación del campo
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Establece valores en el store.
   * @param form Formulario origen
   * @param campo Campo a actualizar
   * @param metodoNombre Método del store a llamar
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110221Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el grupo de validación del formulario principal.
   * @returns Grupo de formulario
   */
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }

  /**
   * Obtiene el grupo de validación del formulario de mercancías.
   * @returns Grupo de formulario
   */
  get validacionMercanciaForm(): FormGroup {
    return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
  }

  /**
   * Configura el formulario reactivo con valores iniciales.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        tercerOperador: [this.solicitudState?.tercerOperador],
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        numeroRegistro: [
          this.solicitudState?.numeroRegistro,
          [Validators.required],
        ],
        nombreComercial: [
          this.solicitudState?.nombreComercial,
          [Validators.required],
        ],
        fechaInicial: [
          this.solicitudState?.fechaInicial,
          [Validators.required],
        ],
        fechaFinal: [this.solicitudState?.fechaFinal, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanciaArancelaria: [this.solicitudState?.fraccionMercanciaArancelaria, [Validators.required]],
        nombreTecnico: [this.solicitudState?.nombreTecnico, [Validators.required]],
        nombreComercialDelaMercancia: [this.solicitudState?.nombreComercialDelaMercancia, [Validators.required]],
        criterioParaConferir: [this.solicitudState?.criterioParaConferir, [Validators.required]],
        nombreEnIngles: [this.solicitudState?.nombreEnIngles, [Validators.required]],
        cantidad: [
          this.solicitudState?.cantidad,
          [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valorDelaMercancia: [
          this.solicitudState?.valorDelaMercancia,
          [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)],
        ],
        complementoDelaDescripcion: [
          this.solicitudState?.complementoDelaDescripcion,
          [Validators.required],
        ],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        numeroFactura: [
          this.solicitudState?.numeroFactura,
          [Validators.required],
        ],
      }),
    });
    this.inicializarEstadoFormulario();
  }

  /**
   * Obtiene datos para la tabla de solicitudes.
   */
  public getSolicitudesTabla(): void {
    this.registroService.getSolicitudesTabla().subscribe((data) => {
      this.mercanciaDisponsiblesTablaDatos = data;
    });
  }

  /**
   * Obtiene datos para la tabla de mercancías seleccionadas.
   */
  public getSolicitudesDataTabla(): void {
    this.registroService.getSolicitudesDataTabla().subscribe((data) => {
      this.mercanciaSeleccionadasTablaData = data;
    });
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.registroForm?.disable();
      this.mercanciaForm?.disable();
      this.hayMercanciasDisponibles = true;
      this.esMercanciaEnEdicion = true;
      this.getSolicitudesDataTabla();
    } else {
      this.registroForm?.enable();
      this.mercanciaForm?.enable();
    }
  }
}