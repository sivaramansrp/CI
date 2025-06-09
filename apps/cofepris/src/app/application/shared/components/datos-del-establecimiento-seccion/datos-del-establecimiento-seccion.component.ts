/**
 * compodoc
 * @fileoverview Componente `DatosDelEstablecimientoSeccionComponent`
 * Este componente gestiona los datos del establecimiento, incluyendo su denominación o razón social
 * y su correo electrónico. Utiliza formularios reactivos para la validación y sincronización de datos
 * con un estado global a través de un `StateStore`.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Modal } from 'bootstrap';

import { Subject, takeUntil } from 'rxjs';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

/**
 * compodoc
 * @description
 * Componente para gestionar los datos del establecimiento.
 * Permite cargar y actualizar datos en un formulario reactivo, sincronizándolos con un estado global.
 */
@Component({
  selector: 'app-datos-del-establecimiento-seccion',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './datos-del-establecimiento-seccion.component.html',
  styleUrl: './datos-del-establecimiento-seccion.component.scss',
})
/*
  * @description
  * Clase que representa el componente de datos del establecimiento.
  * Este componente gestiona la visualización y edición de los datos del establecimiento,
  * incluyendo su denominación, razón social y correo electrónico.
  */
export class DatosDelEstablecimientoSeccionComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /**
   * Referencia al botón que abre el modal del establecimiento.
   */
  @ViewChild('establecimientoModalButton', { static: false })
  establecimientoModalButton!: ElementRef;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Formulario reactivo que contiene los campos del establecimiento.
   */
  detosEstablecimiento!: FormGroup;

  /**
   * Instancia del modal de Bootstrap.
   */
  establecimientoModalInstance!: Modal;

  /**
   * Indica si el formulario debe estar deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param establecimientoStore StateStore para sincronizar datos del establecimiento.
   * @param establecimientoQuery Query para obtener el estado inicial del establecimiento.
   */
  constructor(
    private fb: FormBuilder,
    private establecimientoStore: DatosDelSolicituteSeccionStateStore,
    private establecimientoQuery: DatosDelSolicituteSeccionQuery
  ) {}

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa el formulario y sincroniza los datos con el estado global.
   */
  ngOnInit(): void {
    this.detosEstablecimiento = this.fb.group({
      establecimientoDenominacionRazonSocial: ['', Validators.required],
      establecimientoCorreoElectronico: ['', Validators.required],
    });

    // Cargar el estado inicial en el formulario
    this.establecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.detosEstablecimiento.patchValue(state, { emitEvent: false });
      });
 if (this.formularioDeshabilitado) {
      this.detosEstablecimiento.disable();
    }
  }
  onControlChange(controlName: string): void {
    const UPDATED_VALUE = { [controlName]: this.detosEstablecimiento.get(controlName)?.value };
    this.establecimientoStore.update(UPDATED_VALUE);
  }
  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModalButton) {
      this.establecimientoModalInstance = new Modal(
        this.establecimientoModalButton.nativeElement
      );
    }
  }

  /**
   * Abre el modal del establecimiento.
   */
  openEstablecimientoModal(): void {
    this.establecimientoModalInstance.show();
  }

  /**
   * Ciclo de vida `OnDestroy`.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}