import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import { ServiciosExtraordinariosService } from './../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { TablaComponent } from '../tabla/tabla.component';

@Component({
  selector: 'agregar-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    TablaComponent,
  ],
  templateUrl: './agregar-transporte.component.html',
  styleUrl: './agregar-transporte.component.scss',
})
export class AgregarTransporteComponent {
  datos_tipos_transporte!: CatalogosSelect;

  constructor(private sExtraordinarios: ServiciosExtraordinariosService) {}

  ngOnInit() {
    this.getTiposTransporte();
  }

  getTiposTransporte() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-transporte.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const tipos_solicitud = resp.data;
          this.datos_tipos_transporte = {
            labelNombre: 'Tipo de transporte',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: tipos_solicitud,
          };

          console.log(this.datos_tipos_transporte);
        }
      });
  }
}
