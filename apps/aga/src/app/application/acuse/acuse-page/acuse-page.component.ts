
import { ACUSE_SERVICIOS_EXTRAORDINARIOS, TITULO_ACUSE, TXT_ALERTA_ACUSE } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { AccionesTabla } from '@libs/shared/data-access-user/src';
import { AcuseComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

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

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   *
   * En este método, se obtiene el folio del trámite utilizando el servicio `tramiteQueries` y se asigna a la propiedad `folio`.
   * Luego, se genera un mensaje de alerta utilizando la función `TXT_ALERTA_ACUSE` con el folio obtenido y se asigna a la propiedad `txtAlerta`.
   */
  ngOnInit(): void {
    this.folio = '01010101010101010101010101010101';
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);
  }
}