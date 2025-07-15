import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { TramiteRealizerComponent } from '../tramite_realizer/tramite_realizer.component';

@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [CommonModule, TramiteRealizerComponent, DatosMercanciaComponent],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.css',
})
export class DatosGeneralesComponent {}
