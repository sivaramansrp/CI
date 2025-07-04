import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_INSTALACIONES, DatosDeLasInstalaciones, ENLACE_TABLA, Sociedades } from '../../models/sociedades.model';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sociedades-tabla',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent,TituloComponent],
  templateUrl: './sociedades-tabla.component.html',
  styleUrl: './sociedades-tabla.component.scss',
})
export class SociedadesTablaComponent implements OnInit,OnDestroy {

  private destroyNotifier$: Subject<void> = new Subject();
  public checkbox = TablaSeleccion.CHECKBOX;
  public configuracionTabla: ConfiguracionColumna<Sociedades>[] = ENLACE_TABLA;
  public sociedadesDatos: Sociedades[] = [];
  public configuracionDatosTabla: ConfiguracionColumna<DatosDeLasInstalaciones>[] = CONFIGURACION_INSTALACIONES;
  public instalacionesDatos: DatosDeLasInstalaciones[] = [];


  constructor(
    private esquemaDeCertificacionSvc: EsquemaDeCertificacionService 
  ) {

  }

  ngOnInit(): void {
    this.getSociedadesTabla();
    this.getDatosDeLasInstalacionesDatos();
  }

  public getSociedadesTabla(): void {
    this.esquemaDeCertificacionSvc.getSociedadesTablaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.sociedadesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  public getDatosDeLasInstalacionesDatos(): void {
    this.esquemaDeCertificacionSvc.getDatosDeLasInstalaciones().pipe(takeUntil(this.destroyNotifier$)).subscribe({
      next: (response) => {
        const API_RESPONSE = JSON.parse(JSON.stringify(response));
        this.instalacionesDatos = API_RESPONSE;
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
