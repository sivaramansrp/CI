/**
 * datos-de-la-solicitud.component.ts
 * @description Componente que gestiona los datos de la solicitud para el trámite 630303.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@ng-mf/data-access-user';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Subject, takeUntil } from 'rxjs';

import { DatosRetornoAutorizacionComponent } from '../datos-retorno-autorizacion/datos-retorno-autorizacion.component';
import { DatosRetornoProrrogaComponent } from '../datos-retorno-prorroga/datos-retorno-prorroga.component';

import { FORMULARIO_DATOS_SOLICITUD } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { Tramite630303Query } from '../../estados/tramite630303.query';

import { Tramite630303State, Tramite630303Store } from '../../estados/tramite630303.store';

/**
 * Componente que gestiona los datos de la solicitud para el trámite 630303.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    DatosRetornoProrrogaComponent,
    DatosRetornoAutorizacionComponent,
    FormasDinamicasComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

  /**
   * Indica si se deben mostrar los datos de prórroga.
   */
  showDatosRetornoProrroga = false;

  /**
   * Modelo dinámico del formulario con estructura definida por el trámite.
   */
  formularioDatosSolicitud: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_SOLICITUD;

  /**
   * Formulario reactivo para los datos de importación temporal.
   */
  datosImportacionTemporalFormulario!: FormGroup;

  /**
   * Subject para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado actual del trámite cargado desde el store.
   */
  estadoSeleccionado!: Tramite630303State;

  /**
   * Constructor del componente.
   * 
   * @param fb Constructor de formularios reactivos.
   * @param retornoImportacionTemporalService Servicio para obtener datos de catálogos.
   * @param tramite630303Store Store para actualizar el estado del trámite.
   * @param tramite630303Query Query para observar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private retornoImportacionTemporalService: RetornoImportacionTemporalService,
    private tramite630303Store: Tramite630303Store,
    private tramite630303Query: Tramite630303Query
  ) { }

  /**
   * Ciclo de vida: Inicializa el formulario y carga datos de catálogos al iniciar el componente.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
    this.getProrroga();
    this.cambiarCuentaProrroga();
  }

  /**
   * Inicializa el formulario reactivo vacío (campos dinámicos se agregan aparte).
   */
  inizializarFormulario(): void {
    this.datosImportacionTemporalFormulario = this.fb.group({});
  }

  /**
   * Obtiene las opciones de Aduanas de Ingreso y las asigna al formulario dinámico.
   */
  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const ADUANA_INGRESO = this.formularioDatosSolicitud.find((item) => item.id === 'cveAduana');
        if (ADUANA_INGRESO) {
          ADUANA_INGRESO.opciones = data;
        }
      });
  }

  /**
   * Obtiene las opciones de Sección Aduanera desde el servicio.
   */
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const SECCION_ADUANERA = this.formularioDatosSolicitud.find((item) => item.id === 'cveSeccionAduanera');
        if (SECCION_ADUANERA) {
          SECCION_ADUANERA.opciones = data;
        }
      });
  }

  /**
   * Obtiene las opciones para el campo Cuenta Prórroga.
   */
  getProrroga(): void {
    this.retornoImportacionTemporalService.getProrroga()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const PRORROGA = this.formularioDatosSolicitud.find((item) => item.id === 'cuentaProrroga');
        if (PRORROGA) {
          PRORROGA.opciones = data;
        }
      });
  }

  /**
   * Observa los cambios del store del trámite y actualiza el estado local.
   */
  getValorStore(): void {
    this.tramite630303Query.selectTramite630303State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Establece un nuevo valor en el store del trámite según el evento emitido desde el formulario.
   *
   * @param $event Evento con el campo y el valor a establecer.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630303Store.setTramite630303State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630303Store.setTramite630303State($event.campo, $event.valor);
    }
    if ($event.campo === 'cuentaProrroga') {
      this.cambiarCuentaProrroga();
    }
  }

  /**
   * Cambia la visibilidad del componente de prórroga según el valor seleccionado.
   */
  cambiarCuentaProrroga(): void {
    this.showDatosRetornoProrroga = this.estadoSeleccionado?.['cuentaProrroga'] === '1';
  }

  /**
   * Ciclo de vida: Libera recursos al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
