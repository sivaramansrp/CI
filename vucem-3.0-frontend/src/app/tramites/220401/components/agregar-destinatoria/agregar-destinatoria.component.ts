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

  conatructor() {

  }

  ngOnInit(): void {
    this.getPais();
  }

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

  public docSeleccionado(e: Catalogo) {
      
  }

}
