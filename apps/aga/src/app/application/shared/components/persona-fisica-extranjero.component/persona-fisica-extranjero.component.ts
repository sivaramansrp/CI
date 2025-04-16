import { Catalogo,ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Tramite630104State, Tramite630104Store } from '../../../tramites/630104/estados/tramites/tramite630104.store';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';

import { Tramite630104Query } from '../../../tramites/630104/estados/queries/tramite630104.query';

/**
 * Componente encargado de gestionar los datos de una persona física extranjera.
 */
@Component({
  selector: 'app-persona-fisica-extranjero',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent, ReactiveFormsModule],
  templateUrl: './persona-fisica-extranjero.component.html',
  styleUrl: './persona-fisica-extranjero.component.scss',
})
export class PersonaFisicaExtranjeroComponent implements OnInit {
  /**
   * Lista de opciones disponibles para el tipo de solicitud sin opciones adicionales.
   * @type {Catalogo[]}
   */
  @Input() tiposSolicitudNoOptions: Catalogo[] = [];


  @Input() personaFisicaExtranjero : boolean | undefined;

  /**
   * Formulario reactivo para gestionar los datos del fabricante.
   * @type {FormGroup}
   */
  datosDelFabricanteForm!: FormGroup;

  /**
   * Estado actual del trámite 630104.
   * @type {Tramite630104State}
   */
  public tramite630104State!: Tramite630104State;

  /**
   * Almacén del estado del trámite 630104.
   * @type {Tramite630104Store}
   */
  public tramite630104Store = new Tramite630104Store();

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb Constructor para crear formularios reactivos.
   * @param tramite630104Query Consulta del estado del trámite 630104.
   */
  constructor(public fb: FormBuilder, private tramite630104Query: Tramite630104Query, private validacionesService: ValidacionesFormularioService) {
    this.crearDatosDelFabricanteForm();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado del trámite y actualiza el formulario con los datos iniciales.
   */
  ngOnInit(): void {
    this.tramite630104Query
      .select()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.tramite630104State = state;
      });
  }

  /**
   * Método para crear el formulario reactivo de datos del fabricante.
   */
  crearDatosDelFabricanteForm(): void {
    this.datosDelFabricanteForm = this.fb.group({
      nombre: [{ value: this.tramite630104State?.nombre, disabled: false }],
      apellidoPaterno: [{ value: this.tramite630104State?.apellidoPaterno, disabled: false }],
      apellidoMaterno: [{ value: this.tramite630104State?.apellidoMaterno, disabled: false }],
      calle: [{ value: this.tramite630104State?.calle, disabled: false }],
      numeroExterior: [{ value: this.tramite630104State?.numeroExterior, disabled: false }],
      numeroInterior: [{ value: this.tramite630104State?.numeroInterior, disabled: false }],
      pais: [{ value: this.tramite630104State?.pais, disabled: false }],
      estadoLocalidad: [{ value: this.tramite630104State?.estadoLocalidad, disabled: false }],
      correoElectronico: [{ value: this.tramite630104State?.correoElectronico, disabled: false }],
      telefono: [{ value: this.tramite630104State?.telefono, disabled: false }],
      codigoPostal: [{ value: this.tramite630104State?.codigoPostal, disabled: false }],
      razonSocial: [{ value: this.tramite630104State?.razonSocial, disabled: false }],
    });
  }

  /**
   * Método que se ejecuta cuando se selecciona un país en el formulario.
   * Actualiza el estado del país seleccionado en el almacén del trámite.
   */
  paisSeleccion(): void {
    const PAIS = this.datosDelFabricanteForm.get('cvePaisFabricante')?.value;
    this.tramite630104Store.setCvePaisFabricante(PAIS);
  }

  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

    /**
   * Obtiene el grupo de formulario de importador/exportador.
   */
    get datosDelFabricante(): FormGroup {
      return this.datosDelFabricanteForm.get('datosDelFabricante') as FormGroup;
    }

  /**
   * Método para establecer valores en el almacén del estado del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo que se va a actualizar.
   */
  // eslint-disable-next-line class-methods-use-this
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    // Aquí puedes agregar lógica adicional si es necesario
  }
}