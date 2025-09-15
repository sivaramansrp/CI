/**
 * @fileoverview Componente para la gestión del formulario de solicitante.
 * Este componente maneja la lógica y la presentación del formulario de solicitante,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module SolicitantetabComponent
 */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ListaPasosWizard, PASOS, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { SolicitanteasigncionserviceService } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
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
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private service: SolicitanteasigncionserviceService) { }

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


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
      autorizado: [{ value: '', disabled: true }],
      expendido: [{ value: '', disabled: true }],
      disponible: [{ value: '', disabled: true }],
      ampliar: [{ value: ''}],
    });
  }

  /**
   * Carga los datos de asignación.
   */
  loadAsignacionData(): void {
    this.service.getSolicitante().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (data:any) => {
        this.formasignacion.patchValue({
          especie: data.especie,
          funcionZootecnica: data.funcionZootecnica,
          autorizado: data.autorizado,
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
    // eslint-disable-next-line no-empty
    if (this.formasignacion.valid) {
      
    // eslint-disable-next-line no-empty
    } else {
      
    }
  }
}