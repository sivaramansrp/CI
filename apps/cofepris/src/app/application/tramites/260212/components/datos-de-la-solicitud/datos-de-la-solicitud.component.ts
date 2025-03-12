import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';

import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { solicitudModel } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';


@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit{
  solicitudData: solicitudModel[] = [];

  configuracionTabla: ConfiguracionColumna<solicitudModel>[] = [
    { encabezado: 'Fecha Creación', clave: (item: solicitudModel) => item.fechaCreación, orden: 1 },
    { encabezado: 'Mercancía', clave: (item: solicitudModel) => item.mercancía, orden: 2 },
    { encabezado: 'Cantidad', clave: (item: solicitudModel) => item.cantidad, orden: 3 },
    { encabezado: 'Proveedor', clave: (item: solicitudModel) => item.proveedor, orden: 4 }
  ];

  toggleState = false;
  constructor(private solicitudService: SolicitudService) {}
  ngOnInit():void {
    this.solicitudService.getSolicitudes().subscribe((data) => {
      this.solicitudData = data;
    });
  }

  handleToggle() {
    this.toggleState = !this.toggleState;
  }
}
