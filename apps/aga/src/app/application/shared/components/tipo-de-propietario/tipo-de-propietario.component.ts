import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolicitanteComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';
import { Tramite630104State, Tramite630104Store } from '../../../tramites/630104/estados/tramites/tramite630104.store';
import { PersonaFisicaExtranjeroComponent } from '../persona-fisica-extranjero.component/persona-fisica-extranjero.component';
import { Tramite630104Query } from '../../../tramites/630104/estados/queries/tramite630104.query';

/**
 * Componente encargado de gestionar el tipo de propietario en el trámite.
 */
@Component({
  selector: 'app-tipo-de-propietario',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    PersonaFisicaExtranjeroComponent,
    TituloComponent,
    SolicitanteComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './tipo-de-propietario.component.html',
  styleUrl: './tipo-de-propietario.component.scss',
})
export class TipoDePropietarioComponent implements OnInit {
  /**
   * Lista de opciones disponibles para el tipo de solicitud.
   * @type {Catalogo[]}
   */
  @Input() tiposSolicitud: Catalogo[] = [];

  personaFisicaExtranjero: boolean | undefined;

  /**
   * Lista de opciones disponibles para el tipo de solicitud sin opciones adicionales.
   * @type {Catalogo[]}
   */
  @Input() tiposSolicitudNoOptions: Catalogo[] = [];

  /**
   * Formulario reactivo para gestionar los datos del tipo de propietario.
   * @type {FormGroup}
   */
  formSolicitud!: FormGroup;

  /**
   * Estado actual del trámite 630104.
   * @type {Tramite630104State}
   */
  public tramite630104State!: Tramite630104State;

  /**
   * Almacén del estado del trámite 630104.
   * @type {Tramite630104Store}
   */
  public tramite630104Store = Tramite630104Store;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Indica si se deben mostrar las opciones del formulario para el propietario.
   * @type {boolean | undefined}
   */
  public propietarioOptionsForm: boolean | undefined;

  /**
   * Indica si se deben mostrar las opciones sin formulario para el propietario.
   * @type {boolean | undefined}
   */
  public propietarioOptionsNoForm: boolean | undefined;

  /**
   * Evento que se emite para establecer valores en el formulario.
   * @type {EventEmitter<{ form: FormGroup; campo: string }>}
   */
  @Output() setValoresStoreEvent = new EventEmitter<{ form: FormGroup; campo: string }>();

  /**
   * Evento que se emite cuando se selecciona un tipo de solicitud.
   * @type {EventEmitter<Catalogo>}
   */
  @Output() settipoSolicitudSeleccionEvent = new EventEmitter<Catalogo>();

  /**
   * Constructor del componente.
   * @param fb Constructor para crear formularios reactivos.
   * @param tramite630104Query Consulta del estado del trámite 630104.
   */
  constructor(public fb: FormBuilder, private tramite630104Query: Tramite630104Query) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y crea el formulario de solicitud.
   */
  ngOnInit(): void {
    this.tramite630104Query
      .select()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.tramite630104State = state;
      });
    this.createFormSolicitud();
  }

  /**
   * Método para crear el formulario reactivo de solicitud.
   */
  createFormSolicitud(): void {
    this.formSolicitud = this.fb.group({
      esConsultaRep: [this.tramite630104State?.esConsultaRep || '', Validators.required],
      esExtranjero: [this.tramite630104State?.esExtranjero || '', Validators.required],
    });
  }

  /**
   * Método que emite un evento para establecer valores en el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo que se va a actualizar.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    if (this.formSolicitud) {
      this.setValoresStoreEvent.emit({ form: this.formSolicitud, campo });
    }
    if (this.tramite630104State.esConsultaRep === 'Si') {
      this.propietarioOptionsForm = true;
    } else if (this.tramite630104State.esConsultaRep === 'No') {
      this.propietarioOptionsForm = false;
    }
    this.propietarioOptionsNoForm = false;
  }

  /**
   * Método que emite un evento para establecer valores en el formulario sin opciones adicionales.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo que se va a actualizar.
   */
  setValoresStoreForNoOption(form: FormGroup, campo: string): void {
    if (this.formSolicitud) {
      this.setValoresStoreEvent.emit({ form: this.formSolicitud, campo });
    }
    if (this.tramite630104State.esExtranjero === 'Persona Fisica Extranjero') {
      this.propietarioOptionsNoForm = true;
      this.personaFisicaExtranjero = true;
    } else if (this.tramite630104State.esExtranjero === 'Persona Fisica Extranjero 2'){
      this.propietarioOptionsNoForm = true;
      this.personaFisicaExtranjero = false;
    }
  }
}