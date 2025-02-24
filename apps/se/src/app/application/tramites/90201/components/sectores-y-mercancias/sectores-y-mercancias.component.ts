/* eslint-disable sort-imports */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { ExpansionDeProductoresService } from 'libs/shared/data-access-user/src/core/services/90201/expansion-de-productores.service';
import { map, merge } from 'rxjs';
import { Sectoresy } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';



@Component({
  selector: 'app-sectores-y-mercancias',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    AlertComponent],
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.css',
})
export class SectoresYMercanciasComponent {

public sectorCatalogo: Catalogo[] = [];
public TEXTOS = Sectoresy;

  constructor(private _expansionDesvc: ExpansionDeProductoresService) {

  }

  ngOnInit(): void {
    this.inicializaCatalogos();
  }


  private inicializaCatalogos(): void {
    const CATALOGO$ = this._expansionDesvc
      .getSectorCatalog()
      .pipe(
        map((resp) => {
          this.sectorCatalogo = resp.data;
      })
    );


    merge(
      CATALOGO$,
    ).subscribe();

  }


  public sectorSeleccion() {
    const storeData = 'store selection data';
  }
}
