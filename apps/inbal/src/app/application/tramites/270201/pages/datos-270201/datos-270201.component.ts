import { Component } from '@angular/core';

@Component({
  selector: 'app-datos-270201',
  standalone: false,
  templateUrl: './datos-270201.component.html',
})
export class Datos270201Component {
indice = 1;

seleccionaTab(i:number): void{
  this.indice = i;
}
}
