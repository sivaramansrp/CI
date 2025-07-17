import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { DatosComunesService } from '../../../../shared/services/datos-comunes.service';
import { TercerosRelacionadosService } from '../../../../shared/services/terceros-relacionados.service';
import { EsquemaDeCertificacionService } from '../../services/esquema-de-certificacion.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {


  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  procedureNumero: string = '32612';
  procedureActivo: boolean = true;
  public consultaState!: ConsultaioState;
  private destroyNotifier$: Subject<void> = new Subject();
  public esFormularioSoloLectura: boolean = false;

  constructor(
    private consultaQuery: ConsultaioQuery,
    private datosComunesSvc: DatosComunesService,
    private tercerosRelacionadosSvc: TercerosRelacionadosService,
    private esquemaCertificacionSvc: EsquemaDeCertificacionService
  ) {

  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
        this.esFormularioSoloLectura = seccionState.readonly;
        if(this.consultaState.update) {
          this.guardarDatosComunesFormulario();
          this.guardarTercerosFormulario();
          this.getAgenteAduanalFormulario();
          this.getAgenteFormulario();
          this.getPerfilesFormulario();
          this.getPerfilesAccodianeFormulario();
        }
    })).subscribe();
   }
  /**
   * Selecciona una pestaña por su índice y actualiza el índice de la pestaña actual.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  public guardarTercerosFormulario(): void {
    this.tercerosRelacionadosSvc.getConsultaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.tercerosRelacionadosSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  public guardarDatosComunesFormulario(): void {
    this.datosComunesSvc.getConsultaDatosComunes().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.datosComunesSvc.actualizarEstadoFormulario(response);
    })
  }

  public getAgenteAduanalFormulario(): void {
    this.esquemaCertificacionSvc.getConsultaDatosAgenteAduanal().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.esquemaCertificacionSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  public getAgenteFormulario(): void {
    this.esquemaCertificacionSvc.getConsultaAgente().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.esquemaCertificacionSvc.estadoFormulario(DATOS);
    })
  }

  public getPerfilesFormulario(): void {
    this.esquemaCertificacionSvc.getConsultaPerfiles().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = JSON.parse(JSON.stringify(response));
      this.esquemaCertificacionSvc.estadoFormularioPerfiles(DATOS);
    })
  }

  public getPerfilesAccodianeFormulario(): void {
    this.esquemaCertificacionSvc.getPrefilesConsultaAccodiane().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      Object.entries(response).forEach(([key, value]) => {
          this.esquemaCertificacionSvc.actualizarEstadoFormulario(key, value);
      });
    })
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
