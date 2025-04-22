
import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURATION_TABLA_DESTINATARIO, CONFIGURATION_TABLA_EXPORTADOR, Destinatario, Exportador, MENSAJE_TABLA_OBLIGATORIA } from '../../enum/sanidad.enum';
import { Component, OnInit } from '@angular/core';
import { SanidadService } from '../../service/sanidad.service';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})

export class TercerosComponent implements OnInit{
 
  /**
   * Mensaje que indica que la tabla es obligatoria.
   */
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * Configuración de las columnas de la tabla de exportadores.
   * Define el encabezado, clave y el orden de las columnas para la tabla de exportadores.
   */
  checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de exportadores.
   * Define el encabezado, clave y el orden de las columnas para la tabla de exportadores.
   */
  configuracionTabla: ConfiguracionColumna<Exportador>[] = CONFIGURATION_TABLA_EXPORTADOR;

  /**
   * Configuración de las columnas de la tabla de destinatarios.
   * Define el encabezado, clave y el orden de las columnas para la tabla de destinatarios.
   */
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO ;

  constructor(public sanidadService: SanidadService){}

  ngOnInit(): void {
    this.sanidadService.inicializaDatosExportador();
    this.sanidadService.inicializaDatosDestinatario();
  } 
}
