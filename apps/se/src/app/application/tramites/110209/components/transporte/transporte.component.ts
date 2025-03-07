/**
 * Este componente maneja el formulario de transporte.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { TituloComponent } from '@ng-mf/data-access-user';
import { TransporteService } from '../../services/transporte.service';

import { Subject, takeUntil } from 'rxjs';

/**
 * Este componente maneja el formulario de transporte.
 */

@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el registro de transporte.
   * @type {FormGroup}
   */
  transporteForm!: FormGroup;

  /**
   * Opciones de medio de transporte.
   * @type {Catalogo[]}
   */
  medioDeTransporteOptions: Catalogo[] = [];

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de transporte.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {TransporteService} service - Servicio para obtener datos de transporte.
   */
  constructor(private fb: FormBuilder, private service: TransporteService) {
    this.transporteForm = this.fb.group({
      medioDeTransporte: [''],
      rutaCompleta: [''],
      puertoDeEmbarque: [''],
      puertoDeDesembarque: ['']
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de medio de transporte.
   */
  ngOnInit(): void {
    this.getMedioDeTransporte();
  }

  /**
   * Obtiene las opciones de medio de transporte desde el servicio.
   */
  getMedioDeTransporte(): void {
    this.service.getMedioDeTransporte().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.medioDeTransporteOptions = data;
      }
    );
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}