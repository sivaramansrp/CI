import { Component, OnInit } from '@angular/core';
import { AMBIENTES } from '../../../../core/ambientes';
import { AcusesResolucionesComponent } from "../bandeja-acuses-resoluciones/acuses-resoluciones.component";
import { BandejaPaso1Component } from '../bandejapaso1/bandeja-paso1.component';
import { CommonModule } from '@angular/common';
import { DetallesdictamenComponent } from '../bandeja-detalles-dictamen/detallesdictamen.component';
import { DocumentosComponent } from "../bandeja-documentos/documentos.component";
import { EnvioDigitalComponent } from '../consulta-envio-digital/envio-digital.component';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { OpinionesComponent } from "../consulta-opiniones/opiniones.component";
import { Requerimientospaso1Component } from "../bandeja-requerimientos/requerimientospaso1.component";
import { RouterModule } from '@angular/router';
import { TITULO_ACUSES } from '../../../../core/enums/consulta-generica.enum';
import { TareasTramiteComponent } from '../bandeja-tareas-tramite/tareas-tramite.component';

@Component({
  selector: 'lib-consulta',
  standalone: true,
  imports: [CommonModule, RouterModule, BandejaPaso1Component, DocumentosComponent, DetallesdictamenComponent, TareasTramiteComponent, AcusesResolucionesComponent, EnvioDigitalComponent, Requerimientospaso1Component, OpinionesComponent],
  templateUrl: './bandeja.component.html',
  styleUrl: './bandeja.component.scss',
})
export class BandejaComponent implements OnInit {
  /**
   * Variable para asingar el endpoint de la ruta
   */
  public folio!: string;
  public ruta: string = '';
  txtAlerta!: string;
  subtitulo = TITULO_ACUSES;

  constructor(private folioQuery: FolioQuery) {
    /**
       * constructor de la clase BandejaComponent
       * @param folioQuery consulta del folio
       * 
       * @description
       * Se inicializa la variable ruta dependiendo del ambiente en el que se encuentre la aplicación.  
       * Si la aplicación se encuentra en localhost, se asigna la ruta de localhost,
       * de lo contrario se asigna la ruta de desarrollo.
       * Se recupera el folio desde el store y se asigna a la variable folio.
       * Se asigna el texto de alerta a la variable txtAlerta utilizando la función TXT_ALERTA_ACUSES.
       * Contiene las pestañas de acuses, documentos, detalles de dictamen y tareas de trámite.
       * Cada pestaña se carga de manera independiente utilizando lazy loading.
       * Se utiliza el enrutador de Angular para navegar entre las diferentes pestañas.
       */
  }
  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
    /**
       * Recuperar el folio desde el store
       */
    this.folioQuery.getFolio().subscribe(folio => {
      this.folio = folio || '';
    });
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