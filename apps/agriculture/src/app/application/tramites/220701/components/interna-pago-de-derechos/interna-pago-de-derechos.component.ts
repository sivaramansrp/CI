/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { EXPEDICION_FACTURA_FECHA } from '../../constantes/inspeccion-fisica-zoosanitario.enums';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormularioPago } from '../../modelos/importacion-de-acuicultura.module';
import { FormularioPagoInt } from '../../modelos/datos-de-interfaz.model'; 
import { ImportacionDeAcuiculturaService } from '../../servicios/importacion-de-agricultura.service';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core'; 
import { OnInit } from '@angular/core';
import { OpcionDeRadio } from '../../modelos/importacion-de-acuicultura.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src'; 
import { SeccionLibState} from '@libs/shared/data-access-user/src'; 
import { SeccionLibStore } from '@libs/shared/data-access-user/src'; 
import { Subject } from 'rxjs'; 

import { TIPO_RADIO } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '../../estados/tramite220701.store'; 
import { TramiteStoreQuery } from '../../estados/tramite220701.query'; 
import { Validators } from '@angular/forms';
import { delay } from 'rxjs/operators'; 
import { map } from 'rxjs/operators'; 
import { pipe } from 'rxjs'; 
import { takeUntil } from 'rxjs/operators'; 
import { tap } from 'rxjs/operators'; 

