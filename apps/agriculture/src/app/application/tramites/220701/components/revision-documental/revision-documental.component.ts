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
   * @type {number}
   * @default 1
   * @description Controla qué pestaña está activa en la interfaz.
   */
  indice: number = 1;
 
  
  /**
   * @constructor
   * @param {ChangeDetectorRef} cdr - Servicio para la detección de cambios en el componente.
   */
  constructor(private cdr: ChangeDetectorRef){}
 
    /**
   * @method ngOnInit
   * @description Inicializa el componente, actualmente sin lógica adicional.
   */
  ngOnInit(): void {
    
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  /**
   * Lista de secciones del formulario.
   * @type {Array<{ index: number; title: string; component: string }>}
   * @description Define las pestañas disponibles dentro del formulario, cada una asociada a un componente específico.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Dtos Generales', component: 'interna-datos-generales' },
    { index: 2, title: 'Terceros Relacionados', component: 'interna-terceros-relacionados' },
    { index: 3, title: 'Pago de derechos', component: 'interna-pago-de-derechos' },
  ];

  /**
   * Evento emitido cuando el usuario cambia de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   * @description Notifica el cambio de pestaña a otros componentes.
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada y emite el evento correspondiente.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @description Actualiza la pestaña activa y notifica el cambio a otros componentes.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }
}
