import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';

@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    RepresentacionFederalComponent,
    DatosDeLaSolicitudComponent
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrl: './datos-empresa.component.css',
})
export class DatosEmpresaComponent{
 
}
