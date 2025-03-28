import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DETALLE_MERCANCIA_TABLA,
  FORMA_FORMACEUTICA_DATOS,
} from '../../constantes/datos-solicitud.enum';
import { CommonModule } from '@angular/common';
import { DetalleMercancia } from '../../models/detalle-mercancia.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detalle-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
  ],
  templateUrl: './detalle-mercancia.component.html',
  styleUrl: './detalle-mercancia.component.scss',
})
export class DetalleMercanciaComponent implements OnInit {
  formaDetalleMercancia!: FormGroup;

  @Input() datosDetalleMercancia!: DetalleMercancia;

  tablaDetalleMercancia = DETALLE_MERCANCIA_TABLA;

  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  @Input() datosTablaDetalleMercancia!: Observable<DetalleMercancia[]>;

  datosFormFormaceutica = FORMA_FORMACEUTICA_DATOS;

  tablaMercanciasLista: DetalleMercancia[] = [];

  @Output() aggregarMercancia: EventEmitter<DetalleMercancia> =
    new EventEmitter<DetalleMercancia>(true);
  @Output() eliminarMercancia: EventEmitter<DetalleMercancia[]> =
    new EventEmitter<DetalleMercancia[]>(true);

  constructor(private fb: FormBuilder) {
    this.formaDetalleMercancia = this.fb.group({
      formaFormaceutica: ['', Validators.required],
      numeroDeRegistro: [''],
      marcasDistintivas: ['', Validators.required],
      tipoDeEnvase: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.datosDetalleMercancia) {
      this.formaDetalleMercancia.patchValue(this.datosDetalleMercancia);
    }
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    }
    return control.errors && control.touched;
  }

  eliminarMercancias(): void {
    if (this.tablaMercanciasLista) {
      this.eliminarMercancia.emit(this.tablaMercanciasLista);

    }
  }

  agregarMercancias(): void {
    if (this.formaDetalleMercancia.valid) {
      this.aggregarMercancia.emit(this.formaDetalleMercancia.value);
    }
  }
}
