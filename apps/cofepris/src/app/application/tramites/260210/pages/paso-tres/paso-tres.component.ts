import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule,FirmaElectronicaComponent],
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.css',
})
export class PasoTresComponent {}
