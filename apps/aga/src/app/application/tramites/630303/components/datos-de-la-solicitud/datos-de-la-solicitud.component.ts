import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Catalogo, InputFecha, TituloComponent } from "@ng-mf/data-access-user";

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { InputFechaComponent } from "@ng-mf/data-access-user";

import { ESTIMADA_RETORNO } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {




  datosImportacionTemporalFormulario:FormGroup;
  datosfecha: InputFecha = ESTIMADA_RETORNO;
  aduanaDeingresOpciones: Catalogo[] = [];
  seccionAduaneraOpciones: Catalogo[] = [];
  prorrogaOpciones: Catalogo[] = [];
  private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder,private retornoImportacionTemporalService: RetornoImportacionTemporalService) {
     this.datosImportacionTemporalFormulario = this.fb.group({
        cveAduana: ['', Validators.required],
        cveSeccionAduanal: [''],
        fechaLimiteRetorno: ['' , Validators.required],
        cuentaProrroga: ['', Validators.required]
      });
  }

ngOnInit(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso().subscribe((data) => {
      this.aduanaDeingresOpciones = data;
    });
    this.retornoImportacionTemporalService.getSeccionAduanera().subscribe((data) => {
      this.seccionAduaneraOpciones = data;
    });
    this.retornoImportacionTemporalService.getProrroga().subscribe((data) => {
      this.prorrogaOpciones = data;
    });
  }

  cambioFechaFinal(nuevo_valor: string): void {
    this.datosImportacionTemporalFormulario.patchValue({
      fechaLimiteRetorno: nuevo_valor,
    });
  }

  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.aduanaDeingresOpciones = data;
    }
    );
}
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.seccionAduaneraOpciones = data;
    });
  }
  getProrroga(): void {
    this.retornoImportacionTemporalService.getProrroga()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((data) => {
      this.prorrogaOpciones = data;
    });
  }

  onChangeTipoImportacionRetorno(): void {
    const CUENTA_PRORROGA = this.datosImportacionTemporalFormulario.get('cuentaProrroga')?.value;

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
