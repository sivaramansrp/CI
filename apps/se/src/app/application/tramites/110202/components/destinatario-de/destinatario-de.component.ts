import {
  Catalogo,
  CatalogoSelectComponent,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, map } from 'rxjs';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelDestinatarioComponent } from '../../../../shared/components/datos-del-destinatario/datos-del-destinatario.component';
import { DestinatarioComponent } from '../../../../shared/components/destinatario/destinatario.component';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { Tramite110202Store } from '../../estados/tramite110202.store';
import { debounceTime } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';
import { filter } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Interfaz que representa los valores de un formulario con claves dinámicas.
 * Los valores pueden ser de tipo string, number, boolean, object o undefined.
 * @interface FormValues
 */
interface FormValues {
  [key: string]: unknown;
}

@Component({
  selector: 'app-destinatario-de',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DestinatarioComponent,
    TituloComponent,
    CatalogoSelectComponent,
    DatosDelDestinatarioComponent,
  ],
  templateUrl: './destinatario-de.component.html',
  styleUrl: './destinatario-de.component.scss',
})
export class DestinatarioDeComponent implements OnDestroy, OnInit {
  /** Indica si el país de destino está habilitado. */
  paisDestino = true;

  /** Valores actuales del formulario de destinatario. */
  formDestinatarioValues!: FormValues;

  /** Valores actuales del formulario de datos del destinatario. */
  formDatosDelDestinatarioValues!: FormValues;

  /** Formulario reactivo para gestionar los datos del destinatario. */
  destinatarioForm!: FormGroup;

  /** Notificador para destruir las suscripciones activas. */
  destroyNotifier$ = new Subject<void>();

  /** Observable que contiene los países de destino disponibles. */
  paisDestin$!: Observable<Catalogo[]>;

  /** Observable que contiene los medios de transporte disponibles. */
  medioDeTransporte$!: Observable<Catalogo[]>;

  /** Estado actual de la sección. */
  private seccion!: SeccionLibState;

