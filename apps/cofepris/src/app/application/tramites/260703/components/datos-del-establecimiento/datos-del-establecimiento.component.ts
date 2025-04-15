import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

@Component({
  selector: 'app-datos-del-establecimiento',
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.css',
})
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  datosDelEstablecimientoForm!: FormGroup;
  solicitudPermisoState!: SolicitudPermisoState;

  destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private tramite260703Store: Tramite260703Store,
    private tramitte260703Query: Tramite260703Query
  ) {
    //
  }

  ngOnInit(): void {
    this.tramitte260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.solicitudPermisoState = state;
      });
    this.createDatosDelEstablecimientoForm();
  }

  createDatosDelEstablecimientoForm(): void {
    this.datosDelEstablecimientoForm = this.formBuilder.group({
      razonSocial: [
        this.solicitudPermisoState.datosDelEstablecimientoFormState.razonSocial,
        [Validators.required],
      ],
      correoElectronico: [
        this.solicitudPermisoState.datosDelEstablecimientoFormState
          .correoElectronico,
        [Validators.required, Validators.maxLength(320)],
      ],
    });
  }

  setValoresStore(campo:string):void{
    this.tramite260703Store.updateDatosDelEstablecimientoFormState({
      [campo]: this.datosDelEstablecimientoForm.get(campo)?.value,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
