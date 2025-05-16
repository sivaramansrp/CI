/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud301State,
  Tramite301Store,
} from '../../../../core/estados/tramites/tramite301.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solocitud301Service } from '../../services/service301.service';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';
import { TieneConsultaio } from '@libs/shared/data-access-user/src';

/**
 * Componente `PagoDeDerechosComponent`
 *
 * Este componente se encarga de gestionar un formulario para la solicitud de pago de derechos.
 * El formulario contiene campos como la línea y el monto del pago. Al inicializarse, se configura el formulario
 * y se establece un valor predeterminado para el campo 'monto', deshabilitándolo.
 *
 * @component
 * @example
 * <app-pago-de-derechos></app-pago-de-derechos>
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  @Input() public procedureState!: TieneConsultaio;
  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  FormSolicitud!: FormGroup;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud301State;

  /**
   * Indica si el formulario está en modo de actualización (patch).
   * Si es `true`, el formulario se utiliza para editar un registro existente.
   */
  public esFormularioActualizacion: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   *
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   *
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite301Store: Tramite301Store,
    private tramite301Query: Tramite301Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioActualizacion = [
            'FLUJO_FUNCIONARIO_ATENDER_REQUERIMIENTO',
            'FLUJO_FUNCIONARIO_AUTORIZACION',
            'FLUJO_FUNCIONARIO_EVALUAR'
          ].includes(seccionState.parameter);
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Llama a la función para inicializar el estado del formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioActualizacion) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    // Inicializa el formulario con validaciones requeridas
    this.subscription.add(
      this.tramite301Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe()
    );

    this.FormSolicitud = this.fb.group({
      pagodederechos: this.fb.group({
        linea: [this.solicitudState?.linea, Validators.required],
        monto: ['', Validators.required],
        lineaCheckbox: [this.solicitudState?.lineaCheckbox],
      }),
    });
    // Llama al método para actualizar el campo 'monto'
    this.updateformfied();
    if (this.esFormularioSoloLectura) {
      this.getProcedureDatos();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura && this.esFormularioActualizacion) {
      this.FormSolicitud.disable();
    } else if (!this.esFormularioSoloLectura && this.esFormularioActualizacion) {
      this.FormSolicitud.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}

  /**
   * Método `updateformfied()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '4845'.
   *
   * @memberof PagoDeDerechosComponent
   */
  updateformfied(): void {
    // Deshabilita el campo 'monto' y asigna el valor '4845'
    this.FormSolicitud.get('pagodederechos.monto')?.disable();
    this.FormSolicitud.get('pagodederechos.monto')?.setValue('4845');
  }

  /**
   * Método `onSubmit()`.
   * Este método se ejecuta cuando se envía el formulario y realiza las siguientes acciones:
   * - Valida si el formulario es válido.
   * - Llama al método `setValoresStore()` para guardar los valores del formulario en el estado.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene los campos de datos del importador/exportador.
   * @memberof PagoDeDerechosComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite301Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite301Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  public getProcedureDatos(): void {
    this.FormSolicitud.get('pagodederechos.linea')?.disable();
    this.FormSolicitud.get('pagodederechos.monto')?.disable();
    this.FormSolicitud.get('pagodederechos.lineaCheckbox')?.disable();
    // this.FormSolicitud.get('pagodederechos.linea')?.setValue(this.procedureDatos[0].pagoDeDerechos.linea);
    // this.FormSolicitud.get('pagodederechos.monto')?.setValue(this.procedureDatos[0].pagoDeDerechos.monto);
    // this.FormSolicitud.get('pagodederechos.lineaCheckbox')?.setValue(this.procedureDatos[0].pagoDeDerechos.lineaCheckbox);
  }

  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}