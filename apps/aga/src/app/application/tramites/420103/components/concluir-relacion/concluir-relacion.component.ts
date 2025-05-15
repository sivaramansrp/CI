import {
  CONFIGURACION_FECHA_FINAL,
  CONFIGURACION_FECHA_INICIAL,
  CONFIGURACION_TABLA,
} from '../../enum/concluir-relacion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Tramite420103State, Tramite420103Store } from '../../estados/tramite420103.store';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { DetallesDelMercancia } from '@libs/shared/data-access-user/src/core/models/420103/concluir-relacion.model';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { Tramite420103Query } from '../../estados/tramite420103.query';

/**
 * Componente que gestiona la funcionalidad de concluir relación en el trámite 420103.
 * Permite capturar datos como RFC, fecha inicial y fecha final, y muestra una tabla dinámica con los datos obtenidos.
 */
@Component({
  selector: 'app-concluir-relacion',
  templateUrl: './concluir-relacion.component.html',
  styleUrls: ['./concluir-relacion.component.scss'],
})
export class ConcluirRelacionComponent implements OnInit, OnDestroy {
  /**
   * Estado actual del trámite 420103.
   */
  estadoTramite420103!: Tramite420103State;

  /**
   * Formulario reactivo que gestiona los datos de la relación a concluir.
   */
  formularioConcluirRelacion!: FormGroup;

  /**
   * Configuración de la tabla dinámica para la selección de datos.
   */
  seleccionTabla = TablaSeleccion.RADIO;

  /**
   * Datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: DetallesDelMercancia[] = [];

  /**
   * Configuración de las columnas de la tabla dinámica.
   */
  configuracionTabla: ConfiguracionColumna<DetallesDelMercancia>[] = CONFIGURACION_TABLA;

  /**
   * Configuración para el campo de fecha inicial.
   */
  configuracionFechaInicial: InputFecha = CONFIGURACION_FECHA_INICIAL;

  /**
   * Configuración para el campo de fecha final.
   */
  configuracionFechaFinal: InputFecha = CONFIGURACION_FECHA_FINAL;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destruido$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente. Inicializa las dependencias necesarias.
   *
   * formBuilder - Servicio para construir formularios reactivos.
   * servicioConcluirRelacion - Servicio que gestiona las operaciones relacionadas con concluir relación.
   * consultaTramite420103 - Servicio para consultar el estado del trámite 420103.
   * almacenamientoTramite420103 - Servicio para gestionar el estado del trámite 420103.
   */
  constructor(
    private formBuilder: FormBuilder,
    private servicioConcluirRelacion: ConcluirRelacionService,
    private consultaTramite420103: Tramite420103Query,
    private almacenamientoTramite420103: Tramite420103Store
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario y sus valores iniciales.
   */
  ngOnInit(): void {
    this.consultaTramite420103.selectSeccionState$
      .pipe(takeUntil(this.destruido$))
      .subscribe((estado: Tramite420103State) => {
        this.estadoTramite420103 = estado;
      });
    this.crearFormularioConcluirRelacion();
  }

  /**
   * Crea el formulario reactivo para capturar los datos de la relación a concluir.
   */
  crearFormularioConcluirRelacion(): void {
    this.formularioConcluirRelacion = this.formBuilder.group({
      rfc: [this.estadoTramite420103.rfc],
      fechaInicial: [''],
      fechaFinal: [''],
    });
  }

  /**
   * Busca los datos relacionados con la relación a concluir y los muestra en la tabla dinámica.
   */
  buscarDatosRelacion(): void {
    if (this.formularioConcluirRelacion.get('rfc')?.value) {
      this.servicioConcluirRelacion
        .getDetallesDelMercanciaDatos()
        .pipe(takeUntil(this.destruido$))
        .subscribe((datos: DetallesDelMercancia) => {
          this.datosTabla = [datos];
        });
    }
  }

  /**
   * Actualiza el valor del RFC en el formulario y en el estado del trámite.
   *
   * valor - Nuevo valor del RFC.
   */
  actualizarFechaFinVigencia(event: Event): void {
    const VALOR = (event.target as HTMLInputElement).value;
    this.formularioConcluirRelacion.patchValue({
      rfc: VALOR,
    });
    this.almacenamientoTramite420103.setRFC(VALOR);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera los recursos y completa el Subject `destruido$`.
   */
  ngOnDestroy(): void {
    this.destruido$.next(true);
    this.destruido$.complete();
  }
}