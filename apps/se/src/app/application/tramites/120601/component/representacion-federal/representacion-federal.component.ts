import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, DATOS_GENERALES_REPRESENTACION, TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { RepresentacionFederal } from '../../modelos/datos-empresa.model';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
/**
 * Componente que representa la representación federal en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,  
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TableComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.css',
})

export class RepresentacionFederalComponent implements OnInit, OnDestroy {

  /**
   * Datos del encabezado de la tabla.
   */
  tableHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla.
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   */
  public formulario!: FormGroup;

  /**
   * Representa el estado seleccionado del catálogo.
   * Se espera que esta propiedad sea del tipo 'Catalogo[]'.
   */
  public estado!: Catalogo[];

  /**
   * Índice de la fila seleccionada en la tabla. Por defecto, se inicializa en 1.
   */
  selectedRow: number = 1;

  /**
   * Configuración de la tabla para los socios.
   */
  configuracionTabla = DATOS_GENERALES_REPRESENTACION;

  /**
   * Arreglo de datos para los socios.
   */
  datosSocios: RepresentacionFederal[] = [];

  /**
   * Representa la representación seleccionada del catálogo.
   * Se espera que esta propiedad sea del tipo 'Catalogo[]'.
   */
  public representacion!: Catalogo[];

  /**
   * Subject que se utiliza para manejar la destrucción del componente.
   */

  private destroyed$ = new Subject<void>();

  /**
   * Indica si el formulario es de solo lectura.
   * Por defecto, se inicializa en false.
   */

  esFormularioSoloLectura: boolean = false; 


  /**
   * Método que se ejecuta al inicializar el componente.
   * @returns {void}
   */

  /**
   * Constructor del componente.
   * 
   * @param fb - Instancia de FormBuilder para la creación de formularios reactivos.
   */


  constructor(
    private fb: FormBuilder,
    private query: Tramite120601Query,
    private store: Tramite120601Store,
    private datosEmpresaService: DatosEmpresaService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
  }
 /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getEntidadFederativa();
    this.getRepresentacionFederal();
    this.getDatosSocios();

    this.query.selectEstado$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.formulario.patchValue({
        estado: data
      })
    });

    this.query.selectRepresentacion$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data)=>{
      this.formulario.patchValue({
        representacion: data
      })
    })
 
  }

  /**
   * Crea el formulario con los campos necesarios y sus validaciones.
   * @returns {void}
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      estado: [''],
      representacion: ['', Validators.required],
    });
  }

  /**
   * Recupera y establece la información de la entidad federativa.
   * @returns {void}
   */
  public getEntidadFederativa(): void {
    this.datosEmpresaService.obtenerEstado().subscribe((data)=>{
      this.estado = data;
    });
  }

  /**
   * Recupera y establece la información de la representación federal.
   * @returns {void}
   */

  getRepresentacionFederal():void {
    this.datosEmpresaService.obtenerDatosDeRepresentacionFederal().subscribe((data)=>{
      this.representacion = data;
    });
  }

  /**
   * Recupera y establece la información de la representación federal.
   * @returns {void}
   */
  public getDatosSocios(): void {
    this.datosEmpresaService.ObtenerTablaDeRepresentaciónFederal().subscribe((data)=>{
      this.datosSocios = data;
    })
    
  }

  /**
   * Método para validar la representación federal.
   * @param _e El evento de selección de documento.
   * @returns {void}
   */

  public docSeleccionado(_e: Event): void {
    // Esta es una función dinámica; una vez que obtengamos la API, la implementaremos.
    this.store.setEstado(this.formulario.get('estado')?.value);
  }

  /**
   * Método para validar la representación federal.
   * @param _e El evento de validación de representación federal.
   * @returns {void}
   */

  public validarRepresentacionFederalIDCSECEROR_(_e: Event): void {
    // Esta es una función dinámica; una vez que obtengamos la API, la implementaremos.
    this.store.setRepresentacion(this.formulario.get('representacion')?.value);
  }

  /**
   * Método que se ejecuta cuando se destruye el componente.
   * Se utiliza para limpiar los recursos y evitar fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
