import { Component } from '@angular/core';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {
  datos_tipos_solicitud!: CatalogosSelect;

  constructor(private sExtraordinarios: ServiciosExtraordinariosService) {
  }

  ngOnInit() {
    this.getTiposSolicitud();

  }

  getTiposSolicitud() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-solicitud.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const tipos_solicitud = resp.data;
          this.datos_tipos_solicitud = {
            labelNombre: 'Tipo de solicitud',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: tipos_solicitud,
          };
        }
      });
  }

  tipoSolicitud(e: Catalogo) {
    console.log(e);

  }


}
