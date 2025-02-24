import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

@Component({
  selector: 'app-descripcion-del-cupo',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './descripcion-del-cupo.component.html',
  styleUrl: './descripcion-del-cupo.component.scss',
})
export class DescripcionDelCupoComponent implements OnInit {
  form!: FormGroup;

  ngOnInit() {
    this.crearFormulario();
  }

  constructor(private fb: FormBuilder) {}

  crearFormulario(): void {
    this.form = this.fb.group({
      claveDelCupo: [''],
      mecanismoDeAsignacion: [''],
      descripcionDelProducto: [''],
      unidadDeMedida: [''],
      regimenAduanero: [],
      fechaDeInicioDeVigenciaDelCupo: [],
      fechaDeFinDeVigenciaDelCupo:[],
      fraccionesArancelarias: [],
      tratadoAcuerdo: [],
      paises: []
    });
  }
}
