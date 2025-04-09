import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TituloComponent
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TramiteAsociados } from '../../models/tramite-asociados.model';

/**
 * Componente que representa la tabla de trámites asociados.
 * Permite mostrar y gestionar una lista de trámites asociados con su configuración de columnas.
 */
@Component({
  selector: 'app-tramite-asociados',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './tramite-asociados.component.html',
  styleUrl: './tramite-asociados.component.css',
})
export class TramiteAsociadosComponent {
  /**
   * Configuración de las columnas de la tabla.
   * Define cómo se mostrarán los datos de los trámites asociados.
   */
  configuracionTabla!: ConfiguracionColumna<TramiteAsociados>[];

  /**
   * Lista de trámites asociados que se mostrarán en la tabla.
   */
  tramiteAsociados!: TramiteAsociados[];
}
