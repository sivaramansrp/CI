import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrosslistComponent,
  CrossListLable,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, merge, Subject, takeUntil } from 'rxjs';
import {
  Solicitud230202State,
  Tramite230202Store,
} from '../../estados/tramite230202.store';
import { Tramite230202Query } from '../../estados/tramite230202.query';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { DatosSolicitud, DatosDetalle } from '../../models/datos-tramite.model';

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
export class DatosDeLaSolicitudComponent {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

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
   * Lista de numeroDeCertificado disponibles.
   * @type {Catalogo[]}
   */
  numeroDeCertificado!: Catalogo[];
  aduana!: Catalogo[];
  pais!: Catalogo[];
  entidades!: Catalogo[];
  descripcionProducto!: Catalogo[];
  fraccionArancelaria!: Catalogo[];
  selectRangoDias: string[] = [];
  selectEntidades: string[] = [];
  fechasSeleccionadas: Catalogo[] = [];
  fechasDatos: Catalogo[] = [];
  genero!: Catalogo[];
  especie!: Catalogo[];
  nombreComun!: Catalogo[];
  unidadDeMedida!: Catalogo[];
  medioDeTransporte!: Catalogo[];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  @ViewChild('closeModal') closeModal!: ElementRef;
  public paisDeOrigenBotons = this.getCrossListBtn();
  public entidadesBotons = this.getCrossListBtn();
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)*:',
  };
  public entidadesLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Entidades disponsibles:',
    derecha: 'Entidades seleccionadas*:',
  };
  public datosSolicitud: DatosSolicitud[] = [];
  public datosDetalle: DatosDetalle[] = [];

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

  constructor(
    private phytosanitaryReexportacionService: PhytosanitaryReexportacionService,
    private store: Tramite230202Store,
    private query: Tramite230202Query,
    public fb: FormBuilder
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();
    this.inicializarFormulario();

    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
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
    const NUMERODECERTIFICADO$ = this.phytosanitaryReexportacionService
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

    const DESCRIPCIONPRODUCTO$ = this.phytosanitaryReexportacionService
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

    const NOMBRECOMUN$ = this.phytosanitaryReexportacionService
      .getNombreComun()
      .pipe(
        map((resp) => {
          this.nombreComun = resp.data;
        })
      );

    const UNIDADDEMEDIDA$ = this.phytosanitaryReexportacionService
      .getUnidadDeMedida().pipe(
        map((resp) => {
          this.unidadDeMedida = resp.data;
        })
      );

    const MEDIODETRANSPORTE$ = this.phytosanitaryReexportacionService
      .getMedioDeTransporte()
      .pipe(
        map((resp) => {
          this.medioDeTransporte = resp.data;
        })
      );

    merge(
      NUMERODECERTIFICADO$,
      ADUANA$,
      PAIS$,
      ENTIDADES$,
      DESCRIPCIONPRODUCTO$,
      FRACCION$,
      GENERO$,
      ESPECIE$,
      NOMBRECOMUN$,
      UNIDADDEMEDIDA$,
      MEDIODETRANSPORTE$
    )
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  get datosMercancia(): FormGroup {
    return this.solicitudForm.get('datosMercancia') as FormGroup;
  }

  numeroDeCertificadoSeleccion(): void {
    const NUMERODECERTIFICADO = this.solicitudForm.get(
      'reexportacionForm.numeroDeCertificado'
    )?.value;
    this.store.setNumeroDeCertificado(NUMERODECERTIFICADO);
  }

  aduanaSeleccion(): void {
    const ADUANA = this.solicitudForm.get('reexportacionForm.aduana')?.value;
    this.store.setAduana(ADUANA);
  }

  paisSeleccion(): void {
    const PAIS = this.solicitudForm.get('reexportacionForm.pais')?.value;
    this.store.setPais(PAIS);
  }

  entidadesSeleccion(): void {
    const ENTIDADES = this.solicitudForm.get(
      'reexportacionForm.entidades'
    )?.value;
    this.store.setEntidades(ENTIDADES);
  }

  descripcionProductoSeleccion() {
    const DESCRIPCIONPRODUCTO = this.solicitudForm.get(
      'reexportacionForm.descripcionProducto'
    )?.value;
    this.store.setDescripcionProducto(DESCRIPCIONPRODUCTO);
  }

  fraccionArancelariaSeleccion() {
    const FRACCION = this.solicitudForm.get(
      'datosMercancia.fraccionArancelaria'
    )?.value;
    this.store.setFraccionArancelaria(FRACCION);
  }

  generoSeleccion() {
    const GENERO = this.solicitudForm.get('datosMercancia.genero')?.value;
    this.store.setGenero(GENERO);
  }

  especieSeleccion() {
    const ESPECIE = this.solicitudForm.get('datosMercancia.especie')?.value;
    this.store.setEspecie(ESPECIE);
  }

  nombreComunSeleccion() {
    const NOMBRECOMUN = this.solicitudForm.get(
      'datosMercancia.nombreComun'
    )?.value;
    this.store.setNombreComun(NOMBRECOMUN);
  }

  unidadDeMedidaSeleccion() {
    const UNIDADDEMEDIDA = this.solicitudForm.get(
      'reexportacionForm.unidadDeMedida'
    )?.value;
    this.store.setUnidadDeMedida(UNIDADDEMEDIDA);
  }

  medioDeTransporteSeleccion() {
    const MEDIODETRANSPORTE = this.solicitudForm.get(
      'reexportacionForm.medioDeTransporte'
    )?.value;
    this.store.setMedioDeTransporte(MEDIODETRANSPORTE);
  }

  public getCrossListBtn() {
    return [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[0].agregar('t'),
      },
      {
        btnNombre: 'Agregar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[0].agregar(''),
      },
      {
        btnNombre: 'Restar selección',
        class: 'btn-primary',
        funcion: (): void => this.crossList.toArray()[0].quitar(''),
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default',
        funcion: (): void => this.crossList.toArray()[0].quitar('t'),
      },
    ];
  }

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

  agregarSolicitud() {
    this.phytosanitaryReexportacionService
      .agregarSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta?.success) {
          respuesta.datos.id = this.datosSolicitud.length + 1;
          this.datosSolicitud.push(respuesta.datos);
          (
            this.store.setDatosSolicitud as unknown as (
              valor: DatosSolicitud[]
            ) => void
          )(this.datosSolicitud);
          this.solicitudForm.patchValue({
            fraccionArancelaria: '',
            cantidad: '',
          });
          this.solicitudForm.reset();
          this.solicitudForm.markAsUntouched();
          this.solicitudForm.markAsPristine();
          this.cerrarModal();
        }
      });
  }

  /**
   * Cierra el modal actual.
   */
  cerrarModal() {
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

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
