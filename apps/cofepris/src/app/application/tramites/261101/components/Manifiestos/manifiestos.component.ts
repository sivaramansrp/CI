import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../estados/datos-solicitude.query';
import { DatosProcedureState } from '../../estados/datos-solicitude.store';
import { DatosProcedureStore } from '../../estados/datos-solicitude.store';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

// import { CommonModule } from '@angular/common';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { InputRadioComponent } from '@libs/shared/data-access-user/src';
// import { DatosProcedureStore } from '../../estados/datos-solicitude.store';
// import { DatosProcedureQuery } from '../../estados/datos-solicitude.query';
// import { DatosProcedureState } from '../../estados/datos-solicitude.store';

@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  templateUrl: './manifiestos.component.html',
  styleUrl: './manifiestos.component.css',
})
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * Texto del manifiesto de veracidad.
   * @public
   */
  public manifestoDeVeracidad: string =
    'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedat de declaraciones dadas a una autondad. Asimismo acepto, que la notificación de este trámite, sea a través de la ventanilla Unica de Comercio Exterior por los mecanismos de la misma';

  /**
   * Texto ingresado en el cuadro para motivo de desistimiento.
   * @public
   */
  public motivoDesistimientotextBox: string = '';

  /**
   * Texto de confirmación de veracidad.
   * @public
   */
  public confirmarVeracidad: string = '';

  /**
   * Indica si la casilla de declaración fue marcada.
   * @public
   */
  public declaracionEstaMarcado: boolean = false;

  /**
   * Formulario reactivo para datos del establecimiento.
   * @public
   */
  public domicilioEstablecimiento!: FormGroup;

  /**
   * Formulario reactivo de la sección de aduanas.
   * @public
   */
  public Aduana!: FormGroup;

  /**
   * Estado actual de la sección almacenado desde el observable.
   * @private
   */
  private seccionState!: DatosProcedureState;

  /**
   * Opciones del componente de radio input.
   * @public
   */
  public radioOptions: { label: string; value: string }[] = [
    { label: 'No', value: 'No' },
    { label: 'Si', value: 'Si' },
  ];

  /**
   * Subject para limpiar subscripciones y prevenir memory leaks.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para construir formularios reactivos.
   * @param store Servicio de almacenamiento de estado.
   * @param query Servicio de consulta del estado.
   */
  constructor(
    private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery
  ) {}

  /**
   * Hook de inicialización del componente.
   * Se suscribe al observable `selectProrroga$` y configura el formulario.
   */
  public ngOnInit(): void {
    this.query.selectProrroga$
      ?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
        this.declaracionEstaMarcado = Boolean(this.seccionState?.aduanas);
        this.mercanciasData();
      });
  }

  /**
   * Inicializa el formulario reactivo con los valores del estado.
   * @public
   */
  public mercanciasData(): void {
    this.Aduana = this.fb.group({
      aduanas: [
        {
          value: this.seccionState?.aduanas || '',
          disabled: false,
        },
      ],
      informacionConfidencial: [
        {
          value: this.seccionState?.informacionConfidencial || '',
          disabled: false,
        },
      ],
      Si: [{ value: '', disabled: false }],
    });
  }

  /**
   * Establece un valor en la tienda a partir de un campo del formulario.
   * @param form Formulario reactivo del cual se extrae el valor.
   * @param campo Nombre del campo que se va a guardar.
   * @public
   */
  public setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
  }

  /**
   * Hook de destrucción del componente.
   * Finaliza las subscripciones.
   * @public
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
