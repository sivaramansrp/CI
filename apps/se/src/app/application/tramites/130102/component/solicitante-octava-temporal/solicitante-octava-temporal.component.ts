import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';

@Component({
  selector: 'app-solocitante-octava-temporal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SolicitanteComponent],
  templateUrl: './solicitante-octava-temporal.component.html',
})
export class SolicitanteOctavaTemporalComponent {


}
