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
import { Tramite260912Query } from '../../estados/tramite-260912.query';
import { Tramite260912Store } from '../../estados/tramite-260912.store';
import { Validators } from '@angular/forms';

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 * 
 * @selector app-datos-empresa
 * @standalone true
 * @imports [
 *   CommonModule,
 *   AlertComponent,
 *   InputRadioComponent,
 *   ReactiveFormsModule,
 *   TituloComponent
 * ]
 * @templateUrl ./datos-empresa.component.html
 * @styleUrl ./datos-empresa.component.scss
 */

/**
 * Componente que representa los datos de la empresa en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-datos-empresa',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    InputRadioComponent,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.scss'],
})
export class DatosEmpresaComponent implements OnInit, OnDestroy {
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
    this.Tramite260912Query.btonDeRadio$;

  /**
   * Observable para la justificacion.
   */
  justificacion$: Observable<string | null> =
    this.Tramite260912Query.justificacion$;

  /**
   * Observable para el RFC del establecimiento.
   */
  rfcDel$: Observable<string | null> = this.Tramite260912Query.rfcDel$;

  /**
   * Observable para la denominación del establecimiento.
   */
  denominacion$: Observable<string | null> =
    this.Tramite260912Query.denominacion$;

  /**
   * Observable para el correo del establecimiento.
   */
  correo$: Observable<string | null> = this.Tramite260912Query.correo$;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param Tramite260912Query Consulta de datos del trámite.
   * @param Tramite260912Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private Tramite260912Query: Tramite260912Query,
    private Tramite260912Store: Tramite260912Store
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.Tramite260912Query.selectTramite260912$
    .pipe(takeUntil(this.destroyed$))
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
    this.Tramite260912Store.setBtonDeRadio(BTON_DE_RADIO);
  }

  /**
   * Método para obtener el valor de la justificación.
   */
  getJustificacion(): void {
    const JUSTIFICACION = this.form.get('justificacion')?.value;
    this.Tramite260912Store.setJustificacion(JUSTIFICACION);
  }

  /**
   * Método para obtener el valor del RFC del establecimiento.
   */
  getRfcDel(): void {
    const RFC_DEL = this.datosDelEstablecimiento.get('rfcDel')?.value;
    this.Tramite260912Store.setRfcDel(RFC_DEL);
  }

  /**
   * Método para obtener el valor de la denominación del establecimiento.
   */
  getDenominacion(): void {
    const DENOMINACION =
      this.datosDelEstablecimiento.get('denominacion')?.value;
    this.Tramite260912Store.setDenominacion(DENOMINACION);
  }

  /**
   * Método para obtener el valor del correo del establecimiento.
   */
  getCorreo(): void {
    const CORREO = this.datosDelEstablecimiento.get('correo')?.value;
    this.Tramite260912Store.setCorreo(CORREO);
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
