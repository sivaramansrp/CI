import { Component } from '@angular/core';
import {
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
  InputFecha,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-modificar-mercancias',
  templateUrl: './modificar-mercancias.component.html',
  styleUrl: './modificar-mercancias.component.scss',
})
export class ModificarMercanciasComponent {
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

  fechaFabricacion: InputFecha = {
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
      fabricacion:'21/11/2024',
      caducidad:'29/06/2025'
    },
  ];

  constructor() {
    //
  }

  paisOrigen_colapsable() {
    this.paisOrigenColapsable = !this.paisOrigenColapsable;
  }

  paisProcedencis_colapsable() {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }

  usoEspecifico_colapsable(){
    this.usoEspecificoColapsable = !this.usoEspecificoColapsable;
  }

  seleccionaProductos(event: Catalogo): void {
    console.log(event.descripcion);
  }

  seleccionaEspecificar(event: Catalogo): void {
    console.log(event.descripcion);
  }

  seleccionaTipoProducto(event: Catalogo): void {
    console.log(event.descripcion);
  }

  seleccionarFechaFabricacion(event: string): void {
    console.log(event);
  }

  seleccionarFechaCaducidad(event: string): void {
    console.log(event);
  }
}
