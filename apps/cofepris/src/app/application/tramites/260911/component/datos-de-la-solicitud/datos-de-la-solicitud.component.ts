import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ALERT } from '../../enums/datos-de-la-solicitud.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud.enum';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260911Query } from '../../estados/queries/tramite260911.query';
import { Tramite260911Store } from '../../estados/store/tramite260911.store';
import { Validators } from '@angular/forms';

/**
 * Componente para gestionar los datos de la solicitud.
 * 
 * @selector app-datos-de-la-solicitud
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-de-la-solicitud.component.html
 * @styleUrl ./datos-de-la-solicitud.component.scss
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
    * Indica si el formulario es colapsable.
    */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

  /**
   * Opciones de botón de radio.
   */
  btonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario principal.
   */
  form!: FormGroup;

  /**
   * Formulario de datos del establecimiento.
   */
  datosDelEstablecimiento!: FormGroup;

  /**
   * Observable para el botón de radio.
   */
  btonDeRadio$: Observable<string | null> =
    this.tramite260911Query.btonDeRadio$;

  /**
   * Observable para la justificación.
   */
  justificacion$: Observable<string | null> =
    this.tramite260911Query.justificacion$;

  /**
   * Observable para el RFC del establecimiento.
   */
  rfcDel$: Observable<string | null> = this.tramite260911Query.rfcDel$;

  /**
   * Observable para la denominación del establecimiento.
   */
  denominacion$: Observable<string | null> =
    this.tramite260911Query.denominacion$;

  /**
   * Observable para el correo del establecimiento.
   */
  correo$: Observable<string | null> = this.tramite260911Query.correo$;

  private destroy$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.tramite260911Query.selectTramite260911$
    .pipe(takeUntil(this.destroy$))
    .subscribe((formData) => {
      this.form.patchValue({
        btonDeRadio: formData.btonDeRadio,
        justificacion: formData.justificacion,
      });

      this.datosDelEstablecimiento.patchValue({
        rfcDel: formData.rfcDel,
        denominacion: formData.denominacion,
        correo: formData.correo,
      });
    });
    
      }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método para mostrar u ocultar el formulario colapsable.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método para crear el formulario.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      btonDeRadio: ['', [Validators.required]],
      justificacion: ['', [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: ['', Validators.required],
      denominacion: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }

  /**
   * Método para habilitar los controles del formulario.
   */
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

  /**
   * Método para obtener el valor del botón de radio.
   */
  getBtonDeRadio(): void {
    const BTON_DE_RADIO = this.form.get('btonDeRadio')?.value;
    this.tramite260911Store.setBtonDeRadio(BTON_DE_RADIO);
  }

  /**
   * Método para obtener el valor de la justificación.
   */
  getJustificacion(): void {
    const JUSTIFICACION = this.form.get('justificacion')?.value;
    this.tramite260911Store.setJustificacion(JUSTIFICACION);
  }

  /**
   * Método para obtener el valor del RFC del establecimiento.
   */
  getRfcDel(): void {
    const RFC_DEL = this.datosDelEstablecimiento.get('rfcDel')?.value;
    this.tramite260911Store.setRfcDel(RFC_DEL);
  }

  /**
   * Método para obtener el valor de la denominación del establecimiento.
   */
  getDenominacion(): void {
    const DENOMINACION =
      this.datosDelEstablecimiento.get('denominacion')?.value;
    this.tramite260911Store.setDenominacion(DENOMINACION);
  }

  /**
   * Método para obtener el valor del correo del establecimiento.
   */
  getCorreo(): void {
    const CORREO = this.datosDelEstablecimiento.get('correo')?.value;
    this.tramite260911Store.setCorreo(CORREO);
  }
}