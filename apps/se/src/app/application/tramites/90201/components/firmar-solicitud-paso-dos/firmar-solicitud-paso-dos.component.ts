/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import TablaDatos from 'libs/shared/theme/assets/json/90201/acuse-tabla.json';
import {
  firmar,
  solicitud,
} from '@libs/shared/data-access-user/src';
import { AcuseTablaDatos } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { Router } from '@angular/router';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { TramiteFolioStore } from '@libs/shared/data-access-user/src';
import { catchError, map, Subscription } from 'rxjs';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';

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
    CommonModule,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    FirmaElectronicaComponent,
  ],
  templateUrl: './firmar-solicitud-paso-dos.component.html',
  styleUrl: './firmar-solicitud-paso-dos.component.scss',
})
export class FirmarSolicitudPasoDosComponent implements OnDestroy {
  /**
   * Una propiedad pública que contiene las constantes de texto para el componente "firmar-solicitud-paso-dos".
   * El objeto `firmar` contiene varias cadenas de texto utilizadas dentro de este componente.
   */
  public TEXTOS = firmar;
  /**
   * Contiene el contenido de texto para el componente "firmar solicitud paso dos".
   * Esta variable se llena con los datos del objeto `solicitud`.
   */
  public TEXTOS2 = solicitud;
  /**
   * Configuración para las columnas de la tabla en el componente "firmar-solicitud-paso-dos".
   *
   * @type {ConfiguracionColumna<any>[]} configuracionTabla - Un arreglo de configuraciones de columnas.
   * @property {string} encabezado - El texto del encabezado para la columna.
   * @property {Function} clave - Una función que devuelve el valor para la columna basado en el elemento.
   * @property {number} orden - El orden en el que la columna debe aparecer.
   */
  public configuracionTabla: ConfiguracionColumna<any>[] = [
    { encabezado: 'no', clave: (item: any) => item.no, orden: 1 },
    { encabezado: 'documento', clave: (item: any) => item.documento, orden: 2 },
    { encabezado: 'descargar', clave: (item: any) => item.descargar, orden: 3 },
  ];

  /**
   * Un arreglo de objetos `AcuseTablaDatos` que contiene los datos para la tabla.
   * Estos datos se inicializan a partir de la constante `TablaDatos`.
   */
  public acuseTablaDatos: AcuseTablaDatos[] = TablaDatos;

  /**
   * Una instancia de Subscription que se utiliza para manejar la suscripción a eventos.
   * Esta instancia se utiliza para manejar la suscripción a eventos y liberar recursos cuando el componente se destruye.
   * @type {Subscription}
   */
  private subscription: Subscription = new Subscription();

  /**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param TramiteFolioServices - Los servicios extraordinarios.
   * @param tramiteStore - El almacén de trámites.
   */
  constructor(
    private router: Router,
    private _expansionDesvc: ExpansionDeProductoresService,
    private tramiteStore: TramiteFolioStore
  ) {}

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const firma: string = ev;
    if (firma) {
      // Obtiene el número de trámite
      this.subscription.add(
        this._expansionDesvc
          .obtenerTramite(19)
          .pipe(
            map((tramite) => {
              this.tramiteStore.establecerTramite(tramite.data, firma);
              this.router.navigate(['servicios-extraordinarios/acuse']);
            }),
            catchError((_error) => {
              return _error;
            })
          )
          .subscribe()
      );
    }
  }

  /**
   * Maneja el evento para cancelar la firma.
   * Navega al componente anterior.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
