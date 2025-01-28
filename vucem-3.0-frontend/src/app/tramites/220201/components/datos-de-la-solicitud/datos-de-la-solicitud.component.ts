import { Component } from '@angular/core';

@Component({
  selector: 'datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent {
  selectRangoDias: Array<string> = [];
  colapsable: boolean = false;
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
