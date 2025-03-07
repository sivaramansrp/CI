/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

@Component({
  selector: 'app-agregar-cuenta',
  standalone: true,
  imports: [CommonModule, TituloComponent,CatalogoSelectComponent],
  templateUrl: './agregar-cuenta.component.html',
  styleUrl: './agregar-cuenta.component.scss',
})
export class AgregarCuentaComponent {

  public tipoDePersona!: Catalogo[];

  constructor() { 
    //
  }

  ngOnInit(): void {
    this.getTipoDePersona();
  }

  getTipoDePersona() {
    this.tipoDePersona = [
      { id: 1, descripcion: 'Moral' },
      { id: 2, descripcion: 'Física' },
    ];
  }

  public tipoDePersonaSeleccion() {

  }
}
