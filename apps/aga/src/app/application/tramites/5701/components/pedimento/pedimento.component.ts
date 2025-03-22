import { BooleanoSiNoPipe, SoloNumerosDirective } from '@ng-mf/data-access-user';
import { Component, Input, OnChanges, SimpleChanges, forwardRef, output } from '@angular/core';
import { DatosComponentePedimento, Pedimento } from '../../../../core/models/5701/tramite5701.model';
import { ERR_VALIDACION_PEDIMENTO, MSG_ADUANA_PEDIMENTO, MSG_ELIMINA_ELEMENTO, MSG_NRO_PEDIMENTO } from '../../../../core/enums/5701/tramite5701.enum';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Component({
  selector: 'c-pedimento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, forwardRef(() => BooleanoSiNoPipe), forwardRef(() => SoloNumerosDirective)],
  templateUrl: './pedimento.component.html',
  styleUrl: './pedimento.component.scss',
})
export class PedimentoComponent implements OnChanges {
  @Input({ required: true }) validacion!: boolean;
  @Input({ required: true }) datosNroPedimento!: DatosComponentePedimento;

  validaCampos = output<void>();

  pedimentoForm: FormControl = new FormControl('', [Validators.maxLength(7)]);

  hTabla: Array<string> = [
    'Patente',
    'Pedimento',
    'Aduana',
    'Tipo de pedimento',
    'Número(s)',
    'Comprobante Valor',
    'Pedimento Validado',
    'Accion',
  ];

  pedimentos: Array<Pedimento> = [];

  modal: string = '';
  tituloModal!: string;
  mensajeModal!: string;

  constructor(
              private validacionesService: ValidacionesFormularioService) 
  // eslint-disable-next-line no-empty-function
  {

  }

  /**
   * Verifica si el formulario de pedimento es válido.
   * 
   * @returns {boolean | null} - Devuelve `true` si el formulario tiene errores y ha sido tocado, 
   *                             `false` si no tiene errores o no ha sido tocado, 
   *                             o `null` si no se puede determinar.
   */
  get isValid(): boolean | null {
    return this.pedimentoForm.errors && this.pedimentoForm.touched;
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando uno o más valores de las propiedades de entrada de un componente cambian.
   * 
   * @param changes - Un objeto de tipo `SimpleChanges` que contiene los cambios en las propiedades de entrada. Cada clave es el nombre de una propiedad de entrada y su valor es un objeto `SimpleChange` que contiene las propiedades `currentValue` y `previousValue`.
   * 
   * - `validacion`: Si esta propiedad cambia, se actualiza el valor de `this.validacion` con el valor actual.
   * - `datosNroPedimento`: Si esta propiedad cambia, se actualiza el valor de `this.datosNroPedimento` con el valor actual.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.validacion) {
      this.validacion = changes.validacion.currentValue;
    }

    if (changes.datosNroPedimento) {
      this.datosNroPedimento = changes.datosNroPedimento.currentValue;
    }
  }

  /**
   * Agrega un nuevo pedimento.
   * 
   * Esta función emite un evento para validar los campos y luego ejecuta las acciones correspondientes.
   * 
   * @returns {void} No retorna ningún valor.
   */
  agregaPedimento(): void {
    this.validaCampos.emit();
    this.acciones();
  }

  /**
   * Realiza las acciones necesarias para validar y agregar un pedimento.
   * 
   * - Si `this.validacion` es verdadero:
   *   - Obtiene el número de pedimento desde el formulario.
   *   - Si el número de pedimento es diferente de 0:
   *     - Crea un objeto `PEDIMENTO` con los datos necesarios.
   *     - Muestra un modal con un mensaje de aviso y agrega el pedimento a la tabla.
   *   - Si el número de pedimento es 0:
   *     - Muestra un modal con un mensaje de aviso indicando que el número de pedimento no es válido.
   * - Si `this.validacion` es falso:
   *   - Muestra un modal con un mensaje de aviso indicando que la aduana del pedimento no es válida.
   * 
   * @returns {void}
   */
  acciones(): void {
    if (this.validacion) {
      const NUMERO_PEDIMENTO = this.pedimentoForm.value
        ? parseInt(this.pedimentoForm.value, 10)
        : 0;

      if (NUMERO_PEDIMENTO !== 0) {
        const PEDIMENTO = {
          patente: this.datosNroPedimento.patente,
          pedimento: NUMERO_PEDIMENTO,
          aduana: this.datosNroPedimento.idAduana,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };

        // Aqui se debe validar el pedimento a un endpoint, si no se encuentra se manda un aviso con modal y se agrega el pedimento a la tabla.
        this.tituloModal = 'Aviso';
        this.mensajeModal = ERR_VALIDACION_PEDIMENTO;
        this.abrirModal();
        this.pedimentos.push(PEDIMENTO);
      } else {
        this.tituloModal = 'Aviso';
        this.mensajeModal = MSG_NRO_PEDIMENTO;
        this.abrirModal();
      }

    } else {
      this.tituloModal = 'Aviso';
      this.mensajeModal = MSG_ADUANA_PEDIMENTO;
      this.abrirModal();
    }
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   * 
   * @param {number} i - El índice del elemento a eliminar.
   * 
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  eliminar(i: number): void {
    this.pedimentos.splice(i, 1)
    this.tituloModal = 'Aviso';
    this.mensajeModal = MSG_ELIMINA_ELEMENTO;
    this.abrirModal();
  }

  /**
* Abre el modal para eliminar un documento.
* @param {number} i - El índice del documento.
*/
  abrirModal(): void {

    this.modal = 'show';
  }

  /**
  * Cierra el modal.
  */
  cerrarModal(): void {
    this.modal = '';
    this.tituloModal = '';
    this.mensajeModal = '';
  }
}
