import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '../../servicios/catalogo.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
// import { Tramite32516Query } from '../../estados/tramite32516Query.query';
// import { Tramite32516Store } from '../../estados/tramite32516Store.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'tipo-de-aviso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, HttpClientModule],
  templateUrl: './tipo-de-aviso.component.html',
  styleUrls: ['./tipo-de-aviso.component.scss']
})
export class TipoDeAvisoComponent implements OnInit, OnDestroy {
  solicitudForm! : FormGroup;

  /**
   * Subject utilizado para gestionar la desuscripción de observables.
   * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
   * @property {Subject<void>} unsubscribe$
   * @private
   */
  private unsubscribe$ = new Subject<void>(); 

    /**
   * Configuración para el select de unidad de medida.
   * @property {CatalogosSelect} actaDeHechos
   */
    actaDeHechos: Catalogo[] = [];

    constructor(
      private fb: FormBuilder,
      private readonly httpServicios: HttpClient,
      private readonly catalogosService: CatalogosService,
  
    ) { }
    ngOnInit(): void {
      this.obtenerListasDesplegables();
    }
      /**
   * Obtiene las listas desplegables.
   * @method obtenerListasDesplegables
   */
  obtenerListasDesplegables(): void {
    this.obtenerHechosSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerHechosSelectList
   */
  obtenerHechosSelectList(): void {
    this.catalogosService.obtenerMenuDesplegable('catalogo.json').subscribe((data: Catalogo[]) => {
      this.actaDeHechos = data;
    });
  }

      /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   */
      ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
      }
}
