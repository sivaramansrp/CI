import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FIRMAR,
  SOLICITUD,
} from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';

import { AcuseTablaDatos } from '@libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import TablaDatos from '@libs/shared/theme/assets/json/90201/acuse-tabla.json';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';


/**
 * Componente FirmarSolicitudPasoDos que se utiliza para mostrar y gestionar los FirmarSolicitudPasoDos.
 *
 * Este componente utiliza varios subcomponentes como TituloComponent, CommonModule,
 * FirmaElectronicaComponent,TablaDinamicaComponent y AlertComponent para mostrar información y permitir al usuario seleccionar y agregar tratados.
 *
 * @component
 */

@Component({
  selector: 'app-firmar-solicitud-paso-dos',
  standalone: true,
  imports: [
    AlertComponent,
    CommonModule,
    FirmaElectronicaComponent,
    TablaDinamicaComponent,
    TituloComponent
  ],
  templateUrl: './firmar-solicitud-paso-dos.component.html',
  styleUrl: './firmar-solicitud-paso-dos.component.scss',
})
export class FirmarSolicitudPasoDosComponent {
  /**
   * Una propiedad pública que contiene las constantes de texto para el componente "firmar-solicitud-paso-dos".
   * El objeto `firmar` contiene varias cadenas de texto utilizadas dentro de este componente.
   */
  public TEXTOS = FIRMAR;
  /**
   * Contiene el contenido de texto para el componente "firmar solicitud paso dos".
   * Esta variable se llena con los datos del objeto `solicitud`.
   */
  public TEXTOS2 = SOLICITUD;
  /**
   * Configuración para las columnas de la tabla en el componente "firmar-solicitud-paso-dos".
   *
   * @type {ConfiguracionColumna<AcuseTablaDatos>[]} configuracionTabla - Un arreglo de configuraciones de columnas.
   * @property {string} encabezado - El texto del encabezado para la columna.
   * @property {Function} clave - Una función que devuelve el valor para la columna basado en el elemento.
   * @property {number} orden - El orden en el que la columna debe aparecer.
   */
  public configuracionTabla: ConfiguracionColumna<AcuseTablaDatos>[] = [
    { encabezado: 'no', clave: (item: AcuseTablaDatos) => item.no, orden: 1 },
    { encabezado: 'documento', clave: (item: AcuseTablaDatos) => item.documento, orden: 2 },
    { encabezado: 'descargar', clave: (item: AcuseTablaDatos) => item.descargar, orden: 3 },
  ];

  /**
   * Un arreglo de objetos `AcuseTablaDatos` que contiene los datos para la tabla.
   * Estos datos se inicializan a partir de la constante `TablaDatos`.
   */
  public acuseTablaDatos: AcuseTablaDatos[] = TablaDatos;

  /**
   * Constructor del componente.
   * @param router - El enrutador.
   */
  constructor(
    private router: Router
  ) {}

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const firma: string = ev;
    if (firma) {
    this.router.navigate(['temporal-contenedores/acuse'])
  }
}

}
