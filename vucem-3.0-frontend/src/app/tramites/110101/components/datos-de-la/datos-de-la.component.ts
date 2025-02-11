/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { ELVALORALERTA } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { INTRODUZCA_NUMERO, REQUERIDO } from '../../../../shared/constantes/mensajes-error-formularios';
import mercancia from '../../../../../assets/json/110101/mercancia.json'

/**
* Este componente se utiliza para mostrar la forma del datosdelamercancia. - 110101
* @param formMercancia: Forma del formMercancia
* @returns Validaciones del formulario
*/
@Component({
  selector: 'app-datos-de-la',
  templateUrl: './datos-de-la.component.html',
  styleUrl: './datos-de-la.component.scss',
  standalone: true,
  imports: [TituloComponent, CommonModule, AlertComponent, ReactiveFormsModule]
})
export class DatosDeLaComponent implements OnInit {

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
    private validacionesService: ValidacionesFormularioService
  ) {
    this.createFormMercancia();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Rellena el formulario con los datos de la API.
   */

  ngOnInit(): void {
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
    this.formMercancia = this.fb.group({
      nombreComercial: ['', Validators.required],
      nombreIngles: ['', Validators.required],
      fraccionArancelaria: ['', [Validators.maxLength(8), Validators.pattern(this.validacionesService.patronDeNumero)]],
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
}
