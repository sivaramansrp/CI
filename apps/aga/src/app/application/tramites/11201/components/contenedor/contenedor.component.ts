import { Aduanas } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { AlertComponent, Notificacion, NotificacionesComponent, Pedimento } from '@libs/shared/data-access-user/src';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosDelContenedor } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { EventEmitter } from '@angular/core';
import { FECHA_INGRESO } from '../../../../core/enums/11201/tramite11201.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha, } from '@libs/shared/data-access-user/src';
import { InputFechaComponent, } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { REGEX_NUMEROS } from '@libs/shared/data-access-user/src';
import { REGEX_REEMPLAZAR } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud11201State } from '../../../../core/estados/tramites/tramite11201.store';
import { Subject } from 'rxjs';
import { TEXTOS } from '../../../../core/enums/11201/tramite11201.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TemplateRef } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite11201Query } from '../../../../core/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import moment from 'moment';
import { takeUntil } from 'rxjs';


/**
 * Componente para gestionar la solicitud de contenedores.
 */
@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrl: './contenedor.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    NotificacionesComponent,
  ],
  providers: [BsModalService],
})
export class ContenedorComponent implements OnInit, OnDestroy {
  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * 
   * @type {Notificacion}
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Lista de objetos de tipo Pedimento asociados al componente.
   * 
   * Esta propiedad almacena un arreglo de pedimentos que pueden ser utilizados
   * para mostrar, manipular o procesar información relacionada con los trámites
   * dentro del componente contenedor.
   */
  public pedimentos: Array<Pedimento> = [];

  /**
   * Identificador numérico del elemento que se desea eliminar.
   * 
   * Esta propiedad almacena el ID del elemento seleccionado para su eliminación
   * dentro del componente. Se debe asignar antes de realizar la operación de borrado.
   */
  public elementoParaEliminar!: number;

  /**
   * Bandera para indicar si se debe mostrar el contenedor.
   */
  radioContenedor:boolean = false;
 
  /**
   * Bandera para indicar si se debe mostrar el archivo CSV.
   */
  radioArchivoCsv:boolean = false
 
  /**
   * Bandera para indicar si se debe mostrar el manifiesto.
   */
  radioManifesto:boolean = false;

  @Output() cancelarEvento = new EventEmitter<void>();
  /**
   * Representa la fecha de inicio ingresada por el usuario.
   *
   * @type {InputFecha}
   * @default FECHA_INGRESO
   */
  public fechaInicioInput: InputFecha = FECHA_INGRESO;
  /**
   * Formulario principal de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Bandera para mostrar la sección de adjuntar archivo.
   */
  mostrarAdjuntarArchivo: boolean = false;

  /**
   * Bandera para mostrar la sección de aduana y fecha.
   */
  mostrarSeccionAduanaaFecha: boolean = false;

  /**
   * Bandera para mostrar la sección de contenedor.
   */
  mostrarSeccionContenedor: boolean = false;

  /**
   * Bandera para mostrar la sección de número de manifiesto.
   */
  mostrarSeccionNoManifiesto: boolean = false;

  /**
   * Bandera para mostrar la tabla de cargar archivo.
   */
  mostrarCargarArchivoTable: boolean = false;

  /**
   * Bandera para mostrar la tabla de archivo seleccionado.
   */
  mostrarArchivoSeleccionadoTable: boolean = false;

  /**
   * Bandera para mostrar la sección de Excel.
   */
  mostrarSeccionExcel: boolean = false;

  /**
   * Bandera para mostrar el mensaje.
   */
  mostrarMensaje: boolean = false;

  /**
   * Mensaje de campos obligatorios.
   */
  mensajeCamposObligatorios: string = '* Campos obligatorios';

