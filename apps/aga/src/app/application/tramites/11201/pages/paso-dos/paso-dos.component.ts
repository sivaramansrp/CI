import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  DESPACHO_DD,
  DESPACHO_LDA,
  FECHA_FINAL,
  FECHA_INICIO,
  HORA_FINAL,
  HORA_INICIO,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TituloComponent,
} from '@ng-mf/data-access-user';

import {
  Catalogo,
  CatalogoPaises,
} from '@ng-mf/data-access-user';
import {
  InputFecha,
  InputHora,
} from '@ng-mf/data-access-user';

import { DatosComponentePedimento } from '@ng-mf/data-access-user';

import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

import {
  CATALOGOS_ID,
  TIPO_SOLICITUD,
} from '@ng-mf/data-access-user';

import {
  Solicitud5701State,
  Tramite5701Store,
} from '../../../../estados/tramites/tramite5701.store';
import { Subject, Subscription, delay, map, merge, takeUntil, tap } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';

import { FechasService } from '@ng-mf/data-access-user';
import { FormulariosService } from '@ng-mf/data-access-user';
import { datosAgregarFormulario } from '@ng-mf/data-access-user';

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Tramite5701Query } from '../../../../estados/queries/tramite5701.query';
import { CommonModule } from '@angular/common';
import { Solicitud11201State, Tramite11201Store } from '../../../../estados/tramites/tramite11201.store';
import { Tramite11201Query } from '../../../../estados/queries/tramite11201.query';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.css',
})
export class PasoDosComponent {
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
    public solicitudState!: Solicitud11201State;
  
    /**
     * Subject para notificar la destrucción del componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  
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
      private tramite301Query: Tramite11201Query
    ) {}
  
    /**
     * Método del ciclo de vida `ngOnInit()`.
     * Este método se ejecuta cuando el componente se inicializa y realiza las siguientes acciones:
     * - Inicializa el formulario reactivo `FormSolicitud` con dos campos: `linea` y `monto`.
     * - Llama al método `updateformfied()` para configurar el campo 'monto', deshabilitándolo y estableciendo un valor predeterminado.
     *
     * @memberof PagoDeDerechosComponent
     */
    ngOnInit(): void {
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
          montoPagar: [this.solicitudState?.monto],
          lineaCheckbox: [this.solicitudState?.lineaCheckbox],
        }),
      });
  
      // Llama al método para actualizar el campo 'monto'
      this.updateformfied();
    }
  
    /**
     * Método `updateformfied()`.
     * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
     * - Deshabilita el campo 'monto'.
     * - Establece el valor predeterminado de 'monto' a '352'.
     *
     * @memberof PagoDeDerechosComponent
     */
    updateformfied(): void {
      // Deshabilita el campo 'monto' y asigna el valor '352'
      this.FormSolicitud.get('pagodederechos.montoPagar')?.disable();
      this.FormSolicitud.get('pagodederechos.montoPagar')?.setValue('352');
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
      (this.tramite11201Store[metodoNombre] as (value: any) => void)(VALOR);
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
    }
}
