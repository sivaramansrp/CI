import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-mercancias-destruidas-forma',
  standalone: true,
  imports: [TituloComponent, CatalogoSelectComponent],
  templateUrl: './mercancias-destruidas-forma.component.html',
  styleUrl: './mercancias-destruidas-forma.component.scss'
})
export class MercanciasDestruidasFormaComponent implements OnInit {
  /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} unidadMedida
   */
  unidadMedida: Catalogo[] = [];

    constructor(
      // private fb: FormBuilder,
      private readonly catalogosService: CatalogosService,
    ) {}
  ngOnInit(): void {
    this.obtenerUnidadDesplegable();
  }
  /**
   * Obtiene las listas desplegables.
   * @method obtenerUnidadDesplegable
   */
  obtenerUnidadDesplegable(): void {
    this.obtenerUnidadMedidaSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerUnidadMedidaSelectList
   */
  obtenerUnidadMedidaSelectList(): void {
    this.catalogosService
      .obtenerUnidadDesplegable('unidad-de-medida.json')
      .subscribe((data: Catalogo[]) => {
        this.unidadMedida = data;
      });
  }


  
}
