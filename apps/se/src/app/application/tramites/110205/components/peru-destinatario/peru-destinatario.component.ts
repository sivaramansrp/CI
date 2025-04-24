import { CatalogoSelectComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../../estados/tramite110205.store';
import { CommonModule } from '@angular/common';
import { DatosDelDestinatarioComponent } from '../../../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../../../shared/components/destinatario/destinatario.component';
import { Tramite110205Query } from '../../estados/tramite110205.query';

interface FormValues {
  [key: string]: string | number | boolean | object | undefined;
}
/**
 * @descripcion
 * El componente `PeruDestinatarioComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de destinatario en el módulo PERU.
 */
@Component({
  selector: 'app-peru-destinatario',
  templateUrl: './peru-destinatario.component.html',
  styleUrl: './peru-destinatario.component.css',
})
export class PeruDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * @descripcion
   * Formulario para capturar los datos del exportador.
   */
  exportadorForm!: FormGroup;

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
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual del formulario de exportador.
   */
  private exportadoState!: Tramite110205State;

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

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
    private store: Tramite110205Store,
    private query: Tramite110205Query,
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

    this.query.selectPeru$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.exportadoState = state as Tramite110205State;
        })
      )
      .subscribe();

    this.initActionFormBuild();
  }

  /**
   * @descripcion
   * Inicializa el formulario de exportador con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.exportadorForm = this.fb.group({
      lugar: [this.exportadoState.lugar, Validators.required],
      exportador: [this.exportadoState.exportador, Validators.required],
      empresa: [this.exportadoState.empresa, Validators.required],
      cargo: [this.exportadoState.cargo, Validators.required],
      lada: [this.exportadoState.lada],
      telfono: [this.exportadoState.telfono, Validators.required],
      fax: [this.exportadoState.fax, Validators.required],
      correo: [this.exportadoState.correo, Validators.required],
    });
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
    metodoNombre: keyof Tramite110205Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: Tramite110205Store) => void)(VALOR);
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