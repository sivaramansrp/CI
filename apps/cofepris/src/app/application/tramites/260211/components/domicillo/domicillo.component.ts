import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrosslistComponent, CrossListLable, RespuestaCatalogos, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MERCANCIAS_DATA, mercanciasInfo, NICO_TABLA, nicoInfo } from '../../modelos/domicilo.model';
import { CONTINUAR, CROSLISTA_DE_PAISES } from '../../enum/domicilo.enum';

export interface RespuestaTabla {
  code: number;
  data: nicoInfo[]
  message: string;
}

export interface MercanciasTabla {
  code: number;
  data: mercanciasInfo[]
  message: string;
}
@Component({
  selector: 'app-domicillo',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
  ],
  templateUrl: './domicillo.component.html',
  styleUrl: './domicillo.component.css',
})


export class DomicilloComponent implements OnInit,AfterViewInit {
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  constructor(private readonly fb: FormBuilder, 
    private readonly httpServicios: HttpClient,
  ) {}


  /**
   * Grupo de formularios principal.
   * @property {FormGroup} domicilio
   */
  domicilio!: FormGroup;
  formAgente!: FormGroup;
  formMercancias!: FormGroup

  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  estado: Catalogo[] = [];

  public crosListaDePaises = CROSLISTA_DE_PAISES;

  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  nicoTabla: ConfiguracionColumna<nicoInfo>[] = NICO_TABLA;
  
  nicoTablaDatos: nicoInfo[] = [];
  
  mercanciasTabla: ConfiguracionColumna<mercanciasInfo>[] = MERCANCIAS_DATA;

  mercanciasTablaDatos: mercanciasInfo[] = [];

  aduanasDeEntradaSeleccionadas: string[] = [];

  aduanasDeEntradaDatos: string[] = [];

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = false;

/**
   * Indica si la sección es colapsableDuos.
   * @property {boolean} colapsableDuos
   */
  colapsableDuos: boolean = false;

  /**
   * Indica si la sección es colapsableTres.
   * @property {boolean} colapsableTres
   */
  colapsableTres: boolean = false;

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  seleccionarOrigenDelPaisDuos: string[] = this.crosListaDePaises;

  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
  
  ngOnInit(){
    this.obtenerEstadoList()
    this.obtenerTablaDatos()
    this.obtenerMercanciasDatos()
    this.domicilio = this.fb.group({
      codigoPostal: ['', Validators.required],
      estado:['',Validators.required],
      muncipio: ['', Validators.required],
      localidad: [''],
      colonia: [''],
      calle: [''],
      lada: [''],
      telefono: ['', Validators.required],
      avisoCheckbox:[''],
      licenciaSanitaria:[{value:'',disabled:false}],
      regimen: [''],
      aduanasEntradas: [''],
      numeroPermiso:['']
    });

    this.formAgente = this.fb.group({
      claveScianModal: ['', Validators.required],
      claveDescripcionModal:['']
    });

    this.formMercancias = this.fb.group({
      clasificacion: ['', Validators.required],
      especificar: ['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico:['', Validators.required],
      fraccionArancelaria:['', Validators.required],
      descripcionFraccion:[{value:'',disabled:true}, Validators.required],
      cantidadUMT:['', Validators.required],
      UMT:[{value:'',disabled:true}, Validators.required],
      cantidadUMC:['', Validators.required],
      UMC:['', Validators.required],
      presentacion:['', Validators.required],
      numeroRegistro:['', Validators.required],
      fechaCaducidad:['']
    });
    
  }

  ngAfterViewInit(): void {
    
  }

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[0].quitar('t'),
    },
  ];
  paisDeProcedenciaBotonsDuos = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[1].quitar('t'),
    },
  ];
  paisDeProcedenciaBotonsTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  obtenerEstadoList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/260211/seleccion.json').subscribe((data): void => {
      const datos = data?.data;
      this.estado = datos;
    });
  }
  obtenerTablaDatos() {
    this.httpServicios.get<RespuestaTabla>('../../../../../assets/json/260211/tablaDatos.json').subscribe((data): void => {
      this.nicoTablaDatos = data?.data
    });
  }

  obtenerMercanciasDatos() {
    this.httpServicios.get<MercanciasTabla>('../../../../../assets/json/260211/mercanciasDatos.json').subscribe((data): void => {
      this.mercanciasTablaDatos = data?.data
    });
  }

  onAvisoCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.domicilio.get('licenciaSanitaria')?.disable();
    } else {
      this.domicilio.get('licenciaSanitaria')?.enable();
    }
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  mostrar_colapsableDuos() {
    this.colapsableDuos = !this.colapsableDuos;
  }

  mostrar_colapsableTres() {
    this.colapsableTres = !this.colapsableTres;
  }

}
