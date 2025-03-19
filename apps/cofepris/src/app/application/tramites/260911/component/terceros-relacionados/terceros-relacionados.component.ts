import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [CommonModule,TituloComponent, ReactiveFormsModule,AlertComponent],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
})
export class TercerosRelacionadosComponent {
  tercerosRelacionadosForm!: FormGroup;
  TEXTOS = TEXTOS;
}
