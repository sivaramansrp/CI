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
  datosTiposSolicitud!: CatalogosSelect;

  constructor(private sExtraordinarios: ServiciosExtraordinariosService) {
  }

  ngOnInit() {
    this.getTiposSolicitud();

  }

  getTiposSolicitud() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-solicitud.json')
      .subscribe((resp) => {
        console.log('Hola');

        if (resp.code === 200) {
          const tiposSolicitud = resp.data;
          this.datosTiposSolicitud = {
            labelNombre: 'Tipo de solicitud',
            required: true,
            primerOpcion: 'Selecciona un valor',
            catalogos: tiposSolicitud,
          };

          console.log(this.datosTiposSolicitud);
        }
      });
  }
}
