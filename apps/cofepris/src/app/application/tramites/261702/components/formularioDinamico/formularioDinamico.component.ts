import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'formulario-dinamico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formularioDinamico.component.html',
  styleUrl: './formularioDinamico.component.css',
})
export class FormularioDinamicoComponent implements OnInit {
  /**
   * compo doc
   * @type {FormGroup}
   * @memberof FormularioDinamicoComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({});

  /**
   * compo doc
   * @input formularioDatos
   * @type {FormularioDinamico[]}
   * @memberof FormularioDinamicoComponent
   * @description
   * Este es un arreglo de objetos de tipo FormularioDinamico.
   * Se utiliza para definir la estructura y configuración de los formularios dinámicos en el componente.
   */
  @Input() public formularioDatos!: FormularioDinamico[];

  /**
   * compo doc
   * @constructor
   * Inicializa una nueva instancia del componente `FormulariosDeCertiRegistroComponent`.
   * 
   * @param fb un servicio que simplifica la creación de formularios reactivos
   * @param validacionesService servicio que procesa todas las validaciones
   */
  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService) {
      // eslint-disable-next-line no-empty-function
    }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    const FORMGROUP: { [key: string]: ReturnType<FormBuilder['control']> } = {};
    this.formularioDatos.forEach(field => {
      const VALIDADORES = FormularioDinamicoComponent.obtenerValidadores(field.validators);
      FORMGROUP[field.campo] = this.fb.control(
        { value: '', disabled: field.disabled },
        { validators: VALIDADORES }
      );
    });
    this.forma = this.fb.group(FORMGROUP);
  }

  static obtenerValidadores(listaDeValidadores: string[]): ValidatorFn[] {
    const VALIDATORS = [];
    if (listaDeValidadores.includes('required')) {
      VALIDATORS.push(Validators.required);
    }
    return VALIDATORS;
  }

  /**
   * compo doc
   * @method isValid
   * @description 
   * Verifica si un campo específico del formulario es válido.
   * @param field El nombre del campo que se desea validar.
   * @returns Un valor booleano que indica si el campo es válido.
   */
  public isValid(campo: string): boolean | null {
    return this.validacionesService.isValid(this.forma, campo);
  }

}
