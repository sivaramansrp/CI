import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260104State, Tramite260104StoreDos } from '../../../../estados/tramites/tramite260104.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260104Query } from '../../../../estados/queries/tramite260104.query';
import { VALOR_FORMULARIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';

/**
 * Componente que gestiona la información del representante legal en el trámite 260104.
 * Este componente incluye un formulario reactivo para capturar y mostrar los datos del representante legal.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent
  ],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnDestroy {
  /**
   * Estado de la solicitud obtenido desde el store.
   * Contiene la información actual del trámite.
   */
  public solicitudState!: Solicitud260104State;

  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   * Se utiliza en combinación con `takeUntil` para cancelar suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Grupo de formularios principal para el representante legal.
   * Contiene los campos necesarios para capturar la información del representante.
   */
  representante!: FormGroup;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para la creación de formularios reactivos.
   * @param tramite260104Store - Servicio para interactuar con el store de Tramite260104.
   * @param tramite260104Query - Servicio para consultar el estado de la solicitud.
   */
  constructor(
    private readonly fb: FormBuilder,
    private tramite260104Store: Tramite260104StoreDos,
    private tramite260104Query: Tramite260104Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
  inicializarEstadoFormulario(): void {
    this.tramite260104Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      Object.keys(this.representante.controls).forEach((key) => {
        this.representante.get(key)?.disable();
      });
    } else {
      Object.keys(this.representante.controls).forEach((key) => {
        this.representante.get(key)?.enable();
      });
    }
  }

  /**
   * Crea e inicializa el formulario reactivo para el representante legal.
   * Los campos incluyen RFC, nombre, apellido paterno y apellido materno.
   */
  crearFormulario(): void {
    this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
      apellidoMaterno: [{ value: '', disabled: true }],
    });
  }

  /**
   * Método para actualizar los valores del formulario de representante legal.
   * Este método simula la obtención de nuevos valores y actualiza el formulario.
   */
  obtenerValor(): void {
    this.representante.patchValue({
      nombre: VALOR_FORMULARIO.nombre,
      apellidoPaterno: VALOR_FORMULARIO.apellidoPaterno,
      apellidoMaterno: VALOR_FORMULARIO.apellidoMaterno,
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite260104.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260104StoreDos
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260104Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable `destroyNotifier$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}