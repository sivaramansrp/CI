import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import {
  FormControl,
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
  @Input() catalogosDatos!: CatalogosSelect;

  @Output() valorSelección = new EventEmitter<Catalogo>();

  tipoSolicitud: FormControl = new FormControl(0);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['catalogosDatos'].currentValue) {
      this.catalogosDatos = changes['catalogosDatos'].currentValue;
      if (this.catalogosDatos.required) {
        this.tipoSolicitud.setValidators([Validators.required]);
        this.tipoSolicitud.updateValueAndValidity();
      }
    }
  }

  /**
   *
   * @returns
   */
  isValid() {
    return this.tipoSolicitud.errors && this.tipoSolicitud.touched;
  }

  seleccion() {
    const opcionSeleccionada = parseInt(this.tipoSolicitud.value);

    let seleccion: Catalogo;

    this.catalogosDatos.catalogos.forEach((el: Catalogo) => {
      if (el.id === opcionSeleccionada) {
        seleccion = el;
        this.valorSelección.emit(seleccion);
      }
    });
  }
}
