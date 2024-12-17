import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogosSelect } from '../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'select-catalogos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select-catalogos.component.html',
  styleUrl: './select-catalogos.component.scss',
})
export class SelectCatalogosComponent {
  @Input() catalogos_datos!: CatalogosSelect;

  @Output() valorSelección = new EventEmitter<Catalogo>();

  public FormCatalogo: FormGroup = this.fb.group({
    seleccion: [0],
  });

  constructor(private fb: FormBuilder) {}

  seleccion() {
    const opcionSeleccionada = parseInt(
      this.FormCatalogo.get('seleccion')?.value
    );

    let seleccion: Catalogo;

    this.catalogos_datos.catalogos.forEach((el: Catalogo) => {
      if (el.id === opcionSeleccionada) {
        seleccion = el;
        this.valorSelección.emit(seleccion);
      }
    });
  }
}
