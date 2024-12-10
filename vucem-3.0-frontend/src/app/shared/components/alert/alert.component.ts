import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() CONTENIDO!: string;

}
