import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PropietarioComponent } from '../../../../shared/components/propietario/propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    PropietarioComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private destroy$ = new Subject<void>();


  constructor(
    private fb: FormBuilder,
    // private tramite260904Query: Tramite260904Query,
    // private tramite260904Store: Tramite260904Store
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      justificación: ['', [Validators.required]],
    });

  }
}
