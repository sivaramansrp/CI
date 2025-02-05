import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Component } from '@angular/core';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

@Component({
  selector: 'app-criterio-de-dict',
  standalone: true,
  imports: [TituloComponent, SelectCatalogosComponent],
  templateUrl: './criterio-de-dict.component.html',
  styleUrl: './criterio-de-dict.component.scss'
})
export class CriterioDeDictComponent {

  frmCriterioDict!: FormGroup;

  solicitudMercancia: CatalogosSelect = {
    labelNombre: 'Solicitud mercancia esquema regla octava clave',
    required: true,
    primerOpcion: 'Seleccione una Solicitud mercancia',
    catalogos: [
      { id: 1, descripcion: 'La SE autorizará la importación de mercancías de la Regla 8a, cuando se' },
      { id: 2, descripcion: 'Solicitud mercancia 2' },
      { id: 3, descripcion: 'Solicitud mercancia 3' }
    ]
  };

  selectedSolicitudMercancia: Catalogo = { id: 0, descripcion: '' };

  constructor(private fb: FormBuilder) {}

  solicitudMercanciaSeleccion(e: Catalogo): void {
    this.selectedSolicitudMercancia = e;
  }

}
