import { BANDEJA_SOLICITUDES_FORMAS, BandejaDeSolicitudes, ConfiguracionColumna, LibBandejaComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bandeja-de-solicitudes',
  standalone: true,
  imports: [CommonModule,LibBandejaComponent],
  templateUrl: './bandeja-de-solicitudes.component.html',
  styleUrl: './bandeja-de-solicitudes.component.scss',
})
export class BandejaDeSolicitudesComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  public bandejaTablaDatos: BandejaDeSolicitudes[] = [];
  public bandejaConfiguracionTabla: ConfiguracionColumna<BandejaDeSolicitudes>[] = [
    {
      encabezado: 'Id solicitud',
      clave: (artículo:BandejaDeSolicitudes) => artículo.id,
      orden: 1,
    },
    {
      encabezado: 'Tipo de trámite',
      clave: (artículo:BandejaDeSolicitudes) => artículo.tipoDeTramite,
      orden: 2,
    },
    {
      encabezado: 'Fecha creación',
      clave: (artículo:BandejaDeSolicitudes) => artículo.fecha,
      orden: 3,
    },
    {
      encabezado: 'Fecha actualización',
      clave: (artículo:BandejaDeSolicitudes) => artículo.fechaActualizacion,
      orden: 4,
    },
    {
      encabezado: 'Dias transcurridos',
      clave: (artículo:BandejaDeSolicitudes) => artículo.diasTranscurridos,
      orden: 5,
    },
    {
      encabezado: 'Departamento',
      clave: (artículo:BandejaDeSolicitudes) => artículo.departamento,
      orden: 6,
    },
    {
      encabezado: 'Número de procedimiento',
      clave: (artículo:BandejaDeSolicitudes) => artículo.numeroDeProcedimiento,
      orden: 7,
    },
  ];
  public bandejaSolicitudeFormaDatos = BANDEJA_SOLICITUDES_FORMAS;

  constructor(private bandejaSvc: BandejaDeSolicitudeService) {

  }

  ngOnInit(): void {
    this.getSolicitudeTablaDatos();
  }

  public getSolicitudeTablaDatos(): void {
    this.bandejaSvc.getSolicitudeTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.bandejaTablaDatos = JSON.parse(JSON.stringify(response));
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
