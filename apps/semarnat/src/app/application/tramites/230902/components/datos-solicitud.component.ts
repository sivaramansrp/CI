import { Component, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  CrossListLable,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, map, takeUntil } from 'rxjs';
import { Solitud230902State, Tramite230902Store } from '../estados/tramite230902.store';
import { Tramite230902Query } from '../estados/tramite230902.query';

import { PermisoCitesService } from '../services/permiso-cites.service';
import { CONTINUAR } from '../enum/permiso-cites.enum';

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
  FormSolicitud!: FormGroup;
  tipoMovimientoSeleccionada!: number;
  public titulo: string = '';
 

  private destroyNotifier$: Subject<void> = new Subject();
  public solicitudState!: Solitud230902State;

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

  constructor(
    public PermisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    public formBuilder: FormBuilder
  ) {
    // do nothing.
  }

  ngOnInit(): void {
    this.PermisoCitesService.inicializaPasoUnoDatosCatalogos();

    this.tramite230902Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$))
      .subscribe(state => {this.solicitudState = state});

    this.createFormSolitude();
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

  onTipoMovimientoChange(): void {
    const TIPO_DE_MOVIMIENTO = this.FormSolicitud.get('tipodemovimiento')?.value
    this.tipoMovimientoSeleccionada = parseInt(TIPO_DE_MOVIMIENTO,10);
    this.tramite230902Store.setTipoDeMovimiento(TIPO_DE_MOVIMIENTO);
  }

  onTipoRegimenChange(): void {
    this.tramite230902Store.setTipoDeRegimen(this.FormSolicitud.get('tipoderegimen')?.value);
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
}