import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asignciontab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignciontab.component.html',
  styleUrl: './asignciontab.component.scss',
})
export class AsignciontabComponent {
  selectedValue: string = 'no';

  // opcionDeBotonDeRadio: any = [
  //   {
  //     "label": "Animales Vivos",
  //     "value": "yes"
  //   },
  //   {
  //     "label": "Productos Subproductos",
  //     "value": "no"
  //   },
  // ]
}

