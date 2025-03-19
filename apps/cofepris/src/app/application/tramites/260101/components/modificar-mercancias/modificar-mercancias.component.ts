import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvFunction } from '@babel/core';
import {
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
  InputFecha,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Solicitud260101State, Solicitud260101Store } from '../../estados/tramites260101.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Solicitud260101Query } from '../../estados/tramites260101.query';

@Component({
  selector: 'app-modificar-mercancias',
  templateUrl: './modificar-mercancias.component.html',
  styleUrl: './modificar-mercancias.component.scss',
})
export class ModificarMercanciasComponent implements OnInit, OnDestroy{
  productosCatalogo: CatalogosSelect = {
    labelNombre: 'Clasificacion del producto',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  especificarCatalogo: CatalogosSelect = {
    labelNombre: 'Especificar Clasificacion del producto',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  tipoProductoCatalogo: CatalogosSelect = {
    labelNombre: 'Tipo de producto',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 1,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  paisOrigenColapsable = false;
  paisOrigenCrossList = {
    paisOrigen: {
      tituluDeLaIzquierda: 'Pais de origen',
      derecha: 'Pais(es) seleccionado(s)',
    },
    selectRangoDias: [
      'ANGUILA',
      'ANTARTIDA',
      'ALBANIA (REPUBLICA DE)',
      'ALEMANIA ',
      'ANDORRA(PRINCIPADO DE)',
      'ANGOLA (REPUBLICA DE)',
      'ANTIGUA Y BARBUDDA',
    ],
    botones: [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-primary w-100',
      },
      {
        btnNombre: 'Agregar seleccion',
        class: 'btn-default w-100',
      },
      {
        btnNombre: 'Restar seleccion',
        class: 'btn-danger w-100',
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default w-100',
      },
    ],
  };

  umcCatalogo: CatalogosSelect = {
    labelNombre: 'UMC',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'ALIMENTOS',
      },
      {
        id: 2,
        descripcion: 'ALIMENTOS-TEST',
      },
    ],
  };

