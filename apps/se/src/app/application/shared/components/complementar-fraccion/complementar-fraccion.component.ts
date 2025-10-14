import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
  Catalogo,
  ComplimentarFraccion,
  ComplimentarFraccionResoponse,
} from '../../models/nuevo-programa-industrial.model';
import { ComplementarState, ComplementarStore } from '../../../estados/tramites/complementar.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ComplementarQuery } from '../../../estados/queries/complementar.query';
import { ComplimentosService } from '../../services/complimentos.service';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RestringirNegativosDirective } from '@libs/shared/data-access-user/src/tramites/directives/restringir-negativos/restringir-negativos.directive';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-complementar-fraccion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    RestringirNegativosDirective
  ],
  templateUrl: './complementar-fraccion.component.html',
  styleUrl: './complementar-fraccion.component.scss',
})
/**
 * Componente para complementar fracción.
 */
export class ComplementarFraccionComponent implements OnInit {
  /**
   * Datos de la categoría seleccionada.
   */
  @Input() catagoriaSeleccionDatos!: Catalogo[];

  /**
   * Datos para complementar fracción.
   */
  @Input() complimentarFraccionDatos!: ComplimentarFraccion;

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Evento para emitir los datos de complementar fracción.
   */
  @Output()
  emitirComplimentarFraccionDatos: EventEmitter<ComplimentarFraccionResoponse> =
    new EventEmitter<ComplimentarFraccionResoponse>(true);

  /**
   * Formulario para complementar fracción.
   */
  public complimentarForm!: FormGroup;

  /**
   * Evento que se emite al cerrar el popup.
   * 
   * Se utiliza para notificar al componente padre que el popup ha sido cerrado.
   */
  @Output() cerrarPopup = new EventEmitter<void>();

  /**
   * Fila seleccionada del tipo AnexoUnoEncabezado.
   * Se utiliza para almacenar y manipular la fila actualmente activa o seleccionada en la tabla.
   */
  selectedRow: AnexoUnoEncabezado | null = null;

  /**
   * Fila seleccionada del tipo AnexoDosEncabezado.
   * Permite gestionar la fila activa o seleccionada dentro de la tabla correspondiente al Anexo Dos.
   */
  selectedDosRow: AnexoDosEncabezado | null = null;

  /**
    *  * compodoc
   * @property {Subject<void>} destroyNotifier$
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
     * Estado de la solicitud 221601, que contiene los valores actuales de la solicitud.
     */
    public complementarState!: ComplementarState;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param ubicaccion Servicio de ubicación para navegación.
   */
  // eslint-disable-next-line no-empty-function
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private complimentosService: ComplimentosService,
    private complementarStore: ComplementarStore,
    private complementarQuery: ComplementarQuery
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
  this.complementarQuery.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.complementarState = seccionState as ComplementarState;
      })
    )
    .subscribe();

 this.complimentosService.anexoUnoFilaSeleccionada$.subscribe(row => {
   this.selectedRow = row;
   this.crearFormularioComplimentar();
   if (this.formularioDeshabilitado) {
     this.complimentarForm.disable();
   }
 });

   this.complimentosService.anexoDosFilaSeleccionada$.subscribe(row => {
    this.selectedDosRow = row;
    this.crearFormularioComplimentar();
    if (this.formularioDeshabilitado) {
      this.complimentarForm.disable();
    }
  });

  if (!(this.complementarState.tipoCategoriaOptions.length)) {
    this.obtenertipoCatagoriaOptions('ENU_TIPO_CATEGORIA');
  } else {
    this.catagoriaSeleccionDatos = [...this.complementarState.tipoCategoriaOptions];
  }
}

/** Obtiene y actualiza las opciones del catálogo de tipo de categoría desde el servicio. */
  obtenertipoCatagoriaOptions(tipo: string): void {
    this.complimentosService.getTipoCategoria(tipo)
    .pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe((res) => {
      this.complementarStore.setTipoCategoriaOptions(res.datos);
      this.catagoriaSeleccionDatos = res.datos;
    });
  }

  /**
   * Crea el formulario del Anexo Uno.
   */
  crearFormularioComplimentar(): void {
    const ROW = this.selectedRow || this.selectedDosRow;
    this.complimentarForm = this.fb.group({
      catagoria: [
        this.complimentarFraccionDatos.catagoria,
        Validators.required,
      ],
      descripcion: [
        { value: ROW?.encabezadoDescripcionComercial, disabled: true },
        Validators.required,
      ],
      monedaNacionalMensual: [
        this.complimentarFraccionDatos.monedaNacionalMensual,
        Validators.required,
      ],
      monedaNacionalDeDosPeriodos: [
        this.complimentarFraccionDatos.monedaNacionalDeDosPeriodos,
        Validators.required,
      ],
      volumenMensual: [
        this.complimentarFraccionDatos.volumenMensual,
        Validators.required,
      ],
      twoPeriodVolume: [
        this.complimentarFraccionDatos.twoPeriodVolume,
        Validators.required,
      ],
    });
  }

  /**
   * Método para seleccionar categoría.
   */
  seleccionGuardar(): void {
    this.emitirComplimentarFraccionDatos.emit(this.complimentarForm.value);
  }

  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regresar(): void {
    this.cerrarPopup.emit();
  }

  /**
   * Restringe la entrada del usuario a solo números positivos.
   * 
   * Este método se ejecuta cuando el usuario ingresa un valor en un campo del formulario.
   * Elimina cualquier carácter que no sea un dígito (`0-9`) del valor ingresado,
   * actualiza el campo del formulario correspondiente sin emitir eventos de cambio.
   * 
   * @param event Evento de entrada generado por el campo de texto.
   * @param fieldName Nombre del campo del formulario que se desea actualizar.
   */
  onIngreseNumerosPositivos(event: Event, fieldName: string): void {
  const TARGET = event.target as HTMLInputElement;
  let value = TARGET.value;
  value = value.replace(/\D/g, '');
  TARGET.value = value;
  this.complimentarForm.get(fieldName)?.setValue(value, { emitEvent: false });
}
}
