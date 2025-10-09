/**
 * @component PasoUnoComponent
 * @description Este componente es responsable de manejar el primer paso del trámite.
 * Incluye la lógica para seleccionar una pestaña y actualizar el índice.
 * 
 * @import { Component } from '@angular/core';
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {number} indice - El índice de la pestaña seleccionada.
   */
  indice: number = 1;
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente `DatosCertificadoComponent` dentro de la vista.
   *
   * Esta propiedad permite acceder a los métodos y propiedades públicos del componente
   * hijo `DatosCertificadoComponent` desde el componente padre, facilitando la interacción
   * y manipulación de sus datos o comportamientos.
   *
   * @see DatosCertificadoComponent
   */
  @ViewChild(DatosCertificadoComponent) datosCertificadoComponent!: DatosCertificadoComponent;

  constructor(
    private consultaQuery: ConsultaioQuery,
    public validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService
  ) {}

  /**
   * @inheritdoc
   *
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable del estado de consulta, actualiza el estado local y
   * realiza acciones según si hay una actualización pendiente.
   *
   * @remarks
   * - Si existe un estado de consulta y requiere actualización, guarda los datos del formulario.
   * - Si no, establece la bandera de datos de respuesta como verdadera.
   *
   * @override
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
    if (
      this.consultaState &&
      this.consultaState.procedureId === '110222' &&
      this.consultaState.update
    ) {
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
    this.validarInicialmenteCertificadoService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.validarInicialmenteCertificadoService.actualizarEstadoFormulario(
            resp
          );
        }
      });
  }
  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Utiliza el Subject `destroyNotifier$` para notificar la destrucción y completar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña y actualiza el índice.
   * @param {number} i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /** Método público para validar todos los formularios del paso uno */
  public validarTodo(): boolean {
    let ES_VALIDA = true;
    if (this.datosCertificadoComponent) {
      if (!this.datosCertificadoComponent.validateAll()) {
        ES_VALIDA = false;
      }
    } else {
      ES_VALIDA = false;
    }
    return ES_VALIDA;
  }
}