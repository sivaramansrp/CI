import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrosslistComponent,
  CrossListLable,
  InputCheckComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Subject, takeUntil } from 'rxjs';
import { EstablecimientoService } from '../../services/establecimiento/establecimiento.service';
import { TablaDinamicaComponent } from '../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { DatosDeLaProductoModel, ScianModel } from '../../models/datos-de-la-solicitud.model';
import { Modal } from 'bootstrap';
import { DESPACHO_LDA, MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';
import { CROSLISTA_DE_PAISES } from '../../constantes/datos-solicitud.enum';
import { InputRadioComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";

import { DatosDelEstablecimientoSeccionComponent } from '../datos-del-establecimiento-seccion/datos-del-establecimiento-seccion.component';
import { ManifiestosRepresentanteSeccionComponent } from '../manifiestos-representante-seccion/manifiestos-representante-seccion.component';
import { DomicillioDelEstablecimientoSeccionComponent } from '../domicillio-del-establecimiento-seccion/domicillio-del-establecimiento-seccion.component';
@Component({
  selector: 'app-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    DatosDelEstablecimientoSeccionComponent,
    InputRadioComponent,
    ManifiestosRepresentanteSeccionComponent,
    DomicillioDelEstablecimientoSeccionComponent
],
  templateUrl: './establecimiento.component.html',
  styleUrl: './establecimiento.component.scss',
})
export class EstablecimientoComponent implements OnInit, OnDestroy , AfterViewInit {
  
  @ViewChild('datosMercanciaModal', { static: false }) datosMercanciaModal!: ElementRef;
 
    @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;
    @ViewChildren(CrosslistComponent) crossList1!: QueryList<CrosslistComponent>;
    
   
  datosModalInstance!: Modal;


  datosProductoForm!: FormGroup;
  datosMercanciaForm!: FormGroup;
 
  propietarioData : DatosDeLaProductoModel[] = [];

  
  configuracionTablaDatosProducto: ConfiguracionColumna<DatosDeLaProductoModel>[] = [
    {
      encabezado: 'Tipo de producto',
      clave: (item: DatosDeLaProductoModel) => item.tipoDeProducto,
      orden: 1,
    },
    {
      encabezado: 'Nombre Específico',
      clave: (item: DatosDeLaProductoModel) => item.nombreEspecifico,
      orden: 2,
    },
    {
      encabezado: 'Cantidad o Volúmen',
      clave: (item: DatosDeLaProductoModel) => item.cantidadOVolumen,
      orden: 3,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (item: DatosDeLaProductoModel) => item.unidadDeMedida,
      orden: 4,
    },
    {
      encabezado: 'Presentación',
      clave: (item: DatosDeLaProductoModel) => item.Presentacion,
      orden: 5,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: DatosDeLaProductoModel) => item.fraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (item: DatosDeLaProductoModel) => item.descripcionDeLaFraccion,
      orden: 7,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: DatosDeLaProductoModel) => item.unidadDeMedidaDeTarifa,
      orden: 8,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: DatosDeLaProductoModel) => item.cantidadUMT,
      orden: 9,
    },
    {
      encabezado: 'Envase primario',
      clave: (item: DatosDeLaProductoModel) => item.envasePrimario,
      orden: 10,
    },
    {
      encabezado: 'Envase secundario',
      clave: (item: DatosDeLaProductoModel) => item.envaseSecundario,
      orden: 11,
    },
    {
      encabezado: 'País de origen',
      clave: (item: DatosDeLaProductoModel) => item.paisDeOrigen,
      orden: 12,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: DatosDeLaProductoModel) => item.paisDeProcedencia,
      orden: 13,
    },
    {
      encabezado: 'País de destino',
      clave: (item: DatosDeLaProductoModel) => item.paisDeDestino,
      orden: 14,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: DatosDeLaProductoModel) => item.usoEpecifico,
      orden: 15,
    }


  ];
  /** Subject para destruir el componente */
  private destroy$ = new Subject<void>();
  TablaSeleccion = TablaSeleccion;
  estadoJson: Catalogo[] = [];
 

 
  
  catalogoTipoProducto: Catalogo[] = [];
  unidadDeMedida: Catalogo[] = [];
  usoEspecifico: Catalogo[] = [];
  colapsable_procedencia: boolean = false;
 
    /**
   * @property {string[]} seleccionadasPaisDeProcedenciaDatos
   * Lista de países seleccionados como procedencia.
   */
    public seleccionadasPaisDeProcedenciaDatos: string[] = [];
  colapsable: boolean = false;
   public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService
  ) {
    //constructor
  }
  ngAfterViewInit(): void {
    
    if (this.datosMercanciaModal) {
      this.datosModalInstance = new Modal(this.datosMercanciaModal.nativeElement);
    }
   
  }

    /**
   * @property {string[]} seleccionadasPaisDeOriginDatos
   * Lista de países seleccionados como origen.
   */
    public seleccionadasPaisDeOriginDatos: string[] = [];
    public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;
     public paisDeOriginLabel: CrossListLable = {
        tituluDeLaIzquierda: 'País de origen',
        derecha: 'País(es) seleccionado(s)',
      };
      public paisDeProcedenciaLabel: CrossListLable = {
          tituluDeLaIzquierda: 'País de procedencia',
          derecha: 'País(es) seleccionados',
        };
  ngOnInit(): void {
    this.loadEstado();
    this.loadTipoProducto();
    this.loadUnidadDeMedida();
    this.loadUsoEspecifico();
 
    this.datosMercanciaForm = this.fb.group({
      nombreEspecifico: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccionArancelaria: [{ value: null, disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      umt:  [{ value: null, disabled: true }, Validators.required],
      cantidadOVolumen: ['', Validators.required],
      unidadDeMedida: ['', Validators.required],
      transporteEnvaseSecundario: ['', Validators.required],
      transporteEnvasePrimario: ['', Validators.required],
      usoEspecifico: ['', Validators.required],
      almacenamientoEnvasePrimario: ['', Validators.required],
      presentacionaFrmaceutica: ['', Validators.required],
    });
   
   
   
  }
 
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.datosMercanciaForm.patchValue({
      paisDeOriginDatos: events,
    });
  }

  paisDeProcedenciaSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeProcedenciaDatos = events;
    this.datosMercanciaForm.patchValue({
      paisDeProcedenciaDatos: events,
    });
  }
  loadEstado(): void {
    this.establecimientoService
      .getEstadoData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estadoJson = resp;
      });
  }

  

  loadTipoProducto():void{
    this.establecimientoService
    .getTipoDeProductoData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp: Catalogo[]) => {
      this.catalogoTipoProducto = resp;
    });
  }
  loadUnidadDeMedida():void{
    this.establecimientoService
    .getUnidadDeMedidaData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp: Catalogo[]) => {
      this.unidadDeMedida = resp;
    });
  }
  loadUsoEspecifico():void{
    this.establecimientoService
    .getUsoEspecificoData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((resp: Catalogo[]) => {
      this.usoEspecifico = resp;
    });
  }
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList1.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList1.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList1.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];
  paisDeOriginBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: ():void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: ():void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: ():void => this.crossList.toArray()[0].quitar('t') },
  ];

  openDatosMercanciaModal(): void {
    this.datosModalInstance.show();
  }
  mostrar_colapsable_pais():void{
    this.colapsable = !this.colapsable;
  }
  mostrar_colapsable_pais_procedencia():void{
    this.colapsable_procedencia = !this.colapsable_procedencia;
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
