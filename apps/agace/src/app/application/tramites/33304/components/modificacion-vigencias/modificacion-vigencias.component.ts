import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
    InputFecha,
    InputFechaComponent,  
    InputRadioComponent,
    TituloComponent
} from '@libs/shared/data-access-user/src';
import { Solicitud33304State, Solicitud33304Store } from '../../estados/solicitud33304Store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PERFILES_FECHA_INPUT } from '../../../32605/constants/perfiles.enum';
import { RADIO_OPTIONS } from '../../constants/aviso-modificacion-tabla.enum';
import { Solicitud33304Query } from '../../estados/solicitud33304Query';

@Component({
  selector: 'app-modificacion-vigencias',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TituloComponent,
    InputRadioComponent,
    InputFechaComponent
  ],
  templateUrl: './modificacion-vigencias.component.html',
  styleUrls: ['./modificacion-vigencias.component.scss'],
})
export class ModificacionVigenciasComponent implements OnInit, OnDestroy {
  formularioModificacionVigencias!: FormGroup;

  radioOptions = RADIO_OPTIONS;

  /** Config for <input-fecha> */
  fechaInputDatos: InputFecha = PERFILES_FECHA_INPUT;

  /** Readonly flag from Consultaio */
  esFormularioSoloLectura = false;

  /** App state (optional if you need it) */
  solicitudState!: Solicitud33304State;

  /** Destroy notifier */
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private solicitud33304Store: Solicitud33304Store,
    private solicitud33304Query: Solicitud33304Query,
    private consultaioQuery: ConsultaioQuery,
  ) {}

  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map(seccion => {
          this.esFormularioSoloLectura = !seccion.readonly;
          // if (this.formularioModificacionVigencias) {
          //   this.esFormularioSoloLectura
          //     ? this.formularioModificacionVigencias.disable({ emitEvent: false })
          //     : this.formularioModificacionVigencias.enable({ emitEvent: false });
          // }
        })
      )
      .subscribe();

    // Load current state & build form
    this.solicitud33304Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map(state => {
          this.solicitudState = state;
          this.crearFormulario();
        })
      )
      .subscribe();
  }

  private crearFormulario(): void {

    this.formularioModificacionVigencias = this.fb.group({
      modificacionVigencias: [this.solicitudState?.modificacionVigencias ?? 'Si', Validators.required],
      fechaInicioVigenciaAnterior: [this.solicitudState?.fechaInicioVigenciaAnterior ?? ''],
      fechaFinVigenciaAnterior: [this.solicitudState?.fechaFinVigenciaAnterior ?? ''],
      fechaInicioVigenciaActual: [this.solicitudState?.fechaInicioVigenciaActual ?? ''],
      fechaFinVigenciaActual: [this.solicitudState?.fechaFinVigenciaActual ?? ''],
    });

    // if (this.esFormularioSoloLectura) {
    //   this.formularioModificacionVigencias.disable({ emitEvent: false });
    // }
  }



  /** Called by (valueChange) on the radio */
  onCambioModificacionVigencias(valor: string | number, controlName: string): void {
    this.setValoresStore(this.formularioModificacionVigencias, controlName);
    this.applyVigenciaValidators(valor === '1');
  }

  // /** Centralized date setter used by (valorCambiado) of <input-fecha> */
  // actualizarFecha(nuevoValor: string, control: string): void {
  //   const ctr = this.formularioModificacionVigencias.get(control);
  //   ctr?.setValue(nuevoValor);
  //   ctr?.markAsDirty();
  //   ctr?.updateValueAndValidity();
  // }

  /** Generic store setter used in (change) or along with actualizarFecha */
  setValoresStore(form: FormGroup | null, campo: string): void {
    if (!form){
      return;
    }
    const CONTROL = form.get(campo);
    if (CONTROL && CONTROL.value !== undefined) {
      this.solicitud33304Store.actualizarEstado({ [campo]: CONTROL.value });
    }
  }

  /** Add/remove required validators on dates depending on radio selection */
  private applyVigenciaValidators(requiereFechas: boolean): void {
    const CONTROLS = [
      'fechaInicioVigenciaAnterior',
      'fechaFinVigenciaAnterior',
      'fechaInicioVigenciaActual',
      'fechaFinVigenciaActual',
    ];

    CONTROLS.forEach(c => {
      const CTRL = this.formularioModificacionVigencias.get(c);
      if (!CTRL){
        return;
      }
      if (requiereFechas) {
        CTRL.setValidators([Validators.required]);
      } else {
        CTRL.clearValidators();
        CTRL.setValue('', { emitEvent: false });
      }
      CTRL.updateValueAndValidity({ emitEvent: false });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
