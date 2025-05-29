import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-capturista-privado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-capturista-privado.component.html',
  styleUrl: './registro-capturista-privado.component.scss',
})
export class RegistroCapturistaPrivadoComponent {
  FormRegistroCapturistaPrivado!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
  }

  consultaCapturista() {
    this.router.navigate(['login/consulta-capturista']);
  }

  
}
