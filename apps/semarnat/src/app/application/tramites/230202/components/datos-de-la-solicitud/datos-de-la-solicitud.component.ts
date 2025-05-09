import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DatosDetalle, DatosSolicitud } from '../../models/datos-tramite.model';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { Tramite230202Query } from '../../estados/tramite230202.query';

/**
 * Componente principal para gestionar los datos de la solicitud del trámite 230202.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

  /**
   * Formulario para agregar mercancías.
   */
  agregarMercanciasForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud230202State;

  /**
   * Sujeto para manejar la destrucción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de catálogos disponibles para el número de certificado.
   */
  numeroDeCertificado!: Catalogo[];

  /**
   * Lista de catálogos disponibles para aduanas.
   */
  aduana!: Catalogo[];

  /**
   * Lista de catálogos disponibles para países.
   */
  pais!: Catalogo[];

  /**
   * Lista de catálogos disponibles para entidades.
   */
  entidades!: Catalogo[];

  /**
   * Lista de catálogos disponibles para la descripción del producto.
   */
  descripcionProducto!: Catalogo[];

  /**
   * Lista de catálogos disponibles para fracciones arancelarias.
   */
  fraccionArancelaria!: Catalogo[];

  /**
   * Lista de rangos de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Lista de entidades seleccionadas.
   */
  selectEntidades: string[] = [];

  /**
   * Lista de catálogos disponibles para géneros.
   */
  genero!: Catalogo[];

  /**
   * Lista de catálogos disponibles para especies.
   */
  especie!: Catalogo[];

  /**
   * Lista de catálogos disponibles para nombres comunes.
   */
  nombreComun!: Catalogo[];

  /**
   * Lista de catálogos disponibles para unidades de medida.
   */
  unidadDeMedida!: Catalogo[];

  /**
   * Lista de catálogos disponibles para medios de transporte.
   */
  medioDeTransporte!: Catalogo[];

  /**
   * Lista de catálogos disponibles para estados.
   */
  estado!: Catalogo[];

  /**
   * Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Referencia a los componentes Crosslist en la vista.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias', { static: false }) modalRef!: ElementRef;

  /**
   * Referencia al modal de confirmación.
   */
  @ViewChild('modalConfirmacion', { static: false }) modalConfirmacion!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Botones para gestionar la lista de países de origen.
   */
  public paisDeOrigenBotons = this.getCrossListBtn(0);

  /**
   * Botones para gestionar la lista de entidades.
   */
  public entidadesBotons = this.getCrossListBtn(1);

  /**
   * Etiquetas para la lista de países de origen.
   */
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Etiquetas para la lista de entidades.
   */
  public entidadesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Entidades disponsibles:',
    derecha: 'Entidades seleccionadas*:',
  };

  /**
   * Lista de datos de la solicitud.
   */
  public datosSolicitud: DatosSolicitud[] = [];

  /**
   * Filas seleccionadas en la tabla de solicitudes.
   */
  selectedRows: number[] = [];

  /**
   * Filas seleccionadas en la tabla de detalles.
   */
  selectedRowsDetalle: number[] = [];

  /**
   * Lista de datos de detalle.
   */
  public datosDetalle: DatosDetalle[] = [];

  /**
   * Configuración de la tabla de selección.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla de solicitudes.
   */
  public encabezadoDeTabla: ConfiguracionColumna<DatosSolicitud>[] = [
    { encabezado: '', clave: (articulo) => articulo.id, orden: 1 },
    {
      encabezado: 'Fracción arancelaria',
      clave: (articulo) => articulo.fraccionArancelaria,
      orden: 2,
    },
    {
      encabezado: 'Cantidad',
      clave: (articulo) => articulo.cantidad,
      orden: 3,
    },
    {
      encabezado: 'Cantidad(letra)',
      clave: (articulo) => articulo.cantidadLetra,
      orden: 4,
    },
  ];

  /**
   * Configuración de las columnas de la tabla de detalles.
   */
  public encabezadoDeTablaDetalle: ConfiguracionColumna<DatosDetalle>[] = [
    { encabezado: '', clave: (articulo) => articulo.id, orden: 1 },
    {
      encabezado: 'Nombre cietifico',
      clave: (articulo) => articulo.nombreCientifico,
      orden: 2,
    },
    {
      encabezado: 'Nombre común',
      clave: (articulo) => articulo.nombreComunDetalle,
      orden: 3,
    },
  ];

  /**
   * Constructor del componente.
   * @param phytosanitaryReexportacionService Servicio para gestionar datos fitosanitarios.
   * @param store Almacén del estado del trámite.
   * @param query Consulta del estado del trámite.
   * @param fb Constructor de formularios reactivos.
   */
  constructor(
    public phytosanitaryReexportacionService: PhytosanitaryReexportacionService,
    public store: Tramite230202Store,
    public query: Tramite230202Query,
    public fb: FormBuilder
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.datosSolicitud = this.solicitudState.datosSolicitud;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Obtiene el grupo de formulario de exención de impuestos.
   */
  get reexportacionForm(): FormGroup {
    return this.solicitudForm.get('reexportacionForm') as FormGroup;
  }

  inicializarFormulario(): void {
    this.solicitudForm = this.fb.group({
      reexportacionForm: this.fb.group({
        numeroDeCertificado: [
          this.solicitudState?.numeroDeCertificado,
          [Validators.required],
        ],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        entidades: [this.solicitudState?.entidades, [Validators.required]],
        descripcionProducto: [
          this.solicitudState?.descripcionProducto,
          [Validators.required],
        ],
        unidadDeMedida: [
          this.solicitudState?.unidadDeMedida,
          Validators.required,
        ],
        lungarDeEntrada: [
          this.solicitudState?.lungarDeEntrada,
          Validators.required,
        ],
        medioDeTransporte: [
          this.solicitudState?.medioDeTransporte,
          Validators.required,
        ],
        numeroYDescripcion: [
          this.solicitudState?.numeroYDescripcion,
          Validators.required,
        ],
        codigoPostal: [
          this.solicitudState?.codigoPostal, 
          Validators.required,
        ],
        estado: [
          this.solicitudState?.estado,
          Validators.required,
        ],
        calle: [
          this.solicitudState?.calle,
          Validators.required,
        ],
        numeroExterior: [
          this.solicitudState?.numeroExterior,
          Validators.required,
        ],
        numeroInterior: [
          this.solicitudState?.numeroInterior,
          Validators.required,
        ],
        colonia: [
          this.solicitudState?.colonia,
          Validators.required,
        ],
        fechasSeleccionadas: this.fb.array([]),
      }),
    });

    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        fraccionArancelaria: [
          this.solicitudState?.fraccionArancelaria,
          [Validators.required],
        ],
        descripcionfraccionArancelaria: [
          {
            value: this.solicitudState?.descripcionFraccionArancelaria,
            disabled: true,
          },
        ],
        cantidad: [this.solicitudState?.cantidad, Validators.required],
        cantidadLetra: [
          { value: this.solicitudState?.cantidadLetra, disabled: true },
        ],
        genero: [this.solicitudState?.genero, Validators.required],
        especie: [this.solicitudState?.especie, Validators.required],
        nombreComun: [this.solicitudState?.nombreComun, Validators.required],
       
      }),
    });
  }

  /**
   * Inicializa los catálogos necesarios para el componente.
   */
  inicializaCatalogos(): void {
    const NUMERO_DE_CERTIFICADO$ = this.phytosanitaryReexportacionService
      .getNumeroDeCertificado()
      .pipe(
        map((resp) => {
          this.numeroDeCertificado = resp.data;
        })
      );

    const ADUANA$ = this.phytosanitaryReexportacionService.getAduana().pipe(
      map((resp) => {
        this.aduana = resp.data;
      })
    );

    const PAIS$ = this.phytosanitaryReexportacionService.getPais().pipe(
      map((resp) => {
        this.pais = resp.data;
        this.selectRangoDias = this.pais.map(
          (pais: Catalogo) => pais.descripcion
        );
      })
    );

    const ENTIDADES$ = this.phytosanitaryReexportacionService
      .getEntidades()
      .pipe(
        map((resp) => {
          this.entidades = resp.data;
          this.selectEntidades = this.entidades.map(
            (entidades: Catalogo) => entidades.descripcion
          );
        })
      );

    const DESCRIPCION_PRODUCTO$ = this.phytosanitaryReexportacionService
      .getDescripcionProducto()
      .pipe(
        map((resp) => {
          this.descripcionProducto = resp.data;
        })
      );

    const FRACCION$ = this.phytosanitaryReexportacionService
      .getFraccionArancelaria()
      .pipe(
        map((resp) => {
          this.fraccionArancelaria = resp.data;
        })
      );

    const GENERO$ = this.phytosanitaryReexportacionService.getGenero().pipe(
      map((resp) => {
        this.genero = resp.data;
      })
    );

    const ESPECIE$ = this.phytosanitaryReexportacionService.getEspecie().pipe(
      map((resp) => {
        this.especie = resp.data;
      })
    );

    const NOMBRE_COMUN$ = this.phytosanitaryReexportacionService
      .getNombreComun()
      .pipe(
        map((resp) => {
          this.nombreComun = resp.data;
        })
      );

    const UNIDAD_DE_MEDIDA$ = this.phytosanitaryReexportacionService
      .getUnidadDeMedida().pipe(
        map((resp) => {
          this.unidadDeMedida = resp.data;
        })
      );

    const MEDIO_DE_TRANSPORTE$ = this.phytosanitaryReexportacionService
      .getMedioDeTransporte()
      .pipe(
        map((resp) => {
          this.medioDeTransporte = resp.data;
        })
      );

    const ESTADO$ = this.phytosanitaryReexportacionService
      .getEstado().pipe(
        map((resp) => {
          this.estado = resp.data;
        })
      );

    merge(
      NUMERO_DE_CERTIFICADO$,
      ADUANA$,
      PAIS$,
      ENTIDADES$,
      DESCRIPCION_PRODUCTO$,
      FRACCION$,
      GENERO$,
      ESPECIE$,
      NOMBRE_COMUN$,
      UNIDAD_DE_MEDIDA$,
      MEDIO_DE_TRANSPORTE$,
      ESTADO$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Obtiene el grupo de formulario relacionado con los datos de mercancía.
   * @returns El grupo de formulario `datosMercancia`.
   */
  get datosMercancia(): FormGroup {
    return this.solicitudForm.get('datosMercancia') as FormGroup;
  }

  /**
   * Maneja la selección del número de certificado.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  numeroDeCertificadoSeleccion(): void {
    const NUMERO_DE_CERTIFICADO = this.solicitudForm.get(
      'reexportacionForm.numeroDeCertificado'
    )?.value;
    this.store.setNumeroDeCertificado(NUMERO_DE_CERTIFICADO);
  }

  /**
   * Maneja la selección de la aduana.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  aduanaSeleccion(): void {
    const ADUANA = this.solicitudForm.get('reexportacionForm.aduana')?.value;
    this.store.setAduana(ADUANA);
  }

  /**
   * Maneja la selección del país.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  paisSeleccion(): void {
    const PAIS = this.solicitudForm.get('reexportacionForm.pais')?.value;
    this.store.setPais(PAIS);
  }

  /**
   * Maneja la selección de las entidades.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  entidadesSeleccion(): void {
    const ENTIDADES = this.solicitudForm.get(
      'reexportacionForm.entidades'
    )?.value;
    this.store.setEntidades(ENTIDADES);
  }

  /**
   * Maneja la selección de la descripción del producto.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  descripcionProductoSeleccion(): void {
    const DESCRIPCION_PRODUCTO = this.solicitudForm.get('reexportacionForm.descripcionProducto')?.value;
    this.store.setDescripcionProducto(DESCRIPCION_PRODUCTO);
  }

  /**
   * Maneja la selección de la fracción arancelaria.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION = this.solicitudForm.get(
      'datosMercancia.fraccionArancelaria'
    )?.value;
    this.store.setFraccionArancelaria(FRACCION);
  }

  /**
   * Maneja la selección del género.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  generoSeleccion(): void {
    const GENERO = this.solicitudForm.get('datosMercancia.genero')?.value;
    this.store.setGenero(GENERO);
  }

  /**
   * Maneja la selección de la especie.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  especieSeleccion(): void {
    const ESPECIE = this.solicitudForm.get('datosMercancia.especie')?.value;
    this.store.setEspecie(ESPECIE);
  }

  /**
   * Maneja la selección del nombre común.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  nombreComunSeleccion(): void {
    const NOMBRE_COMUN = this.solicitudForm.get(
      'datosMercancia.nombreComun'
    )?.value;
    this.store.setNombreComun(NOMBRE_COMUN);
  }

  /**
   * Maneja la selección de la unidad de medida.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  unidadDeMedidaSeleccion(): void {
    const UNIDAD_DE_MEDIDA = this.solicitudForm.get(
      'reexportacionForm.unidadDeMedida'
    )?.value;
    this.store.setUnidadDeMedida(UNIDAD_DE_MEDIDA);
  }

  /**
   * Maneja la selección del medio de transporte.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  medioDeTransporteSeleccion(): void {
    const MEDIO_DE_TRANSPORTE = this.solicitudForm.get(
      'reexportacionForm.medioDeTransporte'
    )?.value;
    this.store.setMedioDeTransporte(MEDIO_DE_TRANSPORTE);
  }

  /**
   * Maneja la selección del estado.
   * Obtiene el valor del formulario y lo establece en el store.
   */
  estadoSeleccion(): void {
    const ESTADO = this.solicitudForm.get('reexportacionForm.estado')?.value;
    this.store.setEstado(ESTADO);
  }

  public getCrossListBtn(index: number) {
    return [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[index].agregar('t'),
      },
      {
        btnNombre: 'Agregar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[index].agregar(''),
      },
      {
        btnNombre: 'Restar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[index].quitar(''),
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[index].quitar('t'),
      },
    ];
  }

  /**
   * Obtiene el array del formulario 'fechasSeleccionadas' del grupo de formulario  'datosServicio'.
   *
   * @returns {FormArray} El array de formulario 'fechasSeleccionadas'.
   */
  get fechasSeleccionadas(): FormArray {
    return this.reexportacionForm.get('fechasSeleccionadas') as FormArray;
  }

  /**
   * Actualiza la lista de fechas seleccionadas y las almacena en el estado.
   * 
   * @param fechas - Arreglo de fechas a agregar.
   * @returns void
   */
  changeCrosslist(fechas: string[]): void {
    fechas.forEach((fecha) => {
      this.fechasSeleccionadas.push(new FormControl(fecha));
    });
    this.store.setFechasSeleccionadas(fechas);
  }

  /**
   * Agrega un nuevo detalle a la lista de detalles.
   * Obtiene los datos del servicio y los agrega a la lista local y al store.
   */
  agregarDetalle() {
    this.phytosanitaryReexportacionService
      .agregarDetalle()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta?.success) {
          respuesta.datos.id = this.datosDetalle.length + 1;
          this.datosDetalle.push(respuesta.datos);
          (
            this.store.setDatosDetalle as unknown as (
              valor: DatosDetalle[]
            ) => void
          )(this.datosDetalle);
        }
      });
  }

  /**
   * Agrega una nueva solicitud a la lista de solicitudes.
   * Obtiene los datos del servicio y los agrega a la lista local y al store.
   * También reinicia el formulario de la solicitud.
   */
  agregarSolicitud() {
    this.phytosanitaryReexportacionService.agregarSolicitud().pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta?.success) {
          respuesta.datos.id = this.datosSolicitud.length + 1;
          this.datosSolicitud = [...this.datosSolicitud, respuesta.datos];
          this.store.setDatosSolicitud(this.datosSolicitud);
          this.solicitudForm.patchValue({
            fraccionArancelaria: this.solicitudState?.fraccionArancelaria,
            cantidad: this.solicitudState?.cantidad,
            cantidadLetra: this.solicitudState?.cantidadLetra,
          });
          this.solicitudForm.reset();
          this.solicitudForm.markAsUntouched();
          this.solicitudForm.markAsPristine();
          this.cerrarModal();
        }
      });
  }

  /**
   * Maneja el cambio de filas seleccionadas en la tabla de solicitudes.
   * @param selectedRows Lista de filas seleccionadas en la tabla de solicitudes.
   */
  onSelectedRowsChange(selectedRows: DatosSolicitud[]): void {
    this.selectedRows = selectedRows.map(row => row.id);
  }

  /**
   * Elimina las filas seleccionadas de la tabla de solicitudes.
   */
  eliminar(): void {
    if (this.selectedRows && this.selectedRows.length > 0) {
      this.datosSolicitud = this.datosSolicitud.filter(row => !this.selectedRows.includes(row.id));
      this.store.setDatosSolicitud(this.datosSolicitud);
      this.selectedRows = [];
    } else {
      if (this.modalConfirmacion) {
        const MODEL = new Modal(this.modalConfirmacion.nativeElement);
        MODEL.show();
      }
    }
  }

  /**
   * Modifica las filas seleccionadas en la tabla de solicitudes.
   * Abre un modal para realizar los cambios.
   */
  modificar(): void {
    if (this.selectedRows && this.selectedRows.length > 0) {
      this.agregarMercanciasForm.patchValue(this.selectedRows);
      if (this.modalRef) {
        const MODEL = new Modal(this.modalRef.nativeElement);
        MODEL.show();
      }
    } else {
      if (this.modalConfirmacion) {
        const MODEL = new Modal(this.modalConfirmacion.nativeElement);
        MODEL.show();
      }
    }
  }

  /**
   * Maneja el cambio de filas seleccionadas en la tabla de detalles.
   * @param selectedRowsDetalle Lista de filas seleccionadas en la tabla de detalles.
   */
  onSelectedRows(selectedRowsDetalle: DatosDetalle[]): void {
    this.selectedRowsDetalle = selectedRowsDetalle.map(row => row.id);
  }

  /**
   * Elimina las filas seleccionadas de la tabla de detalles.
   */
  eliminarDetalle(): void {
    if (this.selectedRowsDetalle && this.selectedRowsDetalle.length > 0) { 
      this.datosDetalle = this.datosDetalle.filter(row => !this.selectedRowsDetalle.includes(row.id));
      this.store.setDatosDetalle(this.datosDetalle);
      this.selectedRowsDetalle = [];
    }
  }

  /**
   * Cierra el modal actual.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Establece valores en el store del trámite.
   * @param form Formulario del cual se obtiene el valor.
   * @param campo Nombre del campo del formulario.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite230202Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
}
