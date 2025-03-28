import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';

import radioJson from 'libs/shared/theme/assets/json/260401/radioSiNo.json';
import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';
@Component({
  selector: 'app-manifiestos-representante-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    FormsModule,
  ],
  templateUrl: './manifiestos-representante-seccion.component.html',
  styleUrl: './manifiestos-representante-seccion.component.scss',
})
export class ManifiestosRepresentanteSeccionComponent implements OnInit {
  informacionConfidencialRadioOption = radioJson;
  constructor(private fb: FormBuilder) {}
  manifiestosRepresentanteForm!: FormGroup;
  ngOnInit() {
    this.manifiestosText = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.manifiestosRepresentanteForm = this.fb.group({
      
  representanteRfc: ['', Validators.required],
      manifests: ['', Validators.required],
      informacionConfidencialRadio: ['', Validators.required],
      representanteNombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
    });
  }

  manifiestosText: string = '';
  buscarRepresentanteRfc(): void {
    const RFC =
      this.manifiestosRepresentanteForm.get('representanteRfc')?.value;
    if (RFC) {
      this.manifiestosRepresentanteForm.patchValue({
        representanteNombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL',
      });
    }
  }
}
