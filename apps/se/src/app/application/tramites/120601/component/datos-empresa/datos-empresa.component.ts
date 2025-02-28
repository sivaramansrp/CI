import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CargarArchivosComponent } from '../cargar-archivos/cargar-archivos.component';
import { DatosDeLaSolicitudComponent } from '../datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosGeneralesSociosComponent } from '../datos-generales-socios/datos-generales-socios.component';
import { DomicilioComponent } from '../domicilio/domicilio.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    RepresentacionFederalComponent,
    DatosDeLaSolicitudComponent,
    DomicilioComponent,
    DatosGeneralesSociosComponent,
    CargarArchivosComponent
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css'],
})
export class DatosEmpresaComponent {
  // Agrega las propiedades y métodos necesarios aquí
}
