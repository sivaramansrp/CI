import { Component } from '@angular/core';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-datos-para-movilizacion-nacional',
  templateUrl: './datos-para-movilizacion-nacional.component.html',
  styleUrl: './datos-para-movilizacion-nacional.component.scss'
})
export class DatosParaMovilizacionNacionalComponent {
  transporteList: CatalogosSelect = {
    labelNombre: 'Medio de transporte',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
  puntoList: CatalogosSelect = {
    labelNombre: 'Punto de verificación federal',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }

}
