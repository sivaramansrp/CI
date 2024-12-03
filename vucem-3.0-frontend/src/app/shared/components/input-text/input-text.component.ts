import { Component, Input } from '@angular/core';
import { DatosInput } from '../../../core/models/shared/components.model';

@Component({
  selector: 'input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() data_input!: DatosInput;



}
