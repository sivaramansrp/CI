import { Component } from '@angular/core';
import { CatalogosSelect, InputFecha } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {
  bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: false,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'TECATE',
      },
      {
        id: 2,
        descripcion: 'TIJUANA',
      },
      {
        id: 3,
        descripcion: 'TUXPAN,VER,',
      },
    ],
  };

  fechaPago: InputFecha = {
    labelNombre: 'Fecha inicio',
    required: true,
    habilitado: true,
  };

  constructor() {
    //
  }

  seleccionarFechaInicio(event: string): void{
    console.log(event)
  }
}
