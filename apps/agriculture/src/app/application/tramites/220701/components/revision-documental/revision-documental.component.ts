/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { InternaDatosGeneralesComponent } from "../interna-datos-generales/interna-datos-generales.component";
import { InternaPagoDeDerechosComponent } from '../interna-pago-de-derechos/interna-pago-de-derechos.component';
import { InternaTercerosRelacionadosComponent } from '../interna-terceros-relacionados/interna-terceros-relacionados.component';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';


@Component({
  selector: 'revision-documental',
  templateUrl: './revision-documental.component.html',
  styleUrl: './revision-documental.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, InternaDatosGeneralesComponent, InternaTercerosRelacionadosComponent, InternaPagoDeDerechosComponent],

})
export class RevisionDocumentalComponent implements OnInit{

  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;
  // constructor(private seccionStore: SeccionLibStore) {} For Continue button enable
  constructor(private cdr: ChangeDetectorRef){}
 
  ngOnInit(): void {
    
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Dtos Generales', component: 'interna-datos-generales' },
    { index: 2, title: 'Terceros Relacionados', component: 'interna-terceros-relacionados' },
    { index: 3, title: 'Pago de derechos', component: 'interna-pago-de-derechos' },
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
