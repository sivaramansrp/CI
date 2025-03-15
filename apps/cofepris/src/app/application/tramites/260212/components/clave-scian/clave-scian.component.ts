import { Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';




@Component({
  selector: 'app-clave-scian',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent, CatalogoSelectComponent],
  templateUrl: './clave-scian.component.html',
  styleUrl: './clave-scian.component.scss',
})
export class ClaveScianComponent {
  @Output() cancel = new EventEmitter<void>();

  cancelar() {
    this.cancel.emit(); // Emit event to parent
  }
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
}
