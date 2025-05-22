/**
 * @fileoverview Componente para la gestión del formulario de asignación.
 * Este componente maneja la lógica y la presentación del formulario de asignación,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module AsignciontabComponent
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { SolicitantetabComponent } from '../solicitantetab/solicitantetab.component';

import { InputRadioComponent } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { SolicitanteasigncionserviceService } from '@libs/shared/data-access-user/src';

import { Catalogo } from '@ng-mf/data-access-user';
import { Tramite120404Query } from '../../estados/queries/tramite120404.query';
import { Tramite120404Store } from '../../estados/store/tramite120404.store';


/**
 * Componente para la gestión del formulario de asignación.
 * @selector app-asignciontab
 * @standalone true
 * @imports [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, SolicitantetabComponent, InputRadioComponent]
 * @templateUrl ./asignciontab.component.html
 * @styleUrl ./asignciontab.component.scss
 */
@Component({
  selector: 'app-asignciontab',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent,SolicitantetabComponent, InputRadioComponent],
  templateUrl: './asigncion-tab.component.html',
  styleUrls: ['./asigncion-tab.component.scss'],
})
export class AsignciontabComponent implements OnInit, OnDestroy {
  /**
   * Sujeto para manejar la destrucción del componente.
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * Formulario de asignación.
   */
  asignacionForm!: FormGroup;

  /**
   * Valor seleccionado de asignación.
   */
  selectedAsigncion: string | number = '';

  /**
   * Valor seleccionado para el componente de radio.
   */
  selectedValue: string = 'no';

  /**
   * Opciones de radio para la asignación.
   */
   asignacionRadio = [
    {
      label: 'Amplicacion de monto',
      value: 'yes'
    },
  ];

  /**
   * Lista de asignaciones.
   */
  public solicitanteList!: Catalogo[];

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario.
   * @param service Servicio para obtener los datos de asignación.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private service: SolicitanteasigncionserviceService, private tramite120404Store:Tramite120404Store,private tramite120404Query:Tramite120404Query) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.initForm();
    this.loadComboUnidadMedida();
    this.enPatchFormData();
  }

  /**
   * Inicializa el formulario de asignación.
   */
  initForm(): void {
    this.asignacionForm = this.fb.group({
      datosRegimen: this.fb.group({
        asignacionsolitud: ['', Validators.required],
        numTramite: ['', Validators.required],
        asignacionRadio: [false, Validators.requiredTrue]
      })
    });
  }

  /**
   * Método para manejar el envío del formulario.
   */
  buscar(): void {
    // eslint-disable-next-line no-empty
    if (this.asignacionForm.valid) {
      
    } 
    // eslint-disable-next-line no-empty
    else {
      
    }
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param id Identificador del control.
   * @returns true si el control es inválido, false en caso contrario.
   */
  isInvalid(id: string): boolean | null {
    const CONTROL = this.asignacionForm.get('datosRegimen')?.get(id);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  /**
   * Carga los datos del combo de unidad de medida.
   */
  loadComboUnidadMedida(): void {
    this.service.getAsigncion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.solicitanteList = data as Catalogo[];
    });
  }

  /**
  * Obtiene el valor de un control en el formulario y lo pasa a un método del store para actualizar el estado.
  */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120404Store): void {
    const VALOR = form.get('datosRegimen')?.get(campo)?.value;
    (this.tramite120404Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
  * Actualiza el formulario con datos del store
  */
  enPatchFormData(): void {
    this.tramite120404Query.selectTramite120404$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.asignacionForm.get('datosRegimen')?.patchValue(
              {
                  numTramite:seccionState.numTramite,
                  asignacionsolitud: seccionState.asignacionsolitud,
                  asignacionRadio: seccionState.asignacionRadio
              } 
              )
          })
        )
        .subscribe();
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}