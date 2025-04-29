import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CatalogosSelect, ConfiguracionColumna, CrosslistComponent, InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { PermisoSanitarioProductosService } from '../../services/permiso-sanitario-productos.service';
import {
  MERCANCIAS_DATA,
  MercanciasInfo,
  NICO_TABLA,
  NicoInfo,
} from '@libs/shared/data-access-user/src/core/models/260104/domicilo.model';
import { CROSLISTA_DE_PAISES, ETIQUETA, FECHA_DE_FABRICACION, FECHA_DE_PAGO, OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    InputFechaComponent,
    InputRadioComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit,OnDestroy{
  /**
   * Lista de componentes Crosslist disponibles en la vista.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  solicitudForm!:FormGroup
  formAgente!:FormGroup
  formMercancias!:FormGroup
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  estado: Catalogo[] = [];
  isHabilitarEspecifique: boolean = false;
  isHabilitarEspecifiqueTipo: boolean = false;
  private destroyNotifier$: Subject<void> = new Subject();
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
   
  /**
   * Configuración de columnas para la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
 
  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];
   
  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
 
  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];
   
  /**
   * Indica si la sección es colapsable.
   */
  colapsable: boolean = false;
 
  /**
   * Indica si la sección "Duo" es colapsable.
   */
  colapsableDos: boolean = false;
 
  /**
   * Indica si la sección "Tres" es colapsable.
   */
  colapsableTres: boolean = false;
   
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel = ETIQUETA;

   
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
 
  /**
   * Lista de países para seleccionar el origen de la segunda sección.
   */
  seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
 
  /**
   * Lista de países para seleccionar el origen de la tercera sección.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;

  public fechaFabricacionInput: InputFecha = FECHA_DE_FABRICACION;

  /**
   * Opciones para los botones de radio
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  constructor(public fb:FormBuilder,
    public permisoSanitarioProductosService: PermisoSanitarioProductosService,
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerEstadoCatalogo();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
  }

  crearFormulario():void{
    this.solicitudForm = this.fb.group({
      razonSocial: [{value:'',disabled:true},Validators.required],
      correoElectronico: [{value:'',disabled:true},Validators.required,Validators.email],
      codigoPostal: ['',Validators.required],
      estado:['',Validators.required],
      municipio:['',Validators.required],
      localidad:[''],
      colonia:[''],
      calle:['',Validators.required],
      lada:[],
      telefono: ['',Validators.required],
      avisoCheckbox:[''],
      licenciaSanitaria:[''],
      regimen:['',Validators.required],
      aduana:['',Validators.required],
      manifesto:['',Validators.required]
    })

    this.formAgente = this.fb.group({
      claveScianModal:['',Validators.required],
      claveDescripcionModal:[''],
    })

    this.formMercancias = this.fb.group({
      clasificacion: ['', Validators.required],
      especificarClasificacionProducto: ['', Validators.required],
      especifique:['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      marca:['', Validators.required],
      especifiqueTipo:['',Validators.required],
      fraccionArancelaria:['',Validators.required],
      descripcionFraccion:[{value:'',disabled:true},Validators.required],
      cantidadUMT:['',Validators.required],
      UMT:[{value:'',disabled:true},Validators.required],
      cantidadUMC:['',Validators.required],
      UMC:['',Validators.required],
      claveDeLosLotes:['',Validators.required],
      fechaCaducidad:['',Validators.required],
      fechaFabricacion:['',Validators.required],
      tipoDeProducto:['',Validators.required]
    });
  }

  obtenerEstadoCatalogo(): void {
    this.permisoSanitarioProductosService
      .obtenerEstadoCatalogo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.estadoCatalogo = respuesta;
        },
      });
  }

  habilitarEspecifique(): void {
    this.isHabilitarEspecifique = true;
  }

  habilitarEspecifiqueTipo(): void {
    this.isHabilitarEspecifiqueTipo = true;
  }

  obtenerTablaDatos(): void {
    this.permisoSanitarioProductosService.obtenerTablaDatos()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      const DATOS = data?.datos;
      this.nicoTablaDatos = DATOS;
    });
  }

  /**
 * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
 */
obtenerMercanciasDatos(): void {
  this.permisoSanitarioProductosService.obtenerMercanciasDatos()
  .pipe(takeUntil(this.destroyNotifier$))
  .subscribe((data) => {
    const DATOS = data?.datos;
    this.mercanciasTablaDatos = DATOS;
  });
}

  obtenerEstadoList(): void {
    this.permisoSanitarioProductosService.obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  habilitarCampos():void{
    this.solicitudForm.get('razonSocial')?.enable();
    this.solicitudForm.get('correoElectronico')?.enable();
  }

  setEstado(evento: Catalogo): void {
    //Añade lógica aquí
  }

   
  /**
   * Alterna el estado colapsable de la primera sección.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }
  
  /**
   * Alterna el estado colapsable de la segunda sección.
   */
  mostrar_colapsableDos(): void {
    this.colapsableDos = !this.colapsableDos;
  }
  
  /**
   * Alterna el estado colapsable de la tercera sección.
   */
  mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }

  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];
  
  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[1].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[1].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[1].quitar('t') },
  ];
  
  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[2].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[2].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[2].quitar('t') },
  ];

  public cambioFechaFinal(nuevo_valor: string): void {
    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }

  public cambioFechaFabricacion(nuevo_valor: string): void {
    this.formMercancias.get('fechaFabricacion')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaFabricacion')?.markAsUntouched();
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
