import { ALERT } from '../../enums/domicilio-del-establecimiento-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms'
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-domicilio-del-establecimiento-260904',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, AlertComponent],
  templateUrl: './domicilio-del-establecimiento-260904.component.html',
  styleUrl: './domicilio-del-establecimiento-260904.component.scss',
})
export class DomicilioDelEstablecimiento260904Component implements OnInit {
  form!: FormGroup;
  estado: Catalogo[] = [];
  TEXTOS = ALERT;
  class = 'alert-warning'

  constructor(
    private fb: FormBuilder,
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      códigoPostal: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      municipioOAlcaldía: ['', [Validators.required]],
      localidad: [''],
      colonias: [''],
      calle: ['', [Validators.required]],
      lada: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }
}
