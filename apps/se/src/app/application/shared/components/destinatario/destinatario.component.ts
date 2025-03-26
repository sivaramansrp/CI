import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input } from '@angular/core';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { ReactiveFormsModule } from '@angular/forms';

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
  @Input() paisDestino!: boolean;
  @Input() data!: MenusDesplegables[];

  medioDeTransporte: Catalogo[] = [];
  
}
