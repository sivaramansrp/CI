import { BANDEJA_DE_TAREAS_PENDIENTES_FORMA, BandejaDeTareasPendientes, ConfiguracionColumna, LibBandejaComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BandejaDeSolicitudeService } from '../services/bandeja-de-solicitude.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bandeja-de-tareas-pendientes',
  standalone: true,
  imports: [CommonModule,LibBandejaComponent],
  templateUrl: './bandeja-de-tareas-pendientes.component.html',
  styleUrl: './bandeja-de-tareas-pendientes.component.scss',
})
export class BandejaDeTareasPendientesComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  public dePendientesConfiguracionTabla: ConfiguracionColumna<BandejaDeTareasPendientes>[] = [
      {
        encabezado: 'Folio trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.folioTramite,
        orden: 1,
      },
      {
        encabezado: 'Tipo de trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.tipoDeTramite,
        orden: 2,
      },
      {
        encabezado: 'Nombre de la tarea',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.nombreDeLaTarea,
        orden: 3,
      },
      {
        encabezado: 'Fecha de asignación',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.fechaDeAsignacion,
        orden: 4,
      },
      {
        encabezado: 'Estado de trámite',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.estadoDeTramite,
        orden: 5,
      },
      {
        encabezado: 'Departamento',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.departamento,
        orden: 6,
      },
      {
        encabezado: 'Número de procedimiento',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.numeroDeProcedimiento,
        orden: 7,
      },
      {
        encabezado: 'Origin',
        clave: (artículo:BandejaDeTareasPendientes) => artículo.origin,
        orden: 8,
      }
    ];
    public dePendientesTablaDatos: BandejaDeTareasPendientes[] = [];
    public bandejaDeTareasForma = BANDEJA_DE_TAREAS_PENDIENTES_FORMA;

    constructor(private bandejaSvc: BandejaDeSolicitudeService) {
  
    }

    ngOnInit(): void {
      this.getBandejaDeTablaDatos();
    }

    public getBandejaDeTablaDatos(): void {
      this.bandejaSvc.getTareasPendientesTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        this.dePendientesTablaDatos = JSON.parse(JSON.stringify(response));
      });
    }

    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
