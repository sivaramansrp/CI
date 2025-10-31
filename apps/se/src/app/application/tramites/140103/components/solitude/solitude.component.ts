import { CancelacionDeCertificateComponent } from '../cancelacionde/cancelacion-de-certificado.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Cupo } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { DetalleComponent } from '../detalle/detalle.component';
import { OficioComponent } from '../oficio/oficio.component';

@Component({
  selector: 'app-solitude',
  standalone: true,
  imports: [CommonModule,CancelacionDeCertificateComponent,DetalleComponent,OficioComponent],
  templateUrl: './solitude.component.html',
  styleUrls: ['./solitude.component.scss'],
})
export class SolitudeComponent {
  selectedCupo: Cupo = {} as Cupo;
  displayCupos :boolean = false;
  onBuscarIntento(event:{submitted: boolean, invalid: boolean}):void{
console.log('Evento recibido en SolitudeComponent:', event);
  }
  onSelectedCupo(event:Cupo):void{
   this.selectedCupo=event;
   this.displayCupos = true;
      }
}
