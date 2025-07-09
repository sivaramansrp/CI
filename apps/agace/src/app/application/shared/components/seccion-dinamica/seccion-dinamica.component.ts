import { Component, Input, QueryList, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeccionDinamica } from '@libs/shared/data-access-user/src/core/models/shared/seccion-dinamica.model';

@Component({
  selector: 'seccion-dinamica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seccion-dinamica.component.html',
  styleUrl: './seccion-dinamica.component.scss',
})
export class SeccionDinamicaComponent {
  @ViewChildren('contenedorDinamico', { read: ViewContainerRef }) contenedores!: QueryList<ViewContainerRef>;

  @Input() secciones: SeccionDinamica[] = [];

  public indiceAbierto: number | null = null;

  acordeonAbierto(index: number): void {
    if (this.indiceAbierto === index) {
      this.indiceAbierto = null;
    } else {
      this.indiceAbierto = index;
      setTimeout(() =>
        this.cargarComponente(index)
      , 0);
    }
  }

  cargarComponente(index: number): void {
    const SECCION = this.secciones[index];
    const VIEW_CONTAINER = this.contenedores.get(index);
    if (!VIEW_CONTAINER) {
      return;
    }
    VIEW_CONTAINER.clear();
    VIEW_CONTAINER.createComponent(SECCION.componentClase as Type<unknown>);
  }
}
