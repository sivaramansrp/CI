import {
  AlertComponent,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableComponent,
  TituloComponent,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { ColumnasTabla, SeleccionadasTabla } from '../../models/registro.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud110201State,
  Tramite110201Store,
} from '../../state/Tramite110201.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import mercanciaDisponsibleTable from '@libs/shared/theme/assets/json/110201/mercancia-disponsible.json';
import mercanciaSeleccionadasTable from '@libs/shared/theme/assets/json/110201/mercancias-seleccionadas.json';
import mercanciaTable from '@libs/shared/theme/assets/json/110201/mercancia.json';

const TERCEROS_TEXTO_DE_ALERTA =
  'Para continuar con el trámite, debes agregar por lo menos una mercancía.';
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
   * Lista de suscripciones activas.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Suscripción para obtener el catálogo de tratados.
   */
  getTratadoSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de países.
   */
  getPaisSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de UMC.
   */
  getUMCSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de unidades de medida.
   */
  getUnidadMedidaSubscription!: Subscription;

  /**
   * Suscripción para obtener el catálogo de tipos de factura.
   */
  getTipoFacturaSubscription!: Subscription;

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
   * Catálogo de unidades de medida.
   */
  unidadMedida!: CatalogosSelect;

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
  isMercancia = false;

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
  public mercanciasBody: unknown[] = [];

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud110201State;

  /**
   * Notificador para destruir observables al destruir el componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Tabla de selección de mercancías.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Descripciones de los tratados.
   */
  Tratadodescripcion: unknown[] = [];

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
   * Indica si se está mostrando el formulario.
   */
  esFormulario: boolean = false;
/**
 * Datos de la tabla de mercancías disponibles.
 * Representa una lista de objetos que contienen información sobre las mercancías disponibles
 * para ser seleccionadas en el formulario.
 */
  public mercanciaDisponsiblesTablaDatos: ColumnasTabla[] = [];
/**
 * Datos de la tabla de mercancías seleccionadas.
 * Representa una lista de objetos que contienen información sobre las mercancías que han sido seleccionadas
 * por el usuario en el formulario.
 */
  public mercanciaSeleccionadasTablaData: SeleccionadasTabla[] = [];
/**
 * Configuración de las columnas de la tabla de mercancías disponibles.
 * Define los encabezados y las claves asociadas a cada columna de la tabla de mercancías disponibles.
 */
  public headers: ConfiguracionColumna<ColumnasTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: ColumnasTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Nombre técnico',
      clave: (ele: ColumnasTabla) => ele.nombreTecnico,
      orden: 2,
    },
    {
      encabezado: 'Nombre comercial',
      clave: (ele: ColumnasTabla) => ele.nombreComercial,
      orden: 3,
    },
    {
      encabezado: 'Número de registro de productos',
      clave: (ele: ColumnasTabla) => ele.numeroRegistroProductos,
      orden: 4,
    },
    {
      encabezado: 'Fecha expedición',
      clave: (ele: ColumnasTabla) => ele.fechaExpedicion,
      orden: 5,
    },
    {
      encabezado: 'Fecha vencimíento',
      clave: (ele: ColumnasTabla) => ele.fechaVencimiento,
      orden: 6,
    },
  ];
