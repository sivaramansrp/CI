/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-agregar-destinatoria',
  templateUrl: './agregar-destinatoria.component.html',
  styleUrl: './agregar-destinatoria.component.scss',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent],
})
export class AgregarDestinatoriaComponent implements OnInit {

  public pais!: Catalogo[];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function
  constructor() { }

  ngOnInit(): void {
    this.getPais();
  }

  /**
   * @description getPais se utiliza para obtener los datos de los paises
   */

  public getPais(): void {
    this.pais = [
      {
        id: 1,
        descripcion: 'Opción 1',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      }
    ]
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-function, @typescript-eslint/no-unused-vars, class-methods-use-this
  docSeleccionado(): void { }

  /**
   * 
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  public inputChecked(checkBoxName: string): void {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

}
