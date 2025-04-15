/**
 * Componente para gestionar los terceros.
 * Este componente permite la gestión de formularios y tablas relacionadas con los terceros.
 * 
 * Métodos:
 * - ngOnInit: Inicializa el componente y configura las suscripciones necesarias.
 * - onFilaSeleccionada: Maneja la selección de filas en la tabla.
 * - openPopup: Abre el popup si la modificación está habilitada.
 * - closePopup: Cierra el popup y actualiza el estado correspondiente.
 * - createDestinatarioForm: Crea y configura el formulario para el destinatario.
 * - onEntidadFederativaChange: Maneja los cambios en la entidad federativa y actualiza los datos de la tabla.
 * - ngOnDestroy: Limpia las suscripciones cuando el componente se destruye.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoriaMensaje, ConfiguracionColumna, Notificacion, TablaSeleccion, TipoNotificacionEnum } from '@libs/shared/data-access-user/src';

import { Subject, takeUntil } from 'rxjs';

import { ConfiguracionItem, DESTINARIO_TABLE_ENTRY, TERCEROS_CONFIGURACION_TABLA } from '../../enum/tereceors.enum';

import { PermisoCitesService } from '../../services/permiso-cites.service';

import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { Tramite230902Query } from '../../estados/tramite230902.query';

/**
 * Componente para gestionar los terceros.
 * Permite la creación y edición de datos relacionados con terceros.
 */
@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el destinatario.
   * Contiene los datos y validaciones del formulario de destinatarios.
   */
  destinatarioForm!: FormGroup;

  /**
   * Indica si el popup está abierto.
   * Controla la visibilidad del popup.
   */
  popupAbierto = false;

  /**
   * Indica si el popup está cerrado.
   * Controla el estado del cierre del popup.
   */
  popupCerrado = true;

  /**
   * Estado de la solicitud 230902.
   * Contiene el estado actual de la solicitud.
   */
  solicitud230902State!: Solicitud230902State;

  /**
   * Notificador para destruir las suscripciones.
   * Se utiliza para cancelar suscripciones activas al destruir el componente.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Configuración de la tabla.
   * Define las columnas y configuraciones de la tabla de terceros.
   */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] = TERCEROS_CONFIGURACION_TABLA;

  /**
   * Tipo de selección de la tabla.
   * Define el tipo de selección que se puede realizar en la tabla.
   */
  TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla.
   * Contiene las filas de datos que se muestran en la tabla de terceros.
   */
  tablaDatos: ConfiguracionItem[] = [];

  /**
   * Indica si la opción de modificar está habilitada.
   * Se activa cuando hay filas seleccionadas en la tabla.
   */
  isModificarEnabled: boolean = false;

  /**
   * Identificador del modal.
   * Define el tipo de modal que se está mostrando.
   */
  modal: string = '';

  /**
   * Título del modal.
   * Contiene el texto que se muestra como título en el modal.
   */
  tituloModal!: string;

  /**
   * Mensaje del modal.
   * Contiene el texto que se muestra como mensaje en el modal.
   */
  mensajeModal!: string;

  /**
   * Notificación actual.
   * Configura los datos de la notificación que se muestra en el popup.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias para la gestión de datos y formularios.
   */
  constructor(
    public permisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    private formBuilder: FormBuilder
  ) {
    // Constructor vacío, no se requiere lógica adicional.
  }

  /**
   * Inicializa el componente.
   * Configura los formularios, datos iniciales y suscripciones necesarias.
   */
  ngOnInit(): void {
    this.permisoCitesService.inicializaTercerosDatosCatalogos();
    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.solicitud230902State = state;
      });

    this.crearFormularioDestinatario();
    this.onEntidadFederativaChange();
  }

  /**
   * Maneja la selección de filas en la tabla.
   * Habilita o deshabilita la opción de modificar según las filas seleccionadas.
   * 
   * @param filaSeleccionada Las filas seleccionadas en la tabla.
   */
  onFilaSeleccionada(filaSeleccionada: ConfiguracionItem[]): void {
    if(filaSeleccionada.length > 0) {
      this.isModificarEnabled = true;
    }
    else {
      this.isModificarEnabled = false;
    }
  }

  /**
   * Abre el popup de notificación.
   * Configura los datos de la notificación y muestra el componente lib-notificaciones.
   */
  openPopup(): void {
    if (this.isModificarEnabled) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ERROR,
        modo: 'modal',
        titulo: 'Aviso',
        mensaje: 'No se pueden modificar los datos agregados por el sistema agregada correctamente.',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.popupAbierto = true; // Controla la visibilidad del popup
      this.tramite230902Store.setIsPopupOpen(this.popupAbierto);
    }
  }

  /**
   * Cierra el popup de notificación.
   * Cambia el estado del popup a cerrado.
   */
  closePopup(): void {
    this.popupAbierto = false; // Oculta el popup
    this.tramite230902Store.setIsPopupOpen(this.popupAbierto);
    this.tramite230902Store.setIsPopupClose(this.popupCerrado);
  }

  /**
   * Crea y configura el formulario para el destinatario.
   * Define los campos y validaciones necesarias.
   */
  crearFormularioDestinatario(): void {
    this.destinatarioForm = this.formBuilder.group({
      entidadFederativa: [
        this.solicitud230902State.entidadFederativa,
        Validators.required,
      ],
    });
  }

  /**
   * Maneja los cambios en la entidad federativa.
   * Actualiza el estado y los datos de la tabla relacionados con la entidad seleccionada.
   */
  onEntidadFederativaChange(): void {
    const ENTIDAD_FEDERATIVA = this.destinatarioForm.get('entidadFederativa')?.value;
    if (ENTIDAD_FEDERATIVA && this.tablaDatos.length === 0) {
      this.tramite230902Store.setEntidadFederativa(ENTIDAD_FEDERATIVA);
      this.tablaDatos.push(DESTINARIO_TABLE_ENTRY);
    }
  }

  /**
   * Limpia las suscripciones cuando el componente se destruye.
   * Evita fugas de memoria al completar el Subject.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
 

}