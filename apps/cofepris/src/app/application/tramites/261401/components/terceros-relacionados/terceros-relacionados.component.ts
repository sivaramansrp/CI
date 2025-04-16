import { AlertComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { Destinatario } from '../../models/destinatario.model';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { MENSAJE_TABLA_OBLIGATORIA } from '../../../../shared/models/terceros-relacionados.model';

import { DESTINATARIO_ENCABEZADO_DE_TABLA } from '../../models/destinatario.model';
import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitud-modificacion-permiso-salida-territorio.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent {
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;
  public infoAlert = 'alert-info';
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] =
      DESTINATARIO_ENCABEZADO_DE_TABLA;
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  destinatarioDatos: Destinatario[] = [];
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    public solicitudDatosService: SolicitudModificacionPermisoSalidaTerritorioService,
  ) {
    this.obtenerDestinatarioListo();
  }

  obtenerDestinatarioListo(): void {
    this.solicitudDatosService
      .obtenerDestinatarioListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Destinatario[]) => {
          this.destinatarioDatos = respuesta;
        },
      });
  }

}