/**
 * Configuración de las columnas de la tabla de mercancías seleccionadas.
 * Define los encabezados y las claves asociadas a cada columna de la tabla de mercancías seleccionadas.
 */
  public headersData: ConfiguracionColumna<SeleccionadasTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: SeleccionadasTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Cantidad',
      clave: (ele: SeleccionadasTabla) => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (ele: SeleccionadasTabla) => ele.unidadMedida,
      orden: 3,
    },
    {
      encabezado: 'Valor mercancía',
      clave: (ele: SeleccionadasTabla) => ele.valorMercancia,
      orden: 4,
    },
    {
      encabezado: 'Tipo de factura',
      clave: (ele: SeleccionadasTabla) => ele.tipoFactura,
      orden: 5,
    },
    {
      encabezado: 'Número factura',
      clave: (ele: SeleccionadasTabla) => ele.numFactura,
      orden: 6,
    },
    {
      encabezado: 'Complemento descripción',
      clave: (ele: SeleccionadasTabla) => ele.complementoDescripcion,
      orden: 7,
    },
    {
      encabezado: 'Fecha factura',
      clave: (ele: SeleccionadasTabla) => ele.fechaFactura,
      orden: 8,
    },
  ];

  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param fb Constructor de formularios reactivos.
   * @param store Tienda para gestionar el estado del trámite.
   * @param query Consultas para obtener datos del estado del trámite.
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    private registroService: RegistroService,
    public fb: FormBuilder,
    private store: Tramite110201Store,
    private query: Tramite110201Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Maneja el evento de clic para habilitar el formulario de edición.
   * @param row Fila seleccionada.
   */
  manejarClic(row: unknown) {
    this.esFormulario = true;
  }
  /**
   * Valida el formulario del destinatario.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
    }
  }

  /**
   * Valida el formulario de mercancías.
   * Marca todos los campos como tocados si el formulario es inválido.
   */
  validarMercanciaForm(): void {
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
    }
  }
  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura los formularios y obtiene los catálogos necesarios.
   */
  ngOnInit(): void {
    this.mercanciatable();
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
    this.getSolicitudesTabla();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.subscriptions.push(
      this.query.seleccioneTratado$.subscribe((tratado) => {
        this.tratado = {
          labelNombre: 'Tratado/Acuerdo',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: tratado ?? [],
        };
        this.Tratadodescripcion = this.tratado.catalogos;
      })
    );

    this.subscriptions.push(
      this.query.selectPais$.subscribe((pais) => {
        this.pais = {
          labelNombre: 'País / Bloque',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: pais ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectUMC$.subscribe((umc) => {
        this.umc = {
          labelNombre: 'UMC',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: umc ?? [],
        };
      })
    );

    this.subscriptions.push(
      this.query.selectUnidadMedida$.subscribe((unidadMedida) => {
        this.unidadMedida = {
          labelNombre: 'Unidad de medida de la masa bruta',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: unidadMedida ?? [],
        };
        this.unidadMedidaValue = this.unidadMedida.catalogos;
      })
    );

    this.subscriptions.push(
      this.query.selectTipoFactura$.subscribe((tipoFactura) => {
        this.tipoFactura = {
          labelNombre: 'Tipo de factura',
          required: true,
          primerOpcion: 'Selecciona un valor',
          catalogos: tipoFactura ?? [],
        };
      })
    );
  }
/**
 * Busca mercancías disponibles basándose en la descripción del tratado.
 * Verifica si la lista `Tratadodescripcion` incluye el valor '1' para determinar si hay mercancías disponibles.
 * Si el valor está presente, establece `hayMercanciasDisponibles` en `true`; de lo contrario, lo establece en `false`.
 * Además, actualiza los catálogos necesarios llamando a los métodos `getTratado`, `getPais`, `getUMC`, `getUnidadMedida` y `getTipoFactura`.
 */
  buscarMercancias() {
    if (this.Tratadodescripcion.includes('1')) {
      this.hayMercanciasDisponibles = true;
    } else {
      this.hayMercanciasDisponibles = false;
    }
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }
  /**
   * Agrega una mercancía al formulario.
   */
  agregar() {
    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();

    if (this.mercanciaForm.valid) {
      this.isMercancia = true;
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
        numFactura: this.mercanciaForm?.value.validacionMercanciaForm.nFactura,
        complementoDescripcion:
          this.mercanciaForm?.value.validacionMercanciaForm
            .complementodeladescripcion,
        fechaFactura: this.mercanciaForm?.value.validacionMercanciaForm.fecha,
      });
    }
  }
  /**
   * Modifica una mercancía existente.
   */
  modificar() {
    this.esFormulario = true;
    this.isMercancia = false;

    this.getTratado();
    this.getPais();
    this.getUMC();
    this.getUnidadMedida();
    this.getTipoFactura();
  }
/**
 * Configura los encabezados y el cuerpo de la tabla de mercancías.
 * Asigna los valores de los encabezados y el cuerpo de la tabla desde los datos obtenidos.
 */
  public mercanciatable(): void {
    this.mercanciasHeader = this.getMercanciaTable.tableHeader;
    this.mercanciasBody = this.getMercanciaTable.tableBody;
  }
/**
 * Activa el formulario para cargar un archivo.
 * Cambia el estado de la variable `cargarArchivo` a `true` para mostrar el formulario de carga de archivos.
 */
  cargaArchivo() {
    this.cargarArchivo = true;
  }
  /**
 * Muestra errores en el formulario y desactiva la carga de archivos.
 * Cambia el estado de las variables `mostrarErrores` a `true` y `cargarArchivo` a `false`.
 */
  darError() {
    this.mostrarErrores = true;
    this.cargarArchivo = false;
  }
  /**
   * Obtiene el catálogo de tratados desde el servicio.
   */
  getTratado(): void {
    this.getTratadoSubscription = this.registroService
      .getTratado()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTratado(RESPONSE);
        }
      });
  }
  /**
   * Obtiene el catálogo de países desde el servicio.
   */
  getPais(): void {
    this.getPaisSubscription = this.registroService
      .getPais()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setPais(RESPONSE);
        }
      });
  }
  /**
   * Obtiene el catálogo de UMC desde el servicio.
   */
  getUMC(): void {
    this.getUMCSubscription = this.registroService
      .getUMC()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setUMC(RESPONSE);
        }
      });
  }
  /**
   * Obtiene el catálogo de unidades de medida desde el servicio.
   */
  getUnidadMedida(): void {
    this.getUnidadMedidaSubscription = this.registroService
      .getUnidadMedida()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setUnidadMedida(RESPONSE);
        }
      });
  }
  /**
   * Obtiene el catálogo de tipos de factura desde el servicio.
   */
  getTipoFactura(): void {
    this.getTipoFacturaSubscription = this.registroService
      .getTipoFactura()
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.store.setTipoFactura(RESPONSE);
        }
      });
  }
