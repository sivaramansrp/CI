import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelEstablecimientoComponent } from '../datos-del-establecimiento/datos-del-establecimiento.component';
import { DomicilioDelEstablecimientoComponent } from '../domicilio-del-establecimiento/domicilio-del-establecimiento.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component'; 

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,DatosDelEstablecimientoComponent, DomicilioDelEstablecimientoComponent,RepresentanteLegalComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {}
