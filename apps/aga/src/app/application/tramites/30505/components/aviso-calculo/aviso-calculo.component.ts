import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud30505State, Solicitud30505Store } from '../../estados/tramites30505.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Solicitud30505Query } from '../../estados/tramites30505.query';


@Component({
  selector: 'app-aviso-calculo',
  templateUrl: './aviso-calculo.component.html',
  styleUrl: './aviso-calculo.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // providers: [AvisoCalculoService] // Service provider commented out as per instructions
})
export class AvisoCalculoComponent implements OnInit, OnDestroy {
  avisoDeCalForm!: FormGroup;
  // dvMessageVisible: boolean = false;
  montoContribuVisible: boolean = false;
  montoTotalContribucionesVisible: boolean = false;
  tblErrorCalculo: string = '';

  public solicitudState!: Solicitud30505State;
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder,
    private solicitud30505Store: Solicitud30505Store,
    private solicitud30505Query: Solicitud30505Query,
  ) { }

  ngOnInit(): void {

    this.solicitud30505Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.avisoDeCalForm = this.fb.group({
      capacidadAlmacenamiento: [this.solicitudState?.capacidadAlmacenamiento, Validators.required],
      tipoSolicitudPexim: [this.solicitudState?.tipoSolicitudPexim, Validators.required],
      actividadProductiva: [this.solicitudState?.actividadProductiva, Validators.required],
      tipoCaat: [this.solicitudState?.tipoCaat, Validators.required],
      tipoProgFomExp: [this.solicitudState?.tipoProgFomExp, Validators.required],
      tipoTransito: [this.solicitudState?.tipoTransito, Validators.required],
      numeroEstablecimiento: [this.solicitudState?.numeroEstablecimiento, Validators.required],
      medioTransporte: [this.solicitudState?.medioTransporte, Validators.required],
      nombreBanco: [this.solicitudState?.nombreBanco, Validators.required],
      nomOficialAutorizado: [this.solicitudState?.nomOficialAutorizado, Validators.required],
      observaciones: [this.solicitudState?.observaciones, Validators.required],
      empresaControladora: [this.solicitudState?.empresaControladora, Validators.required],
      descripcionLugarEmbarque: [this.solicitudState?.descripcionLugarEmbarque] // Added missing form control without validators
    });

    // Subscribe to form changes to reset messages
    this.avisoDeCalForm.valueChanges.subscribe(() => {
      //this.dvMessageVisible = false;
      this.tblErrorCalculo = '';
    });

    this.validaRadioCalculo();
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud30505Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud30505Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  validaRadioCalculo(): void {
    const CAPACIDAD = this.avisoDeCalForm.get('capacidadAlmacenamiento')?.value;
    this.montoContribuVisible = CAPACIDAD === '1';

    const EMPRESA = this.avisoDeCalForm.get('empresaControladora')?.value;
    this.montoTotalContribucionesVisible = EMPRESA === '1';
  }

  // Example method to handle form submission
  //onSubmit(): void {
    // if (this.avisoDeCalForm.invalid) {
    //   this.dvMessageVisible = true;
    //   this.tblErrorCalculo = 'Por favor, complete todos los campos requeridos.';
    //   return;
  //}

  // Commented out service call as per instructions
  // this.avisoCalculoService.submitForm(this.form.value).subscribe(
  //   response => {
  //     // Handle successful response
  //   },
  //   error => {
  //     // Handle error response
  //   }
  // );
  // }

  // Additional helper methods can be added here as needed

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}