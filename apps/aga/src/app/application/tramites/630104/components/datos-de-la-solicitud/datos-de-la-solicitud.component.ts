/**
 * datos-de-la-solicitud.component.ts
 * Componente que gestiona los datos de la solicitud para el trámite 630303.
 * Este componente utiliza formularios reactivos y servicios para manejar la lógica de negocio
 * relacionada con la importación temporal de equipos e instrumentos musicales.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, InputFecha, ModeloDeFormaDinamica } from "@ng-mf/data-access-user";
import { InputFechaComponent } from "@ng-mf/data-access-user";

import { ESTIMADA_RETORNO, FORMULARIO_DATOS_SOLICITUD } from '../../enums/retorno-importacion-temporal.enum';
import { Tramite630104State, Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { FormasDinamicasComponent } from "@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component";
import { TituloComponent } from '@ng-mf/data-access-user';

import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

@Component({
  selector: 'app-datos-de-la-solicitud', 
  standalone: true,
  imports: [CommonModule,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    FormasDinamicasComponent,
    TituloComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Formulario dinámico para gestionar los datos de la solicitud.
   */
  formularioDatosSolicitud: ModeloDeFormaDinamica[] = FORMULARIO_DATOS_SOLICITUD;

  /**
   * Formulario reactivo para gestionar los datos de la importación temporal.
   */
  datosImportacionTemporalFormulario!: FormGroup;

  /**
   * Fecha estimada de retorno, inicializada con un valor por defecto.
   */
  datosfecha: InputFecha = ESTIMADA_RETORNO;

  /**
   * Opciones de prórrogas obtenidas desde un catálogo.
   */
  prorrogaOpciones: Catalogo[] = [];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Bandera que indica si se debe mostrar el componente de retorno de prórroga.
   */
  showRetornoProrroga: boolean = false;

  /**
   * Estado seleccionado del trámite 630303.
   */
  estadoSeleccionado!: Tramite630104State;

  /**
   * Constructor del componente.
   * 
   * @param fb - Constructor de formularios reactivos.
   * @param equipoEInstrumentosMusicalesService - Servicio para obtener datos de catálogos.
   * @param tramite630104Store - Store para manejar el estado del trámite.
   * @param tramite630104Query - Query para consultar el estado del trámite.
   */
  constructor(
    public fb: FormBuilder,
    private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa el formulario y obtiene datos de catálogos.
   */
  ngOnInit(): void {
    this.getValorStore();
    this.inizializarFormulario();
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
    
  }

  /**
   * Inicializa el formulario reactivo con valores predeterminados y validaciones.
   */
  inizializarFormulario(): void {
    this.datosImportacionTemporalFormulario = this.fb.group({
      // Campos del formulario reactivo se inicializan aquí.
    });
  }

  /**
   * Obtiene las opciones de aduanas de ingreso desde el servicio.
   * Actualiza el formulario dinámico con las opciones obtenidas.
   */
  getAduanaDeIngreso(): void {
    this.equipoEInstrumentosMusicalesService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const ADUANA_INGRESO = this.formularioDatosSolicitud.find((item) => item.id === 'cveAduana');
        if (ADUANA_INGRESO) { 
          ADUANA_INGRESO.opciones = data;
        }
      });
  }

  /**
   * Obtiene las opciones de secciones aduaneras desde el servicio.
   * Actualiza el formulario dinámico con las opciones obtenidas.
   */
  getSeccionAduanera(): void {
    this.equipoEInstrumentosMusicalesService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        const SECCION_ADUANERA = this.formularioDatosSolicitud.find((item) => item.id === 'cveSeccionAduanera');
        if (SECCION_ADUANERA) {
          SECCION_ADUANERA.opciones = data;
        }
      });
  }

  

  /**
   * Obtiene el estado actual del trámite desde el store.
   * Actualiza el estado seleccionado con los datos obtenidos.
   */
  getValorStore(): void {
    this.tramite630104Query.selectTramite630104State$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.estadoSeleccionado = data;
      });
  }

  /**
   * Establece un cambio de valor en el store basado en un evento.
   * 
   * @param $event - Evento que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor($event: { campo: string; valor: unknown }): void {
    if (typeof $event.valor === 'object' && $event.valor !== null && 'id' in $event.valor) {
      this.tramite630104Store.setTramite630104State($event.campo, String(($event.valor as { id: unknown }).id));
    } else {
      this.tramite630104Store.setTramite630104State($event.campo, $event.valor);
    }
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}