import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110222State, Tramite110222Store } from '../../estados/tramite110222.store';
import { ID_PROCEDIMIENTO } from '../../constantes/peru-certificado.module';
import { Tramite110222Query } from '../../estados/tramite110222.query';

interface FormValues {
  [key: string]: unknown;
}
/**
 * @descripcion
 * El componente `PeruDestinatarioComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de destinatario en el módulo PERU.
 */
@Component({
  selector: 'app-destinatario-de-certificado',
  templateUrl: './destinatario-de-certificado.component.html',
  styleUrl: './destinatario-de-certificado.component.scss',
})
export class DestinatarioDeCertificadoComponent implements OnInit, OnDestroy {

  /**
   * @descripcion
   * Valores actuales del formulario de destinatario.
   */
  formDestinatarioValues!: FormValues;

  /**
   * @descripcion
   * Valores actuales del formulario de datos del destinatario.
   */
  formDatosDelDestinatarioValues!: FormValues;

  /**
   * @property {FormValues} formExportadorValues
   * @description Almacena los valores del formulario relacionados con el exportador.
   * @memberof PeruDestinatarioComponent
   * @see FormValues
   */
  formExportadorValues!: FormValues;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual del formulario de exportador.
   */
  private exportadoState!: Tramite110222State;

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @ignore
   * @description Indica si se debe ocultar el campo de LADA en el formulario.
   * @type {boolean}
   * @default true
   */
  ocultarLada: boolean = true;

  /**
   * @property {boolean} ocultarFax
   * @description Indica si el campo de fax debe estar oculto en la interfaz de usuario.
   * @default true
   * @memberof PeruDestinatarioComponent
   */
  ocultarFax: boolean = true;

  /**
   * @descripcion
   * Identificador único del procedimiento asociado al formulario.
   * @type {string}
   * @readonly
   */
  public readonly idProcedimiento:number = ID_PROCEDIMIENTO;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param store - Almacén para gestionar el estado del formulario de certificado.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private store: Tramite110222Store,
    private query: Tramite110222Query,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    this.query.selectFormDatosDelDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDatosDelDestinatarioValues = estado;
      });

    this.query.selectFormDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formDestinatarioValues = estado;
      });
    this.query.selectFormExportador$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formExportadorValues = estado;
    });
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.query.selectTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.exportadoState = state as Tramite110222State;
        })
      )
      .subscribe();
  }

  /**
   * @descripcion
   * Actualiza el almacén con los datos del destinatario.
   * @param e - Los datos del destinatario a almacenar.
   */
  datosDelDestinatarioFunc(e: unknown): void {
    this.store.setFormDatosDelDestinatario(e as FormValues);
  }

  /**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de datos del destinatario.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStoreDatos(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormDatosDelDestinatario({ [CAMPO]: VALOR });
}

  /**
   * @descripcion
   * Actualiza el almacén con los datos del formulario de exportador.
   * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
   */
  setValoresStoreExportador(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormExportador({ [CAMPO]: VALOR });
  }

/**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de destinatario.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStoreDe(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormDestinatario({ [CAMPO]: VALOR });
}
  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación del formulario de destinatario.
   * @param valida - El estado de validación del formulario.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación del formulario de exportador.
   * @param valida - El estado de validación del formulario.
   */
  setFormValidaExportador(valida: boolean): void {
    this.store.setFormValida({ exportador: valida });
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación de los datos del destinatario.
   * @param valida - El estado de validación de los datos del destinatario.
   */
  setFormValidaDestinatario(valida: boolean): void {
    this.store.setFormValida({ datosDestinatario: valida });
  }

  /**
   * @descripcion
   * Actualiza el almacén con un valor específico del formulario.
   * @param form - El formulario que contiene el valor.
   * @param campo - El campo del formulario cuyo valor se actualizará.
   * @param metodoNombre - El método del almacén que se llamará para actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110222Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: Tramite110222Store) => void)(VALOR);
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}