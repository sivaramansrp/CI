import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AcuicolaService } from '../../service/acuicola.service';
import { PagoDeDerechos } from '../../modelos/acuicola.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss'
})
export class PagoDerechosComponent implements OnInit, OnDestroy {

  pagosDerechosForm!: FormGroup;

  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    // eslint-disable-next-line no-empty-function
  ) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.pagoDeCargarDatos();
  }

  iniciarFormulario(): void {
    this.pagosDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: [{ value: '', disabled: true }, Validators.required],
      llaveDePago: [{ value: '', disabled: true }, Validators.required],
      fechaInicio: [{ value: '', disabled: true }, Validators.required],
      importeDePago: [{ value: '', disabled: true }, Validators.required],
    });
  }

  pagoDeCargarDatos(): void {
    this.acuicolaService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechos) => {
        this.pagosDerechosForm.patchValue(data);
      })
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }



}
