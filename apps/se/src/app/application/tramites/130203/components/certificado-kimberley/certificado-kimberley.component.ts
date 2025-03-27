import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

import { Observable } from 'rxjs';

import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-certificado-kimberley',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './certificado-kimberley.component.html',
  styleUrl: './certificado-kimberley.component.scss',
})
export class CertificadoKimberleyComponent implements OnInit, OnDestroy {
  datosDelExportador!: FormGroup;
  datosDelImportador!: FormGroup;
  datosDeLaRemesa!: FormGroup;
  datosDeLosDiamantes!: FormGroup;
  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    // private tramite120402Store: Tramite120402Store,
    // private tramite120402Query: Tramite120402Query
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();

    // this.cantidadSolicitada$.subscribe((cantidadSolicitada) => {
    //   if (cantidadSolicitada) {
    //     this.form.get('cantidadSolicitada')?.setValue(cantidadSolicitada);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

   crearFormulario(): void {
      this.datosDelExportador = this.fb.group({
        nombreExportador: [{ value: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV', disabled: true }],
        direccionExportador: ['', [Validators.required]],
      });

      this.datosDelImportador = this.fb.group({
        nombreImportador: ['', [Validators.required]],
        direccionImportador: ['', [Validators.required]],
      });

      this.datosDeLaRemesa = this.fb.group({
        numeroEnLetraDeLosLotes: ['', [Validators.required]],
        numeroEnLetraDeLosLotesEnIngles: ['', [Validators.required]],
        numeroDeFactura: ['', [Validators.required]],
      });

      this.datosDeLosDiamantes = this.fb.group({
        cantidadEnQuilates: ['', [Validators.required]],
        valorDeLosDiamantes: ['', [Validators.required]],
      });
    }
}
