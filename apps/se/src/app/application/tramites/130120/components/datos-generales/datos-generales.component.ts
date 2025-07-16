import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosExportadorComponent } from '../datos-exportador/datos-exportador.component';
import { DatosMercanciaComponent } from '../datos-mercancia/datos-mercancia.component';
import { DatosProductorComponent } from '../datos-productor/datos-productor.component';
import { DocumentoExportacionComponent } from '../documento-exportacion/documento-exportacion.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';
import { TramiteRealizerComponent } from '../tramite_realizer/tramite_realizer.component';


@Component({
  selector: 'app-datos-generales',
  standalone: true,
  imports: [CommonModule, TramiteRealizerComponent, DatosMercanciaComponent, DocumentoExportacionComponent, DatosProductorComponent, DatosExportadorComponent, RepresentacionFederalComponent],
  templateUrl: './datos-generales.component.html',
  styleUrl: './datos-generales.component.css',
})
export class DatosGeneralesComponent {}
