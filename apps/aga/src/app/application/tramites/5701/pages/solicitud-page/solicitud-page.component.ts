import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  SECCIONES_TRAMITE_5701,
  SeccionLibQuery, SeccionLibState,
  SeccionLibStore,
  WizardComponent
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Contiene la lista de pasos del wizard.
   * Se inicializa con la constante PASOS importada desde el archivo correspondiente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Contiene el índice del paso actual, para las navs-tabs del paso uno.
   * Se inicializa en 1
   */
  indice: number = 1;

  /**
   * Contiene el estado de la sección actual.
   * Se inicializa como un objeto vacío.
   */
  public seccion!: SeccionLibState;


  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * Se completa al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente WizardComponent, que se utiliza para navegar entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Emite un evento cuando el boton de carga de archivos es presionado.
   * Este evento es escuchado por el componente <anexar-documentos> para iniciar la carga de archivos.
   */
  @Output() cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Emite un evento cuando el boton de Anterior es presionado
   * Este evento es escuchado por el componente <anexar-documentos> para regresar a la sección de carga de documentos.
   */
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();


  /**
   * Representa los datos de configuración para los pasos de un proceso.
   * @property nroPasos - Número total de pasos.
   * @property indice - Índice actual del paso.
   * @property txtBtnAnt - Texto del botón "Anterior".
   * @property txtBtnSig - Texto del botón "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };


  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;

  constructor(
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,) { }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método, se suscribe al estado de la sección utilizando `selectSeccionState$` 
   * y actualiza la propiedad `seccion` con el estado recibido. La suscripción se 
   * completa cuando se emite `destroyNotifier$` para evitar fugas de memoria.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  /**
   * Selecciona una pestaña específica y actualiza el índice actual.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Actualiza el valor del índice basado en la acción del botón y navega en el componente wizard.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción del botón.
   * 
   * Si el valor del botón está entre 1 y 4, actualiza el índice con el valor del botón.
   * Si la acción es 'cont', avanza al siguiente paso del wizard.
   * Si la acción no es 'cont', retrocede al paso anterior del wizard.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    for (const LLAVE_SECCION in SECCIONES_TRAMITE_5701.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(SECCIONES_TRAMITE_5701.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(SECCIONES_TRAMITE_5701.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }


  /**
   * Emite un evento para cargar archivos.
   * @returns {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * @returns {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * @returns {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado del botón de carga de archivos.
   * @param carga - Indica si la carga de documentos está activa o no.
   * @returns {void} No retorna ningún valor.
   */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Método para manejar el evento de regreso a la sección de carga de documentos.
   * Emite un evento para regresar a la sección de carga de documentos.
   * @returns {void} No retorna ningún valor.
   */
  anteriorSeccionCargarDocumento(): void {
    this.regresarSeccionCargarDocumentoEvento.emit();
  }

  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   * @param cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * @returns {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

}
