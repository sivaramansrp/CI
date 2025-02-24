import { Component } from '@angular/core';

@Component({
  selector: 'app-cortina-a-la-italiana',
  templateUrl: './cortina-a-la-italiana.component.html',
})
export class CortinaALaItalianaComponent {
  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
