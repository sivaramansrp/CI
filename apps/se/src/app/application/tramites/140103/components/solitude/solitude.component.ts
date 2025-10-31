import { CancelacionDeCertificateComponent } from '../cancelacionde/cancelacion-de-certificado.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from '../oficio/oficio.component';

@Component({
  selector: 'app-solitude',
  standalone: true,
  imports: [CommonModule,CancelacionDeCertificateComponent,DetalleComponent,OficioComponent],
  templateUrl: './solitude.component.html',
  styleUrls: ['./solitude.component.scss'],
})
export class SolitudeComponent {}
