import {
  Catalogo,
  SeccionLibQuery,
  SeccionLibState,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import {
  Solicitud110207State,
  Tramite110207Store,
} from '../../state/Tramite110207.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelDestinatarioComponent } from '../../../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../../../shared/components/destinatario/destinatario.component';
import { DetallesDelTransporteComponent } from '../../../../shared/components/detalles-del-transporte/DetallesDelTransporte.component';
import { RepresentanteLegalExportadorComponent } from '../../../../shared/components/representante-legal-exportador/representante-legal-exportador.component';
import { Tramite110207Query } from '../../state/Tramite110207.query';

/**
 * @interface FormValues
 * @description
 * Interfaz que representa los valores del formulario de forma dinámica.
 */
interface FormValues {
  [key: string]: unknown;
}

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatosDelDestinatarioComponent,
    DetallesDelTransporteComponent,
    DestinatarioComponent,
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.css',
})
export class DestinatarioReportComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para gestionar los datos del destinatario. */
  destinatarioForm!: FormGroup;
   /**
    * @property formDestinatarioValues
    * @description Almacena los valores actuales del formulario de destinatario.
    */
   formDestinatarioValues!: FormValues;

  /**
   * @property formDatosDelDestinatarioValues
   * @description Almacena los valores del subformulario de datos del destinatario.
   */
  formDatosDelDestinatarioValues!: FormValues;

  /**
   * @property formExportadorValues
   * @description Almacena los valores del formulario de exportador.
   */
  formExportadorValues!: FormValues;

  /** Indica si el país de destino está habilitado. */
  paisDestino = true;

  //  /**
  //   * @property ocultarLada
  //   * @description Determina si el campo LADA debe ser visible.
  //   * @default true
  //   */
  //  ocultarLada: boolean = true;

  //  /**
  //   * @property ocultarFax
  //   * @description Determina si el campo Fax debe ser visible.
  //   * @default true
  //   */
  //  ocultarFax: boolean = true;

  /** Observable que contiene los países de destino disponibles. */
  paisDestin$!: Observable<Catalogo[]>;

  /**
   * @property esFormularioSoloLectura
   * @description Indica si el formulario está en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property destroyNotifier$
   * @description Notificador utilizado para limpiar suscripciones al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property exportadoState
   * @description Estado actual del formulario exportador.
   * @private
   */
  public exportadoState!: Solicitud110207State;

  /**
   * @property seccionState
   * @description Estado actual de la sección visual.
   * @private
   */
  private seccionState!: SeccionLibState;

  /**
   * @property {string} idProcedimiento
   * @description Identificador del procedimiento, utilizado para la gestión del trámite.
   */
  public idProcedimiento = 110207;

  /** Observable que contiene los medios de transporte disponibles. */
  medioDeTransporte$!: Observable<Catalogo[]>;

  /** Referencia al componente datos-del-destinatario para marcar campos como tocados */
  @ViewChild(DatosDelDestinatarioComponent)
  datosDelDestinatarioComponent?: DatosDelDestinatarioComponent;
  /** Referencia al componente destinatario para marcar campos como tocados */
  @ViewChild(DestinatarioComponent)
  destinatarioComponent?: DestinatarioComponent;
  /** Referencia al componente datos-del-destinatario para marcar campos como tocados */
  @ViewChild(RepresentanteLegalExportadorComponent)
  representanteLegalExportadorComponent?: RepresentanteLegalExportadorComponent;

  /**
   * @constructor
   * @description
   * Constructor que inicializa servicios y suscripciones necesarias para sincronizar el estado del formulario.
   *
   * @param fb FormBuilder para creación de formularios reactivos.
   * @param store Store de la sección de trámite 110205.
   * @param query Query de la sección de trámite 110205.
   * @param seccionQuery Consulta del estado de la sección visual.
   * @param consultaQuery Consulta del estado de solo lectura general.
   */
  constructor(
    private readonly fb: FormBuilder,
    private store: Tramite110207Store,
    private query: Tramite110207Query,
    private seccionQuery: SeccionLibQuery,
    private consultaQuery: ConsultaioQuery
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
   * @method ngOnInit
   * @description
   * Hook de inicialización del componente. Establece suscripciones al estado del formulario y sección.
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

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();

    this.query.selectPeru$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.exportadoState = state as Solicitud110207State;
        })
      )
      .subscribe();
    this.paisDestin$ = this.query.selectPaisDestino$;
    this.medioDeTransporte$ = this.query.selectMedioDeTransporte$;
  }
  /** Inicializa el formulario reactivo del destinatario */
  iniciarFormulario(): void {
    this.destinatarioForm = this.fb.group({
      medioDeTransporte: [''],
      // Agrega otros controles aquí si es necesario
    });
  }

  public validateAllForms(): boolean {
    let valid = true;
    this.destinatarioComponent?.markAllFieldsTouched();
    this.datosDelDestinatarioComponent?.markAllFieldsTouched();
    this.representanteLegalExportadorComponent?.markAllFieldsTouched();
    if (
      this.destinatarioComponent &&
      this.destinatarioComponent.formDestinatario &&
      !this.destinatarioComponent.formDestinatario.valid
    ) {
      valid = false;
    }
    if (
      this.datosDelDestinatarioComponent &&
      this.datosDelDestinatarioComponent.formDatosDelDestinatario &&
      !this.datosDelDestinatarioComponent.formDatosDelDestinatario.valid
    ) {
      valid = false;
    }
    if (
      this.representanteLegalExportadorComponent &&
      this.representanteLegalExportadorComponent.form &&
      !this.representanteLegalExportadorComponent.form.valid
    ) {
      valid = false;
    }
    return valid;
  }

  /**
   * @method setValoresStoreDatos
   * @description
   * Actualiza el estado del store con los datos del formulario de datos del destinatario.
   * @param event Evento con el campo y valor a actualizar.
   */
  setValoresStoreDatos(event: {
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDatosDelDestinatario({ [CAMPO]: VALOR });
  }
  /**
   * @description
   * Actualiza el store utilizando un método dinámico con el valor de un campo específico.
   * @param event Evento con el campo y valor a actualizar.
   * @returns {void}
   */
  setValoresStore1(event: {
    formGroupName: string;
    campo: string;
    VALOR: undefined;
    METODO_NOMBRE: string;
  }): void {
    const { VALOR, METODO_NOMBRE } = event;
    (this.store as unknown as Record<string, (value: unknown) => void>)[
      METODO_NOMBRE
    ]?.(VALOR);
  }

  /**
   * Selecciona un país de destino y lo actualiza en el estado.
   * @param estado País de destino seleccionado.
   */
  paisDestinSeleccion(estado: Catalogo): void {
    this.store.setPaisDestinSeleccion(estado);
  }

  /**
   * @method setValoresStoreDe
   * @description
   * Actualiza el estado del store con los datos del formulario de destinatario.
   * @param event Evento con el campo y valor a actualizar.
   */
  setValoresStoreDe(event: {
    formGroupName: string;
    campo: string;
    valor: undefined;
    storeStateName: string;
  }): void {
    const { campo: CAMPO, valor: VALOR } = event;
    this.store.setFormDestinatario({ [CAMPO]: VALOR });
  }

  /**
   * @method setFormValida
   * @description
   * Marca como válido o inválido el formulario de destinatario en el store.
   * @param valida Valor booleano indicando validez.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  /**
   * @method setFormValidaExportador
   * @description
   * Marca como válido o inválido el formulario de exportador en el store.
   * @param valida Valor booleano indicando validez.
   */
  setFormValidaExportador(valida: boolean): void {
    this.store.setFormValida({ exportador: valida });
  }

   /**
    * @method setFormValidaDestinatario
    * @description
    * Marca como válido o inválido el subformulario de datos del destinatario en el store.
    * @param valida Valor booleano indicando validez.
    */
   setFormValidaDestinatario(valida: boolean): void {
     this.store.setFormValida({ datosDestinatario: valida });
   }

  /**
   * @method setValoresStore
   * @description
   * Actualiza el store utilizando un método dinámico con el valor de un campo específico.
   * @param form Formulario del cual se extraerá el valor.
   * @param campo Nombre del campo a leer del formulario.
   * @param metodoNombre Método del store que se invocará.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110207Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: Solicitud110207State) => void)(VALOR);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Hook de destrucción del componente. Finaliza las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
