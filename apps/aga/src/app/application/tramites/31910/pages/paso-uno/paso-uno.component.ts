import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DesistirSolicitudInformacionHistoricaService } from '../../services/desistir-solicitud-informacion-historica.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TabDesistirSolicitudInfoHistoricaComponent } from '../../components/tab-desistir-solicitud-info-historica/tab-desistir-solicitud-info-historica.component';

/**
 * Este componente representa el paso uno de un trámite.
 * Permite la selección de pestañas mediante el método `seleccionaTab`.
 */
@Component({
  standalone: true,
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [
    SolicitanteComponent,
    TabDesistirSolicitudInfoHistoricaComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /* Estado actual de la consulta cargado desde el store.
   * Contiene datos como modo de solo lectura y valores del formulario.
   */
  public consultaState!: ConsultaioState;

  /**
   * Índice de la pestaña seleccionada actualmente.
   */
  indice: number = 2;

  @ViewChild('solicitud', { static: false })
  datosSolicitudComponent: TabDesistirSolicitudInfoHistoricaComponent | undefined;

  /**
   * Constructor que inyecta los servicios necesarios para manejar el estado y la consulta.
   * La lógica de inicialización se delega a métodos específicos.
   */
  constructor(
    private desistirSolicitudInformacionHistoricaService: DesistirSolicitudInformacionHistoricaService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Inicializa el componente suscribiéndose al estado de consulta.
   * Según el estado, carga datos del formulario o marca como respuesta disponible.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Obtiene los datos de la solicitud desde un servicio y actualiza el estado del formulario.
   * Si la respuesta es válida, activa el indicador de datos cargados.
   */
  guardarDatosFormulario(): void {
    this.desistirSolicitudInformacionHistoricaService
      .getDatosDeLaSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.desistirSolicitudInformacionHistoricaService.actualizarEstadoFormulario(
            resp
          );
        } else {
          this.esDatosRespuesta = false;
        }
      });
  }

  /**
   * Cambia el índice de la pestaña seleccionada.
   * El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Valida todos los formularios en el componente.
   * @returns si todos los formularios son válidos
   */
  validarTodosLosFormularios(): boolean {
    if (this.indice >= 2 && this.datosSolicitudComponent) {
      this.datosSolicitudComponent.marcarCamposComoTocados();
      return this.datosSolicitudComponent.validarFormulario();
    }
    this.indice = 2;
    return false;
  }

  /**
   * Método de limpieza que se ejecuta al destruir el componente.
   * Finaliza las suscripciones observables utilizando `destroyNotifier$`.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
