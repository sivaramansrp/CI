import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() titulo: string = '';
  @Input() body: string = '';
  @Input() confirmarBtnTxt: string = 'Confirmar';
  @Input() cancelarBtnTxt: string = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmar() {
    this.confirm.emit();
  }

  cancelar() {
    this.cancel.emit();
  }
}
