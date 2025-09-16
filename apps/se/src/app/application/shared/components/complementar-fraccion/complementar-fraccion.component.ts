import {
  AnexoDosEncabezado,
  AnexoUnoEncabezado,
  Catalogo,
  ComplimentarFraccion,
  ComplimentarFraccionResoponse,
} from '../../models/nuevo-programa-industrial.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
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
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param ubicaccion Servicio de ubicación para navegación.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private ubicaccion: Location, private complimentosService: ComplimentosService) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
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

  
}
