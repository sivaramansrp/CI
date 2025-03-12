import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
// import { CatalogosSelect } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './derechos.component.html',
  styleUrl: './derechos.component.css',
})
export class DerechosComponent {

  derechosForm!:FormGroup;

  validarTransporteFormulario(){

  }
}
