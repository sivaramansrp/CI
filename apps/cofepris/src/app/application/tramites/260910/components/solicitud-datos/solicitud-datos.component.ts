import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosDeSolicitud } from '../../models/solicitud-datos.model';
import { ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Mercancia } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { REGEX_CORREO_ELECTRONICO } from '@libs/shared/data-access-user/src';
import { REGEX_TELEFONO } from '@libs/shared/data-access-user/src';
import { RadioOptions } from '../../models/solicitud-datos.model';
import { SCIAN } from '../../models/SCIAN.model';
import { Solicitud } from '../../models/solicitud-datos.model';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { Solicitud260910State } from '../../estados/tramites260910.store';
import { Solicitud260910Store } from '../../estados/tramites260910.store';
import { SolicitudDatos } from '../../models/solicitud-datos.model';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../constantes/constantes';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TableData } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS.
   * Esta variable contiene los textos estáticos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (panel ampliado).
   */
  public colapsable = true;

  /**
   * Controlador para manejar la destrucción del componente.
   * Utilizado para liberar recursos relacionados con las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de la tabla SCIAN.
   * Contiene encabezados y cuerpo de datos vacíos al inicio.
   */
  public tableDataSCIAN: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * Configuración de la tabla de mercancías.
   * Contiene encabezados y cuerpo de datos vacíos al inicio.
   */
  public tableDataMercancias: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * Opciones de botones de selección por radio.
   * Representadas como un arreglo de objetos tipoOperacion RadioOptions.
   */
  tipoOperacionRadioOptions: RadioOptions[] = [];

  /**
   * Catálogo relacionado con el régimen.
   * Inicializado como un objeto vacío.
   */
  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la aduana.
   * Inicializado como un objeto vacío.
   */
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la SCIANCatalogo.
   * Inicializado como un objeto vacío.
   */
  SCIANCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la SCIANCatalogo.
   * Inicializado como un objeto vacío.
   */
  SCIANDescCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con los estados.
   * Inicializado como un objeto vacío.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Formulario reactivo utilizado para gestionar datos de la solicitud.
   * Se inicializará más adelante en el componente.
   */
  solicitudForm!: FormGroup;

  /**
   * Formulario reactivo utilizado para gestionar datos de la Clave SCIAN.
   * Se inicializará más adelante en el componente.
   */
  claveSCIANForm!: FormGroup;

  /**
   * Datos de las mercancías seleccionadas.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  selectedMercanciasDatos: Mercancia[] = [];

  /**
   * @description Lista de datos seleccionados de SCIAN.
   * Esta propiedad almacena las entradas seleccionadas de la tabla SCIAN.
   * 
   * @type {SCIAN[]}
   */
  seleccionaSCIANDatos: SCIAN[] = [];

  /**
   * Referencia al elemento del modal.
   */
  @ViewChild('modal-alerta') modalAlertaElement!: ElementRef;

  /**
   * @description Referencia al elemento del modal de confirmación.
   * Este modal se utiliza para confirmar la eliminación de mercancías o SCIAN.
   * 
   * @type {ElementRef}
   */
  @ViewChild('modal-confirmar') modalConfirmarElement!: ElementRef;

  /**
   * Referencia al elemento del modal para agregar mercancías.
   * Utilizado para manipular el modal mediante su elemento HTML.
   */
  @ViewChild('modal-agregar-mercancias') modalElement!: ElementRef;

  /**
   * Referencia al elemento del modal para agregar SCIAN.
   * Utilizado para manipular el modal mediante su elemento HTML.
   */
  @ViewChild('modal-agregar-scian') modalElementSCIAN!: ElementRef;

  /**
   * @description Variable que almacena el tipo seleccionado para realizar una acción específica.
   * Se utiliza principalmente en el contexto de confirmación de eliminación de mercancías.
   * 
   * @type {string}
   */
  seleccionadoTipo: string = '';

  /**
   * Opciones de botones de selección por radio.
   * Representadas como un arreglo de objetos tipo RadioOptions.
   */
  hacerlosRadioOptions: RadioOptions[] = [];

  /**
   * Controla el valor seleccionado en los botones de selección por radio.
   * Inicializado con un valor predeterminado de 0.
   */
  hacerlosPublicos = 0;

  /**
   * Estado actual de la solicitud.
   * Inicializado como un objeto vacío con la estructura de Solicitud260910State.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Configuración para la selección de filas en la tabla de mercancías.
   * Utiliza selección con checkbox.
   */
  mercanciasSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración para la selección de filas en la tabla de SCIANSeleccionTabla.
   * Utiliza selección con checkbox.
   */
  SCIANSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración para la selección de filas en la tabla de solicitudes.
   * Actualmente está desactivada (sin selección definida).
   */
  solicitudSeleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de las columnas de la tabla de solicitudes.
   * Define los encabezados, claves y orden para mostrar los datos de solicitudes.
   */
  solicitudConfiguracionTabla: ConfiguracionColumna<SolicitudDatos>[] = [
    {
      /**
       * Columna para mostrar la fecha de creación de la solicitud.
       * Utiliza la propiedad 'fechaCreacion' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Fecha creación',
      clave: (item: SolicitudDatos) => item.fechaCreacion,
      orden: 1,
    },
    {
      /**
       * Columna para mostrar la mercancía asociada a la solicitud.
       * Utiliza la propiedad 'mercancia' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Mercancía',
      clave: (item: SolicitudDatos) => item.mercancia,
      orden: 2,
    },
    {
      /**
       * Columna para mostrar la cantidad asociada a la solicitud.
       * Utiliza la propiedad 'cantidad' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Cantidad',
      clave: (item: SolicitudDatos) => item.cantidad,
      orden: 3,
    },
    {
      /**
       * Columna para mostrar el proveedor asociado a la solicitud.
       * Utiliza la propiedad 'proovedor' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Proveedor',
      clave: (item: SolicitudDatos) => item.proovedor,
      orden: 4,
    },
  ];

  /**
   * Datos de las solicitudes.
   * Inicialmente, es un arreglo vacío que se llenará con datos dinámicos.
   */
  solicitudDatos: SolicitudDatos[] = [];

  /**
   * Configuración de las columnas de la tabla de mercancías.
   * Define las columnas y cómo se obtienen los datos de cada mercancía.
   */
  mercanciasConfiguracionTabla: ConfiguracionColumna<Mercancia>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: Mercancia) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del producto',
      clave: (item: Mercancia) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del producto',
      clave: (item: Mercancia) => item.nombreProductoEspecifico,
      orden: 3,
    },
    {
      encabezado: 'Distintiva',
      clave: (item: Mercancia) => item.distintiva,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: Mercancia) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (item: Mercancia) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: Mercancia) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: Mercancia) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: Mercancia) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'País de origen',
      clave: (item: Mercancia) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: Mercancia) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: Mercancia) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: Mercancia) => item.usoEspecifico,
      orden: 14,
    },
  ];

  /**
   * Configuración de las columnas de la tabla de SCIAN.
   * Define las columnas y cómo se obtienen los datos de cada SCIAN.
   */
  SCIANConfiguracionTabla: ConfiguracionColumna<SCIAN>[] = [
    {
      encabezado: 'Clave S.C.I.A.N',
      clave: (item: SCIAN) => item.claveSCIAN,
      orden: 1,
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (item: SCIAN) => item.claveSCIANDesc,
      orden: 2,
    }
  ];

  /**
   * Datos de las mercancías.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  mercanciasDatos: Mercancia[] = [];

  /**
   * Datos de las SCIAN.
   * Representados como un arreglo de objetos tipo SCIAN.
   */
  SCIANDatos: SCIAN[] = [];

  /**
   * Constructor del componente.
   * Inicializa servicios y otras dependencias necesarias.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260910Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260910Query - Consulta para observar los cambios en el estado de la solicitud.
   * @param fb - Servicio para construir formularios reactivos.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query,
    public fb: FormBuilder
  ) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario reactivo y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.solicitudForm = this.fb.group({
      /** Seleccione Tipo Operación */
      tipoOperacion: [this.solicitud260910State.tipoOperacion, [Validators.required]],
      /** Justificación */
      observaciones: [{ value: this.solicitud260910State.observaciones, disabled: true }, [Validators.required]],
      /** RFC del responsable sanitario */
      rfcSanitario: [{ value: this.solicitud260910State.rfcSanitario, disabled: true }, [Validators.required]],

      /** Razón social del solicitante. */
      razonSocial: [
        { value: this.solicitud260910State.razonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Correo electrónico del solicitante con validación de patrón. */
      correoElectronico: [
        { value: this.solicitud260910State.correoElectronico, disabled: true },
        [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
      /** Código postal del domicilio del solicitante. */
      codigoPostal: [
        { value: this.solicitud260910State.codigoPostal, disabled: true },
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Estado asociado al domicilio. */
      estado: [this.solicitud260910State.estado, [Validators.required]],
      /** Municipio del domicilio del solicitante. */
      municipio: [
        { value: this.solicitud260910State.municipio, disabled: true },
        [Validators.required],
      ],
      /** Localidad del domicilio. */
      localidad: [
        { value: this.solicitud260910State.localidad, disabled: true },
      ],
      /** Colonia del domicilio. */
      colonia: [{ value: this.solicitud260910State.colonia, disabled: true }],
      /** Calle del domicilio. */
      calle: [
        { value: this.solicitud260910State.calle, disabled: true },
        [Validators.required, Validators.maxLength(68)],
      ],
      /** Código LADA del número telefónico del solicitante. */
      lada: [{ value: this.solicitud260910State.lada, disabled: true }],
      /** Número telefónico con validación de longitud y formato. */
      telefono: [
        { value: this.solicitud260910State.telefono, disabled: true },
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(REGEX_TELEFONO),
        ],
      ],
      /** Indicador de aviso de funcionamiento del solicitante. */
      avisoDeFuncionamiento: [this.solicitud260910State.avisoDeFuncionamiento],
      /** Licencia sanitaria del solicitante. */
      licenciaSanitaria: [{ value: this.solicitud260910State.licenciaSanitaria, disabled: true }],
      /** Estado del producto (fresco, congelado o vivo). */
      liveFreshFrozen: [this.solicitud260910State.liveFreshFrozen],
      /** Régimen asociado al trámite. */
      regimen: [this.solicitud260910State.regimen, [Validators.required]],
      /** Aduana asociada al trámite. */
      aduana: [this.solicitud260910State.aduana, [Validators.required]],
      /** Indicador de selección "hacerlos". */
      hacerlos: [this.solicitud260910State.hacerlos, [Validators.required]],
      /** RFC del solicitante. */
      rfc: [
        this.solicitud260910State.rfc,
        [Validators.required, Validators.maxLength(13)],
      ],
      /** Razón social del representante legal. */
      legalRazonSocial: [
        { value: this.solicitud260910State.legalRazonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido paterno del solicitante. */
      apellidoPaterno: [
        { value: this.solicitud260910State.apellidoPaterno, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido materno del solicitante. */
      apellidoMeterno: [
        { value: this.solicitud260910State.apellidoMeterno, disabled: true },
        [Validators.maxLength(30)],
      ],
      /** Indicador de manifiesto en el estado actual. */
      manifesto: [this.solicitud260910State.manifesto],
    });

    this.claveSCIANForm = this.fb.group({
      /** Seleccione Clave SCIAN */
      claveSCIAN: [this.solicitud260910State.claveSCIAN, [Validators.required]],
      /** Seleccione Descripcion del SCIAN */
      claveSCIANDesc: [this.solicitud260910State.claveSCIANDesc, [Validators.required]]
    });

    // Observa cambios en el estado de la solicitud y actualiza el formulario reactivo.
    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.solicitudForm.patchValue({
            tipoOperacion: this.solicitud260910State.tipoOperacion,
            observaciones: this.solicitud260910State.observaciones,
            rfcSanitario: this.solicitud260910State.rfcSanitario,
            razonSocial: this.solicitud260910State.razonSocial,
            correoElectronico: this.solicitud260910State.correoElectronico,
            codigoPostal: this.solicitud260910State.codigoPostal,
            estado: this.solicitud260910State.estado,
            municipio: this.solicitud260910State.municipio,
            localidad: this.solicitud260910State.localidad,
            colonia: this.solicitud260910State.colonia,
            calle: this.solicitud260910State.calle,
            lada: this.solicitud260910State.lada,
            telefono: this.solicitud260910State.telefono,
            claveSCIAN: this.solicitud260910State.claveSCIAN,
            claveSCIANDesc: this.solicitud260910State.claveSCIANDesc,
            avisoDeFuncionamiento:
              this.solicitud260910State.avisoDeFuncionamiento,
            licenciaSanitaria: this.solicitud260910State.licenciaSanitaria,
            liveFreshFrozen: this.solicitud260910State.liveFreshFrozen,
            regimen: this.solicitud260910State.regimen,
            aduana: this.solicitud260910State.aduana,
            hacerlos: this.solicitud260910State.hacerlos,
            rfc: this.solicitud260910State.rfc,
            legalRazonSocial: this.solicitud260910State.legalRazonSocial,
            apellidoPaterno: this.solicitud260910State.apellidoPaterno,
            apellidoMeterno: this.solicitud260910State.apellidoMeterno,
            manifesto: this.solicitud260910State.manifesto,
          });
          this.claveSCIANForm.patchValue({
            claveSCIAN: this.solicitud260910State.claveSCIAN,
            claveSCIANDesc: this.solicitud260910State.claveSCIANDesc,
          });
          this.mercanciasDatos = this.solicitud260910State.mercanciasDatos;
          this.SCIANDatos = this.solicitud260910State.SCIANDatos;
        })
      )
      .subscribe();

    // Obtiene catálogos y datos relacionados con la aplicación.
    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
    this.obtenerMercanciaListo();
    this.obtenerSolicitud();
    this.obtenerSCIANMesa();
    this.obtenerSCIANListo();
    this.obtenerSCIANDescListo();
  }

  /**
   * Muestra u oculta el panel plegable.
   * Cambia el estado de la propiedad `colapsable`.
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene los datos iniciales de la solicitud y los actualiza en el estado.
   */
  obtenerSolicitud(): void {
    this.solicitudDatosService
      .obtenerSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Solicitud) => {
          this.solicitud260910Store.setRfcSanitario(respuesta.rfcSanitario);
          this.solicitud260910Store.setRazonSocial(respuesta.razonSocial);
          this.solicitud260910Store.setCorreoElectronico(
            respuesta.correoElectronico
          );
          this.solicitud260910Store.setCodigoPostal(respuesta.codigoPostal);
          this.solicitud260910Store.setMunicipio(respuesta.municipio);
          this.solicitud260910Store.setLocalidad(respuesta.localidad);
          this.solicitud260910Store.setColonia(respuesta.colonia);
          this.solicitud260910Store.setCalle(respuesta.calle);
          this.solicitud260910Store.setLada(respuesta.lada);
          this.solicitud260910Store.setTelefono(respuesta.telefono);
          this.solicitud260910Store.setAvisoDeFuncionamiento(respuesta.avisoDeFuncionamiento);
          this.solicitud260910Store.setLegalRazonSocial(
            respuesta.legalRazonSocial
          );
          this.solicitud260910Store.setApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud260910Store.setApellidoMeterno(
            respuesta.apellidoMeterno
          );
        },
      });
  }

  /**
   * Obtiene el catálogo de estados desde el servicio y actualiza la variable `estadoCatalogo`.
   */
  obtenerEstadoCatalogo(): void {
    this.solicitudDatosService
      .obtenerEstadoCatalogo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.estadoCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos de la aplicación relacionados con la solicitud,
   * incluyendo encabezados, filas de la tabla y opciones de selección.
   * Actualiza las propiedades correspondientes con los valores obtenidos.
   */
  obtenerDatosDeAplicacion(): void {
    this.solicitudDatosService
      .obtenerDatosDeSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DatosDeSolicitud) => {
          this.solicitudDatos = respuesta.tablaFilaDatos;
          this.hacerlosRadioOptions = respuesta.hacerlosRadioOptions;
          this.tableDataSCIAN = respuesta.tablaFilaDatos[0]?.SCIANLista;
          this.tipoOperacionRadioOptions = respuesta.tipoOperacionOptions;
        },
      });
  }

  /**
   * Obtiene la lista de mercancías desde el servicio y actualiza el estado en el Store.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService
      .obtenerMercanciaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (res: Mercancia[]) => {
          this.solicitud260910Store.setMercanciasDatos(res);
        },
      });
  }

  /**
   * Obtiene la lista de mercancías desde el servicio y actualiza el estado en el Store.
   */
  obtenerSCIANMesa(): void {
    this.solicitudDatosService
      .obtenerSCIANMesa()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (res: SCIAN[]) => {
          this.solicitud260910Store.setSCIANDatos(res);
        },
      });
  }

  /**
   * Obtiene el catálogo de regímenes desde el servicio y actualiza la variable `regimenCatalogo`.
   */
  obtenerRegimenDestinaraListo(): void {
    this.solicitudDatosService
      .obtenerRegimenDestinaraListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.regimenCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene el catálogo de aduanas desde el servicio y actualiza la variable `aduanaCatalogo`.
   */
  obtenerAduanaListo(): void {
    this.solicitudDatosService
      .obtenerAduanaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.aduanaCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene el catálogo de SCIAN desde el servicio y actualiza la variable `SCIANCatalogo`.
   */
  obtenerSCIANListo(): void {
    this.solicitudDatosService
      .obtenerSCIANListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.SCIANCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene el catálogo de SCIAN desde el servicio y actualiza la variable `SCIANDescCatalogo`.
   */
  obtenerSCIANDescListo(): void {
    this.solicitudDatosService
      .obtenerSCIANDescListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.SCIANDescCatalogo = respuesta;
        },
      });
  }

  /**
   * Abre el modal para modificar mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openModificarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para modificar mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openAgregarSCIAN(): void {
    if (this.modalElementSCIAN) {
      const MODAL_INSTANCE_SCIAN = new Modal(this.modalElementSCIAN.nativeElement);
      MODAL_INSTANCE_SCIAN.show();
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openAgregarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Actualiza el estado seleccionado en el Store.
   * @param evento - Objeto del catálogo que contiene el estado seleccionado.
   */
  setEstado(evento: Catalogo): void {
    this.solicitud260910Store.setEstado(evento.id);
  }

  /**
   * Actualiza la licencia sanitaria en el Store.
   * @param evento - Evento que contiene el valor de la licencia sanitaria.
   */
  setLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setLicenciaSanitaria(VALOR);
  }

  /**
   * Actualiza el régimen seleccionado en el Store.
   * @param evento - Objeto del catálogo que contiene el régimen seleccionado.
   */
  setRegimen(evento: Catalogo): void {
    this.solicitud260910Store.setRegimen(evento.id);
  }

  /**
   * Actualiza la aduana seleccionada en el Store.
   * @param evento - Objeto del catálogo que contiene la aduana seleccionada.
   */
  setAduana(evento: Catalogo): void {
    this.solicitud260910Store.setAduana(evento.id);
  }

  /**
   * Actualiza la SCIAN seleccionada en el Store.
   * @param evento - Objeto del catálogo que contiene la SCIAN seleccionada.
   */
  setClaveSCIAN(evento: Catalogo): void {
    this.solicitud260910Store.setClaveSCIAN(evento.id);
  }

  /**
   * Actualiza la descripcion del SCIAN seleccionada en el Store.
   * @param evento - Objeto del catálogo que contiene la SCIAN seleccionada.
   */
  setClaveSCIANDesc(evento: Catalogo): void {
    this.solicitud260910Store.setClaveSCIANDesc(evento.id);
  }

  /**
   * Actualiza el valor de "hacerlos" en el Store.
   * @param evento - Valor seleccionado para la propiedad "hacerlos".
   */
  setHacerlos(evento: number | string): void {
    this.solicitud260910Store.setHacerlos(evento);
  }

  /**
   * Actualiza el valor de "TipoOperacion" en el Store.
   * @param evento - Valor seleccionado para la propiedad "TipoOperacion".
   */
  setTipoOperacion(evento: number | string): void {
    this.solicitud260910Store.setTipoOperacion(evento);
    if (this.solicitudForm.get('tipoOperacion')?.value === 'PRO') {
      this.solicitudForm.get('observaciones')?.disable();
      this.solicitudForm.get('rfcSanitario')?.disable();
      this.solicitudForm.get('razonSocial')?.disable();
      this.solicitudForm.get('correoElectronico')?.disable();
      this.solicitudForm.get('codigoPostal')?.disable();
      this.solicitudForm.get('estado')?.disable();
      this.solicitudForm.get('municipio')?.disable();
      this.solicitudForm.get('localidad')?.disable();
      this.solicitudForm.get('colonia')?.disable();
      this.solicitudForm.get('calle')?.disable();
      this.solicitudForm.get('lada')?.disable();
      this.solicitudForm.get('telefono')?.disable();
    } else {
      this.solicitudForm.get('observaciones')?.enable();
      this.solicitudForm.get('rfcSanitario')?.enable();
      this.solicitudForm.get('razonSocial')?.enable();
      this.solicitudForm.get('correoElectronico')?.enable();
      this.solicitudForm.get('codigoPostal')?.enable();
      this.solicitudForm.get('estado')?.enable();
      this.solicitudForm.get('municipio')?.enable();
      this.solicitudForm.get('localidad')?.enable();
      this.solicitudForm.get('colonia')?.enable();
      this.solicitudForm.get('calle')?.enable();
      this.solicitudForm.get('lada')?.enable();
      this.solicitudForm.get('telefono')?.enable();
    }

  }

  /**
   * Actualiza el RFC en el Store.
   * @param evento - Evento que contiene el valor del RFC.
   */
  setRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setRfc(VALOR);
  }

  /**
   * Obtiene los datos seleccionados de mercancías desde el eventoo.
   * @param evento - Lista de mercancías seleccionadas.
   */
  getMercanciasDatos(evento: Mercancia[]): void {
    this.selectedMercanciasDatos = evento;
  }

  /**
   * Obtiene los datos seleccionados de SCIAN desde el eventoo.
   * @param evento - Lista de SCIAN seleccionadas.
   */
  getSCIANDatos(evento: SCIAN[]): void {
    this.seleccionaSCIANDatos = evento;
  }

  /**
   * Elimina la primera mercancía seleccionada de la lista en el Store.
   */
  eliminarMercancias(): void {
    if (this.selectedMercanciasDatos.length > 0) {
      this.solicitud260910Store.removeMercanciaDatos(
        this.selectedMercanciasDatos[0]
      );
    }
  }

  /**
   * Elimina la primera SIAN seleccionada de la lista en el Store.
   */
  eliminarSCIAN(): void {
    if (this.seleccionaSCIANDatos.length > 0) {
      this.solicitud260910Store.eliminarSCAINDatos(
        this.seleccionaSCIANDatos[0]
      );
    }
  }

  agregarSCIAN(): void {
    const OBJETO_JSON = {
      claveSCIAN: this.claveSCIANForm.get(
        'claveSCIAN'
      )?.value,
      claveSCIANDesc: this.claveSCIANForm.get(
        'claveSCIANDesc'
      )?.value
    };
    this.solicitud260910Store.addSCIANDatos(OBJETO_JSON);
  }

  /**
   * Selecciona un tipo específico y realiza acciones basadas en el tipo seleccionado.
   * 
   * @param tipo - El tipo seleccionado. Actualmente soporta el valor 'Mercancias'.
   *               Si el tipo es 'Mercancias', se ejecuta la función `eliminarMercancias`.
   */
  seleccionaTipo(tipo: string): void {
    if(tipo === 'Mercancias') {
      this.eliminarMercancias();
    } else if(tipo === 'SCIAN') {
      this.eliminarSCIAN();
    }
  }

  /**
   * @description Muestra un modal de confirmación para eliminar mercancías.
   * Si el elemento del modal de confirmación está definido, se crea una instancia
   * del modal y se muestra al usuario.
   *
   * @method confirmarEliminarMercancias
   * @returns {void} No retorna ningún valor.
   */
  confirmarEliminarMercancias(tipo: string): void {
    this.seleccionadoTipo = tipo;
    if (this.modalConfirmarElement) {
      const MODAL_CONFIRMAR_INSTANCE = new Modal(this.modalConfirmarElement.nativeElement);
      MODAL_CONFIRMAR_INSTANCE.show();
    }
  }

  /**
   * Actualiza el estado del producto como fresco, congelado o vivo en el Store.
   */
  setLiveFreshFrozen(): void {
    const FROZEN_CHECKBOX = this.solicitudForm.get('liveFreshFrozen')?.value;
    this.solicitud260910Store.setLiveFreshFrozen(FROZEN_CHECKBOX);
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento en el Store.
   * @param evento - Evento que contiene el valor del indicador.
   */
  setAvisoDeFuncionamiento(): void {
    const AVISO_CHECKBOX = this.solicitudForm.get('avisoDeFuncionamiento')?.value;
    this.solicitud260910Store.setAvisoDeFuncionamiento(AVISO_CHECKBOX);
    if (this.solicitudForm.get('avisoDeFuncionamiento')?.value === true) {
      this.solicitudForm.get('licenciaSanitaria')?.disable();
    } else {
      this.solicitudForm.get('licenciaSanitaria')?.enable();
    }
  }

  /**
   * Actualiza el indicador de manifiesto en el Store.
   * @param evento - Evento que contiene el valor del indicador.
   */
  setManifesto(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud260910Store.setManifesto(VALOR);
  }

  /**
     * compodoc
     * method setValoresStore
     * description Actualiza el valor de un campo en el almacén de estado.
     * Este método se utiliza para sincronizar los valores del formulario con el estado global de la aplicación.
     * param {FormGroup} form - El formulario reactivo que contiene los datos.
     * param {string} campo - El nombre del campo que se desea actualizar.
     * param {keyof Sanitario260211Store} metodoNombre - El método del almacén que se invocará para actualizar el valor.
     * returns {void}
     */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud260910Store): void {
    const VALOR = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
    (this.solicitud260910Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
  }

  /**
   * Muestra el modal para la selección del establecimiento.
   */
  seleccionarEstablecimiento(): void {
    if (this.modalAlertaElement) {
      const MODAL_ALERTA_INSTANCE = new Modal(this.modalAlertaElement.nativeElement);
      MODAL_ALERTA_INSTANCE.show();
    }
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Libera los recursos y elimina las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
