import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  CatalogosSelect,
  CatalogosSelectPaises,
} from '../../../core/models/shared/components.model';
import { CatalogoPaises } from '../../../core/models/5701/catalogos.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'select-paises',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './select-paises.component.html',
  styleUrl: './select-paises.component.scss',
})
export class SelectPaisesComponent {
  @Input({required: true}) catalogosPaises!: CatalogosSelectPaises;

  @Output() paisSeleccionado = new EventEmitter<CatalogoPaises>();

  pais: FormControl = new FormControl(0);

  constructor(private validacionesService: ValidacionesFormularioService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['catalogosPaises'].currentValue) {
      this.catalogosPaises = changes['catalogosPaises'].currentValue;
      if (this.catalogosPaises.required) {
        this.pais.setValidators([
          Validators.required,
          this.validacionesService.noCeroValidator(),
        ]);
        this.pais.updateValueAndValidity();
      }
    }
  }

  isValid(): boolean | null {
    return this.pais.errors && this.pais.touched;
  }

  seleccion() {
    const opcionSeleccionada = parseInt(this.pais.value);

    let seleccion: CatalogoPaises;

    (this.catalogosPaises.catalogos).forEach(
      (el: CatalogoPaises) => {
        if (el.id === opcionSeleccionada) {
          seleccion = el;
          this.paisSeleccionado.emit(seleccion);
        }
      }
    );
  }
}
