import { Component, OnDestroy } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260912Store, Tramites260912State } from '../../estados/tramite-260912.store';
import { ALERT } from '../../enums/datos-de-la-solicitud.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/datos-de-la-solicitud.enum';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260912Query } from '../../estados/tramite-260912.query';
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

  
  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramites260912State;

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Textos de alerta.
   */
  TEXTOS = ALERT;

    /**
     * Estado seleccionado del trámite 260911.
     */
    estadoSeleccionado!: Tramites260912State;

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
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para crear formularios.
   * @param Tramite260912Query Consulta de datos del trámite.
   * @param Tramite260912Store Almacenamiento de datos del trámite.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private tramite260912Query: Tramite260912Query,
    private tramite260912Store: Tramite260912Store,
    public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }
  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
      this.datosDelEstablecimiento.disable();
    } else {
      this.form.enable();
      this.datosDelEstablecimiento.enable();
    }
  }


  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
     this.inicializarEstadoFormulario();
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
     this.tramite260912Query.selectTramite260912$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.form = this.fb.group({
      btonDeRadio: [this.solicitudState?.btonDeRadio, [Validators.required]],
      justificacion: [this.solicitudState?.justificacion, [Validators.required]],
    });

    this.datosDelEstablecimiento = this.fb.group({
      rfcDel: [this.solicitudState?.rfcDel, Validators.required],
      denominacion: [this.solicitudState?.denominacion, Validators.required],
      correo: [this.solicitudState?.correo, Validators.required],
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
   * Actualiza un valor específico en el store del trámite.
   * 
   * @param FormGroup - Formulario reactivo.
   * @param control - Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260912Store.setTramite260912State({
      [control]: VALOR
    });
  }
  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
