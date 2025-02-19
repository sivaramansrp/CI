import { Component } from '@angular/core';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'app-agregar-destinatoria',
  templateUrl: './agregar-destinatoria.component.html',
  styleUrl: './agregar-destinatoria.component.scss',
})
export class AgregarDestinatoriaComponent {
  public pais!: CatalogosSelect;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  options!: Catalogo[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  conatructor() {}

  ngOnInit(): void {
    this.inicializaCatalogos();
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    this.options = [
      {
        id: 1,
        descripcion: 'Option 1',
      },
      {
        id: 2,
        descripcion: 'Option 2',
      },
      {
        id: 3,
        descripcion: 'Option 3',
      },
    ];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public docSeleccionado(e: Catalogo) {}

  /**
   *
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  public inputChecked(checkBoxName: string) {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }
}
