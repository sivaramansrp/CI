import {
  AnexoExportacion,
  AnexoImportacion,
  Sensible,
} from '../../models/complementaria.model';
import {
  CONFIGURACION_ANEXO_EXPORTACION,
  CONFIGURACION_ANEXO_IMPORTACION,
  CONFIGURACION_SENSIBLES,
} from '../../constants/complementaria.enum';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';

@Component({
  selector: 'app-anexo-uno-pestana',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './anexo-uno-pestana.component.html',
  styleUrl: './anexo-uno-pestana.component.scss',
})
export class AnexoUnoPestanaComponent {
  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  public tablaSeleccion: TablaSeleccion = TablaSeleccion.UNDEFINED;

  public configuracionAnexoExportacionTabla: ConfiguracionColumna<AnexoExportacion>[] =
    CONFIGURACION_ANEXO_EXPORTACION;

  public anexoExportacionTablaDatos: AnexoExportacion[] = [];

  public anexoExportacionTablaSeleccionada: AnexoExportacion[] = [];

  public configuracionAnexoImportacionTabla: ConfiguracionColumna<AnexoImportacion>[] =
    CONFIGURACION_ANEXO_IMPORTACION;

  public anexoImportacionTablaDatos: AnexoImportacion[] = [];

  public anexoImportacionTablaSeleccionada: AnexoImportacion[] = [];

  public configuracionSensiblesTabla: ConfiguracionColumna<Sensible>[] =
    CONFIGURACION_SENSIBLES;

  public sensiblesTablaDatos: Sensible[] = [];

  public sensiblesTablaSeleccionada: Sensible[] = [];

  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService
  ) {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      this,
      'anexoExportacionTablaDatos',
      '/80303/anexoExportacion.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      this,
      'anexoImportacionTablaDatos',
      '/80303/anexoImportacion.json'
    );
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      this,
      'sensiblesTablaDatos',
      '/80303/sensible.json'
    );
  }
}
