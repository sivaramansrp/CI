import { Component, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  CrossListLable,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solitud230901State,
  Tramite230901Store,
} from '../../estados/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { CONTINUAR } from '../../enum/autorizaciones-constants';
import { Tramite230901Query } from '../../estados/tramite230901.query';

interface ConfiguracionItem {
  fraccionArancelaria: string;
  otraFraccion: string;
  descripcion: string;
  rendimientoProducto: string;
  nombreCientifico: string;
  nombreComun: string;
  marca: string;
  cantidad: number;
  unidadMedida: string;
  paisOrigen: string;
  paisProcedencia: string;
}

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent implements OnInit {


  public infoAlert = 'alert-info';
  FormSolicitud!: FormGroup;
  tipoMovimientoSeleccionada!: number;
  public titulo: string = '';
 

  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solitud230901State;

  TablaSeleccion = TablaSeleccion.CHECKBOX;

  aquandasLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Aduanas disponibles',
    derecha: 'Aduanas seleccionadas',
  };
  aduanasBotons = [
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(CONTINUAR),
    },
  ];
  aduanaSeleccion: string[] = [];
  seleccionarOrigenDelAduana: string[] = ['Tanishk', 'Shashikant', 'kalaskar'];
  seleccionarOrigenDelMovimiento: string[] = ['Tony', 'Howard', 'Stark'];
  movimientoSeleccion: string[] = [];
  movimientoBotons = [
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default fixed-width-button',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(CONTINUAR),
    },
  ];

  tablaDatos = [];
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = [
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: ConfiguracionItem) => item.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Otra fracción',
      clave: (item: ConfiguracionItem) => item.otraFraccion,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (item: ConfiguracionItem) => item.descripcion,
      orden: 3,
    },
    {
      encabezado: 'Rendimiento del producto',
      clave: (item: ConfiguracionItem) => item.rendimientoProducto,
      orden: 4,
    },
    {
      encabezado: 'Nombre científico',
      clave: (item: ConfiguracionItem) => item.nombreCientifico,
      orden: 5,
    },
    {
      encabezado: 'Nombre común',
      clave: (item: ConfiguracionItem) => item.nombreComun,
      orden: 6,
    },
    {
      encabezado: 'Marca (marcaje)',
      clave: (item: ConfiguracionItem) => item.marca,
      orden: 7,
    },
    {
      encabezado: 'Cantidad',
      clave: (item: ConfiguracionItem) => item.cantidad,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida',
      clave: (item: ConfiguracionItem) => item.unidadMedida,
      orden: 9,
    },
    {
      encabezado: 'País de orígen',
      clave: (item: ConfiguracionItem) => item.paisOrigen,
      orden: 10,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: ConfiguracionItem) => item.paisProcedencia,
      orden: 11,
    },
  ];

  showDatosMercanciaModal:boolean = false;
  formMercancia!: FormGroup;
  ALERTA_MERCANCIA = 'De no existir marca anotar "sin marca". En su caso el sistema de marca con las especificaciones correspondientes'
  tempData!: string[];
  target!: string;

  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    public formBuilder: FormBuilder
  ) {
    // do nothing.
  }

  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaPasoUnoDatosCatalogos();

    this.tramite230901Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$))
      .subscribe(state => {this.solicitudState = state});

    this.createFormSolitude();
    this.createFormMercancia();

    this.onTipoMovimientoChange();
    this.onTipoRegimenChange();
  }
  

  createFormSolitude(): void {
    this.FormSolicitud = this.formBuilder.group({
      tipodemovimiento: [
        this.solicitudState.tipoDeMovimiento,
        Validators.required,
      ],
      tipoderegimen: [this.solicitudState.tipoDeRegimen, Validators.required],
    });
  }

  createFormMercancia():void {
    this.formMercancia = this.formBuilder.group({
      fraccionArancelaria: ['', Validators.required],
      fraccionDescripcion: ['', Validators.required],
      otraFraccion: ['', Validators.required],
      descripcion: ['', Validators.required],
      rendimientoProducto: ['', Validators.required],
      clasificacionTaxonomica: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      nombreComun: ['', Validators.required],
      marca: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidadMedida: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisProcedencia: ['', Validators.required],
    });

    this.formMercancia.get('fraccionDescripcion')?.disable();
  }

  onTipoMovimientoChange(): void {
    const TIPO_DE_MOVIMIENTO = this.FormSolicitud.get('tipodemovimiento')?.value
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO,10);
    this.tramite230901Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
  }

  onTipoRegimenChange(): void {
    this.tramite230901Store.setTipoDeRegimen(this.FormSolicitud.get('tipoderegimen')?.value);
  }


  agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.aduanaSeleccion = [...this.seleccionarOrigenDelAduana];
      this.aduanaSeleccion = [];
    }
  }

  quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.aduanaSeleccion = [...this.seleccionarOrigenDelAduana];
      this.aduanaSeleccion = [];
    }
  }

  nextTabla(): void {
    this.tablaDatos = [];
    // do nothing.
  }

  cambiarRadio(value: string | number):void {
    this.target = value as string
    }

  toggleDivMercancia():void {
    this.showDatosMercanciaModal = !this.showDatosMercanciaModal;
  }
  submitMercanciaForm():void {
    this.tempData = [];
  }

  seleccionOtraFraccion():void{
    const TEMP = this.formMercancia.get('ortraFraccion')?.value;
}
}