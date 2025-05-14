import { ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA } from '../constants/confirmar-notificacion.enum';
import { CommonModule } from '@angular/common';
import { ConfirmarNotificacionService } from '../services/confirmar-notificacion.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TablaAcciones } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-acuse-recibo',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './acuse-recibo.component.html',
  styleUrl: './acuse-recibo.component.css',
})
export class AcuseReciboComponent implements OnInit, OnDestroy {
  constructor(
    private confirmarNotificacionService: ConfirmarNotificacionService
  ) {}
  private unsubscribe$ = new Subject<void>();
  acciones: TablaAcciones[] = [TablaAcciones.VER, TablaAcciones.DESCARGAR];

  ngOnInit(): void {
    // this.datosSolicitudService
    //   .obtenerListaCodigosPostales()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((data) => {
    //     this.codigosPostalesDatos = data;
    //   });
    this.confirmarNotificacionService
      .getAcuseReciboDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.acuseReciboTablaDatos = data;
      });
  }

  acuseReciboTablaDatos = [];
  // [
  //   {
  //     numero: '1',
  //     documento: 'Documento 1',
  //   },
  //   {
  //     numero: '2',
  //     documento: 'Documento 2',
  //   },
  //   {
  //     numero: '3',
  //     documento: 'Documento 3',
  //   },
  // ];
  public acuseReciboTablaConfiguracion = {
    configuracionTabla: ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA,
    acciones: this.acciones,
  };
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
