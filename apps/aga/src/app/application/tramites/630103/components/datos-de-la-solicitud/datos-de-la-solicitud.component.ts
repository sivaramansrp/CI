/**
 * datos-de-la-solicitud.component.ts
 * @description Componente que gestiona los datos de la solicitud para el trámite 630103.
 * Permite inicializar formularios, obtener datos de catálogos y manejar el estado del formulario.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@ng-mf/data-access-user';

import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

import { Subject, takeUntil } from 'rxjs';
import { FORMULARIO_DATOS_SOLICITUD } from '../../enum/autorizacion-importacion-temporal.enum';
import { Tramite630103Query } from '../../estados/tramite630103.query';

import { Tramite630103State, Tramite630103Store } from '../../estados/tramite630103.store';
import { AutorizacionImportacionTemporalService } from '../../services/autorizacion-importacion-temporal.service';

/**
 * Componente que gestiona los datos de la solicitud para el trámite 630103.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
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
  estadoSeleccionado!: Tramite630103State;

  /**
   * Constructor del componente.
   * 
   * @param fb Constructor de formularios reactivos.
   * @param autorizacionImportacionTemporalService Servicio para obtener datos de catálogos.
   * @param tramite630103Store Store para actualizar el estado del trámite.
   * @param tramite630103Query Query para observar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private autorizacionImportacionTemporalService: AutorizacionImportacionTemporalService,
    private tramite630103Store: Tramite630103Store,
    private tramite630103Query: Tramite630103Query
  ) { }

  /**
   * Ciclo de vida: Inicializa el formulario y carga datos de catálogos al iniciar el componente.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
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
    this.autorizacionImportacionTemporalService.getAduanaDeIngreso()
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
    this.autorizacionImportacionTemporalService.getSeccionAduanera()
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
 

  /**
   * Observa los cambios del store del trámite y actualiza el estado local.
   */
  getValorStore(): void {
    this.tramite630103Query.selectTramite630103State$
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
      this.tramite630103Store.setTramite630103State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630103Store.setTramite630103State($event.campo, $event.valor);
    }
   
  }

 

  /**
   * Ciclo de vida: Libera recursos al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
