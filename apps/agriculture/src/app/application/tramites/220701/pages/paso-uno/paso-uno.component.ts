/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from "../../components/datos-de-la-solicitud/datos-de-la-solicitud.component";
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { PagoDeDerechosComponent } from "../../components/pago-de-derechos/pago-de-derechos.component";
import { RevisionDocumentalComponent } from "../../components/revision-documental/revision-documental.component";
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
// import { SECCIONES_TRAMITE_80203 } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
// import { SeccionLibStore } from '@libs/shared/data-access-user/src'; //For Continue button enable
/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss --220202
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [
    CommonModule, SolicitanteComponent,
    DatosDeLaSolicitudComponent,
    RevisionDocumentalComponent,
    PagoDeDerechosComponent
]
})

/**
 * @title PasoUnoComponent
 * @description 
 * Componente que representa el primer paso de un formulario multipaso.
 * Gestiona la navegación entre diferentes pestañas/pasos del formulario,
 * cada uno representado por un componente específico.
 */
export class PasoUnoComponent implements OnInit{

  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;
  // constructor(private seccionStore: SeccionLibStore) {} For Continue button enable
 
  ngOnInit(): void {
    this.asignarSecciones();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  asignarSecciones() {
    throw new Error('Method not implemented.');
  }
  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Revisión documental', component: 'revision-documental' },
    { index: 4, title: 'Pago de derechos', component: 'pago-de-derechos' },
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
   //For Continue button enable
  // private asignarSecciones(): void {
  //   const SECCIONES: boolean[] = [];
  //   const FORMA_VALIDA: boolean[] = [];
  //   const PREDETERMINADO = SECCIONES_TRAMITE_80203
  //   for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
  //     if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
  //       // @ts-expect-error - fix this
  //       SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
  //       FORMA_VALIDA.push(false);
  //     }
  //   }
  //   this.seccionStore.establecerSeccion(SECCIONES); 
  //   this.seccionStore.establecerFormaValida(FORMA_VALIDA); 
  // }
}