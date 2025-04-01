import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna, TablaDinamicaComponent, TramitesAsociados } from '@libs/shared/data-access-user/src';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tramites-asociados',
  standalone: true,
  imports: [CommonModule,TablaDinamicaComponent],
  templateUrl: './tramites-asociados.component.html',
  styleUrl: './tramites-asociados.component.scss',
})
export class TramitesAsociadosComponent implements OnInit {

  //getTramitesAsociados
  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  public tramitesAsociadosDatos: TramitesAsociados[] = [];
  
  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<TramitesAsociados>[] = [
    { encabezado: 'Folio trámite', clave: (item: TramitesAsociados) => item.folioTramite, orden: 1 },
    { encabezado: 'Tipo trámite', clave: (item: TramitesAsociados) => item.tipoTramite, orden: 2 },
    { encabezado: 'Estatus', clave: (item: TramitesAsociados) => item.estatus, orden: 3 },
    { encabezado: 'Fecha alta de registro', clave: (item: TramitesAsociados) => item.fetchAlta, orden: 4 }
  ];

  constructor(
    private certificadosLicenciasSvc: CertificadosLicenciasService
  ) {}

  ngOnInit(): void {
    this.certificadosLicenciasSvc.getTramitesAsociados().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
        const DATOS = JSON.parse(JSON.stringify(response));
        this.tramitesAsociadosDatos = DATOS;
    });
  }

}
