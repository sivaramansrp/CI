import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { UppercaseDirective } from '../../../../shared/directives/Uppercase/uppercase.directive';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TEXTOS } from '../../../../shared/constantes/octava-temporral.enum';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    SelectCatalogosComponent
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss'
})
export class PartidasDeLaComponent implements OnInit {
  form!: FormGroup;
  TEXTOS = TEXTOS;
  fraccionArancelariaTIGIE: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: 'Seleccione una Fraccion Arancelaria TIGIE',
    catalogos: [
      { id: 1, descripcion: '98020018 Mercancias para el Pro' },
      { id: 2, descripcion: '98020019 Mercancias para el Pro' },
      { id: 3, descripcion: '98020020 Mercancias para el Pro' }
    ]
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      fraccionArancelariaTIGIE: [''],
      descripcion: ['', Validators.required],
      valorPartidaUSD: ['', [Validators.required, Validators.min(0)]]
    });
  }

  fraccionArancelariaTIGIESelection(aduana: any) {
    // Handle selection logic here
  }
}
