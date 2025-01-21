import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';

@Component({
  selector: 'representante-fiscal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UppercaseDirective],
  templateUrl: './representante-fiscal.component.html',
  styleUrl: './representante-fiscal.component.scss',
})
export class RepresentanteFiscalComponent {
  // Componente para representante fiscal

  rfcBusqueda: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.validacionesService.rfcPattern),
  ]);

  representanteLegalForm!: FormGroup;

  constructor(
    private validacionesService: ValidacionesFormularioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearRepresentanteLegalForm();
  }

  /**
   * Retorna un booleano si el campo no contiene errores
   * @returns {boolean | null}
   */
  isValid(): boolean | null {
    return this.validacionesService.validaFormControl(this.rfcBusqueda);
  }

  /**
   * Retorna un booleano si el campo tiene un error de pattern
   * @returns {boolean | null}
   */
  errorPattern(): boolean | null {
    return this.validacionesService.errorPatternControl(this.rfcBusqueda);
  }

  /**
   * Retorna un booleano si el campo tiene un error de requerido
   * @returns {boolean | null}
   */
  errorRequerido() {
    return this.validacionesService.errorCampoRequeridoControl(
      this.rfcBusqueda
    );
  }

  /**
   * Crea el formulario para representante legal
   * @returns {void}
   */
  crearRepresentanteLegalForm(): void {
    this.representanteLegalForm = this.fb.group({
      rfc: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.maxLength(13),
          Validators.pattern(this.validacionesService.rfcPattern),
        ],
      ],
      nombre: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
      aPaterno: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
      aMaterno: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(250)],
      ],
      telefono: [null, [Validators.required, Validators.maxLength(15)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.validacionesService.correoPattern),
        ],
      ],
    });
  }

  /**
   * Busqueda de representante fiscal por RFC
   * @returns {void}
   */
  buscarRepresentanteFiscal(): void {
    console.log('Busqueda de representante fiscal');

    const datosRepresentante = {};

    if (datosRepresentante) {
      this.representanteLegalForm.patchValue(datosRepresentante);
    } else {
      console.log('Se activan los campos del formulario');
    }
  }
}
