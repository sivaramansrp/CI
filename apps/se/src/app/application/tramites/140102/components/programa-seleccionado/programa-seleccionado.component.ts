import { CancelacionState, CancelacionStore } from '../../estados/cancelacion-de-autorizaciones.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CancelacionQuery } from '../../estados/cancelacion-de-autorizaciones.query';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { PROGRAMA_SELECCIONADO } from '../../constants/programa-seleccionado.enum';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';

/**
 * Componente que gestiona la funcionalidad del programa seleccionado.
 * Este componente incluye la lógica para manejar formularios dinámicos y datos relacionados con el programa seleccionado.
 */
@Component({
  selector: 'app-programa-seleccionado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormasDinamicasComponent],
  templateUrl: './programa-seleccionado.component.html',
  styleUrl: './programa-seleccionado.component.scss',
})
export class ProgramaSeleccionadoComponent implements OnInit, OnDestroy {
  /**
   * Sujeto utilizado para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * Datos del formulario dinámico para el programa seleccionado.
   */
  public programaSeleccionado: ModeloDeFormaDinamica[] = PROGRAMA_SELECCIONADO;

  /**
   * Estado actual de la solicitud de registro.
   */
  public solicitudState!: CancelacionState;

  /**
   * Formulario principal del componente.
   * Incluye un grupo de formularios para manejar los datos del programa seleccionado.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * Getter para acceder al grupo de formularios del programa seleccionado.
   * Retorna el grupo de formularios correspondiente.
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * Constructor del componente.
   * Inyecta los servicios necesarios para manejar los datos y formularios.
   * @param cancelacionStore Store para manejar el estado de la cancelación.
   * @param cancelacionQuery Query para obtener datos del estado de la cancelación.
   * @param validacionDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    private cancelacionStore: CancelacionStore,
    private cancelacionQuery: CancelacionQuery,
    public validacionDeFormularioService: ValidacionDeFormularioService
  ) {
    // Constructor vacío
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura las suscripciones y registra el formulario dinámico.
   */
  ngOnInit(): void {
    this.cancelacionQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.validacionDeFormularioService.registerForm('programaSeleccionadoForm', this.ninoFormGroup);
  }

  /**
   * Método que establece un cambio de valor en el formulario dinámico.
   * Actualiza el valor en el store y en el servicio de formularios.
   * @param event Objeto que contiene el campo y el valor a actualizar.
   */
  establecerCambioDeValor(event: { campo: string; valor: object | string }): void {
    if (event) {
      this.cancelacionStore.setDynamicFieldValue(event.campo, event.valor);
      this.validacionDeFormularioService.setFormValue('programaSeleccionadoForm', {
        [event.campo]: event.valor,
      });
    }
  }

  /**
   * Método que destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}