/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import TablaDatos from 'libs/shared/theme/assets/json/90201/acuse-tabla.json';
import { firmar, solicitud } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { AcuseTablaDatos } from 'libs/shared/data-access-user/src/core/models/90201/expansion-de-productores.model';
import { ConfiguracionColumna } from 'libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { Router } from '@angular/router';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { TramiteStore } from 'apps/aga/src/app/application/estados/tramite.store';
import { catchError, map } from 'rxjs';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';


@Component({
  selector: 'app-firmar-solicitud-paso-dos',
  standalone: true,
  imports: [CommonModule,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    FirmaElectronicaComponent
  ],
  templateUrl: './firmar-solicitud-paso-dos.component.html',
  styleUrl: './firmar-solicitud-paso-dos.component.scss',
})
export class FirmarSolicitudPasoDosComponent {


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
    { encabezado: 'No', clave: (item: any) => item.No, orden: 1 },
    { encabezado: 'Documento', clave: (item: any) => item.Documento, orden: 2 },
    { encabezado: 'Descargar', clave: (item: any) => item.Descargar, orden: 3 }
  ];

  /**
   * Un arreglo de objetos `AcuseTablaDatos` que contiene los datos para la tabla.
   * Estos datos se inicializan a partir de la constante `TablaDatos`.
   */
  public acuseTablaDatos: AcuseTablaDatos[] = TablaDatos;
 
   /**
   * Constructor del componente.
   * @param router - El enrutador.
   * @param serviciosExtraordinariosServices - Los servicios extraordinarios.
   * @param tramiteStore - El almacén de trámites.
   */
   constructor(
    private router: Router,
    private _expansionDesvc: ExpansionDeProductoresService,
    private tramiteStore: TramiteStore
  ) {
    
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const firma: string = ev;
    if (firma) {
      // Obtiene el número de trámite
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
        .subscribe();
    }
  }
}
