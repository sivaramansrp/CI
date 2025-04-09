import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent, InputFecha, InputFechaComponent, TituloComponent,Catalogo } from '@libs/shared/data-access-user/src';
import { FECHA_DE_PAGO } from '../../models/aviso.model';

import { AvisoUnicoService } from '../../services/aviso-unico.service';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-aviso-de-renovacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent,InputFechaComponent,CatalogoSelectComponent],
  templateUrl: './aviso-de-renovacion.component.html',
  styleUrls: ['./aviso-de-renovacion.component.scss'],
})
export class AvisoDeRenovacionComponent implements OnInit, OnDestroy {
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  public localidadList!: Catalogo[];
  private destroyed$ = new Subject<void>();
  avisoForm!: FormGroup;

constructor(private fb: FormBuilder,private service:AvisoUnicoService ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadLocalidad();
  }

  private initializeForm(): void {
    this.avisoForm = this.fb.group({
      modalidad: ['', Validators.required],
      protestaVerdad: [false, Validators.requiredTrue],
      envioAviso: [false, Validators.requiredTrue],
      claveReferencia: ['', Validators.required],
      numeroOperacion: ['', Validators.required],
      cadenaDependencia: ['', Validators.required],
      banco: ['', Validators.required],
      llavePago: ['', Validators.required],
      fechaPago: ['', Validators.required],
      importePago: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  /**
   * method loadLocalidad
   * description Carga los datos de localidades desde el servicio.
   */
  loadLocalidad(): void {
    this.service.obtenerDatosLocalidad()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data): void => {
        this.localidadList = data as Catalogo[];
      });
  }
  submitForm(): void {
    if (this.avisoForm.valid) {
      console.log('Formulario enviado con éxito:', this.avisoForm.value);
    } else {
      console.error('El formulario contiene errores.');
    }
  }

  public onFechaCambiada(nuevo_valor: string): void {
    this.avisoForm.get('fechaPago')?.setValue(nuevo_valor);
    this.avisoForm.get('fechaPago')?.markAsUntouched();
    // this.avisocalidad260514Store.setfechaPago(nuevo_valor);
  }

  /**
   * Resets the payment data in the form.
   */
  resetPagoDatos(): void {
    this.avisoForm.patchValue({
      claveReferencia: '',
      numeroOperacion: '',
      cadenaDependencia: '',
      banco: '',
      llavePago: '',
      fechaPago: '',
      importePago: '',
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
