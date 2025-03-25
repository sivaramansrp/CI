import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDelDestinatarioComponent } from '../datos-del-destinatario/datos-del-destinatario.component';
import { DomicilloDelDestinatarioComponent } from '../domicillo-del-destinatario/domicillo-del-destinatario.component';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [CommonModule,
    DatosDelDestinatarioComponent,
    DomicilloDelDestinatarioComponent,
    DetallesComponent
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioComponent {}
