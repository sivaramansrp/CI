import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputRadioComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { LosOption } from '../../models/permiso-maquila.models';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputRadioComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {
  personaForm!: FormGroup;
  losDatos:LosOption[]=[]
  selectedValue ='option1'
  constructor(private http: HttpClient,private fb: FormBuilder,private validacionesService: ValidacionesFormularioService) { }

  ngOnInit() {
    this.fetchSolicitudeOptions()
    this.personaForm = this.fb.group({
      rfc:['',Validators.required],
      nombre: [{ value: '', disabled: true }],
      primerApellido: [{ value: '', disabled: true }],
      segundoApellido: [{ value: '', disabled: true }],
    });
  }

  isValid(field: string) {
    return this.validacionesService.isValid(this.personaForm, field);
  }


  fetchSolicitudeOptions() {
    this.http
      .get<LosOption[]>('/assets/json/260212/opciones-de-radio.json')
      .subscribe((data) => {
        this.losDatos = data;
      });
  }

  
}