/**
 * Cierra el formulario para adjuntar un archivo de mercancías.
 * Cambia el estado de la variable `cargarArchivo` a `false` para ocultar el formulario de carga de archivos.
 */
  cerrarAdjuntarArchivoMercancias(): void {
    this.cargarArchivo = false;
  }
/**
 * Maneja el evento de selección de un archivo.
 * Obtiene el archivo seleccionado por el usuario y asigna su nombre a la propiedad `nombreArchivo`.
 * Si no se selecciona ningún archivo, asigna el mensaje "No se eligió ningún archivo".
 * @param event Evento que contiene la información del archivo seleccionado.
 */
  alSeleccionarArchivo(event: any) {
    const FILE = event.target.files[0];
    this.nombreArchivo = FILE ? FILE.name : 'No se eligió ningún archivo';
  }
  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.registroForm.valid) {
      // Aquí se implementará la lógica para manejar el envío del formulario.
    }
  }
  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a validar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }
  /**
   * Establece valores en el estado de la tienda.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Método de la tienda para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Obtiene el formulario de validación.
   */
  get validacionForm(): FormGroup {
    return this.registroForm.get('validacionForm') as FormGroup;
  }
  /**
   * Obtiene el formulario de validación de mercancías.
   */
  get validacionMercanciaForm(): FormGroup {
    return this.mercanciaForm.get('validacionMercanciaForm') as FormGroup;
  }
  /**
   * Configura el formulario reactivo con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
    this.registroForm = this.fb.group({
      validacionForm: this.fb.group({
        tratado: [this.solicitudState?.tratado, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        numeroRegistro: [
          this.solicitudState?.numeroRegistro,
          [Validators.required],
        ],
        nombreComercial: [
          this.solicitudState?.nombreComercial,
          [Validators.required],
        ],
        fechaInicioB: [
          this.solicitudState?.fechaInicioB,
          [Validators.required],
        ],
        fechFinB: [this.solicitudState?.fechFinB, [Validators.required]],
        archivo: [this.solicitudState?.archivo, [Validators.required]],
      }),
    });
    this.mercanciaForm = this.fb.group({
      validacionMercanciaForm: this.fb.group({
        fraccionMercanArancelaria: ['', [Validators.required]],
        nombretecnico: [
          '',
          [Validators.required],
        ],
        nombrecomercialdelamercancia: [
          '',
          [Validators.required],
        ],

        criterioparaconferir: ['', [Validators.required]],
        nombreEnIngles: ['', [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        cantidad: [
          this.solicitudState?.cantidad,
          [Validators.required, Validators.pattern(/^\d+$/)],
        ],
        umc: [this.solicitudState?.umc, [Validators.required]],
        valordelamercancia: [
          this.solicitudState?.valordelamercancia,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        complementodeladescripcion: [
          this.solicitudState?.complementodeladescripcion,
          [Validators.required],
        ],
        masabruta: [
          this.solicitudState?.masabruta,
          [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
        ],
        unidadMedida: [
          this.solicitudState?.unidadMedida,
          [Validators.required],
        ],
        tipoFactura: [this.solicitudState?.tipoFactura, [Validators.required]],
        fecha: [this.solicitudState?.fecha, [Validators.required]],
        nFactura: [this.solicitudState?.nFactura, [Validators.required]],
      }),
    });
  }
/**
 * Obtiene los datos de la tabla de mercancías disponibles desde el servicio.
 * Realiza una suscripción al método `getSolicitudesTabla` del servicio `RegistroService`
 * y asigna los datos obtenidos a la propiedad `mercanciaDisponsiblesTablaDatos`.
 */
  public getSolicitudesTabla(): void {
    this.registroService.getSolicitudesTabla().subscribe((data) => {
      this.mercanciaDisponsiblesTablaDatos = data;
    });
  }
/**
 * Obtiene los datos de la tabla de mercancías seleccionadas desde el servicio.
 * Realiza una suscripción al método `getSolicitudesDataTabla` del servicio `RegistroService`
 * y asigna los datos obtenidos a la propiedad `mercanciaSeleccionadasTablaData`.
 */
  public getSolicitudesDataTabla(): void {
    this.registroService.getSolicitudesDataTabla().subscribe((data) => {
      this.mercanciaSeleccionadasTablaData = data;
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    if (this.getTratadoSubscription) {
      this.getTratadoSubscription.unsubscribe();
    }
    if (this.getPaisSubscription) {
      this.getPaisSubscription.unsubscribe();
    }
    if (this.getUMCSubscription) {
      this.getUMCSubscription.unsubscribe();
    }
    if (this.getUnidadMedidaSubscription) {
      this.getUnidadMedidaSubscription.unsubscribe();
    }
    if (this.getTipoFacturaSubscription) {
      this.getTipoFacturaSubscription.unsubscribe();
    }
    this.destroyNotifier$.next();
  }
}
