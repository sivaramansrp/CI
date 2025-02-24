import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, SelectCatalogosComponent, TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    SelectCatalogosComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent implements OnInit {

  public solicitudForm!: FormGroup;

  public tipoDeEmpresa!: Catalogo[];

   constructor(private fb: FormBuilder,
      // eslint-disable-next-line no-empty-function
  ) {
    }

  ngOnInit(): void {
    this.crearFormulario();
    this.getTipoDeEmpresa();
  }

  crearFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoDeEmpresa: ['', Validators.required],
      denominacionExposicion: [{ value: '', disabled: true }, Validators.maxLength(120)],
      actividadEconomicaClave: ['', Validators.required],
      actividadEconomicaDescripcion:[{ value: '', disabled: true }]
    });
  }

  public getTipoDeEmpresa(): void {
    this.tipoDeEmpresa = [
      {
        id: 1,
        descripcion: 'SINALOA',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // this is a dynamic function once we get the api will implement it
  }

  
}
