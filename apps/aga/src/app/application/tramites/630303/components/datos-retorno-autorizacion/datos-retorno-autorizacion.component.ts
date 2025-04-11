import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Catalogo, CatalogoSelectComponent, InputFecha, REGEX_PATRON_ALFANUMERICO } from '@libs/shared/data-access-user/src';
import { InputFechaComponent, TituloComponent } from '@ng-mf/data-access-user';

import { FECHA_INGRESO, FECHA_VENCIMIENTO } from '../../enum/retorno-importacion-temporal.enum';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';

@Component({
  selector: 'app-datos-retorno-autorizacion',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputFechaComponent],
  templateUrl: './datos-retorno-autorizacion.component.html',
  styleUrl: './datos-retorno-autorizacion.component.scss',
})
export class DatosRetornoAutorizacionComponent implements OnInit, OnDestroy {


  datosImportacionRetornoAutorizacionGeneralFormulario!: FormGroup;
  aduanaDeingresOpciones: Catalogo[] = [];
  seccionAduaneraOpciones: Catalogo[] = [];
  private destroyed$ = new Subject<void>();
  inputFechaIngreso: InputFecha = FECHA_INGRESO;
  inputFechaVencimiento: InputFecha = FECHA_VENCIMIENTO;

  constructor(
    private fb: FormBuilder, private retornoImportacionTemporalService: RetornoImportacionTemporalService
  ) {
    this.datosImportacionRetornoAutorizacionGeneralFormulario = this.fb.group({
      folioInformacionGeneralAutorizacion: ['', [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      aduanaIngreso: ['', Validators.required],
      seccionAduanera: [''],
      fechaIngreso: [ '' , Validators.required],
      fechaVencimiento: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
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
  cambioFechaIngreso(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaVencimientoProrroga: nuevo_valor,
    });
  }

  cambioFechaVencimiento(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaVencimiento: nuevo_valor,
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
