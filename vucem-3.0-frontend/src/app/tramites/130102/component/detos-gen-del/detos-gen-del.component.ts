import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '../../../../shared/components/solicitante/solicitante.component';

@Component({
  selector: 'app-detos-gen-del',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SolicitanteComponent],
  templateUrl: './detos-gen-del.component.html',
})
export class DetosGenDelComponent{


}
