import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import EntidadFederativaOptions from '../../../../../assets/json/130102/entidad_federativa.json';
import RepresentacionFederalOptions from '../../../../../assets/json/130102/representacion_federal.json';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 */
@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, ReactiveFormsModule],
  templateUrl: './representacion.component.html',
  styleUrl: './representacion.component.scss',
})
export class RepresentacionComponent implements OnInit {
  /**
   * Configuración del formulario de representación.
   */
  frmRepresentacion!: FormGroup;

  /**
   * Configuración del select de entidades federativas.
   * @type {CatalogosSelect}
   */
  entidadFederativa!: CatalogosSelect;

  /**
   * Configuración del select de representaciones federales.
   * @type {CatalogosSelect}
   * @description Configuración del select de representaciones federales.
   */
  representacionFederal!: CatalogosSelect;

  /**
   * Entidad federativa seleccionada.
   */
  selectedEntidadFederativa: Catalogo = { id: 0, descripcion: '' };

  /**
   * Representación federal seleccionada.
   */
  selectedRepresentacionFederal: Catalogo = { id: 0, descripcion: '' };

  /**
   * Inicializa el componente RepresentacionComponent.
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @returns void
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Maneja la selección de una entidad federativa.
   * @param entidad - La entidad federativa seleccionada.
   * @returns void
   */
  entidadFederativaSeleccion(entidad: Catalogo): void {
    this.selectedEntidadFederativa = entidad;
    this.frmRepresentacion.controls['entidad'].setValue(entidad);
  }

  /**
   * Maneja la selección de una representación federal.
   * @param representacion - La representación federal seleccionada.
   * @returns void
   */
  representacionFederalSeleccion(representacion: Catalogo): void {
    this.selectedRepresentacionFederal = representacion;
    this.frmRepresentacion.controls['representacion'].setValue(representacion);
  }

  /**
   * Obtiene las entidades federativas.
   * @returns void
   */
  ngOnInit(): void {
    this.fetchEntidadFederativa();
    this.fetchRepresentacionFederal();
    this.frmRepresentacion = this.fb.group({
      entidad: [this.selectedEntidadFederativa, Validators.required],
      representacion: [this.selectedRepresentacionFederal, Validators.required],
    });
  }

  /**
   * Obtiene las entidades federativas.
   * @returns void
   * @description Obtiene las entidades federativas.
   */
  fetchEntidadFederativa() {
    this.entidadFederativa = EntidadFederativaOptions;
  }

  /**
   * Obtiene las representaciones federales.
   * @returns void
   * @description Obtiene las representaciones federales.
   */
  fetchRepresentacionFederal() {
    this.representacionFederal = RepresentacionFederalOptions;
  }
}
