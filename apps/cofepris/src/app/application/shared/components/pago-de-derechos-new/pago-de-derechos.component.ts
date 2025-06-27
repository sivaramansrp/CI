import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FECHA } from '../../constantes/pago-de-derechos.enum';

/**
 * Componente que representa el formulario de pago de derechos.
 * Permite capturar y gestionar los datos relacionados con el pago.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnChanges {
  //shared compoennt ahe ha
  /**
   * Formulario reactivo que captura los datos del pago de derechos.
   */
  @Input() formularioPagoDerechos!: FormGroup;

  /**
   * Lista de bancos disponibles para seleccionar.
   */
  @Input() banco!: Catalogo[];

  /**
   * Fecha de pago seleccionada o ingresada.
   */
  @Input() fecPago!: Date | string;
  
  /**
   * Indica si el formulario está deshabilitado.
   * Si es true, el formulario no se puede editar.
   */

  @Input() isDisabled: boolean = false;

  /**
   * Configuración de la fecha final para el campo "Fecha de Pago".
   */
  configuracionFechaFinal: InputFecha = FECHA;

  /**
   * Evento emitido para establecer valores en el store.
   * Contiene el formulario, el campo a actualizar y el nombre del método.
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    formularioPagoDerechos: FormGroup;
    campo: string;
  }>();

  /**
   * Constructor del componente.
   */
  constructor() {
    //
  }

 
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formularioPagoDerechos)
      // Verifica si el formulario ha cambiado y actualiza su estado
      if (changes['isDisabled']) {
        if (this.isDisabled) {
          //set kela pn nhi zale
          //nhi he bghte
        // this.fecPago = changes['fecPago'].currentValue;
        // if(this.fecPago){
        // this.formularioPagoDerechos.patchValue({
        //           fecPago: this.fecPago
        //   });
        // }
        this.formularioPagoDerechos.disable();
        }else{
          this.formularioPagoDerechos.enable();
        }
      }
    }
  /**
   * Capitaliza el valor ingresado en un campo y lo guarda en el store.
   * campo - Nombre del campo del formulario.
   * nombreMetodo - Nombre del método del store a invocar.
   * evento - Evento de entrada del usuario.
   */
  capitalizarYGuardar(campo: string, nombreMetodo: string, evento: Event): void {
    const ELEMENTO_INPUT = evento.target as HTMLInputElement;
    const VALOR_CAPITALIZADO = ELEMENTO_INPUT.value.toUpperCase();
    this.formularioPagoDerechos.get(campo)?.setValue(VALOR_CAPITALIZADO);
    this.setValoresStore(this.formularioPagoDerechos, campo);
  }

  /**
   * Establece valores en el store.
   * formularioPagoDerechos - El formulario reactivo.
   * campo - El campo a actualizar.
   */
  setValoresStore(
    formularioPagoDerechos: FormGroup,
    campo: string
  ): void {
    this.setValoresStoreEvent.emit({
      formularioPagoDerechos,
      campo
    });
  }
}