import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * Componente que gestiona el formulario de pago de derechos de importación o exportación.
 * El formulario permite capturar información sobre la mercancía y el pago de derechos, y realiza 
 * la validación de campos y la habilitación/deshabilitación de ciertos campos según las selecciones del usuario.
 * 
 * @export
 * @class PagoDeDerechoComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  styleUrls: ['./pago-de-derecho.component.scss'],
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, FormsModule, CatalogoSelectComponent],
  standalone: true,
})
export class PagoDeDerechoComponent implements OnInit {
  FormSolicitud!: FormGroup; // Objeto de formulario reactivo para manejar los datos del formulario
  
  answer: string = ''; // Respuesta seleccionada por el usuario
  
  public Justificacion!: Catalogo[]; // Opciones disponibles para justificar el pago
  public Banco!: Catalogo[]; // Opciones disponibles para seleccionar el banco

  constructor(private fb: FormBuilder) { }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método:
   * - Se inicializan las opciones de justificación y banco llamando a `getJustificacion()` y `getBanco()`.
   * - Se define el grupo de formulario `FormSolicitud` con sus controles, validadores y valores iniciales.
   * - Se configura la lógica que habilita o deshabilita campos dependiendo de la selección del valor `exentoDePago`.
   * 
   * @memberof PagoDeDerechoComponent
   */
  ngOnInit(): void {
    this.getJustificacion();  // Obtiene las opciones para justificar el pago
    this.getBanco();           // Obtiene las opciones para seleccionar el banco
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        Justificacion: ['', Validators.required],
        nombreImportExport: ['', Validators.required],
        rfcImportExport: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        Banco: ['', Validators.required],
        llaveDePago: ['', Validators.required],
        fechaPago: [' ', Validators.required],
        importePago: ['', Validators.required],
      }),
    });

    // Se activa la lógica para actualizar campos según el valor inicial de 'exentoDePago'
    this.updateFormFieldsBasedOnExentoDePago('No');

    // Escucha los cambios en el valor de 'exentoDePago' y actualiza los campos del formulario
    this.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.valueChanges.subscribe((value) => {
      this.updateFormFieldsBasedOnExentoDePago(value);
    });
  }

  /**
   * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
   * 
   * Si el valor es 'No', se habilitan los campos necesarios y se asignan valores predeterminados.
   * Si el valor es 'Sí', los campos se deshabilitan y se resetean.
   * 
   * @param value - El valor de 'exentoDePago' para determinar cómo actualizar los campos del formulario.
   * @memberof PagoDeDerechoComponent
   */
  updateFormFieldsBasedOnExentoDePago(value: string): void {
    if (value === 'No') {
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.setValue('454000554');
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('0001012A0000EX');
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.setValue('594.0');
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.enable();
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.enable();
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
    } else {
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.reset();
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.disable();
    }
  }

  /**
   * Obtiene las opciones de justificación para el pago de derechos.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getJustificacion(): void {
    this.Justificacion = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Obtiene las opciones de banco disponibles.
   * 
   * En este caso, las opciones son 'Sí' o 'No'.
   * 
   * @memberof PagoDeDerechoComponent
   */
  public getBanco(): void {
    this.Banco = [
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ];
  }

  /**
   * Método que puede extenderse para manejar la selección de justificación.
   * 
   * @memberof PagoDeDerechoComponent
   */
  JustificacionSeleccion(): void { }

  /**
   * Método que puede extenderse para manejar la selección del banco.
   * 
   * @memberof PagoDeDerechoComponent
   */
  BancoSeleccion(): void { }

  /**
   * Método para validar el formulario y registrar los valores si el formulario es válido.
   * 
   * Este método actualmente no realiza ninguna acción, pero se puede extender para realizar el registro o envío de los datos.
   * 
   * @memberof PagoDeDerechoComponent
   */
  validarFormulario() { }
}
