import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

@Component({
  selector: 'app-datos-solitude',
  templateUrl: './datos-solitude.component.html',
  styleUrl: './datos-solitude.component.css',
})
export class DatosSolitudeComponent implements OnInit, OnDestroy {
  preOperativeForm!: FormGroup;

  solicitudPermisoState!: SolicitudPermisoState;

  destroy$ = new Subject<void>();

  radioOptions = [
    {
      label: 'Prórroga',
      value: 'Prorroga',
    },
    {
      label: 'Modificación',
      value: 'Modificacion',
    },
    {
      label: 'Modificación y prórroga',
      value: 'Modificacion y prorroga',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query
  ) {
    // Constructor logic here
  }

  ngOnInit(): void {
    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.solicitudPermisoState = state;
      });

    this.createOperatieForm();
  }

  createOperatieForm(): void {
    this.preOperativeForm = this.formBuilder.group({
      idGenerica1: [
        this.solicitudPermisoState.preOperativFormState.ideGenerica1,
      ],
      observaciones: [
        this.solicitudPermisoState.preOperativFormState.observaciones,
        [Validators.required],
      ],
    });
  }

  setValoresStore(campo: string): void{
    const VALOR = this.preOperativeForm.get(campo)?.value;
    this.tramite260703Store.updatePreOperativeFormState({[campo]:VALOR});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
