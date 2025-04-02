/**
 * Componente para gestionar los terceros.
 * {OnInit}
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { Tramite230902Query } from '../../estados/tramite230902.query';
import { Solicitud230902State, Tramite230902Store } from '../../estados/tramite230902.store';
import { ConfiguracionItem, DESTINARIO_TABLE_ENTRY, TERCEROS_CONFIGURACION_TABLA } from '../../enum/tereceors.enum';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.css',
})
export class TercerosComponent implements OnInit,OnDestroy {

  /**
   * Formulario para el destinatario.
   */
  destinatarioForm!: FormGroup;

  /**
   * Indica si el popup está abierto.
   */
  isPopupOpen = false;

  /**
   * Indica si el popup está cerrado.
   */
  isPopupClose = true;

  /**
   * Estado de la solicitud 230902.
   * {Solicitud230902State}
   */
  solicitud230902State!: Solicitud230902State;

  /**
   * Notificador para destruir las suscripciones.
   * {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Configuración de la tabla.
  */
  configuracionTabla: ConfiguracionColumna<ConfiguracionItem>[] =
    TERCEROS_CONFIGURACION_TABLA;

  /**
   * Tipo de selección de la tabla.
  */
  TablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos de la tabla.
  */
  tablaDatos: ConfiguracionItem[] = [];

  /**
   * Crea una instancia de TercerosComponent.
   * permisoCitesService - Servicio de permisos CITES.
   * tramite230902Store - Almacén de trámites 230902.
   * tramite230902Query - Consulta de trámites 230902.
   * formBuilder - Constructor de formularios.
   */
  constructor(
    public permisoCitesService: PermisoCitesService,
    private tramite230902Store: Tramite230902Store,
    private tramite230902Query: Tramite230902Query,
    private formBuilder: FormBuilder
  ) {
    // No hacer nada
  }
 
  /**
   * Inicializa el componente.
  */
  ngOnInit(): void {
    this.permisoCitesService.inicializaTercerosDatosCatalogos();
    this.tramite230902Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.solicitud230902State = state;
      });

    this.createDestinatarioForm();
    this.onEntidadFederativaChange();
  }

  /**
   * Abre el popup.
  */
  openPopup() {
    this.isPopupOpen = true;
    this.tramite230902Store.setIsPopupOpen(this.isPopupOpen);
  }

  /**
   * Cierra el popup.
  */
  closePopup() {
    this.isPopupOpen = false;
    this.isPopupClose = false;
    this.tramite230902Store.setIsPopupOpen(this.isPopupOpen);
    this.tramite230902Store.setIsPopupClose(this.isPopupClose);
  }

  /**
   * Crea el formulario para el destinatario.
  */
  createDestinatarioForm(): void {
    this.destinatarioForm = this.formBuilder.group({
      entidadFederativa: [
        this.solicitud230902State.entidadFederativa,
        Validators.required,
      ],
    });
  }

  /**
   * Maneja el cambio en la entidad federativa.
  */
  onEntidadFederativaChange(): void {
    const ENTIDAD_FEDERATIVA = this.destinatarioForm.get('entidadFederativa')?.value;
    if (ENTIDAD_FEDERATIVA && this.tablaDatos.length === 0) {
      this.tramite230902Store.setEntidadFederativa(ENTIDAD_FEDERATIVA);
      this.tablaDatos.push(DESTINARIO_TABLE_ENTRY);
    }
  }
  
  /**
   * Destruye las suscripciones cuando el componente se destruye.
   * 
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}