import { Component, OnInit } from '@angular/core';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { TipoPersona } from '../../../../core/enums/tipoPersona.enum';

@Component({
  selector: 'app-agregar-destinatario',
  templateUrl: './agregar-destinatario.component.html',
  styleUrl: './agregar-destinatario.component.scss',
})
export class AgregarDestinatarioComponent implements OnInit {
  public pais!: CatalogosSelect;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  options!: Catalogo[];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

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
  public static docSeleccionado(e: Catalogo): void {}

  /**
   *
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  inputChecked(checkBoxName: string): void {
    if (checkBoxName === TipoPersona.FISICA) {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }
}
