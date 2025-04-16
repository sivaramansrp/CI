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
    // Inicializa el formulario reactivo con validaciones para los campos requeridos.
    this.datosImportacionRetornoAutorizacionGeneralFormulario = this.fb.group({
      folioInformacionGeneralAutorizacion: ['', [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO)]],
      aduanaIngreso: ['', Validators.required],
      seccionAduanera: [''],
      fechaIngreso: [ '' , Validators.required],
      fechaVencimiento: ['', Validators.required]
    })
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene las opciones de aduana de ingreso y sección aduanera desde el servicio.
   */
  ngOnInit(): void {
    this.getAduanaDeIngreso();
    this.getSeccionAduanera();
  }

  /**
   * Obtiene las opciones de aduana de ingreso desde el servicio.
   * Actualiza el catálogo de opciones de aduana en el componente.
   */
  getAduanaDeIngreso(): void {
    this.retornoImportacionTemporalService.getAduanaDeIngreso()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.aduanaDeingresOpciones = data;
      }
      );
  }

  /**
   * Obtiene las opciones de sección aduanera desde el servicio.
   * Actualiza el catálogo de opciones de sección aduanera en el componente.
   */
  getSeccionAduanera(): void {
    this.retornoImportacionTemporalService.getSeccionAduanera()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.seccionAduaneraOpciones = data;
      });
  }

  /**
   * Maneja el cambio en la fecha de ingreso.
   * Actualiza el valor de la fecha de vencimiento en el formulario.
   */
  cambioFechaIngreso(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaVencimientoProrroga: nuevo_valor,
    });
  }

  /**
   * Maneja el cambio en la fecha de vencimiento.
   * Actualiza el valor de la fecha de vencimiento en el formulario.
   */
  cambioFechaVencimiento(nuevo_valor: string): void {
    this.datosImportacionRetornoAutorizacionGeneralFormulario.patchValue({
      fechaVencimiento: nuevo_valor,
    });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el observable `destroyed$` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
