import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
export class RepresentacionComponent {
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
   * @constructor
   * @param {FormBuilder} fb - El constructor de formularios.
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   * @returns void
   */
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /**
   * Maneja la selección de una entidad federativa.
   * @param entidad - La entidad federativa seleccionada.
   * @returns void
   */
  entidadFederativaSeleccion(entidad: Catalogo): void {
    this.selectedEntidadFederativa = entidad;
  }

  /**
   * Maneja la selección de una representación federal.
   * @param representacion - La representación federal seleccionada.
   * @returns void
   */
  representacionFederalSeleccion(representacion: Catalogo): void {
    this.selectedRepresentacionFederal = representacion;
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
   * @todo Cambiar la URL por la URL real de la API.
   */
  fetchEntidadFederativa() {
    this.http
      .get('/assets/json/130102/entidad_federativa.json')
      .subscribe((data: any) => {
        this.entidadFederativa = data;
      });
  }

  /**
   * Obtiene las representaciones federales.
   * @returns void
   * @description Obtiene las representaciones federales.
   * @todo Cambiar la URL por la URL real de la API.
   */
  fetchRepresentacionFederal() {
    this.http
      .get('/assets/json/130102/representacion_federal.json')
      .subscribe((data: any) => {
        this.representacionFederal = data;
      });
  }
}
