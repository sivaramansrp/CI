import { Component, ViewChild } from '@angular/core';
import { Tramite40102State,Tramite40102Store } from '../../estados/tramite40102.store';
import { Tramite40102Query } from '../../estados/tramite40102.query';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_40102 } from '../../constants/solicitud.enums';
import { SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la estructura de una acción de botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente para gestionar la página del solicitante.
 */
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent {
  /**
   * Lista de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Estado de la sección de choferes nacionales.
   */
  public seccion!: Tramite40102State;

  /**
   * Notificador para destruir las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param chofer40102Query - Servicio para consultar el estado de choferes.
   * @param chofer40102Store - Servicio para gestionar el estado de choferes.
   */
  constructor(
    private tramite40102Query: Tramite40102Query,
    private tramite40102Store: Tramite40102Store,
    private seccionStore: SeccionLibStore
    
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.pasos = PASOS.slice(0, 2);
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });
    this.tramite40102Query.selectSeccionState$
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
   * Selecciona una pestaña del wizard.
   * @param i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice del evento de acción del botón.
   * @param e - Evento de acción del botón.
   */
  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método para asignar las secciones existentes al store.
   */
  private asignarSecciones() {
    const secciones: boolean[] = [];
    const formaValida: boolean[] = [];
    for (const llaveSeccion in SECCIONES_TRAMITE_40102.PASO_1) {
      // @ts-ignore - fix this
      secciones.push(SECCIONES_TRAMITE_40102.PASO_1[llaveSeccion]);
      formaValida.push(false);
    }
    this.seccionStore.establecerSeccion(secciones);
    this.seccionStore.establecerFormaValida(formaValida);
  }
}