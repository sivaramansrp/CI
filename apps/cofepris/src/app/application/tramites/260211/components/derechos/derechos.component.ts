import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
// import { CatalogosSelect } from '@ng-mf/data-access-user';
import { Catalogo, TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';



@Component({
  selector: 'app-derechos',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,CatalogoSelectComponent],
  templateUrl: './derechos.component.html',
  styleUrl: './derechos.component.css',
})
export class DerechosComponent {
  // aduanas: Catalogo[];
  derechosForm!:FormGroup;

  validarTransporteFormulario(){
}
}
