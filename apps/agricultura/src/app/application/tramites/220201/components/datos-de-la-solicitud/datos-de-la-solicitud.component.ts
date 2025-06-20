import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { SELECCIONADO, TEXTOS } from '../../constantes/certificado-zoosanitario.enum';

import {AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioQuery, InputRadioComponent, Notificacion, NotificacionesComponent, RespuestaCatalogos, SharedModule, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';

import { HttpClient } from '@angular/common/http';

import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';

import { FilaSolicitud, SolicitudData } from '../../models/220201/capturar-solicitud.model';
import {Subject, debounceTime, map, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

/**
 * @fileoverview Componente para la gestión del formulario de datos de la solicitud.
 * Este componente maneja la lógica y la presentación del formulario de datos de la solicitud,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module datosDeLaSolicitud --220201
 */

/**
 * Componente para el formulario de datos de la solicitud.
 * @class DatosDeLaSolicitudComponent --220201
 * @implements {OnInit, OnDestroy, AfterViewInit}
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
  standalone: true,
  imports:[SharedModule,
           CommonModule,
           TituloComponent,
           ReactiveFormsModule,
           CatalogoSelectComponent,
           InputRadioComponent,
           AlertComponent,
           TablaDinamicaComponent,
           NotificacionesComponent]
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Constantes de texto.
   * @property {string} TEXTOS
   */
  TEXTOS: string = TEXTOS;

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;

  /**
   * Grupo de formularios anidado para los datos de la solicitud.--220201
   * @property {FormGroup} datosDelaSolicitud
   */
  datosDelaSolicitud!: FormGroup;

  /**
   * Configuración para el select de aduana de ingreso. --220201
   * @property {Catalogo[]} aduanaDeIngreso
   */
  aduanaDeIngreso: Catalogo[] = [];

  /**
   * Configuración para el select de sanidad agropecuaria. --220201
   * @property {Catalogo[]} sanidadAgropecuaria
   */
  sanidadAgropecuaria: Catalogo[] = [];

  /**
   * Configuración para el select de punto de inspección.--220201
   * @property {Catalogo[]} puntoInspeccion
   */
  puntoInspeccion: Catalogo[] = [];

  /**
   * Configuración para el select de establecimiento TIF.--220201
   * @property {Catalogo[]} establecimientoTIF
   */
  establecimientoTIF: Catalogo[] = [];

  /**
   * Configuración para el select de veterinario.--220201
   * @property {Catalogo[]} veterinario
   */
  veterinario: Catalogo[] = [];
  id?: number;
  descripcion: string = '';
  tam?: string;
  dpi?: string

  /**
   * Configuración para el select de régimen.--220201
   * @property {Catalogo[]} regimen
   */
  regimen: Catalogo[] = [];

  /**
   * @property moduloEmergente
   * @description Indica si el módulo emergente está activo.
   * @type {boolean}
   * @default false
   */
  public moduloEmergente: boolean = false;

  /**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = [
    {
      "label": "Animales Vivos",
      "value": "yes"
    },
    {
      "label": "Productos Subproductos",
      "value": "no"
    },
  ];

  /**
   * @desc Arreglo que contiene las filas de la solicitud.
   * @type {FilaSolicitud[]}
   * @remarks
   * Cada elemento representa una fila con los datos específicos de la solicitud.
   * @see FilaSolicitud
   */
  cuerpoTabla: FilaSolicitud[] = [];

  /**
   * @description
   * Arreglo que almacena los elementos del cuerpo de la mesa.
   * @type {string[]}
   */
  mesaCuerpo: string[] = [];

  /**
   * @description
   * Tipo de selección para la solicitud.
   * Utiliza la enumeración TablaSeleccion para definir el tipo de selección.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @description
   * Tipo de selección para la solicitud de mercancías.
   * Utiliza la enumeración TablaSeleccion para definir el tipo de selección.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Configuración de las columnas para la tabla de solicitudes.
   * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
   * @type {ConfiguracionColumna<FilaSolicitud>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificadoInternacional, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
    { encabezado: 'Descripción Nico', clave: (fila) => fila.descripcionNico, orden: 8 },
    { encabezado: 'Descripción', clave: (fila) => fila.descripcion, orden: 9 },
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.unidadDeMedidaDeTarifaUMT, orden: 10 },
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 11 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.unidadDeMedidaDeComercializacionUMC, orden: 12 },
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 13 },
    { encabezado: 'Especie', clave: (fila) => fila.especie, orden: 14 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 15 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisDeOrigen, orden: 16 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisDeProcedencia, orden: 17 },
    { encabezado: 'Certificado Internacional Electrónico', clave: (fila) => fila.certificadoInternacionalElectronico, orden: 18 },
  ];

  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Notificador para destruir el componente.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Indica si el formulario es de solo lectura.
   * @property {boolean} esFormularioSoloLectura
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Valor seleccionado.
   * @property {string} seleccionado
   */
  seleccionado: string = SELECCIONADO;

  /**
   * @description Indica si la notificación ha sido verificada o marcada.
   * @type {boolean}
   * @memberof DatosDeLaSolicitudComponent
   */
  notificationCheck: boolean = false;

  /**
   * @description
   * Configuración de las columnas para la tabla de solicitudes de datos.
   * Utiliza la interfaz ConfiguracionColumna para definir las columnas.
   * @type {ConfiguracionColumna<SolicitudData>[]}
   */
  configuracionColumnasSolicitud: ConfiguracionColumna<SolicitudData>[] = [
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 1 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 2 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad, orden: 3 },
    { encabezado: 'Proovedor', clave: (fila) => fila.proovedor, orden: 4 },
  ];

  /**
   * @description
   * Cuerpo de la tabla de solicitudes con datos de ejemplo.
   * Este arreglo contiene objetos que representan las filas de la tabla.
   * @type {SolicitudData[]}
   */
  cuerpoTablaSolicitud: SolicitudData[] = [
    {
      fechaCreacion: '2025-06-17 10:30:00',
      mercancia: 'Laptop HP',
      cantidad: 5,
      proovedor: 'Tech Solutions Inc.'
    },
    {
      fechaCreacion: '2025-06-16 14:15:30',
      mercancia: 'Monitor Dell 27"',
      cantidad: 10,
      proovedor: 'Global Electronics'
    },
    {
      fechaCreacion: '2025-06-15 09:00:00',
      mercancia: 'Teclado Mecánico RGB',
      cantidad: 8,
      proovedor: 'Peripherals World'
    },
    {
      fechaCreacion: '2025-06-14 17:45:10',
      mercancia: 'Mouse Inalámbrico Logitech',
      cantidad: 12,
      proovedor: 'Tech Accessories Co.'
    },
    {
      fechaCreacion: '2025-06-13 11:20:05',
      mercancia: 'Impresora Epson EcoTank',
      cantidad: 3,
      proovedor: 'Print Masters'
    }
  ];

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--220201
   * @param {CertificadoZoosanitarioServiceService} certificadoZoosanitarioServices - Servicio para lógica de certificado zoosanitario.
   * @param {ZoosanitarioQuery} certificadoZoosanitarioQuery - Consulta para acceder al estado del certificado zoosanitario.
   * @param {ConsultaioQuery} consultaQuery - Consulta para determinar si el formulario es de solo lectura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly httpServicios: HttpClient,
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private readonly certificadoZoosanitarioQuery: ZoosanitarioQuery,
    private consultaQuery: ConsultaioQuery
  ) {
    this.obtenerListasDesplegables();
  }

  /**
   * Crea el grupo de formularios principal.
   * @method crearFormulario
   */
  crearFormulario(): void {
    this.forma = this.fb.group({
      datosDelaSolicitud: this.fb.group({}),
    });
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.initActionFormBuild();
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'No existe información para la clave UCON: aaaaaaa123##aaa y RFC: LEQI8101314S7 proporcionados. Favor de verificar.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'OK',
      txtBtnCancelar: '',
    };
  }

  /**
   * Ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * @method ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.datosDelaSolicitud.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe(() => {
      const FORMA_VALIDA_ACTUALIZADA = {
        dataDeLaSolicitud: false,
      };
      if (this.datosDelaSolicitud.valid) {
        FORMA_VALIDA_ACTUALIZADA.dataDeLaSolicitud = true;
      }
      this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          if (this.esFormularioSoloLectura) {
            this.datosDelaSolicitud.disable();
          }
        })
      )
      .subscribe();
    this.datosDelaSolicitud.get('claveUCON')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        if (value.length < 5) {
          this.moduloEmergente = false;
        } else {
          const PATTERN = /^UCON[a-zA-Z0-9]{4,10}$/;
          this.moduloEmergente = !PATTERN.test(value);
        }
      });
  }

  /**
   * Inicializa el grupo de formularios anidado para los datos de la solicitud.
   * @method initActionFormBuild
   */
  initActionFormBuild(): void {
    this.datosDelaSolicitud = this.fb.group({
      tipoMercancia: ['yes', Validators.required],
      aduanaIngreso: ['', Validators.required],
      oficinaInspeccion: ['', Validators.required],
      puntoInspeccion: ['', Validators.required],
      claveUCON: [''],
      establecimientoTIF: [''],
      nombreVeterinario: [''],
      numeroGuia: [''],
      certficacion: [''],
      regimen: ['', Validators.required],
    });
    this.certificadoZoosanitarioQuery.seleccionarDatosSolicitud$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datosDeLaSolicitud) => {
      if (datosDeLaSolicitud) {
        this.datosDelaSolicitud.patchValue(datosDeLaSolicitud);
      }
    });
    this.forma.setControl('datosDelaSolicitud', this.datosDelaSolicitud);
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
    this.obtenerSanidadAgropecuariaList();
    this.obtenerPuntoInspeccionList();
    this.obtenerEstablecimientoList();
    this.obtenerVeterinarioList();
    this.obtenerRegimenList();
  }

  /**
   * Obtiene la lista para el select de aduana de ingreso.
   * @method obtenerIngresoSelectList
   */
  obtenerIngresoSelectList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/aduana_de_ingreso.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.aduanaDeIngreso = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de sanidad agropecuaria.
   * @method obtenerSanidadAgropecuariaList
   */
  obtenerSanidadAgropecuariaList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/oficina_de_inspeccion.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.sanidadAgropecuaria = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de punto de inspección.
   * @method obtenerPuntoInspeccionList
   */
  obtenerPuntoInspeccionList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/punto.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.puntoInspeccion = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de establecimiento.
   * @method obtenerEstablecimientoList
   */
  obtenerEstablecimientoList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/establecimiento.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.establecimientoTIF = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de veterinario.
   * @method obtenerVeterinarioList
   */
  obtenerVeterinarioList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/nombre.json').pipe(takeUntil(this.destroyNotifier$)).subscribe((data): void => {
      const DATOS = data?.data;
      this.veterinario = DATOS;
    });
  }

  /**
   * Obtiene la lista para el select de régimen.
   * @method obtenerRegimenList
   */
  obtenerRegimenList(): void {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/regimen.json').pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      const DATOS = data?.data;
      this.regimen = DATOS;
    });
  }

  /**
   * Actualiza los datos almacenados en el store.
   * @method setValoresStore
   */
  setValoresStore(): void {
    const VALOR = this.datosDelaSolicitud.value;
    this.certificadoZoosanitarioServices.updateDatosDeLaSolicitud(VALOR);
  }

  /**
   * Maneja la selección del botón de radio y actualiza el store.
   * @method radioBotonSeleccionado
   */
  radioBotonSeleccionado(): void {
    const VALOR = this.datosDelaSolicitud.value.tipoMercancia;
    if (VALOR !== '' && VALOR !== null && VALOR !== undefined) {
      this.notificationCheck = true;
    } else {
      this.notificationCheck = false;
    }
    this.setValoresStore();
  }

  /**
   * Elimina un pedimento de la lista si el parámetro `borrar` es verdadero.
   * @method eliminarPedimento
   * @param borrar - Indica si se debe eliminar el pedimento seleccionado.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.moduloEmergente = false;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Se utiliza para emitir una notificación y completar el observable `destroyNotifier$`, 
   * permitiendo limpiar suscripciones y evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}