import { Chofer40101Store, Choferesnacionales40101State } from '../../estado/chofer40101.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Chofer40101Query } from '../../estado/chofer40101.query';
import { Chofer40101Service } from '../../estado/chofer40101.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';

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
  public derechoState: Choferesnacionales40101State = {} as Choferesnacionales40101State;

    /**
   * Estado de la solicitud.
   */
  public solicitud40101State!: Choferesnacionales40101State;

  /**
   * Constructor de la clase DirectorGeneralComponent.
   *
   * @param fb Instancia de FormBuilder para la creación y gestión de formularios reactivos.
   * @param chofer40101Store Store para el manejo del estado de los choferes.
   * @param chofer40101Service Servicio para operaciones relacionadas con choferes.
   * @param chofer40101Query Query para consultar el estado de los choferes.
   * @param consultaioQuery Query para consultar el estado de consulta IO.
   */
  constructor(
    private fb: FormBuilder,
    private chofer40101Store: Chofer40101Store,
    private chofer40101Service: Chofer40101Service,
    private chofer40101Query: Chofer40101Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    // Lógica para el constructor si es necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   * Inicializa el formulario del director general y establece los valores del formulario.
   */
  ngOnInit(): void {
    this.chofer40101Query.selectSolicitud$
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

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if(seccionState.readonly) {
            this.directorGeneralForm.disable();
          } 
        })
      ).subscribe();
  }

  /**
   * Crea el formulario para el director general.
   */
  crearFormularioDirectorGeneral(): void {
    const STATE = this.chofer40101Store?.getValue();

    this.directorGeneralForm = this.fb.group({
      nombre: [STATE.nombre, [Validators.required]],
      primerApellido: [STATE.primerApellido, [Validators.required]],
      segundoApellido: [STATE.segundoApellido, [Validators.required]],
    });
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
    metodoNombre: keyof Chofer40101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.chofer40101Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }
}