  paisProcedencisColapsable = false;
  paisProcedencisCrossList = {
    paisOrigen: {
      tituluDeLaIzquierda: 'Pais de origen',
      derecha: 'Pais(es) seleccionado(s)',
    },
    selectRangoDias: [
      'ANGUILA',
      'ANTARTIDA',
      'ALBANIA (REPUBLICA DE)',
      'ALEMANIA ',
      'ANDORRA(PRINCIPADO DE)',
      'ANGOLA (REPUBLICA DE)',
      'ANTIGUA Y BARBUDDA',
    ],
    botones: [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-primary w-100',
      },
      {
        btnNombre: 'Agregar seleccion',
        class: 'btn-default w-100',
      },
      {
        btnNombre: 'Restar seleccion',
        class: 'btn-danger w-100',
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default w-100',
      },
    ],
  };

  usoEspecificoColapsable = false;
  usoEspecificoCrossList = {
    paisOrigen: {
      tituluDeLaIzquierda: 'Uso especifico:',
      derecha: 'Uso especifico seleccionado*:',
    },
    selectRangoDias: [
      'ANGUILA',
      'ANTARTIDA',
      'ALBANIA (REPUBLICA DE)',
      'ALEMANIA ',
      'ANDORRA(PRINCIPADO DE)',
      'ANGOLA (REPUBLICA DE)',
      'ANTIGUA Y BARBUDDA',
    ],
    botones: [
      {
        btnNombre: 'Agregar todos',
        class: 'btn-primary w-100',
      },
      {
        btnNombre: 'Agregar seleccion',
        class: 'btn-default w-100',
      },
      {
        btnNombre: 'Restar seleccion',
        class: 'btn-danger w-100',
      },
      {
        btnNombre: 'Restar todos',
        class: 'btn-default w-100',
      },
    ],
  };

  fechaFabricacionDatos: InputFecha = {
    labelNombre: 'Fecha de fabricacion',
    required: false,
    habilitado: true,
  };

  fechaCaducidad: InputFecha = {
    labelNombre: 'Fecha de Caducidad',
    required: false,
    habilitado: true,
  };
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  configuracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Clave de los lotes ',
      clave: (item: any) => item.lotes,
      orden: 1,
    },
    {
      encabezado: 'Fecha de fabricacion',
      clave: (item: any) => item.fabricacion,
      orden: 1,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (item: any) => item.caducidad,
      orden: 1,
    },
  ];

  tipos = [
    {
      lotes: '1234567890',
      fabricacion: '21/11/2024',
      caducidad: '29/06/2025',
    },
  ];

  datosMercanciaForm!: FormGroup;
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    public fb: FormBuilder,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query, 
  ) {
    //
  }

  ngOnInit() {
    this.datosMercanciaForm = this.fb.group({
      clasificaionProductos: [
        this.solicitud260101State.clasificaionProductos,
        [Validators.required],
      ],
      especificarProducto: [
        this.solicitud260101State.especificarProducto,
        [Validators.required],
      ],
      nombreProductoEspecifico: [
        this.solicitud260101State.nombreProductoEspecifico,
        [Validators.required],
      ],
      marca: [
        this.solicitud260101State.marca,
        [Validators.required],
      ],
      tipoProducto: [
        this.solicitud260101State.tipoProducto,
        [Validators.required],
      ],
      fraccionArancelaria: [
        this.solicitud260101State.fraccionArancelaria,
        [Validators.required],
      ],
      descripcionFraccionArancelaria: [
        {
          value: this.solicitud260101State.descripcionFraccionArancelaria,
          disabled: true,
        },
        [Validators.required],
      ],
      cantidadUMT: [
        this.solicitud260101State.cantidadUMT,
        [Validators.required],
      ],
      umt: [
        {
          value: this.solicitud260101State.umt,
          disabled: true,
        },
        [Validators.required],
      ],
      cantidadUMC: [
        this.solicitud260101State.cantidadUMC,
        [Validators.required],
      ],
      umc: [
        this.solicitud260101State.umc,
        [Validators.required],
      ],
      claveDeLosLotes: [
        this.solicitud260101State.claveDeLosLotes,
        [Validators.required],
      ],
      fechaFabricacion: [
        this.solicitud260101State.fechaFabricacion,
        [Validators.required],
      ],
      fechaCaducidad: [
        this.solicitud260101State.fechaCaducidad,
        [Validators.required],
      ],
    });

    this.solicitud260101Query.seleccionarSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((res: Solicitud260101State)=>{
        this.solicitud260101State = res;
        this.datosMercanciaForm.patchValue({
          clasificaionProductos: this.solicitud260101State.clasificaionProductos,
          especificarProducto: this.solicitud260101State.especificarProducto,
          nombreProductoEspecifico: this.solicitud260101State.nombreProductoEspecifico,
          marca: this.solicitud260101State.marca,
          tipoProducto: this.solicitud260101State.tipoProducto,
          fraccionArancelaria: this.solicitud260101State.fraccionArancelaria,
          descripcionFraccionArancelaria: this.solicitud260101State.descripcionFraccionArancelaria,
          cantidadUMT: this.solicitud260101State.cantidadUMT,
          umt: this.solicitud260101State.umt,
          cantidadUMC: this.solicitud260101State.cantidadUMC,
          umc: this.solicitud260101State.umc,
          claveDeLosLotes: this.solicitud260101State.claveDeLosLotes,
          fechaFabricacion: this.solicitud260101State.fechaFabricacion,
          fechaCaducidad: this.solicitud260101State.fechaCaducidad,
        });
      })
    ).subscribe();
  }

  paisOrigen_colapsable() {
    this.paisOrigenColapsable = !this.paisOrigenColapsable;
  }

  paisProcedencis_colapsable() {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }

  usoEspecifico_colapsable() {
    this.usoEspecificoColapsable = !this.usoEspecificoColapsable;
  }

  seleccionaProductos(event: Catalogo): void {
    this.solicitud260101Store.setCadenaDeDependencia(event.descripcion);
  }

  seleccionaEspecificar(event: Catalogo): void {
    this.solicitud260101Store.setEspecificarProducto(event.id)
  }

  seleccionaTipoProducto(event: Catalogo): void {
    this.solicitud260101Store.setTipoProducto(event.id);
  }

  seleccionarFechaFabricacion(event: string): void {
    this.solicitud260101Store.setFechaFabricacion(event);
  }

  seleccionarFechaCaducidad(event: string): void {
    this.solicitud260101Store.setFechaCaducidad(event);
  }

  setNombreProductoEspecifico(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setNombreProductoEspecifico(VALUE);
  }

  setMarca(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setMarca(VALUE);
  }

  setFraccionArancelaria(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setFraccionArancelaria(VALUE);
  }

  setCantidadUMT(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMT(VALUE);
  }

  setCantidadUMC(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMC(VALUE);
  }

  setUMC(event: Catalogo): void {
    this.solicitud260101Store.setUmc(event.id);
  }

  setClaveDeDeLosLotes(event: Event) {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeLosLotes(VALUE);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
