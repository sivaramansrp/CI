import {
  CONFIGURACION_ANEXOS_IMPORTACION,
  CONFIGURACION_ANEXOS_TABLA,
} from '../../constantes/modificacion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Anexo } from '../../models/plantas-consulta.model';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-anexos',
  templateUrl: './datos-anexos.component.html',
  styleUrl: './datos-anexos.component.scss',
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent],
  providers: [ModificacionSolicitudeService],
})
export class DatosAnexosComponent implements OnInit, OnDestroy {
  private destroyNotifier$: Subject<void> = new Subject();

  configuracionTablaAnexo: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_TABLA;
  configuracionTablaImportacion: ConfiguracionColumna<Anexo>[] =
    CONFIGURACION_ANEXOS_IMPORTACION;

  datosAnexo: Anexo[] = [];
  datosImportacion: Anexo[] = [];

  constructor(private modificionService: ModificacionSolicitudeService) {}


  ngOnInit(): void {
    this.obteneComplimentaria()
  }

  obteneComplimentaria(): void {
    this.modificionService
      .obtenerAnexo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Anexo[]) => {
          this.datosAnexo = [...data];
          this.datosImportacion = [...data];
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next()
    this.destroyNotifier$.complete();
    this.destroyNotifier$.unsubscribe();
  }
}
