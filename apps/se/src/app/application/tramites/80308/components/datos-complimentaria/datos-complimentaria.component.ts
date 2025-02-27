import {
  CONFIGURACION_ACCIONISTAS,
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
} from '../../constantes/modificacion.enum';
import {
  Complimentaria,
  Federetarios,
  Operacions,
} from '../../models/plantas-consulta.model';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DatosCertificacionComponent } from '../datos-certificacion/datos-certificacion.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    DatosCertificacionComponent,
    TablaDinamicaComponent,
  ],
  providers: [ModificacionSolicitudeService],
})
export class DatosComplimentariaComponent implements OnInit {
  private destroyNotifier$: Subject<void> = new Subject();

  configuracionTabla: ConfiguracionColumna<Complimentaria>[] =
    CONFIGURACION_ACCIONISTAS;

  configuracionFederetios: ConfiguracionColumna<Federetarios>[] =
    CONFIGURACION_FEDERETARIOS;
  configuracionOperacion: ConfiguracionColumna<Operacions>[] =
    CONFIGURACION_OPERACIONES;

  datosFederetarios: Federetarios[] = [];
  datosOperacions: Operacions[] = [];
  datosComplimentaria: Complimentaria[] = [];

  constructor(private modificionService: ModificacionSolicitudeService) {}
  ngOnInit(): void {
    this.obtenerFederetarios();
    this.obtenerOperacions();
    this.obtenerComplimentaria();
  }

  obtenerComplimentaria(): void {
    this.modificionService
      .obtenerComplimentaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Complimentaria[]) => {
          this.datosComplimentaria = [...data];
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  obtenerFederetarios(): void {
    this.modificionService
      .obtenerFederetarios()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Federetarios[]) => {
          this.datosFederetarios = [...data];
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  obtenerOperacions(): void {
    this.modificionService
      .obtenerOperacion()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Operacions[]) => {
          this.datosOperacions = [...data];
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }
}
