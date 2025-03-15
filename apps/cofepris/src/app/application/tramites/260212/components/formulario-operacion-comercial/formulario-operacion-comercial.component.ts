import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-formulario-operacion-comercial',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent],
  templateUrl: './formulario-operacion-comercial.component.html',
  styleUrl: './formulario-operacion-comercial.component.scss',
})
export class FormularioOperacionComercialComponent {
  clave: Catalogo[] = [
    {
      id: 1,
      descripcion: 'SINALOA',
    },
    {
      id: 2,
      descripcion: 'Opción 1',
    }
  ];

  isReadonly = true;

  toggleReadonly(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isReadonly = !checkbox.checked;
  }
}
