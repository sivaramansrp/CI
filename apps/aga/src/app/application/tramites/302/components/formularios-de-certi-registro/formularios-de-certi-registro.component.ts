/* eslint-disable @nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import type { FormularioDinamico } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';
import { ReactiveFormsModule } from '@angular/forms';
import { TituloComponent} from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component'
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src/core/services/shared/validaciones-formulario/validaciones-formulario.service';
/**
* AddFormComponent se utiliza para crear formularios dinámicos*
* Este componente utiliza varios subcomponentes como TitleComponent, CommonModule,
* ReactiveFormsModule, CatalogSelectComponent y InputCheckComponent
* 
* @component
*/
@Component({
  selector: 'formularios-de-certi-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './formularios-de-certi-registro.component.html',
  styleUrl: './formularios-de-certi-registro.component.scss',
})

export class FormulariosDeCertiRegistroComponent {

  /**
   * compo doc
   * @input formargrupo
   * @type {FormGroup}
   * @memberof FormulariosDeCertiRegistroComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  @Input() public formargrupo!: FormGroup;

  /**
   * compo doc
   * @input formularioDatos
   * @type {FormularioDinamico[]}
   * @memberof FormulariosDeCertiRegistroComponent
   * @description
   * Este es un arreglo de objetos de tipo FormularioDinamico.
   * Se utiliza para definir la estructura y configuración de los formularios dinámicos en el componente.
   */
  @Input() public formularioDatos!: FormularioDinamico[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /**
   * compo doc
   * @input menuDesplegableDatos
   * @type {any}
   * @memberof FormulariosDeCertiRegistroComponent
   * @description
   * Este es un dato de tipo "any" que se utiliza para manejar la información
   * relacionada con los menús desplegables en el componente.
   */
  @Input() public menuDesplegableDatos: Catalogo[] = [];

  /**
   * compo doc
   * @input formularioTitulo
   * @type {string}
   * @memberof FormulariosDeCertiRegistroComponent
   * @description
   * Este es un string que representa el título del formulario.
   * Se utiliza para mostrar un encabezado o título en el componente.
   */
  @Input() public formularioTitulo!: string;

  /**
   * compo doc
   * @output emitirValorCambiado
   * @type {forma: FormGroup; campo: string;}
   * @memberof FormulariosDeCertiRegistroComponent
   * @description
   * Este es un EventEmitter que emite un objeto con el formulario reactivo (FormGroup)
   * y el campo que ha cambiado. Se utiliza para notificar cambios en los valores del formulario
   * al componente padre o a otros componentes interesados.
   */
  @Output() public emitirValorCambiado = new EventEmitter<{forma: FormGroup; campo: string;}>();

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es verdadero, los campos del formulario no serán editables.
   */
  @Input() public readonly: boolean = false;
  /**
   * compo doc
   * @constructor
   * Inicializa una nueva instancia del componente `FormulariosDeCertiRegistroComponent`.
   * 
   * @param validacionesService Servicio utilizado para realizar validaciones en los formularios.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private validacionesService: ValidacionesFormularioService) {}

  /**
   * compo doc
   * @method changeInValoresStore
   * @description 
   * Este método se utiliza para emitir un evento cuando hay un cambio en los valores del formulario.
   * Recibe como parámetros el formulario reactivo (FormGroup) y el campo que ha cambiado.
   * Luego, emite un objeto con esta información utilizando el EventEmitter `emitirValorCambiado`.
   * @param form - El formulario reactivo que contiene los datos.
   * @param campo - El nombre del campo que ha cambiado.
   */
  public changeInValoresStore(forma: FormGroup, campo: string): void {
    const DATOS = {forma: forma, campo: campo};
    this.emitirValorCambiado.emit(DATOS);
  }

  /**
   * compo doc
   * @method isValid
   * @description 
   * Verifica si un campo específico del formulario es válido.
   *
   * @param field El nombre del campo que se desea validar.
   * @returns Un valor booleano que indica si el campo es válido.
   */
  public isValid(campo: string): boolean | null {
    return this.validacionesService.isValid(this.formargrupo, campo);
  }
}
