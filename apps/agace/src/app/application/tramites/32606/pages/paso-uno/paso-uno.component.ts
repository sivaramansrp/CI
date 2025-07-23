import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Solicitud32606State, Tramite32606Store } from '../../state/Tramite32606.store';
import { EconomicoService } from '../../services/economico.service';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {

  tipoPersona!: number;
  persona: FormularioDinamico[] = [];
  domicilioFiscal: FormularioDinamico[] = [];
  indice: number = 1;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  consultaDatos!: ConsultaioState;
  solicitanteForm!: FormGroup;
  public solicitudState!: Solicitud32606State;
  esFormularioSoloLectura: boolean = false;
  public consultaState!: ConsultaioState;
  public esDatosRespuesta: boolean = false;

  constructor(
    public economico: EconomicoService,
    public consultaioQuery: ConsultaioQuery,
   ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormularios(): void {
    this.economico
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.economico.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
