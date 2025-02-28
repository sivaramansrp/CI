/**
 * compo doc
 * @component Bitacora90305Component
 * @description
 * Este componente muestra un registro (bitácora) de modificaciones relacionadas con Prosec.
 * Obtiene datos de `ProsecModificacionServiceTsService` y los muestra en una tabla dinámica.
 * Además, incluye un componente de alerta para notificaciones.
 */
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { AlertComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/alert/alert.component';

import { TituloComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import { BITACORA_MODEL } from 'libs/shared/data-access-user/src/core/models/90305/prosec-modificacion.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';

import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { ProsecModificacionServiceTsService } from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.service.ts.service';
import { TEXTO_ALERT } from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.enum';

import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';

/**
 * compo doc
 * @component Bitacora90305Component
 * @description Muestra un registro de modificaciones de Prosec utilizando una tabla dinámica y alertas.
 * @selector app-bitacora-90305
 * @standalone true
 */
@Component({
  selector: 'app-bitacora-90305',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, AlertComponent],
  templateUrl: './bitacora-90305.component.html',
  styleUrl: './bitacora-90305.component.scss',
})
export class Bitacora90305Component implements OnInit {
  /** Enum para la selección de tabla */
  TablaSeleccion = TablaSeleccion;

  /** Almacena los datos obtenidos de la bitácora */
  bitacoraData: BITACORA_MODEL[] = [];

  /** Enum para los mensajes de alerta */
  TEXTO_ALERT = TEXTO_ALERT;

  /** Tipo de alerta predeterminado */
  infoAlert = 'alert-info';

  /**
   * constructor
   * @param {ProsecModificacionServiceTsService} listaDomicilios - Servicio para obtener los datos de la bitácora
   */
  constructor(private listaDomicilios: ProsecModificacionServiceTsService) {}

  /**
   * Método del ciclo de vida de Angular - inicializa el componente
   */
  ngOnInit(): void {
    this.loadBitacora();
  }

  /**
   * Configuración de columnas de la tabla
   * @type {ConfiguracionColumna<any>[]}
   */
  configuracionTabla: ConfiguracionColumna<BITACORA_MODEL>[] = [
    { encabezado: 'Tipo de modificación', clave: (item: BITACORA_MODEL) => item.tipoModificacion, orden: 1 },
    { encabezado: 'Fecha de modificación', clave: (item: BITACORA_MODEL) => item.fechaModificacion, orden: 2 },
    { encabezado: 'Valores anteriores', clave: (item: BITACORA_MODEL) => item.valoresAnteriores, orden: 3 },
    { encabezado: 'Valores nuevos', clave: (item: BITACORA_MODEL) => item.valoresNuevos, orden: 4 }
  ];

  /**
   * Obtiene los datos de la bitácora del servicio y actualiza `bitacoraData`
   */
  loadBitacora(): void {
    this.listaDomicilios.getBitacora().subscribe((resp) => {
      this.bitacoraData = resp;
    });
  }
}
