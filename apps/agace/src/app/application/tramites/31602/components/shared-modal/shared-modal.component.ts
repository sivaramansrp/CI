import { Component, EventEmitter, Input, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.scss',
    animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })),
      ]),
    ]),
  ]
})
export class SharedModalComponent {
  @Input() visible = false;
  @Input() message = '';
  @Output() closed = new EventEmitter<void>();

  onClose():void {
    this.closed.emit();
  }
}
