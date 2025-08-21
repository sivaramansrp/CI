import { SharedModule, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-carga-por-archivo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule, TituloComponent],
  templateUrl: './carga-por-archivo.component.html',
  styleUrl: './carga-por-archivo.component.css',
})
export class CargaPorArchivoComponent {
  mostrarAlerta: boolean = false;

  cerrarModal(): void {
    this.mostrarAlerta = false;
  }

  onFileSelected(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const FILE = INPUT.files && INPUT.files[0];
    if (FILE) {
      this.mostrarAlerta = true;
    }
  }

}
