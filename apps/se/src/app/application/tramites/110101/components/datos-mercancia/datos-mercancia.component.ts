
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ELVALORALERTA, REGEX_SOLO_NUMEROS } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INTRODUZCA_NUMERO, REQUERIDO } from '@libs/shared/data-access-user/src/tramites/constantes/mensajes-error-formularios';
import { Solicitante110101State, Tramite110101Store } from '../../estados/tramites/solicitante110101.store';
import { Subject,map, takeUntil } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Solicitante110101Query } from '../../estados/queries/solicitante110101.query';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import mercancia from '@libs/shared/theme/assets/json/110101/mercancia.json'


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
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;
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
  public solicitudeState!: Solicitante110101State;

  /**
 * constructor de la clase
 * Fetch the fetchtiposDocumentos datos
 * Crea el formulario
 * @param fb: constructor de formularios
 * @param validacionesService: Validaciones comunes del formulario.
 */
  constructor(private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite110101Store: Tramite110101Store,
    private solicitanteQuery: Solicitante110101Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.createFormMercancia();
        })
      )
      .subscribe();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Rellena el formulario con los datos de la API.
   */

  ngOnInit(): void {
     this.solicitanteQuery.selectSolicitante$.pipe(takeUntil(this.destroy$),map((seccionState) => {
        this.solicitudeState = seccionState;
      })).subscribe();
    this.createFormMercancia();
    this.getFormDatosDeMercancia();
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
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }

  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  public guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formMercancia.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formMercancia.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}

  public inicializarFormulario(): void {
    this.formMercancia = this.fb.group({
      nombreComercial: [this.solicitudeState.nombreComercial, Validators.required],
      nombreIngles: [this.solicitudeState.nombreIngles, Validators.required],
      fraccionArancelaria: [this.solicitudeState.fraccionArancelaria, [Validators.maxLength(8), Validators.pattern(REGEX_SOLO_NUMEROS)]],
      descripcion: [{value: this.solicitudeState.descripcion, disabled: true}],
      valorTransaccion: [this.solicitudeState.valorTransaccion, Validators.maxLength(20)]
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
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite110101Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
