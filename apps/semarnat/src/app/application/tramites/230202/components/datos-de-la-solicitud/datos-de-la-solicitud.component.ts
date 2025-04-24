import {
  Catalogo,
  CatalogoSelectComponent,
  CrossListLable,
  CrosslistComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud230202State,
  Tramite230202Store,
} from '../../estados/tramite230202.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PhytosanitaryReexportacionService } from '../../services/phytosanitary-reexportacion.service';
import { Tramite230202Query } from '../../estados/tramite230202.query';

@Component({
  selector: 'app-datos-de-la-solicitud',
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   TituloComponent,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   CatalogoSelectComponent,
  //   CrosslistComponent,
  // ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {
  /**
   * Formulario principal del trámite.
   */
  solicitudForm!: FormGroup;

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
  selectRangoDias: string[] = [];
  selectEntidades: string[] = [];
  fechasSeleccionadas: Catalogo[] = [];
  fechasDatos: Catalogo[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  // @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
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
        descripcionProducto: [this.solicitudState?.descripcionProducto, [Validators.required]],
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

    const ENTIDADES$ = this.phytosanitaryReexportacionService.getEntidades().pipe(
      map((resp) => {
        this.entidades = resp.data;
        this.selectEntidades = this.entidades.map(
            (entidades: Catalogo) => entidades.descripcion
          );
      })
    );

    const DESCRIPCIONPRODUCTO$ = this.phytosanitaryReexportacionService.getDescripcionProducto().pipe(
      map((resp) => {
        this.descripcionProducto = resp.data;
      })
    );
    
    merge(NUMERODECERTIFICADO$, ADUANA$, PAIS$, ENTIDADES$, DESCRIPCIONPRODUCTO$)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
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
    const ENTIDADES = this.solicitudForm.get('reexportacionForm.entidades')?.value;
    this.store.setEntidades(ENTIDADES);
  }

  descripcionProductoSeleccion() {
    const DESCRIPCIONPRODUCTO = this.solicitudForm.get('reexportacionForm.descripcionProducto')?.value;
    this.store.setDescripcionProducto(DESCRIPCIONPRODUCTO);
  }

  public getCrossListBtn() {
    return [
      { btnNombre: 'Agregar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
      { btnNombre: 'Agregar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('') },
      { btnNombre: 'Restar selección', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].quitar('') },
      { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
    ];
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
