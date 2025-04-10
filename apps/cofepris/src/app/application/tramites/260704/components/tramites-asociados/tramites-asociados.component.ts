import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Asociados } from '../../models/consulta.model';
import { CommonModule } from '@angular/common';
import { ConsultaService } from '../../service/consulta.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-tramites-asociados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './tramites-asociados.component.html',
  styleUrl: './tramites-asociados.component.css',
})
export class TramitesAsociadosComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public datosDestinatario: Asociados[] = [];
  TablaSeleccion = TablaSeleccion;

  destinatarioConfiguracionTabla: ConfiguracionColumna<Asociados>[] = [
    {
      encabezado: 'Folio trámite',
      clave: (item: Asociados) => item.folioTramite,
      orden: 1,
    },
    {
      encabezado: 'Tipo trámite',
      clave: (item: Asociados) => item.tipoTramite,
      orden: 2,
    },
    {
      encabezado: 'Estatus',
      clave: (item: Asociados) => item.estatus,
      orden: 3,
    },
    {
      encabezado: 'Fecha alta de registro',
      clave: (item: Asociados) => item.fechaRegistro,
      orden: 4,
    },
  ];

  constructor(private consulta: ConsultaService) {
     // Constructor vacío, no requiere inicialización adicional.
   }

  ngOnInit(): void {
    this.obtenerTablaTramites();
  }

  public obtenerTablaTramites(): void {
    this.consulta
      .obtenerTablaTramites()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.datosDestinatario = data;
      });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
