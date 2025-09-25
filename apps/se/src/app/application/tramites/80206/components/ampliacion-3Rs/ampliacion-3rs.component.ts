/**
 * @fileoverview
 * El `Ampliacion3RsComponent` es un componente de Angular diseñado para gestionar la funcionalidad del módulo "Ampliación de Servicios".
 * Maneja formularios reactivos, catálogos y la interacción con el estado para la gestión de datos relacionados con sectores y servicios.
 * 
 * @module Ampliacion3RsComponent
 * @description
 * Este componente proporciona funcionalidad para la ampliación de servicios, incluyendo la inicialización de formularios, 
 * la obtención de datos y la interacción con el estado para la gestión de sectores y reglas.
 */

import {
  Catalogo,
  TablaSeleccion,
} from '@ng-mf/data-access-user';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosState } from '../../estados/tramite80206.store';
import { CONFIGURACION_SECTOR } from "../../constantes/modificacion.constants";
import { CatalogoServices } from'@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { Input } from '@angular/core';
import { Sector } from "../../models/datos-info.model";
import { Tramite80206Store } from '../../estados/tramite80206.store';

@Component({
  selector: 'app-ampliacion-3rs',
  templateUrl: './ampliacion-3rs.component.html',
  styleUrl: './ampliacion-3rs.component.scss',
})
export class Ampliacion3RsComponent implements OnInit, OnDestroy {
  /**
   * Indica si una regla ha sido seleccionada.
   * @property {boolean} isSelectedRegla
   */
  isSelectedRegla: boolean = false;

  /**
   * Lista de sectores recibidos.
   * @property {Sector[]} recibioSector
   */
  recibioSector: Sector[] = [];

  /**
   * Formulario reactivo para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Tipo de selección de tabla (checkbox).
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la tabla para sectores.
   * @property {ConfiguracionColumna<Sector>[]} configuracionTablaSector
   */
  configuracionTablaSector: ConfiguracionColumna<Sector>[] = CONFIGURACION_SECTOR;

  /**
   * Lista de datos de sectores.
   * @property {Sector[]} datosSector
   */
  datosSector: Sector[] = [];

  /**
   * Lista de domicilios seleccionados.
   * @property {Sector[]} domiciliosSeleccionados
   */
  domiciliosSeleccionados: Sector[] = [];

  /**
   * Formulario reactivo para datos adicionales.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Lista de reglas seleccionadas.
   * @property {Catalogo[]} reglaSeleccionada
   */
  reglaSeleccionada!: Catalogo[];

  /**
   * Lista desplegable de sectores.
   * @property {Catalogo[]} sectorDesplegable
   */
  sectorDesplegable!: Catalogo[];

  /**
   * Estado actual del trámite.
   * @property {AmpliacionServiciosState} tramiteState
   */
  tramiteState: AmpliacionServiciosState = {} as AmpliacionServiciosState;

  /**
   * Notificador para gestionar la destrucción o desuscripción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
     * Indica si el formulario está en modo solo lectura.
     * Cuando es `true`, los campos del formulario no se pueden editar.
     * @property {boolean} esFormularioSoloLectura
     */
    @Input() esFormularioSoloLectura: boolean = false;

    /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  mostrarAlerta: boolean = false;

