import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { Solicitud260603State, Tramite260603Store } from '../../../shared/estados/tramites260603.store';
import { Tramite260603Query } from '../../../shared/estados/tramites260603.query';

import { Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,TituloComponent],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit {
  representanteLegalForm!: FormGroup;
  public solicitudState!: Solicitud260603State;
  private destroyNotifier$: Subject<void> = new Subject();
  constructor(private fb:FormBuilder,
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

    this.representanteLegalForm = this.fb.group({
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],
      nombreRazonSocial: [{ value: '', disabled: true }, Validators.required],
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
      apellidoMaterno: [{ value: '', disabled: true }]
    });
  }
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260603Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260603Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }
}
