import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line sort-imports
import { ConsultaTramiteComponent, TituloComponent } from '@libs/shared/data-access-user/src';


@Component({
  selector: 'menu-consulta-tramite',
  standalone: true,
    imports: [
      CommonModule,
      TituloComponent,
      ReactiveFormsModule,
      ConsultaTramiteComponent,
    ],
  templateUrl: './menu-consulta-tramite.component.html',
})
export class MenuConsultaTramiteComponent {

}
