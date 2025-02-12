import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SolicitanteComponent } from '../../../5701/components/solicitante/solicitante.component';


@Component({
  selector: 'app-detos-gen-del',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SolicitanteComponent],
  templateUrl: './detos-gen-del.component.html',
  styleUrl: './detos-gen-del.component.scss',
})
export class DetosGenDelComponent  {


}
