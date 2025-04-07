import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { TablaDinamicaComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { Asociados } from '../../models/consulta.model';
import { ConsultaService } from '../../service/consulta.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tramites-asociados',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './tramites-asociados.component.html',
  styleUrl: './tramites-asociados.component.css',
})
export class TramitesAsociadosComponent implements OnInit {
  TablaSeleccion = TablaSeleccion;
  public destinatarioDatos: Asociados[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
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

  constructor(private consulta: ConsultaService) {}
  ngOnInit(): void {
    this.getTramitesTabla();
  }

  public getTramitesTabla(): void {
    this.consulta
      .getTramitesTabla()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.destinatarioDatos = data;
      });
  }
}
