import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, CrosslistComponent, CrossListLable, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-domicillo-del',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    ReactiveFormsModule
  ],
  templateUrl: './domicillo-del.component.html',
  styleUrl: './domicillo-del.component.scss',
})
export class DomicilloDelComponent {

   /**
     * Lista de componentes Crosslist disponibles en la vista.
     */
    @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
   
    constructor(
      private readonly fb: FormBuilder,
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Grupo de formularios para domicilio.
     */
    domicilio!: FormGroup;
   
    /**
     * Grupo de formularios para agente.
     */
    formAgente!: FormGroup;
   
    /**
     * Grupo de formularios para mercancías.
     */
    formMercancias!: FormGroup;
   
    /**
     * Control para la fecha de aduanas de entrada.
     */
    aduanasDeEntradaFecha: FormControl = new FormControl('');
   
    /**
     * Control para la fecha seleccionada de aduanas de entrada.
     */
    aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');
   
    /**
     * Lista de catálogos de estados.
     */
    estado: Catalogo[] = [];
   
    /**
     * Lista de países para la selección de origen.
     */
    //public crosListaDePaises = CROSLISTA_DE_PAISES;
   
    /**
     * Configuración de tabla para selección de tipo checkbox.
     */
    tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
   
    /**
     * Configuración de columnas para la tabla NICO.
     */
    //nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;
   
    /**
     * Datos cargados para la tabla NICO.
     */
    //nicoTablaDatos: NicoInfo[] = [];
   
    /**
     * Configuración de columnas para la tabla de mercancías.
     */
    //mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
   
    /**
     * Datos cargados para la tabla de mercancías.
     */
    //mercanciasTablaDatos: MercanciasInfo[] = [];
   
    /**
     * Lista de aduanas seleccionadas.
     */
    aduanasDeEntradaSeleccionadas: string[] = [];
   
    /**
     * Lista de datos de aduanas de entrada.
     */
    aduanasDeEntradaDatos: string[] = [];
   
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
     * Lista de países para seleccionar el origen de la primera sección.
     */
    //seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la segunda sección.
     */
    //seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la tercera sección.
     */
    //seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;
   
    /**
     * Etiqueta para el crosslist de país de procedencia.
     */
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'País de procedencia',
      derecha: 'País(es) seleccionados',
    };
  
    
    
  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  //public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;
  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
   
    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
   
    /**
     * Inicialización del formulario de domicilio.
     */
    this.domicilio = this.fb.group({
      codigoPostal: [''],
      estado: [''],
      muncipio: [''],
      localidad: [''],
      colonia: [''],
      calle: [''],
      lada: [''],
      telefono: [''],
      avisoCheckbox: [''],
      licenciaSanitaria: [''],
      regimen: [''],
      aduanasEntradas: [''],
      numeroPermiso: [''],
    });
   
    /**
     * Inicialización del formulario de agente.
     */
    this.formAgente = this.fb.group({
      claveScianModal: [''],
      claveDescripcionModal: [''],
    });
   
    /**
     * Inicialización del formulario de mercancías.
     */
    this.formMercancias = this.fb.group({
      clasificacion: [''],
      especificarClasificacionProducto: [''],
      denominacionEspecifica: [''],
      denominacionDistintiva: [''],
      denominacionComun: [''],
      tipoDeProducto: [''],
      estadoFisico: [''],
      fraccionArancelaria: [''],
      descripcionFraccion: [''],
      cantidadUMT: [''],
      UMT: [''],
      cantidadUMC: [''],
      UMC: [''],
      presentacion: [''],
      numeroRegistro: [''],
      fechaCaducidad: [''],
    });
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
   
  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    // this.service.obtenerEstadoList()
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((data) => {
    //     const DATOS = data?.data;
    //     this.estado = DATOS;
    //   });
  }
   
  /**
   * Obtiene los datos para la tabla de NICO desde un archivo JSON.
   */
  obtenerTablaDatos(): void {
    // this.service.obtenerTablaDatos()
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe((data) => {
    //   const DATOS = data?.datos;
    //   this.nicoTablaDatos = DATOS;
    // });
  }
   
  /**
   * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
   */
  obtenerMercanciasDatos(): void {
    // this.service.obtenerMercanciasDatos()
    // .pipe(takeUntil(this.destroyed$))
    // .subscribe((data) => {
    //   const DATOS = data?.datos;
    //   this.mercanciasTablaDatos = DATOS;
    // });
  }
   
  /**
   * Maneja el cambio del checkbox en el formulario y actualiza el estado correspondiente.
   * @param event Evento del checkbox.
   * @param form Formulario en el que se realiza el cambio.
   * @param campo Nombre del campo afectado.
   * @param metodoNombre Método correspondiente del store para actualizar el valor.
   */
  onAvisoCheckboxChange(
    event: Event,
    form: FormGroup,
    campo: string,
  ): void {
    // const CHECKBOX = event.target as HTMLInputElement;
    // if (CHECKBOX.checked) {
    //   this.domicilio.get('licenciaSanitaria')?.disable();
    // } else {
    //   this.domicilio.get('licenciaSanitaria')?.enable();
    // }
    // const VALOR = form.get(campo)?.value;
    // (this.tramite260211Store[metodoNombre] as (value: any) => void)(VALOR);
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
     * Cambia el valor de la fecha final en el formulario.
     * @param nuevo_valor Nuevo valor de la fecha final.
     */
    public cambioFechaFinal(nuevo_valor: string): void {
  
      this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
      this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
    }

}
