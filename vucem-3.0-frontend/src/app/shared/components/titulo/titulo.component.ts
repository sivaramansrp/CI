import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-titulo',
  standalone: true,
  imports: [],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {
  @Input() titulo!: string;

}
