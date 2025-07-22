import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from "@ng-mf/data-access-user";
import { map, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DatosDeReporteAnnualComponent } from '../../components/datos-de-reporte-annual/datos-de-reporte-annual.component';
import { GuardarDatosFormulario } from '../../models/programas-reporte.model';
import { ProgramasReporteAnnualComponent } from '../../components/programas-reporte-annual/programas-reporte-annual.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
/**
 * @description Componente encargado de gestionar y mostrar los datos relacionados con la aplicación.
 * Implementa la interfaz `AfterViewInit` para realizar acciones adicionales después de que la vista ha sido inicializada.
 */
@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    ProgramasReporteAnnualComponent,
    DatosDeReporteAnnualComponent,
  ],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
})
export class DatosComponent implements OnInit, OnDestroy {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  /**
   * Referencia al componente `DatosDeReporteAnnualComponent` dentro de la plantilla.
   *
   * Se utiliza para acceder a métodos o propiedades del componente hijo desde el componente padre.
   */
  @ViewChild(DatosDeReporteAnnualComponent)
  datosDeReporteAnnualComponent!: DatosDeReporteAnnualComponent;

  /**
   * Constructor del componente.
   *
   * Inyecta las dependencias necesarias para consultar el estado de la solicitud y
   * acceder a los servicios relacionados con el formulario.
   *
   * @param consultaQuery - Query para obtener datos reactivos desde el estado de la solicitud.
   * @param solicitudService - Servicio que maneja operaciones relacionadas con la solicitud.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    public solicitudService: SolicitudService
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solicitudService
      .guardarDatosFormulario()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp: GuardarDatosFormulario) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
   * Indica si la fila de informe está seleccionada.
   */
  estaHabilitado: boolean = false;

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   *
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método para obtener el estado de la fila de informe seleccionada.
   * Actualiza el valor de `estaHabilitado` con el valor del evento.
   */
  getFilaDeInformeSeleccionada(evento: boolean): void {
    if (evento) {
      this.estaHabilitado = evento;
    }
  }

  /**
   * Método que se ejecuta cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
