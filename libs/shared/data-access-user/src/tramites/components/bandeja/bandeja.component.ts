import { Component, OnInit } from '@angular/core';
import { TITULO_ACUSES, TXT_ALERTA_ACUSES } from '../../../core/enums/consulta-generica.enum';
import { AMBIENTES } from '../../../core/ambientes';
import { AcusesResolucionesComponent } from "../bandejaAcusesResoluciones/acusesResoluciones.component";
import { BandejaPaso1Component } from "../bandejapaso1/bandeja-paso1.component";
import { CommonModule } from '@angular/common';
import { DetallesdictamenComponent } from "../bandeja-detallesDictamen/detallesdictamen.component";
import { DocumentosComponent } from "../bandeja-documentos/documentos.component";
import { EnvioDigitalComponent } from "../consultaEnvioDigital/envioDigital.component";
import { OpinionesComponent } from "../consultaOpiniones/Opiniones.component";
import { Requerimientospaso1Component } from "../bandejaRequerimientos/requerimientospaso1.component";
import { RouterModule } from '@angular/router';
import { TareasTramiteComponent } from "../bandejaTareasTramite/tareasTramite.component";

@Component({
  selector: 'lib-consulta',
  standalone: true,
  imports: [CommonModule, RouterModule, BandejaPaso1Component, DocumentosComponent, DetallesdictamenComponent, TareasTramiteComponent, AcusesResolucionesComponent, Requerimientospaso1Component, EnvioDigitalComponent, OpinionesComponent],
  templateUrl: './bandeja.component.html',
  styleUrl: './bandeja.component.scss',
})
export class BandejaComponent implements OnInit {
  /**
   * Variable para asingar el endpoint de la ruta
   */
  public ruta: string = '';
  folio!: string;
  txtAlerta!: string;
  subtitulo = TITULO_ACUSES;

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
    this.folio = '01010101010101010101010101010101';
    this.txtAlerta = TXT_ALERTA_ACUSES(this.folio);
  }

  /**
   * Índice de la pestaña seleccionada
   */
  indice: number = 1;
  
  /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
