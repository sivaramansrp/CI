import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { SECTOR_PRODUCTIVO, SERVICIO_CATALOGO } from '../../constantes/adace32606.enum';

@Component({
  selector: 'app-datos-comunes',
  standalone: true,
  imports: [CommonModule,CatalogoSelectComponent],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.css',
})
export class DatosComunesComponent {

   public sectorProductivo = SECTOR_PRODUCTIVO;
   public servicioCatalogo = SERVICIO_CATALOGO;
}
