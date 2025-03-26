/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/tramites260603.store';

import { Tramite260603Query } from '../../../shared/estados/tramites260603.query';

import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-del-establecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './datos-del-establecimiento.component.html',
  styleUrl: './datos-del-establecimiento.component.scss',
})
export class DatosDelEstablecimientoComponent implements OnInit, OnDestroy {
  datosDelForm!: FormGroup;
   /**
   * Variable que controla la visibilidad del modal.
   */
   public modal: string = 'modal';

  /**
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;
  public solicitudState!: Solicitud260603State;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,
    private tramite260603Store: Tramite260603Store,
    private tramite260603Query: Tramite260603Query
  ) {
    //constructor
  }
  ngOnInit(): void {
    this.tramite260603Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        this.solicitudState = seccionState;
      })
    )
    .subscribe();

    this.datosDelForm = this.fb.group({
      denominacion: [this.solicitudState?.denominacion, [Validators.required]],
      correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email]],
    });

}
setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
  const VALOR = form.get(campo)?.value;
  (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
}

/**
   * Método que abre el modal y carga el formulario con los datos predefinidos del representante.
   */
public abrirModal() {
  this.modal = 'show'; // Muestra el modal
}

ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}

}
