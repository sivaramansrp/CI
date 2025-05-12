/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable sort-imports */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosMercanciaStore } from '../../estados/tramites/datos-mercancia110101.store';
import { DatosMercanciaQuery } from '../../estados/queries/datos-mercancia110101.query';
import { AlertComponent } from '@ng-mf/data-access-user';
import { ELVALORALERTA, REGEX_SOLO_NUMEROS } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { INTRODUZCA_NUMERO, REQUERIDO } from 'libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import mercancia from 'libs/shared/theme/assets/json/110101/mercancia.json'
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

/**
* Este componente se utiliza para mostrar la forma del datosdelamercancia. - 110101
* @param formMercancia: Forma del formMercancia
* @returns Validaciones del formulario
*/
@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.scss',
  standalone: true,
  imports: [TituloComponent, CommonModule, AlertComponent, ReactiveFormsModule]
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {

  /**
   * Una cadena que representa la clase CSS para una alerta de advertencia.
   * Esta clase se utiliza para aplicar estilo a los mensajes de advertencia en el componente.
   */
  public warningAlert = 'alert-warning';

  /**
   * Un objeto que contiene los textos de alerta.
   * Este objeto se utiliza para mostrar mensajes de alerta en el componente.
   */
  public TEXTOS = ELVALORALERTA;
  /**
   * Una instancia de FormGroup que representa el formulario para Mercancia (bienes).
   * Este formulario se utiliza para capturar y validar los datos relacionados con Mercancia.
   */
  public formMercancia!: FormGroup;

  /**
   * **Subject para manejar la destrucción del componente**
   * 
   * Este `Subject` se utiliza para cancelar suscripciones y evitar 
   * fugas de memoria cuando el componente es destruido.
   * Se usa comúnmente en el operador `takeUntil` dentro de los observables.
   */
  private destroy$ = new Subject<void>();


  /** Adición de color de fondo dinámico al área de texto */
  public booleanVariable = '#cccccc';
  /**
   * Una constante que contiene la cadena de mensaje requerida.
   * Este mensaje se utiliza para indicar que un campo es obligatorio.
   */
  public MENSAJE_REQUERIDO = REQUERIDO;

  /**
   * Una constante que contiene el mensaje de error para el campo de número.
   * Este mensaje se utiliza para indicar que un campo debe ser un número.
   */
  public NUMERO_REQUERIDO = INTRODUZCA_NUMERO;
  /**
   * apiDatosDeRespuesta se utiliza para obtener datos del nombre de archivo JSON ficticio como mercancia.json
   */
  public apiDatosDeRespuesta = mercancia;

  /**
 * constructor de la clase
 * Fetch the fetchtiposDocumentos datos
 * Crea el formulario
 * @param fb: constructor de formularios
 * @param validacionesService: Validaciones comunes del formulario.
 */
  constructor(private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private datosDeLaStore: DatosMercanciaStore,
    private datosDeLaQuery: DatosMercanciaQuery
  ) {
    this.createFormMercancia();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Rellena el formulario con los datos de la API.
   */

  ngOnInit(): void {
    this.getFormDatosDeMercancia();
    this.obtenerDatosFormularioDesdeStore();
    this.formMercancia.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.actualizarStore());
  }

  /**
    * Crea un grupo de formularios reactivos para "Mercancia" con los siguientes controles:
    * - nombreComercial: Un campo de texto obligatorio.
    * - nombreIngles: Un campo de texto obligatorio.
    * - fraccionArancelaria: Un campo de texto con una longitud máxima de 8 caracteres y un validador de patrones para valores numéricos.
    * - descripcion: Un campo de texto opcional.
    * - valorTransaccion: Un campo de texto con una longitud máxima de 20 caracteres.
    */
  public createFormMercancia(): void {
    this.formMercancia = this.fb.group({
      nombreComercial: ['', Validators.required],
      nombreIngles: ['', Validators.required],
      fraccionArancelaria: ['', [Validators.maxLength(8), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      descripcion: [''],
      valorTransaccion: ['', Validators.maxLength(20)]
    });

  }

  /**
    * Rellena los campos del formulario en 'formMercancia' con datos de 'apiDatosDeRespuesta'.
    *
    * Este método establece los valores para los siguientes controles de formulario:
    * - 'fraccionArancelaria': Establece el valor de 'apiDatosDeRespuesta.fraccionArancelaria'.
    * - 'descripcion': Establece el valor de 'apiDatosDeRespuesta.descripcion'.
    * - 'valorTransaccion': Establece el valor de 'apiDatosDeRespuesta.valorTransaccion'.
    */
  public getFormDatosDeMercancia(): void {
    this.formMercancia.get('fraccionArancelaria')?.setValue(this.apiDatosDeRespuesta.fraccionArancelaria);
    this.formMercancia.get('descripcion')?.setValue(this.apiDatosDeRespuesta.descripcion);
    this.formMercancia.get('valorTransaccion')?.setValue(this.apiDatosDeRespuesta.valorTransaccion);
  }

  /**
 * Metodo para saber si el campo del formulario es valido.
 * @param field El nombre del campo del formulario que se va a validar.
 * @returns {boolean | null} : Regresa un booleano si el campo es valido o no o puede regresar null si no se ha tocado el campo.
 */
  isValid(field: string): boolean | null {
    return this.validacionesService.isValid(this.formMercancia, field);
  }

  /**
   * **Obtiene los valores del formulario desde el store y los aplica al formulario**
   * 
   * - Se suscribe a `formValues$` de `datosDeLaQuery` para recibir los valores almacenados en el estado.
   * - Si existen valores, los asigna al formulario `formMercancia` sin disparar eventos (`emitEvent: false`).
   * - La suscripción se gestiona con `takeUntil(this.destroy$)` para evitar fugas de memoria.
   */
  private obtenerDatosFormularioDesdeStore(): void {
    this.datosDeLaQuery.formValues$
      .pipe(takeUntil(this.destroy$)) // Cleanup on destroy
      .subscribe((formValues) => {
        if (formValues) {
          this.formMercancia.patchValue(formValues, { emitEvent: false }); // Prevents triggering valueChanges
        }
      });
  }
  /**
   * **Actualiza el estado del store con los valores actuales del formulario**
   * 
   * - Obtiene los valores actuales del formulario `formMercancia`.
   * - Llama al método `updateFormValues` del store para actualizar el estado.
   * - Centraliza la lógica de actualización en el store, manteniendo el componente más limpio.
   */
  private actualizarStore(): void {
    const NEWVALUES = this.formMercancia.value;
    this.datosDeLaStore.actualizarValoresFormulario(NEWVALUES);
  }

  /**
   * **Limpia los recursos y finaliza las suscripciones al destruir el componente**
   * 
   * - `this.destroy$.next();` emite un valor para notificar a los observables dependientes que deben completarse.
   * - `this.destroy$.complete();` finaliza el `Subject` para liberar memoria y evitar fugas de memoria.
   * - Este método se ejecuta automáticamente cuando el componente se destruye, asegurando una gestión eficiente de las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
