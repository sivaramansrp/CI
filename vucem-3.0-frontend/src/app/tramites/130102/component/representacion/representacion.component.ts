import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent, ReactiveFormsModule],
  templateUrl: './representacion.component.html',
  styleUrl: './representacion.component.scss'
})
export class RepresentacionComponent {

  frmRepresentacion!: FormGroup;

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

  selectedEntidad: Catalogo = { id: 0, descripcion: '' };
  
  selectedRepresentacion: Catalogo = { id: 0, descripcion: '' };

  constructor(private fb: FormBuilder) {}

  entidadSeleccion(entidad: Catalogo): void {
    this.selectedEntidad = entidad;
  }

  representacionSeleccion(representacion: Catalogo): void {
    this.selectedRepresentacion = representacion;
  }

}
