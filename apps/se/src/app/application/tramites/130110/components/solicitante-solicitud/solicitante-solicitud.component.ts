import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';

@Component({
  selector: 'app-solicitante-solicitud',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, 
     forwardRef(() => SolicitanteComponent) ],
  templateUrl: './solicitante-solicitud.component.html',
  styleUrl: './solicitante-solicitud.component.css',
})
export class SolicitanteSolicitudComponent {}
