/* eslint-disable no-empty-function */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SECCIONES_TRAMITE_80203 } from '../../constantes/immex-registro-de-solicitud-modality.enums';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss --220202
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})

/**
 * @class PasoUnoComponent
 * @description 
 * Clase que implementa la lógica del primer paso del formulario multipaso.
 */
export class PasoUnoComponent implements OnInit {

  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * @constructor
   * @description Constructor que inicializa el store de la sección.
   * @param {SeccionLibStore} seccionStore - Servicio para manejar el estado de las secciones.
   */
  constructor(private seccionStore: SeccionLibStore) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente. Asigna las secciones del formulario.
   */
  ngOnInit(): void {
    this.asignarSecciones();
  }

  /**
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * @description Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Anexo I', component: 'anexo-1' },
  ];

  /**
   * @event tabChanged
   * @description Evento emitido al cambiar de pestaña.
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * @method seleccionaTab
   * @description Cambia el índice de la pestaña seleccionada y emite el evento `tabChanged`.
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * @method asignarSecciones
   * @description Método privado que asigna las secciones del formulario y establece su estado inicial.
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_80203;

    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - Ignorar error de tipo
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }

    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}