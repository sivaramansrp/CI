import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { delay } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
export class DatosDelDestinatarioComponent implements OnInit, OnDestroy {

  /**
   * Datos del formulario para inicializar los valores
   * @type {{ [key: string]: string | number | boolean | object | undefined }}
   */
  @Input() datosForm!: { [key: string]: string | number | boolean | object | undefined };

  /**
   * Evento que se emite cuando cambian los datos del formulario del destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDatosDelDestinatarioEvent: EventEmitter<undefined> = new EventEmitter<undefined>();

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
      nombres: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
      numeroDeRegistroFiscal: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
    });

    // Parcheo de valores iniciales con retraso para asegurar la renderización
    setTimeout(() => {
      if (this.datosForm) {
        this.formDatosDelDestinatario.patchValue(this.datosForm);
      }
    }, 100);
  }

  /**
   * Método del ciclo de vida OnInit de Angular
   * Configura la suscripción a los cambios del formulario
   */
  ngOnInit(): void {
    this.formDatosDelDestinatario.valueChanges
      .pipe(
        delay(100), // Retraso para evitar emisiones muy frecuentes
        takeUntil(this.destroyNotifier$) // Para desuscribirse al destruir el componente
      )
      .subscribe((_) => {
        // Emite los valores actuales del formulario
        this.formDatosDelDestinatarioEvent.emit(this.formDatosDelDestinatario.value);
        this.formaValida.emit(this.formDatosDelDestinatario.valid);
      });
  }

  /**
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
