import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { OpcionesPublicacion } from '../../models/permiso-maquila.models';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { Tramite260212State } from '../../estados/tramite260212.store';

/**
 * Componente RepresentanteLegalComponent
 * Este componente gestiona el formulario de datos del representante legal.
 * Incluye validaciones, funcionalidad para verificar campos, y manejo de opciones dinámicas.
 */
@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputRadioComponent
  ],
  templateUrl: './representante-legal.component.html',
  styleUrl: './representante-legal.component.scss',
})
export class RepresentanteLegalComponent implements OnInit, OnDestroy {
  /**
   * @desc Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   * @public
   * 
   * Cuando es verdadero, el usuario no puede editar los campos del formulario.
   */
  public esFormularioSoloLectura: boolean = true;
    /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
 * Subject para limpiar recursos y cancelar suscripciones al destruir el componente.
 */
  private destroy$ = new Subject<void>();
   /**
   * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
   */
  public solicitudState!: Tramite260212State;
  /**
   * Formulario reactivo para los datos del representante legal.
   */
  personaForm!: FormGroup;

  /**
 * Arreglo que almacena las opciones dinámicas obtenidas desde un archivo JSON.
 */
  losDatos: OpcionesPublicacion[] = [];

  /**
 * Valor seleccionado en los radios de opciones, con un valor predeterminado.
 */
  valorSeleccionado = 'option1'

  /**
   * Constructor de la clase RepresentanteLegalComponent.
   * 
   * @param http - Cliente HTTP para realizar solicitudes HTTP.
   * @param fb - Constructor de formularios reactivos.
   * @param validacionesService - Servicio para validaciones personalizadas de formularios.
   */
  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService, private solicitudService: SolicitudService,
    private consultaioQuery: ConsultaioQuery,private tramite260212Query: Tramite260212Query,) {

  }

  /**
   * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
   * - Configura el formulario `personaForm`.
   * - Obtiene las opciones dinámicas para los radios desde un archivo JSON.
   */
  ngOnInit(): void {
    this.obtenerOpcionesSolicitud()
    this.actualizarEstado()
    this.inicializarEstadoFormulario()
      ;
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Si está en modo solo lectura, deshabilita el formulario; si no, lo habilita y actualiza los valores.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      // Solo llamar a guardarDatosFormulario si el formulario ya está inicializado
      if (this.personaForm) {
        this.guardarDatosFormulario();
      }
    } else {
      this.actualizarEstado();
    }
  }

  /**
   * Aplica el modo solo lectura o edición al formulario según corresponda.
   * También actualiza los valores del formulario desde el store.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.actualizarEstado();
    // Solo intentar deshabilitar si el formulario ya está inicializado

    if (this.esFormularioSoloLectura) {
      this.personaForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.personaForm.enable();
    }
  }

  /**
   * Inicializa o reinicia el formulario de persona con los campos requeridos y sus validaciones.
   * @returns {void}
   */
  actualizarEstado(): void {
    this.tramite260212Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState as Tramite260212State;
            })
          )
          .subscribe()

    this.personaForm = this.fb.group({
      losDatos: [ this.solicitudState.losDatos, Validators.required],
      rfc: [ this.solicitudState.rfc, Validators.required],
      nombre: [{ value:  this.solicitudState.nombre, disabled: true }],
      primerApellido: [{ value:this.solicitudState.primerApellido, disabled: true }],
      segundoApellido: [{ value:  this.solicitudState.segundoApellido, disabled: true }],
    });
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;

        })
      )
      .subscribe()
  }

  /**
   * Verifica si un campo específico del formulario es válido.
   * @param field Nombre del campo del formulario a validar.
   * @returns `true` si el campo es válido; de lo contrario, `false`.
   */
  
  esValido(field: string): boolean {
    return Boolean(this.validacionesService.isValid(this.personaForm, field));
  }
  /**
 * Obtiene las opciones dinámicas para los radios desde un archivo JSON y las almacena en `losDatos`.
 * Utiliza una petición HTTP para leer el archivo local.
 */
  obtenerOpcionesSolicitud(): void {
    this.solicitudService.getOpcionesPublicacion().subscribe((data) => {
      this.losDatos = data;
    });
  }

  /**
   * @method buscar
   * @description
   * Busca los datos del representante legal utilizando el RFC proporcionado en el formulario.
   * Si el campo RFC está vacío, marca el campo como tocado para mostrar la validación.
   * Si el RFC está presente, realiza una solicitud al servicio para obtener los datos del representante
   * y actualiza los campos del formulario con la respuesta recibida.
   *
   * @example
   * this.buscar();
   * // Si el RFC es válido, llena los campos de nombre y apellidos con los datos obtenidos.
   */
  buscar(): void {
    if (!this.personaForm.get('rfc')?.value) {
      this.personaForm.get('rfc')?.markAllAsTouched();
    } else {
      this.solicitudService.ObtenerReprestantanteData()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((response) => {
        this.personaForm.patchValue({
          nombre: response.nombre,
          primerApellido: response.apellidoPaterno,
          segundoApellido: response.apellidoMaterno
        });
      });
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y cancela suscripciones.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
