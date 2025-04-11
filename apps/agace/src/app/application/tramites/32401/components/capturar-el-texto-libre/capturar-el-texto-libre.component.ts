import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TEXTOS } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-capturar-el-texto-libre',
  standalone: true,
  imports: [ TituloComponent,CommonModule,FormsModule,ReactiveFormsModule,AlertComponent ],
  templateUrl: './capturar-el-texto-libre.component.html',
  styleUrl: './capturar-el-texto-libre.component.css',
})
export class CapturarElTextoLibreComponent {
  TEXTOS = TEXTOS;

  infoAlert = 'alert-info';

  constructor(public router: Router) {
    // Constructor vacío, se puede agregar lógica adicional si es necesario.
  }

  guardarYFirmar(): void{
    this.router.navigate(['/pago/manifiesto-aereo/firmar']);
  }
}
