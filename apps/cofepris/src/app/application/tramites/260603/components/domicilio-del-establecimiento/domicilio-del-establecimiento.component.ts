/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable sort-imports */
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Catalogo ,CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { DatosService } from '../../services/datos.service';
import { TablaDinamicaComponent , TablaSeleccion} from '@libs/shared/data-access-user/src';
import { ScianData } from '../../models/datos-modificacion.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { SCIAN_DATA } from '../../constantes/datos-scian.enum';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { PreOperativo } from '../../models/datos-modificacion.model';
import { DATOS_PRODUCTO } from '../../constantes/datos-scian.enum';
import { DatosProducto } from '../../models/datos-modificacion.model';
import { CrosslistComponent } from '@libs/shared/data-access-user/src';
import { CROSLISTA_DE_PAISES } from '../../constantes/datos-producto.enum';
import { CrossListLable } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent,TablaDinamicaComponent,InputRadioComponent,CrosslistComponent],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  @ViewChild(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
  domicilioForm!: FormGroup;
  claveScianForm!: FormGroup;
  DatosMercanciaForm!: FormGroup;
  estadoData:Catalogo[] = [];
  claveScian:Catalogo[] = [];
  radioOptions: PreOperativo[] = [];
  descripcionScian:Catalogo[] = [];
  clasificacionProducto:Catalogo[] = [];
  private destroy$ = new Subject<void>();
  /** Enum para la selección de tablas */
  TablaSeleccion = TablaSeleccion;
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;
  datosData: ScianData [] = [];
  colapsable: boolean = false;
    /**
   * Lista de países para la selección de origen.
   */
    public crosListaDePaises = CROSLISTA_DE_PAISES;
    /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
    seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'Uso específico:',
      derecha: 'Uso específico seleccionado*:',
    };
    
  /**
 * Botones de acción para gestionar listas de países en la primera sección.
 */
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];

  configuracionTablaProductoDatos: ConfiguracionColumna<DatosProducto>[] = DATOS_PRODUCTO.map(col => ({
    ...col,
    clave: (item: DatosProducto) => {
      const VALUE = col.clave(item);
      return VALUE instanceof Date ? VALUE.toISOString() : VALUE;
    }
  }));
  datosProducto: DatosProducto[] = [];
   /**
   * Variable que controla la visibilidad del modal.
   */
   public modal: string = 'modal';
     /**
      * Referencia al elemento de cierre del modal.
      */
     @ViewChild('closeModal') closeModal!: ElementRef;
  constructor(private fb: FormBuilder, private datosService: DatosService
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.domicilioForm = this.fb.group({
      codigoPostal: ['', Validators.required],
      estado: ['', Validators.required],
      municipio: ['', Validators.required],
      localidad: ['', Validators.required],
      colonia: ['', Validators.required],
      calle: ['', Validators.required ],
      lada: [''],
      telefono: [''],
      aviso: [''],
      noLicenciaSanitaria: ['', Validators.required],
      regimenDestinado: ['', Validators.required],
      aduanas: ['', Validators.required],
      clasificacionProducto: ['', Validators.required],
      especificarClasificacion: ['', Validators.required],
      marcaComercial: ['', Validators.required],
      denominacionComun: ['', Validators.required],
    });


    this.cargarEstadoData();
    this.cargarDatosTabla();
    this.cargarDatosProductoTabla();
    this.obtenerDatosClave();
    this.obtenerDatosDescripcion();
    this.obtenerDatosPreOperativo();
    this.obtenerclassificacionProductos();


  } 
  
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }
  
  cargarEstadoData(): void {
    this.datosService.obtenerEstadoData()
      .pipe(takeUntil(this.destroy$))
        .subscribe((resp:Catalogo[]) => { 
        this.estadoData = resp;
      });
  }

  cargarDatosTabla(): void {
    this.datosService
      .obternerDatosData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.datosData = resp;
      });
  }

  cargarDatosProductoTabla(): void {
    this.datosService
      .obtenerDatosProducto()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        console.log('datosProducto',resp);
        this.datosProducto = resp;
      });
  }
  
  obtenerDatosClave(): void {
    this.datosService
      .obtenerClaveScian()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.claveScian = resp;
      });
  }
  obtenerDatosDescripcion(): void {
    this.datosService
      .obtenerDescripcionScian()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.descripcionScian = resp;
      });
  }
  
  obtenerDatosPreOperativo(): void {
    this.datosService
      .obtenerPreOperativo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.radioOptions = resp;
      });
  }

  obtenerclassificacionProductos(): void {
    this.datosService
    .obtenerClasificationProductos()
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp) => {
      this.clasificacionProducto = resp;
    });
  }

  /**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
public mostrarModeloClave() {
  this.modal = 'show'; // Muestra el modal
  this.claveScianForm = this.fb.group({
    claveScian: ['', Validators.required],
    descripcionScian: ['', Validators.required],
  });
}

public datosDelProducto()
{
  this.modal = 'show'; // Muestra el modal
  this.DatosMercanciaForm = this.fb.group({
    clasificacionProducto: ['', Validators.required],
    especificarClasificacion: ['', Validators.required],
    marcaComercial: ['', Validators.required],
    denominacionGenerica: ['', Validators.required],
    tipoProducto: ['', Validators.required],
    estadoFisico: ['', Validators.required],
    fraccionArancelaria: ['', Validators.required],
    descripcionFraccionArancelaria: ['', Validators.required],
    unidadMedidaComercializacion: ['', Validators.required],
    umc: ['', Validators.required],
    cantidadUMC: ['', Validators.required],
    porcentajeConcentracion: ['', Validators.required],
    valorComercial: ['', Validators.required],
    fechaMovimiento: ['', Validators.required],
    presentacionFarmaceutica: ['', Validators.required],
    paisDestino: ['', Validators.required],
    paisProcedencia: ['', Validators.required],
  });
}
  /*
    * Método del ciclo de vida de Angular - destruye el componente
  */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

}
