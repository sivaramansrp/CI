import { ANO_CATALOGO, FECHA_FIN, RADIO_OPCIONS } from '../models/registro.model';
import { Catalogo, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, SharedModule, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud120403State, Tramite120403Store } from '../state/Tramite120403.store';
import { CommonModule } from '@angular/common';
import { CuposService } from '../services/cupos.service';
import { Tramite120403Query } from '../state/Tramite120403.query';

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [CommonModule, InputRadioComponent, TituloComponent, CatalogoSelectComponent, ReactiveFormsModule, SharedModule, InputFechaComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss',
})
export class AsignacionComponent implements OnInit, OnDestroy {
  asignacionForm!: FormGroup;
  radioOpcions = RADIO_OPCIONS;
  valorSeleccionado: string = '';
  public anoCatalogo = ANO_CATALOGO;
  fechaFinInput = FECHA_FIN;
  public solicitudState!: Solicitud120403State;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mostrarVigencia: boolean = false;
  mostrarMonto: boolean = false;

  constructor(private cupos: CuposService,
    public fb: FormBuilder,
    private store: Tramite120403Store,
    private query: Tramite120403Query,
    private validacionesService: ValidacionesFormularioService
  ) { }

  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();
    this.obtenerDatosEstado();
  }
  
buscar(): void {
  const ASIGNACION_RADIO = this.asignacionForm.get('asignacionRadio')?.value;

  if (ASIGNACION_RADIO === 'vigencia') {
    this.mostrarVigencia = true;
    this.mostrarMonto = false;
  } else if (ASIGNACION_RADIO === 'monto') {
    this.mostrarVigencia = false;
    this.mostrarMonto = true;
  }
}

  cambioFechaPago(nuevo_fechaPago: string): void {
    this.asignacionForm.patchValue({
      fechaFin: nuevo_fechaPago,
    });
    this.setValoresStore(this.asignacionForm, 'fechaFin', 'setFechaFin');
  }

  public obtenerDatosEstado(): void {
    this.cupos
      .obtenerDatosAno()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp): void => {
        this.anoCatalogo.catalogos = resp as Catalogo[];
      });
  }
  /**
    * Valida el formulario y marca todos los campos como tocados si es inválido.
    */
  validarDestinatarioFormulario(): void {
    if (this.asignacionForm.invalid) {
      this.asignacionForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método del almacén para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite120403Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Configura el formulario con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
    this.asignacionForm = this.fb.group({
      asignacionRadio: [this.solicitudState?.asignacionRadio],
      asignacionsolitud: [this.solicitudState?.asignacionsolitud, [Validators.required]],
      numTramite: [this.solicitudState?.numTramite, [Validators.required]],
      fechaFin: [this.solicitudState?.fechaFin, [Validators.required]],
      ampliar: [this.solicitudState?.ampliar, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
