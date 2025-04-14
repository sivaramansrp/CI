import { Component, OnDestroy, OnInit } from '@angular/core';
import {DatosDomicilioLegalState,DatosDomicilioLegalStore,} from '../../estados/stores/datos-domicilio-legal.store';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente principal para gestionar el formulario de representante.
 */
@Component({
  selector: 'app-representante-legal-rfc',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representante-legal-rfc.component.html',
  styleUrl: './representante-legal-rfc.component.css',
})
export class RepresentanteLegalRfcComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb
   * @param DatosDomicilioLegalStore
   * @param DatosDomicilioLegalQuery
   */
  constructor(
    private readonly fb: FormBuilder,
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} representante
   */
  representante!: FormGroup;

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
      this.configurarGrupoForm(); // Configura el formulario reactivo.
  
  }
  /**
   * Configura el formulario reactivo.
   * @description Configura el formulario reactivo para el componente.
   */
  configurarGrupoForm(): void // Configura el formulario reactivo.
  {
    this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
      apellidoMaterno: [{ value: '', disabled: true }],
    });
  }
  /**
   * Obtiene el valor de un campo en el store de Tramite31601.
   */
  obtenerValor(): void {
    this.representante.patchValue({
      nombre: 47875,
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.DatosDomicilioLegalStore[metodoNombre] as (
        value: string | number
      ) => void
    )(VALOR);
  }

  /**
   * Limpia los campos del formulario.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
