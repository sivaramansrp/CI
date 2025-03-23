import { ALERT } from '../../enums/datos-de-la-solicitud-260904.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud-260904.enum';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/queries/tramite260904.query';
import { Tramite260904Store } from '../../estados/tramites/tramite260904.store';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-de-la-solicitud-260904',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud-260904.component.html',
  styleUrl: './datos-de-la-solicitud-260904.component.scss',
})
export class DatosDeLaSolicitud260904Component implements OnInit {
  colapsable: boolean = true;
  TEXTOS = ALERT;
  btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  form!: FormGroup;
  datosDelEstablecimiento!: FormGroup;

  btonDeRadio$: Observable<string | null> =
    this.tramite260904Query.btonDeRadio$;

  justificación$: Observable<string | null> =
    this.tramite260904Query.justificación$;

  rfcDel$: Observable<string | null> = this.tramite260904Query.rfcDel$;

  denominacion$: Observable<string | null> =
    this.tramite260904Query.denominacion$;

  correo$: Observable<string | null> = this.tramite260904Query.correo$;

  constructor(
    private fb: FormBuilder,
    private tramite260904Query: Tramite260904Query,
    private tramite260904Store: Tramite260904Store
  ) {
    // Constructor
  }

  ngOnInit(): void {
    this.crearFormulario();

    this.btonDeRadio$.subscribe((btonDeRadio) => {
      if (btonDeRadio) {
        this.form.get('btonDeRadio')?.setValue(btonDeRadio);
      }
    });

    this.justificación$.subscribe((justificación) => {
      if (justificación) {
        this.form.get('justificación')?.setValue(justificación);
      }
    });

    this.rfcDel$.subscribe((rfcDel) => {
      if (rfcDel) {
        this.datosDelEstablecimiento.get('rfcDel')?.setValue(rfcDel);
      }
    });

    this.denominacion$.subscribe((denominacion) => {
      if (denominacion) {
        this.datosDelEstablecimiento
          .get('denominacion')
          ?.setValue(denominacion);
      }
    });

    this.correo$.subscribe((correo) => {
      if (correo) {
        this.datosDelEstablecimiento.get('correo')?.setValue(correo);
      }
    });
  }

  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      btonDeRadio: ['', [Validators.required]],
      justificación: ['', [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: ['', Validators.required],
      denominacion: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }

  toggleFormControls(): void {
    Object.keys(this.datosDelEstablecimiento.controls).forEach(
      (controlName) => {
        const CONTROL = this.datosDelEstablecimiento.get(controlName);
        if (CONTROL?.disabled) {
          CONTROL.enable();
        }
      }
    );
  }

  getBtonDeRadio(): void {
    const BTON_DE_RADIO = this.form.get('btonDeRadio')?.value;
    this.tramite260904Store.setBtonDeRadio(BTON_DE_RADIO);
  }

  getJustificacion(): void {
    const JUSTIFICACION = this.form.get('justificación')?.value;
    this.tramite260904Store.setJustificación(JUSTIFICACION);
  }

  getRfcDel(): void {
    const RFC_DEL = this.datosDelEstablecimiento.get('rfcDel')?.value;
    this.tramite260904Store.setRfcDel(RFC_DEL);
  }

  getDenominacion(): void {
    const DENOMINACION =
      this.datosDelEstablecimiento.get('denominacion')?.value;
    this.tramite260904Store.setDenominacion(DENOMINACION);
  }

  getCorreo(): void {
    const CORREO = this.datosDelEstablecimiento.get('correo')?.value;
    this.tramite260904Store.setCorreo(CORREO);
  }
}
