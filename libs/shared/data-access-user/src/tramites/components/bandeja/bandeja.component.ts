import { Component, OnInit } from '@angular/core';
import { AMBIENTES } from '../../../core/ambientes';
import { BandejaPaso1Component } from "../bandejapaso1/bandeja-paso1.component";
import { CommonModule } from '@angular/common';
import { DetallesdictamenComponent } from "../bandeja-detallesDictamen/detallesdictamen.component";
import { DocumentosComponent } from "../bandeja-documentos/documentos.component";
import { RouterModule } from '@angular/router';
import { TareasTramiteComponent } from "../bandejaTareasTramite/tareasTramite.component";

@Component({
  selector: 'lib-consulta',
  standalone: true,
  imports: [CommonModule, RouterModule, BandejaPaso1Component, DocumentosComponent, DetallesdictamenComponent, TareasTramiteComponent],
  templateUrl: './bandeja.component.html',
  styleUrl: './bandeja.component.scss',
})
export class BandejaComponent implements OnInit {
  /**
   * Variable para asingar el endpoint de la ruta
   */
  public ruta: string = '';

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
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
