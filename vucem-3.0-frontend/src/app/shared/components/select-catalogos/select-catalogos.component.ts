import { Component, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() catalogosDatos!: CatalogosSelect;

  // @Output()

  public FormCatalogo: FormGroup = this.fb.group({
    seleccion: [0],
  });

  constructor(private fb: FormBuilder) {}

  seleccion() {
    const opcionSeleccionada = this.FormCatalogo.get('seleccion')?.value;

    console.log(opcionSeleccionada);
  }
}
