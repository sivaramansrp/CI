import { AcusesYResolucionesFolioDelTramiteDetallesComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubsecuentesService } from '../../services/subsecuentes.service';
import { Subject, takeUntil } from 'rxjs';
import { AcusesYResoluciones } from '../../models/subsecuentes.model';

@Component({
  selector: 'ng-mf-acuses-y-resoluciones-folio-del-tramite-detalles-contenedor',
  standalone: true,
  imports: [CommonModule, AcusesYResolucionesFolioDelTramiteDetallesComponent],
  templateUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.html',
  styleUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.css',
})
export class AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent
  implements OnDestroy, OnInit
{
  procedureRegresorUrl = '/subsecuentes';
  procedureUrl = '/aga/importante/datosdelasolicitud';
  private unsubscribe$ = new Subject<void>();

  constructor(private subsecuentesService: SubsecuentesService) {}

  ngOnInit(): void {
    this.subsecuentesService
      .getAcusesYResolucionesDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.datosDeFormulario = data;
        console.log(this.datosDeFormulario);
      });

    console.log(this.datosDeFormulario);
  }

  datosDeFormulario!: AcusesYResoluciones;
  //  {
  //   folio: '0105700100020252470000002',
  //   fechaInicial: '03/01/2025',
  //   fechaFinal: '',
  //   dependencia: 'Administración General de Aduanas',
  //   unidadAdministrativaORepresentacionFederal:
  //     'AEROPUERTO INTERNAL. CD. DE MEXICO',
  //   tipoDeSolicitud: 'Registro de solicitud de servicios extraordinarios',
  //   estatusDeLaSolicitud: 'Autorizada',
  //   diasHabilesTranscurridos: '58',
  // };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
