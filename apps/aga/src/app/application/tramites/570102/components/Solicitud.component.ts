import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map, takeUntil } from 'rxjs';
import { Solicitud570102State, Tramite570102Store } from '../state/Tramite570102.store';
import { CommonModule } from '@angular/common';
import { Tramite570102Query } from '../state/Tramite570102.query';

/**
 * Componente que gestiona la lógica y la interfaz de usuario para la solicitud de desistimiento de servicios extraordinarios.
 */
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Subject para destruir notificador.
   */
  consultaDatos!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;
  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Formulario reactivo para gestionar los datos de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud570102State;

  /**
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param store Almacén global para gestionar el estado del trámite.
   * @param query Consulta para obtener el estado actual del trámite.
   * @param validacionesService Servicio para validar campos del formulario.
   */
  constructor(
    public fb: FormBuilder,
    private store: Tramite570102Store,
    private query: Tramite570102Query,
    private validacionesService: ValidacionesFormularioService,
     private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario, obtiene datos iniciales y suscribe al estado global.
   */
  ngOnInit(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.donanteDomicilio();

    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.donanteDomicilio();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.donanteDomicilio();
    if (this.soloLectura) {
      this.solicitudForm.disable();
    } else {
      this.solicitudForm.enable();
    }
  }
  /**
   * Valida el formulario y marca todos los campos como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
    }
  }

  /**
   * Verifica si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo a verificar.
   * @returns `true` si el campo es válido, de lo contrario `false`.
   */
  esValido(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza un valor en el estado global utilizando el almacén.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método del almacén para actualizar el estado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite570102Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Configura el formulario con los valores iniciales del estado.
   */
  donanteDomicilio(): void {
    this.solicitudForm = this.fb.group({
      folio: [this.solicitudState?.folio, [Validators.required]],
      motivoDelDes: [this.solicitudState?.motivoDelDes, [Validators.required]],
    });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el observable `destroyed$` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}