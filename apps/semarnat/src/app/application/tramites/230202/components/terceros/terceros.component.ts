import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { DESTINATARIO_TABLA_CONFIGURACION, DESTINATARIO_TABLE_ENTRY, DestinatarioConfiguracionItem } from '../../../230202/enum/destinatario-tabla.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud230202State, Tramite230202Store } from '../../estados/tramite230202.store';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite230202Query } from '../../estados/tramite230202.query';

/**
 * Componente que gestiona los datos relacionados con terceros en el trámite "230202".
 * Incluye la configuración de formularios, tablas dinámicas y la interacción con servicios
 * relacionados con autorizaciones de vida silvestre.
 */
@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
  standalone: true,
  imports: [
      CommonModule, 
      FormsModule, 
      ReactiveFormsModule, 
      TituloComponent, 
      TablaDinamicaComponent],
})
export class TercerosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar la entidad federativa del destinatario.
   */
  formularioDestinatario!: FormGroup;

  agregarMercanciasForm!: FormGroup;

  /**
   * Estado actual de la solicitud "230202".
   * Este estado se actualiza al suscribirse al observable selectSolicitud$.
   */
  estadoSolicitud!: Solicitud230202State;

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
    private tramite230202Store: Tramite230202Store,
    private tramite230202Query: Tramite230202Query,
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
    this.tramite230202Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((state) => {
        this.estadoSolicitud = state;
      });

    this.crearFormularioDestinatario();
    // this.manejarCambioEntidadFederativa();
  }

  /**
   * Crea el formulario reactivo para capturar la entidad federativa del destinatario.
   * Inicializa el valor del formulario con el estado actual de la solicitud.
   */
  crearFormularioDestinatario(): void {
    this.formularioDestinatario = this.formBuilder.group({
      // entidadFederativa: [
      //   this.estadoSolicitud.entidadFederativa,
      //   Validators.required,
      // ],
    });

    this.agregarMercanciasForm = this.formBuilder.group({
      
    });
  }

  /**
   * Maneja los cambios en la entidad federativa seleccionada.
   * Actualiza el estado del almacén y agrega una entrada a la tabla de datos
   * si la entidad federativa es válida y la tabla está vacía.
   */
  manejarCambioEntidadFederativa(): void {
    // const ENTIDAD_FEDERATIVA = this.formularioDestinatario.get('entidadFederativa')?.value ?? "Test";
    // if (ENTIDAD_FEDERATIVA && this.datosTabla.length === 0) {
    //   this.tramite230202Store.setEntidadFederativa(ENTIDAD_FEDERATIVA);
      this.datosTabla.push(DESTINATARIO_TABLE_ENTRY);
    // }
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
      this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    }
  }

  /**
   * Abre el popup si el botón de modificar está habilitado.
   */
  addPopup(): void {
    // if (this.botonModificarHabilitado) {
      this.popupAbierto = true;
      this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    // }
  }

  /**
   * Cierra el popup.
   */
  cerrarPopup(): void {
    this.popupAbierto = false;
    this.popupCerrado = false;
    this.tramite230202Store.setTercerosPopupState(this.popupAbierto);
    this.tramite230202Store.setTercerosPopupState(this.popupCerrado);
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