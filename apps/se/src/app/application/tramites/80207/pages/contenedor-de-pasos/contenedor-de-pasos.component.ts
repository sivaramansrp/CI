import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  RegistroSolicitudService,
  SeccionLibStore,
  Usuario, 
} from '@ng-mf/data-access-user';
import { PASOS, USUARIO_INFO } from '../../constantes/pasos.enum';
import { Subject, map } from 'rxjs';
import { AVISO } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite80207State } from '../../modelos/subfabricante.model';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { Tramites80207Store } from '../../estados/tramite80207.store';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { buildSolicitud80207Payload } from '../../payloads/solicitud-80207.builder';
import { takeUntil } from 'rxjs/operators';

/**
 * @fileoverview Componente para la gestión del contenedor de pasos.
 * Este componente maneja la lógica y la presentación del contenedor de pasos,
 * incluyendo la inicialización, la navegación entre pasos y la gestión del estado de las secciones.
 * @module contenedorDePasos --80207
 */

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente para la gestión del contenedor de pasos.
 * @class ContenedorDePasosComponent --80207
 */

@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-pasos.component.scss',
})

/**
 * Lista de pasos del wizard.
 * @property {ListaPasosWizard[]} pasos
 */
export class ContenedorDePasosComponent implements OnInit, OnDestroy {

  
  /**
   * Lista de pasos del wizard.
   * @property {ListaPasosWizard[]} pasos
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Índice del paso actual.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Textos constantes utilizados en el componente.
   * @property {any} TEXTOS
   */
  TEXTOS = AVISO;

  tramiteId: string = '80207';
  /**
   * Referencia al componente del wizard.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
 

  /**
   * Datos de los pasos del wizard.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

   
  /**
   * Obtiene el valor del índice del paso actual.
   * @method getValorIndice
   * @param {AccionBoton} e - Acción del botón que contiene el valor del índice.
   */

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

    /**
     * Evento que se emite para cargar archivos.
     * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
     */
    cargarArchivosEvento = new EventEmitter<void>();

    /**
     * Evento que se emite para regresar a la sección de carga de documentos.
     * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
     */
    regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();

    /**
   * Indica si el botón para cargar archivos está habilitado.
   */
    activarBotonCargaArchivos: boolean = false;

    /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
    seccionCargarDocumentos: boolean = true;

  
    cargaEnProgreso: boolean = true;

// Add this near your other property declarations
public solicitudState: Tramite80207State = {} as Tramite80207State; // or provide a proper initial state
  /**
   * Constructor de la clase ContenedorDePasosComponent.
   *
   * @param tramiteQuery - Servicio de consultas específicas para el trámite 80207.
   * @param seccion - Servicio para gestionar el estado de la sección en la librería de la aplicación.
   *
   * Este constructor inicializa el componente y configura una suscripción al observable `formaValida$`
   * del servicio `Tramites80207Queries`. Cuando se emite un nuevo valor, se actualiza el estado de la
   * sección y se establece si el formulario es válido.
   */
  constructor(
    private tramiteQuery: Tramites80207Queries,
    private seccion: SeccionLibStore,
    private registroSolicitudService: RegistroSolicitudService,
    private store: Tramites80207Store
    
  ) {
    this.tramiteQuery.formaValida$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((res) => {
        this.seccion.establecerSeccion([true]);
        this.seccion.establecerFormaValida([true]);
      });
  }

   /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
     * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
     * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
     * evitando fugas de memoria.
     */
    ngOnInit(): void {
      this.tramiteQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        ).subscribe();
    }

  /**
   * @method getValorIndice
   * @description Cambia el índice actual basado en el valor y la acción proporcionados por el evento `AccionBoton`.
   * Si el valor está entre 1 y 4 (inclusive), actualiza el índice y ejecuta una acción en el componente del asistente.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción a realizar.
   *                          `valor` debe ser un número entre 1 y 4, y `accion` puede ser 'cont' o cualquier otra acción.
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {


   if(e.accion==='cont'){
    let isValid=true;
    if (this.indice === 1 && this.pasoUnoComponent) {
      isValid = this.pasoUnoComponent.validarTodosLosFormularios();
    }
    if (!isValid) {
      
      this.datosPasos.indice = this.indice;
      
    }
    else if((this.solicitudState?.plantas?.length ?? 0) > 0){

       const PAYLOAD = buildSolicitud80207Payload(this.solicitudState);
       
       this.registroSolicitudService.postGuardarDatos(this.tramiteId, PAYLOAD).pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response) => {
        if (response) {
           this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      this.wizardComponent.siguiente();
        this.store.setIdSolicitud(response.datos?.id_solicitud ?? 0);
        }
      });
    }

 
    }
  }

   /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

  /**
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado del botón de carga de archivos.
  *  carga - Indica si la carga de documentos está activa o no.
  * {void} No retorna ningún valor.
  */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

   onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }


  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  
}
