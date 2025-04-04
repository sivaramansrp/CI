import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { DESTINATARIO_TABLA_CONFIGURACION, DESTINATARIO_TABLE_ENTRY, DestinatarioConfiguracionItem } from '../../enum/destinatario-tabla.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud230901State, Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

/**
 * Componente que gestiona los datos relacionados con terceros en el trámite "230901".
 * Incluye la configuración de formularios, tablas dinámicas y la interacción con servicios
 * relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar la entidad federativa del destinatario.
   */
  formularioDestinatario!: FormGroup;

  /**
   * Estado actual de la solicitud "230901".
   * Este estado se actualiza al suscribirse al observable selectSolicitud$.
   */
  estadoSolicitud!: Solicitud230901State;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   */
  notificadorDestruccion$ = new Subject<void>();

  /**
   * Indica si el popup está abierto.
   */
  popupAbierto = false;

  /**
   * Indica si el popup está cerrado.
   */
  popupCerrado = true;

  /**
   * Configuración de las columnas de la tabla de terceros.
   * Define cómo se mostrarán los datos en la tabla.
   */
  configuracionColumnas: ConfiguracionColumna<DestinatarioConfiguracionItem>[] = DESTINATARIO_TABLA_CONFIGURACION;

  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos que se mostrarán en la tabla de terceros.
   * Inicialmente está vacío y se llena al cambiar la entidad federativa.
   */
  datosTabla: DestinatarioConfiguracionItem[] = [];

  /**
   * Indica si el botón de modificar está habilitado.
   */
  botonModificarHabilitado: boolean = false;

  /**
   * Constructor del componente TercerosComponent.
   * Inicializa los servicios y dependencias necesarias para gestionar el estado
   * y los datos relacionados con terceros.
   */
  constructor(
    public autorizacionesDeVidaSilvestreService: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    private formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí.
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa los catálogos de datos de terceros, se suscribe al estado de la solicitud
   * y crea el formulario del destinatario.
   */
  ngOnInit(): void {
    this.autorizacionesDeVidaSilvestreService.inicializaTercerosDatosCatalogos();
    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud = state;
      });

    this.crearFormularioDestinatario();
    this.manejarCambioEntidadFederativa();
  }

  /**
   * Crea el formulario reactivo para capturar la entidad federativa del destinatario.
   * Inicializa el valor del formulario con el estado actual de la solicitud.
   */
  crearFormularioDestinatario(): void {
    this.formularioDestinatario = this.formBuilder.group({
      entidadFederativa: [
        this.estadoSolicitud.entidadFederativa,
        Validators.required,
      ],
    });
  }

  /**
   * Maneja los cambios en la entidad federativa seleccionada.
   * Actualiza el estado del almacén y agrega una entrada a la tabla de datos
   * si la entidad federativa es válida y la tabla está vacía.
   */
  manejarCambioEntidadFederativa(): void {
    const ENTIDAD_FEDERATIVA = this.formularioDestinatario.get('entidadFederativa')?.value;
    if (ENTIDAD_FEDERATIVA && this.datosTabla.length === 0) {
      this.tramite230901Store.setEntidadFederativa(ENTIDAD_FEDERATIVA);
      this.datosTabla.push(DESTINATARIO_TABLE_ENTRY);
    }
  }

  /**
   * Maneja la fila seleccionada en la tabla de terceros.
   * Habilita o deshabilita el botón de modificar según la selección.
   */
  manejarFilaSeleccionada(filaSeleccionada: DestinatarioConfiguracionItem[]): void {
    this.botonModificarHabilitado = filaSeleccionada.length > 0;
  }

  /**
   * Abre el popup si el botón de modificar está habilitado.
   */
  abrirPopup(): void {
    if (this.botonModificarHabilitado) {
      this.popupAbierto = true;
      this.tramite230901Store.setTercerosPopupState(this.popupAbierto);
    }
  }

  /**
   * Cierra el popup.
   */
  cerrarPopup(): void {
    this.popupAbierto = false;
    this.popupCerrado = false;
    this.tramite230901Store.setTercerosPopupState(this.popupAbierto);
    this.tramite230901Store.setTercerosPopupState(this.popupCerrado);
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}