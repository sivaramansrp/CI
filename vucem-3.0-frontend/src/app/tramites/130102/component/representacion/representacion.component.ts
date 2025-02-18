import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import EntidadFederativaOptions from '../../../../../assets/json/130102/entidad_federativa.json';
import RepresentacionFederalOptions from '../../../../../assets/json/130102/representacion_federal.json';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 */
@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './representacion.component.html',
})
export class RepresentacionComponent implements OnInit {
  /**
   * Configuración del formulario de representación.
   * @type {FormGroup}
   */
  frmRepresentacion!: FormGroup;

  /**
   * Entidades federativas disponibles.
   * @type {Catalogo[]} - Las entidades federativas disponibles.
   */
  entidadFederativaLista: Catalogo[] = EntidadFederativaOptions;

  /**
   * Representaciones federales disponibles.
   * @type {Catalogo[]} - Las representaciones federales disponibles.
   */
  representacionFederalLista: Catalogo[] = RepresentacionFederalOptions;

  /**
   * Representación federal seleccionada.
   * @type {Catalogo}
   */
  seleccionadaEntidadFederativa: Catalogo = { id: 0, descripcion: '' };

  /**
   * Representación federal seleccionada.
   * @type {Catalogo}
   */
  seleccionadaRepresentacionFederal: Catalogo = { id: 0, descripcion: '' };

  /**
   * Inicializa el componente RepresentacionComponent.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   */
  constructor(private fb: FormBuilder) {
    //
  }

  /**
   * Maneja la selección de una entidad federativa.
   * @param e - La entidad federativa seleccionada.
   * @returns void
   */
  entidadFederativaSeleccion(e: Catalogo): void {
    this.seleccionadaEntidadFederativa = e;
  }

  /**
   * Maneja la selección de una representación federal.
   * @param r - La representación federal seleccionada.
   * @returns void
   */
  representacionFederalSeleccion(r: Catalogo): void {
    this.seleccionadaRepresentacionFederal = r;
  }

  /**
   * Obtiene las entidades federativas y representaciones federales.
   * @returns void
   */
  ngOnInit(): void {
    this.frmRepresentacion = this.fb.group({
      entidad: ['', Validators.required],
      representacion: ['', Validators.required],
    });
  }

  /**
   * Obtiene las opciones de entidades federativas.
   * @returns void
   */
  fetchEntidadFederativa(e: Catalogo): void {
    this.seleccionadaEntidadFederativa = e;
  }

  /**
   * Obtiene las opciones de representaciones federales.
   * @returns void
   */
  fetchRepresentacionFederal(r: Catalogo): void {
    this.seleccionadaRepresentacionFederal = r;
  }
}
