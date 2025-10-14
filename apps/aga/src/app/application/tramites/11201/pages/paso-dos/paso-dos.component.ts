import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { Solicitud11201State } from '../../../../core/estados/tramites/tramite11201.store';
import { Subject, } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite11201Query } from '../../../../core/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente para el paso dos del trámite de contenedores temporales.
 * 
 * Este componente maneja el formulario de pago de derechos, incluyendo
 * la captura de información de líneas de captura y montos a pagar.
 * Gestiona la interacción con el store del trámite para persistir datos.
 * 
 * @component
 */
@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  providers: [ToastrService],

})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud11201State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   *
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   *
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite11201Store: Tramite11201Store,
    private tramite301Query: Tramite11201Query,
    private datosTramiteService: DatosTramiteService,
    private toastrService: ToastrService,
    // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Método del ciclo de vida `ngOnInit()`.
   * Este método se ejecuta cuando el componente se inicializa y realiza las siguientes acciones:
   * - Inicializa el formulario reactivo `FormSolicitud` con dos campos: `linea` y `monto`.
   * - Llama al método `campoDeDormularioDeActualización()` para configurar el campo 'monto', deshabilitándolo y estableciendo un valor predeterminado.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas
    this.tramite301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe()

    this.formSolicitud = this.fb.group({
      pagoDeDerechos: this.fb.group({
        linea: [this.solicitudState?.linea, Validators.required],
        monto: ['', Validators.required],
        montoPagar: [this.solicitudState?.monto],
        lineaCheckbox: [this.solicitudState?.lineaCheckbox],
      }),
    });

    // Llama al método para actualizar el campo 'monto'
    this.campoDeDormularioDeActualizacion();
  }

  /**
   * Método `campoDeDormularioDeActualizacion()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '352'.
   *
   * @memberof PagoDeDerechosComponent
   */
  campoDeDormularioDeActualizacion(): void {
    // Deshabilita el campo 'monto' y asigna el valor '352'
    this.formSolicitud.get('pagoDeDerechos.montoPagar')?.disable();
    this.formSolicitud.get('pagoDeDerechos.montoPagar')?.setValue('352');
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
    metodoNombre: keyof Tramite11201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite11201Store[metodoNombre] as (value: Tramite11201Store) => void)(VALOR);
  }


  /**
   * Validates the payment information entered in the form.
   *
   * This method checks if the 'linea' and 'monto' fields in the form are valid.
   * If both fields are valid, it calls the `validarPago` method of `datosTramiteService`
   * with the provided values. The response is observed until the component is destroyed.
   * If the response code is '00', a success alert is shown to the user.
   */
  validarPago(): void {
    if (
      this.formSolicitud.get('pagoDeDerechos.linea')?.valid &&
      this.formSolicitud.get('pagoDeDerechos.monto')?.valid
    ) {
      const linea_captura = this.formSolicitud.get('pagoDeDerechos.linea')?.value;
      const monto = this.formSolicitud.get('pagoDeDerechos.monto')?.value;
      const idSolicitud = '202739040'
      const PAYLOAD = { linea_captura, monto };
      console.log(PAYLOAD);
      console.log(idSolicitud);
      this.datosTramiteService
        .validarPago(PAYLOAD, idSolicitud)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((respuesta: any) => {
          if (respuesta?.codigo !== '00') {
            this.toastrService.error(respuesta.error);

          }
        });
    }
  }

  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete()
  }
}
