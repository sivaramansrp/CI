import { Component, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CapturarRequerimientoComponent } from '../capturar-requerimiento/capturar-requerimiento.component';
import { CommonModule } from '@angular/common';
import { EvaluarSolicitudService } from '../../../core/service/evaluar-solicitud.service';
import { Router } from '@angular/router';
import { SolicitarDocumentosEvaluacionComponent } from '../solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { SolicitudRequerimientoQuery } from '../../../estados/queries/requerimientos.query';
import { SolicitudRequerimientosState } from '../../../estados/evaluacion-solicitud/requerimientos.store';

@Component({
  selector: 'app-requerimiento-informacion',
  standalone: true,
  imports: [CommonModule, CapturarRequerimientoComponent, SolicitarDocumentosEvaluacionComponent],
  templateUrl: './requerimiento-informacion.component.html',
  styleUrl: './requerimiento-informacion.component.scss',
})
export class RequerimientoInformacionComponent implements OnInit {
  /**
    * Notificador para destruir las suscripciones.
    */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Estado de requerimiento de la información
   */
  public requerimientoState!: SolicitudRequerimientosState;
  /**
   * Índice de la pestaña seleccionada
  */
  indiceDictamen: number = 1;
  /**
   * Variable para activar la pestaña requerimientos de documentación
   */
  documentacion: boolean = false;
  constructor(
    private router: Router,
    private estadoService: EvaluarSolicitudService,
    private solicitudRequerimientoQuery: SolicitudRequerimientoQuery,
  ) {
    this.estadoService.buttonStatus$.subscribe(valor => {
      this.documentacion = valor;
    });
  }
  ngOnInit(): void {
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.requerimientoState = seccionState;
        })
      )
      .subscribe();
  }
  /**
  /**
    * Método para seleccionar la pestaña
    * @param i indica el número de la pestaña seleccionada
    */
  seleccionaTab(i: number): void {
    this.indiceDictamen = i;
  }
  /**
   * Método para la función del botón continuar
   */
  continuar(): void {
      if (this.indiceDictamen === 2 || Number(this.requerimientoState.idTipoRequerimiento) === 3) {
        this.router.navigate(['funcionario/firma-electronica']);
      } else {
        this.indiceDictamen = 2;
      }
  }
}
