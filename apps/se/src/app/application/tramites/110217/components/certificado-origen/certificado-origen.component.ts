import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '../../models/certificado-origen.model.js';
import { CatalogoLista } from '../../models/certificado-origen.model.js';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@libs/shared/data-access-user/src';
import { DisponiblesTabla } from '../../models/certificado-origen.model.js';
import { ElementRef } from '@angular/core';
import { FECHA_FACTURA } from '../../constants/certificado-origen.enum';
import { FECHA_FINAL } from '../../constants/certificado-origen.enum';
import { FECHA_INICIAL } from '../../constants/certificado-origen.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { SeleccionadasTabla } from '../../models/certificado-origen.model.js';
import { Subject } from 'rxjs';
import { TERCEROS_TEXTO_DE_ALERTA } from '../../constants/certificado-origen.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ToastrService } from 'ngx-toastr';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { Tramite110217State } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el Certificado de Origen.
 *
 * Este componente permite al usuario capturar, editar y gestionar la información
 * relacionada con el Certificado de Origen, incluyendo datos de mercancías, fechas,
 * y archivos adjuntos.
 */

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * Formulario principal para capturar los datos del Certificado de Origen.
   */
  formularioCertificado!: FormGroup;

  /**
   * Estado actual del trámite 110217.
   *
   * Contiene toda la información relacionada con el estado del trámite.
   */
  public solicitudState!: Tramite110217State;

  /**
   * Sujeto para manejar la destrucción de observables.
   *
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Formulario para capturar datos adicionales relacionados con el registro.
   */
  registroFormulario!: FormGroup;

  /**
   * Indica si los campos del formulario están deshabilitados.
   *
   * @type {boolean}
   */
  estaDeshabilitado: boolean = false;

  /**
   * Configuración de las columnas para la tabla de mercancías disponibles.
   *
   * Define los encabezados y las claves para mostrar los datos de las mercancías disponibles.
   */
  public disponiblesEncabezados: ConfiguracionColumna<DisponiblesTabla>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (ele: DisponiblesTabla) => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Nombre técnico',
      clave: (ele: DisponiblesTabla) => ele.nombreTecnico,
      orden: 2,
    },
    {
      encabezado: 'Nombre comercial',
      clave: (ele: DisponiblesTabla) => ele.nombreComercial,
      orden: 3,
    },
    {
      encabezado: 'Número de registro de productos',
      clave: (ele: DisponiblesTabla) => ele.numeroRegistroProductos,
      orden: 4,
    },
    {
      encabezado: 'Fecha expedición',
      clave: (ele: DisponiblesTabla) => ele.fechaExpedicion,
      orden: 5,
    },
    {
      encabezado: 'Fecha vencimiento',
      clave: (ele: DisponiblesTabla) => ele.fechaVencimiento,
      orden: 6,
    },
  ];

  /**
   * Datos de la tabla de mercancías disponibles.
   *
   * Contiene la lista de mercancías que están disponibles para selección.
   */
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías disponibles.
   *
   * Representa la mercancía seleccionada actualmente en la tabla.
   */
  disponiblesSeleccionadasFila!: DisponiblesTabla | null;

  /**
   * Configuración de las columnas para la tabla de mercancías seleccionadas.
   *
   * Define los encabezados y las claves para mostrar los datos de las mercancías seleccionadas.
   */
  public seleccionadasEncabezados: ConfiguracionColumna<SeleccionadasTabla>[] =
    [
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
   * Datos de la tabla de mercancías seleccionadas.
   *
   * Contiene la lista de mercancías que han sido seleccionadas por el usuario.
   */
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[] = [];

  /**
   * Fila seleccionada en la tabla de mercancías seleccionadas.
   *
   * Representa la mercancía seleccionada actualmente en la tabla de mercancías seleccionadas.
   */
  mercanciaSeleccionadasFila!: SeleccionadasTabla | null;

  /**
   * Configuración para la selección de filas en las tablas.
   *
   * Define las opciones de selección para las tablas de mercancías.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Texto de alerta para mostrar mensajes relacionados con terceros.
   *
   * Este texto se utiliza para advertir al usuario sobre ciertas acciones o restricciones.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Referencia al elemento del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  @ViewChild('modalArchivo') modalArchivo!: ElementRef;

  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('modalBuscar') modalBuscar!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   *
   * Se utiliza para cerrar el modal de manera programada.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Formulario para gestionar los archivos adjuntos.
   *
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  formularioArchivo!: FormGroup;

  /**
   * Nombre del archivo seleccionado.
   *
   * Contiene el nombre del archivo que el usuario ha seleccionado para adjuntar.
   */
  nombreArchivo: string = '';

  /**
   * Opciones disponibles para el Tratado Comercial.
   *
   * Contiene una lista de opciones que el usuario puede seleccionar para el Tratado Comercial.
   */
  optionsTratado!: Catalogo[];

  /**
   * Opciones disponibles para los países.
   *
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  optionsPais!: Catalogo[];

  /**
   * Fecha inicial predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha inicial.
   */
  fechaInicialInput: InputFecha = FECHA_INICIAL;

  /**
   * Fecha final predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha final.
   */
  fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Formulario para gestionar los datos de mercancías.
   *
   * Permite capturar y validar los datos relacionados con las mercancías.
   */
  formularioMercancia!: FormGroup;

  /**
   * Fecha de la factura predefinida para el formulario.
   *
   * Se utiliza como valor inicial para el campo de fecha de factura.
   */
  fechaFacturaInput: InputFecha = FECHA_FACTURA;

  /**
   * Opciones disponibles para el tipo de factura.
   *
   * Contiene una lista de tipos de factura que el usuario puede seleccionar.
   */
  optionsTipoFactura!: Catalogo[];

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente CertificadoOrigenComponent.
   *
   * Este constructor inicializa las dependencias necesarias para el funcionamiento del componente.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {CertificadosOrigenService} certificadosOrigenService - Servicio para gestionar datos relacionados con el Certificado de Origen.
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite 110217.
   * @param {Tramite110217Query} tramiteQuery - Query para consultar el estado del trámite 110217.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para realizar validaciones personalizadas en los formularios.
   */
  constructor(
    public fb: FormBuilder,
    private certificadosOrigenService: CertificadosOrigenService,
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * Inicializa el componente.
   *
   * Este método configura los formularios y carga los datos iniciales necesarios para el Certificado de Origen.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
                  })
      )
      .subscribe();

      console.log('solicitudState', this.solicitudState);

    this.inicializarFormularioCertificado();
    this.inicializarFormularioMercancia();
    this.inicializarFormularioArchivo();
    this.cargarMercanciasDisponibles();
    this.cargarMercanciasSeleccionadas();
    this.cargarTratado();
    this.cargarPais();

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarFormulario();
        })
      )
      .subscribe();
  }

  inicializarFormulario(): void {
    if (this.soloLectura) {
      this.formularioCertificado.disable();
      this.formularioMercancia.disable();
      this.formularioArchivo.disable();
    } else {
      this.formularioCertificado.enable();
      this.formularioMercancia.enable();
      this.formularioArchivo.enable();
    }
  }
  /**
   * Actualiza un valor en el store del trámite.
   *
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   *
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110217Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Obtiene el grupo de formulario relacionado con el operador.
   *
   * @returns {FormGroup} El grupo de formulario del operador.
   */
  get grupoOperador(): FormGroup {
    return this.formularioCertificado.get('grupoOperador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario relacionado con el domicilio.
   *
   * @returns {FormGroup} El grupo de formulario del domicilio.
   */
  get grupoDeDomicilio(): FormGroup {
    return this.formularioCertificado.get('grupoDeDomicilio') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario relacionado con el tratado.
   *
   * @returns {FormGroup} El grupo de formulario del tratado.
   */
  get grupoTratado(): FormGroup {
    return this.formularioCertificado.get('grupoTratado') as FormGroup;
  }

  /**
   * Inicializa el formulario principal del Certificado de Origen.
   *
   * Este método configura los campos y validaciones del formulario principal utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioCertificado(): void {
    this.formularioCertificado = this.fb.group({
      tercerOperador: [this.solicitudState?.tercerOperador],
      grupoOperador: this.fb.group({
        nombre: [this.solicitudState?.grupoOperador?.nombre, []],
        apellidoPrimer: [
          this.solicitudState?.grupoOperador?.apellidoPrimer,
          [],
        ],
        apellidoSegundo: [
          this.solicitudState?.grupoOperador?.apellidoSegundo,
          [],
        ],
        numeroFiscal: [
          this.solicitudState?.grupoOperador?.numeroFiscal,
          [Validators.required],
        ],
        razonSocial: [this.solicitudState?.grupoOperador?.razonSocial, []],
      }),
      grupoDeDomicilio: this.fb.group({
        pais: [this.solicitudState?.grupoTratado?.pais, []],
        ciudad: [
          this.solicitudState?.grupoDeDomicilio?.ciudad,
          [Validators.maxLength(20)],
        ],
        calle: [
          this.solicitudState?.grupoDeDomicilio?.calle,
          [Validators.maxLength(90)],
        ],
        numeroLetra: [
          this.solicitudState?.grupoDeDomicilio?.numeroLetra,
          [Validators.maxLength(30)],
        ],
        lada: [this.solicitudState?.grupoDeDomicilio?.lada, []],
        telefono: [
          this.solicitudState?.grupoDeDomicilio?.telefono,
          [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(20)],
        ],
        fax: [
          this.solicitudState?.grupoDeDomicilio?.fax,
          [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(20)],
        ],
        correoElectronico: [
          this.solicitudState?.grupoDeDomicilio?.correoElectronico,
          [Validators.email, Validators.maxLength(70)],
        ],
      }),
      grupoTratado: this.fb.group({
        tratado: [
          this.solicitudState?.grupoTratado?.tratado,
          [Validators.required],
        ],
        pais: [this.solicitudState?.grupoTratado?.pais, [Validators.required]],
        fraccionArancelaria: [
          this.solicitudState?.grupoTratado?.fraccionArancelaria,
          [Validators.maxLength(8)],
        ],
        numeroRegistro: [
          this.solicitudState?.grupoTratado?.numeroRegistro,
          [Validators.maxLength(12)],
        ],
        nombreComercial: [
          this.solicitudState?.grupoTratado?.nombreComercial,
          [Validators.maxLength(200)],
        ],
        fechaFinal: [this.solicitudState?.grupoTratado?.fechaFinalInput, []],
        fechaInicial: [
          this.solicitudState?.grupoTratado?.fechaInicialInput,
          [],
        ],
      }),
    });
  }

  /**
   * Inicializa el formulario relacionado con las mercancías.
   *
   * Este método configura los campos y validaciones del formulario de mercancías utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioMercancia(): void {
    this.formularioMercancia = this.fb.group({
      fraccionMercanciaArancelaria: [
        this.solicitudState?.formularioMercancia?.fraccionMercanciaArancelaria,
        [],
      ],
      nombreComercialDelaMercancia: [
        this.solicitudState?.formularioMercancia?.nombreComercialDelaMercancia,
        [],
      ],
      nombreTecnico: [
        this.solicitudState?.formularioMercancia?.nombreTecnico,
        [],
      ],
      nombreEnIngles: [
        this.solicitudState?.formularioMercancia?.nombreEnIngles,
        [],
      ],
      otrasInstancias: [
        this.solicitudState?.formularioMercancia?.otrasInstancias,
        [],
      ],
      criterioParaConferir: [
        this.solicitudState?.formularioMercancia?.criterioParaConferir,
        [],
      ],
      cantidad: [
        this.solicitudState?.formularioMercancia?.cantidad,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      pais: ['', [Validators.required]],
      valorDelaMercancia: [
        this.solicitudState?.formularioMercancia?.valorDelaMercancia,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      complementoDelaDescripcion: [
        this.solicitudState?.formularioMercancia?.complementoDelaDescripcion,
        [Validators.required],
      ],
      fecha: [
        this.solicitudState?.formularioMercancia?.fecha,
        [Validators.required],
      ],
      numeroFactura: [
        this.solicitudState?.formularioMercancia?.numeroFactura,
        [Validators.required],
      ],
      tipoFactura: [
        this.solicitudState?.formularioMercancia?.tipoFactura,
        [Validators.required],
      ],
    });
  }

  /**
   * Inicializa el formulario para gestionar archivos.
   *
   * Este método configura los campos y validaciones del formulario relacionado con los archivos adjuntos.
   */
  inicializarFormularioArchivo(): void {
    this.formularioArchivo = this.fb.group({
      archivo: [this.solicitudState?.tercerOperador, [Validators.required]],
    });
  }

  /**
   * Verifica si un campo específico de un formulario es válido.
   *
   * Este método utiliza el servicio de validaciones para determinar si un campo es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Deshabilita la funcionalidad del formulario.
   *
   * Este método establece la propiedad `estaDeshabilitado` en `true` para deshabilitar el formulario.
   */
  onClick(): void {
    this.estaDeshabilitado = true;
  }

  /**
   * Carga las opciones disponibles para el Tratado Comercial.
   *
   * Este método obtiene las opciones de tratado desde el servicio `CertificadosOrigenService` y las asigna a `optionsTratado`.
   */
  cargarTratado(): void {
    this.certificadosOrigenService
      .obtenerTratado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsTratado = datos.datos;
      });
  }

  /**
   * Carga las opciones disponibles para los países.
   *
   * Este método obtiene las opciones de países desde el servicio `CertificadosOrigenService` y las asigna a `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.certificadosOrigenService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsPais = datos.datos;
        this.optionsTipoFactura = datos.datos;
      });
  }

  /**
   * Carga las mercancías disponibles para la tabla.
   *
   * Este método obtiene las mercancías disponibles desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaDisponsiblesTablaDatos`.
   */
  cargarMercanciasDisponibles(): void {
    this.certificadosOrigenService
      .obtenerMercanciasDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercanciaDisponsiblesTablaDatos = respuesta;
      });
  }

  /**
   * Carga las mercancías seleccionadas para la tabla.
   *
   * Este método obtiene las mercancías seleccionadas desde el servicio `CertificadosOrigenService` y las asigna a `mercanciaSeleccionadasTablaDatos`.
   */
  cargarMercanciasSeleccionadas(): void {
    this.certificadosOrigenService
      .obtenerMercanciasSeleccionadas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.mercanciaSeleccionadasTablaDatos = respuesta;
      });
  }

  /**
   * Maneja la selección de filas en la tabla de mercancías disponibles.
   *
   * Este método asigna la fila seleccionada a `disponiblesSeleccionadasFila` y muestra el modal de búsqueda si está disponible.
   *
   * @param {DisponiblesTabla} evento - La fila seleccionada en la tabla de mercancías disponibles.
   */
  disponiblesSeleccionDeFilas(evento: DisponiblesTabla): void {
    this.disponiblesSeleccionadasFila = evento;
    if (this.modalBuscar) {
      const MODAL_INSTANCE = new Modal(this.modalBuscar.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  /**
   * Maneja la selección de filas en la tabla de mercancías seleccionadas.
   *
   * Este método asigna la fila seleccionada a `mercanciaSeleccionadasFila`.
   *
   * @param {SeleccionadasTabla} evento - La fila seleccionada en la tabla de mercancías seleccionadas.
   */
  seleccionDeFilas(evento: SeleccionadasTabla): void {
    this.mercanciaSeleccionadasFila = evento;
  }

  /**
   * Elimina la fila seleccionada de la tabla de mercancías seleccionadas.
   *
   * Este método elimina la mercancía seleccionada de la lista `mercanciaSeleccionadasTablaDatos` y limpia la selección actual.
   */
  eliminar(): void {
    if (this.mercanciaSeleccionadasFila) {
      this.mercanciaSeleccionadasTablaDatos =
        this.mercanciaSeleccionadasTablaDatos.filter(
          (elementos) => this.mercanciaSeleccionadasFila?.id !== elementos.id
        );
      this.mercanciaSeleccionadasFila = null;
    }
  }

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  cargaArchivo(): void {
    if (this.modalArchivo) {
      const MODAL_INSTANCE = new Modal(this.modalArchivo.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Maneja la selección de un archivo en el input de carga de archivos.
   *
   * Este método actualiza el nombre del archivo seleccionado en la propiedad `nombreArchivo`.
   *
   * @param {Event} event - El evento generado al seleccionar un archivo.
   */
  alSeleccionarArchivo(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT?.files ? INPUT.files[0] : null;
    this.nombreArchivo = FILE ? FILE.name : 'Sin archivos seleccionados';
  }

  /**
   * Envía los datos y cierra el modal.
   *
   * Este método realiza el envío de datos y cierra el modal de manera programada.
   */
  enviar(): void {
    this.cerrarModal();
  }

  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Cambia la fecha inicial en el formulario del Certificado de Origen.
   *
   * Este método actualiza el valor de la fecha inicial en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaIncial - La nueva fecha inicial a establecer.
   */
  cambioFechaInicial(nuevo_fechaIncial: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaInicial: nuevo_fechaIncial,
      },
    });
    this.setValoresStore(
      this.grupoTratado,
      'fechaInicial',
      'setGrupoTratadoFechaFinalInput'
    );
  }

  /**
   * Cambia la fecha final en el formulario del Certificado de Origen.
   *
   * Este método actualiza el valor de la fecha final en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaFinal - La nueva fecha final a establecer.
   */
  cambioFechaFinal(nuevo_fechaFinal: string): void {
    this.formularioCertificado.patchValue({
      grupoTratado: {
        fechaFinal: nuevo_fechaFinal,
      },
    });
    this.setValoresStore(
      this.grupoTratado,
      'fechaFinal',
      'setGrupoTratadoFechaInicialInput'
    );
  }

  /**
   * Cambia la fecha de la factura en el formulario de mercancías.
   *
   * Este método actualiza el valor de la fecha de la factura en el formulario y en el store del trámite.
   *
   * @param {string} nuevo_fechaFin - La nueva fecha de la factura a establecer.
   */
  cambioFechaFactura(nuevo_fechaFin: string): void {
    this.formularioMercancia.patchValue({ fecha: nuevo_fechaFin });
    this.setValoresStore(this.formularioMercancia, 'fecha', 'setFecha');
  }

  /**
   * Limpia los observables al destruir el componente.
   *
   * Este método emite un valor en el `destroyNotifier$` y completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
