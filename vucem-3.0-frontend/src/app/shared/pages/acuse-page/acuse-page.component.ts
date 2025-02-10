import { Component, OnInit } from '@angular/core';
import {
  ACUSE_SERVICIOS_EXTRAORDINARIOS,
  TITULO_ACUSE,
  TXT_ALERTA_ACUSE,
} from '../../constantes/servicios-extraordinarios.enum';
import { AccionesTabla } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { AcuseComponent } from '../../components/acuse/acuse.component';
import { TramitesQueries } from '../../../core/queries/tramites.queries';
import { DocumentoService } from '../../../core/services/shared/documento/documento.service';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``,
  standalone: true,
  imports: [CommonModule, AcuseComponent],
})
export class AcusePageComponent implements OnInit {
  txtAlerta!: string;
  subtitulo = TITULO_ACUSE;
  encabezadoTablaAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS.encabezadoTablaAcuse;
  accionesTablaAcuse: AccionesTabla[] =
    ACUSE_SERVICIOS_EXTRAORDINARIOS.accionesTablaAcuse;
  datosTablaAcuse = ACUSE_SERVICIOS_EXTRAORDINARIOS.datosTablaAcuse;

  folio!: string;

  constructor(
    private tramiteQueries: TramitesQueries,
    private documentoService: DocumentoService
  ) {}

  ngOnInit(): void {
    this.folio = this.tramiteQueries.getTramite();
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);

    this.obtenerAcuse();
  }

  obtenerAcuse() {
    const datosAcuse = {
      templateFullPath: '',
      data: {
        '%TITULO%': 'Narnia',
        '%NOMBRE%': 'Goose',
        '%TOKEN%': 'XYZ123',
        '%HORA%': '14',
        '%MIN%': '58',
        '%SEG%': '11',
      },
    };
    this.documentoService.generarAcuse(datosAcuse).subscribe(
      (_resp) => {},
      (_error) => {}
    );
  }
}
