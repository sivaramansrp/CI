import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta-socio-accionista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-socio-accionista.component.html',
  styleUrl: './consulta-socio-accionista.component.scss',
})
export class ConsultaSocioAccionistaComponent implements OnInit {
  /** Formulario reactivo para la consulta de socio accionista */
  public formConsultaSocioAccionista!: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void { 
    this.crearFormSocioAccionista();
  }
  
  crearFormSocioAccionista(){
this.formConsultaSocioAccionista = this.fb.group({
      rfc: [''],
      curp: [''],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      fechaNacimiento: [''],
      nacionalidad: [''],
      tipoPersona: [''],
      tipoSocioAccionista: [''],
      tipoPersonaMoral: [''],
      tipoPersonaFisica: ['']
    });
  }
}