  /**
   * Lista de aduanas.
   */
  aduanaList: {
    catalogos: Aduanas[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Lista de contenedores.
   */
  contenedores: {
    catalogos: Catalogo[];
    labelNombre: string;
    primerOpcion: string;
  };

  /**
   * Bandera para requerir guardado parcial.
   */
  requiereGuardadoParcial: boolean = false;

  /**
   * Índice actual.
   */
  corrienteIdx: number = 0;

  /**
   * Lista de catálogos.
   */
  @Input() catalogoList: Catalogo[] = [];

  /**
   * Lista de transporte.
   */
  transporteList: {
    catalogos: Catalogo[];
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
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: any[] = [];

  /**
   * Obtener el valor de la instrucción e inicializar la variable.
   */
  TEXTOS = TEXTOS;

  /**
   * Estado de la solicitud.
   */
  public solicitud11201State!: Solicitud11201State;

  /**
   * Sujeto para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Elemento de entrada de archivo HTML.
   *
   * @type {HTMLInputElement}
   */
  entradaArchivo!: HTMLInputElement;

  /**
   * Archivo de medicamentos seleccionado.
   */
  archivoMedicamentos: File | null = null;

  /**
   * Etiqueta del archivo seleccionado.
   */
  etiquetaDeArchivo: string = 'Sin archivo seleccionados';

  archivoNoEsCSV: boolean = false;

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosDelContenedor>[] = [
    { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
    {
      encabezado: 'Iniciales del equipo',
      clave: (artículo) => artículo.inicialesEquipo,
      orden: 1,
    },
    {
      encabezado: 'Número de equipo',
      clave: (artículo) => artículo.numeroEquipo,
      orden: 2,
    },
    {
      encabezado: 'Dígito Verificador',
      clave: (artículo) => artículo.digitoVerificador,
      orden: 3,
    },
    {
      encabezado: 'Tipo de equipo',
      clave: (artículo) => artículo.tipoEquipo,
      orden: 4,
    },
    { encabezado: 'Aduana', clave: (artículo) => artículo.aduana, orden: 5 },
    {
      encabezado: 'Fecha Ingreso',
      clave: (artículo) => artículo.fechaIngreso,
      orden: 6,
    },
    {
      encabezado: 'Vigencia',
      clave: (artículo) => artículo.vigencia,
      orden: 7,
    },
    {
      encabezado: 'Estado de constancia',
      clave: (artículo) => artículo.estadoConstancia,
      orden: 8,
    },
    {
      encabezado: 'Existe en VUCEM',
      clave: (artículo) => artículo.existeEnVUCEM,
      orden: 9,
    },
    {
      encabezado: 'Id constancia',
      clave: (artículo) => artículo.idConstancia,
      orden: 10,
    },
    {
      encabezado: 'Número manifiesto',
      clave: (artículo) => artículo.numeroManifiesto,
      orden: 11,
    },
    {
      encabezado: 'Id solicitud',
      clave: (artículo) => artículo.idSolicitud,
      orden: 12,
    },
    {
      encabezado: 'Fecha inicio',
      clave: (artículo) => artículo.fechaInicio,
      orden: 13,
    },
  ];

  /**
   * Referencia a la clase o enumeración `TablaSeleccion`.
   *
   * Esta propiedad se utiliza para acceder a las funcionalidades
   * o valores definidos en `TablaSeleccion` dentro del componente.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Datos del contenedor.
   */
  public datosDelContenedor: DatosDelContenedor[] = [];

  /**
   * Datos del modelo abierto.
   */
  abiertoModeloDatos: string = '';

  /**
   * Referencia al modal.
   */
  modalRef?: BsModalRef | null;

  /**
   * Plantilla del modal.
   */
  @ViewChild('plantillademodelo') plantillaDeModelo!: TemplateRef<Element>;

  /**
   * Evento para continuar.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private datosTramiteService: DatosTramiteService,
    private validacionesService: ValidacionesFormularioService,
    public tramite11201Store: Tramite11201Store,
    private tramite11201Query: Tramite11201Query,
    private modalService: BsModalService
  ) {
    this.transporteList = {
      catalogos: [],
      labelNombre: 'Tipo de transporte',
      primerOpcion: 'Seleccione un valor',
    };
    this.aduana = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
    this.aduanaList = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
    this.contenedores = {
      catalogos: [],
      labelNombre: 'Aduana/sección aduanera',
      primerOpcion: 'Seleccione un valor',
    };
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.tramite11201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitud11201State = {
            ...this.solicitud11201State,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarCatalogos();
    this.tabSeleccionado();
    this.fetchgetTransporteList();
    this.fetchAduanaList();
    this.loadDatosTablaData();
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  public inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoBusqueda: [
        this.solicitud11201State?.tipoBusqueda,
        Validators.required,
      ],
      aduana: [this.solicitud11201State?.aduana, Validators.required],
      fechaIngreso: [
        this.solicitud11201State?.fechaIngreso,
        Validators.required,
      ],
      inicialesContenedor: [
        this.solicitud11201State?.inicialesContenedor,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      numeroContenedor: [
        this.solicitud11201State?.numeroContenedor,
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9]+$'),
        ],
      ],
      digitoDeControl: [
        this.solicitud11201State?.digitoDeControl,
        [Validators.maxLength(1), Validators.pattern('^[0-9]$')],
      ],
      contenedores: [
        this.solicitud11201State?.contenedores,
        Validators.required,
      ],
      tipoTransporte: ['', Validators.required],
      menuDesplegable: [
        this.solicitud11201State.menuDesplegable,
        Validators.required,
      ],
      numeroManifiesta: [
        this.solicitud11201State.numeroManifiesta,
        [Validators.required, Validators.maxLength(50)],
      ],
      aduanaMenuDesplegable: [
        this.solicitud11201State.aduanaMenuDesplegable,
        Validators.required,
      ],
      archivoSeleccionado: [
        this.solicitud11201State?.archivoSeleccionado,
        Validators.required,
      ],
      fechaDeIngreso: [
        this.solicitud11201State?.fechaDeIngreso,
        Validators.required,
      ],
    });
    this.mostrarCampos();
    this.solicitudForm
      .get('inicialesContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(REGEX_REEMPLAZAR, '').toUpperCase();
          this.solicitudForm
            .get('inicialesContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(
            this.solicitudForm,
            'inicialesContenedor',
            'setInicialesContenedor'
          );
        }
      });

    this.solicitudForm
      .get('numeroContenedor')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(REGEX_REEMPLAZAR, '');
          this.solicitudForm
            .get('numeroContenedor')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(
            this.solicitudForm,
            'numeroContenedor',
            'setNumeroContenedor'
          );
        }
      });
    this.solicitudForm
      .get('digitoDeControl')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe((valor) => {
        if (valor) {
          const SANITIZED = valor.replace(REGEX_NUMEROS, '');
          this.solicitudForm
            .get('digitoDeControl')
            ?.setValue(SANITIZED, { emitEvent: false });
          this.setValoresStore(
            this.solicitudForm,
            'digitoDeControl',
            'setDigitoDeControl'
          );
        }
      });
    // Escuchar cambios en tipoBusqueda para mostrar secciones
    this.solicitudForm
      .get('tipoBusqueda')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        this.setValoresStore(
          this.solicitudForm,
          'tipoBusqueda',
          'setTipoBusqueda'
        );
        this.mostrarCampos();
      });

    // Escuchar cambios en tipoTransporte
    this.solicitudForm
      .get('aduana')
      ?.valueChanges.pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        this.setValoresStore(this.solicitudForm, 'aduana', 'setAduana');
        this.solicitudForm
          .get('fechaIngreso')
          ?.setValue(moment().format('YYYY-MM-DD'));
        this.setValoresStore(
          this.solicitudForm,
          'fechaIngreso',
          'setFechaIngreso'
        );
      });
  }
  /**
   * Cargar datos de la tabla.
   *
   * Este método obtiene los datos de la tabla desde el servicio `datosTramiteService`
   * y los almacena en la propiedad `datosTabla`. Utiliza `takeUntil` para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   *
   * @example
   * // Llamar al método para cargar los datos de la tabla
   * this.loadDatosTablaData();
   */
  loadDatosTablaData(): void {
    this.datosTramiteService
      .getDatosTableData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.datosTabla = data;
      });
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
    metodoNombre: keyof Tramite11201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite11201Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Cargar catálogos de datos.
   */
  cargarCatalogos(): void {
    // Cargar catálogo de contenedores
    this.datosTramiteService
      .getContenedores()
      .pipe(takeUntil(this.destroyNotifier$))
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.contenedores.catalogos = data.data;
      });
  }

  /**
   * Mostrar campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.solicitudForm.get('tipoBusqueda')?.value;
    this.mostrarAdjuntarArchivo = false;
    this.mostrarSeccionAduanaaFecha = false;
    this.mostrarSeccionContenedor = false;
    this.mostrarSeccionNoManifiesto = false;
    this.mostrarSeccionExcel = false;

    switch (TIPO_BUSQUEDA) {
      case 'Contenedor':
        this.mostrarSeccionContenedor = true;
        this.mostrarSeccionAduanaaFecha = true;
        this.radioContenedor = false;
        this.radioArchivoCsv = true;
        this.radioManifesto = true;
        break;
      case 'No. de Manifiesto':
        this.mostrarSeccionNoManifiesto = true;
        this.radioContenedor = true;
        this.radioArchivoCsv = true;
        this.radioManifesto = false;
        break;
      case 'Archivo CSV':
        this.mostrarAdjuntarArchivo = true;
        this.radioContenedor = true;
        this.radioArchivoCsv = false;
        this.radioManifesto = true;
        break;
      default:
        break;
    }
  }

  /**
   * Limpiar campos del formulario.
   */
  limpiarCampos(): void {
    this.solicitudForm.reset();
    // Resetear banderas y estados adicionales
    this.mostrarAdjuntarArchivo = false;
    this.mostrarSeccionAduanaaFecha = false;
    this.mostrarSeccionContenedor = false;
    this.mostrarSeccionNoManifiesto = false;
    this.mostrarSeccionExcel = false;
    this.mostrarMensaje = false;
    // Deshabilitar controles específicos si es necesario
    this.solicitudForm.get('archivoSeleccionado')?.disable();
  }

  /**
   * Validar si un campo es válido.
   * @param field Nombre del campo.
   * @returns Verdadero si el campo es válido, falso en caso contrario.
   */
  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.solicitudForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }

