import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDelDestinatarioComponent } from '../datos-del-destinatario/datos-del-destinatario.component';
import { DetallesComponent } from '../detalles/detalles.component';
import { DomicilloDelDestinatarioComponent } from '../domicillo-del-destinatario/domicillo-del-destinatario.component';

/**
 * @component
 * @name DestinatarioComponent
 * @description Este componente es responsable de agrupar y mostrar la información relacionada con el destinatario.
 * Incluye los datos del destinatario, su domicilio y otros detalles.
 * 
 * @selector app-destinatario
 * @standalone true
 * @imports
 * - CommonModule
 * - DatosDelDestinatarioComponent
 * - DomicilloDelDestinatarioComponent
 * - DetallesComponent
 * 
 * @templateUrl ./destinatario.component.html
 * @styleUrl ./destinatario.component.css
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    DatosDelDestinatarioComponent,
    DomicilloDelDestinatarioComponent,
    DetallesComponent
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent {}