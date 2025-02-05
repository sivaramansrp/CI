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
  imports: [TituloComponent,CommonModule,AlertComponent,ReactiveFormsModule]
})
export class DatosDeLaComponent implements OnInit {

  public warningAlert = 'alert-warning';
  public TEXTOS = ELVALORALERTA;
  public formMercancia!: FormGroup;
  public booleanVariable = '#cccccc';
  public MENSAJE_REQUERIDO = REQUERIDO;
  public NUMERO_REQUERIDO = INTRODUZCA_NUMERO;



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

  ngOnInit(): void {
    
  }

  /**
   * 
   * @description createFormMercancia se utiliza para crear un nombre de formulario como formMercancia que contiene 5 campos en su
   * @returns Validaciones del formulario
   */

  public createFormMercancia() {
    this.formMercancia =  this.fb.group({
      nombreComercial: ['',Validators.required],
      nombreIngles: ['',Validators.required],
      fraccionArancelaria: ['816346',[Validators.maxLength(8),Validators.pattern(this.validacionesService.patronDeNumero)]],
      descripcion: ['Usados, excepto lo comprendido en la fracción arancelaria 8704.21.01'],
      valorTransaccion: ['123.0000',Validators.maxLength(20)]
    });

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
