import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { ConfiguracionItem, DESTINARIO_TABLE_ENTRY, TERCEROS_CONFIGURACION_TABLA } from '../../enum/terceros-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud230901State, Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.css',
})
export class TercerosComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario reactivo para capturar la entidad federativa del destinatario.
   */
  destinatarioForm!: FormGroup;

  /**
   * @description
   * Estado actual de la solicitud "230901".
   * Este estado se actualiza al suscribirse al observable `selectSolicitud$`.
   */
  solicitud230901State!: Solicitud230901State;

  /**
   * @description
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   */
  destroyNotifier$ = new Subject<void>();

  /**
   * @description
   * Configuración de las columnas de la tabla de terceros.
   * Define cómo se mostrarán los datos en la tabla.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] =
    TERCEROS_CONFIGURACION_TABLA;

  /**
   * @description
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description
   * Datos que se mostrarán en la tabla de terceros.
   * Inicialmente está vacío y se llena al cambiar la entidad federativa.
   */
  tablaDatos: ConfiguracionItem[] = [];

  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    private formBuilder: FormBuilder
  ) {
    //do nothing
  }

  /**
   * @description
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa los catálogos de datos de terceros, se suscribe al estado de la solicitud
   * y crea el formulario del destinatario.
   */
  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaTercerosDatosCatalogos();
    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.solicitud230901State = state;
      });

    this.createDestinatarioForm();
    this.onEntidadFederativaChange();
  }

  /**
   * @description
   * Crea el formulario reactivo para capturar la entidad federativa del destinatario.
   * Inicializa el valor del formulario con el estado actual de la solicitud.
   */
  createDestinatarioForm(): void {
    this.destinatarioForm = this.formBuilder.group({
      entidadFederativa: [
        this.solicitud230901State.entidadFederativa,
        Validators.required,
      ],
    });
  }

  /**
   * @description
   * Maneja los cambios en la entidad federativa seleccionada.
   * Actualiza el estado del almacén y agrega una entrada a la tabla de datos
   * si la entidad federativa es válida y la tabla está vacía.
   */
  onEntidadFederativaChange(): void {
    const ENTIDAD_FEDERATIVE = this.destinatarioForm.get('entidadFederativa')?.value;
    if (ENTIDAD_FEDERATIVE && this.tablaDatos.length === 0) {
      this.tramite230901Store.setEntidadFederativa(ENTIDAD_FEDERATIVE);
      this.tablaDatos.push(DESTINARIO_TABLE_ENTRY);
    }
  }

  /**
   * @description
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}