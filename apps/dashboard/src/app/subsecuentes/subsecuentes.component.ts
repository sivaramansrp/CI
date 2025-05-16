import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TituloComponent } from '@ng-mf/data-access-user';

import { AcusesYResolucionesFolioDelTramiteBusquedaComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'ng-mf-subsecuentes',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    AcusesYResolucionesFolioDelTramiteBusquedaComponent,
  ],
  templateUrl: './subsecuentes.component.html',
  styleUrl: './subsecuentes.component.css',
})
export class SubsecuentesComponent {
  procedureUrl = '/aga/subsecuentes';

  busquedaForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.busquedaForm = this.fb.group({
      folioDelTramite: [''],
      fechaInicial: [''],
      fechaFinal: [''],
    });
  }
}
