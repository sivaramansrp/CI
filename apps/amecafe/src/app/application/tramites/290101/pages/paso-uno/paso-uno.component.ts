import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit} from '@angular/core';
import { Output } from '@angular/core';
import { SECCIONES_TRAMITE_290101 } from '../../constantes/cafe-exportadores.enums';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente para el asistente de solicitud.
 * Este componente gestiona la navegación entre los pasos del formulario de solicitud.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  private destroyNotifier$ = new Subject<void>();

  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  constructor(private route: ActivatedRoute, private seccionStore: SeccionLibStore) {
// Se puede agregar aquí la lógica del constructor si es necesario
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(params => {
        const TAB_INDEX = Number(params['tab']);
        this.indice = TAB_INDEX && TAB_INDEX > 0 && TAB_INDEX <= this.seccionesDeLaSolicitud.length ? TAB_INDEX : 1; 
      });
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'app-datos-de-la-solicitud' },
  ];

  /**
   * Evento emitido al cambiar de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_290101
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - fix this
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}