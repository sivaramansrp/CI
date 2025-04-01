import { Catalogo, CatalogoSelectComponent,TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-certificado-de',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado-de.component.html',
  styleUrl: './datos-certificado-de.component.scss'
})
export class DatosCertificadoDeComponent implements OnDestroy, OnInit {
  @Input() data!: MenusDesplegables[];
  @Input() idioma!: boolean;
  @Input() precisa!: boolean
  @Input() idiomaDatos!: Catalogo[];
  @Input() entidadFederativaDatos!: Catalogo[];
  @Input() representacionFederalDatos!: Catalogo[];
  @Output() formDatosCertificadoEvent: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() idiomaSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Output() entidadFederativaSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Output() representacionFederalSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Input() datosFormCertificado!: { [key: string]: string | number | boolean | object | undefined };
  /**
   * Emisor de eventos para indicar si el formulario es válido.
   * @type {EventEmitter<boolean>}
   */
 @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
  false
);  

  /**
   * Formulario reactivo que contiene los datos del certificado.
   * Utilizado para la validación y gestión de los datos en el formulario.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Observable que contiene la lista de idiomas disponibles.
   */
  idioma$: Catalogo[] = [];

  /**
   * Observable que contiene la lista de entidades federativas disponibles.
   */
  entidadFederativas$: Catalogo[] = [];

  /**
   * Observable que contiene la lista de representaciones federales disponibles.
   */
  representacionFederal$: Catalogo[] = [];

  /**
   * Constructor del componente. Inicializa el formulario y las dependencias necesarias.
   * @param fb Instancia del FormBuilder para la creación del formulario.
   */

  private actualizandoFormulario = false;

  constructor(
    private fb: FormBuilder,
  ) {

    /**
     * Inicialización del formulario reactivo con los controles y validaciones correspondientes.
     */
    this.formDatosCertificado = this.fb.group({
      observacionesDates: [''],
      idiomaDates: ['', [Validators.required, Validators.min(0)]],
      EntidadFederativaDates: ['', [Validators.required, Validators.min(0)]],
      representacionFederalDates: ['', [Validators.required, Validators.min(0)]],
      precisaDates: ['', this.precisa ? [Validators.required] : []]

    });

    setTimeout(() => {
      if (this.datosFormCertificado) {
        this.formDatosCertificado.patchValue(this.datosFormCertificado);
      }
    }, 100);


  }

  /**
   * Getter para acceder al control del formulario, utilizado para la validación.
   * @returns FormControl del formulario.
   */
  get formularioControl(): FormControl {
    return this.formDatosCertificado.get('') as FormControl;
  }

  /**
   * Método de ciclo de vida de Angular, se ejecuta al inicializar el componente.
   * Se utiliza para cargar los datos y suscribirse a los cambios del formulario.
   */
  ngOnInit(): void {
    /**
     * Suscripción a los cambios de valor del formulario para enviar los datos al store.
    */
    this.formDatosCertificado.valueChanges.subscribe((value) => {
      if (!this.actualizandoFormulario) {
        this.formDatosCertificadoEvent.emit(value);
        this.formaValida.emit(this.formDatosCertificado.valid);
      }
    });

  }

  /**
   * Método que selecciona un idioma y actualiza el estado en el store.
   * @param estado El estado del idioma seleccionado.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.idiomaSeleccionEvent.emit(estado);
  }

  /**
   * Método que selecciona una entidad federativa y actualiza el estado en el store.
   * @param estado El estado de la entidad federativa seleccionada.
   */
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.entidadFederativaSeleccionEvent.emit(estado);
  }

  /**
   * Método que selecciona una representación federal y actualiza el estado en el store.
   * @param estado El estado de la representación federal seleccionada.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.representacionFederalSeleccionEvent.emit(estado);
  }

  /**
   * Método de ciclo de vida de Angular, se ejecuta al destruir el componente.
   * Cancela todas las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