  /**
   * Validar el dígito verificador y agregar la solicitud.
   */
  validarDigitoVerificador(): void {
    this.solicitudForm.markAllAsTouched();
    const ADUANA = this.solicitudForm.value.aduana;
    const FECHAINGRESO = this.solicitudForm.value.fechaIngreso;
    const INICIALESCONTENEDOR = this.solicitudForm.value.inicialesContenedor;
    const NUMEROCONTENEDOR = this.solicitudForm.value.numeroContenedor;
    const CONTENEDORES = this.solicitudForm.value.contenedores;
    if (INICIALESCONTENEDOR && NUMEROCONTENEDOR && ADUANA && CONTENEDORES && FECHAINGRESO
 ) {
      this.agregarSolicitud();
    }
  }

  /**
   * Adjuntar archivo CSV y parsear su contenido.
   */
  adjuntarArchivo(): void {
        this.mostrarArchivoSeleccionadoTable = true;
  }

  /**
   * Cargar archivo CSV y parsear su contenido.
   */
  archivo(): void {
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = (e): void => {
        const TEXT = e.target?.result as string;
        this.analizarGramaticalmenteCSV(TEXT);
        this.mostrarCargarArchivoTable = true;
      };
      READER.readAsText(FILE);
    }
  }

  regresar(): void {
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    this.mostrarCargarArchivoTable = false;
    FILE_INPUT.value = '';
    this.etiquetaDeArchivo = 'Sin archivo seleccionados';
  }
  /**
   * Método para analizar una cadena CSV y convertirla en una lista de objetos.
   *
   * Este método toma una cadena CSV, la divide en líneas y luego en columnas, mapea los encabezados
   * a los nombres de las propiedades del objeto y finalmente asigna los valores correspondientes
   * a cada objeto. Los objetos resultantes se almacenan en `datosTabla`.
   *
   * @param {string} csv - La cadena CSV a analizar.
   *
   * @example
   * // Llamar al método para analizar una cadena CSV
   * this.analizarGramaticalmenteCSV('Aduana,Iniciales del equipo,Tipo de equipo,...\nValor1,Valor2,Valor3,...');
   */
  analizarGramaticalmenteCSV(csv: string): void {
    const LINES = csv.split('\n').filter((line) => line.trim() !== '');
    const HEADERS = LINES[0].split(',');
    const HEADER_MAP: { [key: string]: string } = {
      Id: 'id',
      Aduana: 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de equipo': 'tipoEquipo',
      'Número de equipo': 'numeroEquipo',
      'Dígito Verificador': 'digitoVerificador',
      'Fecha Ingreso': 'fechaIngreso',
      Vigencia: 'vigencia',
      'Estado de constancia': 'estadoConstancia',
      'Existe en VUCEM': 'existeEnVUCEM',
      'Id constancia': 'idConstancia',
      'Número manifiesto': 'numeroManifiesto',
      'Id solicitud': 'idSolicitud',
      'Fecha inicio': 'fechaInicio',
    };
    const DATA = LINES.slice(1)
      .map((line) => {
        const VALUES = line.split(',');
        const OBJ: { [key: string]: string } = {};
        HEADERS.forEach((header, index) => {
          const KEY = HEADER_MAP[header.trim()] || header.trim();
          OBJ[KEY] = VALUES[index]?.trim();
        });
        return OBJ;
      })
      .filter((artículo) => Object.values(artículo).some((valor) => valor));
    this.datosTabla = DATA;
  }

  /**
   * Envía el manifiesto después de validar el formulario de solicitud.
   *
   * Este método marca todos los campos del formulario como tocados y verifica
   * si los campos 'numeroManifiesta' y 'menuDesplegable' son válidos. Si ambos
   * campos son válidos, se muestra un mensaje.
   *
   * @returns {void}
   */
  enviarManifiesto(): void {
    this.solicitudForm.markAllAsTouched();
    if (
      this.solicitudForm.get('numeroManifiesta')?.valid &&
      this.solicitudForm.get('menuDesplegable')?.valid
    ) {
      this.mostrarMensaje = true;
    }
  }

  /**
   * Verifica si el formulario de solicitud es válido y, si es así,
   * implementa la lógica de pago y envía el formulario.
   * Si el formulario no es válido, muestra un mensaje de error.
   *
   * @returns {void}
   */
  esPago(): void {
    if (this.solicitudForm.valid) {
      // Implementar lógica de pago y envío del formulario
      this.datosTramiteService
        .submitSolicitud()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(() => {
          // Manejar envío exitoso
        });
    } else {
      this.mostrarMensaje = true;
    }
  }

  /**
   * Método que selecciona la pestaña actual basada en el índice almacenado en el localStorage.
   * Si el índice existe en el localStorage, lo convierte a número y lo asigna a la propiedad `corrienteIdx`.
   */
  tabSeleccionado(): void {
    const CURRENT_IDX = localStorage.getItem('corrienteIdx');
    if (CURRENT_IDX !== null) {
      this.corrienteIdx = Number(CURRENT_IDX);
    }
  }

  /**
   * Restablece los botones de radio y los campos relacionados en el formulario de solicitud.
   *
   * Este método se utiliza para limpiar el valor del campo 'tipoBusqueda' y
   * llamar a la función `limpiarCampos` para restablecer otros campos relacionados.
   *
   * @returns {void} No retorna ningún valor.
   */
  cancelarRadioButton(): void {
    // Resetear botones de radio y campos relacionados
    this.solicitudForm.get('tipoBusqueda')?.setValue('');
    this.limpiarCampos();
  }

  /**
   * Agrega una nueva solicitud utilizando el servicio `datosTramiteService`.
   * La solicitud se agrega a la lista `datosDelContenedor` y se actualiza el estado en `tramite11201Store`.
   *
   * @remarks
   * Este método se suscribe al observable devuelto por `agregarSolicitud` y maneja la respuesta.
   * Si la solicitud es exitosa, se actualiza el formulario `solicitudForm` para limpiar los campos y marcarlo como no modificado.
   *
   * @returns {void}
   */
  agregarSolicitud(): void {
    this.datosTramiteService
      .agregarSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        // Manejar éxito, posiblemente refrescar la grilla o mostrar mensaje
        if (respuesta?.success) {
          respuesta.datos.id = this.datosDelContenedor.length + 1;
          this.datosDelContenedor.push(respuesta.datos);
          (
            this.tramite11201Store.setDelContenedor as (
              valor: DatosDelContenedor[]
            ) => void
          )(this.datosDelContenedor);
          this.solicitudForm.patchValue({
            aduana: '',
            fechaIngreso: '',
            digitoDeControl: '',
            inicialesContenedor: '',
            numeroContenedor: '',
            contenedores: '',
          });
          this.solicitudForm.markAsUntouched();
          this.solicitudForm.markAsPristine();
        }
      });
  }

  /**
   * Método para obtener la lista de transporte.
   *
   * Este método llama al servicio `datosTramiteService` para obtener la lista de transporte
   * y suscribe a los resultados hasta que el componente sea destruido. Los datos obtenidos
   * se asignan a la propiedad `catalogoList`.
   *
   * @returns {void} No retorna ningún valor.
   */
  public fetchgetTransporteList(): void {
    this.datosTramiteService
      .getTransporteList('transporteList')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.catalogoList = respuesta.data;
      });
  }

  /**
   * Método para obtener la lista de aduanas.
   *
   * Este método realiza una solicitud al servicio `datosTramiteService` para obtener la lista de aduanas.
   * La respuesta se almacena en la propiedad `aduanaList.catalogos`.
   *
   * @returns {void} No retorna ningún valor.
   */
  public fetchAduanaList(): void {
    this.datosTramiteService
      .getAduanaList('aduanaList')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        this.aduanaList.catalogos = respuesta.data;
      });
  }

  /**
   * Abre un modelo modal con los datos proporcionados.
   *
   * @param datos - Los datos que se pasarán al modelo modal.
   * @returns void
   */
  abiertoModelo(datos: string): void {
    this.abiertoModeloDatos = datos;
    this.modalRef = this.modalService.show(this.plantillaDeModelo, {
      id: 1,
      class: 'modal-sm',
    });
  }

  /**
   * Emite un evento para continuar.
   *
   * Este método emite un evento para indicar que se debe continuar con el siguiente paso.
   * @returns {void}
   */
  continuar(): void {
    this.continuarEvento.emit('');
  }

  /**
   * Actualiza la fecha de ingreso en el formulario de solicitud.
   *
   * @param nuevo_valor - El nuevo valor de la fecha de ingreso en formato de cadena.
   */
  public cambioFechaDeIngreso(nuevo_valor: string): void {
    this.solicitudForm.get('fechaDeIngreso')?.setValue(nuevo_valor);
    this.solicitudForm.get('fechaDeIngreso')?.markAsUntouched();
  }

  /**
   * Cambia la fecha de ingreso en el formulario de solicitud.
   *
   * @param nuevo_valor - El nuevo valor de la fecha de ingreso en formato de cadena.
   */
  public cambioFechaIngreso(nuevo_valor: string): void {
    this.solicitudForm.get('fechaIngreso')?.setValue(nuevo_valor);
    this.solicitudForm.get('fechaIngreso')?.markAsUntouched();
  }

  /**
   * Activa la selección del archivo de medicamentos.
   * @returns {void}
   */
  activarSeleccionArchivo(): void {
    this.entradaArchivo = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    if (this.entradaArchivo) {
      this.entradaArchivo.click();
    }
  }

  /**
   * Maneja el cambio de archivo en el input de archivo.
   *
   * @param event Evento de cambio de archivo.
   *
   * @returns {void}
   */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE_INPUT = document.getElementById(
      'cargarArchivo'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      if (FILE.type !== 'text/csv' && !FILE.name.endsWith('.csv')) {
        this.abrirModal();
        return;
      }

      if (TARGET.files && TARGET.files.length > 0) {
        this.archivoMedicamentos = TARGET.files[0];
        this.etiquetaDeArchivo = this.archivoMedicamentos.name;
      } else {
        this.etiquetaDeArchivo = 'Sin archivo seleccionados';
      }
    }
  }

  /**
   * Elimina un pedimento de la lista si el parámetro `borrar` es verdadero.
   *
   * @param borrar - Indica si se debe eliminar el pedimento seleccionado.
   * 
   * Si `borrar` es `true`, elimina el elemento en la posición `elementoParaEliminar` del arreglo `pedimentos`.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Abre un modal de notificación para alertar al usuario que debe seleccionar un archivo CSV.
   * 
   * @param i - (Opcional) Índice del elemento a eliminar. Por defecto es 0.
   * 
   * Este método inicializa la notificación con un mensaje de alerta y configura el elemento a eliminar.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por favor seleccione un archivo CSV.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'OK',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }

  /**
   * Determina si una opción de radio debe estar deshabilitada según el valor seleccionado en el formulario.
   *
   * @param option - La opción de radio a evaluar.
   * @returns `true` si la opción debe estar deshabilitada, `false` en caso contrario.
   */
  isRadioDisabled(option: string): boolean {
    const value = this.solicitudForm.get('tipoBusqueda')?.value;
    return value && value !== option;
  }

  /**
   * Cancela la operación actual.
   * 
   * Este método restablece el formulario de solicitud a su estado inicial
   * y emite un evento para notificar al componente padre que la acción de cancelar ha sido solicitada.
   */
  cancelar(): void {
    this.solicitudForm.reset(); // Reset the form
    this.cancelarEvento.emit(); // Notify parent
  }
}