import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, SelectCatalogosComponent, TituloComponent } from '@ng-mf/data-access-user';
import tipeDeEmpresa from '../../../../../../../../../libs/shared/theme/assets/json/120601/tipoDeEmpresa.json';

/**
 * Componente que representa los datos de la solicitud en un proceso de múltiples pasos.
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
   * El formulario para los datos de la solicitud.
   */
  public solicitudForm!: FormGroup;

  /**
   * La lista de tipos de empresa.
   */
  public tipoDeEmpresa!: Catalogo[];

  /**
   * Constructor de DatosDeLaSolicitudComponent.
   * @param fb El servicio FormBuilder.
   */
  constructor(private fb: FormBuilder) {
    // Initialization logic can be added here if needed
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getTipoDeEmpresa();
  }

  /**
   * Crea el formulario para los datos de la solicitud.
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
   * Obtiene la lista de tipos de empresa.
   */
  public getTipoDeEmpresa(): void {
    this.tipoDeEmpresa = tipeDeEmpresa;
  }

  /**
   * Maneja la selección de un documento.
   * @param _e El objeto del evento.
   */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // Esta es una función dinámica; una vez que tengamos la API, la implementaremos.
  }
}
