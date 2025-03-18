import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { COMPLEMENTO_DE_PLANTA } from '../../constantes/complementar-planta.enum';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-montos-de-inversion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './montos-de-inversion.component.html',
  styleUrl: './montos-de-inversion.component.css',
})
export class MontosDeInversionComponent {
  montosDeInversionForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.createMontosDeInversionForm();
  }

  tipoOptions = [];
  montosDeInversion = [];
  montosDeInversionTablaSeleccion = TablaSeleccion.CHECKBOX;
  montosDeInversionEncabezado = COMPLEMENTO_DE_PLANTA;
  montosDeInversionDatos = [];

  createMontosDeInversionForm(): void {
    this.montosDeInversionForm = this.fb.group({
      tipo: [''],
      cantidad: [''],
      descripsion: [''],
      mnx: [''],
    });
  }
}
