import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Catalogo } from '../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'select-catalogos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select-catalogos.component.html',
  styleUrl: './select-catalogos.component.scss',
  host: { 'hostID': crypto.randomUUID().toString() }
})
export class SelectCatalogosComponent {
  @Input() catalogosDatos!: CatalogosSelect;

  @Output() valorSeleccion = new EventEmitter<Catalogo>();

  itemSeleccionado: FormControl = new FormControl(0);

  constructor(private validacionesService: ValidacionesFormularioService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['catalogosDatos'].currentValue) {
      this.catalogosDatos = changes['catalogosDatos'].currentValue;
      if (this.catalogosDatos.required) {
        this.itemSeleccionado.setValidators([
          Validators.required,
          this.validacionesService.noCeroValidator(),
        ]);
        this.itemSeleccionado.updateValueAndValidity();
      }
    }
  }

  isValid(): boolean | null {
    return this.itemSeleccionado.errors && this.itemSeleccionado.touched;
  }

  seleccion() {
    const opcionSeleccionada = parseInt(this.itemSeleccionado.value);

    let seleccion: Catalogo;

    this.catalogosDatos.catalogos.forEach((el: Catalogo) => {
      el.id = (typeof(el.id) === 'string') ? parseInt(el.id) : el.id;
      if (el.id === opcionSeleccionada) {
        seleccion = el;
        this.valorSeleccion.emit(seleccion);
      }
    });
  }
}
