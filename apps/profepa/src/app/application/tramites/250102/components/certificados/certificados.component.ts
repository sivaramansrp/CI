import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { ClavesDePermisos, CONFIGURACION_COLUMNA } from '../../constantes/flora-fauna.enum';

/**
 * @description
 * Componente para gestionar los permisos o certificados CITES o autorizaciones de vida silvestre.
 * Este componente utiliza el `TablaDinamicaComponent` para mostrar los datos en una tabla dinámica.
 *
 * @selector app-certificados
 * @standalone true
 * @imports [CommonModule, TablaDinamicaComponent, TituloComponent]
 * @templateUrl ./certificados.component.html
 * @styleUrl ./certificados.component.scss
 */
@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.scss',
})
export class CertificadosComponent {
  /**
   * @description
   * Define el tipo de selección para la tabla dinámica.
   * Puede ser `CHECKBOX`, `RADIO`, etc.
   *
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Configuración de las columnas de la tabla dinámica.
   * Define los nombres y campos que se mostrarán en la tabla.
   *
   * @type {ConfiguracionColumna<ClavesDePermisos>[]}
   */
  configuracionTabla: ConfiguracionColumna<ClavesDePermisos>[] = CONFIGURACION_COLUMNA;

  /**
   * @description
   * Datos que se mostrarán en la tabla dinámica.
   * Contiene los permisos o certificados que se cargarán en la tabla.
   *
   * @type {ClavesDePermisos[]}
   */
  permisosDatos: ClavesDePermisos[] = [];
}