import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { PoryectoDatos } from '../../models/se-shared.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-proyecto-immex',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './proyecto-immex.component.html',
  styleUrl: './proyecto-immex.component.scss',
})
export class ProyectoImmexComponent implements OnInit {
  /**
   * Datos para complementar fracción.
   */
  @Input() proyectoImmexDatos!: PoryectoDatos;

  public proyectoForm!: FormGroup;

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.crearProyectoForm();
  }


  crearProyectoForm(): void {
    this.proyectoForm = this.fb.group({
      descripcion: [this.proyectoImmexDatos.descripcion, Validators.required],
    })
  }
}
