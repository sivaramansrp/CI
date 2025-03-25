import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css',
})
export class DetallesComponent implements OnInit{
  estado: Catalogo[] = [];

  detallas!:FormGroup

    constructor(
      private fb: FormBuilder,
      private readonly httpServicios: HttpClient,
    ) {
      // Dependencia inyectada para uso posterior
    }

    ngOnInit(): void {
      this.detallas = this.fb.group({
        medio:[],
        rutaCompleta:[],
        puertoDeEmbarque:[],
        puertoDeDesembarque:[]
      })
      this.obtenerEstadoList()
    }
  
    /**
 * Obtiene la lista de estados desde un archivo JSON.
 */
    obtenerEstadoList(): void {
      this.httpServicios
        .get<RespuestaCatalogos>('../../../../../assets/json/110208/seleccion.json')
        .subscribe((data): void => {
          const DATOS = data?.data;
          this.estado = DATOS;
        });
    }
}
