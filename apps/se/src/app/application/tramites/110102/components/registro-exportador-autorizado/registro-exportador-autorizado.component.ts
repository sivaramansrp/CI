/**
 * Este componente maneja el registro de exportadores autorizados.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ExportadorAutorizadoService} from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';

/**
 * Este componente maneja el registro de exportadores autorizados.
 */
@Component({
  selector: 'app-registro-exportador-autorizado',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './registro-exportador-autorizado.component.html',
  styleUrl: './registro-exportador-autorizado.component.scss',
})
export class RegistroExportadorAutorizadoComponent implements OnInit,OnDestroy {

  private destroyed$ = new Subject<void>();
/**
   * Enumeración que representa las opciones de exportador autorizado.
   */
exportadorOptions!:{ label: string; value: string | number }[];

/**
 * Enumeración que representa las opciones de exportador autorizado para Japón.
 */
exportadorOptionsJPN!:{ label: string; value: string | number }[];

/**
 * FormGroup que contiene los datos del formulario de registro de exportador.
 * El signo de exclamación (!) indica que la propiedad será inicializada más tarde.
 */
registroExportadorForm!: FormGroup;

/**
 * Indica si se debe mostrar el div de opciones de exportador autorizado.
 */
showDivExportador: boolean = false;

/**
 * Indica si se debe mostrar el div de opciones de exportador autorizado para Japón.
 */
showDivExportadorJPN: boolean = false;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   */
  constructor(private fb: FormBuilder,private service: ExportadorAutorizadoService) {
    // Lógica del constructor puede ser añadida aquí si es necesario
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Inicializa el formulario y establece los valores iniciales de los controles.
   */
  ngOnInit(): void {
    this.registroExportadorForm = this.fb.group({
      solicitaSeparacionContable: [false],
      solicitaExportadorAutorizado: [false],
      condicionExportador: [''],
      solicitaExportadorAutorizadoJPN: [false],
      condicionExportadorJPN: ['']
    });
    this.getExportadorAutorizado();
    this.getExportadorAutorizadoJPN();
    this.showDivExportador = this.registroExportadorForm.get('solicitaExportadorAutorizado')?.value;
    this.showDivExportadorJPN = this.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.value;
  }

  /**
   * Maneja el cambio del control `solicitaExportadorAutorizado`.
   * @param {Event} event - El evento de cambio.
   */
  onSolicitaExportadorAutorizadoChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    this.showDivExportador = INPUT.checked;
  }

  /**
   * Maneja el cambio del control `solicitaExportadorAutorizadoJPN`.
   * @param {Event} event - El evento de cambio.
   */
  onSolicitaExportadorAutorizadoJPNChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    this.showDivExportadorJPN = INPUT.checked;
  }

  /**
   * Maneja el cambio del control `condicionExportador`.
   * @param {string | number} valor - El nuevo valor de la condición del exportador.
   */
  onCambioCondicionExportador(valor: string | number): void {
    this.registroExportadorForm.patchValue({
      condicionExportador: valor
    });
  }

  /**
   * Maneja el cambio del control `condicionExportadorJPN`.
   * @param {string | number} valor - El nuevo valor de la condición del exportador para Japón.
   */
  onCambioCondicionExportadorJPN(valor: string | number): void {
    this.registroExportadorForm.patchValue({
      condicionExportadorJPN: valor
    });
  }


  getExportadorAutorizado(): void {
    this.service.getExportadorAutorizado().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.exportadorOptions = data;
      }
    );
  }

  getExportadorAutorizadoJPN(): void {
    this.service.getExportadorAutorizadoJPN().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.exportadorOptionsJPN = data;
      }
    );
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}