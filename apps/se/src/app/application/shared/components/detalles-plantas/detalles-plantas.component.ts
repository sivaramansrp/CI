import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CATALOGO_SI_NO, CATALOGO_SI_NOID, CATALOGO_SI_NOVALUE } from '../../constantes/detalles-plantas.enum';
import { CommonModule } from '@angular/common';
import { PlantasSubfabricante } from '../../models/empresas-subfabricanta.model';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalles-plantas',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './detalles-plantas.component.html',
  styleUrl: './detalles-plantas.component.scss',
})
/**
 * Componente para gestionar los detalles de las plantas.
 */
export class DetallesPlantasComponent {
  /**
   * Lista de plantas seleccionadas.
   * @property {PlantasSubfabricante[]} plantasSeleccionadas
   */
  @Input() plantasSeleccionadas: PlantasSubfabricante[] = [];

  /**
   * Evento emitido al regresar de la vista de plantas.
   * @property {EventEmitter<void>} alRegresarPlantas
   */
  @Output() alRegresarPlantas = new EventEmitter();

  /**
   * Evento emitido al regresar de la vista de plantas.
   * @property {EventEmitter<void>} graduar
   */
  @Output() guadarEvent = new EventEmitter();

  /**
   * Formulario para los datos del subcontratista.
   * @property {FormGroup} formularioDatosPlantas
   */

  formularioDatosPlantas!: FormGroup;

  /**
   * Catálogo de opciones de sí/no.
   * @property {any} catalogoSiNo
   */
  catalogoSiNo = CATALOGO_SI_NO;
  /**
   * Catálogo de opciones de sí/no (ID).
   * @property {any} catalogoSiNoId
   */
  catalogoSiNoId = CATALOGO_SI_NOID;

  /**
   * Catálogo de opciones de sí/no (valor).
   * @property {any} catalogoSiNoValue
   */
  catalogoSiNoValue = CATALOGO_SI_NOVALUE;

  /**
   * Constructor para inicializar el formulario de datos del subcontratista.
   * @param fb - FormBuilder para la creación del formulario reactivo.
   */

  /**
   * Constructor de la clase ComplementarPlantaComponent.
   * @param {Location} ubicaccion - Servicio de Angular para manejar la ubicación del navegador.
   */
  constructor(private fb: FormBuilder,private ubicaccion: Location,) {
    this.inicializarFormularioDatosPlantas();
  }

  /**
   * Inicializa el formulario de datos de las plantas.
   * @returns {void}
   */
  inicializarFormularioDatosPlantas(): void {
    this.formularioDatosPlantas = this.fb.group({
      permaneceMercancia: [1, Validators.required],
      tipoContribuyente: [1, Validators.required],
      opinionSAT: [{ value: 1, disabled: true }, Validators.required],
      fechaOpinion: ['12/03/2025', Validators.required],
    });
    this.formularioDatosPlantas.get('fechaOpinion')?.disable();
  }

  /**
   * Emite el evento para regresar de la vista de plantas.
   * @returns {void}
   */
  regresarPlantas(): void {
    this.alRegresarPlantas.emit();
    this.ubicaccion.back();
  }

  /**
   * Cambia el valor de 'permaneceMercancia' en el formulario.
   * @param {Catalogo} catalogoSeleccionado - El catálogo seleccionado.
   * @returns {void}
   */
  cambiarPermaneceMerCancia(catalogoSeleccionado: Catalogo): void {
    if (catalogoSeleccionado) {
      this.formularioDatosPlantas.patchValue({
        permaneceMercancia: catalogoSeleccionado.id,
      });
    }
  }

  /**
   * Cambia el valor de 'tipoContribuyente' en el formulario.
   * @param {Catalogo} catalogoSeleccionado - El catálogo seleccionado.
   * @returns {void}
   */
  cambiartipoContribuyente(catalogoSeleccionado: Catalogo): void {
    if (catalogoSeleccionado) {
      this.formularioDatosPlantas.patchValue({
        tipoContribuyente: catalogoSeleccionado.id,
      });
    }
  }

   /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }

  /**
   * Emits the `guadarEvent` to notify listeners that a save action has been triggered.
   *
   * Typically used to signal that the user has requested to save the current state or data.
   */
  guardar(){
    this.guadarEvent.emit();
  }
}
