import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

@Component({
  selector: 'select-catalogos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './select-catalogos.component.html',
  styleUrl: './select-catalogos.component.scss',
})
export class SelectCatalogosComponent {
  @Input() catalogos_datos!: CatalogosSelect;

  @Output() valorSelección = new EventEmitter<Catalogo>();

  tipo_solicitud: FormControl = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['catalogos_datos'].currentValue) {
      this.catalogos_datos = changes['catalogos_datos'].currentValue;
      if (this.catalogos_datos.required) {
        this.tipo_solicitud.setValidators([Validators.required]);
        this.tipo_solicitud.updateValueAndValidity();
      }
    }
  }

  isValid() {
    return this.tipo_solicitud.errors && this.tipo_solicitud.touched;
  }

  seleccion() {
    const opcionSeleccionada = parseInt(this.tipo_solicitud.value);

    let seleccion: Catalogo;

    this.catalogos_datos.catalogos.forEach((el: Catalogo) => {
      if (el.id === opcionSeleccionada) {
        seleccion = el;
        this.valorSelección.emit(seleccion);
      }
    });
  }
}
