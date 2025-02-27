import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, SelectCatalogosComponent, TituloComponent } from '@ng-mf/data-access-user';

/**
 * Component representing the data of the request in a multi-step process.
 */
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
  styleUrls: ['./datos-de-la-solicitud.component.css'],
})
export class DatosDeLaSolicitudComponent implements OnInit {

  /**
   * The form group for the request data.
   */
  public solicitudForm!: FormGroup;

  /**
   * The list of company types.
   */
  public tipoDeEmpresa!: Catalogo[];

  /**
   * Constructor for DatosDeLaSolicitudComponent.
   * @param fb The FormBuilder service.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getTipoDeEmpresa();
  }

  /**
   * Creates the form group for the request data.
   */
  crearFormulario(): void {
    this.solicitudForm = this.fb.group({
      tipoDeEmpresa: ['', Validators.required],
      denominacionExposicion: [{ value: '', disabled: true }, Validators.maxLength(120)],
      actividadEconomicaClave: ['', Validators.required],
      actividadEconomicaDescripcion: [{ value: '', disabled: true }]
    });
  }

  /**
   * Retrieves the list of company types.
   */
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
    ];
  }

  /**
   * Handles the selection of a document.
   * @param _e The event object.
   */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // this is a dynamic function once we get the api will implement it
  }
}