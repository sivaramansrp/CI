import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import {
  AlertComponent,
  ModeloDeFormaDinamica,
  TablaSeleccion,
} from '@ng-mf/data-access-user';
import {
  CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE,
  CAMPOS_FORMULARIO_MERCANCIAS,
  CONFIGURACION_CONTACTO,
  CONFIGURACION_TABLA_INSTALACION,
  IMPORTANTE,
} from '../../constantes/sanidad-acuicola-importacion.enum';
import { DatosDelTerceroDestinatario, Instalacion } from '../../modelos/sanidad-acuicola-importacion.model';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';

import { Tramite220103State } from '../../estados/tramites/tramites220103.store';

import { AgregarDestinatarioComponent } from "../agregar-destinatario/agregar-destinatario.component";
import { Modal } from 'bootstrap';
/**
 * Componente que gestiona los datos de terceros relacionados con el trámite.
 * Permite la visualización, modificación y eliminación de destinatarios e instalaciones.
 */
@Component({
  selector: 'app-datos-del-terceros',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AgregarDestinatarioComponent
],
  templateUrl: './datos-del-terceros.component.html',
  styleUrl: './datos-del-terceros.component.scss',
})
export class DatosDelTercerosComponent implements OnInit, OnDestroy {
  /**
   * Referencia al modal de mercancías.
   */
  @ViewChild('modalDestinatario') elementoModal!: ElementRef;
  private instanciaModal!: Modal;

  /**
   * Notificador para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private notificadorDestruccion$ = new Subject<void>();

  /**
   * Mensaje importante que se muestra en el componente.
   */
  mensajeImportante: string = IMPORTANTE.Importante;

  /**
   * Configuración de los campos del formulario de datos del trámite.
   */
  configuracionFormularioDatos: ModeloDeFormaDinamica[] =
    CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE;

  /**
   * Configuración de los campos del formulario de mercancías.
   */
  configuracionFormularioMercancia: ModeloDeFormaDinamica[] =
    CAMPOS_FORMULARIO_MERCANCIAS;

  /**
   * Configuración de la tabla de mercancías.
   */
  configuracionTabla = CONFIGURACION_CONTACTO;

  /**
   * Configuración de los campos de contacto.
   */
  configuracionTablaInstalacion = CONFIGURACION_TABLA_INSTALACION;

  /**
   * Datos de la tabla de mercancías.
   */
  datosTabla: DatosDelTerceroDestinatario[] = [];
  datosTablaInstalacion: Instalacion[] = [];

  /**
   * Tipo de selección de la tabla (checkbox).
   */
  seleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Almacena los destinatarios seleccionados en la tabla
   */
  destinatariosSeleccionados: DatosDelTerceroDestinatario[] = [];

  /**
   * Almacena las instalaciones seleccionadas en la tabla
   */
  instalacionesSeleccionadas: Instalacion[] = [];

  /**
   * Constructor del componente.
   *
   * @param formBuilder - FormBuilder para inicializar los formularios.
   * @param tramite220103Query - Consulta para obtener el estado del trámite.
   */
  constructor(
    formBuilder: FormBuilder,
    private tramite220103Query: Tramite220103Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y actualiza los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite220103Query.selectTramite220103State$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado) => {
        this.datosTabla = estado?.['tablaDestinatario'] || [];
      });
  }

  /**
   * Maneja la selección de destinatarios en la tabla
   * @param event Evento con las filas seleccionadas
   */
  obtenerDestinatarioSeleccionadas(event: any): void {
    this.destinatariosSeleccionados = event;
  }
  /**
   * Maneja la selección de instalaciones en la tabla
   * @param event Evento con las filas seleccionadas
   */
  obtenerInstalaciSeleccionadas(event: any): void {
    this.instalacionesSeleccionadas = event;
  }


  closeModal(): void {
    const INSTANCIA = Modal.getInstance(this.elementoModal.nativeElement);
    if (INSTANCIA) {
      this.instanciaModal = INSTANCIA;
    }
  this.instanciaModal.hide();
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
