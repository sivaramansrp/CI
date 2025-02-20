import { TITULO_ACUSE,  TXT_ALERTA_ACUSE } from '../../constantes/servicios-extraordinarios.enum';
import { Component, OnInit } from '@angular/core';
import { AcuseComponent } from '../../components/acuse/acuse.component';
import { CommonModule } from '@angular/common';
import { AcuseQueries } from '../../../core/queries/acuse.queries';

@Component({
  templateUrl: './acuse-page.component.html',
  styles: ``,
  standalone: true,
  imports: [CommonModule, AcuseComponent]
})
export class AcusePageComponent implements OnInit {
  txtAlerta!: string;
  subtitulo = TITULO_ACUSE;
  folio!: string;

  constructor(private acuseQueries : AcuseQueries) { }

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   *
   * En este método, se obtiene el folio del trámite utilizando el servicio `tramiteQueries` y se asigna a la propiedad `folio`.
   * Luego, se genera un mensaje de alerta utilizando la función `TXT_ALERTA_ACUSE` con el folio obtenido y se asigna a la propiedad `txtAlerta`.
   */
  ngOnInit(): void {
    this.folio = this.acuseQueries.getTramite();
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);
  }


}
