import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrosslistComponent, CrossListLable, InputFecha, InputFechaComponent, Listaclaves, LISTACLAVESDELOSLOTES, MERCANCIAS_DATA, MercanciasInfo, NICO_TABLA, ScianModel, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { Subject, takeUntil } from 'rxjs';
import { FECHA_DE_PAGO, LOCALIDAD_COLONIA } from '../../services/certificados-licencias.enum';
import { CROSLISTA_DE_PAISES } from '@libs/shared/data-access-user/src/core/enums/260701/domicillo-del.enum';

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
    ReactiveFormsModule,
    InputFechaComponent
  ],
  templateUrl: './domicillo-del.component.html',
  styleUrl: './domicillo-del.component.scss',
})
export class DomicilloDelComponent implements OnInit, OnDestroy {

   /**
     * Lista de componentes Crosslist disponibles en la vista.
     */
    @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
   
    constructor(
      private readonly fb: FormBuilder,
      private certificadosLicenciasSvc: CertificadosLicenciasService
    ) {
      // Dependencia inyectada para uso posterior
    }
   
    /**
     * Grupo de formularios para domicilio.
     */
    public domicilio!: FormGroup;
   
    /**
     * Grupo de formularios para agente.
     */
    public formAgente!: FormGroup;
   
    /**
     * Grupo de formularios para mercancías.
     */
    public formMercancias!: FormGroup;
   
    /**
     * Control para la fecha de aduanas de entrada.
     */
    public aduanasDeEntradaFecha: FormControl = new FormControl('');
   
    /**
     * Control para la fecha seleccionada de aduanas de entrada.
     */
    public aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');
   
    /**
     * Lista de catálogos de estados.
     */
    public estado: Catalogo[] = [];
   
    /**
     * Lista de países para la selección de origen.
     */
    public crosListaDePaises = CROSLISTA_DE_PAISES;
   
    /**
     * Configuración de tabla para selección de tipo checkbox.
     */
    public tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
   
    /**
     * Configuración de columnas para la tabla NICO.
     */
    public nicoTabla: ConfiguracionColumna<ScianModel>[] = NICO_TABLA;
   
    /**
     * Datos cargados para la tabla NICO.
     */
    public nicoTablaDatos: ScianModel[] = [];
   
    /**
     * Configuración de columnas para la tabla de mercancías.
     */
    public mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;
   
    /**
     * Datos cargados para la tabla de mercancías.
     */
    public mercanciasTablaDatos: MercanciasInfo[] = [];
   
    /**
     * Lista de aduanas seleccionadas.
     */
    public aduanasDeEntradaSeleccionadas: string[] = [];
   
    /**
     * Lista de datos de aduanas de entrada.
     */
    public aduanasDeEntradaDatos: string[] = [];
   
    /**
     * Indica si la sección es colapsable.
     */
    public colapsable: boolean = false;
   
    /**
     * Indica si la sección "Duo" es colapsable.
     */
    public colapsableDos: boolean = false;
   
    /**
     * Indica si la sección "Tres" es colapsable.
     */
    public colapsableTres: boolean = false;
   
    /**
     * Lista de países para seleccionar el origen de la primera sección.
     */
    seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la segunda sección.
     */
    public seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;
   
    /**
     * Lista de países para seleccionar el origen de la tercera sección.
     */
    public seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;
   
    /**
     * Etiqueta para el crosslist de país de procedencia.
     */
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'País de procedencia',
      derecha: 'País(es) seleccionados',
    };

    private destroyed$: Subject<void> = new Subject();

    public TEXTO = LOCALIDAD_COLONIA;
    public infoAlert = 'alert-warning';
    
  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;
  /**
   * Método que se ejecuta al inicializar el componente.
   */

  public listaClavesDeLosLotes: ConfiguracionColumna<Listaclaves>[] = LISTACLAVESDELOSLOTES;
  public listaClavesDeLosLotesDatos: Listaclaves[] = [];

  ngOnInit(): void {
    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
    this.obtenerListaClavesDeLosLotes();
   
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
      marcarEnCasoDeQueSea: [''],
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
      claveDeLosLotes: [''],
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
  public obtenerEstadoList(): void {
    this.certificadosLicenciasSvc.getEstadoCatalogo().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
        const DATOS = JSON.parse(JSON.stringify(response));
        this.estado = DATOS.data;
      });
  }
   
  /**
   * Obtiene los datos para la tabla de NICO desde un archivo JSON.
   */
  public obtenerTablaDatos(): void {
    this.certificadosLicenciasSvc.getScianTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.nicoTablaDatos = DATOS;
    });
  }
   
  /**
   * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
   */
  public obtenerMercanciasDatos(): void {
    this.certificadosLicenciasSvc.getMercanciasTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.mercanciasTablaDatos = DATOS;
    });
  }

  public obtenerListaClavesDeLosLotes(): void {
    this.certificadosLicenciasSvc.getListaClaveTablaDatos().pipe(takeUntil(this.destroyed$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.listaClavesDeLosLotesDatos = DATOS;
    });
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

    /**
     * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
     * Este método completa el observable destroyed$ para cancelar las suscripciones activas.
     */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
