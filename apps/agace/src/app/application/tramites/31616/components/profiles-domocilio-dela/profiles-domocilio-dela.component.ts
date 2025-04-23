import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud31616PerfilesState,
  Tramite31616PerfilesStore,
} from '../../../../estados/tramites/tramite31616_perfiles.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/tramites/constantes/31616/datos-comunes.enum';
import { Tramite31616PerfilesQuery } from '../../../../estados/queries/tramite31616_perfiles.query';

@Component({
  selector: 'app-profiles-domocilio-dela',
  standalone: true,
  imports: [InputRadioComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './profiles-domocilio-dela.component.html',
  styleUrls: ['./profiles-domocilio-dela.component.css'],
})
export class ProfilesDomocilioDelaComponent implements OnInit, OnDestroy {
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  contingencyForm!: FormGroup;
  private solicitudState!: Solicitud31616PerfilesState;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(
    private fb: FormBuilder,
    private tramite31616Store: Tramite31616PerfilesStore,
    private tramite31616Query: Tramite31616PerfilesQuery
  ) {
    //
  }

  ngOnInit(): void {
    this.tramite31616Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.crearContingencyFormulario();
  }
  crearContingencyFormulario(): void {
    this.contingencyForm = this.fb.group({
      comiteSeguridad: [
        this.solicitudState?.comiteSeguridad,
        Validators.required,
      ],
      fuentesInformacion: [
        this.solicitudState?.fuentesInformacion,
        Validators.required,
      ],
      politica: [this.solicitudState?.politica, Validators.required],
      indique: [this.solicitudState?.indique, Validators.required],
      periodicidad: [this.solicitudState?.periodicidad, Validators.required],
      programa: [this.solicitudState?.programa, Validators.required],
      capacitacion: [this.solicitudState?.capacitacion, Validators.required],
      procedimiento: [this.solicitudState?.procedimiento, Validators.required],
      descripcionProcedimiento: [
        this.solicitudState?.descripcionProcedimiento,
        Validators.required,
      ],
      nombreProcedimiento: [
        this.solicitudState?.nombreProcedimiento,
        Validators.required,
      ],
      programacionAuditoria: [
        this.solicitudState?.programacionAuditoria,
        Validators.required,
      ],
      participantesAuditoria: [
        this.solicitudState?.participantesAuditoria,
        Validators.required,
      ],
      enfoqueAuditoria: [
        this.solicitudState?.enfoqueAuditoria,
        Validators.required,
      ],
      procesosAuditados: [
        this.solicitudState?.procesosAuditados,
        Validators.required,
      ],
      registrosAuditoria: [
        this.solicitudState?.registrosAuditoria,
        Validators.required,
      ],
      programacion: [this.solicitudState?.programacion, Validators.required],
      registrosNombre: [
        this.solicitudState?.registrosNombre,
        Validators.required,
      ],
      registrosEmpresa: [
        this.solicitudState?.registrosEmpresa,
        Validators.required,
      ],
      planEmergencia: [
        this.solicitudState?.planEmergencia,
        Validators.required,
      ],
      situacionesContempladas: [
        this.solicitudState?.situacionesContempladas,
        Validators.required,
      ],
      mecanismosContinuidad: [
        this.solicitudState?.mecanismosContinuidad,
        Validators.required,
      ],
      simulacrosDocumentacion: [
        this.solicitudState?.simulacrosDocumentacion,
        Validators.required,
      ],
    });
  }
  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite31616PerfilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite31616Store[metodoNombre] as (value: string) => void)(VALOR);
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
