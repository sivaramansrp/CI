import { Component, OnInit } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

import { FormGroup } from '@angular/forms';

import { Tramite630104State, Tramite630104Store, } from '../../estados/tramites/tramite630104.store'; // Adjusted the path to the correct location

import { Tramite630104Query } from '../../estados/queries/tramite630104.query';

/**
 * Componente encargado de gestionar la solicitud del trámite 630104.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit {

  /**
   * Opciones disponibles para el tipo de solicitud.
   * @type {Catalogo[]}
   */
  tiposSolicitudOptions: Catalogo[] = [];

  tiposSolicitudNoOptions: Catalogo[] = [];

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Estado actual del trámite 630104.
   * @type {Tramite630104State}
   */
  public tramite630104State!: Tramite630104State;

  /**
   * Constructor del componente.
   * @param equipoEInstrumentosMusicalesService Servicio para obtener las opciones de propietario.
   * @param tramite630104Store Almacén del estado del trámite 630104.
   * @param tramite630104Query Consulta del estado del trámite 630104.
   */
  constructor(
    private equipoEInstrumentosMusicalesService: EquipoEInstrumentosMusicalesService,
    private tramite630104Store: Tramite630104Store,
    private tramite630104Query: Tramite630104Query
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y obtiene las opciones de propietario.
   */
  ngOnInit(): void {
    this.tramite630104Query
      .select()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.tramite630104State = state;
      });
    this.fetchPropietarioOptions();
    this.fetchPropietarioNoOptions();
  }

  /**
   * Obtiene las opciones de propietario desde el servicio.
   */
  fetchPropietarioOptions(): void {
    this.equipoEInstrumentosMusicalesService
      .getPropietarioOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tiposSolicitudOptions = data;
      });
  }

  /**
   * Obtiene las opciones de propietario desde el servicio.
   */

  fetchPropietarioNoOptions(): void {
    this.equipoEInstrumentosMusicalesService
      .getPropietarioNoOptions()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tiposSolicitudNoOptions = data;
      });
  }


  /**
   * Establece valores en el almacén del estado del trámite.
   * @param event Evento que contiene el formulario y el campo a actualizar.
   */
  setValoresStore(event: { form: FormGroup; campo: string }): void {
    if (event.form && event.form.get(event.campo)) {
      const VALOR = event.form.get(event.campo)?.value;
      this.tramite630104Store.establecerDatos({ [event.campo]: VALOR });
    } else {
      console.error(`Form or control '${event.campo}' is undefined.`);
    }
  }
}