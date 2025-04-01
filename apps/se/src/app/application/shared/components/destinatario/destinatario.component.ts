import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';
import { delay } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss'
})
export class DestinatarioComponent implements OnInit, OnDestroy {

  /**
   * Indica si el país de destino está habilitado
   * @type {boolean}
   */
  @Input() paisDestino!: boolean;

  /**
   * Datos para los menús desplegables
   * @type {MenusDesplegables[]}
   */
  @Input() data!: MenusDesplegables[];

  /**
   * Lista de países de destino disponibles
   * @type {Catalogo[]}
   */
  @Input() paisDestin!: Catalogo[];

  /**
   * Evento que se emite cuando se selecciona un país de destino
   * @type {EventEmitter<Catalogo>}
   */
  @Output() paisDestinSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Evento que se emite cuando cambia el formulario de destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDestinatarioEvent: EventEmitter<undefined> = new EventEmitter<undefined>();

  /**
   * Valores actuales del formulario de destinatario
   * @type {{ paisDestin?: string; } | undefined}
   */
  @Input() formDestinatarioValues: { paisDestin?: string; } | undefined;

  /**
   * Datos del formulario completo
   * @type {{ [key: string]: string | number | boolean | object | undefined }}
   */
  @Input() datosForm!: { [key: string]: string | number | boolean | object | undefined };

  /**
   * FormGroup para el formulario de destinatario
   * @type {FormGroup}
   */
  formDestinatario!: FormGroup;

  /**
   * Lista de medios de transporte disponibles
   * @type {Catalogo[]}
   */
  medioDeTransporte: Catalogo[] = [];

  /**
   * Subject para manejar la destrucción del componente
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
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos
   */
  constructor(
    private fb: FormBuilder) {
    this.formDestinatario = this.fb.group({
      paisDestin: ['', [Validators.required, Validators.min(0)]],
      ciudad: [''],
      calle: ['', [Validators.required]],
      numeroLetra: ['', [Validators.required]],
      lada: [''],
      telefono: [''],
      fax: [''],
      correoElectronico: ['', [Validators.required]],
    });

    setTimeout(() => {
      if (this.datosForm) {
        this.formDestinatario.patchValue(this.datosForm);
      }
    }, 100);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
   */
  ngOnInit(): void {
    this.formDestinatario.valueChanges
      .pipe(delay(100))
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((_) => {
        this.formDestinatarioEvent.emit(this.formDestinatario.value);
        this.formaValida.emit(this.formDestinatario.valid);
      });
  }

  /**
   * Maneja la selección de un país de destino
   * @param {Catalogo} estado - El país de destino seleccionado
   */
  paisDestionSeleccion(estado: Catalogo): void {
    this.paisDestinSeleccionEvent.emit(estado)
  }

  /**
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
