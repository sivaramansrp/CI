import { Catalogo, ComplimentarFraccion, ComplimentarFraccionResoponse } from '../../models/se-shared.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';



@Component({
  selector: 'app-complementar-fraccion',
  standalone: true,
  imports: [CommonModule, TituloComponent, CatalogoSelectComponent,
    ReactiveFormsModule
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
   * Evento para emitir los datos de complementar fracción.
   */
  @Output() emitirComplimentarFraccionDatos: EventEmitter<ComplimentarFraccionResoponse> = new EventEmitter<ComplimentarFraccionResoponse>(true);

  /**
   * Formulario para complementar fracción.
   */
  public complimentarForm!: FormGroup;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param ubicaccion Servicio de ubicación para navegación.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, private ubicaccion: Location) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.createComplimentarForm();
    this.complimentarForm.statusChanges.pipe(
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap(() => {
        this.emitirComplimentarFraccionDatos.emit(this.complimentarForm.value);
      })
    ).subscribe();
  }

  /**
   * Crea el formulario del Anexo Uno.
   */
  createComplimentarForm(): void {
    this.complimentarForm = this.fb.group({
      catagoria: [this.complimentarFraccionDatos.catagoria, Validators.required],
      descripcion: [this.complimentarFraccionDatos.descripcion, Validators.required],
      monedaNacionalMensual: [this.complimentarFraccionDatos.monedaNacionalMensual, Validators.required],
      monedaNacionalDeDosPeriodos: [this.complimentarFraccionDatos.monedaNacionalDeDosPeriodos, Validators.required],
      volumenMensual: [this.complimentarFraccionDatos.volumenMensual, Validators.required],
      twoPeriodVolume: [this.complimentarFraccionDatos.twoPeriodVolume, Validators.required],
    });
  }

  /**
   * Método para seleccionar categoría.
   */
  catagoriaSeleccion(): void {
    this.emitirComplimentarFraccionDatos.emit(this.complimentarForm.value);
  }

  /**
   * Método para regresar a la ubicación anterior.
   */
  goBack(): void {
    this.ubicaccion.back();
  }
}

