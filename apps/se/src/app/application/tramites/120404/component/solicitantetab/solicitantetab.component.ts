/**
 * @fileoverview Componente para la gestión del formulario de solicitante.
 * Este componente maneja la lógica y la presentación del formulario de solicitante,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module SolicitantetabComponent
 */

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent, AlertComponent, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { SolicitanteasigncionserviceService } from 'libs/shared/data-access-user/src/core/services/120404/solicitanteasigncionservice.service';
import { AsignacionData } from 'libs/shared/data-access-user/src/core/models/120404/asignacionmodel';
import { Subject, takeUntil } from 'rxjs';

/**
 * Componente para la gestión del formulario de solicitante.
 * @selector app-solicitantetab
 * @standalone true
 * @imports [CommonModule, TituloComponent, AlertComponent, ReactiveFormsModule, BtnContinuarComponent]
 * @templateUrl ./solicitantetab.component.html
 * @styleUrl ./solicitantetab.component.scss
 */
@Component({
  selector: 'app-solicitantetab',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, ReactiveFormsModule, BtnContinuarComponent],
  templateUrl: './solicitantetab.component.html',
  styleUrls: ['./solicitantetab.component.scss'],
})
export class SolicitantetabComponent implements OnInit, OnDestroy {
  /**
   * Formulario de asignación.
   */
  formasignacion!: FormGroup;

  /**
   * Sujeto para manejar la destrucción del componente.
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * Texto de la alerta.
   */
  texto: string = 'La solitud ha quedado registrada con el número de expediente 202758350. Esto no tiene validez legal, sirve solamente para efectos de identificar tu solitud. Un folio le será asignado a la solitud al momento en que esta sea firmada.';

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario.
   * @param service Servicio para obtener los datos de asignación.
   */
  constructor(private fb: FormBuilder, private service: SolicitanteasigncionserviceService) { }

  /**
   * Referencia al componente Wizard.
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
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.initForm();
    this.loadAsignacionData();
  }

  /**
   * Inicializa el formulario de asignación.
   */
  initForm(): void {
    this.formasignacion = this.fb.group({
      especie: [{ value: '', disabled: true }],
      funcionZootecnica: [{ value: '', disabled: true }],
      authorizado: [{ value: '', disabled: true }],
      expendido: [{ value: '', disabled: true }],
      disponible: [{ value: '', disabled: true }],
      ampliar: [{ value: '', disabled: true }],
    });
  }

  /**
   * Carga los datos de asignación.
   */
  loadAsignacionData(): void {
    this.service.getAsigncionsolicitante().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:any) => {
        this.formasignacion.patchValue({
          especie: data.especie,
          funcionZootecnica: data.funcionZootecnica,
          authorizado: data.authorizado,
          expendido: data.expendido,
          disponible: data.disponible,
          ampliar: data.ampliar,
        });
      }
    );
  }

  /**
   * Método para manejar el envío del formulario.
   */
  enviarFormulario(): void {
    if (this.formasignacion.valid) {
      console.log('Formulario de asignación enviado:', this.formasignacion.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}