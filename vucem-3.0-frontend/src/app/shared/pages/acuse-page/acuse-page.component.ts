import { Component } from '@angular/core';
import {
  ACUSE_SERVICIOS_EXTRAORDINARIOS,
  TITULO_ACUSE,
  TXT_ALERTA_ACUSE,
} from '../../constantes/servicios-extraordinarios.enum';
import {
  AccionesTabla,
  DatosPageAcuse,
} from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AcuseComponent } from '../../components/acuse/acuse.component';
import { TramitesQueries } from '../../../core/queries/tramites.queries';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``,
  standalone: true,
  imports: [CommonModule, AcuseComponent],
})
export class AcusePageComponent {
  txtAlerta = TXT_ALERTA_ACUSE;
  subtitulo = TITULO_ACUSE;
  encabezadoTablaAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS.encabezadoTablaAcuse;
  accionesTablaAcuse: AccionesTabla[] =
    ACUSE_SERVICIOS_EXTRAORDINARIOS.accionesTablaAcuse;
  datosTablaAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS.datosTablaAcuse;

  folio!: string;

  constructor( private tramiteQueries : TramitesQueries) {

  }

  ngOnInit(): void {
    this.folio = this.tramiteQueries.getTramite();
  }
}
