import {
  ACUSE_SERVICIOS_EXTRAORDINARIOS,
  TITULO_ACUSE,
  TXT_ALERTA_ACUSE,
} from '../../../core/enums/constantes-alertas.enum';
import { Component, OnInit } from '@angular/core';
import { AccionesTabla } from '../../../core/models/shared/components.model';
import { AcuseComponent } from '../../components/acuse/acuse.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TramiteFolioQueries } from '../../../core/queries/tramiteFolio.query';
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
  url!: string;

  constructor(private tramiteQueries: TramiteFolioQueries,
    private router: Router,
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   *
   * En este método, se obtiene el folio del trámite utilizando el servicio `tramiteQueries` y se asigna a la propiedad `folio`.
   * Luego, se genera un mensaje de alerta utilizando la función `TXT_ALERTA_ACUSE` con el folio obtenido y se asigna a la propiedad `txtAlerta`.
   */
  ngOnInit(): void {
    const URL_ACTUAL = this.router.url;
    this.url = URL_ACTUAL.split('/')[1];
 
    this.folio = this.tramiteQueries.getTramite();
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);
  }


}