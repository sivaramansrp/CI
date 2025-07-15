import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-terceros-relacinados',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './terceros-relacinados.component.html',
  styleUrl: './terceros-relacinados.component.css',
})
export class TercerosRelacinadosComponent {
  public tercerosRelacionadosForm !: FormGroup
}
