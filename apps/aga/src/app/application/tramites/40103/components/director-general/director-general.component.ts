/* eslint-disable no-empty-function */
import { Chofer40103Store, Choferesnacionales40103State } from '../../estados/chofer40103.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Subject } from 'rxjs';
import mockData from '@libs/shared/theme/assets/json/40103/director-general-mockdata.json';
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los datos del director general.
   *
   * @type {FormGroup}
   */
  directorGeneralForm!: FormGroup;

  /**
   * Observable utilizado para manejar la limpieza de recursos al destruir el componente.
   * Se emite un valor cuando el componente se destruye, completando todas las suscripciones activas.
   *
   * @type {Subject<void>}
   */
  private destroy$ = new Subject<void>();

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * Contiene los datos relacionados con la modificación del trámite.
   */
  public derechoState: Choferesnacionales40103State = {} as Choferesnacionales40103State;

    /**
   * Estado de la solicitud.
   */
  public solicitud40103State!: Choferesnacionales40103State;

  constructor(
    private fb: FormBuilder,
    private chofer40103Store: Chofer40103Store,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query
  ) {}

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   * Inicializa el formulario del director general y establece los valores del formulario.
   */
  ngOnInit(): void {
    this.chofer40103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })
      ).subscribe();
    this.crearFormularioDirectorGeneral();
    this.establecerValoresDeFormulario();
  }

  /**
   * Crea el formulario para el director general.
   */
  crearFormularioDirectorGeneral(): void {
    this.directorGeneralForm = this.fb.group({
      nombre: [this.solicitud40103State?.curp, [Validators.required]],
      primerApellido: [this.solicitud40103State?.primerApellido, [Validators.required]],
      segundoApellido: [this.solicitud40103State?.segundoApellido, [Validators.required]],
    });
  }

  /**
   * Establece los valores del formulario utilizando datos simulados.
   */
  establecerValoresDeFormulario(): void {
    if (mockData) {
      setTimeout(() => {
        this.directorGeneralForm.patchValue({
          nombre: mockData.nombre || '',
          primerApellido: mockData.primerApellido || '',
          segundoApellido: mockData.segundoApellido || '',
        });
      });
    }
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Libera la suscripción a los cambios del formulario.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

    /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Chofer40103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.chofer40103Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }
}
