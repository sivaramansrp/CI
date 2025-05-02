import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadio } from '../../../31301/models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-c-tpat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  providers: [SolicitudService],
  templateUrl: './c-tpat.component.html',
  styleUrl: './c-tpat.component.scss',
})
export class CTPATComponent implements OnInit, OnDestroy {
  ctpatForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  sinoOpcion: InputRadio = {} as InputRadio;
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
  }

  ngOnInit(): void {
    this.ctpatForm = this.fb.group({
      '2089': [this.solicitud32605State[2089]],
      '2090': [this.solicitud32605State[2090]],
      '2091': [this.solicitud32605State[2091]],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.ctpatForm.patchValue({
            '2089': this.solicitud32605State[2089],
            '2090': this.solicitud32605State[2090],
            '2091': this.solicitud32605State[2091],
          });
        })
      )
      .subscribe();
  }

  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  actualizar2089(evento: number | string): void {
    this.solicitud32605Store.actualizar2089(evento);
  }

  actualizar2090(evento: number | string): void {
    this.solicitud32605Store.actualizar2090(evento);
  }

  actualizar2091(evento: number | string): void {
    this.solicitud32605Store.actualizar2091(evento);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