  /**
   * @description Identificador del trámite asociado a la ampliación de 3Rs.
   */
  tramiteID: string = '80206';

/**
   * Mensaje mostrado en el modal de alerta.
   * @property {string} mensajeDeAlerta
   */
  mensajeDeAlerta: string = '';  
    /**
     * Suscripción para manejar observables.
     * @property {Subscription} subscription
     */
    private subscription: Subscription = new Subscription();
   

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private fb: FormBuilder,
    private ampliacionServiciosService: AmpliacionServiciosService,
    private ampliacionServiciosQuery: AmpliacionServiciosQuery,
    private tramite80206Store: Tramite80206Store,
    private catalogoServices: CatalogoServices
  ) {
    this.inicializarFormularioInfoRegistro();
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerReglaSelectList(this.tramiteID);
    this.inicializarFormularioDesdeAlmacen();
    this.obtenerSectorSelectList();
    if (this.esFormularioSoloLectura) {
    this.formularioInfoRegistro.get('seleccionaLaModalidad')?.disable();
  } else {
    this.formularioInfoRegistro.get('seleccionaLaModalidad')?.enable();
  }
  }

  /**
   * Activa el modal de alerta.
   * @method activarModal
   * @returns {void}
   */
  activarModal(): void {
    this.mostrarAlerta = true;
  }

  /**
   * Cierra el modal de alerta.
   * @method cerrarModal
   * @returns {void}
   */
  aceptar(): void {
    this.mostrarAlerta = false;
  }

    /**
   * Cierra el modal de alerta.
   * @method cerrarModal
   */
  cerrarModal():void{
    this.mostrarAlerta = false;
  }


  /**
   * Inicializa el formulario con datos del store.
   * @method inicializarFormularioDesdeAlmacen
   */
  inicializarFormularioDesdeAlmacen(): void {
    this.ampliacionServiciosQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((datos: AmpliacionServiciosState) => {
          this.tramiteState = datos;
          this.datosSector = datos.datosSector;
          this.isSelectedRegla = datos.isSelectedRegla;
          this.ampliacionServiciosService.enviarDeberiaMostrar(this.isSelectedRegla);

          this.formularioInfoRegistro.patchValue({
            seleccionaLaModalidad: this.tramiteState.seleccionaLaModalidad || '',
            seleccionarRegla: this.tramiteState.seleccionarRegla || '',
            sector: this.tramiteState.sector || '',
          });
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario de información de registro.
   * @method inicializarFormularioInfoRegistro
   */
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      seleccionaLaModalidad: [''],
      seleccionarRegla: [''],
      sector: [''],
    });
  }

  /**
   * Obtiene la lista de reglas para selección.
   * @method obtenerReglaSelectList
   */
  obtenerReglaSelectList(tramite: string): void {
  this.isSelectedRegla = false;
    this.subscription.add(this.catalogoServices.seleccionarReglaCatalogo(tramite).pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((data) => {
      const DATOS = data.datos as Catalogo[];
      this.tramite80206Store.setReglaSeleccionada(DATOS);
      
      this.ampliacionServiciosQuery.selectSolicitudTramite$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((sector: AmpliacionServiciosState) => {
          this.reglaSeleccionada = sector.reglaSeleccionada;
         
        });
    }));
    
  }

  /**
   * Obtiene la lista de sectores para selección.
   * @method obtenerSectorSelectList
   */
  obtenerSectorSelectList(): void {
    this.subscription.add(this.catalogoServices.sectoresCatalogo(this.tramiteID).pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((data) => {
      const DATOS = data.datos as Catalogo[];
      this.tramite80206Store.setSectorDesplegable(DATOS);
      this.ampliacionServiciosQuery.selectSolicitudTramite$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((sector: AmpliacionServiciosState) => {
          this.sectorDesplegable = sector.sectorDesplegable;
        });
    }));
  }
  
  /**
   * Elimina servicios seleccionados del grid.
   * @method eliminarServiciosGrid
   */
  eliminarServiciosGrid(): void {
    const DATOS_IMMEX_ACTUALIZADOS = [...this.datosSector];
    this.domiciliosSeleccionados.forEach((selectedItem) => {
      const INDICE = DATOS_IMMEX_ACTUALIZADOS.findIndex(
        (item: Sector) => item.descripcion === selectedItem['descripcion']
      );
      if (INDICE !== -1) {
        DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1);
      }
    });
    this.tramite80206Store.setDatosSector(DATOS_IMMEX_ACTUALIZADOS);
    this.domiciliosSeleccionados = [];
  }

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */
  agregarServiciosAmpliacion(): void {
    const CUERPODATOS = {
      descripcion: this.recibioSector[0]?.descripcion,
      descripcionSector: this.recibioSector[0]?.descripcionSector,
    };
    this.tramite80206Store.setDatosSector([...this.datosSector, CUERPODATOS]);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.ampliacionServiciosService.enviarDeberiaMostrar(true);
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Maneja los datos recibidos del componente hijo.
   * @method procesarDatosDelHijo
   * @param {Catalogo | Catalogo[]} data - Datos recibidos.
   */
  procesarDatosDelHijo(): void {
    const DATA = this.formularioInfoRegistro.get('seleccionarRegla')?.value;
    if (DATA === '3.2.25') {
      this.isSelectedRegla = true;
    } else {
      this.isSelectedRegla = false;
       this.mensajeDeAlerta = "El programa que solicita la ampliaci�n no est� asociado a la zona fronteriza norte.";
      this.activarModal();
    }
    this.ampliacionServiciosService.enviarDeberiaMostrar(this.isSelectedRegla);
    this.tramite80206Store.setIsSelectedRegla(this.isSelectedRegla);
    this.tramite80206Store.setSeleccionarRegla(DATA);
  }

  /**
   * Actualiza el sector seleccionado basado en la entrada del usuario.
   * @method cambioDeSector
   * @param {Catalogo | Catalogo[]} data - Datos del sector seleccionado.
   */
  cambioDeSector(data: Catalogo): void {
    this.formularioInfoRegistro.get('sector')?.setValue(data.clave);

    this.recibioSector = Array.isArray(data) ? data : [data];
    this.tramite80206Store.setSector(data?.clave || '');
  }

  /**
   * Actualiza la lista de domicilios seleccionados.
   * @method seleccionarDomicilios
   * @param {Sector[]} domicilios - Domicilios seleccionados.
   */
  seleccionarDomicilios(domicilios: Sector[]): void {
    this.domiciliosSeleccionados = [...domicilios];
  }

   /**
   * @method validarFormulario
   * Valida todos los controles del formulario.
   *
   * Marca todos los controles como tocados y actualiza su estado de validación
   * para mostrar los errores correspondientes en la interfaz de usuario.
   * También valida los formularios de los componentes hijo.
   *
   * @returns {void}
   */
validarFormulario(): boolean {
  let isValid = true;

  if (this.formularioInfoRegistro) {
    this.formularioInfoRegistro.markAllAsTouched();
    this.formularioInfoRegistro.updateValueAndValidity();

    // Check specific required fields
    const seleccionaLaModalidad = this.formularioInfoRegistro.get('seleccionaLaModalidad')?.value;
    const seleccionarRegla = this.formularioInfoRegistro.get('seleccionarRegla')?.value;

    // Add your specific validation logic here
    if (!seleccionaLaModalidad || !seleccionarRegla) {
      isValid = false;
    }

    // If regla is selected, validate sector selection
    if (this.isSelectedRegla) {
      const sector = this.formularioInfoRegistro.get('sector')?.value;
      if (!sector) {
        isValid = false;
      }
    }

    if (this.formularioInfoRegistro.invalid) {
      isValid = false;
    }
  } else {
    isValid = false;
  }

  return isValid;
}
}