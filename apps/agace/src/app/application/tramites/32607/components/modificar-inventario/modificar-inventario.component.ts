import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { ConsultaioQuery, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Solicitud32607State, Solicitud32607Store } from '../../estados/solicitud32607.store'; 
import { Subject, map, takeUntil } from 'rxjs'; 
import { CommonModule } from '@angular/common'; 
import { Solicitud32607Query } from '../../estados/solicitud32607.query'; 

/**
 * Componente responsable de mostrar y gestionar la edición de inventarios existentes.
 * 
 * Permite modificar los datos de un inventario previamente registrado en el formulario principal,
 * utilizando un formulario reactivo y componentes reutilizables como `TituloComponent`.
 *
 * @selector app-modificar-inventario
 * @standalone true
 * @templateUrl ./modificar-inventario.component.html
 * @styleUrl ./modificar-inventario.component.scss
 * @imports CommonModule, ReactiveFormsModule, TituloComponent
 */
@Component({
  selector: 'app-modificar-inventario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './modificar-inventario.component.html',
  styleUrl: './modificar-inventario.component.scss',
})
export class ModificarInventarioComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo utilizado para modificar los datos del inventario.
   * 
   * Se inicializa en tiempo de ejecución y contiene los controles necesarios
   * para editar la información de un inventario existente.
   *
   * @type {FormGroup}
   */
  modificarInventarioForm!: FormGroup;

  /**
   * Observable utilizado para limpiar suscripciones activas al destruir el componente.
   * 
   * Se emplea junto con `takeUntil` para evitar fugas de memoria en las suscripciones.
   *
   * @type {Subject<void>}
   * @private
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Estado actual de la solicitud 32607.
   * 
   * Se utiliza para cargar, mostrar y actualizar los datos asociados al inventario
   * desde el store de la solicitud.
   *
   * @type {Solicitud32607State}
   */
  solicitud32607State: Solicitud32607State = {} as Solicitud32607State;


  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * Inyecta los servicios necesarios para la creación del formulario, el acceso y modificación
   * del estado de la solicitud 32607, así como para consultar catálogos u otros datos auxiliares.
   * 
   * @param fb - Servicio para construir y gestionar formularios reactivos.
   * @param solicitud32607Store - Store que maneja el estado de la solicitud 32607.
   * @param solicitud32607Query - Permite leer y observar cambios en el estado de la solicitud.
   * @param consultaioQuery - Consulta auxiliar para obtener catálogos u otros datos relacionados.
   */
  constructor(
    public fb: FormBuilder,
    public solicitud32607Store: Solicitud32607Store,
    public solicitud32607Query: Solicitud32607Query,
    public consultaioQuery: ConsultaioQuery
  ) { 
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * 
   * Se ejecuta al inicializar el componente. Llama al método `inicializarEstadoFormulario()` 
   * para configurar el estado y valores iniciales del formulario de modificación de inventario.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.modificarInventarioForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.modificarInventarioForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
 * Inicializa el formulario reactivo para modificar los datos del inventario.
 * 
 * Define los controles `inventarioNombre`, `inventarioAnexo` e `inventarioLugar`, 
 * con sus respectivos valores iniciales y validaciones.
 * 
 * Además, se suscribe al observable `selectSolicitud$` del store para mantener 
 * actualizado el formulario con los últimos valores del estado de la solicitud.
 * 
 * La suscripción se gestiona mediante `takeUntil` para evitar fugas de memoria.
 *
 * @returns {void}
 */
  inicializarFormulario(): void {
    this.modificarInventarioForm = this.fb.group({
      inventarioNombre: [
        this.solicitud32607State.inventarioNombre,
        [Validators.required],
      ],
      inventarioAnexo: [this.solicitud32607State.inventarioAnexo],
      inventarioLugar: [
        this.solicitud32607State.inventarioLugar,
        [Validators.required],
      ],
    });

    this.solicitud32607Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32607State) => {
          this.solicitud32607State = respuesta;
          this.modificarInventarioForm.patchValue({
            inventarioNombre: this.solicitud32607State.inventarioNombre,
            inventarioAnexo: this.solicitud32607State.inventarioAnexo,
            inventarioLugar: this.solicitud32607State.inventarioLugar,
          });
        })
      )
      .subscribe();
  }

  /**
   * Actualiza el nombre del inventario en el store a partir del valor ingresado por el usuario.
   *
   * @param evento - Evento del input que contiene el nuevo valor del nombre del inventario.
   * @returns {void}
   */
  actualizarInventarioNombre(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarInventarioNombre(VALOR);
  }

  /**
   * Actualiza el estado del campo "anexo" del inventario en el store,
   * usando el valor booleano del checkbox.
   *
   * @param evento - Evento del input que indica si el checkbox está marcado o no.
   * @returns {void}
   */
  actualizarInventarioAnexo(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud32607Store.actualizarInventarioAnexo(VALOR);
  }

  /**
   * Actualiza el lugar de radicación del inventario en el store,
   * utilizando el valor ingresado por el usuario.
   *
   * @param evento - Evento del input que contiene el nuevo valor del lugar de radicación.
   * @returns {void}
   */
  actualizarLugarDeRadicacion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32607Store.actualizarInventarioLugar(VALOR);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * 
   * Finaliza el observable `destroy$` para evitar fugas de memoria
   * en las suscripciones activas cuando el componente se destruye.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
