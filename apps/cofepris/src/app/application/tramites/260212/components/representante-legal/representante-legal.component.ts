import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {
  personaForm!: FormGroup;
  constructor(private fb: FormBuilder,private validacionesService: ValidacionesFormularioService) { }

  ngOnInit() {
    this.personaForm = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      primerApellido: [{ value: '', disabled: true }],
      segundoApellido: [{ value: '', disabled: true }],
    });
  }

  isValid(field: string) {
    return this.validacionesService.isValid(this.personaForm, field);
  }
}
