import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Bitacora } from '../../models/plantas-consulta.model';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    TituloComponent,
    ComplementariaImmexComponent,
  ],
  providers: [ModificacionSolicitudeService],
})
export class BitacoraComponent implements OnDestroy, OnInit {
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private modificionService: ModificacionSolicitudeService) {}

  configuracionTabla: ConfiguracionColumna<Bitacora>[] =
    CONFIGURACION_BITACORA_TABLA;
  datos: Bitacora[] = [];

  ngOnInit(): void {
    this.modificionService
      .obteberBitacora()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Bitacora[]) => {
          this.datos = [...data];
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}
