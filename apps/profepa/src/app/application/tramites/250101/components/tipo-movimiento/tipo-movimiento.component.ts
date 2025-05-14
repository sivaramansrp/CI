/**
 * @module TipoMovimientoComponent
 * @description
 * Componente que gestiona el formulario y la lógica relacionada con el tipo de movimiento.
 * Permite seleccionar opciones de movimiento, aduana, inspectoría y municipio.
 */
import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src'; // Importa componentes compartidos para la interfaz de usuario.
import { Component, OnDestroy, OnInit } from '@angular/core'; //Importaciones necesarias de Angular.
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Módulos para la creación y validación de formularios reactivos.
import { Subject, takeUntil } from 'rxjs'; // Utilidades de RxJS para manejar observables y suscripciones.
import { MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum'; // Opciones predefinidas para el tipo de movimiento.
import { TipoMovimientoService } from '../../services/tipo-movimiento.service'; // Servicio para obtener datos relacionados con el tipo de movimiento.
import { Tramite250101Store } from '../../estados/tramite250101.store'; // Almacén para gestionar el estado del trámite.

/**
 * @component TipoMovimientoComponent
 * @description
 * Componente que permite al usuario seleccionar y gestionar datos relacionados con el tipo de movimiento.
 */
@Component({
  selector: 'app-tipo-movimiento', // Selector del componente.
  standalone: true, // Indica que este componente es independiente.
  imports: [
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
  ], // Importa módulos y componentes necesarios.
  templateUrl: './tipo-movimiento.component.html', // Ruta al archivo de plantilla HTML.
  styleUrl: './tipo-movimiento.component.scss', // Ruta al archivo de estilos SCSS.
})
export class TipoMovimientoComponent implements OnInit, OnDestroy {
  /**
   * @property destroy$
   * @description
   * Sujeto utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroy$ = new Subject<void>();

  /**
   * @property aduanaData
   * @description
   * Datos relacionados con las opciones de aduana.
   */
  aduanaData: Catalogo[] = [];

  /**
   * @property inspectoriaData
   * @description
   * Datos relacionados con las opciones de inspectoría.
   */
  inspectoriaData: Catalogo[] = [];

  /**
   * @property municipioData
   * @description
   * Datos relacionados con las opciones de municipio.
   */
  municipioData: Catalogo[] = [];

  /**
   * @property movimientoOpcionDeBotonDeRadio
   * @description
   * Opciones predefinidas para el tipo de movimiento.
   */
  movimientoOpcionDeBotonDeRadio = MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * @property tipoMovimientoForm
   * @description
   * Formulario reactivo para gestionar los datos del tipo de movimiento.
   */
  public tipoMovimientoForm!: FormGroup;

  /**
   * @constructor
   * @description
   * Constructor del componente. Inicializa los servicios necesarios.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite250101Store - Almacén para gestionar el estado del trámite.
   * @param tipoMovimientoService - Servicio para obtener datos relacionados con el tipo de movimiento.
   */
  constructor(
    private fb: FormBuilder,
    private tramite250101Store: Tramite250101Store,
    private tipoMovimientoService: TipoMovimientoService
  ) {
    // La lógica del constructor se puede añadir aquí si es necesario.
  }

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene datos de los servicios y configura el formulario.
   */
  ngOnInit(): void {
    this.tipoMovimientoService.getAduanaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.aduanaData = data; // Asigna los datos de aduana.
    });

    this.tipoMovimientoService.getInspectoriaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.inspectoriaData = data; // Asigna los datos de inspectoría.
    });

    this.tipoMovimientoService.getAlcaldiaData().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.municipioData = data; // Asigna los datos de municipio.
    });

    this.establecerTipoMovimientoFormGroup(); // Configura el formulario reactivo.
  }

  /**
   * @method establecerTipoMovimientoFormGroup
   * @description
   * Configura el formulario reactivo con los controles necesarios y sus validaciones.
   */
  establecerTipoMovimientoFormGroup(): void {
    this.tipoMovimientoForm = this.fb.group({
      tipoMovimiento: new FormControl(this.movimientoOpcionDeBotonDeRadio[0]?.value || '', [Validators.required]),
      tipoAduana: new FormControl('', [Validators.required]),
      tipoInspectoria: new FormControl('', [Validators.required]),
      tipoMunicipio: new FormControl('', [Validators.required]),
    });
  }

  /**
   * @method actualizarAduana
   * @description
   * Actualiza el estado del almacén con el valor seleccionado en el campo `tipoAduana`.
   */
  actualizarAduana(): void {
    const ADUANA = this.tipoMovimientoForm.get('tipoAduana')?.value;
    this.tramite250101Store.establecerTipoAduana(ADUANA);
  }

  /**
   * @method actualizarInspectoria
   * @description
   * Actualiza el estado del almacén con el valor seleccionado en el campo `tipoInspectoria`.
   */
  actualizarInspectoria(): void {
    const INSPECTORIA = this.tipoMovimientoForm.get('tipoInspectoria')?.value;
    this.tramite250101Store.establecerTipoInspectoria(INSPECTORIA);
  }

  /**
   * @method actualizarMunicipio
   * @description
   * Actualiza el estado del almacén con el valor seleccionado en el campo `tipoMunicipio`.
   */
  actualizarMunicipio(): void {
    const MUNICIPIO = this.tipoMovimientoForm.get('tipoMunicipio')?.value;
    this.tramite250101Store.establecerTipoMunicipio(MUNICIPIO);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
