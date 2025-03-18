import { ALERT } from '../../enums/datos-de-la-solicitud-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-de-la-solicitud-260904',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './datos-de-la-solicitud-260904.component.html',
  styleUrl: './datos-de-la-solicitud-260904.component.scss',
})
export class DatosDeLaSolicitud260904Component {  
  colapsable: boolean = true;
  TEXTOS = ALERT
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }
}
