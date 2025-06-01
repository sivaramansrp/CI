import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnContinuarComponent, DatosPasos, ListaPasosWizard, Notificacion, NotificacionesComponent, PASOS, Pedimento, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
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
  imports: [CommonModule, ReactiveFormsModule, BtnContinuarComponent],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent implements OnInit, OnDestroy {

  @Input() number!: number;

    @Output() dataEvent = new EventEmitter<number>();


  /** Lista de pasos del asistente. */
  pasos: ListaPasosWizard[] = PASOS;

   indice: number = 1;

   /** Datos de los pasos del asistente. */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Guardar y firmar',
  };
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
    private validacionesService: ValidacionesFormularioService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
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
      motivoDelDes: [this.solicitudState?.motivoDelDes, [Validators.required]],
    });
  }

  emitirEventoClick(){
    this.indice=1;
    this.datosPasos.indice = 1;
    this.datosPasos.txtBtnAnt;
     this.dataEvent.emit(1);
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