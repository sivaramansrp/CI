import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profiles-mansajeria',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './profiles-mansajeria.component.html',
  styleUrl: './profiles-mansajeria.component.css',
})
export class ProfilesMansajeriaComponent {
  profileForm!:FormGroup;
  mostrarContenido = false;
  constructor(private fb: FormBuilder) {
}

alternarContenido(): void {
  this.mostrarContenido = !this.mostrarContenido;
}
}
