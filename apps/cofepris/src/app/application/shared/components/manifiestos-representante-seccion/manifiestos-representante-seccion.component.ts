/**
 * @fileoverview Componente `ManifiestosRepresentanteSeccionComponent`
 * Este componente gestiona el formulario relacionado con los manifiestos del representante,
 * incluyendo datos como RFC, nombre, apellidos, y opciones de información confidencial.
 * También permite la interacción con el estado global y la búsqueda de datos del representante.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { EstablecimientoService } from '../../services/establecimiento.service';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import {
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';


import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';

import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

import { Manifiestistos, PropietarioTipoPersona } from '../../models/datos-de-la-solicitud.model';

@Component({
  selector: 'app-manifiestos-representante-seccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    FormsModule,
  ],
  templateUrl: './manifiestos-representante-seccion.component.html',
  styleUrl: './manifiestos-representante-seccion.component.scss',
})
export class ManifiestosRepresentanteSeccionComponent
  implements OnInit, OnDestroy
{
  /**
   * Subject utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Opciones para el radio de información confidencial.
   */
  informacionConfidencialRadioOption: PropietarioTipoPersona[]=[];

  /**
   * Texto de los manifiestos.
   */
  manifiestosText: string = '';

  /**
   * Formulario para gestionar los datos del representante.
   */
  manifiestosRepresentanteForm!: FormGroup;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para inicializar formularios reactivos.
   * @param representanteStore Store para gestionar el estado del representante.
   * @param representanteQuery Query para obtener el estado inicial del representante.
   */
  constructor(
    private fb: FormBuilder,
    private representanteStore: DatosDelSolicituteSeccionStateStore,
    private representanteQuery: DatosDelSolicituteSeccionQuery,
    private establecimientoService :EstablecimientoService
  ) {}

  /**
   * Ciclo de vida `OnInit`.
   * Inicializa el formulario y carga los datos iniciales.
   */
  ngOnInit(): void {
    this.manifiestosText = MANIFIESTOS_DECLARACION.MANIFIESTOS;

    this.manifiestosRepresentanteForm = this.fb.group({
      representanteRfc: ['', Validators.required],
      manifests: ['', Validators.required],
      informacionConfidencialRadio: ['', Validators.required],
      representanteNombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
    });

    // Cargar el estado inicial en el formulario
    this.representanteQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.manifiestosRepresentanteForm.patchValue(state, {
          emitEvent: false,
        });
      });

    // Actualizar el estado global cuando cambien los valores del formulario
    this.manifiestosRepresentanteForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.representanteStore.update(value);
      });

      this.establecimientoService
      .getInformacionConfidencialRadioOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.informacionConfidencialRadioOption = data; // Bind the fetched data
       
      });
  }

  /**
   * Busca los datos del representante por RFC y los actualiza en el formulario.
   */
  buscarRepresentanteRfc(): void {
    const RFC = this.manifiestosRepresentanteForm.get('representanteRfc')?.value;
    if (RFC) {
      this.establecimientoService
        .getManifiestosByRfc(RFC)
        .pipe(takeUntil(this.destroy$))
        .subscribe((representante: Manifiestistos | null) => {
          if (representante) {
            this.manifiestosRepresentanteForm.patchValue({
              representanteNombre: representante.representanteNombre,
              apellidoPaterno: representante.apellidoPaterno,
              apellidoMaterno: representante.apellidoMaterno,
            });
          } else {
            console.error(`No representante found for RFC: ${RFC}`);
          }
        });
    } else {
      console.warn('Please enter a valid RFC.');
    }
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
