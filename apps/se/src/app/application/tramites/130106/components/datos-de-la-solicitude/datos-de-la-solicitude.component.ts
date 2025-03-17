/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import SolicitudeDropdown from 'libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { TituloComponent } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-datos-de-la-solicitude',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './datos-de-la-solicitude.component.html',
  styleUrl: './datos-de-la-solicitude.component.scss'
})
export class DatosDeLaSolicitudeComponent implements OnInit {

  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.inicializarFormularioSolicitud();
  }



  inicializarFormularioSolicitud(): void {
    this.formulario = this.fb.group({
      Solicitud: ['', Validators.required],
      Régimen: ['', Validators.required],
      Clasificación: ['', Validators.required]
    });
  }

  configuracionesDropdown = [
    { catalogos: SolicitudeDropdown.tramite },
    { catalogos: SolicitudeDropdown.regimen }
  ];

}
