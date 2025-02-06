import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
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
  styleUrl: './representacion.component.scss'
})
export class RepresentacionComponent {

  /**
   * Configuración del formulario de representación.
   */
  frmRepresentacion!: FormGroup;

  /**
   * Configuración del select de entidades federativas.
   */
  entidads: CatalogosSelect = {
    labelNombre: 'Entidad federativa',
    required: true,
    primerOpcion: 'Seleccione una entidad federativa',
    catalogos: [
      { id: 1, descripcion: 'Sinaloa' },
      { id: 2, descripcion: 'Entidad federativa 2' },
      { id: 3, descripcion: 'Entidad federativa 3' }
    ]
  };

  /**
   * Configuración del select de representaciones federales.
   */
  representacions: CatalogosSelect = {
    labelNombre: 'Representación federal',
    required: true,
    primerOpcion: 'Seleccione una representación federal',
    catalogos: [
      { id: 1, descripcion: 'Culican' },
      { id: 2, descripcion: 'Representación federal 2' },
      { id: 3, descripcion: 'Representación federal 3' }
    ]
  };

  /**
   * Entidad federativa seleccionada.
   */
  selectedEntidad: Catalogo = { id: 0, descripcion: '' };
  
  /**
   * Representación federal seleccionada.
   */
  selectedRepresentacion: Catalogo = { id: 0, descripcion: '' };

  /**
   * Maneja la selección de una entidad federativa.
   * @param entidad - La entidad federativa seleccionada.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Maneja la selección de una entidad federativa.
   * @param entidad - La entidad federativa seleccionada.
   * @returns void
  */
  entidadSeleccion(entidad: Catalogo): void {
    this.selectedEntidad = entidad;
  }

  /**
   * Maneja la selección de una representación federal.
   * @param representacion - La representación federal seleccionada.
   * @returns void
  */
  representacionSeleccion(representacion: Catalogo): void {
    this.selectedRepresentacion = representacion;
  }

  /**
   * Inicializa el formulario de representación.
   * @returns void
  */
  ngOnInit(): void {
    this.frmRepresentacion = this.fb.group({
      entidad: [this.selectedEntidad, Validators.required],
      representacion: [this.selectedRepresentacion, Validators.required]
    });
  }

}
