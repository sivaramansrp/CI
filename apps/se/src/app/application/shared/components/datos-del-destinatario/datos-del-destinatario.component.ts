import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
export class DatosDelDestinatarioComponent implements OnDestroy {

  /**
   * Datos del formulario para inicializar los valores
   * @type { [key: string]: unknown }
   */
  @Input() datosForm!:{ [key: string]: unknown };

  /**
   * Evento que se emite cuando cambian los datos del formulario del destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDatosDelDestinatarioEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();


  /**
   * FormGroup para el formulario de datos del destinatario
   * @type {FormGroup}
   */
  formDatosDelDestinatario!: FormGroup;

  /**
   * Subject para manejar la destrucción de suscripciones
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

   /**
   * Emisor de eventos para indicar si el formulario es válido.
   * @type {EventEmitter<boolean>}
   */
 @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
  false
);  
  /**
   * Constructor del componente
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos
   */
  constructor(private fb: FormBuilder) {
    this.formDatosDelDestinatario = this.fb.group({
      nombres: [''],
      primerApellido: [''],
      segundoApellido: [''],
      numeroDeRegistroFiscal: [''],
      razonSocial: [''],
    });

    // Parcheo de valores iniciales con retraso para asegurar la renderización
    setTimeout(() => {
      if (this.datosForm) {
        this.formDatosDelDestinatario.patchValue(this.datosForm);
      }
    }, 100);
  }

  /**
   * Establece valores en el store y emite eventos relacionados con el formulario.
   *
   * @param formGroupName - El nombre del grupo de formulario al que pertenece el campo.
   * @param campo - El nombre del campo cuyo valor se desea obtener y procesar.
   * @param storeStateName - El nombre del estado en el store asociado al campo.
   * 
   * @remarks
   * Este método obtiene el valor de un campo específico del formulario `formDatosDelDestinatario`,
   * emite un evento para indicar si el formulario es válido y otro evento con los datos del campo
   * y su estado asociado en el store.
   */
  setValoresStore(formGroupName: string, campo: string, storeStateName: string):void {    
    const VALOR = this.formDatosDelDestinatario.get(campo)?.value;    
    this.formaValida.emit(this.formDatosDelDestinatario.valid);
    this.formDatosDelDestinatarioEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }

  /**
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
