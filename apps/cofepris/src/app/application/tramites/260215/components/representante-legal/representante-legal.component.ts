import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud260215State,
  Tramite260215Store,
} from '../../estados/tramites/tramite260215.store';
import { Subject, map, takeUntil } from 'rxjs';
import { TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

/**
 * Componente principal para gestionar el formulario de representante.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.css',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

    /**
   * Verifica si un campo específico del formulario es válido.
   * @param field Nombre del campo del formulario a validar.
   * @returns `true` si el campo es válido; de lo contrario, `false`.
   */
  
  esValido(field: string): boolean {
    return Boolean(this.validacionesService.isValid(this.representante, field));
  }

/**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
 public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb
   * @param tramite260215Store
   * @param tramite260215Query
   */
  constructor(
    private readonly fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService,
    private service: ServiciosPermisoSanitarioService,
    
  ) {
   this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe();
  }


  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.representante.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.representante.enable();
    }
  }

   /**
   * Busca los datos del representante legal a partir del RFC proporcionado.
   * Si el campo RFC está vacío, marca todos los campos como tocados para mostrar errores de validación.
   * Si el RFC está presente, consulta el servicio para obtener los datos del representante y los asigna al formulario.
   */
  buscar(): void {
    if (!this.representante.get('rfc')?.value) {
      this.representante.get('rfc')?.markAllAsTouched();
    } else {
      this.service.ObtenerReprestantanteData()
      .pipe(
        takeUntil(this.destroyNotifier$)
      ).subscribe((response) => {
        this.representante.patchValue({
          nombre: response.nombre,
          primerApellido: response.apellidoPaterno,
          segundoApellido: response.apellidoMaterno
        });
      });
    }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario del representante legal.
   * 
   * - Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   *   y lo asigna a la propiedad `solicitudState`.
   * - Crea el formulario reactivo `representante` con los campos requeridos y sus validaciones.
   * - Los campos `nombre`, `apellidoPaterno` y `apellidoMaterno` se inicializan deshabilitados.
   * 
   * @remarks
   * Este método debe llamarse durante la inicialización del componente para asegurar que el formulario
   * esté correctamente configurado con los datos actuales de la solicitud.
   */
  inicializarFormulario(): void {
      this.tramite260215Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.representante = this.fb.group({
      rfc: [this.solicitudState?.rfc, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellidoPaterno: [{ value: '', disabled: true }, Validators.required],
      apellidoMaterno: [{ value: '', disabled: true }],
    });
  }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} representante
   */
 public representante!: FormGroup;

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
 this.inicializarEstadoFormulario()
  }

  /**
   * Obtiene el valor de un campo en el store de Tramite31601.
   */
  obtenerValor():void {
    this.representante.patchValue({
      nombre: 47875,
      apellidoPaterno: 'Paterno',
      apellidoMaterno: 'Materno',
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260215Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260215Store[metodoNombre] as (value: string | number) => void)(
      VALOR
    );
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
