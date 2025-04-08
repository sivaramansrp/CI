import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfiguracionColumna, TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Asociados } from '../../models/datos-de-la-solicitud.model';
import { EstablecimientoService } from '../../services/establecimiento.service';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tramites-asociados-seccion',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TablaDinamicaComponent],
  templateUrl: './tramites-asociados-seccion.component.html',
  styleUrl: './tramites-asociados-seccion.component.scss',
})
export class TramitesAsociadosSeccionComponent implements OnInit , OnDestroy {
    private destroy$: Subject<void> = new Subject();
  constructor(private establecimientoService: EstablecimientoService) {
    //constructor
  }
  ngOnInit():void{
    this.obtenerListaDeAsociados();
  }
  public acuseTablaDatos: Asociados[] = [];
    public configuracionTablaTramites: ConfiguracionColumna<Asociados>[] = [
      { encabezado: '', clave: (item: Asociados) => item.id, orden: 1 },
      { encabezado: 'Folio trámite', clave: (item: Asociados) => item.folioTramite, orden: 2 },
      { encabezado: 'Tipo trámite', clave: (item: Asociados) => item.tipoTramite, orden: 3 },
      { encabezado: 'Estatus', clave: (item: Asociados) => item.estatus, orden: 4 },
      { encabezado: 'Fecha alta de registro', clave: (item: Asociados) => item.fechaAltaDeRegistro, orden: 5 },
    ];
    obtenerListaDeAsociados(): void {
      this.establecimientoService.enListaDeAsociados().pipe(takeUntil(this.destroy$)).subscribe((data: Asociados[]) => {
        this.acuseTablaDatos = data; // Asigna los datos obtenidos a la tabla dinámica.
      });
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
