/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

@Component({
  selector: 'app-agregar-destinatoria',
  templateUrl: './agregar-destinatoria.component.html',
  styleUrl: './agregar-destinatoria.component.scss',
  standalone: true,
  imports: [TituloComponent,SelectCatalogosComponent],
})
export class AgregarDestinatoriaComponent {

  public pais!: CatalogosSelect;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public fisica: boolean = true;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  public moral: boolean = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  conatructor() {

  }

  ngOnInit(): void {
    this.getPais();
  }

  /**
   * @description getPais se utiliza para obtener los datos de los paises
   */

  public getPais() {
    this.pais = {
      labelNombre: 'País',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public docSeleccionado(e: Catalogo) {
      
  }

  /**
   * 
   * @param  checkBoxName, que acepta datos de tipo cadena
   * @description inputChecked se utiliza para verificar si el checkbox está seleccionado
   */
  public inputChecked(checkBoxName:string) {
    if(checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

}
