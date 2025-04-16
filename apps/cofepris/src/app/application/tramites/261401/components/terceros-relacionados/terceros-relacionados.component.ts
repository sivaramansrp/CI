import { AlertComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { DESTINATARIO_ENCABEZADO_DE_TABLA } from '../../enums/destinatario.enum';
import { Destinatario } from '../../enums/destinatario.enum';
import { MENSAJE_TABLA_OBLIGATORIA } from '../../../../shared/models/terceros-relacionados.model';
import { TablaSeleccion } from '@ng-mf/data-access-user';

import { SolicitudModificacionPermisoSalidaTerritorioService } from '../../services/solicitud-modificacion-permiso-salida-territorio.service';
import { Subject } from 'rxjs';
import { Tramite261401Query } from '../../../../estados/queries/tramite261401.query';
import { Tramite261401Store } from '../../../../estados/tramites/tramite261401.store';
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
export class TercerosRelacionadosComponent implements OnInit, OnDestroy {
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;
  public infoAlert = 'alert-info';
  configuracionTablaDestinatarioFinal: ConfiguracionColumna<Destinatario>[] = DESTINATARIO_ENCABEZADO_DE_TABLA;

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;
  destinatarioDatos: Destinatario[] = [];
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    public solicitudDatosService: SolicitudModificacionPermisoSalidaTerritorioService,
    private tramite261401Store: Tramite261401Store,
    private tramite261401Query: Tramite261401Query,
  ) {
    // Constructor
  }
  ngOnInit(): void {
    this.obtenerDestinatarioListo();
  }
  obtenerDestinatarioListo(): void {
    this.solicitudDatosService
      .obtenerDestinatarioListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Destinatario[]) => {
          this.destinatarioDatos = respuesta;
          this.tramite261401Store.setDestinatarioDatos(respuesta);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
