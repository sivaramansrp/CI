import { CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

export interface MedioDeTransporte {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss'
})
export class DestinatarioComponent {

  medioDeTransporte!: MedioDeTransporte[];
}
