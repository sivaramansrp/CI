import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';

import { Catalogo, CatalogoSelectComponent, SelectCatalogosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { tipoDeEmpresa} from '@ng-mf/data-access-user';


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
  constructor(private fb: FormBuilder, private store: Tramite120601Store, private query: Tramite120601Query) {
    // Initialization logic can be added here if needed
  }

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.getTipoDeEmpresa();

    this.query.selectTipoDeEmpresa$.subscribe((data)=>{
      this.solicitudForm.patchValue({
        tipoDeEmpresa: data
      })
    });
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
    this.tipoDeEmpresa = tipoDeEmpresa;
  }

  /**
   * Maneja la selección de un documento.
   * @param _e El objeto del evento.
   */
  // eslint-disable-next-line class-methods-use-this
  public docSeleccionado(_e: Event): void {
    // Esta es una función dinámica; una vez que tengamos la API, la implementaremos.
    this.store.setTipoDeEmpresa(this.solicitudForm.get('tipoDeEmpresa')?.value);
  }
}
