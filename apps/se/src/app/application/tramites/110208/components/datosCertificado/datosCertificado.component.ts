import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datos-certificado',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './datosCertificado.component.html',
  styleUrl: './datosCertificado.component.css',
})
export class DatosCertificadoComponent implements OnInit,OnDestroy{
  formDatosCertificado!: FormGroup

  /**
 * Lista de catálogos de estados.
 */
  estado: Catalogo[] = [];
  constructor(
      private readonly fb: FormBuilder,
      private readonly httpServicios: HttpClient,
    ) {
      // Dependencia inyectada para uso posterior
    }

    ngOnInit(): void {
      this.obtenerEstadoList()
      this.formDatosCertificado = this.fb.group({
        observaciones:[],
        idioma:['',Validators.required],
        entidadFederativa:['',Validators.required],
        representacionFederal:['',Validators.required]
      })
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

    ngOnDestroy(): void {
      
    }
}
