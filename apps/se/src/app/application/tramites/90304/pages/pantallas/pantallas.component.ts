import { AccionBoton, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ALERTA_ERROR } from '../../constantes/prosec.enum';
import { ProsecService } from '../../services/prosec/prosec.service';
import { Tramite90304Store } from '../../estados/tramite90304.store';

/**
 * Componente principal para la gestión de pantallas en el wizard de cupos.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styles: ``
})
export class PantallasComponent implements OnInit {
  /**
   * Lista de pasos del wizard.
   * @type {ListaPasosWizard[]}
   */
  public pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   * @default 1
   */
  public indice: number = 1;

  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  isBaja: boolean = true;
  
  /** Asigna el mensaje de error ALERTA_PRODUCTORAS_ERROR*/
  ALERTA_PRODUCTORAS_ERROR = ALERTA_ERROR;

  /**
   * Indica si se debe mostrar un mensaje de error al agregar.
   * @type {boolean}
   */
  mostrarError: boolean = false;

  /**
   * Una cadena que representa la clase CSS para una alerta de error.
   */
  infoError = 'alert-danger';

  /**
   * Constructor del componente PantallasComponent.
   * @param prosecService Servicio para gestionar el estado de baja.
   */
  constructor( private prosecService: ProsecService, private store: Tramite90304Store ) { }

  /**
   * Método de inicialización del componente.
   * Suscribe al observable isBaja$ para actualizar el estado local.
   */
  ngOnInit(): void {
    this.prosecService.isBaja$.subscribe(val => this.isBaja = val);
  }
  
  /**
   * Datos utilizados para el control del wizard.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    const ISBAJA = this.store.getValue().isBaja;

    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      if (this.indice === 1 && e.accion === 'cont') {
        if (ISBAJA === true) {
          this.mostrarError = true;
          this.datosPasos.indice = 1;
          return;
        } else {
          this.mostrarError = false;
        }
      }

      this.indice = e.valor;
      this.datosPasos.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

}