  /** Indica si el formulario se está actualizando programáticamente. */
  private actualizandoFormulario = false;
   /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param store Estado del formulario de destinatario.
   * @param tramiteQuery Consultas relacionadas con el trámite.
   * @param certificadoService Servicio para obtener datos de validación.
   * @param seccionQuery Consultas relacionadas con el estado de la sección.
   * @param seccionStore Almacén para gestionar el estado de la sección.
   * @param consultaQuery Consultas relacionadas con la consulta de datos.
   */
  constructor(
    private fb: FormBuilder,
    public store: Tramite110202Store,
    public tramiteQuery: Tramite110202Query,
    public certificadoService: CertificadoValidacionService,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
     public consultaQuery: ConsultaioQuery
  ) {
    this.iniciarFormulario();
    this.inicializarSuscripciones();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.cargarPaisDestin();
    this.cargarMedioDeTransporte();
         this.consultaQuery.selectConsultaioState$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {          
              this.esFormularioSoloLectura = seccionState.readonly;
            })
          )
  }

  /**
   * Inicializa el formulario reactivo del destinatario.
   */
  iniciarFormulario(): void {
    this.destinatarioForm = this.fb.group({
      medioDeTransporte: ['', [Validators.required, Validators.min(0)]],
    });
  }

  /**
   * Configura las suscripciones necesarias para el formulario y el estado.
   */
  inicializarSuscripciones(): void {
    this.tramiteQuery.selectDestinatarioForm$
      .pipe(
        takeUntil(this.destroyNotifier$),
        distinctUntilChanged(),
        filter(values => Boolean(values))
      )
      .subscribe(estado => {
        this.actualizandoFormulario = true;
        this.destinatarioForm.patchValue(estado, { emitEvent: false });
        this.actualizandoFormulario = false;
      });

    this.destinatarioForm.valueChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        debounceTime(300),
        filter(() => !this.actualizandoFormulario)
      )
      .subscribe(value => {
        this.store.setDestinatarioForm(value);
      });

    this.tramiteQuery.selectFormDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(estado => {
        this.formDestinatarioValues = estado;
      });

    this.tramiteQuery.selectFormDatosDelDestinatario$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(estado => {
        this.formDatosDelDestinatarioValues = estado;
      });

    this.seccionQuery.selectSeccionState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(seccionState => {
        this.seccion = seccionState;
      });

    this.paisDestin$ = this.tramiteQuery.selectPaisDestino$;
    this.medioDeTransporte$ = this.tramiteQuery.selectMedioDeTransporte$;
  }

    /**
   * Establece valores en el estado de la tienda para un formulario genérico de certificado.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el estado.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en esta implementación).
   * @param event.campo - Nombre del campo que se actualizará en el estado.
   * @param event.valor - Valor que se asignará al campo especificado.
   * @param event.storeStateName - Nombre del estado de la tienda (no utilizado en esta implementación).
   * 
   * @returns void
   * 
   * @command Este método actualiza el estado de la tienda con los valores proporcionados.
   */
    setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
      const { campo: CAMPO, valor: VALOR } = event;
      this.store.setFormDatosDelDestinatario({ [CAMPO]: VALOR });
    }
        /**
   * Establece valores en el estado de la tienda para un formulario genérico de certificado.
   * 
   * @param event - Objeto que contiene los datos necesarios para actualizar el estado.
   * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en esta implementación).
   * @param event.campo - Nombre del campo que se actualizará en el estado.
   * @param event.valor - Valor que se asignará al campo especificado.
   * @param event.storeStateName - Nombre del estado de la tienda (no utilizado en esta implementación).
   * 
   * @returns void
   * 
   * @command Este método actualiza el estado de la tienda con los valores proporcionados.
   */
        setValoresStoreDe(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
          const { campo: CAMPO, valor: VALOR } = event;
          this.store.setFormDestinatario({ [CAMPO]: VALOR });
        }

  /**
   * Obtiene el control del formulario.
   * @returns Control del formulario.
   */
  get formularioControl(): FormControl {
    return this.destinatarioForm.get('') as FormControl;
  }

  /**
   * Actualiza los valores del formulario de destinatario en el estado.
   * @param e Valores del formulario.
   */
  formDestinatarioFunc(e: unknown): void {
    this.store.setFormDestinatario(e as FormValues);
  }

  /**
   * Actualiza los valores del formulario de datos del destinatario en el estado.
   * @param e Valores del formulario.
   */
  detosDelDestinatarioFunc(e: unknown): void {
    this.store.setFormDatosDelDestinatario(e as FormValues);
  }

  /**
   * Selecciona un medio de transporte y lo actualiza en el estado.
   * @param estado Medio de transporte seleccionado.
   */
  medioDeTransporteSeleccion(estado: Catalogo): void {
    this.store.setMedioDeTransporteSeleccion(estado);
  }

  /**
   * Selecciona un país de destino y lo actualiza en el estado.
   * @param estado País de destino seleccionado.
   */
  paisDestinSeleccion(estado: Catalogo): void {
    this.store.setPaisDestinSeleccion(estado);
  }

  /**
   * Carga los países de destino desde el servicio y los actualiza en el estado.
   */
  cargarPaisDestin(): void {
    this.certificadoService.obtenerPaisDestino()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data: Catalogo[]) => this.store.setPaisDestinatario(data),
        error: (error) => console.error('Error al cargar los estados:', error)
      });
  }

  /**
   * Carga los medios de transporte desde el servicio y los actualiza en el estado.
   */
  cargarMedioDeTransporte(): void {
    this.certificadoService.obtenerMedioDeTransporte()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data: Catalogo[]) => this.store.setMedioDeTransporte(data),
        error: (error) => console.error('Error al cargar los estados:', error)
      });
  }

  /**
   * Método llamado al destruir el componente. Limpia las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
 * Establece el estado de validación del formulario de destinatario.
 * 
 * @param valida - Un valor booleano que indica si el formulario de datos del destinatario es válido.
 */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ destinatrio: valida });
  }

  /**
   * Establece el estado de validación del formulario de destinatario.
   * 
   * @param valida - Un valor booleano que indica si el formulario de datos del destinatario es válido.
   */
  setFormValidaDestinatario(valida: boolean): void {
    this.store.setFormValida({ datosDestinatario: valida });
  }
}