@Component({
  selector: 'interna-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent, InputFechaComponent, ReactiveFormsModule],

  templateUrl: './interna-pago-de-derechos.component.html',
  styleUrl: './interna-pago-de-derechos.component.scss'
})
export class InternaPagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} formularioPago
   * @description Formulario para gestionar el pago de derechos.
   */
  formularioPago!: FormGroup;
   
  /**
   * @property {FormularioPagoInt} FormularioPagoState
   * @description Estado del formulario de pago.
   */
   FormularioPagoState!: FormularioPagoInt;

  /**
   * @property {OpcionDeRadio[]} exentoPagoRadio
   * @description Opciones de radio para la exención de pago.
   */
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;

  /**
   * @property {string} exentoPagoValor
   * @description Valor seleccionado para la exención de pago.
   * @default 'Si'
   */
  exentoPagoValor: string = 'Si';

  /**
   * @property {Catalogo[]} justificacionCatalogo
   * @description Catálogo de justificaciones para la exención de pago.
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * @property {Catalogo[]} bancoCatalogo
   * @description Catálogo de bancos disponibles para el pago.
   */
  bancoCatalogo: Catalogo[] = [];

  /**
   * @property {InputFecha} fechaFinalInput
   * @description Configuración para el input de fecha de salida.
   */
  fechaFinalInput: InputFecha = EXPEDICION_FACTURA_FECHA;

    /**
   * @property {string} fechaPagoDate
   * @description Fecha seleccionada para el pago.
   * @default ''
   */
  fechaPagoDate: string = '';

   
  /**
   * @property {Subject<void>} unsubscribe$
   * @description Subject para manejar la desuscripción de observables y evitar memory leaks.
   */

  private unsubscribe$ = new Subject<void>();
    /**
   * @property {SeccionLibState} seccion
   * @description Estado de la sección actual en la tienda.
   */
  private seccion!: SeccionLibState;

    /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para desuscribirse de observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

    /**
   * @property {FormularioPago} formularioPagoStore
   * @description Estado del formulario de pago almacenado en el store.
   */
  formularioPagoStore: FormularioPago = {} as FormularioPago;
  /**
   * @constructor
   * @description Inicializa el servicio de formularios y los servicios relacionados con la importación de acuicultura y el estado del trámite.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ImportacionDeAcuiculturaService} importacionAcuiculturaServicio - Servicio para obtener datos de importación de acuicultura.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Consulta del estado de la tienda Akita para trámites.
   * @param {TramiteStore} tramiteStore - Tienda Akita para manejar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Consulta del estado de la tienda Akita para secciones.
   * @param {SeccionLibStore} seccionStore - Tienda Akita para manejar el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService,
    private tramiteStoreQuery: TramiteStoreQuery, 
    private tramiteStore: TramiteStore, 
    private seccionQuery: SeccionLibQuery, 
    private seccionStore: SeccionLibStore, 
  ) {
    this.importacionAcuiculturaServicio.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioPagoStore = datos.formularioPago
    })

  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos necesarios para el formulario de pago.
   */
  ngOnInit(): void {
         
         this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.FormularioPagoState = seccionState.FormularioPagoState;
          })
        ).subscribe();

    this.crearFormularioPago();
    this.formularioPago.statusChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        () => {
          this.verificarEstadoDelBoton(); 
        },
        (error) => {
          console.error('Error durante los cambios de estado del formulario:', error);
        }
      );

    this.obtenerListaJustificacion();
    this.obtenerListaBanco();

        this.tramiteStoreQuery.selectSolicitudTramite$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState: any) => {
            if (seccionState) {
              this.FormularioPagoState = seccionState.FormularioPagoState;
              this.formularioPago.patchValue(this.FormularioPagoState);
            }
          })
        ).subscribe();

        this.formularioPago.statusChanges
        .pipe(
          takeUntil(this.destroyNotifier$),
          delay(10),
          tap(() => {
            const ACTIVE_STATE = { ...this.formularioPago.value };
            this.tramiteStore.setInternaPagoDeDerechosTramite(ACTIVE_STATE); 
          })
        )
        .subscribe();
  
      // Para el botón de validación Continuar
      this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.seccion = seccionState;
          })
        )
        .subscribe();
  
    /**
     * Observa los cambios en el estado del formulario y actualiza la validación de la sección correspondiente.
     *
     * @description
     * - Se suscribe a los cambios en el estado del formulario.
     * - Cancela la suscripción cuando `destroyNotifier$` emite un valor.
     * - Aplica un retraso de 10ms antes de ejecutar la lógica.
     * - Obtiene el estado actual de la sección desde `seccionQuery`.
     * - Actualiza la validación en `seccionStore` basándose en el estado del formulario.
     *
     * @see {@link seccionQuery} para obtener el estado de la sección.
     * @see {@link seccionStore} para actualizar la validación de la sección.
     */
      this.formularioPago.statusChanges
        .pipe(
          takeUntil(this.destroyNotifier$),
          delay(10),
          tap(() => {
            const SECCION: number = 1;
            const seccionState = this.seccionQuery.getValue();
            const FORMAS_VALIDADAS = [...seccionState.formaValida];
            const controlPath = 'formularioPago';
            const CONTROL = this.formularioPago.get(controlPath)?.status;
  
            FORMAS_VALIDADAS[SECCION] = this.formularioPago.valid || CONTROL === 'VALID';
  
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          })
        )
        .subscribe();
  }

  /**
   * @description Crea el formulario de pago según el valor de `exentoPagoValor`.
   */
  private crearFormularioPago(): void {
    const ESEXENTO = this.formularioPagoStore.exentoPago === 'Si';
    this.formularioPago = this.fb.group({
      exentoPago: [this.formularioPagoStore.exentoPago || 'Si', Validators.required],
      justificacion: [this.formularioPagoStore.justificacion, Validators.required],
      claveReferencia: [{ value: this.formularioPagoStore.claveReferencia, disabled: true }, Validators.required],
      cadenaDependencia: [{ value: this.formularioPagoStore.cadenaDependencia, disabled: true }, Validators.required],
      banco: [this.formularioPagoStore.banco, Validators.required],
      llavePago: [{ value: this.formularioPagoStore.llavePago, disabled: ESEXENTO }, Validators.required],
      fechaPago: [{ value: this.formularioPagoStore.fechaPago, disabled: true }, Validators.required],
      importePago: [{ value: this.formularioPagoStore.importePago, disabled: true }, Validators.required],
    });
  }

  /**
   * @description Cambia el valor de un campo del formulario.
   * @param {string} nombreControl Nombre del campo del formulario.
   * @param {string} valor Nuevo valor a asignar.
   */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.formularioPago.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoValor = valor;
    this.crearFormularioPago();
  }

  /**
   * @description Actualiza la fecha de pago en el formulario.
   * @param {string} nuevoValor - Nueva fecha de pago.
   */
  cambioFechaFinal(nuevoValor: string): void {
    this.formularioPago.patchValue({
      fechaPago: nuevoValor,
    });
    this.fechaPagoDate = nuevoValor;
  }

  /**
   * @description Obtiene la lista de bancos desde el servicio.
   */
  private obtenerListaBanco(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('banco.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.justificacionCatalogo = data.data as Catalogo[];
        this.bancoCatalogo = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Verifica si el formulario es válido y actualiza el estado del botón.
   */
  verificarEstadoDelBoton() {
    const DATOS = {
      pagoDeformaValida: false,
    }
    if (this.formularioPago.valid) {
      DATOS.pagoDeformaValida = true
    }
    this.importacionAcuiculturaServicio.actualizarFormaValida(DATOS);
  }

  /**
   * @description Obtiene la lista de justificaciones desde el servicio.
   */
  private obtenerListaJustificacion(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        // this.justificacionCatalogo = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Actualiza el valor de un campo en el formulario y lo guarda en el servicio de importación de acuicultura.
   * @param {FormGroup} form El formulario con el campo que se está actualizando.
   * @param {string} campo El nombre del campo que se actualizará.
   */
  /**
 * @description Actualiza el valor de un campo en el formulario y lo guarda en el servicio de importación de acuicultura.
 * @param {FormGroup} formulario El formulario con el campo que se está actualizando.
 * @param {string} campo El nombre del campo que se actualizará.
 */
  setValoresStore(
    formulario: FormGroup,
    campo: string,
  ): void {
    this.actualizarValorAleatorio();
    const VALOR = this.formularioPago.value;
    (this.importacionAcuiculturaServicio.actualizarFormularioPago as (value: FormularioPago) => void)(VALOR);
  }

  /**
   * @description Actualiza ciertos valores en el formulario basados en condiciones.
   * @remarks Si se cumple una condición, se actualizan los valores del formulario.
   */
  actualizarValorAleatorio(): void {
    const HOY = InternaPagoDeDerechosComponent.formatearFecha(new Date());

    // Si la justificación no está vacía y el campo exentoPago es 'Si'
    if (this.formularioPago.value.justificacion !== '' && this.formularioPagoStore.exentoPago === 'Si') {
      this.formularioPago.patchValue({
        claveReferencia: 'valor',
        cadenaDependencia: 'valor',
        banco: '170',
        fechaPago: HOY,
        importePago: 'valor',
      });
      this.fechaPagoDate = HOY;
    }

    // Si el banco no está vacío y el campo exentoPago es 'No'
    else if (this.formularioPago.value.banco !== '' && this.formularioPagoStore.exentoPago === 'No') {
      this.formularioPago.patchValue({
        justificacion: '170',
        claveReferencia: 'valor',
        cadenaDependencia: 'valor',
        fechaPago: HOY,
        llavePago: 'valor',
        importePago: 'valor',
      });

    }
    this.fechaPagoDate = HOY;
  }

  /**
   * @description Formatea la fecha en el formato 'dd/mm/yyyy'.
   * @param {Date} fecha La fecha a formatear.
   * @returns {string} La fecha formateada como un string.
   */
  static formatearFecha(fecha: Date): string {
    const DIA = fecha.getDate().toString().padStart(2, '0');
    const MES = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const ANO = fecha.getFullYear();

    return `${DIA}/${MES}/${ANO}`;
  }
 
  /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
